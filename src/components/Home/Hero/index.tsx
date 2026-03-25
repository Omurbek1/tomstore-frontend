"use client";

import React from "react";
import HeroCarousel from "./HeroCarousel";
import HeroFeature from "./HeroFeature";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import type { StorefrontHeroSlide } from "@/storefront/types";
import { useI18n } from "@/i18n/provider";
import ProductLabelBadges from "@/components/Common/ProductLabelBadges";

type HeroProps = {
  hero: StorefrontHeroSlide & {
    slides?: StorefrontHeroSlide[];
  };
  featuredProducts: Product[];
};

const Hero = ({ hero, featuredProducts }: HeroProps) => {
  const { t, formatPrice } = useI18n();
  const sideProducts = featuredProducts.slice(0, 2);

  return (
    <section className="relative overflow-hidden px-4 pb-8 pt-57.5 sm:px-8 sm:pb-10 sm:pt-45 lg:pb-12 lg:pt-30 xl:px-0 xl:pt-44">
      <div className="pointer-events-none absolute left-[4%] top-[10%] h-64 w-64 rounded-full bg-blue/15 blur-3xl" />
      <div className="pointer-events-none absolute right-[10%] top-[18%] h-72 w-72 rounded-full bg-sky-300/15 blur-3xl" />

      <div className="mx-auto w-full max-w-[1170px]">
        <div
          data-header-contrast="dark"
          className="section-shell-dark p-4 sm:p-5 xl:p-6"
        >
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_392px]">
            <div className="relative overflow-hidden rounded-[28px] border border-white/10">
              <div className="soft-grid absolute inset-0 opacity-15" />
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/6 to-transparent" />
              <HeroCarousel slides={hero.slides?.length ? hero.slides : [hero]} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              {sideProducts.map((product) => (
                <div
                  key={product.id}
                  className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/8 p-5 backdrop-blur-sm"
                >
                  <div className="absolute right-[-28px] top-[-24px] h-28 w-28 rounded-full bg-white/8 blur-2xl" />
                  <div className="relative flex items-center gap-5">
                    <div className="min-w-0 flex-1">
                      <ProductLabelBadges
                        labels={product.labels}
                        className="mb-4"
                      />
                      <h2 className="mb-6 max-w-[190px] text-xl font-semibold leading-snug text-white">
                        <Link
                          href={`/shop-details/${product.slug}`}
                          className="transition-colors duration-200 hover:text-white/75"
                        >
                          {product.title}
                        </Link>
                      </h2>

                      <div>
                        <p className="mb-2 inline-flex rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                          {product.availability?.label || t("common.inStock")}
                        </p>
                        <span className="flex flex-wrap items-center gap-3">
                          <span className="text-2xl font-semibold text-white">
                            {formatPrice(product.discountedPrice)}
                          </span>
                          {product.price > product.discountedPrice ? (
                            <span className="text-lg font-medium text-white/40 line-through">
                              {formatPrice(product.price)}
                            </span>
                          ) : null}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <div className="flex h-28 w-28 items-center justify-center rounded-[24px] border border-white/10 bg-white/6 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.7)]">
                        <Image
                          src={product.imgs?.previews?.[0] || "/images/hero/hero-01.png"}
                          alt={product.title}
                          width={116}
                          height={140}
                          className="h-auto max-h-[86%] w-auto object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <HeroFeature />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
