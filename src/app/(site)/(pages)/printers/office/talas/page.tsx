import type { Metadata } from "next";
import CatalogHubPage from "@/components/Storefront/CatalogHubPage";
import { getOfficePrinterTalasSeoContent } from "@/seo/intent-city-landing-content";
import { buildSeoMetadata } from "@/seo/metadata";
import { getRequestLocale } from "@/seo/request-locale";
import { storefrontCatalogQueryOptions } from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import {
  buildOfficePrinterTalasPath,
  buildPrintersPath,
} from "@/storefront/catalog-routing";
import { selectTopicCategories } from "@/storefront/topic-hubs";

const getBreadcrumbLabels = (locale: string) => ({
  home: locale === "en" ? "Home" : locale === "ky" ? "Башкы бет" : "Главная",
  section:
    locale === "en" ? "Printers" : locale === "ky" ? "Принтерлер" : "Принтеры",
  current:
    locale === "en"
      ? "Office printer in Talas"
      : locale === "ky"
        ? "Таласта офис принтери"
        : "Офисный принтер в Таласе",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const content = getOfficePrinterTalasSeoContent(locale);

  return buildSeoMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: buildOfficePrinterTalasPath(),
    keywords: content.keywords,
  });
}

export default async function OfficePrinterTalasPage() {
  const [locale, catalog] = await Promise.all([
    getRequestLocale(),
    makeQueryClient().fetchQuery(storefrontCatalogQueryOptions({})),
  ]);
  const content = getOfficePrinterTalasSeoContent(locale);
  const labels = getBreadcrumbLabels(locale);
  const categories = selectTopicCategories(catalog.filters.categories, "printers");

  return (
    <CatalogHubPage
      content={content}
      items={categories}
      type="category"
      path={buildOfficePrinterTalasPath()}
      homeLabel={labels.home}
      sectionLabel={labels.section}
      sectionHref={buildPrintersPath()}
      currentLabel={labels.current}
    />
  );
}
