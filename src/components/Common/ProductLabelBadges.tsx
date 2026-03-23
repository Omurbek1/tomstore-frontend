"use client";

import { useI18n } from "@/i18n/provider";
import { getProductLabelMessageKey } from "@/i18n/utils";
import type { StorefrontProductLabel } from "@/storefront/types";

const LABEL_CLASSNAMES: Record<StorefrontProductLabel, string> = {
  hit: "bg-blue text-white",
  new: "bg-green text-white",
  sale: "bg-red text-white",
};

type ProductLabelBadgesProps = {
  labels?: StorefrontProductLabel[];
  className?: string;
};

const ProductLabelBadges = ({
  labels = [],
  className = "",
}: ProductLabelBadgesProps) => {
  const { t } = useI18n();
  const visibleLabels = Array.from(new Set(labels)).slice(0, 3);

  if (visibleLabels.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`.trim()}>
      {visibleLabels.map((label) => (
        <span
          key={label}
          className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${LABEL_CLASSNAMES[label]}`}
        >
          {t(getProductLabelMessageKey(label) || label)}
        </span>
      ))}
    </div>
  );
};

export default ProductLabelBadges;
