import type { StorefrontConfig } from "./types";

const FALLBACK_COMPANY_NAME = "TOMSTORE";
const FALLBACK_ADDRESS = "Калык Акиев 66, ТЦ Весна, 3-этаж, C47";
const FALLBACK_SUPPORT_PHONE = "+996508724365";
const FALLBACK_WHATSAPP_PHONE = "+996706882271";

const pickFirstDefined = (...values: Array<string | undefined | null>) =>
  values.find((value) => typeof value === "string" && value.trim().length > 0)?.trim();

export const getStorefrontCompanyName = (config?: Pick<StorefrontConfig, "companyName">) =>
  pickFirstDefined(config?.companyName, FALLBACK_COMPANY_NAME) || FALLBACK_COMPANY_NAME;

export const getStorefrontAddress = (
  config?: Pick<StorefrontConfig, "contacts">,
) =>
  pickFirstDefined(
    ...(config?.contacts || []).map((contact) => contact.address),
    FALLBACK_ADDRESS,
  ) || FALLBACK_ADDRESS;

export const getStorefrontSupportPhone = (
  config?: Pick<StorefrontConfig, "contacts" | "supportPhone">,
) =>
  pickFirstDefined(
    config?.supportPhone,
    ...(config?.contacts || []).map((contact) => contact.phone),
    FALLBACK_SUPPORT_PHONE,
  ) || FALLBACK_SUPPORT_PHONE;

export const getStorefrontWhatsappPhone = (
  config?: Pick<StorefrontConfig, "supportPhone" | "whatsappPhone">,
) =>
  pickFirstDefined(
    config?.whatsappPhone,
    FALLBACK_WHATSAPP_PHONE,
    config?.supportPhone,
    FALLBACK_SUPPORT_PHONE,
  ) || FALLBACK_WHATSAPP_PHONE;

export const getPhoneHref = (value?: string) => {
  const normalized = String(value || "").replace(/[^\d+]/g, "");
  return normalized ? `tel:${normalized}` : "#";
};

export const getWhatsAppHref = (value?: string, message?: string) => {
  const normalized = String(value || "").replace(/\D/g, "");
  const query = message?.trim()
    ? `?text=${encodeURIComponent(message.trim())}`
    : "";
  return normalized ? `https://wa.me/${normalized}${query}` : "#";
};
