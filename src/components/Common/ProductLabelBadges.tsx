"use client";

import { useI18n } from "@/i18n/provider";
import { getProductLabelMessageKey } from "@/i18n/utils";
import type { StorefrontProductLabel } from "@/storefront/types";

const LABEL_CLASSNAMES: Record<StorefrontProductLabel, string> = {
  hit: "border border-blue/10 bg-blue/10 text-blue-dark shadow-[0_14px_30px_-22px_rgba(60,80,224,0.85)]",
  new: "border border-green/10 bg-green/10 text-green-dark shadow-[0_14px_30px_-22px_rgba(34,173,92,0.85)]",
  sale: "border border-red/10 bg-red/10 text-red shadow-[0_14px_30px_-22px_rgba(242,48,48,0.8)]",
};

type ProductLabelBadgesProps = {
  labels?: StorefrontProductLabel[];
  className?: string;
  compact?: boolean;
  singleLine?: boolean;
};

const ProductLabelBadges = ({
  labels = [],
  className = "",
  compact = false,
  singleLine = false,
}: ProductLabelBadgesProps) => {
  const { t } = useI18n();
  const visibleLabels = Array.from(new Set(labels)).slice(0, 3);

  if (visibleLabels.length === 0) {
    return null;
  }

  return (
    <div
      className={`flex items-center gap-2 ${
        singleLine
          ? "flex-nowrap overflow-hidden whitespace-nowrap"
          : "flex-wrap"
      } ${className}`.trim()}
    >
      {visibleLabels.map((label) => (
        <span
          key={label}
          className={`inline-flex shrink-0 items-center rounded-full font-semibold uppercase backdrop-blur-sm ${
            compact
              ? "px-2.5 py-1 text-[9px] tracking-[0.18em]"
              : "px-3.5 py-1.5 text-[10px] tracking-[0.24em]"
          } ${LABEL_CLASSNAMES[label]}`}
        >
          {t(getProductLabelMessageKey(label) || label)}
        </span>
      ))}
    </div>
  );
};

export default ProductLabelBadges;
