"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css";

import type { StorefrontHeroSlide } from "@/storefront/types";
import HeroSlidePanel from "./HeroSlidePanel";

const HeroCarousal = ({ slides }: { slides: StorefrontHeroSlide[] }) => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="hero-carousel"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={`${slide.title}-${index}`}>
          <HeroSlidePanel slide={slide} priority={index === 0} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroCarousal;
