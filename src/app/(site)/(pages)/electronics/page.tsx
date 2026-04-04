import type { Metadata } from "next";
import CatalogHubSection from "@/components/Storefront/CatalogHubSection";
import Link from "next/link";
import { getElectronicsHubSeoContent } from "@/seo/content";
import { buildSeoMetadata } from "@/seo/metadata";
import { getRequestLocale } from "@/seo/request-locale";
import { storefrontCatalogQueryOptions } from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import { buildAbsoluteUrl } from "@/storefront/site";
import {
  buildCategoryPath,
  buildElectronicsBishkekPath,
  buildElectronicsOshPath,
  buildElectronicsTalasPath,
  buildElectronicsPath,
} from "@/storefront/catalog-routing";

const sortCategories = <T extends { totalProducts: number; name: string }>(
  items: T[],
) =>
  [...items].sort(
    (left, right) =>
      right.totalProducts - left.totalProducts || left.name.localeCompare(right.name),
  );

const getBreadcrumbLabels = (locale: string) => ({
  home: locale === "en" ? "Home" : locale === "ky" ? "Башкы бет" : "Главная",
  current: locale === "en" ? "Electronics" : locale === "ky" ? "Электроника" : "Электроника",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const content = getElectronicsHubSeoContent(locale);

  return buildSeoMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: buildElectronicsPath(),
    keywords: content.keywords,
  });
}

export default async function ElectronicsPage() {
  const [locale, catalog] = await Promise.all([
    getRequestLocale(),
    makeQueryClient().fetchQuery(storefrontCatalogQueryOptions({})),
  ]);
  const content = getElectronicsHubSeoContent(locale);
  const categories = sortCategories(catalog.filters.categories).slice(0, 8);
  const breadcrumbLabels = getBreadcrumbLabels(locale);
  const collectionStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: content.metaTitle,
    description: content.metaDescription,
    url: buildAbsoluteUrl(buildElectronicsPath()),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: categories.length,
      itemListElement: categories.map((category, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: buildAbsoluteUrl(buildCategoryPath(category.slug)),
        name: category.name,
      })),
    },
  };
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: breadcrumbLabels.home,
        item: buildAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: breadcrumbLabels.current,
        item: buildAbsoluteUrl(buildElectronicsPath()),
      },
    ],
  };
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      <CatalogHubSection content={content} type="category" items={categories} />
      <section className="mx-auto mt-8 max-w-[1170px] px-4 pb-8 sm:px-8 xl:px-0">
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-[0_18px_48px_-42px_rgba(15,23,42,0.5)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
            {locale === "en" ? "Cities" : locale === "ky" ? "Шаарлар" : "Города"}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={buildElectronicsBishkekPath()}
              className="inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue/20 hover:text-blue"
            >
              {locale === "en"
                ? "Electronics in Bishkek"
                : locale === "ky"
                  ? "Бишкекте электроника"
                  : "Электроника в Бишкеке"}
            </Link>
            <Link
              href={buildElectronicsOshPath()}
              className="inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue/20 hover:text-blue"
            >
              {locale === "en"
                ? "Electronics in Osh"
                : locale === "ky"
                  ? "Ошто электроника"
                  : "Электроника в Оше"}
            </Link>
            <Link
              href={buildElectronicsTalasPath()}
              className="inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue/20 hover:text-blue"
            >
              {locale === "en"
                ? "Electronics in Talas"
                : locale === "ky"
                  ? "Таласта электроника"
                  : "Электроника в Таласе"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
