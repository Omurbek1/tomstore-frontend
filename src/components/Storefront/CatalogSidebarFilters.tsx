"use client";

import { useI18n } from "@/i18n/provider";
import { getAvailabilityMessageKey } from "@/i18n/utils";
import {
  buildCatalogHref,
  type CatalogRouteContext,
} from "@/storefront/catalog-routing";
import type {
  StorefrontCatalogRouteQuery,
} from "@/storefront/query-keys";
import type {
  StorefrontBrand,
  StorefrontCategory,
} from "@/storefront/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

type CatalogSidebarFiltersProps = {
  baseQuery: StorefrontCatalogRouteQuery;
  filters: {
    brands: StorefrontBrand[];
    categories: StorefrontCategory[];
  };
  query: StorefrontCatalogRouteQuery;
  routeContext: CatalogRouteContext;
};

export default function CatalogSidebarFilters({
  baseQuery,
  filters,
  query,
  routeContext,
}: CatalogSidebarFiltersProps) {
  const router = useRouter();
  const { t } = useI18n();
  const [searchValue, setSearchValue] = useState(query.q || "");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setSearchValue(query.q || "");
  }, [query.q]);

  const applySearch = () => {
    startTransition(() => {
      router.push(
        buildCatalogHref(
          {
            ...query,
            q: searchValue.trim() || undefined,
            page: undefined,
          },
          routeContext,
        ),
      );
    });
  };

  return (
    <div className="flex flex-col gap-6 sticky top-28">
      <div className="bg-white shadow-1 rounded-lg py-4 px-5">
        <div className="flex items-center justify-between gap-4">
          <p>{t("catalog.filters")}</p>
          <Link
            href={buildCatalogHref(baseQuery, routeContext)}
            className="text-blue text-custom-sm"
          >
            {t("common.cleanAll")}
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-1 rounded-lg py-5 px-6">
        <h3 className="font-medium text-dark mb-4">{t("catalog.search")}</h3>
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
            disabled={isPending}
            className="inline-flex items-center justify-center rounded-md bg-blue px-4 text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {t("common.go")}
          </button>
        </div>
      </div>

      <div className="bg-white shadow-1 rounded-lg py-5 px-6">
        <h3 className="font-medium text-dark mb-4">{t("catalog.categories")}</h3>
        <div className="flex flex-col gap-3">
          {filters.categories.map((category) => {
            const href = buildCatalogHref(
              {
                ...query,
                category:
                  query.category === category.slug ? undefined : category.slug,
                page: undefined,
              },
              routeContext,
              "category",
            );

            return (
              <Link
                key={category.slug}
                href={href}
                className={`flex items-center justify-between gap-3 ${
                  query.category === category.slug ? "text-blue" : "text-dark"
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
        <h3 className="font-medium text-dark mb-4">{t("catalog.brands")}</h3>
        <div className="flex flex-col gap-3">
          {filters.brands.slice(0, 12).map((brand) => {
            const href = buildCatalogHref(
              {
                ...query,
                brand: query.brand === brand.slug ? undefined : brand.slug,
                page: undefined,
              },
              routeContext,
              "brand",
            );

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
        <h3 className="font-medium text-dark mb-4">{t("catalog.availability")}</h3>
        <div className="flex flex-col gap-3">
          {[
            { value: "in_stock" },
            { value: "on_order" },
            { value: "in_transit" },
            { value: "out_of_stock" },
          ].map((item) => (
            <Link
              key={item.value}
              href={buildCatalogHref(
                {
                  ...query,
                  availability:
                    query.availability === item.value ? undefined : item.value,
                  page: undefined,
                },
                routeContext,
              )}
              className={
                query.availability === item.value ? "text-blue" : "text-dark"
              }
            >
              {t(getAvailabilityMessageKey(item.value) || item.value)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
