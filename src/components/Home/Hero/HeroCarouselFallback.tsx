import type { StorefrontHeroSlide } from "@/storefront/types";
import HeroSlidePanel from "./HeroSlidePanel";

type HeroCarouselFallbackProps = {
  slide: StorefrontHeroSlide;
};

export default function HeroCarouselFallback({
  slide,
}: HeroCarouselFallbackProps) {
  return (
    <div className="hero-carousel">
      <HeroSlidePanel slide={slide} priority />
    </div>
  );
}
