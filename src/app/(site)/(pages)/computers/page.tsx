import type { Metadata } from "next";
import CatalogHubPage from "@/components/Storefront/CatalogHubPage";
import { getComputersHubSeoContent } from "@/seo/topic-hub-content";
import { buildSeoMetadata } from "@/seo/metadata";
import { getRequestLocale } from "@/seo/request-locale";
import { storefrontCatalogQueryOptions } from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import {
  buildComputersPath,
  buildElectronicsPath,
} from "@/storefront/catalog-routing";
import {
  getTopicBreadcrumbLabels,
  selectTopicCategories,
} from "@/storefront/topic-hubs";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const content = getComputersHubSeoContent(locale);

  return buildSeoMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: buildComputersPath(),
    keywords: content.keywords,
  });
}

export default async function ComputersPage() {
  const [locale, catalog] = await Promise.all([
    getRequestLocale(),
    makeQueryClient().fetchQuery(storefrontCatalogQueryOptions({})),
  ]);
  const content = getComputersHubSeoContent(locale);
  const labels = getTopicBreadcrumbLabels(locale, "computers");
  const categories = selectTopicCategories(
    catalog.filters.categories,
    "computers",
  );

  return (
    <CatalogHubPage
      content={content}
      items={categories}
      type="category"
      path={buildComputersPath()}
      homeLabel={labels.home}
      sectionLabel={labels.section}
      sectionHref={buildElectronicsPath()}
      currentLabel={labels.current}
    />
  );
}
