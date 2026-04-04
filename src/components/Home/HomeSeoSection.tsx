import Link from "next/link";
import type { Locale } from "@/i18n/messages";
import { getHomeSeoContent } from "@/seo/content";
import {
  buildElectronicsPath,
  buildBrandsHubPath,
  buildCategoriesHubPath,
  buildLaptopStudentsBishkekPath,
  buildLaptopStudentsPath,
  buildLaptopTeachersOshPath,
  buildLaptopTeachersPath,
  buildComputersPath,
  buildLaptopsPath,
  buildOfficePrinterPath,
  buildOfficePrinterTalasPath,
  buildPrintersPath,
  buildRegionsPath,
} from "@/storefront/catalog-routing";

const getHomeSeoSectionLabels = (locale: Locale) => ({
  electronics:
    locale === "en" ? "Electronics" : locale === "ky" ? "Электроника" : "Электроника",
  categories:
    locale === "en" ? "Categories" : locale === "ky" ? "Категориялар" : "Категории",
  brands: locale === "en" ? "Brands" : locale === "ky" ? "Бренддер" : "Бренды",
  laptops: locale === "en" ? "Laptops" : locale === "ky" ? "Ноутбуктар" : "Ноутбуки",
  studentLaptops:
    locale === "en"
      ? "Student laptops"
      : locale === "ky"
        ? "Студенттерге ноутбуктар"
        : "Ноутбук для студентов",
  teacherLaptops:
    locale === "en"
      ? "Teacher laptops"
      : locale === "ky"
        ? "Мугалимдерге ноутбуктар"
        : "Ноутбук для учителей",
  printers: locale === "en" ? "Printers" : locale === "ky" ? "Принтерлер" : "Принтеры",
  officePrinter:
    locale === "en"
      ? "Office printer"
      : locale === "ky"
        ? "Офис принтери"
        : "Офисный принтер",
  computers:
    locale === "en" ? "Computers" : locale === "ky" ? "Компьютерлер" : "Компьютеры",
  regionsTitle:
    locale === "en"
      ? "Regional hub"
      : locale === "ky"
        ? "Аймактык хаб"
        : "Региональный хаб",
  regionsDescription:
    locale === "en"
      ? "Use the separate regions page to reach electronics pages for Bishkek, Osh, Talas and every other major city and district in Kyrgyzstan."
      : locale === "ky"
        ? "Өзүнчө аймактар барагы аркылуу Бишкек, Ош, Талас жана Кыргызстандагы башка шаарлар менен райондор үчүн электроника барактарына өтүңүз."
        : "Используйте отдельную страницу регионов, чтобы быстро перейти к электронике для Бишкека, Оша, Таласа и всех остальных крупных городов и районов Кыргызстана.",
  regionsButton:
    locale === "en"
      ? "Open regions"
      : locale === "ky"
        ? "Аймактарды ачуу"
        : "Открыть регионы",
});

const HomeSeoSection = ({ locale }: { locale: Locale }) => {
  const content = getHomeSeoContent(locale);
  const labels = getHomeSeoSectionLabels(locale);

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
                href={buildElectronicsPath()}
                className="inline-flex rounded-full border border-white/15 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/78 transition hover:border-white/30 hover:text-white"
              >
                {labels.electronics}
              </Link>
              <Link
                href={buildCategoriesHubPath()}
                className="inline-flex rounded-full border border-white/15 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/78 transition hover:border-white/30 hover:text-white"
              >
                {labels.categories}
              </Link>
              <Link
                href={buildBrandsHubPath()}
                className="inline-flex rounded-full border border-white/15 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/78 transition hover:border-white/30 hover:text-white"
              >
                {labels.brands}
              </Link>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href={buildLaptopsPath()}
                className="inline-flex rounded-full border border-white/15 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/78 transition hover:border-white/30 hover:text-white"
              >
                {labels.laptops}
              </Link>
              <Link
                href={buildLaptopStudentsPath()}
                className="inline-flex rounded-full border border-white/15 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/78 transition hover:border-white/30 hover:text-white"
              >
                {labels.studentLaptops}
              </Link>
              <Link
                href={buildLaptopTeachersPath()}
                className="inline-flex rounded-full border border-white/15 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/78 transition hover:border-white/30 hover:text-white"
              >
                {labels.teacherLaptops}
              </Link>
              <Link
                href={buildPrintersPath()}
                className="inline-flex rounded-full border border-white/15 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/78 transition hover:border-white/30 hover:text-white"
              >
                {labels.printers}
              </Link>
              <Link
                href={buildOfficePrinterPath()}
                className="inline-flex rounded-full border border-white/15 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/78 transition hover:border-white/30 hover:text-white"
              >
                {labels.officePrinter}
              </Link>
              <Link
                href={buildComputersPath()}
                className="inline-flex rounded-full border border-white/15 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/78 transition hover:border-white/30 hover:text-white"
              >
                {labels.computers}
              </Link>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href={buildLaptopStudentsBishkekPath()}
                className="inline-flex rounded-full border border-white/15 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/78 transition hover:border-white/30 hover:text-white"
              >
                {locale === "en"
                  ? "Student laptops in Bishkek"
                  : locale === "ky"
                    ? "Бишкекте студенттер үчүн ноутбук"
                    : "Ноутбук для студентов в Бишкеке"}
              </Link>
              <Link
                href={buildLaptopTeachersOshPath()}
                className="inline-flex rounded-full border border-white/15 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/78 transition hover:border-white/30 hover:text-white"
              >
                {locale === "en"
                  ? "Teacher laptops in Osh"
                  : locale === "ky"
                    ? "Ошто мугалимдер үчүн ноутбук"
                    : "Ноутбук для учителей в Оше"}
              </Link>
              <Link
                href={buildOfficePrinterTalasPath()}
                className="inline-flex rounded-full border border-white/15 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/78 transition hover:border-white/30 hover:text-white"
              >
                {locale === "en"
                  ? "Office printer in Talas"
                  : locale === "ky"
                    ? "Таласта офис принтери"
                    : "Офисный принтер в Таласе"}
              </Link>
            </div>
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                {labels.regionsTitle}
              </p>
              <p className="mt-2 text-sm leading-6 text-white/72">
                {labels.regionsDescription}
              </p>
              <div className="mt-3">
                <Link
                  href={buildRegionsPath()}
                  className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  {labels.regionsButton}
                </Link>
              </div>
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
