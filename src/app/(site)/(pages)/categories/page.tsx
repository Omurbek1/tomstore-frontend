import type { Metadata } from "next";
import CatalogHubSection from "@/components/Storefront/CatalogHubSection";
import {
  getCategoriesHubSeoContent,
} from "@/seo/content";
import { buildSeoMetadata } from "@/seo/metadata";
import { getRequestLocale } from "@/seo/request-locale";
import { storefrontCatalogQueryOptions } from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import { buildAbsoluteUrl } from "@/storefront/site";
import {
  buildCategoriesHubPath,
  buildCategoryPath,
} from "@/storefront/catalog-routing";

const sortCategories = <T extends { totalProducts: number; name: string }>(items: T[]) =>
  [...items].sort(
    (left, right) =>
      right.totalProducts - left.totalProducts || left.name.localeCompare(right.name),
  );

const getBreadcrumbLabels = (locale: string) => ({
  home: locale === "en" ? "Home" : locale === "ky" ? "Башкы бет" : "Главная",
  current:
    locale === "en" ? "Categories" : locale === "ky" ? "Категориялар" : "Категории",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const content = getCategoriesHubSeoContent(locale);

  return buildSeoMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: buildCategoriesHubPath(),
    keywords: content.keywords,
  });
}

export default async function CategoriesHubPage() {
  const [locale, catalog] = await Promise.all([
    getRequestLocale(),
    makeQueryClient().fetchQuery(storefrontCatalogQueryOptions({})),
  ]);
  const content = getCategoriesHubSeoContent(locale);
  const categories = sortCategories(catalog.filters.categories);
  const breadcrumbLabels = getBreadcrumbLabels(locale);
  const collectionStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: content.metaTitle,
    description: content.metaDescription,
    url: buildAbsoluteUrl(buildCategoriesHubPath()),
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
        name: breadcrumbLabels.home,
        item: buildAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: breadcrumbLabels.current,
        item: buildAbsoluteUrl(buildCategoriesHubPath()),
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
      <CatalogHubSection content={content} type="category" items={categories} />
    </>
  );
}
