import type { Metadata } from "next";
import CatalogHubPage from "@/components/Storefront/CatalogHubPage";
import { getPrintersHubSeoContent } from "@/seo/topic-hub-content";
import { buildSeoMetadata } from "@/seo/metadata";
import { getRequestLocale } from "@/seo/request-locale";
import { storefrontCatalogQueryOptions } from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import {
  buildElectronicsPath,
  buildPrintersPath,
} from "@/storefront/catalog-routing";
import {
  getTopicBreadcrumbLabels,
  selectTopicCategories,
} from "@/storefront/topic-hubs";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const content = getPrintersHubSeoContent(locale);

  return buildSeoMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: buildPrintersPath(),
    keywords: content.keywords,
  });
}

export default async function PrintersPage() {
  const [locale, catalog] = await Promise.all([
    getRequestLocale(),
    makeQueryClient().fetchQuery(storefrontCatalogQueryOptions({})),
  ]);
  const content = getPrintersHubSeoContent(locale);
  const labels = getTopicBreadcrumbLabels(locale, "printers");
  const categories = selectTopicCategories(catalog.filters.categories, "printers");

  return (
    <CatalogHubPage
      content={content}
      items={categories}
      type="category"
      path={buildPrintersPath()}
      homeLabel={labels.home}
      sectionLabel={labels.section}
      sectionHref={buildElectronicsPath()}
      currentLabel={labels.current}
    />
  );
}
