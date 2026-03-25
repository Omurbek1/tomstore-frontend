"use client";

import { useI18n } from "@/i18n/provider";
import { getWhatsAppHref } from "@/storefront/contact";
import { getInstallmentPlan } from "@/storefront/installment";

type ProductInstallmentProps = {
  amount: number;
  variant?: "card" | "detail";
  productName?: string;
  whatsappPhone?: string;
  className?: string;
};

const InstallmentIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.33334 7.5C3.33334 5.14298 3.33334 3.96447 4.06557 3.23224C4.79781 2.5 5.97632 2.5 8.33334 2.5H11.6667C14.0237 2.5 15.2022 2.5 15.9345 3.23224C16.6667 3.96447 16.6667 5.14298 16.6667 7.5V12.5C16.6667 14.857 16.6667 16.0355 15.9345 16.7678C15.2022 17.5 14.0237 17.5 11.6667 17.5H8.33334C5.97632 17.5 4.79781 17.5 4.06557 16.7678C3.33334 16.0355 3.33334 14.857 3.33334 12.5V7.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M6.66666 6.66669H13.3333"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M6.66666 10H9.99999"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M6.66666 13.3333H8.33332"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12.0833 11.25L13.3333 12.5L15.8333 10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ProductInstallment = ({
  amount,
  variant = "card",
  productName,
  whatsappPhone,
  className = "",
}: ProductInstallmentProps) => {
  const { t, formatPrice } = useI18n();
  const plan = getInstallmentPlan(amount);

  if (!plan) {
    return null;
  }

  const installmentHref =
    productName && whatsappPhone
      ? getWhatsAppHref(
          whatsappPhone,
          t("common.installmentWhatsappMessage", {
            product: productName,
            price: formatPrice(amount),
            monthly: formatPrice(plan.monthlyPayment),
            months: plan.termMonths,
          }),
        )
      : undefined;

  if (variant === "detail") {
    return (
      <div
        className={`rounded-[28px] border border-blue/15 bg-[linear-gradient(145deg,rgba(243,247,255,0.96)_0%,rgba(230,240,255,0.96)_100%)] p-5 shadow-[0_22px_60px_-42px_rgba(60,80,224,0.45)] ${className}`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue text-white shadow-[0_20px_30px_-20px_rgba(60,80,224,0.95)]">
              <InstallmentIcon />
            </span>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue">
                {t("common.installment")}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-dark">
                {t("common.installmentFrom", {
                  price: formatPrice(plan.monthlyPayment),
                })}
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-dark-4">
                {t("common.installmentDetailText")}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:justify-end">
            <span className="rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-xs font-semibold text-dark shadow-sm">
              {t("common.installmentFirstPayment", {
                price: formatPrice(plan.upfrontPayment),
              })}
            </span>
            <span className="rounded-full border border-blue/15 bg-blue/10 px-3 py-1.5 text-xs font-semibold text-blue-dark">
              {t("common.installmentTerm", { months: plan.termMonths })}
            </span>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-[20px] border border-white/80 bg-white/80 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-4">
              {t("common.installment")}
            </p>
            <p className="mt-1 text-lg font-semibold text-dark">
              {t("common.installmentFrom", {
                price: formatPrice(plan.monthlyPayment),
              })}
            </p>
          </div>
          <div className="rounded-[20px] border border-white/80 bg-white/80 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-4">
              {t("common.price")}
            </p>
            <p className="mt-1 text-lg font-semibold text-dark">
              {formatPrice(amount)}
            </p>
          </div>
          <div className="rounded-[20px] border border-white/80 bg-white/80 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-4">
              {t("common.installmentTerm", { months: plan.termMonths })}
            </p>
            <p className="mt-1 text-lg font-semibold text-dark">
              {t("common.installmentFirstPayment", {
                price: formatPrice(plan.upfrontPayment),
              })}
            </p>
          </div>
        </div>

        {installmentHref ? (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-dark-4">
              {t("common.installmentQuickApproval")}
            </p>
            <a
              href={installmentHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-blue px-5 py-3 text-sm font-medium text-white shadow-[0_20px_30px_-20px_rgba(60,80,224,0.8)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-dark"
            >
              {t("common.installmentCta")}
            </a>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={`rounded-[20px] border border-blue/15 bg-[linear-gradient(145deg,rgba(243,247,255,0.96)_0%,rgba(230,240,255,0.96)_100%)] p-3 ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue">
            {t("common.installment")}
          </p>
          <p className="mt-1 text-sm font-semibold leading-5 text-dark">
            {t("common.installmentFrom", {
              price: formatPrice(plan.monthlyPayment),
            })}
          </p>
        </div>

        <span className="shrink-0 rounded-full border border-white/80 bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-dark shadow-sm">
          {t("common.installmentFirstPayment", {
            price: formatPrice(plan.upfrontPayment),
          })}
        </span>
      </div>

      <p className="mt-2 text-[12px] leading-5 text-dark-4">
        {t("common.installmentCardText", { months: plan.termMonths })}
      </p>
    </div>
  );
};

export default ProductInstallment;
