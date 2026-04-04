import type { Metadata } from "next";
import CatalogHubPage from "@/components/Storefront/CatalogHubPage";
import Link from "next/link";
import { getComputersHubSeoContent } from "@/seo/topic-hub-content";
import { buildSeoMetadata } from "@/seo/metadata";
import {
  getRegionalTopicLinkLabel,
} from "@/seo/intent-regional-topic-content";
import {
  REGIONAL_LOCATION_ORDER,
} from "@/seo/location-data";
import { getRequestLocale } from "@/seo/request-locale";
import { storefrontCatalogQueryOptions } from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import {
  buildComputersLocationPath,
  buildComputersPath,
  buildElectronicsPath,
} from "@/storefront/catalog-routing";
import {
  getTopicBreadcrumbLabels,
  selectTopicCategories,
} from "@/storefront/topic-hubs";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const content = getComputersHubSeoContent(locale);

  return buildSeoMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: buildComputersPath(),
    keywords: content.keywords,
  });
}

export default async function ComputersPage() {
  const [locale, catalog] = await Promise.all([
    getRequestLocale(),
    makeQueryClient().fetchQuery(storefrontCatalogQueryOptions({})),
  ]);
  const content = getComputersHubSeoContent(locale);
  const labels = getTopicBreadcrumbLabels(locale, "computers");
  const categories = selectTopicCategories(
    catalog.filters.categories,
    "computers",
  );

  return (
    <>
      <CatalogHubPage
        content={content}
        items={categories}
        type="category"
        path={buildComputersPath()}
        homeLabel={labels.home}
        sectionLabel={labels.section}
        sectionHref={buildElectronicsPath()}
        currentLabel={labels.current}
      />
      <section className="mx-auto mt-8 max-w-[1170px] px-4 pb-8 sm:px-8 xl:px-0">
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-[0_18px_48px_-42px_rgba(15,23,42,0.5)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
            {locale === "en" ? "Regions" : locale === "ky" ? "Аймактар" : "Регионы"}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {REGIONAL_LOCATION_ORDER.map((location) => (
              <Link
                key={location}
                href={buildComputersLocationPath(location)}
                className="inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue/20 hover:text-blue"
              >
                {getRegionalTopicLinkLabel(locale, "computers", location)}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
