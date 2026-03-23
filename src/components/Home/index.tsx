import React from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import NewArrival from "./NewArrivals";
import PromoBanner from "./PromoBanner";
import BestSeller from "./BestSeller";
import CounDown from "./Countdown";
import Testimonials from "./Testimonials";
import Newsletter from "../Common/Newsletter";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";
import type { StorefrontHeroSlide } from "@/storefront/types";

type HomeProps = {
  hero: StorefrontHeroSlide & {
    slides?: StorefrontHeroSlide[];
  };
  categories: Category[];
  newProducts: Product[];
  popularProducts: Product[];
  recommendedProducts: Product[];
};

const Home = ({
  hero,
  categories,
  newProducts,
  popularProducts,
  recommendedProducts,
}: HomeProps) => {
  return (
    <main>
      <Hero hero={hero} featuredProducts={recommendedProducts} />
      <Categories categories={categories} />
      <NewArrival products={newProducts} />
      <PromoBanner />
      <BestSeller products={popularProducts} />
      <CounDown />
      <Testimonials />
      <Newsletter />
    </main>
  );
};

export default Home;
