"use client";

import React from "react";
import SingleItem from "./SingleItem";
import Link from "next/link";
import type { Product } from "@/types/product";
import { useI18n } from "@/i18n/provider";

const BestSeller = ({
  products,
  eyebrowKey = "home.thisMonth",
  titleKey = "home.bestSellers",
  viewAllHref = "/shop-with-sidebar?label=hit",
}: {
  products: Product[];
  eyebrowKey?: string;
  titleKey?: string;
  viewAllHref?: string;
}) => {
  const { t } = useI18n();

  return (
    <section className="overflow-hidden">
      <div className="mx-auto w-full max-w-[1170px]">
        <div className="section-shell-dark px-4 py-7 sm:px-8 sm:py-8 xl:px-10 xl:py-10">
        {/* <!-- section title --> */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="section-kicker-dark">
              {t(eyebrowKey)}
            </span>
            <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
              {t(titleKey)}
            </h2>
          </div>

          <Link
            href={viewAllHref}
            className="inline-flex rounded-full border border-white/12 bg-white/8 px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-dark"
          >
            {t("common.viewAll")}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* <!-- Best Sellers item --> */}
          {products.slice(0, 6).map((item, key) => (
            <SingleItem item={item} key={key} />
          ))}
        </div>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
