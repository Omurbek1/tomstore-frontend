"use client";

import { useI18n } from "@/i18n/provider";
import type { Locale } from "@/i18n/messages";
import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";

const getHeroSearchCopy = (locale: Locale) => ({
  kicker:
    locale === "en" ? "Quick search" : locale === "ky" ? "Тез издөө" : "Быстрый поиск",
  title:
    locale === "en"
      ? "Find a laptop, printer or electronics in seconds"
      : locale === "ky"
        ? "Ноутбук, принтер же электрониканы тез табыңыз"
        : "Найдите ноутбук, принтер или электронику за пару секунд",
  hint:
    locale === "en"
      ? "Type a product name, brand or category and jump straight to the catalog."
      : locale === "ky"
        ? "Товардын атын, брендин же категориясын жазыңыз — түз эле каталогго өтүңүз."
        : "Введите название товара, бренд или категорию и сразу переходите к каталогу.",
  placeholder:
    locale === "en"
      ? "E.g. laptop for study"
      : locale === "ky"
        ? "Мисалы: окууга ноутбук"
        : "Например: ноутбук для учебы",
  button:
    locale === "en" ? "Search" : locale === "ky" ? "Издөө" : "Найти",
});

export default function HeroSearchBar() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [isPending, startTransition] = useTransition();
  const { locale } = useI18n();
  const copy = getHeroSearchCopy(locale);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchValue.trim();
    startTransition(() => {
      router.push(
        query
          ? `/shop-with-sidebar?q=${encodeURIComponent(query)}`
          : "/shop-with-sidebar",
      );
    });
  };

  return (
    <div className="mt-6 rounded-[24px] border border-white/12 bg-white/8 px-4 py-4 backdrop-blur-md sm:px-5 sm:py-5">
      <div className="mb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55">
          {copy.kicker}
        </p>
        <h2 className="mt-1 text-lg font-semibold text-white sm:text-xl">
          {copy.title}
        </h2>
        <p className="mt-2 max-w-[620px] text-sm leading-6 text-white/68">
          {copy.hint}
        </p>
      </div>

      <form className="flex flex-col gap-3 md:flex-row md:items-end" onSubmit={submitSearch}>
        <label className="relative flex-1">
          <span className="sr-only">{copy.title}</span>
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/45"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.74967 15.8337C12.4916 15.8337 15.5413 12.784 15.5413 9.04199C15.5413 5.30004 12.4916 2.25033 8.74967 2.25033C5.00772 2.25033 1.95801 5.30004 1.95801 9.04199C1.95801 12.784 5.00772 15.8337 8.74967 15.8337Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.0413 18.0413L13.2497 13.2497"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder={copy.placeholder}
            className="w-full rounded-[20px] border border-white/12 bg-slate-950/35 px-4 py-3 pl-11 text-sm text-white outline-none transition placeholder:text-white/55 focus:border-white/30 focus:ring-2 focus:ring-white/10"
          />
        </label>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-[20px] bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {copy.button}
        </button>
      </form>
    </div>
  );
}
