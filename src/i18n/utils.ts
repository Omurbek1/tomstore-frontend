import {
  DEFAULT_LOCALE,
  type Locale,
  type MessageValues,
  SUPPORTED_LOCALES,
  messages,
} from "./messages";

const AVAILABILITY_KEY_BY_STATUS = {
  in_stock: "common.inStock",
  on_order: "common.onOrder",
  in_transit: "common.inTransit",
  out_of_stock: "common.outOfStock",
} as const;

const PRODUCT_LABEL_KEY_BY_STATUS = {
  hit: "common.popular",
  new: "common.newest",
  sale: "common.saleOff",
} as const;

const ORDER_STATUS_KEY_BY_STATUS = {
  processing: "order.status.processing",
  "on-hold": "order.status.on-hold",
  delivered: "order.status.delivered",
  cancelled: "order.status.cancelled",
} as const;

export const interpolate = (template: string, values?: MessageValues) => {
  if (!values) {
    return template;
  }

  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const value = values[key];
    return value === undefined ? `{${key}}` : String(value);
  });
};

export const getMessage = (
  locale: Locale,
  key: string,
  values?: MessageValues,
) => {
  const template = messages[locale][key] ?? messages[DEFAULT_LOCALE][key] ?? key;
  return interpolate(template, values);
};

export const isSupportedLocale = (
  value: string | null | undefined,
): value is Locale =>
  Boolean(value && SUPPORTED_LOCALES.includes(value as Locale));

export const detectLocale = (languages: readonly string[] = []): Locale => {
  for (const language of languages) {
    const normalized = language.trim().toLowerCase();

    if (normalized.startsWith("ru")) {
      return "ru";
    }

    if (normalized.startsWith("ky")) {
      return "ky";
    }

    if (normalized.startsWith("en")) {
      return "en";
    }
  }

  return DEFAULT_LOCALE;
};

export const detectLocaleFromHeader = (headerValue?: string | null): Locale => {
  if (!headerValue) {
    return DEFAULT_LOCALE;
  }

  const languages = headerValue
    .split(",")
    .map((part) => part.split(";")[0]?.trim())
    .filter((part): part is string => Boolean(part));

  return detectLocale(languages);
};

export const getAvailabilityMessageKey = (status?: string | null) =>
  status
    ? AVAILABILITY_KEY_BY_STATUS[
        status as keyof typeof AVAILABILITY_KEY_BY_STATUS
      ]
    : undefined;

export const getProductLabelMessageKey = (label?: string | null) =>
  label
    ? PRODUCT_LABEL_KEY_BY_STATUS[label as keyof typeof PRODUCT_LABEL_KEY_BY_STATUS]
    : undefined;

export const getOrderStatusMessageKey = (status?: string | null) =>
  status
    ? ORDER_STATUS_KEY_BY_STATUS[status as keyof typeof ORDER_STATUS_KEY_BY_STATUS] ||
      "order.status.unknown"
    : "order.status.unknown";
