import type { Metadata } from "next";
import CatalogHubPage from "@/components/Storefront/CatalogHubPage";
import Link from "next/link";
import { getLaptopsHubSeoContent } from "@/seo/topic-hub-content";
import { buildSeoMetadata } from "@/seo/metadata";
import { getRequestLocale } from "@/seo/request-locale";
import { storefrontCatalogQueryOptions } from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import {
  buildElectronicsPath,
  buildLaptopStudentsBishkekPath,
  buildLaptopStudentsOshPath,
  buildLaptopStudentsTalasPath,
  buildLaptopTeachersBishkekPath,
  buildLaptopTeachersOshPath,
  buildLaptopTeachersTalasPath,
  buildLaptopsPath,
} from "@/storefront/catalog-routing";
import {
  getTopicBreadcrumbLabels,
  selectTopicCategories,
} from "@/storefront/topic-hubs";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const content = getLaptopsHubSeoContent(locale);

  return buildSeoMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: buildLaptopsPath(),
    keywords: content.keywords,
  });
}

export default async function LaptopsPage() {
  const [locale, catalog] = await Promise.all([
    getRequestLocale(),
    makeQueryClient().fetchQuery(storefrontCatalogQueryOptions({})),
  ]);
  const content = getLaptopsHubSeoContent(locale);
  const labels = getTopicBreadcrumbLabels(locale, "laptops");
  const categories = selectTopicCategories(catalog.filters.categories, "laptops");

  return (
    <>
      <CatalogHubPage
        content={content}
        items={categories}
        type="category"
        path={buildLaptopsPath()}
        homeLabel={labels.home}
        sectionLabel={labels.section}
        sectionHref={buildElectronicsPath()}
        currentLabel={labels.current}
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
            <Link
              href={buildLaptopTeachersBishkekPath()}
              className="inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue/20 hover:text-blue"
            >
              {locale === "en"
                ? "Teacher laptops in Bishkek"
                : locale === "ky"
                  ? "Бишкекте мугалимдер үчүн ноутбук"
                  : "Ноутбук для учителей в Бишкеке"}
            </Link>
            <Link
              href={buildLaptopTeachersOshPath()}
              className="inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue/20 hover:text-blue"
            >
              {locale === "en"
                ? "Teacher laptops in Osh"
                : locale === "ky"
                  ? "Ошто мугалимдер үчүн ноутбук"
                  : "Ноутбук для учителей в Оше"}
            </Link>
            <Link
              href={buildLaptopTeachersTalasPath()}
              className="inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue/20 hover:text-blue"
            >
              {locale === "en"
                ? "Teacher laptops in Talas"
                : locale === "ky"
                  ? "Таласта мугалимдер үчүн ноутбук"
                  : "Ноутбук для учителей в Таласе"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
