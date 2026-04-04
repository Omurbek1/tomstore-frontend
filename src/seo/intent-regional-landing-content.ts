import type { Locale } from "@/i18n/messages";
import type { CatalogLandingSeoContent } from "./content";
import {
  getOfficePrinterSeoContent,
  getStudentLaptopSeoContent,
  getTeacherLaptopSeoContent,
} from "./intent-landing-content";
import {
  getRegionalLocation,
  REGIONAL_LOCATION_ORDER,
  STATIC_REGIONAL_LOCATION_KEYS,
  type RegionalLocationKey,
} from "./location-data";

export type RegionalLandingKey = "students" | "teachers" | "office";

const LANDING_LABELS = {
  students: {
    ru: "Ноутбук для студентов",
    en: "Student laptops",
    ky: "студенттер үчүн ноутбук",
  },
  teachers: {
    ru: "Ноутбук для учителей",
    en: "Teacher laptops",
    ky: "мугалимдер үчүн ноутбук",
  },
  office: {
    ru: "Офисный принтер",
    en: "Office printer",
    ky: "офис принтери",
  },
} satisfies Record<
  RegionalLandingKey,
  { ru: string; en: string; ky: string }
>;

const SECTION_LABELS = {
  students: {
    ru: "Ноутбуки",
    en: "Laptops",
    ky: "Ноутбуктар",
  },
  teachers: {
    ru: "Ноутбуки",
    en: "Laptops",
    ky: "Ноутбуктар",
  },
  office: {
    ru: "Принтеры",
    en: "Printers",
    ky: "Принтерлер",
  },
} satisfies Record<
  RegionalLandingKey,
  { ru: string; en: string; ky: string }
>;

const BASE_CONTENT = {
  students: getStudentLaptopSeoContent,
  teachers: getTeacherLaptopSeoContent,
  office: getOfficePrinterSeoContent,
} satisfies Record<RegionalLandingKey, (locale: Locale) => CatalogLandingSeoContent>;

const HOME_LABEL = {
  ru: "Главная",
  en: "Home",
  ky: "Башкы бет",
} satisfies Record<Locale, string>;

const getRegionalLocationOrFallback = (locationKey: RegionalLocationKey) =>
  getRegionalLocation(locationKey) ?? getRegionalLocation("bishkek")!;

const getCurrentLabel = (
  locale: Locale,
  kind: RegionalLandingKey,
  locationKey: RegionalLocationKey,
) => {
  const location = getRegionalLocationOrFallback(locationKey);
  const label = LANDING_LABELS[kind][locale];

  switch (locale) {
    case "en":
      return `${label} ${location.in[locale]}`;
    case "ky":
      return `${location.in[locale]} ${label}`;
    case "ru":
    default:
      return `${label} ${location.in[locale]}`;
  }
};

const buildStudentLaptopContent = (
  locale: Locale,
  locationKey: RegionalLocationKey,
): CatalogLandingSeoContent => {
  const base = BASE_CONTENT.students(locale);
  const location = getRegionalLocationOrFallback(locationKey);
  const locationName = location.name[locale];
  const locationIn = location.in[locale];

  switch (locale) {
    case "en":
      return {
        ...base,
        metaTitle: `Student laptops in ${locationName} | TOMSTORE`,
        metaDescription:
          `Laptops for students in ${locationName}: light models for study, online classes and document work, with fast WhatsApp ordering and manager support.`,
        introTitle: `Student laptops in ${locationName}`,
        introDescription:
          `If you are looking for a student laptop in ${locationName}, this page helps narrow the choice by weight, battery life, SSD storage and memory. It is a practical starting point for study, online classes and everyday work.`,
        summaryTitle: `How to choose a student laptop in ${locationName}`,
        summaryDescription:
          "Focus on weight, battery life, SSD storage and 8-16 GB RAM first. For study and documents, lighter laptops that are easy to carry every day are usually the best fit.",
        highlights: [
          `Student laptops in ${locationName}`,
          "Light models for study and documents",
          "Fast access to categories and catalog pages",
          "Manager support for stock and selection",
        ],
        guideTitle: `What matters before buying in ${locationName}`,
        guideParagraphs: [
          `For students in ${locationName}, SSD storage, 8-16 GB RAM, good battery life and a comfortable display matter most. If the laptop is mainly for online classes and documents, there is no need to overspend on extra power.`,
          "If you want a more universal option for study and city life, choose a model with a comfortable keyboard and a bit more memory. Before ordering, you can quickly confirm the price and stock with TOMSTORE.",
        ],
        faqs: [
          {
            question: `Which laptop is best for a student in ${locationName}?`,
            answer:
              "A light laptop with SSD storage, 8-16 GB RAM and good battery life is usually the best fit for study, video calls and document work.",
          },
          {
            question: `Is this page useful for school and college students in ${locationName}?`,
            answer:
              "Yes. It is a practical starting point for school, college and university students who need an everyday laptop.",
          },
          {
            question: `Can I order a laptop through WhatsApp in ${locationName}?`,
            answer: `Yes. You can confirm stock, price and configuration with a manager and place the order from ${locationName} or any other region of Kyrgyzstan.`,
          },
        ],
        keywords: [
          `student laptop ${locationName}`,
          `student laptops in ${locationName}`,
          `laptop for study ${locationName}`,
          `buy laptop in ${locationName}`,
          `${locationName} laptops`,
        ],
      };
    case "ky":
      return {
        ...base,
        metaTitle: `${locationIn} студенттер үчүн ноутбук | TOMSTORE`,
        metaDescription:
          `${locationIn} студенттер үчүн ноутбуктар: окуу, онлайн сабак жана документ менен иштөө үчүн жеңил моделдер, WhatsApp аркылуу тез заказ жана менеджердин жардамы.`,
        introTitle: `${locationIn} студенттер үчүн ноутбук`,
        introDescription:
          `Эгер ${locationIn} студенттер үчүн ноутбук издеп жатсаңыз, бул барак салмак, батарея, SSD жана эс тутум боюнча тандоону тез тарылтууга жардам берет. Окуу, онлайн сабак жана күнүмдүк иш үчүн ыңгайлуу баштапкы чекит.`,
        summaryTitle: `${locationIn} студенттер үчүн ноутбук кантип тандалат`,
        summaryDescription:
          "Алгач салмакка, батареяга, SSDге жана 8-16 ГБ эс тутумга көңүл буруңуз. Окуу жана документ үчүн жеңил, күн сайын көтөрүп жүрүүгө ыңгайлуу моделдер жакшыраак.",
        highlights: [
          `${locationIn} студенттер үчүн ноутбуктар`,
          "Окуу жана документ үчүн жеңил моделдер",
          "Категорияларга жана каталогго тез өтүү",
          "Бар-жогу жана тандоо боюнча менеджердин жардамы",
        ],
        guideTitle: `${locationIn} сатып алардан мурда эмнени караш керек`,
        guideParagraphs: [
          `${locationIn} студент үчүн SSD, 8-16 ГБ эс тутум, жакшы батарея жана ыңгайлуу экран маанилүү. Эгер ноутбук негизинен онлайн сабак жана документтер үчүн керек болсо, ашыкча кубаттуулук үчүн төлөөнүн кереги жок.`,
          "Эгер окуу менен шаар ичинде жүрүүгө да ылайыктуу универсалдуу вариант керек болсо, ыңгайлуу клавиатурасы жана бир аз көбүрөөк эс тутуму бар моделди тандаңыз. Заказдан мурда TOMSTORE менен баасын жана бар-жогун тактаса болот.",
        ],
        faqs: [
          {
            question: `${locationIn} студент үчүн кайсы ноутбук жакшы?`,
            answer:
              "SSD, 8-16 ГБ эс тутум жана жакшы батареясы бар жеңил ноутбук көбүнчө окуу, видеосүйлөшүү жана документ менен иштөө үчүн эң туура келет.",
          },
          {
            question: `Бул барак мектеп же колледж үчүн да ылайыктуубу?`,
            answer:
              "Ооба. Бул жерден мектеп, колледж жана университет үчүн күнүмдүк колдонууга ыңгайлуу ноутбук тандаса болот.",
          },
          {
            question: `WhatsApp аркылуу ${locationIn} заказ кылса болобу?`,
            answer: `Ооба. Менеджер менен бар-жогун, баасын жана комплектациясын тактап, ${locationIn} же Кыргызстандагы башка аймактардан заказ берсе болот.`,
          },
        ],
        keywords: [
          `${locationIn} студенттер үчүн ноутбук`,
          `${locationIn} окууга ноутбук`,
          `студенттер үчүн ноутбук Кыргызстан`,
          `ноутбук сатып алуу Кыргызстанда`,
          `ноутбуктар Кыргызстан`,
        ],
      };
    case "ru":
    default:
      return {
        ...base,
        metaTitle: `Ноутбук для студентов в ${locationIn} | TOMSTORE`,
        metaDescription:
          `Ноутбуки для студентов в ${locationIn}: легкие модели для учебы, онлайн-занятий и работы с документами, быстрый заказ через WhatsApp и помощь менеджера.`,
        introTitle: `Ноутбук для студентов в ${locationIn}`,
        introDescription:
          `Если вы ищете ноутбук для студентов в ${locationIn}, эта страница помогает быстро сузить выбор по весу, автономности, SSD и памяти. Здесь удобно подобрать модель для учебы, онлайн-пар и повседневной работы.`,
        summaryTitle: `Как выбрать ноутбук для студентов в ${locationIn}`,
        summaryDescription:
          "Сначала смотрите на вес, батарею, SSD и 8-16 ГБ памяти. Для учебы и документов обычно лучше легкие модели, которые удобно носить с собой и использовать каждый день.",
        highlights: [
          `Ноутбуки для студентов в ${locationIn}`,
          "Легкие модели для учебы и документов",
          "Быстрый переход к категориям и каталогу",
          "Помощь менеджера с наличием и подбором",
        ],
        guideTitle: `Что важно перед покупкой в ${locationIn}`,
        guideParagraphs: [
          `Для студента в ${locationIn} важны SSD, 8-16 ГБ памяти, автономность и удобный экран. Если ноутбук нужен для онлайн-занятий и рефератов, не стоит переплачивать за лишнюю производительность.`,
          "Если нужен более универсальный вариант для учебы и поездок по городу, смотрите на модели с хорошей клавиатурой и запасом по памяти. Перед заказом можно быстро уточнить цену и наличие у менеджера TOMSTORE.",
        ],
        faqs: [
          {
            question: `Какой ноутбук лучше студенту в ${locationIn}?`,
            answer:
              "Обычно подходит легкий ноутбук с SSD, 8-16 ГБ памяти и нормальной автономностью. Такой вариант удобен для учебы, видеосвязи и работы с документами.",
          },
          {
            question: `Подойдет ли эта страница для школьников и колледжа в ${locationIn}?`,
            answer:
              "Да. Здесь удобно подобрать ноутбук для учебы в школе, колледже или университете, если нужен практичный и недорогой вариант.",
          },
          {
            question: `Можно ли заказать ноутбук по ${locationIn} через WhatsApp?`,
            answer:
              "Да. Можно быстро уточнить наличие, цену и комплектацию и оформить заказ через менеджера в ${locationIn} и по всему Кыргызстану.",
          },
        ],
        keywords: [
          `ноутбук для студентов ${locationName}`,
          `ноутбук для студентов в ${locationName}`,
          `ноутбук для учебы ${locationName}`,
          `купить ноутбук ${locationIn}`,
          `${locationName} ноутбуки`,
        ],
      };
  }
};

const buildTeacherLaptopContent = (
  locale: Locale,
  locationKey: RegionalLocationKey,
): CatalogLandingSeoContent => {
  const base = BASE_CONTENT.teachers(locale);
  const location = getRegionalLocationOrFallback(locationKey);
  const locationName = location.name[locale];
  const locationIn = location.in[locale];

  switch (locale) {
    case "en":
      return {
        ...base,
        metaTitle: `Teacher laptops in ${locationName} | TOMSTORE`,
        metaDescription:
          `Laptops for teachers in ${locationName}: practical models for lessons, presentations and online classes, with fast WhatsApp ordering and manager support.`,
        introTitle: `Teacher laptops in ${locationName}`,
        introDescription:
          `If you need a teacher laptop in ${locationName}, this page helps compare models for lessons, presentations and document work. It is a practical starting point for a quick decision.`,
        summaryTitle: `What teachers in ${locationName} should look for`,
        summaryDescription:
          "For lessons and presentations, comfort, battery life, a good display and stable performance in browsers, presentation apps and video platforms matter most.",
        highlights: [
          `Teacher laptops in ${locationName}`,
          "Practical models for lessons and presentations",
          "Fast access to categories and catalog pages",
          "Manager support for stock and selection",
        ],
        guideTitle: `What configuration a teacher in ${locationName} needs`,
        guideParagraphs: [
          `For everyday work in ${locationName}, a laptop with SSD storage, good battery life and 8-16 GB RAM is usually enough. It should handle documents, presentations and online platforms without issues.`,
          "If lessons use more tabs, video and course materials, a model with more memory and a more comfortable display is a safer choice.",
        ],
        faqs: [
          {
            question: `Does a teacher in ${locationName} need a powerful laptop?`,
            answer:
              "Usually not. For lessons, presentations and documents, reliability, battery life and comfort matter more than extra raw power.",
          },
          {
            question: `Is this page useful for schools and training centers in ${locationName}?`,
            answer: `Yes. It helps when choosing laptops for teachers, online classes and educational work in ${locationName}.`,
          },
          {
            question: `Can I order through WhatsApp in ${locationName}?`,
            answer: `Yes. You can confirm price, stock and configuration with a manager and place the order from ${locationName} or any other region of Kyrgyzstan.`,
          },
        ],
        keywords: [
          `teacher laptop ${locationName}`,
          `teacher laptops in ${locationName}`,
          `school laptop ${locationName}`,
          `buy laptop in ${locationName}`,
          `${locationName} laptops`,
        ],
      };
    case "ky":
      return {
        ...base,
        metaTitle: `${locationIn} мугалимдер үчүн ноутбук | TOMSTORE`,
        metaDescription:
          `${locationIn} мугалимдер үчүн ноутбуктар: сабак, презентация жана онлайн сабак үчүн практикалык моделдер, WhatsApp аркылуу тез заказ жана менеджердин жардамы.`,
        introTitle: `${locationIn} мугалимдер үчүн ноутбук`,
        introDescription:
          `Эгер ${locationIn} мугалимдер үчүн ноутбук керек болсо, бул барак сабак, презентация жана документ менен иштөө үчүн моделдерди тез салыштырууга жардам берет. Тандоону жөнөкөйлөтүү үчүн практикалык баштапкы чекит.`,
        summaryTitle: `${locationIn} мугалимдер үчүн ноутбукта эмнени караш керек`,
        summaryDescription:
          "Сабак жана презентация үчүн ыңгайлуулук, батарея, жакшы экран жана браузер, видео менен туруктуу иштөө маанилүү.",
        highlights: [
          `${locationIn} мугалимдер үчүн ноутбуктар`,
          "Сабак жана презентация үчүн практикалык моделдер",
          "Категорияларга жана каталогго тез өтүү",
          "Бар-жогу жана тандоо боюнча менеджердин жардамы",
        ],
        guideTitle: `${locationIn} мугалимге кандай конфигурация керек`,
        guideParagraphs: [
          `Күнүмдүк иш үчүн ${locationIn} SSD, жакшы батарея жана 8-16 ГБ эс тутуму бар ноутбук жетиштүү. Ал документ, презентация жана онлайн платформалар менен көйгөйсүз иштеши керек.`,
          "Эгер сабакта көп өтмөк, видео жана окуу материалдары колдонулса, эс тутуму көбүрөөк жана экраны ыңгайлуу модель жакшыраак.",
        ],
        faqs: [
          {
            question: `${locationIn} мугалимге күчтүү ноутбук керекпи?`,
            answer:
              "Адатта жок. Сабак, презентация жана документтер үчүн ашыкча кубаттан көрө ишенимдүүлүк, батарея жана ыңгайлуулук маанилүүрөөк.",
          },
          {
            question: `Бул барак мектептер жана окуу борборлору үчүн ылайыктуубу?`,
            answer:
              "Ооба. Мугалимдер, онлайн сабактар жана билим берүү иши үчүн ноутбук тандаганда бул барак пайдалуу болот.",
          },
          {
            question: `WhatsApp аркылуу заказ кылса болобу ${locationIn}?`,
            answer:
              "Ооба. Баасын, бар-жогун жана комплектациясын менеджер менен тактап, Кыргызстан боюнча заказ берсе болот.",
          },
        ],
        keywords: [
          `мугалим үчүн ноутбук ${locationIn}`,
          `окутуучу үчүн ноутбук ${locationIn}`,
          `мектеп үчүн ноутбук ${locationIn}`,
          `онлайн сабак үчүн ноутбук`,
          `ноутбук сатып алуу Кыргызстанда`,
        ],
      };
    case "ru":
    default:
      return {
        ...base,
        metaTitle: `Ноутбук для учителей в ${locationIn} | TOMSTORE`,
        metaDescription:
          `Ноутбуки для учителей в ${locationIn}: удобные модели для уроков, презентаций и онлайн-занятий, быстрый заказ через WhatsApp и помощь менеджера.`,
        introTitle: `Ноутбук для учителей в ${locationIn}`,
        introDescription:
          `Если нужен ноутбук для учителя в ${locationIn}, здесь можно быстро сравнить модели для уроков, презентаций и работы с документами. Страница помогает выбрать практичный вариант без лишнего поиска.`,
        summaryTitle: `Что важно учителю в ${locationIn} при выборе ноутбука`,
        summaryDescription:
          "Для уроков и презентаций важны удобство, автономность, хороший экран и стабильная работа с браузером, видео и презентациями.",
        highlights: [
          `Ноутбуки для учителей в ${locationIn}`,
          "Практичные модели для уроков и презентаций",
          "Быстрый переход к категориям и каталогу",
          "Помощь менеджера с наличием и подбором",
        ],
        guideTitle: `Какая конфигурация нужна учителю в ${locationIn}`,
        guideParagraphs: [
          `Для повседневной работы учителю в ${locationIn} достаточно ноутбука с SSD, хорошей батареей и 8-16 ГБ памяти. Он должен без проблем открывать документы, презентации и онлайн-платформы.`,
          "Если планируются уроки с большим количеством вкладок, видео и учебных материалов, лучше взять модель с запасом по памяти и более комфортным экраном.",
        ],
        faqs: [
          {
            question: `Нужен ли учителю в ${locationIn} мощный ноутбук?`,
            answer:
              "Обычно нет. Для уроков, презентаций и документов важнее надежность, автономность и комфорт, чем избыточная мощность.",
          },
          {
            question: `Подходит ли эта страница для школ и учебных центров ${locationIn}?`,
            answer: `Да. Она полезна, когда нужно выбрать ноутбук для преподавателей, онлайн-уроков и рабочих задач учебного заведения в ${locationIn}.`,
          },
          {
            question: `Можно ли заказать через WhatsApp в ${locationIn}?`,
            answer: `Да. Вы можете уточнить цену, наличие и комплектацию через менеджера и оформить заказ в ${locationIn} и по всему Кыргызстану.`,
          },
        ],
        keywords: [
          `ноутбук для учителей ${locationName}`,
          `ноутбук для преподавателей ${locationName}`,
          `ноутбук для школы ${locationName}`,
          `купить ноутбук ${locationIn}`,
          `${locationName} ноутбуки`,
        ],
      };
  }
};

const buildOfficePrinterContent = (
  locale: Locale,
  locationKey: RegionalLocationKey,
): CatalogLandingSeoContent => {
  const base = BASE_CONTENT.office(locale);
  const location = getRegionalLocationOrFallback(locationKey);
  const locationName = location.name[locale];
  const locationIn = location.in[locale];

  switch (locale) {
    case "en":
      return {
        ...base,
        metaTitle: `Office printer in ${locationName} | TOMSTORE`,
        metaDescription:
          `Office printers in ${locationName}: laser, inkjet and MFP models for school, company and home use, with fast WhatsApp ordering and manager support.`,
        introTitle: `Office printer in ${locationName}`,
        introDescription:
          `If you need an office printer in ${locationName}, this page helps you quickly compare models for documents, reports and study materials. It is a practical starting point for a fast decision.`,
        summaryTitle: `How to choose an office printer in ${locationName}`,
        summaryDescription:
          "Focus on print volume, speed, consumables and maintenance. For school and office use, laser printers or MFPs are usually the best fit.",
        highlights: [
          `Office printers in ${locationName}`,
          "Laser printers and multifunction devices",
          "Fast access to categories and catalog pages",
          "Manager support for consumables and stock",
        ],
        guideTitle: `What matters for office printing in ${locationName}`,
        guideParagraphs: [
          `If the printer in ${locationName} will be used for regular document printing, a laser model with simple maintenance and available consumables is usually the safest choice.`,
          "For a school or small office, an MFP is also a good option when scanning and copying are needed. You can confirm price and stock through WhatsApp before ordering.",
        ],
        faqs: [
          {
            question: `Which printer is best for an office in ${locationName}?`,
            answer:
              "For office use, a laser printer or multifunction device is usually the best option because it handles regular document printing and is easier to maintain.",
          },
          {
            question: `Is this page useful for schools in ${locationName} too?`,
            answer:
              "Yes. Schools need reliability, speed and easy maintenance, and office printers and MFPs are a strong fit for those tasks.",
          },
          {
            question: `Can I order a printer through WhatsApp in ${locationName}?`,
            answer: `Yes. You can confirm price, stock and cartridges with a manager and place the order from ${locationName} or any other region of Kyrgyzstan.`,
          },
        ],
        keywords: [
          `office printer ${locationName}`,
          `printer for office ${locationName}`,
          `printer for school ${locationName}`,
          `buy printer in ${locationName}`,
          `${locationName} printers`,
        ],
      };
    case "ky":
      return {
        ...base,
        metaTitle: `${locationIn} офис принтери | TOMSTORE`,
        metaDescription:
          `${locationIn} офис принтерлери: мектеп, компания жана үй үчүн лазердик, сыя жана МФУ моделдер, WhatsApp аркылуу тез заказ жана менеджердин жардамы.`,
        introTitle: `${locationIn} офис принтери`,
        introDescription:
          `Эгер ${locationIn} офис принтери керек болсо, бул барак документ, отчет жана окуу материалдары үчүн моделдерди тез салыштырууга жардам берет. Ыкчам тандоо үчүн практикалык баштапкы чекит.`,
        summaryTitle: `${locationIn} офис принтерин кантип тандоо керек`,
        summaryDescription:
          "Басма көлөмүнө, ылдамдыкка, чыгымдалуучу материалга жана тейлөөгө көңүл буруңуз. Мектеп жана офис үчүн көбүнчө лазердик принтер же МФУ жакшы болот.",
        highlights: [
          `${locationIn} офис принтерлери`,
          "Лазердик принтерлер жана МФУ",
          "Категорияларга жана каталогго тез өтүү",
          "Чыгымдалуучу материал жана бар-жогу боюнча жардам",
        ],
        guideTitle: `${locationIn} офис басмасы үчүн эмнени караш керек`,
        guideParagraphs: [
          `Эгер ${locationIn} принтер дайыма документ чыгарууга колдонулса, тейлөөсү жеңил жана чыгымдалуучу материалдары жеткиликтүү лазердик модель жакшы чечим болот.`,
          "Мектеп же чакан офис үчүн сканерлөө жана көчүрүү керек болсо, МФУ да ылайыктуу. Заказдан мурда WhatsApp аркылуу баасын жана бар-жогун тактап алса болот.",
        ],
        faqs: [
          {
            question: `${locationIn} офис үчүн кайсы принтер жакшы?`,
            answer:
              "Офистик колдонууга көбүнчө лазердик принтер же МФУ жакшы келет, анткени алар документти көп басууга ыңгайлуу жана тейлөөсү жеңил.",
          },
          {
            question: `Бул барак мектептер үчүн да пайдалуубу?`,
            answer:
              "Ооба. Мектеп үчүн ишенимдүүлүк, ылдамдык жана тейлөө жеңилдиги маанилүү, ал эми офис моделдери жана МФУ ошол талаптарга жакшы жооп берет.",
          },
          {
            question: `WhatsApp аркылуу заказ кылса болобу ${locationIn}?`,
            answer:
              "Ооба. Менеджер менен баасын, бар-жогун жана картридждерин тактап, Кыргызстан боюнча заказ кылса болот.",
          },
        ],
        keywords: [
          `офис принтери ${locationIn}`,
          `${locationIn} офис принтери`,
          `${locationIn} принтер сатып алуу`,
          `офиске принтер Кыргызстанда`,
          `принтерлер Кыргызстан`,
        ],
      };
    case "ru":
    default:
      return {
        ...base,
        metaTitle: `Офисный принтер в ${locationIn} | TOMSTORE`,
        metaDescription:
          `Офисные принтеры в ${locationIn}: лазерные, струйные и МФУ для школы, компании и дома, быстрый заказ через WhatsApp и помощь менеджера.`,
        introTitle: `Офисный принтер в ${locationIn}`,
        introDescription:
          `Если нужен офисный принтер в ${locationIn}, здесь можно быстро выбрать модель для документов, отчетов и учебных материалов. Страница помогает сравнить практичные варианты без лишнего поиска.`,
        summaryTitle: `Как выбрать офисный принтер в ${locationIn}`,
        summaryDescription:
          "Смотрите на объем печати, скорость, расходники и обслуживание. Для школы и офиса чаще всего удобнее лазерные модели или МФУ.",
        highlights: [
          `Офисные принтеры в ${locationIn}`,
          "Лазерные принтеры и МФУ",
          "Быстрый переход к категориям и каталогу",
          "Помощь менеджера с расходниками и наличием",
        ],
        guideTitle: `Что важно для офисной печати в ${locationIn}`,
        guideParagraphs: [
          `Если принтер в ${locationIn} нужен для регулярной печати документов, лучше выбирать лазерную модель с понятным обслуживанием и доступными расходниками.`,
          "Для школы или небольшого офиса также подойдет МФУ, если кроме печати нужны сканирование и копирование. Перед заказом можно уточнить стоимость и наличие через WhatsApp.",
        ],
        faqs: [
          {
            question: `Какой принтер лучше для офиса в ${locationIn}?`,
            answer:
              "Чаще всего для офиса берут лазерный принтер или МФУ, потому что они лучше подходят для регулярной печати документов и проще в обслуживании.",
          },
          {
            question: `Подойдет ли эта страница для школы в ${locationIn}?`,
            answer:
              "Да. Для школы особенно важны надежность, скорость и удобство обслуживания, а эти параметры есть у офисных моделей и МФУ.",
          },
          {
            question: `Можно ли заказать принтер через WhatsApp в ${locationIn}?`,
            answer:
              "Да. Можно уточнить цену, наличие, картриджи и быстро оформить заказ в ${locationIn} и по всему Кыргызстану.",
          },
        ],
        keywords: [
          `офисный принтер ${locationName}`,
          `принтер для офиса ${locationName}`,
          `принтер для школы ${locationName}`,
          `купить принтер ${locationIn}`,
          `${locationName} принтеры`,
        ],
      };
  }
};

export const getStudentLaptopRegionalSeoContent = (
  locale: Locale,
  locationKey: RegionalLocationKey,
): CatalogLandingSeoContent => buildStudentLaptopContent(locale, locationKey);

export const getTeacherLaptopRegionalSeoContent = (
  locale: Locale,
  locationKey: RegionalLocationKey,
): CatalogLandingSeoContent => buildTeacherLaptopContent(locale, locationKey);

export const getOfficePrinterRegionalSeoContent = (
  locale: Locale,
  locationKey: RegionalLocationKey,
): CatalogLandingSeoContent => buildOfficePrinterContent(locale, locationKey);

export const getRegionalLandingLinkLabel = (
  locale: Locale,
  kind: RegionalLandingKey,
  locationKey: RegionalLocationKey,
) => getCurrentLabel(locale, kind, locationKey);

export const getRegionalLandingBreadcrumbLabels = (
  locale: Locale,
  kind: RegionalLandingKey,
  locationKey: RegionalLocationKey,
) => ({
  home: HOME_LABEL[locale],
  section: SECTION_LABELS[kind][locale],
  current: getCurrentLabel(locale, kind, locationKey),
});

export const getRegionalLandingStaticParams = () =>
  REGIONAL_LOCATION_ORDER.filter(
    (location) => !STATIC_REGIONAL_LOCATION_KEYS.includes(location),
  ).map((location) => ({ location }));
