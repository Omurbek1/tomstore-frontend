import Link from "next/link";
import type { CatalogHubSeoContent } from "@/seo/content";
import { buildAbsoluteUrl } from "@/storefront/site";
import {
  buildElectronicsLocationPath,
  buildElectronicsPath,
} from "@/storefront/catalog-routing";

type RegionalLocationLink = {
  slug: string;
  name: string;
  in: string;
};

type RegionsHubPageProps = {
  content: CatalogHubSeoContent;
  locations: RegionalLocationLink[];
  path: string;
  homeLabel: string;
  sectionLabel: string;
  sectionHref: string;
  currentLabel: string;
};

export default function RegionsHubPage({
  content,
  locations,
  path,
  homeLabel,
  sectionLabel,
  sectionHref,
  currentLabel,
}: RegionsHubPageProps) {
  const collectionStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: content.metaTitle,
    description: content.metaDescription,
    url: buildAbsoluteUrl(path),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: locations.length,
      itemListElement: locations.map((location, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: buildAbsoluteUrl(buildElectronicsLocationPath(location.slug)),
        name: location.name,
      })),
    },
  };
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeLabel,
        item: buildAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: sectionLabel,
        item: buildAbsoluteUrl(sectionHref || buildElectronicsPath()),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: currentLabel,
        item: buildAbsoluteUrl(path),
      },
    ],
  };
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />

      <main className="relative overflow-hidden pb-16 pt-40 sm:pb-20 sm:pt-44 lg:pt-36 xl:pt-48">
        <div className="pointer-events-none absolute left-[-12%] top-[5%] h-64 w-64 rounded-full bg-blue/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[-10%] top-[18%] h-72 w-72 rounded-full bg-sky-300/18 blur-3xl" />

        <section className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <div className="overflow-hidden rounded-[36px] border border-white/70 bg-white/88 px-5 py-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:px-8 sm:py-10">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-start">
              <div>
                <span className="inline-flex rounded-full bg-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-blue">
                  {content.eyebrow}
                </span>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  {content.introTitle}
                </h1>
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
                  {locations.length}
                </p>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/50">
                  {content.itemCountLabel}
                </p>
                <h2 className="mt-6 text-xl font-semibold">{content.sectionTitle}</h2>
                <p className="mt-3 text-sm leading-7 text-white/72">
                  {content.sectionDescription}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={buildElectronicsPath()}
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
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {locations.map((location) => (
              <Link
                key={location.slug}
                href={buildElectronicsLocationPath(location.slug)}
                className="group block rounded-[28px] border border-white/75 bg-white/94 p-4 shadow-[0_24px_52px_-36px_rgba(15,23,42,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-blue/20 hover:shadow-[0_34px_64px_-38px_rgba(60,80,224,0.24)]"
              >
                <div className="flex h-full min-h-[116px] flex-col justify-between">
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex rounded-full bg-blue/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue">
                      {content.cardLabel}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-dark-4">
                      {content.itemCountLabel}
                    </span>
                  </div>
                  <div className="mt-5">
                    <h2 className="text-lg font-semibold leading-7 text-slate-950 transition-colors duration-200 group-hover:text-blue">
                      {location.name}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {location.in}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <div className="grid gap-4 lg:grid-cols-3">
            {content.faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-[0_18px_48px_-42px_rgba(15,23,42,0.5)]"
              >
                <h2 className="text-base font-semibold text-slate-950">
                  {faq.question}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
