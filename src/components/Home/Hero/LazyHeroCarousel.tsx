"use client";

import { startTransition, useEffect, useState } from "react";
import type { StorefrontHeroSlide } from "@/storefront/types";
import HeroCarouselFallback from "./HeroCarouselFallback";

type HeroCarouselComponent = (typeof import("./HeroCarousel"))["default"];

type LazyHeroCarouselProps = {
  slides: StorefrontHeroSlide[];
};

export default function LazyHeroCarousel({ slides }: LazyHeroCarouselProps) {
  const [CarouselComponent, setCarouselComponent] =
    useState<HeroCarouselComponent | null>(null);
  const primarySlide = slides[0];

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    let cancelled = false;

    const loadCarousel = async () => {
      const carouselModule = await import("./HeroCarousel");

      if (cancelled) {
        return;
      }

      startTransition(() => {
        setCarouselComponent(() => carouselModule.default);
      });
    };

    void loadCarousel();

    return () => {
      cancelled = true;
    };
  }, [slides.length]);

  if (!primarySlide) {
    return null;
  }

  if (!CarouselComponent) {
    return <HeroCarouselFallback slides={slides} />;
  }

  return <CarouselComponent slides={slides} />;
}
