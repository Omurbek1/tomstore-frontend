"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/provider";
import { getHomeSeoContent } from "@/seo/content";
import {
  buildBrandsHubPath,
  buildCategoriesHubPath,
} from "@/storefront/catalog-routing";

const HomeSeoSection = () => {
  const { locale, t } = useI18n();
  const content = getHomeSeoContent(locale);

  return (
    <section className="mx-auto max-w-[1170px]">
      <div className="overflow-hidden rounded-[32px] border border-white/70 bg-white/85 px-5 py-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:px-8 sm:py-10">
        <div className="mb-8 max-w-3xl">
          <span className="mb-3 inline-flex rounded-full bg-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-blue">
            {content.introEyebrow}
          </span>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            {content.introTitle}
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-[15px]">
            {content.introDescription}
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="grid gap-3 sm:grid-cols-2">
            {content.highlights.map((highlight) => (
              <div
                key={highlight}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 text-sm font-medium leading-6 text-slate-700"
              >
                {highlight}
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-950 px-5 py-5 text-white">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/60">
              TOMSTORE
            </p>
            <p className="mt-3 text-lg font-semibold">
              {content.metaTitle}
            </p>
            <p className="mt-3 text-sm leading-7 text-white/72">
              {content.metaDescription}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/shop-with-sidebar"
                className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                {content.catalogLabel}
              </Link>
              <Link
                href="/contact"
                className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
              >
                {content.contactLabel}
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href={buildCategoriesHubPath()}
                className="inline-flex rounded-full border border-white/15 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/78 transition hover:border-white/30 hover:text-white"
              >
                {t("common.categories")}
              </Link>
              <Link
                href={buildBrandsHubPath()}
                className="inline-flex rounded-full border border-white/15 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/78 transition hover:border-white/30 hover:text-white"
              >
                {t("common.brands")}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {content.faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-5"
            >
              <h3 className="text-base font-semibold text-slate-950">
                {faq.question}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSeoSection;
