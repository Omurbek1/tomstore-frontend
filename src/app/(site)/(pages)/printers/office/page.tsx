import type { Metadata } from "next";
import CatalogHubPage from "@/components/Storefront/CatalogHubPage";
import {
  getOfficePrinterSeoContent,
} from "@/seo/intent-landing-content";
import { buildSeoMetadata } from "@/seo/metadata";
import { getRequestLocale } from "@/seo/request-locale";
import { storefrontCatalogQueryOptions } from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import {
  buildOfficePrinterPath,
  buildPrintersPath,
} from "@/storefront/catalog-routing";
import { selectTopicCategories } from "@/storefront/topic-hubs";

const getBreadcrumbLabels = (locale: string) => ({
  home: locale === "en" ? "Home" : locale === "ky" ? "Башкы бет" : "Главная",
  section:
    locale === "en"
      ? "Printers"
      : locale === "ky"
        ? "Принтерлер"
        : "Принтеры",
  current:
    locale === "en"
      ? "Office printer"
      : locale === "ky"
        ? "Офис принтери"
        : "Офисный принтер",
});

const getHubLabels = (locale: string) => ({
  cardLabel: locale === "en" ? "Category" : "Категория",
  itemCountLabel: locale === "en" ? "products" : locale === "ky" ? "товар" : "товаров",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const content = getOfficePrinterSeoContent(locale);

  return buildSeoMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: buildOfficePrinterPath(),
    keywords: content.keywords,
  });
}

export default async function OfficePrinterPage() {
  const [locale, catalog] = await Promise.all([
    getRequestLocale(),
    makeQueryClient().fetchQuery(storefrontCatalogQueryOptions({})),
  ]);
  const content = getOfficePrinterSeoContent(locale);
  const labels = getBreadcrumbLabels(locale);
  const hubLabels = getHubLabels(locale);
  const categories = selectTopicCategories(catalog.filters.categories, "printers");

  return (
    <CatalogHubPage
      content={content}
      items={categories}
      type="category"
      path={buildOfficePrinterPath()}
      homeLabel={labels.home}
      sectionLabel={labels.section}
      sectionHref={buildPrintersPath()}
      currentLabel={labels.current}
      cardLabel={hubLabels.cardLabel}
      itemCountLabel={hubLabels.itemCountLabel}
    />
  );
}
