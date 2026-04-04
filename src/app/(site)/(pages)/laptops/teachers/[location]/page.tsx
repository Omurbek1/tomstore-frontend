import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogHubPage from "@/components/Storefront/CatalogHubPage";
import {
  getRegionalLandingBreadcrumbLabels,
  getRegionalLandingStaticParams,
  getTeacherLaptopRegionalSeoContent,
} from "@/seo/intent-regional-landing-content";
import { getRegionalLocation } from "@/seo/location-data";
import { buildSeoMetadata } from "@/seo/metadata";
import { getRequestLocale } from "@/seo/request-locale";
import { storefrontCatalogQueryOptions } from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import {
  buildLaptopTeachersLocationPath,
  buildLaptopsPath,
} from "@/storefront/catalog-routing";
import { selectTopicCategories } from "@/storefront/topic-hubs";

type PageParams = {
  params: Promise<{ location: string }>;
};

export const generateStaticParams = async () => getRegionalLandingStaticParams();

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { location } = await params;
  const locale = await getRequestLocale();
  const locationData = getRegionalLocation(location) ?? getRegionalLocation("bishkek")!;

  const content = getTeacherLaptopRegionalSeoContent(locale, locationData.slug);

  return buildSeoMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: buildLaptopTeachersLocationPath(locationData.slug),
    keywords: content.keywords,
  });
}

export default async function LaptopTeachersLocationPage({
  params,
}: PageParams) {
  const { location } = await params;
  const locationData = getRegionalLocation(location);

  if (!locationData) {
    notFound();
  }

  const [locale, catalog] = await Promise.all([
    getRequestLocale(),
    makeQueryClient().fetchQuery(storefrontCatalogQueryOptions({})),
  ]);
  const content = getTeacherLaptopRegionalSeoContent(locale, locationData.slug);
  const labels = getRegionalLandingBreadcrumbLabels(
    locale,
    "teachers",
    locationData.slug,
  );
  const categories = selectTopicCategories(catalog.filters.categories, "laptops");

  return (
    <CatalogHubPage
      content={content}
      items={categories}
      type="category"
      path={buildLaptopTeachersLocationPath(locationData.slug)}
      homeLabel={labels.home}
      sectionLabel={labels.section}
      sectionHref={buildLaptopsPath()}
      currentLabel={labels.current}
    />
  );
}
