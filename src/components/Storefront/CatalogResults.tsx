"use client";

import SingleGridItem from "@/components/Shop/SingleGridItem";
import SingleListItem from "@/components/Shop/SingleListItem";
import type { Product } from "@/types/product";
import { memo } from "react";

type CatalogResultsProps = {
  productStyle: "grid" | "list";
  products: Product[];
  variant: "sidebar" | "full";
};

function CatalogResultsComponent({
  productStyle,
  products,
  variant,
}: CatalogResultsProps) {
  return (
    <div
      className={
        productStyle === "grid"
          ? variant === "sidebar"
            ? "grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
            : "grid grid-cols-1 gap-x-7.5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
  );
}

const CatalogResults = memo(CatalogResultsComponent);

CatalogResults.displayName = "CatalogResults";

export default CatalogResults;
