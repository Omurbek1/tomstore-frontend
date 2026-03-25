import Link from "next/link";
import type { CatalogLandingSeoContent } from "@/seo/content";

type CatalogSeoSectionProps = {
  content: CatalogLandingSeoContent;
  totalProducts: number;
  catalogHref?: string;
  contactHref?: string;
};

export default function CatalogSeoSection({
  content,
  totalProducts,
  catalogHref = "/shop-with-sidebar",
  contactHref = "/contact",
}: CatalogSeoSectionProps) {
  return (
    <section className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
      <div className="overflow-hidden rounded-[32px] border border-white/70 bg-white/90 px-5 py-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:px-8 sm:py-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div>
            <span className="inline-flex rounded-full bg-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-blue">
              {content.eyebrow}
            </span>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              {content.introTitle}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-[15px]">
              {content.introDescription}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {content.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 text-sm font-medium leading-6 text-slate-700"
                >
                  {highlight}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-slate-950 px-5 py-6 text-white shadow-[0_24px_60px_-40px_rgba(15,23,42,0.75)] sm:px-6">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/60">
              {content.countLabel}
            </p>
            <p className="mt-3 text-4xl font-semibold tracking-tight">
              {totalProducts}
            </p>
            <h3 className="mt-6 text-xl font-semibold">{content.summaryTitle}</h3>
            <p className="mt-3 text-sm leading-7 text-white/72">
              {content.summaryDescription}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={catalogHref}
                className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                {content.catalogLabel}
              </Link>
              <Link
                href={contactHref}
                className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
              >
                {content.contactLabel}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,#fbfcff_0%,#f5f8ff_100%)] px-5 py-6 sm:px-6">
          <h3 className="text-xl font-semibold text-slate-950">
            {content.guideTitle}
          </h3>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {content.guideParagraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm leading-7 text-slate-600 sm:text-[15px]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
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
}
