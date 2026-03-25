"use client";

import React from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import NewArrival from "./NewArrivals";
import PromoBanner from "./PromoBanner";
import BestSeller from "./BestSeller";
import CounDown from "./Countdown";
import LatestBlogPosts from "./LatestBlogPosts";
import HomeSeoSection from "./HomeSeoSection";
import Testimonials from "./Testimonials";
import Newsletter from "../Common/Newsletter";
import QueryStatusCard from "@/components/Common/QueryStatusCard";
import { useI18n } from "@/i18n/provider";
import { useStorefrontHomeQuery } from "@/storefront/hooks";
import {
  mapStorefrontCategoriesToCategories,
  mapStorefrontProductsToProducts,
} from "@/storefront/mappers";

const Home = ({
  canShowBlogPreview = true,
}: {
  canShowBlogPreview?: boolean;
}) => {
  const { t } = useI18n();
  const { data: home, isPending, isError, refetch } = useStorefrontHomeQuery();

  if (isPending && !home) {
    return (
      <main className="pt-57.5 sm:pt-45 lg:pt-30 xl:pt-51.5">
        <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <QueryStatusCard
            state="loading"
            title={t("home.loading")}
            description={t("common.loadingHint")}
          />
        </div>
      </main>
    );
  }

  if (isError && !home) {
    return (
      <main className="pt-57.5 sm:pt-45 lg:pt-30 xl:pt-51.5">
        <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <QueryStatusCard
            state="error"
            title={t("home.error")}
            description={t("common.errorHint")}
            actionLabel={t("common.retry")}
            onAction={() => {
              void refetch();
            }}
          />
        </div>
      </main>
    );
  }

  if (!home) {
    return null;
  }

  const categories = mapStorefrontCategoriesToCategories(home.categories);
  const newProducts = mapStorefrontProductsToProducts(home.newProducts);
  const hitProducts = mapStorefrontProductsToProducts(home.hitProducts);
  const saleProducts = mapStorefrontProductsToProducts(home.saleProducts);
  const recommendedProducts = mapStorefrontProductsToProducts(
    home.recommendedProducts,
  );

  return (
    <main className="relative overflow-hidden pb-16 sm:pb-20">
      <div className="pointer-events-none absolute left-[-12%] top-[8%] h-64 w-64 rounded-full bg-blue/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-10%] top-[22%] h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />
      <div className="pointer-events-none absolute left-[18%] top-[58%] h-60 w-60 rounded-full bg-indigo-200/20 blur-3xl" />
      <Hero hero={home.hero} featuredProducts={recommendedProducts} />
      <div className="relative z-10 space-y-8 px-4 sm:space-y-10 sm:px-8 xl:space-y-12 xl:px-0">
        <Categories categories={categories} />
        <NewArrival products={newProducts} />
        <PromoBanner />
        {hitProducts.length > 0 ? (
          <BestSeller
            products={hitProducts}
            eyebrowKey="home.thisMonth"
            titleKey="home.bestSellers"
            viewAllHref="/shop-with-sidebar?label=hit"
          />
        ) : null}
        {saleProducts.length > 0 ? (
          <NewArrival
            products={saleProducts}
            eyebrowKey="home.specialOffers"
            titleKey="home.discountDeals"
            viewAllHref="/shop-with-sidebar?label=sale"
          />
        ) : null}
        <CounDown />
        <Testimonials />
        <LatestBlogPosts enabled={canShowBlogPreview} />
        <Newsletter />
      </div>
    </main>
  );
};

export default Home;
