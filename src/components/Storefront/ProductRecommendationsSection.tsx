"use client";

import ProductItem from "@/components/Common/ProductItem";
import { useI18n } from "@/i18n/provider";
import type { Product } from "@/types/product";
import { memo } from "react";

type ProductRecommendationsSectionProps = {
  eyebrowKey: string;
  items: Product[];
  titleKey: string;
};

function ProductRecommendationsSectionComponent({
  eyebrowKey,
  items,
  titleKey,
}: ProductRecommendationsSectionProps) {
  const { t } = useI18n();

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mt-20">
      <div className="mb-7 flex items-center justify-between">
        <div>
          <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
            {t(eyebrowKey)}
          </span>
          <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
            {t(titleKey)}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-7.5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.slice(0, 4).map((item) => (
          <ProductItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

const ProductRecommendationsSection = memo(
  ProductRecommendationsSectionComponent,
);

ProductRecommendationsSection.displayName = "ProductRecommendationsSection";

export default ProductRecommendationsSection;
