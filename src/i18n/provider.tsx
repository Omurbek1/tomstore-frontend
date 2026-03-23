"use client";

import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { DEFAULT_LOCALE, type Locale } from "./messages";
import type { MessageValues } from "./messages";
import { getMessage } from "./utils";

type I18nContextValue = {
  locale: Locale;
  t: (key: string, values?: MessageValues) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider = ({
  children,
  initialLocale = DEFAULT_LOCALE,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) => {
  const locale = initialLocale;

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = useCallback(
    (key: string, values?: MessageValues) => getMessage(locale, key, values),
    [locale],
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      t,
    }),
    [locale, t],
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
