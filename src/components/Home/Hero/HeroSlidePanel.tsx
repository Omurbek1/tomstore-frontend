import Image from "next/image";
import Link from "next/link";
import type { StorefrontHeroSlide } from "@/storefront/types";

type HeroSlidePanelProps = {
  slide: StorefrontHeroSlide;
  priority?: boolean;
  hasPreviewRail?: boolean;
};

export default function HeroSlidePanel({
  slide,
  priority = false,
  hasPreviewRail = false,
}: HeroSlidePanelProps) {
  return (
    <div
      className={`relative grid min-h-[400px] items-center gap-8 overflow-hidden px-5 pb-12 pt-8 sm:px-8 sm:pb-14 sm:pt-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(280px,360px)] lg:px-12 xl:min-h-[560px] ${
        hasPreviewRail ? "xl:pr-[268px]" : "xl:pr-14"
      } xl:pl-14`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.13),transparent_34%),radial-gradient(circle_at_78%_24%,rgba(59,130,246,0.18),transparent_26%)]" />
      <div className="pointer-events-none absolute -left-10 top-10 h-32 w-32 rounded-full bg-white/8 blur-3xl sm:h-44 sm:w-44" />
      <div className="pointer-events-none absolute bottom-0 right-[12%] h-44 w-44 rounded-full bg-blue/18 blur-3xl sm:h-60 sm:w-60" />

      <div className="relative z-10 max-w-[600px]">
      

        <h1 className="max-w-[12ch] text-4xl font-semibold leading-[1.02] text-white sm:text-5xl xl:text-[64px]">
          {slide.title}
        </h1>

        <p className="mt-5 max-w-[540px] text-sm leading-6 text-white/72 sm:text-base sm:leading-7">
          {slide.subtitle}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8">
          <Link
            href={slide.primaryCtaHref}
            className="inline-flex rounded-full bg-blue px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-dark sm:px-7"
          >
            {slide.primaryCtaLabel}
          </Link>
          <Link
            href={slide.secondaryCtaHref}
            className="inline-flex rounded-full border border-white/12 bg-white/8 px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-white hover:text-dark sm:px-7"
          >
            {slide.secondaryCtaLabel}
          </Link>
        </div>

       
      </div>

      <div className="relative z-10 flex justify-center lg:justify-end">
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-[22px] border border-white/12 bg-slate-950/40 px-4 py-3 shadow-[0_28px_60px_-42px_rgba(8,17,31,0.95)] backdrop-blur-xl sm:bottom-8 sm:left-0 sm:translate-x-0">
          <p className="mt-1 text-sm font-semibold text-white">
            +996 508 724 365
          </p>
        </div>
        <div className="absolute right-[6%] top-[10%] h-18 w-18 rounded-[24px] border border-white/10 bg-white/6 backdrop-blur-md sm:h-24 sm:w-24" />
        <div className="absolute h-48 w-48 rounded-full bg-blue/25 blur-3xl sm:h-64 sm:w-64" />
        <div className="relative flex h-[280px] w-full max-w-[320px] items-center justify-center overflow-hidden rounded-[34px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.04)_100%)] px-8 py-8 shadow-[0_30px_70px_-42px_rgba(8,17,31,0.92)] sm:h-[360px] sm:max-w-[360px] sm:px-10 xl:h-[430px] xl:max-w-[420px] xl:px-12">
          <div className="absolute inset-4 rounded-[28px] border border-white/10" />
          <div className="absolute inset-x-10 top-4 h-10 rounded-full bg-white/10 blur-2xl" />
          <Image
            src={slide.backgroundImageUrl || "/images/hero/hero-01.png"}
            alt={slide.title}
            width={420}
            height={420}
            priority={priority}
            sizes="(min-width: 1280px) 420px, (min-width: 1024px) 360px, 320px"
            className="relative z-10 h-auto max-h-[88%] w-auto object-contain drop-shadow-[0_28px_42px_rgba(0,0,0,0.35)]"
          />
        </div>
      </div>
    </div>
  );
}
