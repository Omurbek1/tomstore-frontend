import type { Metadata } from "next";
import CatalogHubPage from "@/components/Storefront/CatalogHubPage";
import {
  getCityTopicBreadcrumbLabels,
  getComputersTalasSeoContent,
} from "@/seo/intent-city-topic-content";
import { buildSeoMetadata } from "@/seo/metadata";
import { getRequestLocale } from "@/seo/request-locale";
import { storefrontCatalogQueryOptions } from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import {
  buildComputersPath,
  buildComputersTalasPath,
} from "@/storefront/catalog-routing";
import { selectTopicCategories } from "@/storefront/topic-hubs";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const content = getComputersTalasSeoContent(locale);

  return buildSeoMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: buildComputersTalasPath(),
    keywords: content.keywords,
  });
}

export default async function ComputersTalasPage() {
  const [locale, catalog] = await Promise.all([
    getRequestLocale(),
    makeQueryClient().fetchQuery(storefrontCatalogQueryOptions({})),
  ]);
  const content = getComputersTalasSeoContent(locale);
  const labels = getCityTopicBreadcrumbLabels(locale, "computers", "talas");
  const categories = selectTopicCategories(catalog.filters.categories, "computers");

  return (
    <CatalogHubPage
      content={content}
      items={categories}
      type="category"
      path={buildComputersTalasPath()}
      homeLabel={labels.home}
      sectionLabel={labels.section}
      sectionHref={buildComputersPath()}
      currentLabel={labels.current}
    />
  );
}
