import { cookies, headers } from "next/headers";
import type { Locale } from "@/i18n/messages";
import {
  detectLocaleFromHeader,
  isSupportedLocale,
  LOCALE_COOKIE_NAME,
} from "@/i18n/utils";

export const getRequestLocale = async (): Promise<Locale> => {
  const [requestCookies, requestHeaders] = await Promise.all([cookies(), headers()]);
  const cookiePreference = requestCookies.get(LOCALE_COOKIE_NAME)?.value;

  if (isSupportedLocale(cookiePreference)) {
    return cookiePreference;
  }

  return detectLocaleFromHeader(requestHeaders.get("accept-language"));
};
