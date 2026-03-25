import type { StorefrontHeroSlide } from "@/storefront/types";
import HeroSlidePanel from "./HeroSlidePanel";
import HeroSlidePreviewList from "./HeroSlidePreviewList";

type HeroCarouselFallbackProps = {
  slides: StorefrontHeroSlide[];
};

export default function HeroCarouselFallback({
  slides,
}: HeroCarouselFallbackProps) {
  const primarySlide = slides[0];

  if (!primarySlide) {
    return null;
  }

  return (
    <div className="relative">
      <div className="hero-carousel">
        <HeroSlidePanel
          slide={primarySlide}
          priority
          hasPreviewRail={slides.length > 1}
        />
      </div>

      {slides.length > 1 ? (
        <>
          <div className="pointer-events-none absolute inset-y-0 right-5 z-20 hidden items-center xl:flex">
            <div className="pointer-events-auto w-[220px]">
              <HeroSlidePreviewList slides={slides} activeIndex={0} />
            </div>
          </div>

          <div className="px-4 pb-4 pt-3 sm:px-6 xl:hidden">
            <HeroSlidePreviewList
              slides={slides}
              activeIndex={0}
              orientation="horizontal"
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
