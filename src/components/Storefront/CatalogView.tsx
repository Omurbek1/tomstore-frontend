"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import QueryStatusCard from "@/components/Common/QueryStatusCard";
import SingleGridItem from "@/components/Shop/SingleGridItem";
import SingleListItem from "@/components/Shop/SingleListItem";
import { useI18n } from "@/i18n/provider";
import { getAvailabilityMessageKey } from "@/i18n/utils";
import { useStorefrontCatalogQuery } from "@/storefront/hooks";
import { type StorefrontCatalogRouteQuery } from "@/storefront/query-keys";
import { mapStorefrontProductsToProducts } from "@/storefront/mappers";
import type { Product } from "@/types/product";
import type {
  StorefrontBrand,
  StorefrontCategory,
} from "@/storefront/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type CatalogViewProps = {
  title: string;
  pathname: string;
  query: StorefrontCatalogRouteQuery;
  variant: "sidebar" | "full";
};

const buildQueryString = (
  pathname: string,
  query: StorefrontCatalogRouteQuery,
  overrides: Partial<StorefrontCatalogRouteQuery> = {},
) => {
  const nextQuery = { ...query, ...overrides };
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(nextQuery)) {
    if (!value || value === "all") {
      continue;
    }

    searchParams.set(key, value);
  }

  const serialized = searchParams.toString();
  return serialized ? `${pathname}?${serialized}` : pathname;
};

const buildPages = (currentPage: number, totalPages: number) => {
  const pages = new Set<number>([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);

  return Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((left, right) => left - right);
};

export default function CatalogView({
  title,
  pathname,
  query,
  variant,
}: CatalogViewProps) {
  const router = useRouter();
  const { t } = useI18n();
  const { data, isPending, isError, isFetching, refetch } =
    useStorefrontCatalogQuery(query);
  const [productStyle, setProductStyle] = useState(
    query.view === "list" ? "list" : "grid",
  );
  const [searchValue, setSearchValue] = useState(query.q || "");
  const products = useMemo(
    () => mapStorefrontProductsToProducts(data?.items || []),
    [data?.items],
  );
  const total = data?.total || 0;
  const page = data?.page || 1;
  const totalPages = data?.totalPages || 1;
  const filters = data?.filters || {
    categories: [] as StorefrontCategory[],
    brands: [] as StorefrontBrand[],
  };

  const pages = useMemo(() => buildPages(page, totalPages), [page, totalPages]);

  const applySearch = () => {
    router.push(
      buildQueryString(pathname, query, {
        q: searchValue.trim() || undefined,
        page: undefined,
      }),
    );
  };

  return (
    <>
      <Breadcrumb title={title} pages={["shop"]} />

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
                <div className="flex flex-col gap-6 sticky top-28">
                  <div className="bg-white shadow-1 rounded-lg py-4 px-5">
                    <div className="flex items-center justify-between gap-4">
                      <p>{t("catalog.filters")}</p>
                      <Link
                        href={pathname}
                        className="text-blue text-custom-sm"
                      >
                        {t("common.cleanAll")}
                      </Link>
                    </div>
                  </div>

                  <div className="bg-white shadow-1 rounded-lg py-5 px-6">
                    <h3 className="font-medium text-dark mb-4">
                      {t("catalog.search")}
                    </h3>
                    <div className="flex gap-2">
                      <input
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                            applySearch();
                          }
                        }}
                        type="search"
                        placeholder={t("catalog.searchPlaceholder")}
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-4 outline-none"
                      />
                      <button
                        onClick={applySearch}
                        className="inline-flex items-center justify-center rounded-md bg-blue px-4 text-white"
                      >
                        {t("common.go")}
                      </button>
                    </div>
                  </div>

                  <div className="bg-white shadow-1 rounded-lg py-5 px-6">
                    <h3 className="font-medium text-dark mb-4">
                      {t("catalog.categories")}
                    </h3>
                    <div className="flex flex-col gap-3">
                      {filters.categories.map((category) => {
                        const href = buildQueryString(pathname, query, {
                          category:
                            query.category === category.slug
                              ? undefined
                              : category.slug,
                          page: undefined,
                        });

                        return (
                          <Link
                            key={category.slug}
                            href={href}
                            className={`flex items-center justify-between gap-3 ${
                              query.category === category.slug
                                ? "text-blue"
                                : "text-dark"
                            }`}
                          >
                            <span>{category.name}</span>
                            <span className="inline-flex rounded-full bg-gray-2 px-2 py-0.5 text-custom-xs">
                              {category.totalProducts}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-white shadow-1 rounded-lg py-5 px-6">
                    <h3 className="font-medium text-dark mb-4">
                      {t("catalog.brands")}
                    </h3>
                    <div className="flex flex-col gap-3">
                      {filters.brands.slice(0, 12).map((brand) => {
                        const href = buildQueryString(pathname, query, {
                          brand:
                            query.brand === brand.slug ? undefined : brand.slug,
                          page: undefined,
                        });

                        return (
                          <Link
                            key={brand.slug}
                            href={href}
                            className={`flex items-center justify-between gap-3 ${
                              query.brand === brand.slug ? "text-blue" : "text-dark"
                            }`}
                          >
                            <span>{brand.name}</span>
                            <span className="inline-flex rounded-full bg-gray-2 px-2 py-0.5 text-custom-xs">
                              {brand.totalProducts}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-white shadow-1 rounded-lg py-5 px-6">
                    <h3 className="font-medium text-dark mb-4">
                      {t("catalog.availability")}
                    </h3>
                    <div className="flex flex-col gap-3">
                      {[
                        { value: "in_stock" },
                        { value: "on_order" },
                        { value: "in_transit" },
                        { value: "out_of_stock" },
                      ].map((item) => (
                        <Link
                          key={item.value}
                          href={buildQueryString(pathname, query, {
                            availability:
                              query.availability === item.value
                                ? undefined
                                : item.value,
                            page: undefined,
                          })}
                          className={
                            query.availability === item.value
                              ? "text-blue"
                              : "text-dark"
                          }
                        >
                          {t(getAvailabilityMessageKey(item.value) || item.value)}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
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
                          buildQueryString(pathname, query, {
                            sort: event.target.value,
                            page: undefined,
                          }),
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

              <div
                className={
                  productStyle === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7.5 gap-y-9"
                    : "flex flex-col gap-7.5"
                }
              >
                {products.map((item) =>
                  productStyle === "grid" ? (
                    <SingleGridItem item={item} key={item.id} />
                  ) : (
                    <SingleListItem item={item} key={item.id} />
                  ),
                )}
              </div>

              {totalPages > 1 ? (
                <div className="flex justify-center mt-15">
                  <div className="bg-white shadow-1 rounded-md p-2">
                    <ul className="flex items-center gap-1">
                      {pages.map((pageNumber) => (
                        <li key={pageNumber}>
                          <Link
                            href={buildQueryString(pathname, query, {
                              page: String(pageNumber),
                            })}
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
