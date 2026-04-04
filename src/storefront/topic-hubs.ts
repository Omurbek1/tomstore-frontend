import type { Locale } from "@/i18n/messages";
import type { StorefrontCategory } from "./types";

export type TopicLandingKey = "laptops" | "printers" | "computers";

const sortCategories = <T extends { totalProducts: number; name: string }>(
  items: T[],
) =>
  [...items].sort(
    (left, right) =>
      right.totalProducts - left.totalProducts || left.name.localeCompare(right.name),
  );

const TOPIC_CATEGORY_PATTERNS: Record<TopicLandingKey, RegExp[]> = {
  laptops: [/laptop/i, /notebook/i, /ноут/i, /\bpc\b/i, /компьютер/i],
  printers: [/printer/i, /print/i, /принт/i, /принтер/i, /мфу/i],
  computers: [/computer/i, /desktop/i, /pc/i, /компьютер/i, /моноблок/i],
};

const TOPIC_LABELS: Record<
  TopicLandingKey,
  { ru: string; en: string; ky: string }
> = {
  laptops: {
    ru: "Ноутбуки",
    en: "Laptops",
    ky: "Ноутбуктар",
  },
  printers: {
    ru: "Принтеры",
    en: "Printers",
    ky: "Принтерлер",
  },
  computers: {
    ru: "Компьютеры",
    en: "Computers",
    ky: "Компьютерлер",
  },
};

export const selectTopicCategories = (
  categories: StorefrontCategory[],
  topic: TopicLandingKey,
  limit = 6,
) => {
  const sortedCategories = sortCategories(categories);
  const matchers = TOPIC_CATEGORY_PATTERNS[topic];
  const matchedCategories = sortedCategories.filter((category) => {
    const searchText = `${category.name} ${category.slug}`.toLowerCase();
    return matchers.some((matcher) => matcher.test(searchText));
  });
  const matchedSlugs = new Set(matchedCategories.map((category) => category.slug));
  const fallbackCategories = sortedCategories.filter(
    (category) => !matchedSlugs.has(category.slug),
  );

  return [...matchedCategories, ...fallbackCategories].slice(0, limit);
};

export const getTopicBreadcrumbLabels = (
  locale: Locale,
  topic: TopicLandingKey,
) => ({
  home: locale === "en" ? "Home" : locale === "ky" ? "Башкы бет" : "Главная",
  section:
    locale === "en" ? "Electronics" : locale === "ky" ? "Электроника" : "Электроника",
  current: TOPIC_LABELS[topic][locale],
});
