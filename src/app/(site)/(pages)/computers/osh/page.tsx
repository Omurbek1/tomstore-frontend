import type { Metadata } from "next";
import CatalogHubPage from "@/components/Storefront/CatalogHubPage";
import {
  getCityTopicBreadcrumbLabels,
  getComputersOshSeoContent,
} from "@/seo/intent-city-topic-content";
import { buildSeoMetadata } from "@/seo/metadata";
import { getRequestLocale } from "@/seo/request-locale";
import { storefrontCatalogQueryOptions } from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import {
  buildComputersOshPath,
  buildComputersPath,
} from "@/storefront/catalog-routing";
import { selectTopicCategories } from "@/storefront/topic-hubs";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const content = getComputersOshSeoContent(locale);

  return buildSeoMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: buildComputersOshPath(),
    keywords: content.keywords,
  });
}

export default async function ComputersOshPage() {
  const [locale, catalog] = await Promise.all([
    getRequestLocale(),
    makeQueryClient().fetchQuery(storefrontCatalogQueryOptions({})),
  ]);
  const content = getComputersOshSeoContent(locale);
  const labels = getCityTopicBreadcrumbLabels(locale, "computers", "osh");
  const categories = selectTopicCategories(catalog.filters.categories, "computers");

  return (
    <CatalogHubPage
      content={content}
      items={categories}
      type="category"
      path={buildComputersOshPath()}
      homeLabel={labels.home}
      sectionLabel={labels.section}
      sectionHref={buildComputersPath()}
      currentLabel={labels.current}
    />
  );
}
