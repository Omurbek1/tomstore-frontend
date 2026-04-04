import type { Locale } from "@/i18n/messages";
import type { CatalogHubSeoContent } from "./content";

export type RegionsHubSeoContent = CatalogHubSeoContent & {
  guideTitle: string;
  guideParagraphs: string[];
};

const REGIONS_HUB_CONTENT: Record<Locale, RegionsHubSeoContent> = {
  ru: {
    metaTitle: "Регионы Кыргызстана | региональные страницы TOMSTORE",
    metaDescription:
      "Смотрите региональные страницы TOMSTORE для Бишкека, Оша, Таласа и других городов и районов Кыргызстана и быстро переходите к электронике своего региона.",
    eyebrow: "Регионы TOMSTORE",
    introTitle: "Региональные страницы по всему Кыргызстану",
    introDescription:
      "Этот хаб собирает региональные страницы TOMSTORE в одном месте, чтобы посетители могли быстро открыть электронику для своего города или района без лишнего поиска по сайту.",
    countLabel: "Регионы",
    cardLabel: "Регион",
    itemCountLabel: "региональных страниц",
    sectionTitle: "Выберите регион и откройте электронику для него",
    sectionDescription:
      "Каждая региональная страница ведет к электронике этого города или района с категориями, наличием и заказом через WhatsApp.",
    catalogLabel: "Открыть электронику",
    contactLabel: "Контакты",
    highlights: [
      "Бишкек, Ош, Талас и другие регионы в одном месте",
      "Прямые ссылки на региональные страницы электроники",
      "Быстрый переход от города к подходящему каталогу",
      "Удобно для поиска по области, району и населенному пункту",
    ],
    guideTitle: "Как пользоваться региональным хабом",
    guideParagraphs: [
      "Сначала выберите свой город или район, затем откройте региональную страницу электроники. Так путь до нужной подборки становится короче и понятнее.",
      "Если нужен более точный выбор, дальше можно перейти в категории, сравнить модели и уточнить наличие с менеджером перед заказом.",
    ],
    faqs: [
      {
        question: "Что находится на странице регионов?",
        answer:
          "Это индекс региональных страниц TOMSTORE. Здесь собраны ссылки на города и районы Кыргызстана, чтобы быстрее перейти к нужной электронике.",
      },
      {
        question: "Подойдет ли хаб для поиска по Бишкеку, Ошу и Таласу?",
        answer:
          "Да. Эти регионы входят в хаб, а также в него добавлены другие города и районы Кыргызстана.",
      },
      {
        question: "Помогает ли эта страница SEO и навигации?",
        answer:
          "Да. Она объединяет региональные страницы в одном месте и делает структуру сайта понятнее для пользователей и поисковых систем.",
      },
    ],
    keywords: [
      "регионы Кыргызстана",
      "региональные страницы TOMSTORE",
      "электроника по регионам",
      "Бишкек Ош Талас",
    ],
  },
  en: {
    metaTitle: "Regions of Kyrgyzstan | TOMSTORE regional pages",
    metaDescription:
      "Browse TOMSTORE regional pages for Bishkek, Osh, Talas and other cities and districts in Kyrgyzstan, then continue to the electronics page for your region.",
    eyebrow: "TOMSTORE Regions",
    introTitle: "Regional pages across Kyrgyzstan",
    introDescription:
      "This hub collects TOMSTORE regional pages in one place so visitors can quickly jump from their city or district to the right electronics landing page.",
    countLabel: "Regions",
    cardLabel: "Region",
    itemCountLabel: "regional pages",
    sectionTitle: "Choose your region and open electronics for it",
    sectionDescription:
      "Each regional page connects you to the electronics landing page for that city or district, with categories, stock and WhatsApp ordering.",
    catalogLabel: "Open electronics",
    contactLabel: "Contacts",
    highlights: [
      "Bishkek, Osh, Talas and more in one place",
      "Direct links to regional electronics pages",
      "Faster route from city search to the right catalog",
      "Useful for location-based search intent",
    ],
    guideTitle: "How to use the regional hub",
    guideParagraphs: [
      "Pick your city or district first, then open the matching regional electronics page. That shortens the route to the right product set.",
      "If you need a narrower choice, you can continue into categories, compare models and confirm stock with a manager before ordering.",
    ],
    faqs: [
      {
        question: "What do I find on the regions page?",
        answer:
          "It is an index of TOMSTORE regional pages. It gathers links to cities and districts across Kyrgyzstan so you can reach the right electronics page faster.",
      },
      {
        question: "Is the hub useful for Bishkek, Osh and Talas?",
        answer:
          "Yes. Those regions are included, along with other major cities and districts in Kyrgyzstan.",
      },
      {
        question: "Does this page help with SEO and navigation?",
        answer:
          "Yes. It brings the regional pages together in one place and makes the site structure clearer for both visitors and search engines.",
      },
    ],
    keywords: [
      "Kyrgyzstan regions",
      "TOMSTORE regional pages",
      "electronics by region",
      "Bishkek Osh Talas",
    ],
  },
  ky: {
    metaTitle: "Кыргызстандын аймактары | TOMSTORE регионалдык барактары",
    metaDescription:
      "TOMSTORE дүкөнүнүн Бишкек, Ош, Талас жана Кыргызстандагы башка шаарлар менен райондор үчүн регионалдык барактарын көрүп, өзүңүздүн аймактагы электроникага тез өтүңүз.",
    eyebrow: "TOMSTORE Аймактар",
    introTitle: "Кыргызстан боюнча регионалдык барактар",
    introDescription:
      "Бул хаб TOMSTORE регионалдык барактарын бир жерге топтоп, шаар же райондон түз эле туура электроника барагына өтүүнү жеңилдетет.",
    countLabel: "Аймактар",
    cardLabel: "Аймак",
    itemCountLabel: "регионалдык барактар",
    sectionTitle: "Аймагыңызды тандап, электрониканы ачыңыз",
    sectionDescription:
      "Ар бир регионалдык барак ошол шаар же район үчүн электроника барагына, категорияларга, бар-жогун жана WhatsApp аркылуу заказга алып барат.",
    catalogLabel: "Электрониканы ачуу",
    contactLabel: "Байланыш",
    highlights: [
      "Бишкек, Ош, Талас жана башка аймактар бир жерде",
      "Регионалдык электроника барактарына түз шилтемелер",
      "Шаардан туура каталогго тез өтүү",
      "Облус, район жана калктуу конуш боюнча издегенге ыңгайлуу",
    ],
    guideTitle: "Регионалдык хабды кантип колдонсо болот",
    guideParagraphs: [
      "Адегенде шаарды же районду тандап, андан кийин тиешелүү регионалдык электроника барагын ачыңыз. Ошондо керектүү подборкага чейинки жол кыскарат.",
      "Эгер тандоо дагы так болушу керек болсо, категорияларга өтүп, моделдерди салыштырып, заказ алдында менеджерден бар-жогун тактасаңыз болот.",
    ],
    faqs: [
      {
        question: "Аймактар барагында эмнелер бар?",
        answer:
          "Бул TOMSTORE регионалдык барактарынын индекси. Кыргызстандагы шаарлар менен райондордун шилтемелери бир жерге чогултулган.",
      },
      {
        question: "Бул хаб Бишкек, Ош жана Талас үчүн пайдалуубу?",
        answer:
          "Ооба. Бул аймактар хабга кирет жана башка маанилүү шаарлар менен райондор да кошулган.",
      },
      {
        question: "Бул барак SEO жана навигацияга жардам береби?",
        answer:
          "Ооба. Ал регионалдык барактарды бир жерге топтоп, сайттын түзүмүн колдонуучуга да, издөө системасына да түшүнүктүүрөөк кылат.",
      },
    ],
    keywords: [
      "Кыргызстандын аймактары",
      "TOMSTORE регионалдык барактар",
      "аймак боюнча электроника",
      "Бишкек Ош Талас",
    ],
  },
};

export const getRegionsHubSeoContent = (
  locale: Locale,
): RegionsHubSeoContent => REGIONS_HUB_CONTENT[locale] || REGIONS_HUB_CONTENT.ru;
