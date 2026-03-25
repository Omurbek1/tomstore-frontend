"use client";

import { startTransition, useEffect, useState } from "react";
import type { StorefrontHeroSlide } from "@/storefront/types";
import HeroCarouselFallback from "./HeroCarouselFallback";

type HeroCarouselComponent = (typeof import("./HeroCarousel"))["default"];

type LazyHeroCarouselProps = {
  slides: StorefrontHeroSlide[];
};

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void) => number;
  cancelIdleCallback?: (id: number) => void;
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
    let idleId: number | null = null;
    let timeoutId: number | null = null;

    const loadCarousel = async () => {
      const carouselModule = await import("./HeroCarousel");

      if (cancelled) {
        return;
      }

      startTransition(() => {
        setCarouselComponent(() => carouselModule.default);
      });
    };

    const idleWindow = window as IdleWindow;

    if (typeof idleWindow.requestIdleCallback === "function") {
      idleId = idleWindow.requestIdleCallback(() => {
        void loadCarousel();
      });
    } else {
      timeoutId = window.setTimeout(() => {
        void loadCarousel();
      }, 1);
    }

    return () => {
      cancelled = true;

      if (
        idleId !== null &&
        typeof idleWindow.cancelIdleCallback === "function"
      ) {
        idleWindow.cancelIdleCallback(idleId);
      }

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [slides.length]);

  if (!primarySlide) {
    return null;
  }

  if (!CarouselComponent) {
    return <HeroCarouselFallback slide={primarySlide} />;
  }

  return <CarouselComponent slides={slides} />;
}
