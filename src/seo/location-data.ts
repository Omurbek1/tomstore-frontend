import type { Locale } from "@/i18n/messages";

export type RegionalLocationKey =
  | "bishkek"
  | "osh"
  | "talas"
  | "batken"
  | "kara-suu"
  | "ozgon"
  | "manas"
  | "chuy"
  | "karakol"
  | "kara-balta"
  | "cholpon-ata"
  | "issyk-kul"
  | "leylek"
  | "kemin"
  | "kara-kulja"
  | "naryn"
  | "kochkor"
  | "at-bashy"
  | "aktalaa"
  | "kadamjay"
  | "toktogul"
  | "sokuluk";

export type LocalizedText = {
  ru: string;
  en: string;
  ky: string;
};

export type RegionalLocation = {
  slug: RegionalLocationKey;
  name: LocalizedText;
  in: LocalizedText;
};

export const REGIONAL_LOCATION_ORDER: RegionalLocationKey[] = [
  "bishkek",
  "osh",
  "talas",
  "batken",
  "kara-suu",
  "ozgon",
  "manas",
  "chuy",
  "karakol",
  "kara-balta",
  "cholpon-ata",
  "issyk-kul",
  "leylek",
  "kemin",
  "kara-kulja",
  "naryn",
  "kochkor",
  "at-bashy",
  "aktalaa",
  "kadamjay",
  "toktogul",
  "sokuluk",
];

export const STATIC_REGIONAL_LOCATION_KEYS: RegionalLocationKey[] = [
  "bishkek",
  "osh",
  "talas",
];

export const REGIONAL_LOCATIONS: Record<RegionalLocationKey, RegionalLocation> = {
  bishkek: {
    slug: "bishkek",
    name: { ru: "Бишкек", en: "Bishkek", ky: "Бишкек" },
    in: { ru: "в Бишкеке", en: "in Bishkek", ky: "Бишкекте" },
  },
  osh: {
    slug: "osh",
    name: { ru: "Ош", en: "Osh", ky: "Ош" },
    in: { ru: "в Оше", en: "in Osh", ky: "Ошто" },
  },
  talas: {
    slug: "talas",
    name: { ru: "Талас", en: "Talas", ky: "Талас" },
    in: { ru: "в Таласе", en: "in Talas", ky: "Таласта" },
  },
  batken: {
    slug: "batken",
    name: { ru: "Баткен", en: "Batken", ky: "Баткен" },
    in: { ru: "в Баткене", en: "in Batken", ky: "Баткенде" },
  },
  "kara-suu": {
    slug: "kara-suu",
    name: { ru: "Кара-Суу", en: "Kara-Suu", ky: "Кара-Суу" },
    in: { ru: "в Кара-Суу", en: "in Kara-Suu", ky: "Кара-Сууда" },
  },
  ozgon: {
    slug: "ozgon",
    name: { ru: "Узген", en: "Uzgen", ky: "Өзгөн" },
    in: { ru: "в Узгене", en: "in Uzgen", ky: "Өзгөндө" },
  },
  manas: {
    slug: "manas",
    name: { ru: "Манас", en: "Manas", ky: "Манас" },
    in: { ru: "в Манасе", en: "in Manas", ky: "Манаста" },
  },
  chuy: {
    slug: "chuy",
    name: { ru: "Чуй", en: "Chuy", ky: "Чүй" },
    in: { ru: "в Чуйской области", en: "in Chuy Region", ky: "Чүй облусунда" },
  },
  karakol: {
    slug: "karakol",
    name: { ru: "Каракол", en: "Karakol", ky: "Каракол" },
    in: { ru: "в Караколе", en: "in Karakol", ky: "Караколдо" },
  },
  "kara-balta": {
    slug: "kara-balta",
    name: { ru: "Кара-Балта", en: "Kara-Balta", ky: "Кара-Балта" },
    in: { ru: "в Кара-Балте", en: "in Kara-Balta", ky: "Кара-Балтада" },
  },
  "cholpon-ata": {
    slug: "cholpon-ata",
    name: { ru: "Чолпон-Ата", en: "Cholpon-Ata", ky: "Чолпон-Ата" },
    in: { ru: "в Чолпон-Ате", en: "in Cholpon-Ata", ky: "Чолпон-Атада" },
  },
  "issyk-kul": {
    slug: "issyk-kul",
    name: { ru: "Иссык-Куль", en: "Issyk-Kul", ky: "Ысык-Көл" },
    in: {
      ru: "в Иссык-Кульской области",
      en: "in Issyk-Kul Region",
      ky: "Ысык-Көл облусунда",
    },
  },
  leylek: {
    slug: "leylek",
    name: { ru: "Лейлек", en: "Leylek", ky: "Лейлек" },
    in: { ru: "в Лейлеке", en: "in Leylek", ky: "Лейлекте" },
  },
  kemin: {
    slug: "kemin",
    name: { ru: "Кемин", en: "Kemin", ky: "Кемин" },
    in: { ru: "в Кемине", en: "in Kemin", ky: "Кеминде" },
  },
  "kara-kulja": {
    slug: "kara-kulja",
    name: { ru: "Кара-Кулжа", en: "Kara-Kulja", ky: "Кара-Кулжа" },
    in: { ru: "в Кара-Кулже", en: "in Kara-Kulja", ky: "Кара-Кулжада" },
  },
  naryn: {
    slug: "naryn",
    name: { ru: "Нарын", en: "Naryn", ky: "Нарын" },
    in: { ru: "в Нарыне", en: "in Naryn", ky: "Нарында" },
  },
  kochkor: {
    slug: "kochkor",
    name: { ru: "Кочкор", en: "Kochkor", ky: "Кочкор" },
    in: { ru: "в Кочкоре", en: "in Kochkor", ky: "Кочкордо" },
  },
  "at-bashy": {
    slug: "at-bashy",
    name: { ru: "Ат-Башы", en: "At-Bashy", ky: "Ат-Башы" },
    in: { ru: "в Ат-Башы", en: "in At-Bashy", ky: "Ат-Башыда" },
  },
  aktalaa: {
    slug: "aktalaa",
    name: { ru: "Акталаа", en: "Aktalaa", ky: "Акталаа" },
    in: { ru: "в Акталаа", en: "in Aktalaa", ky: "Акталаада" },
  },
  kadamjay: {
    slug: "kadamjay",
    name: { ru: "Кадамжай", en: "Kadamjay", ky: "Кадамжай" },
    in: { ru: "в Кадамжае", en: "in Kadamjay", ky: "Кадамжайда" },
  },
  toktogul: {
    slug: "toktogul",
    name: { ru: "Токтогул", en: "Toktogul", ky: "Токтогул" },
    in: { ru: "в Токтогуле", en: "in Toktogul", ky: "Токтогулда" },
  },
  sokuluk: {
    slug: "sokuluk",
    name: { ru: "Сокулук", en: "Sokuluk", ky: "Сокулук" },
    in: { ru: "в Сокулуке", en: "in Sokuluk", ky: "Сокулукта" },
  },
};

export const getRegionalLocation = (
  slug: string,
): RegionalLocation | undefined =>
  REGIONAL_LOCATIONS[slug as RegionalLocationKey];

export const getRegionalLocationText = (
  locale: Locale,
  slug: string,
) => getRegionalLocation(slug)?.name[locale] || slug;

export const getRegionalLocationInText = (
  locale: Locale,
  slug: string,
) => getRegionalLocation(slug)?.in[locale] || slug;

export const getRegionalLocationChips = (locale: Locale) =>
  REGIONAL_LOCATION_ORDER.map((slug) => ({
    slug,
    name: getRegionalLocationText(locale, slug),
    in: getRegionalLocationInText(locale, slug),
  }));
