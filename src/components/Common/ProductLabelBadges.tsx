"use client";

import { useI18n } from "@/i18n/provider";
import { getProductLabelMessageKey } from "@/i18n/utils";
import type { StorefrontProductLabel } from "@/storefront/types";

const LABEL_CLASSNAMES: Record<StorefrontProductLabel, string> = {
  new:  "border border-[#BBF7D0] bg-[#DCFCE7] text-[#166534]",
  hit:  "border border-[#FDE68A] bg-[#FEF9C3] text-[#854D0E]",
  sale: "border border-[#FECACA] bg-[#FEE2E2] text-[#991B1B]",
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
      className={`flex min-w-0 items-center ${compact ? "gap-1.5" : "gap-2"} ${
        singleLine
          ? "max-w-full flex-nowrap overflow-hidden whitespace-nowrap"
          : "flex-wrap"
      } ${className}`.trim()}
    >
      {visibleLabels.map((label) => (
        <span
          key={label}
          className={`inline-flex shrink-0 items-center rounded-full font-semibold uppercase backdrop-blur-sm ${
            compact
              ? singleLine
                ? "px-2.5 py-1 text-[8px] tracking-[0.14em] sm:text-[9px]"
                : "px-2.5 py-1 text-[9px] tracking-[0.18em]"
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
