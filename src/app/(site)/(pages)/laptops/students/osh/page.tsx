import type { Metadata } from "next";
import CatalogHubPage from "@/components/Storefront/CatalogHubPage";
import { getStudentLaptopOshSeoContent } from "@/seo/intent-city-landing-content";
import { buildSeoMetadata } from "@/seo/metadata";
import { getRequestLocale } from "@/seo/request-locale";
import { storefrontCatalogQueryOptions } from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import {
  buildLaptopStudentsOshPath,
  buildLaptopsPath,
} from "@/storefront/catalog-routing";
import { selectTopicCategories } from "@/storefront/topic-hubs";

const getBreadcrumbLabels = (locale: string) => ({
  home: locale === "en" ? "Home" : locale === "ky" ? "Башкы бет" : "Главная",
  section:
    locale === "en" ? "Laptops" : locale === "ky" ? "Ноутбуктар" : "Ноутбуки",
  current:
    locale === "en"
      ? "Student laptops in Osh"
      : locale === "ky"
        ? "Ошто студенттер үчүн ноутбук"
        : "Ноутбук для студентов в Оше",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const content = getStudentLaptopOshSeoContent(locale);

  return buildSeoMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: buildLaptopStudentsOshPath(),
    keywords: content.keywords,
  });
}

export default async function LaptopStudentsOshPage() {
  const [locale, catalog] = await Promise.all([
    getRequestLocale(),
    makeQueryClient().fetchQuery(storefrontCatalogQueryOptions({})),
  ]);
  const content = getStudentLaptopOshSeoContent(locale);
  const labels = getBreadcrumbLabels(locale);
  const categories = selectTopicCategories(catalog.filters.categories, "laptops");

  return (
    <CatalogHubPage
      content={content}
      items={categories}
      type="category"
      path={buildLaptopStudentsOshPath()}
      homeLabel={labels.home}
      sectionLabel={labels.section}
      sectionHref={buildLaptopsPath()}
      currentLabel={labels.current}
    />
  );
}
