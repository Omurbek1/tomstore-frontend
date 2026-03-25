"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  trackCheckoutStarted,
  trackCheckoutSubmitted,
} from "@/analytics/ecommerce";
import Breadcrumb from "../Common/Breadcrumb";
import { useI18n } from "@/i18n/provider";
import { selectCartTotalPrice, useAppStore } from "@/store/app-store";
import { getWhatsAppHref } from "@/storefront/contact";
import { useStorefrontContact } from "@/storefront/contact-context";
import Shipping from "./Shipping";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import Coupon from "./Coupon";
import Billing from "./Billing";

const getFormValue = (formData: FormData, key: string) =>
  String(formData.get(key) ?? "").trim();

const buildAddress = (...parts: Array<string | undefined>) =>
  parts
    .map((part) => part?.trim())
    .filter((part): part is string => Boolean(part))
    .join(", ");

const Checkout = () => {
  const { t, formatPrice } = useI18n();
  const cartItems = useAppStore((state) => state.cartItems);
  const totalPrice = useAppStore(selectCartTotalPrice);
  const removeAllItemsFromCart = useAppStore(
    (state) => state.removeAllItemsFromCart,
  );
  const { companyName, whatsappPhone } = useStorefrontContact();
  const router = useRouter();
  const hasTrackedCheckoutStartedRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countryRegionLabels = {
    australia: t("checkout.australia"),
    america: t("checkout.america"),
    england: t("checkout.england"),
  } as const;
  const shippingMethodLabels = {
    free: t("checkout.freeShipping"),
    fedex: `FedEx, ${t("checkout.standardShipping")}`,
    dhl: `DHL, ${t("checkout.standardShipping")}`,
  } as const;
  const paymentMethodLabels = {
    bank: t("checkout.directBankTransfer"),
    cash: t("checkout.cashOnDelivery"),
    paypal: t("checkout.paypal"),
  } as const;

  useEffect(() => {
    if (hasTrackedCheckoutStartedRef.current || cartItems.length === 0) {
      return;
    }

    trackCheckoutStarted(cartItems, totalPrice);
    hasTrackedCheckoutStartedRef.current = true;
  }, [cartItems, totalPrice]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting || cartItems.length === 0) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const shippingMethodKey = getFormValue(formData, "shippingMethod");
    const paymentMethodKey = getFormValue(formData, "paymentMethod");
    const billingCountryRegionKey = getFormValue(formData, "billingCountryRegion");
    const shippingCountryRegionKey = getFormValue(formData, "shippingCountryRegion");
    const shipToDifferentAddress =
      getFormValue(formData, "shipToDifferentAddress") === "yes";
    const billingFirstName = getFormValue(formData, "firstName");
    const billingLastName = getFormValue(formData, "lastName");
    const billingFullName = [billingFirstName, billingLastName]
      .filter(Boolean)
      .join(" ");
    const billingCompanyName = getFormValue(formData, "companyName");
    const billingPhone = getFormValue(formData, "phone");
    const billingEmail = getFormValue(formData, "email");
    const billingCountryRegion =
      countryRegionLabels[
        billingCountryRegionKey as keyof typeof countryRegionLabels
      ];
    const shippingCountryRegion =
      countryRegionLabels[
        shippingCountryRegionKey as keyof typeof countryRegionLabels
      ];
    const billingAddress = buildAddress(
      getFormValue(formData, "billingStreetAddress"),
      getFormValue(formData, "billingApartment"),
      getFormValue(formData, "billingTown"),
      getFormValue(formData, "billingCountry") || billingCountryRegion,
    );
    const shippingAddress = buildAddress(
      getFormValue(formData, "shippingStreetAddress"),
      getFormValue(formData, "shippingApartment"),
      getFormValue(formData, "shippingTown"),
      getFormValue(formData, "shippingCountry") || shippingCountryRegion,
    );
    const shippingPhone = getFormValue(formData, "shippingPhone");
    const shippingEmail = getFormValue(formData, "shippingEmail");
    const notes = getFormValue(formData, "notes");
    const shippingMethod =
      shippingMethodLabels[
        shippingMethodKey as keyof typeof shippingMethodLabels
      ] || shippingMethodKey;
    const paymentMethod =
      paymentMethodLabels[
        paymentMethodKey as keyof typeof paymentMethodLabels
      ] || paymentMethodKey;
    const orderLines = cartItems.map(
      (item, index) =>
        `${index + 1}. ${item.title} x${item.quantity} - ${formatPrice(
          item.discountedPrice * item.quantity,
        )}`,
    );
    const messageLines = [
      `${t("common.quickOrderWhatsapp")} - ${companyName}`,
      "",
      `${t("checkout.billingDetails")}:`,
      `${t("common.name")}: ${billingFullName}`,
      billingCompanyName
        ? `${t("checkout.companyName")}: ${billingCompanyName}`
        : null,
      billingCountryRegion
        ? `${t("checkout.countryRegion")}: ${billingCountryRegion}`
        : null,
      billingAddress ? `${t("common.address")}: ${billingAddress}` : null,
      `${t("checkout.phone")}: ${billingPhone}`,
      `${t("checkout.emailAddress")}: ${billingEmail}`,
      "",
      `${t("checkout.shippingMethod")}: ${shippingMethod}`,
      `${t("checkout.paymentMethod")}: ${paymentMethod}`,
      ...(shipToDifferentAddress && shippingAddress
        ? [
            "",
            `${t("checkout.shipDifferentAddress")}:`,
            `${t("common.address")}: ${shippingAddress}`,
            shippingPhone ? `${t("checkout.phone")}: ${shippingPhone}` : null,
            shippingEmail
              ? `${t("checkout.emailAddress")}: ${shippingEmail}`
              : null,
          ]
        : []),
      "",
      `${t("checkout.yourOrder")}:`,
      ...orderLines,
      `${t("common.total")}: ${formatPrice(totalPrice)}`,
      ...(notes ? ["", `${t("checkout.otherNotes")}:`, notes] : []),
    ].filter((line): line is string => Boolean(line));

    const whatsappHref = getWhatsAppHref(
      whatsappPhone,
      messageLines.join("\n"),
    );

    if (!whatsappHref || whatsappHref === "#") {
      return;
    }

    setIsSubmitting(true);
    trackCheckoutSubmitted(
      cartItems,
      {
        shippingMethod,
        paymentMethod,
        hasAlternateShippingAddress: shipToDifferentAddress && Boolean(shippingAddress),
      },
      totalPrice,
    );

    const link = document.createElement("a");
    link.href = whatsappHref;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();

    removeAllItemsFromCart();
    form.reset();
    router.push("/mail-success?kind=order");
  };

  return (
    <>
      <Breadcrumb title={t("checkout.title")} pages={[t("checkout.title")]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
              <div className="lg:max-w-[670px] w-full">
                <div className="rounded-[10px] bg-white p-4 shadow-1 sm:p-8.5">
                  <h2 className="text-xl font-medium text-dark">
                    {t("checkout.whatsappOnlyTitle")}
                  </h2>
                  <p className="mt-3 text-custom-sm text-dark-4">
                    {t("checkout.whatsappOnlyDescription")}
                  </p>
                </div>

                <Billing />
                <Shipping />

                <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5 mt-7.5">
                  <div>
                    <label htmlFor="notes" className="block mb-2.5">
                      {t("checkout.otherNotes")}
                    </label>

                    <textarea
                      name="notes"
                      id="notes"
                      rows={5}
                      placeholder={t("checkout.notesPlaceholder")}
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                  </div>
                </div>
              </div>

              <div className="max-w-[455px] w-full">
                <div className="bg-white shadow-1 rounded-[10px]">
                  <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                    <h3 className="font-medium text-xl text-dark">
                      {t("checkout.yourOrder")}
                    </h3>
                  </div>

                  <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <div>
                        <h4 className="font-medium text-dark">{t("common.product")}</h4>
                      </div>
                      <div>
                        <h4 className="font-medium text-dark text-right">
                          {t("common.subtotal")}
                        </h4>
                      </div>
                    </div>

                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between py-5 border-b border-gray-3"
                      >
                        <div>
                          <p className="text-dark">{item.title}</p>
                        </div>
                        <div>
                          <p className="text-dark text-right">
                            {formatPrice(item.discountedPrice * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}

                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <div>
                        <p className="text-dark">{t("checkout.shippingFee")}</p>
                      </div>
                      <div>
                        <p className="text-dark text-right">{formatPrice(0)}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-5">
                      <div>
                        <p className="font-medium text-lg text-dark">{t("common.total")}</p>
                      </div>
                      <div>
                        <p className="font-medium text-lg text-dark text-right">
                          {formatPrice(totalPrice)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Coupon />
                <ShippingMethod />
                <PaymentMethod />

                <button
                  type="submit"
                  disabled={isSubmitting || cartItems.length === 0}
                  className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {t("checkout.processToCheckout")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Checkout;
