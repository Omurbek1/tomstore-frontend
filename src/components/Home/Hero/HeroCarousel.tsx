"use client";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

import type { StorefrontHeroSlide } from "@/storefront/types";
import HeroSlidePanel from "./HeroSlidePanel";
import HeroSlidePreviewList from "./HeroSlidePreviewList";

const HeroCarousal = ({ slides }: { slides: StorefrontHeroSlide[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const hasMultipleSlides = slides.length > 1;

  const handleSelectSlide = (index: number) => {
    setActiveIndex(index);

    if (!swiperInstance) {
      return;
    }

    if (hasMultipleSlides) {
      swiperInstance.slideToLoop(index);
      return;
    }

    swiperInstance.slideTo(index);
  };

  return (
    <div className="relative">
      <Swiper
        slidesPerView={1}
        spaceBetween={24}
        loop={hasMultipleSlides}
        speed={700}
        grabCursor
        autoplay={
          hasMultipleSlides
            ? {
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        navigation={hasMultipleSlides}
        pagination={hasMultipleSlides ? { clickable: true } : false}
        watchOverflow
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
          setActiveIndex(swiper.realIndex);
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        modules={[Autoplay, Navigation, Pagination]}
        className="hero-carousel"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={`${slide.title}-${index}`}>
            <HeroSlidePanel
              slide={slide}
              priority={index === 0}
              hasPreviewRail={hasMultipleSlides}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {hasMultipleSlides ? (
        <>
          <div className="pointer-events-none absolute inset-y-0 right-5 z-20 hidden items-center xl:flex">
            <div className="pointer-events-auto w-[220px]">
              <HeroSlidePreviewList
                slides={slides}
                activeIndex={activeIndex}
                onSelect={handleSelectSlide}
              />
            </div>
          </div>

          <div className="px-4 pb-4 pt-3 sm:px-6 xl:hidden">
            <HeroSlidePreviewList
              slides={slides}
              activeIndex={activeIndex}
              onSelect={handleSelectSlide}
              orientation="horizontal"
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default HeroCarousal;
