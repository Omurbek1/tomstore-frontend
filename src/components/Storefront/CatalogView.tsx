"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import QueryStatusCard from "@/components/Common/QueryStatusCard";
import { useI18n } from "@/i18n/provider";
import { useStorefrontCatalogQuery } from "@/storefront/hooks";
import { mapStorefrontProductsToProducts } from "@/storefront/mappers";
import {
  buildCatalogHref,
  getCatalogBaseQuery,
  type CatalogRouteContext,
} from "@/storefront/catalog-routing";
import { type StorefrontCatalogRouteQuery } from "@/storefront/query-keys";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import CatalogResults from "./CatalogResults";
import CatalogSidebarFilters from "./CatalogSidebarFilters";

type CatalogViewProps = {
  title?: string;
  breadcrumbCurrent?: string;
  routeContext?: CatalogRouteContext;
  query: StorefrontCatalogRouteQuery;
  variant: "sidebar" | "full";
};

const buildPages = (currentPage: number, totalPages: number) => {
  const pages = new Set<number>([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);

  return Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((left, right) => left - right);
};

export default function CatalogView({
  title,
  breadcrumbCurrent,
  routeContext = {
    type: "catalog",
  },
  query,
  variant,
}: CatalogViewProps) {
  const router = useRouter();
  const { t } = useI18n();
  const { data, isPending, isError, isFetching, refetch } =
    useStorefrontCatalogQuery(query);
  const [productStyle, setProductStyle] = useState<"grid" | "list">(
    query.view === "list" ? "list" : "grid",
  );
  const products = useMemo(
    () => mapStorefrontProductsToProducts(data?.items || []),
    [data?.items],
  );
  const total = data?.total || 0;
  const page = data?.page || 1;
  const totalPages = data?.totalPages || 1;
  const filters = data?.filters || { categories: [], brands: [] };
  const baseQuery = getCatalogBaseQuery(routeContext);
  const pageTitle = title || t("common.shop");

  const pages = useMemo(() => buildPages(page, totalPages), [page, totalPages]);

  useEffect(() => {
    setProductStyle(query.view === "list" ? "list" : "grid");
  }, [query.view]);

  return (
    <>
      <Breadcrumb
        title={pageTitle}
        pages={
          breadcrumbCurrent
            ? [t("common.shop"), breadcrumbCurrent]
            : [t("common.shop")]
        }
      />

      <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28 bg-[#f3f4f6]">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          {isPending && !data ? (
            <QueryStatusCard
              state="loading"
              title={t("catalog.loading")}
              description={t("common.loadingHint")}
              className="mb-6"
            />
          ) : null}

          {isError && !data ? (
            <QueryStatusCard
              state="error"
              title={t("catalog.error")}
              description={t("common.errorHint")}
              actionLabel={t("common.retry")}
              onAction={() => {
                void refetch();
              }}
              className="mb-6"
            />
          ) : null}

          <div className="flex gap-7.5 items-start">
            {variant === "sidebar" ? (
              <aside className="hidden xl:block max-w-[270px] w-full">
                <CatalogSidebarFilters
                  baseQuery={baseQuery}
                  filters={filters}
                  query={query}
                  routeContext={routeContext}
                />
              </aside>
            ) : null}

            <div className="w-full">
              <div className="rounded-lg bg-white shadow-1 p-4 sm:px-5 sm:py-3 mb-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-wrap items-center gap-4">
                    <select
                      value={query.sort || "popular"}
                      onChange={(event) =>
                        router.push(
                          buildCatalogHref(
                            {
                              ...query,
                              sort: event.target.value,
                              page: undefined,
                            },
                            routeContext,
                          ),
                        )
                      }
                      className="rounded-md border border-gray-3 bg-gray-1 px-3 py-2 outline-none"
                    >
                      <option value="popular">{t("common.popular")}</option>
                      <option value="newest">{t("common.newest")}</option>
                      <option value="price_asc">{t("common.priceLowHigh")}</option>
                      <option value="price_desc">{t("common.priceHighLow")}</option>
                      <option value="name">{t("common.nameSort")}</option>
                    </select>

                    {isFetching && data ? (
                      <span className="inline-flex rounded-full bg-gray-2 px-3 py-2 text-custom-xs font-medium text-dark-4">
                        {t("common.refreshing")}
                      </span>
                    ) : null}

                    <p>
                      {t("common.showingOfProducts", {
                        shown: products.length,
                        total,
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => setProductStyle("grid")}
                      aria-label="grid view"
                      className={`flex items-center justify-center w-10.5 h-9 rounded-[5px] border ${
                        productStyle === "grid"
                          ? "bg-blue border-blue text-white"
                          : "text-dark bg-gray-1 border-gray-3"
                      }`}
                    >
                      G
                    </button>
                    <button
                      onClick={() => setProductStyle("list")}
                      aria-label="list view"
                      className={`flex items-center justify-center w-10.5 h-9 rounded-[5px] border ${
                        productStyle === "list"
                          ? "bg-blue border-blue text-white"
                          : "text-dark bg-gray-1 border-gray-3"
                      }`}
                    >
                      L
                    </button>
                  </div>
                </div>
              </div>

              <CatalogResults
                productStyle={productStyle}
                products={products}
                variant={variant}
              />

              {totalPages > 1 ? (
                <div className="flex justify-center mt-15">
                  <div className="bg-white shadow-1 rounded-md p-2">
                    <ul className="flex items-center gap-1">
                      {pages.map((pageNumber) => (
                        <li key={pageNumber}>
                          <Link
                            href={buildCatalogHref(
                              {
                                ...query,
                                page: String(pageNumber),
                              },
                              routeContext,
                            )}
                            className={`flex py-1.5 px-3.5 rounded-[3px] duration-200 ${
                              pageNumber === page
                                ? "bg-blue text-white"
                                : "hover:text-white hover:bg-blue"
                            }`}
                          >
                            {pageNumber}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
