import type { Metadata } from "next";
import CatalogHubPage from "@/components/Storefront/CatalogHubPage";
import {
  getCityTopicBreadcrumbLabels,
  getElectronicsBishkekSeoContent,
} from "@/seo/intent-city-topic-content";
import { buildSeoMetadata } from "@/seo/metadata";
import { getRequestLocale } from "@/seo/request-locale";
import { storefrontCatalogQueryOptions } from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import {
  buildElectronicsBishkekPath,
  buildElectronicsPath,
} from "@/storefront/catalog-routing";
import { buildAbsoluteUrl } from "@/storefront/site";
import { buildCategoryPath } from "@/storefront/catalog-routing";

const sortCategories = <T extends { totalProducts: number; name: string }>(
  items: T[],
) =>
  [...items].sort(
    (left, right) =>
      right.totalProducts - left.totalProducts || left.name.localeCompare(right.name),
  );

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const content = getElectronicsBishkekSeoContent(locale);

  return buildSeoMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: buildElectronicsBishkekPath(),
    keywords: content.keywords,
  });
}

export default async function ElectronicsBishkekPage() {
  const [locale, catalog] = await Promise.all([
    getRequestLocale(),
    makeQueryClient().fetchQuery(storefrontCatalogQueryOptions({})),
  ]);
  const content = getElectronicsBishkekSeoContent(locale);
  const labels = getCityTopicBreadcrumbLabels(locale, "electronics", "bishkek");
  const categories = sortCategories(catalog.filters.categories).slice(0, 8);
  const collectionStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: content.metaTitle,
    description: content.metaDescription,
    url: buildAbsoluteUrl(buildElectronicsBishkekPath()),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: categories.length,
      itemListElement: categories.map((category, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: buildAbsoluteUrl(buildCategoryPath(category.slug)),
        name: category.name,
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
        name: labels.home,
        item: buildAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: labels.section,
        item: buildAbsoluteUrl(buildElectronicsPath()),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: labels.current,
        item: buildAbsoluteUrl(buildElectronicsBishkekPath()),
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
      <CatalogHubPage content={content} items={categories} type="category" path={buildElectronicsBishkekPath()} homeLabel={labels.home} sectionLabel={labels.section} sectionHref={buildElectronicsPath()} currentLabel={labels.current} />
    </>
  );
}
