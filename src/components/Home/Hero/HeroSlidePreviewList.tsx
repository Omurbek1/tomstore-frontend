import Image from "next/image";
import type { StorefrontHeroSlide } from "@/storefront/types";

type HeroSlidePreviewListProps = {
  slides: StorefrontHeroSlide[];
  activeIndex: number;
  onSelect?: (index: number) => void;
  orientation?: "horizontal" | "vertical";
};

export default function HeroSlidePreviewList({
  slides,
  activeIndex,
  onSelect,
  orientation = "vertical",
}: HeroSlidePreviewListProps) {
  const isVertical = orientation === "vertical";

  return (
    <div
      className={
        isVertical
          ? "flex w-full flex-col gap-3"
          : "flex gap-2 overflow-x-auto pb-1 no-scrollbar"
      }
    >
      {slides.map((slide, index) => {
        const isActive = index === activeIndex;
        const previewImage = slide.backgroundImageUrl || "/images/hero/hero-01.png";
        const itemClassName = isVertical
          ? `group flex w-full items-center gap-3 rounded-[24px] border px-3 py-3 text-left transition-all duration-200 ${
              isActive
                ? "border-white/30 bg-white/16 shadow-[0_24px_40px_-28px_rgba(8,17,31,0.88)]"
                : "border-white/10 bg-white/6 hover:border-white/18 hover:bg-white/10"
            }`
          : `group flex min-w-[150px] items-center gap-3 rounded-[20px] border px-3 py-2.5 text-left transition-all duration-200 sm:min-w-[168px] ${
              isActive
                ? "border-white/30 bg-white/16 shadow-[0_20px_34px_-28px_rgba(8,17,31,0.8)]"
                : "border-white/10 bg-white/6"
            }`;
        const content = (
          <>
            <div
              className={`relative shrink-0 overflow-hidden rounded-[18px] border ${
                isActive ? "border-white/24" : "border-white/10"
              } ${
                isVertical ? "h-14 w-14" : "h-12 w-12"
              }`}
            >
              <Image
                src={previewImage}
                alt={slide.title}
                fill
                sizes={isVertical ? "56px" : "48px"}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,15,28,0.1)_0%,rgba(10,15,28,0.58)_100%)]" />
              <span className="absolute bottom-1.5 left-1.5 text-[10px] font-semibold leading-none text-white/80">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/42">
                {slide.eyebrow || "TOMSTORE"}
              </p>
              <p className="overflow-hidden text-sm font-semibold leading-5 text-white [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                {slide.title}
              </p>
            </div>
          </>
        );

        if (!onSelect) {
          return (
            <div key={`${slide.title}-${index}`} className={itemClassName}>
              {content}
            </div>
          );
        }

        return (
          <button
            key={`${slide.title}-${index}`}
            type="button"
            onClick={() => onSelect(index)}
            aria-pressed={isActive}
            className={itemClassName}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}
