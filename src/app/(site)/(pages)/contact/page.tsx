import Contact from "@/components/Contact";

import { Metadata } from "next";
import { buildSeoMetadata } from "@/seo/metadata";
import { makeQueryClient } from "@/tanstack-query/query-client";
import { storefrontConfigQueryOptions } from "@/storefront/query-options";
import {
  getStorefrontAddress,
  getStorefrontCompanyName,
  getStorefrontSupportPhone,
  getStorefrontWhatsappPhone,
} from "@/storefront/contact";
import { buildAbsoluteUrl, getSiteUrl } from "@/storefront/site";
export const metadata: Metadata = {
  ...buildSeoMetadata({
    title: "Контакты",
    description:
      "Контакты TOMSTORE: адрес магазина, телефоны и WhatsApp для заказа и консультации.",
    path: "/contact",
  }),
};

const ContactPage = async () => {
  const queryClient = makeQueryClient();
  const storefrontConfig = await queryClient
    .fetchQuery(storefrontConfigQueryOptions())
    .catch(() => undefined);
  const companyName = getStorefrontCompanyName(storefrontConfig);
  const supportPhone = getStorefrontSupportPhone(storefrontConfig);
  const whatsappPhone = getStorefrontWhatsappPhone(storefrontConfig);
  const address = getStorefrontAddress(storefrontConfig);
  const contactStructuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: companyName,
    url: getSiteUrl(),
    telephone: supportPhone,
    image: storefrontConfig?.companyLogoUrl
      ? buildAbsoluteUrl(storefrontConfig.companyLogoUrl)
      : undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: "Bishkek",
      addressCountry: "KG",
    },
    openingHours: storefrontConfig?.workingHours,
    hasMap: storefrontConfig?.mapUrl,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: supportPhone,
      },
      ...(whatsappPhone && whatsappPhone !== supportPhone
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
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: buildAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Контакты",
        item: buildAbsoluteUrl("/contact"),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <main>
        <Contact storefrontConfig={storefrontConfig} />
      </main>
    </>
  );
};

export default ContactPage;
