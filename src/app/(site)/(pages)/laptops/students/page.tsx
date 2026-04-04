import type { Metadata } from "next";
import CatalogHubPage from "@/components/Storefront/CatalogHubPage";
import Link from "next/link";
import {
  getStudentLaptopSeoContent,
} from "@/seo/intent-landing-content";
import { buildSeoMetadata } from "@/seo/metadata";
import { getRequestLocale } from "@/seo/request-locale";
import { storefrontCatalogQueryOptions } from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import {
  buildLaptopStudentsPath,
  buildLaptopStudentsBishkekPath,
  buildLaptopStudentsOshPath,
  buildLaptopStudentsTalasPath,
  buildLaptopsPath,
} from "@/storefront/catalog-routing";
import { selectTopicCategories } from "@/storefront/topic-hubs";

const getBreadcrumbLabels = (locale: string) => ({
  home: locale === "en" ? "Home" : locale === "ky" ? "Башкы бет" : "Главная",
  section:
    locale === "en" ? "Laptops" : locale === "ky" ? "Ноутбуктар" : "Ноутбуки",
  current:
    locale === "en"
      ? "Laptops for students"
      : locale === "ky"
        ? "Студенттерге ноутбуктар"
        : "Ноутбук для студентов",
});

const getHubLabels = (locale: string) => ({
  cardLabel: locale === "en" ? "Category" : "Категория",
  itemCountLabel: locale === "en" ? "products" : locale === "ky" ? "товар" : "товаров",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const content = getStudentLaptopSeoContent(locale);

  return buildSeoMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: buildLaptopStudentsPath(),
    keywords: content.keywords,
  });
}

export default async function LaptopStudentsPage() {
  const [locale, catalog] = await Promise.all([
    getRequestLocale(),
    makeQueryClient().fetchQuery(storefrontCatalogQueryOptions({})),
  ]);
  const content = getStudentLaptopSeoContent(locale);
  const labels = getBreadcrumbLabels(locale);
  const hubLabels = getHubLabels(locale);
  const categories = selectTopicCategories(catalog.filters.categories, "laptops");

  return (
    <>
      <CatalogHubPage
        content={content}
        items={categories}
        type="category"
        path={buildLaptopStudentsPath()}
        homeLabel={labels.home}
        sectionLabel={labels.section}
        sectionHref={buildLaptopsPath()}
        currentLabel={labels.current}
        cardLabel={hubLabels.cardLabel}
        itemCountLabel={hubLabels.itemCountLabel}
      />
      <section className="mx-auto mt-8 max-w-[1170px] px-4 pb-8 sm:px-8 xl:px-0">
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-[0_18px_48px_-42px_rgba(15,23,42,0.5)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
            {locale === "en" ? "Cities" : locale === "ky" ? "Шаарлар" : "Города"}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={buildLaptopStudentsBishkekPath()}
              className="inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue/20 hover:text-blue"
            >
              {locale === "en"
                ? "Student laptops in Bishkek"
                : locale === "ky"
                  ? "Бишкекте студенттер үчүн ноутбук"
                  : "Ноутбук для студентов в Бишкеке"}
            </Link>
            <Link
              href={buildLaptopStudentsOshPath()}
              className="inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue/20 hover:text-blue"
            >
              {locale === "en"
                ? "Student laptops in Osh"
                : locale === "ky"
                  ? "Ошто студенттер үчүн ноутбук"
                  : "Ноутбук для студентов в Оше"}
            </Link>
            <Link
              href={buildLaptopStudentsTalasPath()}
              className="inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue/20 hover:text-blue"
            >
              {locale === "en"
                ? "Student laptops in Talas"
                : locale === "ky"
                  ? "Таласта студенттер үчүн ноутбук"
                  : "Ноутбук для студентов в Таласе"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
