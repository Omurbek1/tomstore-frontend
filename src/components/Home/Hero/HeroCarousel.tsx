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
          <div className="relative grid min-h-[520px] items-center gap-10 px-6 pb-16 pt-10 sm:px-10 lg:grid-cols-[minmax(0,1.05fr)_320px] lg:px-12 xl:min-h-[560px] xl:px-16">
            <div className="relative z-10 max-w-[560px]">
              <div className="mb-6 sm:mb-8">
                <span className="section-kicker-dark">
                  {slide.eyebrow || "TOMSTORE"}
                </span>
              </div>

              <h1 className="max-w-[12ch] text-4xl font-semibold leading-[1.05] text-white sm:text-5xl xl:text-[60px]">
                {slide.title}
              </h1>

              <p className="mt-5 max-w-[500px] text-sm leading-7 text-white/72 sm:text-base">
                {slide.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={slide.primaryCtaHref}
                  className="inline-flex rounded-full bg-blue px-7 py-3 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-dark"
                >
                  {slide.primaryCtaLabel}
                </Link>
                <Link
                  href={slide.secondaryCtaHref}
                  className="inline-flex rounded-full border border-white/12 bg-white/8 px-7 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-white hover:text-dark"
                >
                  {slide.secondaryCtaLabel}
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45 sm:gap-4">
                <span>Premium Tech</span>
                <span className="h-px w-10 bg-white/14" />
                <span>Official Support</span>
                <span className="h-px w-10 bg-white/14" />
                <span>Fast WhatsApp Order</span>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="absolute h-44 w-44 rounded-full bg-blue/25 blur-3xl sm:h-56 sm:w-56" />
              <div className="absolute h-[78%] w-[78%] rounded-full border border-white/10 bg-white/6 backdrop-blur-xl" />
              <div className="relative flex h-[280px] w-[280px] items-center justify-center rounded-full border border-white/10 bg-white/8 shadow-[0_22px_70px_-40px_rgba(8,17,31,0.9)] sm:h-[360px] sm:w-[360px]">
                <Image
                  src={slide.backgroundImageUrl || "/images/hero/hero-01.png"}
                  alt={slide.title}
                  width={360}
                  height={360}
                  className="h-auto max-h-[82%] w-auto object-contain drop-shadow-[0_28px_42px_rgba(0,0,0,0.35)]"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroCarousal;
