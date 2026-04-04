import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogHubPage from "@/components/Storefront/CatalogHubPage";
import {
  getElectronicsRegionalSeoContent,
  getRegionalTopicBreadcrumbLabels,
  getRegionalTopicStaticParams,
} from "@/seo/intent-regional-topic-content";
import { getRegionalLocation } from "@/seo/location-data";
import { buildSeoMetadata } from "@/seo/metadata";
import { getRequestLocale } from "@/seo/request-locale";
import { storefrontCatalogQueryOptions } from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import {
  buildElectronicsLocationPath,
  buildElectronicsPath,
} from "@/storefront/catalog-routing";
import { buildCategoryPath } from "@/storefront/catalog-routing";

const sortCategories = <T extends { totalProducts: number; name: string }>(
  items: T[],
) =>
  [...items].sort(
    (left, right) =>
      right.totalProducts - left.totalProducts || left.name.localeCompare(right.name),
  );

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
  const content = getElectronicsRegionalSeoContent(locale, locationData.slug);

  return buildSeoMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: buildElectronicsLocationPath(locationData.slug),
    keywords: content.keywords,
  });
}

export default async function ElectronicsLocationPage({ params }: PageParams) {
  const { location } = await params;
  const locationData = getRegionalLocation(location);

  if (!locationData) {
    notFound();
  }

  const [locale, catalog] = await Promise.all([
    getRequestLocale(),
    makeQueryClient().fetchQuery(storefrontCatalogQueryOptions({})),
  ]);
  const content = getElectronicsRegionalSeoContent(locale, locationData.slug);
  const labels = getRegionalTopicBreadcrumbLabels(locale, "electronics", locationData.slug);
  const categories = sortCategories(catalog.filters.categories).slice(0, 8);

  return (
    <CatalogHubPage
      content={content}
      items={categories}
      type="category"
      path={buildElectronicsLocationPath(locationData.slug)}
      homeLabel={labels.home}
      sectionLabel={labels.section}
      sectionHref={buildElectronicsPath()}
      currentLabel={labels.current}
    />
  );
}
