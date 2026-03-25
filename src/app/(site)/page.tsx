import Home from "@/components/Home";
import { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  storefrontBlogsQueryOptions,
  storefrontConfigQueryOptions,
  storefrontHomeQueryOptions,
  StorefrontApiError,
} from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import { isStorefrontBlogPublic } from "@/storefront/auth";
import { buildSeoMetadata } from "@/seo/metadata";
import { getHomeSeoContent } from "@/seo/content";
import { getRequestLocale } from "@/seo/request-locale";
import { buildAbsoluteUrl, getSiteUrl } from "@/storefront/site";
import { getStorefrontCompanyName } from "@/storefront/contact";
import type { StorefrontProductCard } from "@/storefront/types";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const content = getHomeSeoContent(locale);

  return buildSeoMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: "/",
    keywords: [
      "ноутбук",
      "принтер",
      "электроника",
      "компьютер",
      "магазин техники",
      "Бишкек",
      "Кыргызстан",
    ],
  });
}

export default async function HomePage() {
  const queryClient = makeQueryClient();
  const [storefrontConfig, home] = await Promise.all([
    queryClient.fetchQuery(storefrontConfigQueryOptions()),
    queryClient.fetchQuery(storefrontHomeQueryOptions()),
  ]);
  let canShowBlogPreview = isStorefrontBlogPublic(storefrontConfig);
  const companyName = getStorefrontCompanyName(storefrontConfig);
  const featuredProducts = Array.from(
    new Map(
      [...home.hitProducts, ...home.newProducts, ...home.saleProducts].map((product) => [
        product.slug,
        product,
      ]),
    ).values(),
  ).slice(0, 12) as StorefrontProductCard[];
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: companyName,
    url: getSiteUrl(),
    potentialAction: {
      "@type": "SearchAction",
      target: `${buildAbsoluteUrl("/shop-with-sidebar")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  const featuredProductsStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${companyName} featured products`,
    itemListElement: featuredProducts.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: buildAbsoluteUrl(`/shop-details/${product.slug}`),
      item: {
        "@type": "Product",
        name: product.name,
        image: product.gallery?.[0]
          ? buildAbsoluteUrl(product.gallery[0])
          : undefined,
        offers: {
          "@type": "Offer",
          priceCurrency: "KGS",
          price: product.price,
          availability: product.availability.isInStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          url: buildAbsoluteUrl(`/shop-details/${product.slug}`),
        },
      },
    })),
  };

  if (canShowBlogPreview) {
    try {
      await queryClient.fetchQuery(storefrontBlogsQueryOptions());
    } catch (error) {
      if (error instanceof StorefrontApiError && error.status === 401) {
        canShowBlogPreview = false;
      } else {
        throw error;
      }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(featuredProductsStructuredData),
        }}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Home canShowBlogPreview={canShowBlogPreview} />
      </HydrationBoundary>
    </>
  );
}
