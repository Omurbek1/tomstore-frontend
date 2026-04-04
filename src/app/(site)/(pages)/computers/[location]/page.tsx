import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogHubPage from "@/components/Storefront/CatalogHubPage";
import {
  getComputersRegionalSeoContent,
  getRegionalTopicBreadcrumbLabels,
  getRegionalTopicStaticParams,
} from "@/seo/intent-regional-topic-content";
import { getRegionalLocation } from "@/seo/location-data";
import { buildSeoMetadata } from "@/seo/metadata";
import { getRequestLocale } from "@/seo/request-locale";
import { storefrontCatalogQueryOptions } from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import {
  buildComputersLocationPath,
  buildComputersPath,
} from "@/storefront/catalog-routing";
import { selectTopicCategories } from "@/storefront/topic-hubs";

type PageParams = {
  params: Promise<{ location: string }>;
};

export const generateStaticParams = async () => getRegionalTopicStaticParams();

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { location } = await params;
  const locale = await getRequestLocale();
  const locationData = getRegionalLocation(location) ?? getRegionalLocation("bishkek")!;
  const content = getComputersRegionalSeoContent(locale, locationData.slug);

  return buildSeoMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: buildComputersLocationPath(locationData.slug),
    keywords: content.keywords,
  });
}

export default async function ComputersLocationPage({ params }: PageParams) {
  const { location } = await params;
  const locationData = getRegionalLocation(location);

  if (!locationData) {
    notFound();
  }

  const [locale, catalog] = await Promise.all([
    getRequestLocale(),
    makeQueryClient().fetchQuery(storefrontCatalogQueryOptions({})),
  ]);
  const content = getComputersRegionalSeoContent(locale, locationData.slug);
  const labels = getRegionalTopicBreadcrumbLabels(locale, "computers", locationData.slug);
  const categories = selectTopicCategories(catalog.filters.categories, "computers");

  return (
    <CatalogHubPage
      content={content}
      items={categories}
      type="category"
      path={buildComputersLocationPath(locationData.slug)}
      homeLabel={labels.home}
      sectionLabel={labels.section}
      sectionHref={buildComputersPath()}
      currentLabel={labels.current}
    />
  );
}
