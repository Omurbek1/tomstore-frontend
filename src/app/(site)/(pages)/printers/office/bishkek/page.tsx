import type { Metadata } from "next";
import CatalogHubPage from "@/components/Storefront/CatalogHubPage";
import { getOfficePrinterBishkekSeoContent } from "@/seo/intent-city-landing-content";
import { buildSeoMetadata } from "@/seo/metadata";
import { getRequestLocale } from "@/seo/request-locale";
import { storefrontCatalogQueryOptions } from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import {
  buildOfficePrinterBishkekPath,
  buildPrintersPath,
} from "@/storefront/catalog-routing";
import { selectTopicCategories } from "@/storefront/topic-hubs";

const getBreadcrumbLabels = (locale: string) => ({
  home: locale === "en" ? "Home" : locale === "ky" ? "Башкы бет" : "Главная",
  section:
    locale === "en" ? "Printers" : locale === "ky" ? "Принтерлер" : "Принтеры",
  current:
    locale === "en"
      ? "Office printer in Bishkek"
      : locale === "ky"
        ? "Бишкекте офис принтери"
        : "Офисный принтер в Бишкеке",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const content = getOfficePrinterBishkekSeoContent(locale);

  return buildSeoMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: buildOfficePrinterBishkekPath(),
    keywords: content.keywords,
  });
}

export default async function OfficePrinterBishkekPage() {
  const [locale, catalog] = await Promise.all([
    getRequestLocale(),
    makeQueryClient().fetchQuery(storefrontCatalogQueryOptions({})),
  ]);
  const content = getOfficePrinterBishkekSeoContent(locale);
  const labels = getBreadcrumbLabels(locale);
  const categories = selectTopicCategories(catalog.filters.categories, "printers");

  return (
    <CatalogHubPage
      content={content}
      items={categories}
      type="category"
      path={buildOfficePrinterBishkekPath()}
      homeLabel={labels.home}
      sectionLabel={labels.section}
      sectionHref={buildPrintersPath()}
      currentLabel={labels.current}
    />
  );
}
