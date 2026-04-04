import type { Locale } from "@/i18n/messages";
import type { CatalogHubSeoContent } from "./content";
import { getElectronicsHubSeoContent } from "./content";
import { getComputersHubSeoContent } from "./topic-hub-content";

type CityKey = "bishkek" | "osh" | "talas";
type TopicKey = "computers" | "electronics";

type LocalizedText = {
  ru: string;
  en: string;
  ky: string;
};

type TopicCityContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  introTitle: string;
  introDescription: string;
  countLabel: string;
  sectionTitle: string;
  sectionDescription: string;
  highlights: string[];
  faqs: CatalogHubSeoContent["faqs"];
  keywords: string[];
};

const CITY_IN = {
  bishkek: { ru: "в Бишкеке", en: "in Bishkek", ky: "Бишкекте" },
  osh: { ru: "в Оше", en: "in Osh", ky: "Ошто" },
  talas: { ru: "в Таласе", en: "in Talas", ky: "Таласта" },
} satisfies Record<CityKey, LocalizedText>;

const CITY_NAME = {
  bishkek: { ru: "Бишкек", en: "Bishkek", ky: "Бишкек" },
  osh: { ru: "Ош", en: "Osh", ky: "Ош" },
  talas: { ru: "Талас", en: "Talas", ky: "Талас" },
} satisfies Record<CityKey, LocalizedText>;

const TOPIC_TITLE = {
  computers: { ru: "Компьютеры", en: "Computers", ky: "Компьютерлер" },
  electronics: { ru: "Электроника", en: "Electronics", ky: "Электроника" },
} satisfies Record<TopicKey, LocalizedText>;

const TOPIC_LOWER = {
  computers: { ru: "компьютеры", en: "computers", ky: "компьютерлер" },
  electronics: { ru: "электроника", en: "electronics", ky: "электроника" },
} satisfies Record<TopicKey, LocalizedText>;

const TOPIC_BASE = {
  computers: getComputersHubSeoContent,
  electronics: getElectronicsHubSeoContent,
} satisfies Record<TopicKey, (locale: Locale) => CatalogHubSeoContent>;

const buildFaqs = (
  locale: Locale,
  topic: TopicKey,
  city: CityKey,
): CatalogHubSeoContent["faqs"] => {
  const cityName = CITY_NAME[city][locale];

  switch (locale) {
    case "en":
      return [
        {
          question:
            topic === "computers"
              ? `Which computer is best for home or office in ${cityName}?`
              : `Which electronics should I compare first in ${cityName}?`,
          answer:
            topic === "computers"
              ? "Start with the task, memory, storage and form factor. For office and home use, a balanced computer with SSD storage is usually the most practical choice."
              : "Start with the task, budget and product type. Then compare stock, configuration and price inside the right electronics category.",
        },
        {
          question: `Can I confirm stock and price before ordering in ${cityName}?`,
          answer:
            "Yes. The manager can confirm current stock, price and configuration through WhatsApp before the order is placed.",
        },
        {
          question: `Is this page useful for home, study and office purchases?`,
          answer:
            "Yes. It helps narrow the selection quickly and works well for both private buyers and office purchases.",
        },
      ];
    case "ky":
      return [
        {
          question:
            topic === "computers"
              ? `${cityName} шаарында үйгө же офиске кайсы компьютер жакшы?`
              : `${cityName} шаарында электроника тандоодо эмнени биринчи караш керек?`,
          answer:
            topic === "computers"
              ? "Алгач тапшырмага, эс тутумга, сактагычка жана форм-факторго көңүл буруңуз. Үй жана офис үчүн SSD бар тең салмактуу компьютер көбүнчө эң ыңгайлуу болот."
              : "Алгач тапшырманы, бюджетти жана товар түрүн аныктаңыз. Андан кийин туура электроника категориясындагы бар-жогун, комплектациясын жана баасын салыштырыңыз.",
        },
        {
          question: `${cityName} шаарында заказдан мурун баа менен бар-жогун тактаса болобу?`,
          answer:
            "Ооба. Менеджер WhatsApp аркылуу учурдагы бааны, бар-жогун жана комплектациясын тактап бере алат.",
        },
        {
          question: "Бул барак үй, окуу жана офис үчүн ылайыктуубу?",
          answer:
            "Ооба. Бул барак тандоону ылдам тарылтат жана жеке кардарларга да, офис үчүн алгандарга да ыңгайлуу.",
        },
      ];
    case "ru":
    default:
      return [
        {
          question:
            topic === "computers"
              ? `Какой компьютер лучше для дома или офиса в ${cityName}?`
              : `Что в электронике стоит сравнить первым в ${cityName}?`,
          answer:
            topic === "computers"
              ? "Сначала смотрите на задачу, память, накопитель и форм-фактор. Для офиса и дома обычно лучше всего подходит сбалансированный компьютер с SSD."
              : "Сначала определите задачу, бюджет и тип товара. Затем сравните наличие, конфигурацию и цену внутри нужной категории электроники.",
        },
        {
          question: `Можно ли уточнить наличие и цену перед заказом в ${cityName}?`,
          answer:
            "Да. Менеджер TOMSTORE может через WhatsApp подтвердить актуальную цену, наличие и подходящую комплектацию перед заказом.",
        },
        {
          question: `Подходит ли эта страница для дома, учебы и офиса?`,
          answer:
            "Да. Она помогает быстро сузить выбор и удобна как для частных покупателей, так и для офисных закупок.",
        },
      ];
  }
};

const buildTopicCityContent = (
  locale: Locale,
  topic: TopicKey,
  city: CityKey,
): CatalogHubSeoContent => {
  const base = TOPIC_BASE[topic](locale);
  const topicTitle = TOPIC_TITLE[topic][locale];
  const topicLower = TOPIC_LOWER[topic][locale];
  const cityIn = CITY_IN[city][locale];
  const cityName = CITY_NAME[city][locale];

  const overrides: TopicCityContent = {
    metaTitle:
      locale === "en"
        ? `${topicTitle} ${cityIn} | TOMSTORE`
        : `${topicTitle} ${cityIn} | TOMSTORE`,
    metaDescription:
      locale === "en"
        ? `TOMSTORE ${topicLower} ${cityIn} with practical categories, clear prices and fast WhatsApp ordering.`
        : locale === "ky"
          ? `TOMSTORE дүкөнүндөгү ${topicLower} ${cityIn}: ыңгайлуу категориялар, актуалдуу баалар жана WhatsApp аркылуу тез заказ.`
          : `TOMSTORE дүкөнүндөгү ${topicLower} ${cityIn}: ыңгайлуу категориялар, актуалдуу баалар жана WhatsApp аркылуу тез заказ.`,
    eyebrow:
      locale === "en"
        ? `TOMSTORE ${topicTitle}`
        : locale === "ky"
          ? `TOMSTORE ${topicTitle}`
          : `TOMSTORE ${topicTitle}`,
    introTitle:
      locale === "en"
        ? `${topicTitle} ${cityIn}`
        : `${topicTitle} ${cityIn}`,
    introDescription:
      locale === "en"
        ? `If you are looking for ${topicLower} ${cityIn}, this page helps you compare the available categories, narrow the selection and move to the right option faster.`
        : locale === "ky"
          ? `Эгер сизге ${topicLower} ${cityIn} керек болсо, бул барак жеткиликтүү категорияларды салыштырып, тандоону бат тарылтууга жардам берет.`
          : `Если вы ищете ${topicLower} ${cityIn}, эта страница помогает сравнить доступные категории, быстрее сузить выбор и перейти к подходящему варианту.`,
    countLabel:
      locale === "en"
        ? `${topicTitle} categories`
        : locale === "ky"
          ? `${topicTitle} категориялары`
          : `Категорий ${topicLower}`,
    sectionTitle:
      locale === "en"
        ? `${topicTitle} for home, study and office ${cityIn}`
        : locale === "ky"
          ? `${topicTitle} үйгө, окууга жана офиске ${cityIn}`
          : `${topicTitle} для дома, учебы и офиса ${cityIn}`,
    sectionDescription:
      locale === "en"
        ? `Compare ${topicLower} categories ${cityIn}, check stock and move to a quick WhatsApp order.`
        : locale === "ky"
          ? `${topicLower} категорияларын ${cityIn} салыштырып, бар-жогун тактап, WhatsApp аркылуу тез заказ кылыңыз.`
          : `Сравните категории ${topicLower} ${cityIn}, проверьте наличие и переходите к быстрому заказу через WhatsApp.`,
    highlights:
      topic === "computers"
        ? [
            locale === "en"
              ? `Computers for home, study and office in ${cityName}`
              : locale === "ky"
                ? `${cityName} шаарында үйгө, окууга жана офиске компьютерлер`
                : `Компьютеры для дома, учебы и офиса в ${cityName}`,
            locale === "en"
              ? "Balanced picks for work and business scenarios"
              : locale === "ky"
                ? "Жумуш жана бизнес үчүн тең салмактуу тандоолор"
                : "Сбалансированные варианты для работы и бизнеса",
            locale === "en"
              ? "Fast access to categories and the catalog"
              : locale === "ky"
                ? "Категорияларга жана каталогго тез өтүү"
                : "Быстрый переход к категориям и каталогу",
            locale === "en"
              ? "Manager support for stock and configuration"
              : locale === "ky"
                ? "Бар-жогу жана конфигурация боюнча менеджердин жардамы"
                : "Помощь менеджера с наличием и конфигурацией",
          ]
        : [
            locale === "en"
              ? `Electronics for home, study and office in ${cityName}`
              : locale === "ky"
                ? `${cityName} шаарында үйгө, окууга жана офиске электроника`
                : `Электроника для дома, учебы и офиса в ${cityName}`,
            locale === "en"
              ? "Laptops, printers, computers and accessories"
              : locale === "ky"
                ? "Ноутбуктар, принтерлер, компьютерлер жана аксессуарлар"
                : "Ноутбуки, принтеры, компьютеры и аксессуары",
            locale === "en"
              ? "Fast access to the right categories"
              : locale === "ky"
                ? "Туура категорияларга тез өтүү"
                : "Быстрый переход к нужным категориям",
            locale === "en"
              ? "Manager support for stock and ordering"
              : locale === "ky"
                ? "Бар-жогу жана заказ боюнча менеджердин жардамы"
                : "Помощь менеджера с наличием и заказом",
          ],
    faqs: buildFaqs(locale, topic, city),
    keywords:
      locale === "en"
        ? [
            `${topicLower} ${cityName}`,
            `${topicLower} in ${cityName}`,
            `buy ${topicLower} in ${cityName}`,
            `${topicLower} Kyrgyzstan`,
            "TOMSTORE",
          ]
        : locale === "ky"
          ? [
              `${topicLower} ${cityName}`,
              `${topicLower} ${cityIn}`,
              `${topicLower} сатып алуу ${cityName}`,
              `${topicLower} Кыргызстан`,
              "TOMSTORE",
            ]
          : [
              `${topicLower} ${cityName}`,
              `${topicLower} ${cityIn}`,
              `купить ${topicLower} ${cityIn}`,
              `${topicLower} Кыргызстан`,
              "TOMSTORE",
            ],
  };

  return {
    ...base,
    ...overrides,
  };
};

export const getComputersBishkekSeoContent = (locale: Locale) =>
  buildTopicCityContent(locale, "computers", "bishkek");

export const getComputersOshSeoContent = (locale: Locale) =>
  buildTopicCityContent(locale, "computers", "osh");

export const getComputersTalasSeoContent = (locale: Locale) =>
  buildTopicCityContent(locale, "computers", "talas");

export const getElectronicsBishkekSeoContent = (locale: Locale) =>
  buildTopicCityContent(locale, "electronics", "bishkek");

export const getElectronicsOshSeoContent = (locale: Locale) =>
  buildTopicCityContent(locale, "electronics", "osh");

export const getElectronicsTalasSeoContent = (locale: Locale) =>
  buildTopicCityContent(locale, "electronics", "talas");

export const getCityTopicBreadcrumbLabels = (
  locale: Locale,
  topic: TopicKey,
  city: CityKey,
) => ({
  home: locale === "en" ? "Home" : locale === "ky" ? "Башкы бет" : "Главная",
  section: TOPIC_TITLE[topic][locale],
  current: `${TOPIC_TITLE[topic][locale]} ${CITY_IN[city][locale]}`,
});
