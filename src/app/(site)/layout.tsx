import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import { cookies, headers } from "next/headers";
import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { ModalProvider } from "../context/QuickViewModalContext";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
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
  storefrontConfigQueryOptions,
} from "@/storefront/query-options";
import type { StorefrontConfig } from "@/storefront/types";
import { buildAbsoluteUrl, getSiteUrl } from "@/storefront/site";
import {
  getStorefrontCompanyName,
  getStorefrontSupportPhone,
  getStorefrontWhatsappPhone,
} from "@/storefront/contact";
import {
  DEFAULT_SEO_DESCRIPTION,
  getMetadataBase,
} from "@/seo/metadata";
import LazyAppToaster from "@/components/Common/LazyAppToaster";
import LazyScrollToTop from "@/components/Common/LazyScrollToTop";
import LazyQuickViewModal from "@/components/Common/LazyQuickViewModal";
import LazyCartSidebarModal from "@/components/Common/LazyCartSidebarModal";
import LazyPreviewSliderModal from "@/components/Common/LazyPreviewSliderModal";

const fetchStorefrontConfig = async () => {
  const queryClient = makeQueryClient();
  return queryClient.fetchQuery(storefrontConfigQueryOptions()).catch(() => undefined);
};

export async function generateMetadata(): Promise<Metadata> {
  const storefrontConfig = await fetchStorefrontConfig();
  const companyName = getStorefrontCompanyName(storefrontConfig);
  const description =
    storefrontConfig?.warrantyText?.trim() || DEFAULT_SEO_DESCRIPTION;
  const image =
    storefrontConfig?.companyLogoUrl || buildAbsoluteUrl("/images/hero/hero-01.png");

  return {
    metadataBase: getMetadataBase(),
    title: {
      default: companyName,
      template: `%s | ${companyName}`,
    },
    description,
    applicationName: companyName,
    alternates: {
      canonical: getSiteUrl(),
    },
    keywords: [
      companyName,
      "интернет-магазин техники",
      "ноутбуки",
      "принтеры",
      "компьютеры",
      "аксессуары",
      "Бишкек",
      "Кыргызстан",
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      title: companyName,
      description,
      url: getSiteUrl(),
      siteName: companyName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: companyName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: companyName,
      description,
      images: [image],
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = makeQueryClient();
  const [requestCookies, requestHeaders, storefrontConfig] = await Promise.all([
    cookies(),
    headers(),
    queryClient.fetchQuery(storefrontConfigQueryOptions()).catch(() => undefined),
  ]);
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
  const companyName = getStorefrontCompanyName(storefrontConfig);
  const companyLogoUrl =
    storefrontConfig?.companyLogoUrl || buildAbsoluteUrl("/images/hero/hero-01.png");
  const supportPhone = getStorefrontSupportPhone(storefrontConfig);
  const whatsappPhone = getStorefrontWhatsappPhone(storefrontConfig);
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: companyName,
    url: getSiteUrl(),
    logo: companyLogoUrl,
    image: companyLogoUrl,
    telephone: supportPhone,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: supportPhone,
      },
      ...(whatsappPhone
        ? [
            {
              "@type": "ContactPoint",
              contactType: "sales",
              telephone: whatsappPhone,
            },
          ]
        : []),
    ],
  };
  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        <TanStackQueryProvider>
          <I18nProvider
            initialLocale={locale}
            initialPreference={localePreference}
            initialCurrency={currency}
            initialCurrencyPreference={currencyPreference}
            usdExchangeRate={storefrontConfig?.storefrontUsdExchangeRate}
          >
            <>
              <CartModalProvider>
                <ModalProvider>
                  <PreviewSliderProvider>
                    <Header storefrontConfig={storefrontConfig} />
                    {children}

                    <LazyQuickViewModal />
                    <LazyCartSidebarModal />
                    <LazyPreviewSliderModal />
                    <LazyAppToaster />
                  </PreviewSliderProvider>
                </ModalProvider>
              </CartModalProvider>
              <LazyScrollToTop />
              <Footer storefrontConfig={storefrontConfig} />
            </>
          </I18nProvider>
        </TanStackQueryProvider>
      </body>
    </html>
  );
}
