"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/i18n/provider";
import {
  getPhoneHref,
  getStorefrontAddress,
  getStorefrontCompanyName,
  getStorefrontSupportPhone,
  getStorefrontWhatsappPhone,
  getWhatsAppHref,
} from "@/storefront/contact";
import { useStorefrontConfigQuery } from "@/storefront/hooks";

const Footer = () => {
  const year = new Date().getFullYear();
  const { t } = useI18n();
  const { data: storefrontConfig } = useStorefrontConfigQuery();
  const address = getStorefrontAddress(storefrontConfig);
  const companyName = getStorefrontCompanyName(storefrontConfig);
  const supportPhone = getStorefrontSupportPhone(storefrontConfig);
  const whatsappPhone = getStorefrontWhatsappPhone(storefrontConfig);

  return (
    <footer className="relative mt-10 overflow-hidden bg-[#07101d] text-white">
      <div className="pointer-events-none absolute left-[-8%] top-[-20%] h-72 w-72 rounded-full bg-blue/20 blur-3xl" />
      <div className="pointer-events-none absolute right-[-10%] bottom-[-16%] h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />

      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="grid gap-10 border-b border-white/10 py-12 lg:grid-cols-[minmax(0,1.15fr)_0.85fr_0.85fr] xl:py-16">
          <div className="max-w-[430px]">
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/6 px-4 py-2"
            >
              {storefrontConfig?.companyLogoUrl ? (
                <img
                  src={storefrontConfig.companyLogoUrl}
                  alt={companyName}
                  className="h-7 w-auto max-w-[84px] object-contain"
                />
              ) : (
                <Image
                  src="/images/logo/logo.svg"
                  alt={companyName}
                  width={84}
                  height={28}
                  className="h-7 w-auto object-contain brightness-[2.5]"
                />
              )}
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white/72">
                {companyName}
              </span>
            </Link>

            <h2 className="mt-6 text-3xl font-semibold leading-tight text-white sm:text-[40px]">
              {companyName}
            </h2>

            <div className="mt-6 rounded-[24px] border border-white/10 bg-white/6 p-5 text-sm leading-7 text-white/70 backdrop-blur-sm">
              <p>{address}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={getPhoneHref(supportPhone)}
                className="inline-flex rounded-full border border-white/10 bg-white/8 px-4 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-white hover:text-dark"
              >
                {supportPhone}
              </a>
              <a
                href={getWhatsAppHref(whatsappPhone)}
                className="inline-flex rounded-full border border-green-400/20 bg-green-400/10 px-4 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-white hover:text-dark"
              >
                WhatsApp: {whatsappPhone}
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/52">
              {t("footer.shopNavigation")}
            </h3>

            <ul className="mt-6 flex flex-col gap-3.5 text-white/72">
              <li>
                <Link className="transition-colors duration-200 hover:text-white" href="/shop-with-sidebar">
                  {t("menu.shop")}
                </Link>
              </li>
              <li>
                <Link className="transition-colors duration-200 hover:text-white" href="/checkout">
                  {t("menu.checkout")}
                </Link>
              </li>
              <li>
                <Link className="transition-colors duration-200 hover:text-white" href="/cart">
                  {t("menu.cart")}
                </Link>
              </li>
              <li>
                <Link className="transition-colors duration-200 hover:text-white" href="/wishlist">
                  {t("menu.wishlist")}
                </Link>
              </li>
              <li>
                <Link className="transition-colors duration-200 hover:text-white" href="/contact">
                  {t("menu.contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/52">
              {t("footer.quickLink")}
            </h3>

            <ul className="mt-6 flex flex-col gap-3.5 text-white/72">
              <li>
                <a className="transition-colors duration-200 hover:text-white" href="#">
                  {t("footer.privacyPolicy")}
                </a>
              </li>
              <li>
                <a className="transition-colors duration-200 hover:text-white" href="#">
                  {t("footer.refundPolicy")}
                </a>
              </li>
              <li>
                <a className="transition-colors duration-200 hover:text-white" href="#">
                  {t("footer.termsOfUse")}
                </a>
              </li>
              <li>
                <a className="transition-colors duration-200 hover:text-white" href="#">
                  {t("footer.faqs")}
                </a>
              </li>
            </ul>

            <div className="mt-8 rounded-[24px] border border-white/10 bg-white/6 p-5 backdrop-blur-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/52">
                {t("footer.weAccept")}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-5">
                <a href="#" aria-label="payment system with visa card">
                  <Image
                    src="/images/payment/payment-01.svg"
                    alt="visa card"
                    width={66}
                    height={22}
                    className="brightness-[1.6]"
                  />
                </a>
                <a href="#" aria-label="payment system with paypal">
                  <Image
                    src="/images/payment/payment-02.svg"
                    alt="paypal"
                    width={18}
                    height={21}
                    className="brightness-[1.6]"
                  />
                </a>
                <a href="#" aria-label="payment system with master card">
                  <Image
                    src="/images/payment/payment-03.svg"
                    alt="master card"
                    width={33}
                    height={24}
                    className="brightness-[1.6]"
                  />
                </a>
                <a href="#" aria-label="payment system with apple pay">
                  <Image
                    src="/images/payment/payment-04.svg"
                    alt="apple pay"
                    width={52.94}
                    height={22}
                    className="brightness-[1.6]"
                  />
                </a>
                <a href="#" aria-label="payment system with google pay">
                  <Image
                    src="/images/payment/payment-05.svg"
                    alt="google pay"
                    width={56}
                    height={22}
                    className="brightness-[1.6]"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-5 text-sm text-white/62 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year}. {t("footer.allRightsReserved")}</p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="rounded-full border border-white/10 bg-white/6 px-3.5 py-2 text-white transition-colors duration-200 hover:bg-white hover:text-dark"
            >
              {t("menu.contact")}
            </Link>
            <Link
              href="/shop-with-sidebar"
              className="rounded-full border border-white/10 bg-white/6 px-3.5 py-2 text-white transition-colors duration-200 hover:bg-white hover:text-dark"
            >
              {t("menu.shop")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
