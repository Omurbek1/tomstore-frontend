import React, { useState } from "react";
import PaymentMethodBadge from "@/components/Common/PaymentMethodBadge";
import { useI18n } from "@/i18n/provider";
import {
  STOREFRONT_PAYMENT_METHODS,
  type StorefrontPaymentMethodId,
} from "@/storefront/payments";

const PaymentMethod = () => {
  const [payment, setPayment] = useState<StorefrontPaymentMethodId>(
    STOREFRONT_PAYMENT_METHODS[0]?.id || "visa_card",
  );
  const { t } = useI18n();
  return (
    <div className="bg-white shadow-1 rounded-[10px] mt-7.5">
      <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
        <h3 className="font-medium text-xl text-dark">{t("checkout.paymentMethod")}</h3>
      </div>

      <div className="p-4 sm:p-8.5">
        <div className="grid gap-3 sm:grid-cols-2">
          {STOREFRONT_PAYMENT_METHODS.map((method) => (
            <label
              key={method.id}
              htmlFor={method.id}
              className="cursor-pointer select-none"
            >
              <input
                type="radio"
                name="paymentMethod"
                id={method.id}
                value={method.id}
                checked={payment === method.id}
                className="sr-only"
                onChange={() => setPayment(method.id)}
              />

              <div
                className={`flex min-h-[76px] items-center justify-between gap-3 rounded-[18px] border px-4 py-4 transition-all duration-200 ${
                  payment === method.id
                    ? "border-blue bg-blue/5 shadow-[0_18px_30px_-26px_rgba(60,80,224,0.55)]"
                    : "border-gray-3 bg-gray-1 hover:border-blue/20 hover:bg-white"
                }`}
              >
                <PaymentMethodBadge
                  methodId={method.id}
                  label={method.label}
                  variant="option"
                />

                <span
                  className={`inline-flex h-5 w-5 items-center justify-center rounded-full border ${
                    payment === method.id
                      ? "border-[5px] border-blue bg-white"
                      : "border-gray-4 bg-white"
                  }`}
                />
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
