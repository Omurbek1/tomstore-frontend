import type { Metadata } from "next";
import CatalogHubPage from "@/components/Storefront/CatalogHubPage";
import { getTeacherLaptopBishkekSeoContent } from "@/seo/intent-city-landing-content";
import { buildSeoMetadata } from "@/seo/metadata";
import { getRequestLocale } from "@/seo/request-locale";
import { storefrontCatalogQueryOptions } from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import {
  buildLaptopTeachersBishkekPath,
  buildLaptopsPath,
} from "@/storefront/catalog-routing";
import { selectTopicCategories } from "@/storefront/topic-hubs";

const getBreadcrumbLabels = (locale: string) => ({
  home: locale === "en" ? "Home" : locale === "ky" ? "Башкы бет" : "Главная",
  section:
    locale === "en" ? "Laptops" : locale === "ky" ? "Ноутбуктар" : "Ноутбуки",
  current:
    locale === "en"
      ? "Teacher laptops in Bishkek"
      : locale === "ky"
        ? "Бишкекте мугалимдер үчүн ноутбук"
        : "Ноутбук для учителей в Бишкеке",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const content = getTeacherLaptopBishkekSeoContent(locale);

  return buildSeoMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: buildLaptopTeachersBishkekPath(),
    keywords: content.keywords,
  });
}

export default async function LaptopTeachersBishkekPage() {
  const [locale, catalog] = await Promise.all([
    getRequestLocale(),
    makeQueryClient().fetchQuery(storefrontCatalogQueryOptions({})),
  ]);
  const content = getTeacherLaptopBishkekSeoContent(locale);
  const labels = getBreadcrumbLabels(locale);
  const categories = selectTopicCategories(catalog.filters.categories, "laptops");

  return (
    <CatalogHubPage
      content={content}
      items={categories}
      type="category"
      path={buildLaptopTeachersBishkekPath()}
      homeLabel={labels.home}
      sectionLabel={labels.section}
      sectionHref={buildLaptopsPath()}
      currentLabel={labels.current}
    />
  );
}
