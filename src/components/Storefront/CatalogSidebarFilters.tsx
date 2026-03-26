"use client";

import { useI18n } from "@/i18n/provider";
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
  mode?: "desktop" | "drawer";
  onNavigate?: () => void;
  query: StorefrontCatalogRouteQuery;
  routeContext: CatalogRouteContext;
};

export default function CatalogSidebarFilters({
  baseQuery,
  filters,
  mode = "desktop",
  onNavigate,
  query,
  routeContext,
}: CatalogSidebarFiltersProps) {
  const router = useRouter();
  const { t } = useI18n();
  const [searchValue, setSearchValue] = useState(query.q || "");
  const [isPending, startTransition] = useTransition();
  const isDrawer = mode === "drawer";

  useEffect(() => {
    setSearchValue(query.q || "");
  }, [query.q]);

  const applySearch = () => {
    onNavigate?.();
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
    <div
      className={
        isDrawer ? "flex flex-col gap-4" : "sticky top-28 flex flex-col gap-4"
      }
    >
      <div className="rounded-[28px] border border-white/80 bg-white/94 px-5 py-5 shadow-[0_20px_55px_-40px_rgba(15,23,42,0.28)] backdrop-blur-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-4">
              {t("catalog.filters")}
            </p>
            <p className="mt-1 text-lg font-semibold text-dark">
              {t("catalog.filters")}
            </p>
          </div>
          <Link
            href={buildCatalogHref(baseQuery, routeContext)}
            onClick={() => onNavigate?.()}
            className="inline-flex rounded-full border border-blue/15 bg-blue/5 px-3.5 py-2 text-[13px] font-medium text-blue transition-colors duration-200 hover:bg-blue hover:text-white"
          >
            {t("common.cleanAll")}
          </Link>
        </div>
      </div>

      <div className="rounded-[28px] border border-white/80 bg-white/94 px-5 py-5 shadow-[0_20px_55px_-40px_rgba(15,23,42,0.28)] backdrop-blur-sm">
        <div className="mb-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-4">
            {t("catalog.search")}
          </p>
          <h3 className="mt-1 text-base font-semibold text-dark">
            {t("catalog.search")}
          </h3>
        </div>
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
            className="w-full rounded-[18px] border border-gray-3 bg-gray-1 px-4 py-3 text-sm text-dark outline-none transition-all duration-200 placeholder:text-dark-5 focus:border-blue/30 focus:bg-white focus:ring-2 focus:ring-blue/10"
          />
          <button
            onClick={applySearch}
            disabled={isPending}
            className="inline-flex min-w-[52px] items-center justify-center rounded-[18px] bg-blue px-4 text-white shadow-[0_18px_30px_-22px_rgba(60,80,224,0.8)] transition-all duration-200 hover:bg-blue-dark disabled:cursor-not-allowed disabled:opacity-70"
          >
            {t("common.go")}
          </button>
        </div>
      </div>

      <div className="rounded-[28px] border border-white/80 bg-white/94 px-5 py-5 shadow-[0_20px_55px_-40px_rgba(15,23,42,0.28)] backdrop-blur-sm">
        <div className="mb-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-4">
            {t("catalog.categories")}
          </p>
          <h3 className="mt-1 text-base font-semibold text-dark">
            {t("catalog.categories")}
          </h3>
        </div>
        <div className="flex flex-col gap-2.5">
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
                onClick={() => onNavigate?.()}
                className={`group flex items-center justify-between gap-3 rounded-[18px] border px-4 py-3 transition-all duration-200 ${
                  query.category === category.slug
                    ? "border-blue/20 bg-blue/5 text-blue shadow-[0_18px_34px_-28px_rgba(60,80,224,0.45)]"
                    : "border-gray-3/80 bg-white text-dark hover:border-blue/15 hover:bg-blue/5 hover:text-blue"
                }`}
              >
                <span className="truncate text-sm font-medium">{category.name}</span>
                <span
                  className={`inline-flex min-w-[34px] shrink-0 items-center justify-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    query.category === category.slug
                      ? "bg-blue/10 text-blue"
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

      <div className="rounded-[28px] border border-white/80 bg-white/94 px-5 py-5 shadow-[0_20px_55px_-40px_rgba(15,23,42,0.28)] backdrop-blur-sm">
        <div className="mb-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-4">
            {t("catalog.brands")}
          </p>
          <h3 className="mt-1 text-base font-semibold text-dark">
            {t("catalog.brands")}
          </h3>
        </div>
        <div className="flex flex-col gap-2.5">
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
                onClick={() => onNavigate?.()}
                className={`group flex items-center justify-between gap-3 rounded-[18px] border px-4 py-3 transition-all duration-200 ${
                  query.brand === brand.slug
                    ? "border-blue/20 bg-blue/5 text-blue shadow-[0_18px_34px_-28px_rgba(60,80,224,0.45)]"
                    : "border-gray-3/80 bg-white text-dark hover:border-blue/15 hover:bg-blue/5 hover:text-blue"
                }`}
              >
                <span className="truncate text-sm font-medium">{brand.name}</span>
                <span
                  className={`inline-flex min-w-[34px] shrink-0 items-center justify-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    query.brand === brand.slug
                      ? "bg-blue/10 text-blue"
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

    </div>
  );
}
