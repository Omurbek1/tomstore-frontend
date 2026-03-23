"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css";

import Image from "next/image";
import type { StorefrontHeroSlide } from "@/storefront/types";

const HeroCarousal = ({ slides }: { slides: StorefrontHeroSlide[] }) => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
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
          <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
            <div className="max-w-[394px] py-10 sm:py-15 lg:py-24.5 pl-4 sm:pl-7.5 lg:pl-12.5">
              <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
                <span className="block font-semibold text-heading-3 sm:text-heading-1 text-blue">
                  {slide.eyebrow || "NEW"}
                </span>
              </div>

              <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
                {slide.title}
              </h1>

              <p>{slide.subtitle}</p>

              <div className="flex flex-wrap items-center gap-3 mt-10">
                <Link
                  href={slide.primaryCtaHref}
                  className="inline-flex font-medium text-white text-custom-sm rounded-md bg-dark py-3 px-9 ease-out duration-200 hover:bg-blue"
                >
                  {slide.primaryCtaLabel}
                </Link>
                <Link
                  href={slide.secondaryCtaHref}
                  className="inline-flex font-medium text-dark text-custom-sm rounded-md bg-gray-1 py-3 px-9 ease-out duration-200 hover:bg-blue hover:text-white"
                >
                  {slide.secondaryCtaLabel}
                </Link>
              </div>
            </div>

            <div className="px-4 sm:px-0">
              <Image
                src={slide.backgroundImageUrl || "/images/hero/hero-01.png"}
                alt={slide.title}
                width={351}
                height={358}
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroCarousal;
