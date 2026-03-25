"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useI18n } from "@/i18n/provider";
import { mapStorefrontProductsToProducts } from "@/storefront/mappers";
import {
  buildCatalogHref,
  getCatalogBaseQuery,
  type CatalogRouteContext,
} from "@/storefront/catalog-routing";
import {
  fetchStorefrontCatalog,
  type StorefrontCatalogApiParams,
} from "@/storefront/query-options";
import {
  type StorefrontCatalogRouteQuery,
  toStorefrontCatalogApiParams,
} from "@/storefront/query-keys";
import type {
  StorefrontCatalogResponse,
  StorefrontProductCard,
} from "@/storefront/types";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import CatalogResults from "./CatalogResults";
import CatalogSidebarFilters from "./CatalogSidebarFilters";

type CatalogViewProps = {
  catalog: StorefrontCatalogResponse;
  title?: string;
  breadcrumbCurrent?: string;
  routeContext?: CatalogRouteContext;
  query: StorefrontCatalogRouteQuery;
  variant: "sidebar" | "full";
};

const buildMergedCatalogItems = (pages: StorefrontCatalogResponse[]) => {
  const itemsById = new Map<string, StorefrontProductCard>();

  for (const pageData of pages) {
    for (const item of pageData.items || []) {
      if (!itemsById.has(item.id)) {
        itemsById.set(item.id, item);
      }
    }
  }

  return Array.from(itemsById.values());
};

export default function CatalogView({
  catalog,
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
  const [isNavigationPending, startTransition] = useTransition();
  const [productStyle, setProductStyle] = useState<"grid" | "list">(
    query.view === "list" ? "list" : "grid",
  );
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const autoLoadUnlockedRef = useRef(true);
  const filters = catalog.filters || { categories: [], brands: [] };
  const baseQuery = getCatalogBaseQuery(routeContext);
  const pageTitle = title || t("common.shop");
  const catalogFeedParams = useMemo<StorefrontCatalogApiParams>(
    () => ({
      ...toStorefrontCatalogApiParams(query),
      page: undefined,
      pageSize: catalog.pageSize,
    }),
    [catalog.pageSize, query],
  );
  const initialPage = catalog.page || 1;
  const {
    data: infiniteCatalog,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["storefront", "catalog-infinite", catalogFeedParams],
    initialPageParam: initialPage,
    initialData: {
      pages: [catalog],
      pageParams: [initialPage],
    },
    queryFn: ({ pageParam, signal }) =>
      fetchStorefrontCatalog(
        {
          ...catalogFeedParams,
          page: String(pageParam),
        },
        {
          init: {
            signal,
          },
        },
      ),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    refetchOnMount: false,
    staleTime: 120_000,
  });
  const catalogPages = useMemo(
    () => infiniteCatalog?.pages || [catalog],
    [catalog, infiniteCatalog?.pages],
  );
  const mergedCatalogItems = useMemo(
    () => buildMergedCatalogItems(catalogPages),
    [catalogPages],
  );
  const products = useMemo(
    () => mapStorefrontProductsToProducts(mergedCatalogItems),
    [mergedCatalogItems],
  );
  const lastLoadedPage = catalogPages[catalogPages.length - 1] || catalog;
  const total = lastLoadedPage.total || catalog.total || 0;
  const loadedCount = mergedCatalogItems.length;

  useEffect(() => {
    setProductStyle(query.view === "list" ? "list" : "grid");
  }, [query.view]);

  useEffect(() => {
    const node = loadMoreRef.current;

    if (!node || !hasNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }

        if (!entry.isIntersecting) {
          autoLoadUnlockedRef.current = true;
          return;
        }

        if (!autoLoadUnlockedRef.current || isFetchingNextPage) {
          return;
        }

        autoLoadUnlockedRef.current = false;
        void fetchNextPage();
      },
      {
        rootMargin: "320px 0px",
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

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
                        startTransition(() => {
                          router.push(
                            buildCatalogHref(
                              {
                                ...query,
                                sort: event.target.value,
                                page: undefined,
                              },
                              routeContext,
                            ),
                          );
                        })
                      }
                      className="rounded-md border border-gray-3 bg-gray-1 px-3 py-2 outline-none"
                    >
                      <option value="popular">{t("common.popular")}</option>
                      <option value="newest">{t("common.newest")}</option>
                      <option value="price_asc">{t("common.priceLowHigh")}</option>
                      <option value="price_desc">{t("common.priceHighLow")}</option>
                      <option value="name">{t("common.nameSort")}</option>
                    </select>

                    {isNavigationPending ? (
                      <span className="inline-flex rounded-full bg-gray-2 px-3 py-2 text-custom-xs font-medium text-dark-4">
                        {t("common.refreshing")}
                      </span>
                    ) : null}

                    <p>
                      {t("common.showingOfProducts", {
                        shown: loadedCount,
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

              {hasNextPage || isFetchingNextPage ? (
                <div className="mt-12 flex flex-col items-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      if (!isFetchingNextPage) {
                        void fetchNextPage();
                      }
                    }}
                    disabled={isFetchingNextPage}
                    className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-dark px-6 py-3 text-sm font-medium text-dark transition-all duration-200 hover:-translate-y-0.5 hover:bg-dark hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isFetchingNextPage
                      ? t("catalog.loadingMore")
                      : t("catalog.loadMore")}
                  </button>
                  <div
                    ref={loadMoreRef}
                    aria-hidden="true"
                    className="h-1 w-full"
                  />
                  <p className="text-center text-sm text-dark-4">
                    {t("common.showingOfProducts", {
                      shown: loadedCount,
                      total,
                    })}
                  </p>
                </div>
              ) : null}

              {!hasNextPage && loadedCount > 0 ? (
                <div className="mt-12 flex justify-center">
                  <div className="rounded-full bg-white px-5 py-3 text-sm text-dark-4 shadow-1">
                    {t("common.showingOfProducts", {
                      shown: loadedCount,
                      total,
                    })}
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
