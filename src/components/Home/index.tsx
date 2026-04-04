import dynamic from "next/dynamic";
import {
  mapStorefrontCategoriesToCategories,
  mapStorefrontProductsToProducts,
} from "@/storefront/mappers";
import type { Locale } from "@/i18n/messages";
import type { StorefrontHomeResponse } from "@/storefront/types";
import Categories from "./Categories";
import HomeSeoSection from "./HomeSeoSection";
import PromoBanner from "./PromoBanner";

const HomeSectionPlaceholder = ({
  minHeightClassName,
}: {
  minHeightClassName: string;
}) => (
  <section className="overflow-hidden">
    <div className="mx-auto w-full max-w-[1170px]">
      <div
        className={`section-shell animate-pulse border border-white/70 bg-white/75 ${minHeightClassName}`}
      />
    </div>
  </section>
);

const Hero = dynamic(() => import("./Hero"), {
  loading: () => <HomeSectionPlaceholder minHeightClassName="min-h-[760px]" />,
});

const NewArrival = dynamic(() => import("./NewArrivals"), {
  loading: () => <HomeSectionPlaceholder minHeightClassName="min-h-[480px]" />,
});

const BestSeller = dynamic(() => import("./BestSeller"), {
  loading: () => <HomeSectionPlaceholder minHeightClassName="min-h-[480px]" />,
});

const CounDown = dynamic(() => import("./Countdown"), {
  loading: () =>
    <HomeSectionPlaceholder minHeightClassName="min-h-[420px] section-shell-dark" />,
});

const Testimonials = dynamic(() => import("./Testimonials"), {
  loading: () => <HomeSectionPlaceholder minHeightClassName="min-h-[360px]" />,
});

const LatestBlogPosts = dynamic(() => import("./LatestBlogPosts"), {
  loading: () => <HomeSectionPlaceholder minHeightClassName="min-h-[340px]" />,
});

const Newsletter = dynamic(() => import("../Common/Newsletter"), {
  loading: () =>
    <HomeSectionPlaceholder minHeightClassName="min-h-[220px] section-shell-dark" />,
});

const Home = ({
  locale,
  home,
  canShowBlogPreview = true,
}: {
  locale: Locale;
  home: StorefrontHomeResponse;
  canShowBlogPreview?: boolean;
}) => {
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
        <Categories categories={categories} locale={locale} />
        <NewArrival products={newProducts} />
        <PromoBanner locale={locale} />
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
        <HomeSeoSection locale={locale} />
      </div>
    </main>
  );
};

export default Home;
