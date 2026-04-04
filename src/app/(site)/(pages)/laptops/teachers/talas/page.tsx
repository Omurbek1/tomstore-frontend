import type { Metadata } from "next";
import CatalogHubPage from "@/components/Storefront/CatalogHubPage";
import { getTeacherLaptopTalasSeoContent } from "@/seo/intent-city-landing-content";
import { buildSeoMetadata } from "@/seo/metadata";
import { getRequestLocale } from "@/seo/request-locale";
import { storefrontCatalogQueryOptions } from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import {
  buildLaptopTeachersTalasPath,
  buildLaptopsPath,
} from "@/storefront/catalog-routing";
import { selectTopicCategories } from "@/storefront/topic-hubs";

const getBreadcrumbLabels = (locale: string) => ({
  home: locale === "en" ? "Home" : locale === "ky" ? "Башкы бет" : "Главная",
  section:
    locale === "en" ? "Laptops" : locale === "ky" ? "Ноутбуктар" : "Ноутбуки",
  current:
    locale === "en"
      ? "Teacher laptops in Talas"
      : locale === "ky"
        ? "Таласта мугалимдер үчүн ноутбук"
        : "Ноутбук для учителей в Таласе",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const content = getTeacherLaptopTalasSeoContent(locale);

  return buildSeoMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: buildLaptopTeachersTalasPath(),
    keywords: content.keywords,
  });
}

export default async function LaptopTeachersTalasPage() {
  const [locale, catalog] = await Promise.all([
    getRequestLocale(),
    makeQueryClient().fetchQuery(storefrontCatalogQueryOptions({})),
  ]);
  const content = getTeacherLaptopTalasSeoContent(locale);
  const labels = getBreadcrumbLabels(locale);
  const categories = selectTopicCategories(catalog.filters.categories, "laptops");

  return (
    <CatalogHubPage
      content={content}
      items={categories}
      type="category"
      path={buildLaptopTeachersTalasPath()}
      homeLabel={labels.home}
      sectionLabel={labels.section}
      sectionHref={buildLaptopsPath()}
      currentLabel={labels.current}
    />
  );
}
