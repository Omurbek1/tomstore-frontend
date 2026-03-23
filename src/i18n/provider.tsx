"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DEFAULT_LOCALE, type Locale } from "./messages";
import type { MessageValues } from "./messages";
import {
  CURRENCY_COOKIE_NAME,
  DEFAULT_CURRENCY,
  type CurrencyCode,
  type CurrencyPreference,
  isSupportedCurrency,
} from "./currency";
import {
  detectLocale,
  getMessage,
  isSupportedLocale,
  LOCALE_COOKIE_NAME,
} from "./utils";

export type LocalePreference = Locale | "auto";

type I18nContextValue = {
  locale: Locale;
  localePreference: LocalePreference;
  setLocalePreference: (preference: LocalePreference) => void;
  currency: CurrencyCode;
  currencyPreference: CurrencyPreference;
  setCurrencyPreference: (preference: CurrencyPreference) => void;
  convertPrice: (amount?: number | null) => number;
  formatPrice: (amount?: number | null) => string;
  usdExchangeRate: number;
  t: (key: string, values?: MessageValues) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const getBrowserLocale = () =>
  detectLocale([...(window.navigator.languages || []), window.navigator.language]);

const INTL_LOCALE_BY_LOCALE: Record<Locale, string> = {
  ru: "ru-RU",
  en: "en-US",
  ky: "ky-KG",
};

export const I18nProvider = ({
  children,
  initialLocale = DEFAULT_LOCALE,
  initialPreference = "auto",
  initialCurrency = DEFAULT_CURRENCY,
  initialCurrencyPreference = "default",
  usdExchangeRate = 89,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
  initialPreference?: LocalePreference;
  initialCurrency?: CurrencyCode;
  initialCurrencyPreference?: CurrencyPreference;
  usdExchangeRate?: number;
}) => {
  const [locale, setLocale] = useState(initialLocale);
  const [localePreference, setLocalePreferenceState] =
    useState<LocalePreference>(initialPreference);
  const [currency, setCurrency] = useState<CurrencyCode>(initialCurrency);
  const [currencyPreference, setCurrencyPreferenceState] =
    useState<CurrencyPreference>(initialCurrencyPreference);
  const safeUsdExchangeRate =
    Number.isFinite(usdExchangeRate) && usdExchangeRate > 0 ? usdExchangeRate : 89;

  useEffect(() => {
    const storedPreference = window.localStorage.getItem(LOCALE_COOKIE_NAME);
    const nextPreference: LocalePreference =
      storedPreference === "auto"
        ? "auto"
        : isSupportedLocale(storedPreference)
          ? storedPreference
          : initialPreference;
    const nextLocale =
      nextPreference === "auto" ? getBrowserLocale() : nextPreference;

    setLocalePreferenceState(nextPreference);
    setLocale(nextLocale);
  }, [initialPreference]);

  useEffect(() => {
    const storedPreference = window.localStorage.getItem(CURRENCY_COOKIE_NAME);
    const nextPreference: CurrencyPreference =
      storedPreference === "default"
        ? "default"
        : isSupportedCurrency(storedPreference)
          ? storedPreference
          : initialCurrencyPreference;
    const nextCurrency =
      nextPreference === "default" ? initialCurrency : nextPreference;

    setCurrencyPreferenceState(nextPreference);
    setCurrency(nextCurrency);
  }, [initialCurrency, initialCurrencyPreference]);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem(LOCALE_COOKIE_NAME, localePreference);
    document.cookie = `${LOCALE_COOKIE_NAME}=${localePreference}; path=/; max-age=31536000; samesite=lax`;
  }, [locale, localePreference]);

  useEffect(() => {
    window.localStorage.setItem(CURRENCY_COOKIE_NAME, currencyPreference);
    document.cookie = `${CURRENCY_COOKIE_NAME}=${currencyPreference}; path=/; max-age=31536000; samesite=lax`;
  }, [currencyPreference]);

  const setLocalePreference = useCallback((preference: LocalePreference) => {
    setLocalePreferenceState(preference);
    setLocale(preference === "auto" ? getBrowserLocale() : preference);
  }, []);

  const setCurrencyPreference = useCallback(
    (preference: CurrencyPreference) => {
      setCurrencyPreferenceState(preference);
      setCurrency(preference === "default" ? initialCurrency : preference);
    },
    [initialCurrency],
  );

  const t = useCallback(
    (key: string, values?: MessageValues) => getMessage(locale, key, values),
    [locale],
  );

  const convertPrice = useCallback(
    (amount?: number | null) => {
      const normalizedAmount = Number(amount || 0);
      if (!Number.isFinite(normalizedAmount)) {
        return 0;
      }
      return currency === "USD"
        ? normalizedAmount / safeUsdExchangeRate
        : normalizedAmount;
    },
    [currency, safeUsdExchangeRate],
  );

  const formatPrice = useCallback(
    (amount?: number | null) =>
      new Intl.NumberFormat(INTL_LOCALE_BY_LOCALE[locale], {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: currency === "USD" ? 2 : 0,
      }).format(convertPrice(amount)),
    [convertPrice, currency, locale],
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      localePreference,
      setLocalePreference,
      currency,
      currencyPreference,
      setCurrencyPreference,
      convertPrice,
      formatPrice,
      usdExchangeRate: safeUsdExchangeRate,
      t,
    }),
    [
      convertPrice,
      currency,
      currencyPreference,
      formatPrice,
      locale,
      localePreference,
      safeUsdExchangeRate,
      setCurrencyPreference,
      setLocalePreference,
      t,
    ],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }

  return context;
};
