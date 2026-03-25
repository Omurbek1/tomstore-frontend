"use client";

import { useMemo } from "react";
import { useI18n } from "@/i18n/provider";
import { getWhatsAppHref } from "@/storefront/contact";
import { useStorefrontContact } from "@/storefront/contact-context";
import { buildAbsoluteUrl } from "@/storefront/site";
import type { Product } from "@/types/product";

type ProductWhatsAppButtonProps = {
  product: Pick<Product, "discountedPrice" | "slug" | "title">;
  variant?: "icon" | "pill";
  className?: string;
};

const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2.25C6.61522 2.25 2.25 6.61522 2.25 12C2.25 13.7595 2.71774 15.4105 3.53509 16.8342L2.37053 20.8471C2.28167 21.1533 2.36667 21.4834 2.59117 21.708C2.81567 21.9325 3.14584 22.0175 3.45199 21.9286L7.41493 20.7786C8.80748 21.545 10.408 21.75 12 21.75C17.3848 21.75 21.75 17.3848 21.75 12C21.75 6.61522 17.3848 2.25 12 2.25ZM12 3.75C16.5563 3.75 20.25 7.44365 20.25 12C20.25 16.5563 16.5563 20.25 12 20.25C10.5489 20.25 9.09692 19.9232 7.8344 19.3138C7.66453 19.2318 7.46957 19.2153 7.28829 19.2675L4.18836 20.1666L5.09808 17.0312C5.15064 16.85 5.13427 16.6547 5.05219 16.4846C4.38666 15.1052 3.75 13.598 3.75 12C3.75 7.44365 7.44365 3.75 12 3.75Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.53293 7.94236C8.88868 7.42071 9.15393 7.41345 9.39993 7.40301C9.60018 7.39452 9.8283 7.39528 10.0568 7.39528C10.239 7.39528 10.5356 7.32654 10.8124 7.9911C11.102 8.68607 11.7977 10.3961 11.866 10.5341C11.9343 10.6722 11.9798 10.8349 11.8833 10.9976C11.7868 11.1603 11.7385 11.2616 11.5938 11.4284C11.4492 11.5951 11.2898 11.8015 11.1597 11.9307C11.0141 12.0754 10.8632 12.232 11.0299 12.5207C11.1967 12.8093 11.7721 13.7517 12.6209 14.508C13.7105 15.4788 14.6298 15.7794 14.9184 15.9461C15.2071 16.1129 15.3756 16.0908 15.5202 15.924C15.6649 15.7573 16.1469 15.1949 16.3154 14.9541C16.4839 14.7133 16.6523 14.7536 16.9409 14.9204C17.2296 15.0871 18.7668 15.8414 19.0796 16.0078C19.3924 16.1742 19.5999 16.2561 19.6723 16.3775C19.7446 16.4989 19.7446 17.0727 19.4132 17.7267C19.0819 18.3807 17.4703 19.02 16.8822 19.0544C16.2941 19.0889 15.7598 19.2206 13.2218 18.2189C10.6838 17.2172 9.0631 14.7688 8.93872 14.5983C8.81434 14.4278 7.34874 12.4718 7.34874 10.4497C7.34874 8.42754 8.17718 8.21137 8.53293 7.94236Z"
      fill="currentColor"
    />
  </svg>
);

const ProductWhatsAppButton = ({
  product,
  variant = "pill",
  className = "",
}: ProductWhatsAppButtonProps) => {
  const { formatPrice, t } = useI18n();
  const { whatsappPhone } = useStorefrontContact();

  const whatsappHref = useMemo(
    () =>
      getWhatsAppHref(
        whatsappPhone,
        t("common.quickOrderWhatsappMessage", {
          product: product.title,
          price: formatPrice(product.discountedPrice),
          url: buildAbsoluteUrl(`/shop-details/${product.slug}`),
        }),
      ),
    [
      formatPrice,
      product.discountedPrice,
      product.slug,
      product.title,
      t,
      whatsappPhone,
    ],
  );

  if (!whatsappHref || whatsappHref === "#") {
    return null;
  }

  const buttonLabel = t("common.quickOrderWhatsapp");
  const buttonAriaLabel = `${buttonLabel}: ${product.title}`;

  if (variant === "icon") {
    return (
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label={buttonAriaLabel}
        title={buttonLabel}
        className={`inline-flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[#25D366]/20 bg-[linear-gradient(135deg,#25D366_0%,#1ebe5d_100%)] text-white shadow-[0_22px_34px_-22px_rgba(37,211,102,0.95)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_28px_40px_-22px_rgba(37,211,102,0.88)] ${className}`}
      >
        <WhatsAppIcon />
      </a>
    );
  }

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label={buttonAriaLabel}
      className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#25D366]/20 bg-[linear-gradient(135deg,#25D366_0%,#1ebe5d_100%)] px-5 py-3 text-sm font-medium text-white shadow-[0_22px_34px_-22px_rgba(37,211,102,0.95)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_28px_40px_-22px_rgba(37,211,102,0.88)] ${className}`}
    >
      <WhatsAppIcon className="shrink-0" />
      <span className="truncate">{buttonLabel}</span>
    </a>
  );
};

export default ProductWhatsAppButton;
