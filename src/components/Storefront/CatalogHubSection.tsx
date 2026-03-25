import Image from "next/image";
import Link from "next/link";
import type {
  CatalogHubSeoContent,
} from "@/seo/content";
import type {
  StorefrontBrand,
  StorefrontCategory,
} from "@/storefront/types";
import {
  buildBrandPath,
  buildCategoryPath,
} from "@/storefront/catalog-routing";

type CatalogHubSectionProps = {
  content: CatalogHubSeoContent;
  type: "category" | "brand";
  items: Array<StorefrontCategory | StorefrontBrand>;
};

const getBrandInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");

export default function CatalogHubSection({
  content,
  type,
  items,
}: CatalogHubSectionProps) {
  return (
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
                {items.length}
              </p>
              <h2 className="mt-6 text-xl font-semibold">{content.sectionTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-white/72">
                {content.sectionDescription}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
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
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => {
            const href =
              type === "category"
                ? buildCategoryPath(item.slug)
                : buildBrandPath(item.slug);
            const totalProducts = item.totalProducts;
            const isCategory = type === "category";
            const categoryImage = isCategory && "image" in item ? item.image : undefined;
            const brandInitials = !isCategory ? getBrandInitials(item.name) : "";

            return (
              <Link
                key={item.slug}
                href={href}
                className="group block h-full rounded-[28px] border border-white/75 bg-white/94 p-4 shadow-[0_24px_52px_-36px_rgba(15,23,42,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-blue/20 hover:shadow-[0_34px_64px_-38px_rgba(60,80,224,0.24)]"
              >
                <div className="flex h-full flex-col">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <span className="inline-flex rounded-full bg-blue/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue">
                      {totalProducts}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-dark-4">
                      {content.cardLabel}
                    </span>
                  </div>

                  <div className="mb-5 flex min-h-[92px] items-center justify-center rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#fbfcff_0%,#f4f7ff_100%)] px-4 py-4">
                    {categoryImage ? (
                      <Image
                        src={categoryImage}
                        alt={item.name}
                        width={120}
                        height={88}
                        className="h-auto max-h-[72px] w-auto object-contain"
                      />
                    ) : (
                      <span className="text-3xl font-semibold tracking-[0.12em] text-slate-300">
                        {brandInitials || item.name.slice(0, 1).toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div className="mt-auto">
                    <h2 className="text-lg font-semibold leading-7 text-slate-950 transition-colors duration-200 group-hover:text-blue">
                      {item.name}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {totalProducts} {content.itemCountLabel}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
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
  );
}
