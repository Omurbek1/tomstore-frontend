import type { Locale } from "@/i18n/messages";
import type {
  CatalogHubSeoContent,
  CatalogLandingSeoContent,
} from "./content";
import { getElectronicsHubSeoContent } from "./content";
import { getComputersHubSeoContent } from "./topic-hub-content";
import {
  getRegionalLocation,
  REGIONAL_LOCATION_ORDER,
  STATIC_REGIONAL_LOCATION_KEYS,
  type RegionalLocationKey,
} from "./location-data";

type TopicKey = "computers" | "electronics";

type RegionalTopicSeoContent = CatalogHubSeoContent & CatalogLandingSeoContent;

type LocalizedText = {
  ru: string;
  en: string;
  ky: string;
};

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

const getTopicIntro = (
  locale: Locale,
  topic: TopicKey,
  locationIn: string,
) => {
  if (topic === "computers") {
    return {
      summaryTitle:
        locale === "en"
          ? `How to choose computers ${locationIn}`
          : locale === "ky"
            ? `${locationIn} компьютерлерди кантип тандоо керек`
            : `Как выбрать компьютеры ${locationIn}`,
      summaryDescription:
        locale === "en"
          ? "Focus on the task, memory, storage and form factor. For home and office use, a balanced computer with SSD storage is usually the most practical choice."
          : locale === "ky"
            ? "Алгач тапшырмага, эс тутумга, сактагычка жана форм-факторго көңүл буруңуз. Үй жана офис үчүн SSD бар тең салмактуу компьютер көбүнчө эң ыңгайлуу болот."
            : "Сначала смотрите на задачу, память, накопитель и форм-фактор. Для офиса и дома обычно лучше всего подходит сбалансированный компьютер с SSD.",
      guideTitle:
        locale === "en"
          ? `What matters before buying ${locationIn}`
          : locale === "ky"
            ? `${locationIn} сатып алардан мурда эмнени караш керек`
            : `Что важно перед покупкой ${locationIn}`,
      guideParagraphs:
        locale === "en"
          ? [
              `For ${locationIn}, start with the use case: home, study, office or business. That narrows the assortment before comparing specific computer models.`,
              "If you already know the budget, use the catalog filters and then confirm stock and configuration with TOMSTORE before ordering.",
            ]
          : locale === "ky"
            ? [
                `${locationIn} үчүн адегенде колдонуу сценарийин аныктаңыз: үй, окуу, офис же бизнес. Ошондо конкреттүү компьютер моделдерин салыштырууга чейин эле тандоо тарыйт.`,
                "Бюджет белгилүү болсо, каталог фильтрлерин колдонуп, андан кийин TOMSTORE менен бар-жогун жана комплектациясын тактаңыз.",
              ]
            : [
                `Для ${locationIn} сначала определите сценарий использования: дом, учеба, офис или бизнес. Так ассортимент сужается еще до сравнения конкретных моделей компьютеров.`,
                "Если бюджет уже понятен, используйте фильтры каталога и затем подтвердите наличие и конфигурацию у TOMSTORE перед заказом.",
              ],
    };
  }

  return {
    summaryTitle:
      locale === "en"
        ? `How to choose electronics ${locationIn}`
        : locale === "ky"
          ? `${locationIn} электрониканы кантип тандоо керек`
          : `Как выбрать электронику ${locationIn}`,
    summaryDescription:
      locale === "en"
        ? "Start with the task and product type, then compare stock, configuration and price inside the right electronics category."
        : locale === "ky"
          ? "Алгач тапшырманы жана товар түрүн аныктап, андан кийин туура электроника категориясындагы бар-жогун, комплектациясын жана баасын салыштырыңыз."
          : "Сначала определите задачу и тип товара, затем сравните наличие, конфигурацию и цену внутри нужной категории электроники.",
    guideTitle:
      locale === "en"
        ? `What to compare first ${locationIn}`
        : locale === "ky"
          ? `${locationIn} биринчи эмнени салыштыруу керек`
          : `Что сравнить первым ${locationIn}`,
    guideParagraphs:
      locale === "en"
        ? [
            `The page keeps electronics ${locationIn} in one place, so visitors can compare the right product groups before opening the catalog.`,
            "It also helps move from broad demand to a more focused shortlist, which makes the final purchase easier.",
          ]
        : locale === "ky"
          ? [
              `Бул барак ${locationIn} электрониканы бир жерге топтоп, колдонуучуга каталогду ачардан мурда туура товар топторун салыштырууга жардам берет.`,
              "Ошондой эле кеңири суроо-талапты так тандоого жакындатат, бул акыркы чечимди жеңилдетет.",
            ]
          : [
              `Эта страница собирает электронику ${locationIn} в одном месте и помогает сравнить нужные товарные группы еще до перехода в каталог.`,
              "Так широкий спрос быстрее превращается в короткий и понятный список вариантов для покупки.",
            ],
  };
};

const buildFaqs = (
  locale: Locale,
  topic: TopicKey,
  locationIn: string,
): CatalogHubSeoContent["faqs"] => {
  if (locale === "en") {
    return [
      {
        question:
          topic === "computers"
            ? `Which computer is best ${locationIn}?`
            : `What should I compare first in electronics ${locationIn}?`,
        answer:
          topic === "computers"
            ? "Start with the task, memory, storage and form factor. For home and office use, a balanced computer with SSD storage is usually the most practical choice."
            : "Start with the task and product type, then compare stock, configuration and price inside the right electronics category.",
      },
      {
        question: `Can I confirm stock and price before ordering ${locationIn}?`,
        answer:
          "Yes. The manager can confirm current stock, price and configuration through WhatsApp before the order is placed.",
      },
      {
        question: `Is this page useful for home, study and office purchases ${locationIn}?`,
        answer:
          "Yes. It helps narrow the selection quickly and works well for both private buyers and office purchases.",
      },
    ];
  }

  if (locale === "ky") {
    return [
      {
        question:
          topic === "computers"
            ? `${locationIn} үйгө же офиске кайсы компьютер жакшы?`
            : `${locationIn} электроника тандоодо эмнени биринчи караш керек?`,
        answer:
          topic === "computers"
            ? "Алгач тапшырмага, эс тутумга, сактагычка жана форм-факторго көңүл буруңуз. Үй жана офис үчүн SSD бар тең салмактуу компьютер көбүнчө эң ыңгайлуу болот."
            : "Алгач тапшырманы жана товар түрүн аныктап, андан кийин туура электроника категориясындагы бар-жогун, комплектациясын жана баасын салыштырыңыз.",
      },
      {
        question: `${locationIn} заказдан мурун баа менен бар-жогун тактаса болобу?`,
        answer:
          "Ооба. Менеджер WhatsApp аркылуу учурдагы бааны, бар-жогун жана комплектациясын тактап бере алат.",
      },
      {
        question: `Бул барак үй, окуу жана офис үчүн ылайыктуубу ${locationIn}?`,
        answer:
          "Ооба. Бул барак тандоону ылдам тарылтат жана жеке кардарларга да, офис үчүн алгандарга да ыңгайлуу.",
      },
    ];
  }

  return [
    {
      question:
        topic === "computers"
          ? `Какой компьютер лучше ${locationIn}?`
          : `Что в электронике стоит сравнить первым ${locationIn}?`,
      answer:
        topic === "computers"
          ? "Сначала смотрите на задачу, память, накопитель и форм-фактор. Для офиса и дома обычно лучше всего подходит сбалансированный компьютер с SSD."
          : "Сначала определите задачу и тип товара, затем сравните наличие, конфигурацию и цену внутри нужной категории электроники.",
    },
    {
      question: `Можно ли уточнить наличие и цену перед заказом ${locationIn}?`,
      answer:
        "Да. Менеджер TOMSTORE может через WhatsApp подтвердить актуальную цену, наличие и подходящую комплектацию перед заказом.",
    },
    {
      question: `Подходит ли эта страница для розничных и офисных закупок ${locationIn}?`,
      answer:
        "Да. Отдельная страница помогает быстро сузить выбор и удобна как для частных покупателей, так и для офисных закупок.",
    },
  ];
};

const buildTopicLocationContent = (
  locale: Locale,
  topic: TopicKey,
  locationKey: RegionalLocationKey,
): RegionalTopicSeoContent => {
  const base = TOPIC_BASE[topic](locale);
  const location = getRegionalLocation(locationKey) ?? getRegionalLocation("bishkek")!;
  const locationName = location.name[locale];
  const locationIn = location.in[locale];
  const topicTitle = TOPIC_TITLE[topic][locale];
  const topicLower = TOPIC_LOWER[topic][locale];
  const intro = getTopicIntro(locale, topic, locationIn);

  return {
    ...base,
    metaTitle:
      locale === "en"
        ? `${topicTitle} ${locationIn} | TOMSTORE`
        : `${topicTitle} ${locationIn} | TOMSTORE`,
    metaDescription:
      locale === "en"
        ? `TOMSTORE ${topicLower} ${locationIn}: practical categories, clear prices and fast WhatsApp ordering.`
        : locale === "ky"
          ? `TOMSTORE дүкөнүндөгү ${topicLower} ${locationIn}: ыңгайлуу категориялар, актуалдуу баалар жана WhatsApp аркылуу тез заказ.`
          : `TOMSTORE дүкөнүндөгү ${topicLower} ${locationIn}: ыңгайлуу категориялар, актуалдуу баалар жана WhatsApp аркылуу тез заказ.`,
    eyebrow:
      locale === "en"
        ? `TOMSTORE ${topicTitle}`
        : locale === "ky"
          ? `TOMSTORE ${topicTitle}`
          : `TOMSTORE ${topicTitle}`,
    introTitle:
      locale === "ky" ? `${topicTitle} ${locationIn}` : `${topicTitle} ${locationIn}`,
    introDescription:
      topic === "computers"
        ? locale === "en"
          ? `If you are looking for ${topicLower} ${locationIn}, this page helps compare the available categories, narrow the selection and move to the right option faster.`
          : locale === "ky"
            ? `Эгер сизге ${topicLower} ${locationIn} керек болсо, бул барак жеткиликтүү категорияларды салыштырып, тандоону бат тарылтууга жардам берет.`
            : `Если вы ищете ${topicLower} ${locationIn}, эта страница помогает сравнить доступные категории, быстрее сузить выбор и перейти к подходящему варианту.`
        : locale === "en"
          ? `If you are looking for ${topicLower} ${locationIn}, this page helps compare the right product groups before opening the catalog.`
          : locale === "ky"
            ? `Эгер сизге ${topicLower} ${locationIn} керек болсо, бул барак каталогду ачардан мурда туура товар топторун салыштырууга жардам берет.`
            : `Если вы ищете ${topicLower} ${locationIn}, эта страница помогает сравнить нужные товарные группы еще до перехода в каталог.`,
    summaryTitle: intro.summaryTitle,
    summaryDescription: intro.summaryDescription,
    countLabel:
      locale === "en"
        ? topic === "computers"
          ? "Computer categories"
          : "Electronics categories"
        : locale === "ky"
          ? topic === "computers"
            ? "Компьютер категориялары"
            : "Электроника категориялары"
          : topic === "computers"
            ? "Категорий компьютеров"
            : "Категорий электроники",
    catalogLabel:
      locale === "en"
        ? topic === "computers"
          ? "Open computers"
          : "Open electronics"
        : locale === "ky"
          ? topic === "computers"
            ? "Компьютерлерди ачуу"
            : "Электрониканы ачуу"
          : topic === "computers"
            ? "Открыть компьютеры"
            : "Открыть электронику",
    contactLabel:
      locale === "en"
        ? "Talk to manager"
        : locale === "ky"
          ? "Менеджерге жазуу"
          : "Связаться с менеджером",
    cardLabel: locale === "en" ? "Category" : "Категория",
    itemCountLabel: locale === "en" ? "products" : locale === "ky" ? "товар" : "товаров",
    sectionTitle:
      topic === "computers"
        ? locale === "en"
          ? `Computers for home, study and office ${locationIn}`
          : locale === "ky"
            ? `${locationIn} үйгө, окууга жана офиске компьютерлер`
            : `Компьютеры для дома, учебы и офиса ${locationIn}`
        : locale === "en"
          ? `Electronics for home, study and office ${locationIn}`
          : locale === "ky"
            ? `${locationIn} үйгө, окууга жана офиске электроника`
            : `Электроника для дома, учебы и офиса ${locationIn}`,
    sectionDescription:
      topic === "computers"
        ? locale === "en"
          ? `Compare computer categories ${locationIn}, check stock and move to a quick WhatsApp order.`
          : locale === "ky"
            ? `Компьютер категорияларын ${locationIn} салыштырып, бар-жогун тактап, WhatsApp аркылуу тез заказ кылыңыз.`
            : `Сравните категории компьютеров ${locationIn}, проверьте наличие и переходите к быстрому заказу через WhatsApp.`
        : locale === "en"
          ? `Compare the right electronics categories ${locationIn}, check stock and move to a quick WhatsApp order.`
          : locale === "ky"
            ? `Туура электроника категорияларын ${locationIn} салыштырып, бар-жогун тактап, WhatsApp аркылуу тез заказ кылыңыз.`
            : `Сравните нужные категории электроники ${locationIn}, проверьте наличие и переходите к быстрому заказу через WhatsApp.`,
    highlights:
      topic === "computers"
        ? [
            locale === "en"
              ? `Computers for home, study and office in ${locationName}`
              : locale === "ky"
                ? `${locationName}да үйгө, окууга жана офиске компьютерлер`
                : `Компьютеры для дома, учебы и офиса в ${locationName}`,
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
              ? `Electronics for home, study and office in ${locationName}`
              : locale === "ky"
                ? `${locationName}да үйгө, окууга жана офиске электроника`
                : `Электроника для дома, учебы и офиса в ${locationName}`,
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
    guideTitle: intro.guideTitle,
    guideParagraphs: intro.guideParagraphs,
    faqs: buildFaqs(locale, topic, locationIn),
    keywords:
      locale === "en"
        ? [
            `${topicLower} ${locationName}`,
            `${topicLower} ${locationIn}`,
            `buy ${topicLower} in ${locationName}`,
            `${topicLower} Kyrgyzstan`,
            "TOMSTORE",
          ]
        : locale === "ky"
          ? [
              `${topicLower} ${locationName}`,
              `${topicLower} ${locationIn}`,
              `${topicLower} сатып алуу ${locationName}`,
              `${topicLower} Кыргызстан`,
              "TOMSTORE",
            ]
          : [
              `${topicLower} ${locationName}`,
              `${topicLower} ${locationIn}`,
              `купить ${topicLower} ${locationIn}`,
              `${topicLower} Кыргызстан`,
              "TOMSTORE",
            ],
  };
};

export const getComputersRegionalSeoContent = (
  locale: Locale,
  locationKey: RegionalLocationKey,
): CatalogHubSeoContent => buildTopicLocationContent(locale, "computers", locationKey);

export const getElectronicsRegionalSeoContent = (
  locale: Locale,
  locationKey: RegionalLocationKey,
): CatalogHubSeoContent => buildTopicLocationContent(locale, "electronics", locationKey);

export const getRegionalTopicBreadcrumbLabels = (
  locale: Locale,
  topic: TopicKey,
  locationKey: RegionalLocationKey,
) => {
  const location = getRegionalLocation(locationKey) ?? getRegionalLocation("bishkek")!;
  const topicTitle = TOPIC_TITLE[topic][locale];
  return {
    home: locale === "en" ? "Home" : locale === "ky" ? "Башкы бет" : "Главная",
    section: topicTitle,
    current: `${topicTitle} ${location.in[locale]}`,
  };
};

export const getRegionalTopicLinkLabel = (
  locale: Locale,
  topic: TopicKey,
  locationKey: RegionalLocationKey,
) => getRegionalTopicBreadcrumbLabels(locale, topic, locationKey).current;

export const getRegionalTopicStaticParams = () =>
  REGIONAL_LOCATION_ORDER.filter(
    (slug) => !STATIC_REGIONAL_LOCATION_KEYS.includes(slug),
  ).map((location) => ({ location }));
