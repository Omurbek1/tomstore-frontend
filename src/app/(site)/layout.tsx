import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cookies, headers } from "next/headers";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { ModalProvider } from "../context/QuickViewModalContext";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { ReduxProvider } from "@/redux/provider";
import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import PreviewSliderModal from "@/components/Common/PreviewSlider";

import ScrollToTop from "@/components/Common/ScrollToTop";
import { I18nProvider } from "@/i18n/provider";
import TanStackQueryProvider from "@/tanstack-query/provider";
import { makeQueryClient } from "@/tanstack-query/query-client";
import {
  CURRENCY_COOKIE_NAME,
  normalizeCurrencyCode,
  normalizeCurrencyPreference,
} from "@/i18n/currency";
import {
  detectLocaleFromHeader,
  isSupportedLocale,
  LOCALE_COOKIE_NAME,
} from "@/i18n/utils";
import {
  storefrontCategoriesQueryOptions,
  storefrontConfigQueryOptions,
} from "@/storefront/query-options";
import type { StorefrontConfig } from "@/storefront/types";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = makeQueryClient();
  const configQueryOptions = storefrontConfigQueryOptions();
  const [requestCookies, requestHeaders] = await Promise.all([
    cookies(),
    headers(),
    queryClient.prefetchQuery(configQueryOptions),
    queryClient.prefetchQuery(storefrontCategoriesQueryOptions()),
  ]);
  const storefrontConfig =
    queryClient.getQueryData<StorefrontConfig>(configQueryOptions.queryKey);
  const dehydratedState = dehydrate(queryClient);
  const cookiePreference = requestCookies.get(LOCALE_COOKIE_NAME)?.value;
  const localePreference =
    cookiePreference === "auto"
      ? "auto"
      : isSupportedLocale(cookiePreference)
        ? cookiePreference
        : "auto";
  const locale =
    localePreference === "auto"
      ? detectLocaleFromHeader(requestHeaders.get("accept-language"))
      : localePreference;
  const currencyPreference = normalizeCurrencyPreference(
    requestCookies.get(CURRENCY_COOKIE_NAME)?.value,
  );
  const currency =
    currencyPreference === "default"
      ? normalizeCurrencyCode(storefrontConfig?.storefrontDefaultCurrency)
      : currencyPreference;
  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body>
        <TanStackQueryProvider>
          <HydrationBoundary state={dehydratedState}>
            <I18nProvider
              initialLocale={locale}
              initialPreference={localePreference}
              initialCurrency={currency}
              initialCurrencyPreference={currencyPreference}
              usdExchangeRate={storefrontConfig?.storefrontUsdExchangeRate}
            >
              <>
                <ReduxProvider>
                  <CartModalProvider>
                    <ModalProvider>
                      <PreviewSliderProvider>
                        <Header />
                        {children}

                        <QuickViewModal />
                        <CartSidebarModal />
                        <PreviewSliderModal />
                      </PreviewSliderProvider>
                    </ModalProvider>
                  </CartModalProvider>
                </ReduxProvider>
                <ScrollToTop />
                <Footer />
              </>
            </I18nProvider>
          </HydrationBoundary>
        </TanStackQueryProvider>
      </body>
    </html>
  );
}
