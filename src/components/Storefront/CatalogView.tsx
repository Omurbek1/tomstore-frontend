"use client";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";
import { useI18n } from "@/i18n/provider";
import { getAvailabilityMessageKey } from "@/i18n/utils";
import { mapStorefrontProductsToProducts } from "@/storefront/mappers";
import {
  buildCatalogHref,
  getCatalogBaseQuery,
  humanizeCatalogSlug,
  type CatalogRouteContext,
} from "@/storefront/catalog-routing";
import {
  clearActiveCatalogRestoreKey,
  clearPendingCatalogRestore,
  hasPendingCatalogRestore,
  readCatalogScrollSnapshot,
  saveCatalogScrollSnapshot,
  setActiveCatalogRestoreKey,
} from "@/storefront/catalog-restoration";
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

type CatalogActiveFilterChip = {
  href: string;
  key: keyof StorefrontCatalogRouteQuery;
  label: string;
};

const CATALOG_PAGE_STALE_TIME_MS = 120_000;
const CATALOG_CACHE_GC_TIME_MS = 30 * 60_000;
const CATALOG_PREFETCH_ROOT_MARGIN = "1200px 0px";
const CATALOG_AUTO_LOAD_ROOT_MARGIN = "320px 0px";

const buildCatalogPageQueryKey = (
  params: StorefrontCatalogApiParams,
  page: number,
) => ["storefront", "catalog-page", params, page] as const;

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

const CatalogGridIcon = ({ active = false }: { active?: boolean }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={active ? "text-current" : "text-current"}
  >
    <rect x="2" y="2" width="5" height="5" rx="1.5" fill="currentColor" />
    <rect x="11" y="2" width="5" height="5" rx="1.5" fill="currentColor" />
    <rect x="2" y="11" width="5" height="5" rx="1.5" fill="currentColor" />
    <rect x="11" y="11" width="5" height="5" rx="1.5" fill="currentColor" />
  </svg>
);

const CatalogListIcon = ({ active = false }: { active?: boolean }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={active ? "text-current" : "text-current"}
  >
    <rect x="2" y="3" width="3" height="3" rx="1" fill="currentColor" />
    <rect x="2" y="8" width="3" height="3" rx="1" fill="currentColor" />
    <rect x="2" y="13" width="3" height="3" rx="1" fill="currentColor" />
    <rect x="7" y="3" width="9" height="2" rx="1" fill="currentColor" />
    <rect x="7" y="8" width="9" height="2" rx="1" fill="currentColor" />
    <rect x="7" y="13" width="9" height="2" rx="1" fill="currentColor" />
  </svg>
);

const CatalogFilterIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 5H15M5.5 9H12.5M7.5 13H10.5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const CatalogCloseIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

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
  const queryClient = useQueryClient();
  const { t } = useI18n();
  const [isNavigationPending, startTransition] = useTransition();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [productStyle, setProductStyle] = useState<"grid" | "list">(
    query.view === "list" ? "list" : "grid",
  );
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const autoLoadUnlockedRef = useRef(true);
  const prefetchUnlockedRef = useRef(true);
  const hasRestoredScrollRef = useRef(false);
  const filters = catalog.filters || { categories: [], brands: [] };
  const baseQuery = getCatalogBaseQuery(routeContext);
  const pageTitle = title || t("common.shop");
  const categoryNameBySlug = useMemo(
    () =>
      new Map<string, string>(
        filters.categories.map(
          (category): [string, string] => [category.slug, category.name],
        ),
      ),
    [filters.categories],
  );
  const brandNameBySlug = useMemo(
    () =>
      new Map<string, string>(
        filters.brands.map((brand): [string, string] => [brand.slug, brand.name]),
      ),
    [filters.brands],
  );
  const restoreKey = useMemo(
    () =>
      buildCatalogHref(
        {
          ...query,
          page: undefined,
        },
        routeContext,
      ),
    [query, routeContext],
  );
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
      queryClient.ensureQueryData({
        queryKey: buildCatalogPageQueryKey(catalogFeedParams, Number(pageParam)),
        gcTime: CATALOG_CACHE_GC_TIME_MS,
        staleTime: CATALOG_PAGE_STALE_TIME_MS,
        queryFn: ({ signal: querySignal }) =>
          fetchStorefrontCatalog(
            {
              ...catalogFeedParams,
              page: String(pageParam),
            },
            {
              init: {
                signal: signal ?? querySignal,
              },
            },
          ),
      }),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    gcTime: CATALOG_CACHE_GC_TIME_MS,
    refetchOnMount: false,
    staleTime: CATALOG_PAGE_STALE_TIME_MS,
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
  const nextPageToPrefetch = hasNextPage ? lastLoadedPage.page + 1 : undefined;
  const loadingSkeletonCount = productStyle === "list" ? 2 : 10;
  const quickCategories = useMemo(() => filters.categories.slice(0, 8), [filters.categories]);
  const quickBrands = useMemo(() => filters.brands.slice(0, 10), [filters.brands]);
  const activeFilterChips = useMemo<CatalogActiveFilterChip[]>(() => {
    const chips: CatalogActiveFilterChip[] = [];

    if (query.q) {
      chips.push({
        key: "q",
        label: `${t("catalog.search")}: ${query.q}`,
        href: buildCatalogHref(
          {
            ...query,
            page: undefined,
            q: undefined,
          },
          routeContext,
        ),
      });
    }

    if (query.category) {
      chips.push({
        key: "category",
        label:
          categoryNameBySlug.get(query.category) ||
          humanizeCatalogSlug(query.category),
        href: buildCatalogHref(
          {
            ...query,
            category: undefined,
            page: undefined,
          },
          routeContext,
        ),
      });
    }

    if (query.brand) {
      chips.push({
        key: "brand",
        label: brandNameBySlug.get(query.brand) || humanizeCatalogSlug(query.brand),
        href: buildCatalogHref(
          {
            ...query,
            brand: undefined,
            page: undefined,
          },
          routeContext,
        ),
      });
    }

    if (query.availability) {
      chips.push({
        key: "availability",
        label: t(
          getAvailabilityMessageKey(query.availability) || query.availability,
        ),
        href: buildCatalogHref(
          {
            ...query,
            availability: undefined,
            page: undefined,
          },
          routeContext,
        ),
      });
    }

    if (query.label) {
      chips.push({
        key: "label",
        label: humanizeCatalogSlug(query.label),
        href: buildCatalogHref(
          {
            ...query,
            label: undefined,
            page: undefined,
          },
          routeContext,
        ),
      });
    }

    return chips;
  }, [brandNameBySlug, categoryNameBySlug, query, routeContext, t]);
  const activeFilterCount = activeFilterChips.length;
  const hasQuickFilterShelves =
    quickCategories.length > 0 ||
    quickBrands.length > 0;

  const navigateCatalog = (nextQuery: StorefrontCatalogRouteQuery) => {
    startTransition(() => {
      router.push(buildCatalogHref(nextQuery, routeContext));
    });
  };

  const buildFilterHref = (
    nextQuery: StorefrontCatalogRouteQuery,
    preferredPrimary: "auto" | "category" | "brand" = "auto",
  ) => buildCatalogHref(nextQuery, routeContext, preferredPrimary);

  const handleProductStyleChange = (nextStyle: "grid" | "list") => {
    setProductStyle(nextStyle);
    navigateCatalog({
      ...query,
      page: undefined,
      view: nextStyle === "list" ? "list" : undefined,
    });
  };

  const handleSortChange = (nextSort: string) => {
    navigateCatalog({
      ...query,
      page: undefined,
      sort: nextSort,
    });
  };

  useEffect(() => {
    setProductStyle(query.view === "list" ? "list" : "grid");
  }, [query.view]);

  useEffect(() => {
    setIsMobileFiltersOpen(false);
  }, [restoreKey]);

  useEffect(() => {
    if (!isMobileFiltersOpen || typeof document === "undefined") {
      return;
    }

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isMobileFiltersOpen]);

  useEffect(() => {
    hasRestoredScrollRef.current = false;
  }, [restoreKey]);

  useEffect(() => {
    setActiveCatalogRestoreKey(restoreKey);

    return () => {
      clearActiveCatalogRestoreKey(restoreKey);
    };
  }, [restoreKey]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let frameId: number | null = null;
    const persistScrollSnapshot = () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
        frameId = null;
      }

      saveCatalogScrollSnapshot(restoreKey, window.scrollY);
    };
    const schedulePersistScrollSnapshot = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        saveCatalogScrollSnapshot(restoreKey, window.scrollY);
      });
    };

    persistScrollSnapshot();
    window.addEventListener("scroll", schedulePersistScrollSnapshot, {
      passive: true,
    });
    window.addEventListener("pagehide", persistScrollSnapshot);

    return () => {
      persistScrollSnapshot();
      window.removeEventListener("scroll", schedulePersistScrollSnapshot);
      window.removeEventListener("pagehide", persistScrollSnapshot);
    };
  }, [restoreKey]);

  useEffect(() => {
    if (
      hasRestoredScrollRef.current ||
      !loadedCount ||
      !hasPendingCatalogRestore(restoreKey)
    ) {
      return;
    }

    hasRestoredScrollRef.current = true;
    clearPendingCatalogRestore(restoreKey);

    const snapshot = readCatalogScrollSnapshot(restoreKey);

    if (!snapshot || snapshot.scrollY <= 0 || typeof window === "undefined") {
      return;
    }

    let frameId = 0;
    let attempts = 0;
    const restoreScrollPosition = () => {
      attempts += 1;

      const maxScrollY = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        0,
      );
      const targetScrollY = Math.min(snapshot.scrollY, maxScrollY);

      window.scrollTo(0, targetScrollY);

      if (maxScrollY >= snapshot.scrollY || attempts >= 12) {
        return;
      }

      frameId = window.requestAnimationFrame(restoreScrollPosition);
    };

    frameId = window.requestAnimationFrame(restoreScrollPosition);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [loadedCount, restoreKey]);

  useEffect(() => {
    const node = loadMoreRef.current;

    if (!node || !nextPageToPrefetch || isFetchingNextPage) {
      return;
    }

    const pageQueryKey = buildCatalogPageQueryKey(
      catalogFeedParams,
      nextPageToPrefetch,
    );
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }

        if (!entry.isIntersecting) {
          prefetchUnlockedRef.current = true;
          return;
        }

        if (!prefetchUnlockedRef.current) {
          return;
        }

        const pageQueryState =
          queryClient.getQueryState<StorefrontCatalogResponse>(pageQueryKey);

        if (
          pageQueryState?.fetchStatus === "fetching" ||
          pageQueryState?.status === "success"
        ) {
          prefetchUnlockedRef.current = false;
          return;
        }

        prefetchUnlockedRef.current = false;
        void queryClient.prefetchQuery({
          queryKey: pageQueryKey,
          gcTime: CATALOG_CACHE_GC_TIME_MS,
          staleTime: CATALOG_PAGE_STALE_TIME_MS,
          queryFn: ({ signal }) =>
            fetchStorefrontCatalog(
              {
                ...catalogFeedParams,
                page: String(nextPageToPrefetch),
              },
              {
                init: {
                  signal,
                },
              },
            ),
        });
      },
      {
        rootMargin: CATALOG_PREFETCH_ROOT_MARGIN,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [
    catalogFeedParams,
    isFetchingNextPage,
    nextPageToPrefetch,
    queryClient,
  ]);

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
        rootMargin: CATALOG_AUTO_LOAD_ROOT_MARGIN,
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

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#edf3fb_0%,#f7f9fc_26%,#f3f4f6_100%)] pb-20 pt-5 lg:pt-16 xl:pt-20">
        <div className="pointer-events-none absolute left-[4%] top-16 h-44 w-44 rounded-full bg-blue/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[6%] top-28 h-56 w-56 rounded-full bg-sky-200/20 blur-3xl" />

        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-8 xl:px-6 2xl:px-0">
          <div className="w-full">
              <div className="mb-6 overflow-hidden rounded-[32px] border border-white/80 bg-white/92 p-4 shadow-[0_28px_72px_-48px_rgba(15,23,42,0.26)] backdrop-blur-sm sm:p-5 xl:p-6">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex rounded-full border border-blue/15 bg-blue/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue">
                        TOMSTORE
                      </span>

                      {isNavigationPending ? (
                        <span className="inline-flex rounded-full border border-blue/10 bg-blue/5 px-3 py-1.5 text-[12px] font-medium text-blue">
                          {t("common.refreshing")}
                        </span>
                      ) : null}
                    </div>

                    <h2 className="mt-3 text-[24px] font-semibold leading-tight text-dark sm:text-[28px] xl:text-[32px]">
                      {pageTitle}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-dark-4 sm:text-[15px]">
                      {t("common.showingOfProducts", {
                        shown: loadedCount,
                        total,
                      })}
                    </p>

                    {activeFilterCount > 0 ? (
                      <div className="mt-4 flex flex-wrap items-center gap-2.5">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-4">
                          {t("catalog.activeFilters")}
                        </span>

                        {activeFilterChips.map((chip) => (
                          <button
                            key={`${chip.key}-${chip.label}`}
                            type="button"
                            onClick={() => {
                              startTransition(() => {
                                router.push(chip.href);
                              });
                            }}
                            className="inline-flex items-center gap-2 rounded-full border border-blue/15 bg-blue/5 px-3.5 py-2 text-sm font-medium text-blue transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue hover:text-white"
                          >
                            <span>{chip.label}</span>
                            <CatalogCloseIcon />
                          </button>
                        ))}

                        <button
                          type="button"
                          onClick={() => {
                            startTransition(() => {
                              router.push(buildCatalogHref(baseQuery, routeContext));
                            });
                          }}
                          className="inline-flex rounded-full border border-gray-3 bg-white px-3.5 py-2 text-sm font-medium text-dark transition-all duration-200 hover:border-dark hover:bg-dark hover:text-white"
                        >
                          {t("common.cleanAll")}
                        </button>
                      </div>
                    ) : null}

                    {hasQuickFilterShelves ? (
                      <div className="mt-5 grid gap-4">
                        {quickCategories.length > 0 ? (
                          <div className="grid gap-2">
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-4">
                                {t("catalog.categories")}
                              </span>
                            </div>
                            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                              {quickCategories.map((category) => {
                                const isActive = query.category === category.slug;

                                return (
                                  <Link
                                    key={category.slug}
                                    href={buildFilterHref(
                                      {
                                        ...query,
                                        category: isActive ? undefined : category.slug,
                                        page: undefined,
                                      },
                                      "category",
                                    )}
                                    className={`inline-flex min-w-fit items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                                      isActive
                                        ? "border-blue/20 bg-blue text-white shadow-[0_20px_34px_-24px_rgba(60,80,224,0.75)]"
                                        : "border-gray-3 bg-white text-dark hover:border-blue/20 hover:bg-blue/5 hover:text-blue"
                                    }`}
                                  >
                                    <span>{category.name}</span>
                                    <span
                                      className={`inline-flex min-w-[24px] items-center justify-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                                        isActive
                                          ? "bg-white/18 text-white"
                                          : "bg-gray-2 text-dark-4"
                                      }`}
                                    >
                                      {category.totalProducts}
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ) : null}

                        {quickBrands.length > 0 ? (
                          <div className="grid gap-2">
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-4">
                                {t("catalog.brands")}
                              </span>
                            </div>
                            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                              {quickBrands.map((brand) => {
                                const isActive = query.brand === brand.slug;

                                return (
                                  <Link
                                    key={brand.slug}
                                    href={buildFilterHref(
                                      {
                                        ...query,
                                        brand: isActive ? undefined : brand.slug,
                                        page: undefined,
                                      },
                                      "brand",
                                    )}
                                    className={`inline-flex min-w-fit items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                                      isActive
                                        ? "border-blue/20 bg-blue text-white shadow-[0_20px_34px_-24px_rgba(60,80,224,0.75)]"
                                        : "border-gray-3 bg-white text-dark hover:border-blue/20 hover:bg-blue/5 hover:text-blue"
                                    }`}
                                  >
                                    <span>{brand.name}</span>
                                    <span
                                      className={`inline-flex min-w-[24px] items-center justify-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                                        isActive
                                          ? "bg-white/18 text-white"
                                          : "bg-gray-2 text-dark-4"
                                      }`}
                                    >
                                      {brand.totalProducts}
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ) : null}

                      </div>
                    ) : null}
                  </div>

                  <div className="grid gap-3 lg:grid-cols-[minmax(210px,auto)_minmax(230px,1fr)_auto] lg:items-end">
                    <div className="grid gap-1.5">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-4">
                        {t("catalog.filters")}
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsMobileFiltersOpen(true)}
                        className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[18px] border border-gray-3 bg-white px-4 text-sm font-medium text-dark transition-all duration-200 hover:border-blue/20 hover:bg-blue/5 hover:text-blue"
                      >
                        <CatalogFilterIcon />
                        <span>{t("catalog.openFilters")}</span>
                        {activeFilterCount > 0 ? (
                          <span className="inline-flex min-w-[24px] items-center justify-center rounded-full bg-blue px-2 py-0.5 text-[11px] font-semibold text-white">
                            {activeFilterCount}
                          </span>
                        ) : null}
                      </button>
                    </div>

                    <label className="grid gap-1.5">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-4">
                        {t("catalog.sortBy")}
                      </span>
                      <div className="relative">
                        <select
                          value={query.sort || "popular"}
                          onChange={(event) => handleSortChange(event.target.value)}
                          className="min-h-[52px] w-full appearance-none rounded-[18px] border border-gray-3 bg-white px-4 pr-12 text-sm font-medium text-dark outline-none transition-all duration-200 hover:border-blue/20 focus:border-blue/20 focus:ring-2 focus:ring-blue/10"
                        >
                          <option value="popular">{t("common.popular")}</option>
                          <option value="newest">{t("common.newest")}</option>
                          <option value="price_asc">
                            {t("common.priceLowHigh")}
                          </option>
                          <option value="price_desc">
                            {t("common.priceHighLow")}
                          </option>
                          <option value="name">{t("common.nameSort")}</option>
                        </select>
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-dark-4">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.5 5.25L7 8.75L10.5 5.25"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </label>

                    <div className="grid gap-1.5">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-4">
                        {t("catalog.viewMode")}
                      </span>
                      <div className="inline-flex rounded-full border border-gray-3 bg-white p-1 shadow-[0_18px_38px_-32px_rgba(15,23,42,0.2)]">
                        <button
                          type="button"
                          onClick={() => handleProductStyleChange("grid")}
                          aria-label={t("catalog.gridView")}
                          className={`inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-medium transition-all duration-200 ${
                            productStyle === "grid"
                              ? "bg-blue text-white shadow-[0_18px_30px_-22px_rgba(60,80,224,0.9)]"
                              : "text-dark hover:text-blue"
                          }`}
                        >
                          <CatalogGridIcon active={productStyle === "grid"} />
                          <span className="hidden sm:inline">{t("catalog.gridView")}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleProductStyleChange("list")}
                          aria-label={t("catalog.listView")}
                          className={`inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-medium transition-all duration-200 ${
                            productStyle === "list"
                              ? "bg-blue text-white shadow-[0_18px_30px_-22px_rgba(60,80,224,0.9)]"
                              : "text-dark hover:text-blue"
                          }`}
                        >
                          <CatalogListIcon active={productStyle === "list"} />
                          <span className="hidden sm:inline">{t("catalog.listView")}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <CatalogResults
                isLoadingMore={isFetchingNextPage}
                loadingSkeletonCount={loadingSkeletonCount}
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
                    className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-dark/15 bg-white/92 px-7 py-3 text-sm font-medium text-dark shadow-[0_20px_44px_-32px_rgba(15,23,42,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue hover:bg-blue hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
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
                  <div className="rounded-full border border-white/80 bg-white/92 px-5 py-3 text-sm text-dark-4 shadow-[0_20px_44px_-32px_rgba(15,23,42,0.24)]">
                    {t("common.showingOfProducts", {
                      shown: loadedCount,
                      total,
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

        {isMobileFiltersOpen ? (
          <div className="fixed inset-0 z-[99999]">
            <button
              type="button"
              aria-label={t("catalog.closeFilters")}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="absolute inset-0 bg-dark/50 backdrop-blur-[2px]"
            />

            <div className="absolute inset-y-0 right-0 flex w-full max-w-[430px] flex-col bg-[#f7f9fc] shadow-[0_24px_80px_-36px_rgba(15,23,42,0.45)]">
              <div className="flex items-center justify-between border-b border-gray-3 bg-white px-5 py-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-4">
                    {t("catalog.filters")}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-dark">
                    {t("catalog.filters")}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-3 bg-white text-dark transition-colors duration-200 hover:border-blue/20 hover:text-blue"
                >
                  <CatalogCloseIcon />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4 no-scrollbar sm:px-5">
                <CatalogSidebarFilters
                  baseQuery={baseQuery}
                  filters={filters}
                  mode="drawer"
                  onNavigate={() => setIsMobileFiltersOpen(false)}
                  query={query}
                  routeContext={routeContext}
                />
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
}
