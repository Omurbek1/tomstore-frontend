"use client";

import SingleGridItem from "@/components/Shop/SingleGridItem";
import SingleListItem from "@/components/Shop/SingleListItem";
import type { Product } from "@/types/product";
import { memo } from "react";

type CatalogResultsProps = {
  productStyle: "grid" | "list";
  products: Product[];
  variant: "sidebar" | "full";
  isLoadingMore?: boolean;
  loadingSkeletonCount?: number;
};

const getCatalogResultsClassName = (
  productStyle: "grid" | "list",
  variant: "sidebar" | "full",
) =>
  productStyle === "grid"
    ? variant === "sidebar"
      ? "grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
      : "grid grid-cols-1 gap-x-7.5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    : "flex flex-col gap-7.5";

const CatalogGridSkeleton = ({ index }: { index: number }) => (
  <article
    aria-hidden="true"
    className="flex h-full animate-pulse flex-col rounded-[30px] border border-white/80 bg-white/88 p-3 shadow-[0_24px_52px_-36px_rgba(15,23,42,0.22)] sm:p-3.5"
  >
    <div className="relative mb-2.5 overflow-hidden rounded-[26px] border border-white/75 bg-[radial-gradient(circle_at_top,#ffffff_0%,#f3f7ff_52%,#e8efff_100%)]">
      <div className="absolute left-1/2 top-5 h-24 w-24 -translate-x-1/2 rounded-full bg-blue/10 blur-2xl" />
      <div className="absolute inset-x-3 top-3 flex items-start justify-between">
        <div className="h-8 w-20 rounded-full bg-white/80" />
        <div className="flex flex-col gap-2">
          <div className="h-10 w-10 rounded-full bg-white/85" />
          <div className="h-10 w-10 rounded-full bg-white/85" />
        </div>
      </div>
      <div className="flex min-h-[244px] items-center justify-center px-4 pb-4 pt-20">
        <div className="h-[176px] w-full max-w-[220px] rounded-[24px] bg-white/85" />
      </div>
    </div>

    <div className="flex flex-1 flex-col px-1">
      <div className="mb-2.5 flex items-start justify-between gap-2">
        <div className="h-4 w-24 rounded-full bg-gray-2" />
        <div className="h-7 w-24 rounded-full bg-blue/10" />
      </div>
      <div className="space-y-2">
        <div className="h-5 w-4/5 rounded-full bg-gray-2" />
        <div className="h-5 w-3/5 rounded-full bg-gray-2" />
      </div>
      <div className="mt-3 space-y-2">
        <div className="h-3.5 w-full rounded-full bg-gray-2/80" />
        <div className="h-3.5 w-2/3 rounded-full bg-gray-2/80" />
      </div>
      <div className="mt-auto pt-3">
        <div className="grid gap-2.5 rounded-[22px] border border-gray-3/80 bg-[linear-gradient(180deg,#fbfcff_0%,#f4f7ff_100%)] p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-2">
              <div className="h-3 w-14 rounded-full bg-gray-2" />
              <div className="h-7 w-24 rounded-full bg-gray-2" />
            </div>
            {index % 2 === 0 ? <div className="h-6 w-14 rounded-full bg-green/10" /> : null}
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="h-11 rounded-full bg-blue/15" />
            <div className="h-11 rounded-full bg-gray-2/90" />
          </div>
        </div>
      </div>
    </div>
  </article>
);

const CatalogListSkeleton = ({ index }: { index: number }) => (
  <article
    aria-hidden="true"
    className="overflow-hidden rounded-[30px] border border-white/80 bg-white/88 p-3 shadow-[0_24px_52px_-36px_rgba(15,23,42,0.22)]"
  >
    <div className="flex animate-pulse flex-col gap-3 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)]">
      <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden rounded-[26px] border border-white/75 bg-[radial-gradient(circle_at_top,#ffffff_0%,#f3f7ff_52%,#e8efff_100%)] px-4 pb-4 pt-20">
        <div className="absolute inset-x-3 top-3 flex items-start justify-between">
          <div className="h-8 w-20 rounded-full bg-white/80" />
          <div className="flex flex-col gap-2">
            <div className="h-10 w-10 rounded-full bg-white/85" />
            <div className="h-10 w-10 rounded-full bg-white/85" />
          </div>
        </div>
        {index % 2 === 0 ? (
          <div className="absolute bottom-3 left-3 h-7 w-16 rounded-full bg-white/85" />
        ) : null}
        <div className="h-[170px] w-full max-w-[220px] rounded-[24px] bg-white/85" />
      </div>

      <div className="flex flex-col justify-between gap-4 px-1 py-1 lg:px-2">
        <div className="space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-6 w-4/5 rounded-full bg-gray-2" />
              <div className="h-6 w-2/3 rounded-full bg-gray-2" />
            </div>
            <div className="h-7 w-24 rounded-full bg-blue/10" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full rounded-full bg-gray-2/80" />
            <div className="h-4 w-3/4 rounded-full bg-gray-2/80" />
          </div>
          <div className="h-4 w-32 rounded-full bg-gray-2/80" />
        </div>

        <div className="grid gap-2.5 border-t border-gray-3/70 pt-3 lg:grid-cols-[minmax(0,1fr)_minmax(280px,auto)] lg:items-center">
          <div className="grid gap-2.5 rounded-[24px] border border-gray-3/80 bg-[linear-gradient(180deg,#fbfcff_0%,#f4f7ff_100%)] p-3.5">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-2">
                <div className="h-3 w-14 rounded-full bg-gray-2" />
                <div className="h-8 w-28 rounded-full bg-gray-2" />
              </div>
              {index % 2 === 0 ? <div className="h-6 w-14 rounded-full bg-green/10" /> : null}
            </div>
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <div className="h-11 flex-1 rounded-full bg-blue/15" />
            <div className="h-11 flex-1 rounded-full bg-gray-2/90" />
          </div>
        </div>
      </div>
    </div>
  </article>
);

function CatalogResultsComponent({
  productStyle,
  products,
  variant,
  isLoadingMore = false,
  loadingSkeletonCount = 0,
}: CatalogResultsProps) {
  const skeletonItems = Array.from({ length: loadingSkeletonCount }, (_, index) => index);

  return (
    <div className={getCatalogResultsClassName(productStyle, variant)}>
      {products.map((item) =>
        productStyle === "grid" ? (
          <SingleGridItem item={item} key={item.id} />
        ) : (
          <SingleListItem item={item} key={item.id} />
        ),
      )}

      {isLoadingMore
        ? skeletonItems.map((index) =>
            productStyle === "grid" ? (
              <CatalogGridSkeleton key={`catalog-grid-skeleton-${index}`} index={index} />
            ) : (
              <CatalogListSkeleton key={`catalog-list-skeleton-${index}`} index={index} />
            ),
          )
        : null}
    </div>
  );
}

const CatalogResults = memo(CatalogResultsComponent);

CatalogResults.displayName = "CatalogResults";

export default CatalogResults;
