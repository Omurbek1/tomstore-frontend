import type { Locale } from "@/i18n/messages";
import type {
  CatalogHubSeoContent,
  CatalogLandingSeoContent,
} from "./content";
import {
  getOfficePrinterSeoContent,
  getStudentLaptopSeoContent,
  getTeacherLaptopSeoContent,
} from "./intent-landing-content";

type HubOverrides = Partial<CatalogLandingSeoContent> &
  Pick<
    CatalogHubSeoContent,
    "cardLabel" | "itemCountLabel" | "sectionTitle" | "sectionDescription"
  >;

const mergeCityHubContent = (
  base: CatalogLandingSeoContent,
  overrides: HubOverrides,
): CatalogHubSeoContent => ({
  ...base,
  ...overrides,
});

const STUDENT_LAPTOP_BISHKEK_OVERRIDES: Record<Locale, HubOverrides> = {
  ru: {
    metaTitle: "Ноутбук для студентов в Бишкеке | TOMSTORE",
    metaDescription:
      "Ноутбуки для студентов в Бишкеке: легкие модели для учебы, онлайн-занятий и работы с документами, быстрый заказ через WhatsApp и помощь менеджера.",
    eyebrow: "TOMSTORE Ноутбуки",
    introTitle: "Ноутбук для студентов в Бишкеке",
    introDescription:
      "Если вы ищете ноутбук для студентов в Бишкеке, эта страница помогает быстро сузить выбор по весу, автономности, SSD и памяти. Здесь удобно подобрать модель для учебы, онлайн-пар и повседневной работы.",
    summaryTitle: "Как выбрать ноутбук для студентов в Бишкеке",
    summaryDescription:
      "Сначала смотрите на вес, батарею, SSD и 8-16 ГБ памяти. Для учебы и документов обычно лучше легкие модели, которые удобно носить каждый день.",
    countLabel: "Подборок для студентов",
    cardLabel: "Категория",
    itemCountLabel: "товаров",
    sectionTitle: "Ноутбуки для студентов в Бишкеке",
    sectionDescription:
      "Смотрите категории ноутбуков, которые подходят для учебы, онлайн-занятий и повседневной работы в Бишкеке, а затем быстро переходите к заказу.",
    catalogLabel: "Открыть ноутбуки",
    contactLabel: "Связаться с менеджером",
    highlights: [
      "Ноутбуки для студентов в Бишкеке",
      "Легкие модели для учебы и документов",
      "Быстрый переход к категориям и каталогу",
      "Помощь менеджера с наличием и подбором",
    ],
    guideTitle: "Что важно перед покупкой в Бишкеке",
    guideParagraphs: [
      "Для студента в Бишкеке важны SSD, 8-16 ГБ памяти, автономность и удобный экран. Если ноутбук нужен для онлайн-занятий и рефератов, не стоит переплачивать за лишнюю мощность.",
      "Если нужен более универсальный вариант для учебы и поездок по городу, смотрите на модели с хорошей клавиатурой и запасом по памяти. Перед заказом можно быстро уточнить цену и наличие у менеджера TOMSTORE.",
    ],
    faqs: [
      {
        question: "Какой ноутбук лучше студенту в Бишкеке?",
        answer:
          "Обычно подходит легкий ноутбук с SSD, 8-16 ГБ памяти и нормальной автономностью. Такой вариант удобен для учебы, видеосвязи и работы с документами.",
      },
      {
        question: "Подойдет ли эта страница для школьников и колледжа?",
        answer:
          "Да. Здесь удобно подобрать ноутбук для учебы в школе, колледже или университете, если нужен практичный и недорогой вариант.",
      },
      {
        question: "Можно ли заказать ноутбук по Бишкеку через WhatsApp?",
        answer:
          "Да. Можно быстро уточнить наличие, цену и комплектацию и оформить заказ через менеджера в Бишкеке и по всему Кыргызстану.",
      },
    ],
    keywords: [
      "ноутбук для студентов Бишкек",
      "ноутбук для студентов в Бишкеке",
      "ноутбук для учебы Бишкек",
      "купить ноутбук в Бишкеке",
      "ноутбуки Бишкек",
    ],
  },
  en: {
    metaTitle: "Student laptops in Bishkek | TOMSTORE",
    metaDescription:
      "Laptops for students in Bishkek: light models for study, online classes and document work, with fast WhatsApp ordering and manager support.",
    eyebrow: "TOMSTORE Laptops",
    introTitle: "Student laptops in Bishkek",
    introDescription:
      "If you are looking for a student laptop in Bishkek, this page helps narrow the choice by weight, battery life, SSD storage and memory. It is a practical starting point for study, online classes and everyday work.",
    summaryTitle: "How to choose a student laptop in Bishkek",
    summaryDescription:
      "Focus on weight, battery life, SSD storage and 8-16 GB RAM first. For study and documents, lighter laptops that are easy to carry every day are usually the best fit.",
    countLabel: "Student laptop picks",
    cardLabel: "Category",
    itemCountLabel: "products",
    sectionTitle: "Student laptops in Bishkek",
    sectionDescription:
      "Browse laptop categories that fit study, online classes and daily work in Bishkek, then continue to a quick order through WhatsApp.",
    catalogLabel: "Open laptops",
    contactLabel: "Talk to manager",
    highlights: [
      "Student laptops in Bishkek",
      "Light models for study and documents",
      "Fast access to categories and catalog pages",
      "Manager support for stock and selection",
    ],
    guideTitle: "What matters before buying in Bishkek",
    guideParagraphs: [
      "For students in Bishkek, SSD storage, 8-16 GB RAM, good battery life and a comfortable display matter most. If the laptop is mainly for online classes and documents, there is no need to overspend on extra power.",
      "If you want a more universal option for study and city life, choose a model with a comfortable keyboard and a bit more memory. Before ordering, you can quickly confirm the price and stock with TOMSTORE.",
    ],
    faqs: [
      {
        question: "Which laptop is best for a student in Bishkek?",
        answer:
          "A light laptop with SSD storage, 8-16 GB RAM and good battery life is usually the best fit for study, video calls and document work.",
      },
      {
        question: "Is this page useful for school and college students?",
        answer:
          "Yes. It is a practical starting point for school, college and university students who need an everyday laptop.",
      },
      {
        question: "Can I order a laptop through WhatsApp in Bishkek?",
        answer:
          "Yes. You can confirm stock, price and configuration with a manager and place the order from Bishkek or any other region of Kyrgyzstan.",
      },
    ],
    keywords: [
      "student laptop Bishkek",
      "student laptops in Bishkek",
      "laptop for study Bishkek",
      "buy laptop in Bishkek",
      "Bishkek laptops",
    ],
  },
  ky: {
    metaTitle: "Бишкекте студенттер үчүн ноутбук | TOMSTORE",
    metaDescription:
      "Бишкекте студенттер үчүн ноутбуктар: окуу, онлайн сабак жана документ менен иштөө үчүн жеңил моделдер, WhatsApp аркылуу тез заказ жана менеджердин жардамы.",
    eyebrow: "TOMSTORE Ноутбуктары",
    introTitle: "Бишкекте студенттер үчүн ноутбук",
    introDescription:
      "Эгер Бишкекте студенттер үчүн ноутбук издеп жатсаңыз, бул барак салмак, батарея, SSD жана эс тутум боюнча тандоону тез тарылтууга жардам берет. Окуу, онлайн сабак жана күнүмдүк иш үчүн ыңгайлуу баштапкы чекит.",
    summaryTitle: "Бишкекте студенттер үчүн ноутбук кантип тандалат",
    summaryDescription:
      "Алгач салмакка, батареяга, SSDге жана 8-16 ГБ эс тутумга көңүл буруңуз. Окуу жана документ үчүн жеңил, күн сайын көтөрүп жүрүүгө ыңгайлуу моделдер жакшыраак.",
    countLabel: "Студенттер үчүн тандоолор",
    cardLabel: "Категория",
    itemCountLabel: "товар",
    sectionTitle: "Бишкекте студенттер үчүн ноутбуктар",
    sectionDescription:
      "Бишкекте окуу, онлайн сабак жана күнүмдүк иш үчүн ылайыктуу ноутбук категорияларын карап, андан кийин WhatsApp аркылуу тез заказ кылыңыз.",
    catalogLabel: "Ноутбуктарды ачуу",
    contactLabel: "Менеджерге жазуу",
    highlights: [
      "Бишкекте студенттер үчүн ноутбуктар",
      "Окуу жана документ үчүн жеңил моделдер",
      "Категорияларга жана каталогго тез өтүү",
      "Бар-жогу жана тандоо боюнча менеджердин жардамы",
    ],
    guideTitle: "Бишкекте сатып алардан мурда эмнени караш керек",
    guideParagraphs: [
      "Бишкекте студент үчүн SSD, 8-16 ГБ эс тутум, жакшы батарея жана ыңгайлуу экран маанилүү. Эгер ноутбук негизинен онлайн сабак жана документтер үчүн керек болсо, ашыкча кубаттуулук үчүн төлөөнүн кажети жок.",
      "Эгер окуу менен шаар ичинде жүрүүгө да ылайыктуу универсалдуу вариант керек болсо, ыңгайлуу клавиатурасы жана бир аз көбүрөөк эс тутуму бар моделди тандаңыз. Заказдан мурда TOMSTORE менен баасын жана бар-жогун тактаса болот.",
    ],
    faqs: [
      {
        question: "Бишкекте студент үчүн кайсы ноутбук жакшы?",
        answer:
          "SSD, 8-16 ГБ эс тутум жана жакшы батареясы бар жеңил ноутбук көбүнчө окуу, видеосүйлөшүү жана документ менен иштөө үчүн эң туура келет.",
      },
      {
        question: "Бул барак мектеп же колледж үчүн да ылайыктуубу?",
        answer:
          "Ооба. Бул жерден мектеп, колледж жана университет үчүн күнүмдүк колдонууга ыңгайлуу ноутбук тандаса болот.",
      },
      {
        question: "Бишкек боюнча WhatsApp аркылуу заказ кылса болобу?",
        answer:
          "Ооба. Менеджер менен бар-жогун, баасын жана комплектациясын тактап, Бишкектен же Кыргызстандагы башка аймактардан заказ берсе болот.",
      },
    ],
    keywords: [
      "Бишкекте студенттер үчүн ноутбук",
      "Бишкекте окууга ноутбук",
      "студенттер үчүн ноутбук Бишкек",
      "ноутбук сатып алуу Бишкек",
      "Бишкек ноутбуктары",
    ],
  },
};

const TEACHER_LAPTOP_OSH_OVERRIDES: Record<Locale, HubOverrides> = {
  ru: {
    metaTitle: "Ноутбук для учителей в Оше | TOMSTORE",
    metaDescription:
      "Ноутбуки для учителей в Оше: удобные модели для уроков, презентаций и онлайн-занятий, быстрый заказ через WhatsApp и помощь менеджера.",
    eyebrow: "TOMSTORE Ноутбуки",
    introTitle: "Ноутбук для учителей в Оше",
    introDescription:
      "Если нужен ноутбук для учителя в Оше, здесь можно быстро сравнить модели для уроков, презентаций и работы с документами. Страница помогает выбрать практичный вариант без лишнего поиска.",
    summaryTitle: "Что важно учителю в Оше при выборе ноутбука",
    summaryDescription:
      "Для уроков и презентаций важны удобство, автономность, хороший экран и стабильная работа с браузером, видео и презентациями.",
    countLabel: "Подборок для учителей",
    cardLabel: "Категория",
    itemCountLabel: "товаров",
    sectionTitle: "Ноутбуки для учителей в Оше",
    sectionDescription:
      "Смотрите ноутбуки, которые подходят для уроков, презентаций и работы с документами в Оше, а затем быстро переходите к заказу.",
    catalogLabel: "Открыть ноутбуки",
    contactLabel: "Связаться с менеджером",
    highlights: [
      "Ноутбуки для учителей в Оше",
      "Практичные модели для уроков и презентаций",
      "Быстрый переход к категориям и каталогу",
      "Помощь менеджера с наличием и подбором",
    ],
    guideTitle: "Какая конфигурация нужна учителю в Оше",
    guideParagraphs: [
      "Для повседневной работы учителю в Оше достаточно ноутбука с SSD, хорошей батареей и 8-16 ГБ памяти. Он должен без проблем открывать документы, презентации и онлайн-платформы.",
      "Если планируются уроки с большим количеством вкладок, видео и учебных материалов, лучше взять модель с запасом по памяти и более комфортным экраном.",
    ],
    faqs: [
      {
        question: "Нужен ли учителю в Оше мощный ноутбук?",
        answer:
          "Обычно нет. Для уроков, презентаций и документов важнее надежность, автономность и комфорт, чем избыточная мощность.",
      },
      {
        question: "Подходит ли эта страница для школ и учебных центров Оша?",
        answer:
          "Да. Она полезна, когда нужно выбрать ноутбук для преподавателей, онлайн-уроков и рабочих задач учебного заведения в Оше.",
      },
      {
        question: "Можно ли заказать через WhatsApp в Оше?",
        answer:
          "Да. Вы можете уточнить цену, наличие и комплектацию через менеджера и оформить заказ в Оше и по всему Кыргызстану.",
      },
    ],
    keywords: [
      "ноутбук для учителей Ош",
      "ноутбук для преподавателей Ош",
      "ноутбук для школы Ош",
      "купить ноутбук в Оше",
      "ноутбуки Ош",
    ],
  },
  en: {
    metaTitle: "Teacher laptops in Osh | TOMSTORE",
    metaDescription:
      "Laptops for teachers in Osh: practical models for lessons, presentations and online classes, with fast WhatsApp ordering and manager support.",
    eyebrow: "TOMSTORE Laptops",
    introTitle: "Teacher laptops in Osh",
    introDescription:
      "If you need a teacher laptop in Osh, this page helps compare models for lessons, presentations and document work. It is a practical starting point for a quick decision.",
    summaryTitle: "What teachers in Osh should look for",
    summaryDescription:
      "For lessons and presentations, comfort, battery life, a good display and stable performance in browsers, video and presentation apps matter most.",
    countLabel: "Teacher laptop picks",
    cardLabel: "Category",
    itemCountLabel: "products",
    sectionTitle: "Teacher laptops in Osh",
    sectionDescription:
      "Browse laptops that fit lessons, presentations and document work in Osh, then continue to a quick order through WhatsApp.",
    catalogLabel: "Open laptops",
    contactLabel: "Talk to manager",
    highlights: [
      "Teacher laptops in Osh",
      "Practical models for lessons and presentations",
      "Fast access to categories and catalog pages",
      "Manager support for stock and selection",
    ],
    guideTitle: "What configuration a teacher in Osh needs",
    guideParagraphs: [
      "For everyday work in Osh, a laptop with SSD storage, good battery life and 8-16 GB RAM is usually enough. It should handle documents, presentations and online platforms without issues.",
      "If lessons use more tabs, video and course materials, a model with more memory and a more comfortable display is a safer choice.",
    ],
    faqs: [
      {
        question: "Does a teacher in Osh need a powerful laptop?",
        answer:
          "Usually not. For lessons, presentations and documents, reliability, battery life and comfort matter more than extra raw power.",
      },
      {
        question: "Is this page useful for schools and training centers in Osh?",
        answer:
          "Yes. It helps when choosing laptops for teachers, online classes and educational work in Osh.",
      },
      {
        question: "Can I order through WhatsApp in Osh?",
        answer:
          "Yes. You can confirm price, stock and configuration with a manager and place the order from Osh or any other region of Kyrgyzstan.",
      },
    ],
    keywords: [
      "teacher laptop Osh",
      "teacher laptops in Osh",
      "school laptop Osh",
      "buy laptop in Osh",
      "Osh laptops",
    ],
  },
  ky: {
    metaTitle: "Ошто мугалимдер үчүн ноутбук | TOMSTORE",
    metaDescription:
      "Ошто мугалимдер үчүн ноутбуктар: сабак, презентация жана онлайн сабак үчүн практикалык моделдер, WhatsApp аркылуу тез заказ жана менеджердин жардамы.",
    eyebrow: "TOMSTORE Ноутбуктары",
    introTitle: "Ошто мугалимдер үчүн ноутбук",
    introDescription:
      "Эгер Ошто мугалимдер үчүн ноутбук керек болсо, бул барак сабак, презентация жана документ менен иштөө үчүн моделдерди тез салыштырууга жардам берет. Тандоону жөнөкөйлөтүү үчүн практикалык баштапкы чекит.",
    summaryTitle: "Ошто мугалимдер үчүн ноутбукта эмнени караш керек",
    summaryDescription:
      "Сабак жана презентация үчүн ыңгайлуулук, батарея, жакшы экран жана браузер, видео менен туруктуу иштөө маанилүү.",
    countLabel: "Мугалимдер үчүн тандоолор",
    cardLabel: "Категория",
    itemCountLabel: "товар",
    sectionTitle: "Ошто мугалимдер үчүн ноутбуктар",
    sectionDescription:
      "Сабак, презентация жана документ менен иштөө үчүн ылайыктуу ноутбуктарды Ошто карап чыгып, андан кийин WhatsApp аркылуу тез заказ кылыңыз.",
    catalogLabel: "Ноутбуктарды ачуу",
    contactLabel: "Менеджерге жазуу",
    highlights: [
      "Ошто мугалимдер үчүн ноутбуктар",
      "Сабак жана презентация үчүн практикалык моделдер",
      "Категорияларга жана каталогго тез өтүү",
      "Бар-жогу жана тандоо боюнча менеджердин жардамы",
    ],
    guideTitle: "Ошто мугалимге кандай конфигурация керек",
    guideParagraphs: [
      "Күнүмдүк иш үчүн SSD, жакшы батарея жана 8-16 ГБ эс тутуму бар ноутбук жетиштүү. Ал документ, презентация жана онлайн платформалар менен көйгөйсүз иштеши керек.",
      "Эгер сабакта көп өтмөк, видео жана окуу материалдары колдонулса, эс тутуму көбүрөөк жана экраны ыңгайлуу модель жакшыраак.",
    ],
    faqs: [
      {
        question: "Ошто мугалимге күчтүү ноутбук керекпи?",
        answer:
          "Адатта жок. Сабак, презентация жана документтер үчүн ашыкча кубаттан көрө ишенимдүүлүк, батарея жана ыңгайлуулук маанилүүрөөк.",
      },
      {
        question: "Бул барак Ош шаарындагы мектептер жана окуу борборлору үчүн ылайыктуубу?",
        answer:
          "Ооба. Мугалимдер, онлайн сабактар жана билим берүү иши үчүн ноутбук тандаганда бул барак пайдалуу болот.",
      },
      {
        question: "Ошто WhatsApp аркылуу заказ кылса болобу?",
        answer:
          "Ооба. Баасын, бар-жогун жана комплектациясын менеджер менен тактап, Оштон жана Кыргызстандагы башка аймактардан заказ берсе болот.",
      },
    ],
    keywords: [
      "Ошто мугалимдер үчүн ноутбук",
      "Ошто окутуучулар үчүн ноутбук",
      "Ошто мектеп үчүн ноутбук",
      "ноутбук сатып алуу Ош",
      "Ош ноутбуктары",
    ],
  },
};

const OFFICE_PRINTER_TALAS_OVERRIDES: Record<Locale, HubOverrides> = {
  ru: {
    metaTitle: "Офисный принтер в Таласе | TOMSTORE",
    metaDescription:
      "Офисные принтеры в Таласе: лазерные, струйные и МФУ для школы, компании и дома, быстрый заказ через WhatsApp и помощь менеджера.",
    eyebrow: "TOMSTORE Принтеры",
    introTitle: "Офисный принтер в Таласе",
    introDescription:
      "Если нужен офисный принтер в Таласе, здесь можно быстро выбрать модель для документов, отчетов и учебных материалов. Страница помогает сравнить практичные варианты без лишнего поиска.",
    summaryTitle: "Как выбрать офисный принтер в Таласе",
    summaryDescription:
      "Смотрите на объем печати, скорость, расходники и обслуживание. Для школы и офиса чаще всего удобнее лазерные модели или МФУ.",
    countLabel: "Подборок для офиса",
    cardLabel: "Категория",
    itemCountLabel: "товаров",
    sectionTitle: "Офисные принтеры в Таласе",
    sectionDescription:
      "Смотрите принтеры и МФУ, которые подходят для документов, отчетов и учебных материалов в Таласе, а затем быстро переходите к заказу.",
    catalogLabel: "Открыть принтеры",
    contactLabel: "Связаться с менеджером",
    highlights: [
      "Офисные принтеры в Таласе",
      "МФУ и лазерные модели",
      "Быстрый переход к категориям и каталогу",
      "Помощь менеджера с расходниками и наличием",
    ],
    guideTitle: "Что важно для офисной печати в Таласе",
    guideParagraphs: [
      "Если принтер в Таласе нужен для регулярной печати документов, лучше выбирать лазерную модель с понятным обслуживанием и доступными расходниками.",
      "Для школы или небольшого офиса также подойдет МФУ, если кроме печати нужны сканирование и копирование. Перед заказом можно уточнить стоимость и наличие через WhatsApp.",
    ],
    faqs: [
      {
        question: "Какой принтер лучше для офиса в Таласе?",
        answer:
          "Чаще всего для офиса берут лазерный принтер или МФУ, потому что они лучше подходят для регулярной печати документов и проще в обслуживании.",
      },
      {
        question: "Подойдет ли эта страница для школы в Таласе?",
        answer:
          "Да. Для школы особенно важны надежность, скорость и удобство обслуживания, а эти параметры есть у офисных моделей и МФУ.",
      },
      {
        question: "Можно ли заказать принтер через WhatsApp в Таласе?",
        answer:
          "Да. Можно уточнить цену, наличие, картриджи и быстро оформить заказ в Таласе и по всему Кыргызстану.",
      },
    ],
    keywords: [
      "офисный принтер Талас",
      "принтер для офиса Талас",
      "принтер для школы Талас",
      "купить принтер в Таласе",
      "принтеры Талас",
    ],
  },
  en: {
    metaTitle: "Office printer in Talas | TOMSTORE",
    metaDescription:
      "Office printers in Talas: laser, inkjet and MFP models for school, company and home use, with fast WhatsApp ordering and manager support.",
    eyebrow: "TOMSTORE Printers",
    introTitle: "Office printer in Talas",
    introDescription:
      "If you need an office printer in Talas, this page helps you quickly compare models for documents, reports and study materials. It is a practical starting point for a fast decision.",
    summaryTitle: "How to choose an office printer in Talas",
    summaryDescription:
      "Focus on print volume, speed, consumables and maintenance. For school and office use, laser printers or MFPs are usually the best fit.",
    countLabel: "Office printer picks",
    cardLabel: "Category",
    itemCountLabel: "products",
    sectionTitle: "Office printers in Talas",
    sectionDescription:
      "Browse printers and multifunction devices that fit documents, reports and study materials in Talas, then continue to a quick order through WhatsApp.",
    catalogLabel: "Open printers",
    contactLabel: "Talk to manager",
    highlights: [
      "Office printers in Talas",
      "Laser printers and multifunction devices",
      "Fast access to categories and catalog pages",
      "Manager support for consumables and stock",
    ],
    guideTitle: "What matters for office printing in Talas",
    guideParagraphs: [
      "If the printer in Talas will be used for regular document printing, a laser model with simple maintenance and available consumables is usually the safest choice.",
      "For a school or small office, an MFP is also a good option when scanning and copying are needed. You can confirm price and stock through WhatsApp before ordering.",
    ],
    faqs: [
      {
        question: "Which printer is best for an office in Talas?",
        answer:
          "For office use, a laser printer or multifunction device is usually the best option because it handles regular document printing and is easier to maintain.",
      },
      {
        question: "Is this page useful for schools in Talas too?",
        answer:
          "Yes. Schools need reliability, speed and easy maintenance, and office printers and MFPs are a strong fit for those tasks.",
      },
      {
        question: "Can I order a printer through WhatsApp in Talas?",
        answer:
          "Yes. You can confirm price, stock and cartridges with a manager and place the order from Talas or any other region of Kyrgyzstan.",
      },
    ],
    keywords: [
      "office printer Talas",
      "printer for office Talas",
      "printer for school Talas",
      "buy printer in Talas",
      "Talas printers",
    ],
  },
  ky: {
    metaTitle: "Таласта офис принтери | TOMSTORE",
    metaDescription:
      "Таласта офис принтерлери: мектеп, компания жана үй үчүн лазердик, сыя жана МФУ моделдер, WhatsApp аркылуу тез заказ жана менеджердин жардамы.",
    eyebrow: "TOMSTORE Принтерлери",
    introTitle: "Таласта офис принтери",
    introDescription:
      "Эгер Таласта офис принтери керек болсо, бул барак документ, отчет жана окуу материалдары үчүн моделдерди тез салыштырууга жардам берет. Ыкчам тандоо үчүн практикалык баштапкы чекит.",
    summaryTitle: "Таласта офис принтерин кантип тандоо керек",
    summaryDescription:
      "Басма көлөмүнө, ылдамдыкка, чыгымдалуучу материалга жана тейлөөгө көңүл буруңуз. Мектеп жана офис үчүн көбүнчө лазердик принтер же МФУ жакшы болот.",
    countLabel: "Офис үчүн тандоолор",
    cardLabel: "Категория",
    itemCountLabel: "товар",
    sectionTitle: "Таласта офис принтерлери",
    sectionDescription:
      "Таласта документ, отчет жана окуу материалы үчүн ылайыктуу принтерлерди жана МФУларды карап чыгып, андан кийин WhatsApp аркылуу тез заказ кылыңыз.",
    catalogLabel: "Принтерлерди ачуу",
    contactLabel: "Менеджерге жазуу",
    highlights: [
      "Таласта офис принтерлери",
      "Лазердик принтерлер жана МФУ",
      "Категорияларга жана каталогго тез өтүү",
      "Чыгымдалуучу материал жана бар-жогу боюнча жардам",
    ],
    guideTitle: "Таласта офис басмасы үчүн эмнени караш керек",
    guideParagraphs: [
      "Эгер Таласта принтер дайыма документ чыгарууга колдонулса, тейлөөсү жеңил жана чыгымдалуучу материалдары жеткиликтүү лазердик модель жакшы чечим болот.",
      "Мектеп же чакан офис үчүн сканерлөө жана көчүрүү керек болсо, МФУ да ылайыктуу. Заказдан мурда WhatsApp аркылуу баасын жана бар-жогун тактап алса болот.",
    ],
    faqs: [
      {
        question: "Таласта офис үчүн кайсы принтер жакшы?",
        answer:
          "Офистик колдонууга көбүнчө лазердик принтер же МФУ жакшы келет, анткени алар документти көп басууга ыңгайлуу жана тейлөөсү жеңил.",
      },
      {
        question: "Бул барак Таластагы мектептер үчүн да пайдалуубу?",
        answer:
          "Ооба. Мектеп үчүн ишенимдүүлүк, ылдамдык жана тейлөө жеңилдиги маанилүү, ал эми офис моделдери жана МФУ ошол талаптарга жакшы жооп берет.",
      },
      {
        question: "Таласта WhatsApp аркылуу заказ кылса болобу?",
        answer:
          "Ооба. Менеджер менен баасын, бар-жогун жана картридждерин тактап, Таластан жана Кыргызстандагы башка аймактардан заказ кылса болот.",
      },
    ],
    keywords: [
      "офис принтери Талас",
      "Таласта офис принтери",
      "Таласта принтер сатып алуу",
      "принтер үчүн Талас",
      "Талас принтерлери",
    ],
  },
};

export const getStudentLaptopBishkekSeoContent = (
  locale: Locale,
): CatalogHubSeoContent =>
  mergeCityHubContent(
    getStudentLaptopSeoContent(locale),
    STUDENT_LAPTOP_BISHKEK_OVERRIDES[locale],
  );

export const getTeacherLaptopOshSeoContent = (
  locale: Locale,
): CatalogHubSeoContent =>
  mergeCityHubContent(
    getTeacherLaptopSeoContent(locale),
    TEACHER_LAPTOP_OSH_OVERRIDES[locale],
  );

export const getOfficePrinterTalasSeoContent = (
  locale: Locale,
): CatalogHubSeoContent =>
  mergeCityHubContent(
    getOfficePrinterSeoContent(locale),
    OFFICE_PRINTER_TALAS_OVERRIDES[locale],
  );
