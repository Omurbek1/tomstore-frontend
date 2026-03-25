import type { Metadata } from "next";
import CatalogHubSection from "@/components/Storefront/CatalogHubSection";
import {
  getBrandsHubSeoContent,
} from "@/seo/content";
import { buildSeoMetadata } from "@/seo/metadata";
import { getRequestLocale } from "@/seo/request-locale";
import { storefrontCatalogQueryOptions } from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import { buildAbsoluteUrl } from "@/storefront/site";
import {
  buildBrandPath,
  buildBrandsHubPath,
} from "@/storefront/catalog-routing";

const sortBrands = <T extends { totalProducts: number; name: string }>(items: T[]) =>
  [...items].sort(
    (left, right) =>
      right.totalProducts - left.totalProducts || left.name.localeCompare(right.name),
  );

const getBreadcrumbLabels = (locale: string) => ({
  home: locale === "en" ? "Home" : locale === "ky" ? "Башкы бет" : "Главная",
  current: locale === "en" ? "Brands" : locale === "ky" ? "Бренддер" : "Бренды",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const content = getBrandsHubSeoContent(locale);

  return buildSeoMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: buildBrandsHubPath(),
    keywords: content.keywords,
  });
}

export default async function BrandsHubPage() {
  const [locale, catalog] = await Promise.all([
    getRequestLocale(),
    makeQueryClient().fetchQuery(storefrontCatalogQueryOptions({})),
  ]);
  const content = getBrandsHubSeoContent(locale);
  const brands = sortBrands(catalog.filters.brands);
  const breadcrumbLabels = getBreadcrumbLabels(locale);
  const collectionStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: content.metaTitle,
    description: content.metaDescription,
    url: buildAbsoluteUrl(buildBrandsHubPath()),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: brands.length,
      itemListElement: brands.map((brand, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: buildAbsoluteUrl(buildBrandPath(brand.slug)),
        name: brand.name,
      })),
    },
  };
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: breadcrumbLabels.home,
        item: buildAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: breadcrumbLabels.current,
        item: buildAbsoluteUrl(buildBrandsHubPath()),
      },
    ],
  };
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      <CatalogHubSection content={content} type="brand" items={brands} />
    </>
  );
}
