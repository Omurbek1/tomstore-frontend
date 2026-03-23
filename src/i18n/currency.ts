export const SUPPORTED_CURRENCIES = ["KGS", "USD"] as const;

export type CurrencyCode = (typeof SUPPORTED_CURRENCIES)[number];
export type CurrencyPreference = CurrencyCode | "default";

export const DEFAULT_CURRENCY: CurrencyCode = "KGS";
export const CURRENCY_COOKIE_NAME = "tomstore_currency_preference";

export const isSupportedCurrency = (
  value: string | null | undefined,
): value is CurrencyCode =>
  Boolean(value && SUPPORTED_CURRENCIES.includes(value as CurrencyCode));

export const normalizeCurrencyCode = (
  value: string | null | undefined,
  fallback: CurrencyCode = DEFAULT_CURRENCY,
): CurrencyCode =>
  isSupportedCurrency(value?.toUpperCase())
    ? (value?.toUpperCase() as CurrencyCode)
    : fallback;

export const normalizeCurrencyPreference = (
  value: string | null | undefined,
  fallback: CurrencyPreference = "default",
): CurrencyPreference =>
  value === "default" ? "default" : normalizeCurrencyCode(value, fallback === "default" ? DEFAULT_CURRENCY : fallback);
