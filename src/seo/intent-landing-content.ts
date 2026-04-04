import type { Locale } from "@/i18n/messages";
import type { CatalogLandingSeoContent } from "./content";

const getContent = (
  locale: Locale,
  content: Record<Locale, CatalogLandingSeoContent>,
) => content[locale] || content.ru;

const LAPTOP_STUDENTS_CONTENT: Record<Locale, CatalogLandingSeoContent> = {
  ru: {
    metaTitle: "Ноутбук для студентов в Кыргызстане | TOMSTORE",
    metaDescription:
      "Ноутбуки для студентов, учителей и учебы в Кыргызстане. Выберите удобную модель для учебы, работы и онлайн-уроков и оформите заказ через WhatsApp.",
    eyebrow: "TOMSTORE Ноутбуки",
    introTitle: "Ноутбук для студентов и учителей в Кыргызстане",
    introDescription:
      "Эта страница помогает быстро выбрать ноутбук для учебы, лекций, дистанционных уроков и повседневной работы. Здесь собраны понятные критерии выбора и быстрые переходы к нужным разделам.",
    summaryTitle: "Как выбрать ноутбук для учебы",
    summaryDescription:
      "Сначала смотрите на вес, автономность, SSD и объем оперативной памяти. Для студентов и учителей обычно лучше подходят легкие модели, которые удобно носить с собой и использовать каждый день.",
    countLabel: "Релевантных разделов",
    catalogLabel: "Открыть ноутбуки",
    contactLabel: "Связаться с менеджером",
    highlights: [
      "Ноутбуки для студентов, учителей и учебы",
      "Легкие модели для дома, вуза и школы",
      "Быстрый переход к категориям и каталогу",
      "Помощь менеджера с наличием и подбором",
    ],
    guideTitle: "На что смотреть перед покупкой",
    guideParagraphs: [
      "Для учебы важны SSD, 8-16 ГБ памяти, нормальная автономность и удобный экран. Если ноутбук нужен для онлайн-занятий и документов, не стоит переплачивать за лишнюю производительность.",
      "Если нужен более универсальный вариант, подойдут модели с запасом по памяти и хорошей клавиатурой. Перед заказом можно быстро уточнить цену и наличие у менеджера TOMSTORE.",
    ],
    faqs: [
      {
        question: "Какой ноутбук лучше для студента?",
        answer:
          "Чаще всего подходит легкий ноутбук с SSD, 8-16 ГБ оперативной памяти и нормальной автономностью. Такой вариант удобен для учебы, видеосвязи и работы с документами.",
      },
      {
        question: "Подойдет ли эта страница для учителя?",
        answer:
          "Да. Для учителей важны те же базовые вещи: удобство, стабильность, достаточная память и нормальная работа с онлайн-платформами и презентациями.",
      },
      {
        question: "Можно ли заказать ноутбук по Кыргызстану через WhatsApp?",
        answer:
          "Да. На сайте можно быстро уточнить наличие, цену и комплектацию и оформить заказ через менеджера из любого региона Кыргызстана.",
      },
    ],
    keywords: [
      "ноутбук для студентов",
      "ноутбук для учителей",
      "ноутбук для учебы",
      "купить ноутбук в Кыргызстане",
      "ноутбуки Кыргызстан",
    ],
  },
  en: {
    metaTitle: "Laptop for students in Kyrgyzstan | TOMSTORE",
    metaDescription:
      "Laptops for students, teachers and study in Kyrgyzstan. Choose a practical model for school, college, office work and online classes.",
    eyebrow: "TOMSTORE Laptops",
    introTitle: "Laptop for students and teachers in Kyrgyzstan",
    introDescription:
      "This page helps visitors choose a laptop for studying, lectures, online lessons and everyday work. It focuses on the most important selection criteria and fast paths to the right pages.",
    summaryTitle: "How to choose a study laptop",
    summaryDescription:
      "Focus on weight, battery life, SSD storage and RAM first. For students and teachers, lighter laptops that are easy to carry are usually the best fit.",
    countLabel: "Relevant sections",
    catalogLabel: "Open laptops",
    contactLabel: "Talk to manager",
    highlights: [
      "Laptops for students, teachers and study",
      "Light models for home, school and university",
      "Fast access to categories and catalog pages",
      "Manager support for stock and selection",
    ],
    guideTitle: "What matters before buying",
    guideParagraphs: [
      "For study, SSD storage, 8-16 GB RAM, battery life and a comfortable display matter most. If the laptop is mainly for online classes and documents, there is no need to overspend on extra power.",
      "If you want a more universal option, choose a model with a bit more memory and a comfortable keyboard. Before ordering, you can quickly confirm the price and stock with TOMSTORE.",
    ],
    faqs: [
      {
        question: "Which laptop is best for a student?",
        answer:
          "A light laptop with SSD storage, 8-16 GB RAM and good battery life is usually the best fit for school, documents and video calls.",
      },
      {
        question: "Is this page useful for teachers too?",
        answer:
          "Yes. Teachers need the same core things: stability, comfort, enough memory and smooth work with online platforms and presentations.",
      },
      {
        question: "Can I order a laptop through WhatsApp across Kyrgyzstan?",
        answer:
          "Yes. You can confirm stock, price and configuration with a manager and place the order from any region of Kyrgyzstan.",
      },
    ],
    keywords: [
      "laptop for students",
      "laptop for teachers",
      "laptop for study",
      "buy laptop in Kyrgyzstan",
      "laptops Kyrgyzstan",
    ],
  },
  ky: {
    metaTitle: "Кыргызстанда студенттер үчүн ноутбук | TOMSTORE",
    metaDescription:
      "Студенттерге, мугалимдерге жана окууга ылайыктуу ноутбуктар Кыргызстанда. Окуу, онлайн сабак жана күнүмдүк иш үчүн ыңгайлуу моделдер.",
    eyebrow: "TOMSTORE Ноутбуктары",
    introTitle: "Студенттерге жана мугалимдерге ноутбук Кыргызстанда",
    introDescription:
      "Бул барак окуу, лекция, онлайн сабак жана күнүмдүк иш үчүн ноутбук тандоону жеңилдетет. Негизги критерийлер жана керектүү барактарга тез өтүү бир жерде.",
    summaryTitle: "Окууга ылайыктуу ноутбук кантип тандалат",
    summaryDescription:
      "Алгач салмакка, батареяга, SSDге жана эс тутумга көңүл буруңуз. Студенттер менен мугалимдер үчүн жеңил жана ташууга ыңгайлуу моделдер көбүнчө туура келет.",
    countLabel: "Тиешелүү бөлүмдөр",
    catalogLabel: "Ноутбуктарды ачуу",
    contactLabel: "Менеджерге жазуу",
    highlights: [
      "Студенттерге, мугалимдерге жана окууга ноутбуктар",
      "Мектеп, университет жана үй үчүн жеңил моделдер",
      "Категорияларга жана каталогго тез өтүү",
      "Бар-жогу жана тандоо боюнча менеджердин жардамы",
    ],
    guideTitle: "Сатып алардан мурда эмнени эске алуу керек",
    guideParagraphs: [
      "Окуу үчүн SSD, 8-16 ГБ эс тутум, жакшы батарея жана ыңгайлуу экран маанилүү. Негизги иши онлайн сабак жана документтер болсо, ашыкча кубаттуулук үчүн көп төлөөнүн кереги жок.",
      "Эгер универсалдуу вариант керек болсо, эстутуму көбүрөөк жана клавиатурасы ыңгайлуу модель тандаңыз. TOMSTORE менен баасын жана бар-жогун тез тактаса болот.",
    ],
    faqs: [
      {
        question: "Студент үчүн кайсы ноутбук жакшы?",
        answer:
          "SSD, 8-16 ГБ эс тутум жана жакшы батареясы бар жеңил ноутбук көбүнчө окуу, документ жана видеосүйлөшүү үчүн эң туура вариант болот.",
      },
      {
        question: "Бул барак мугалимдер үчүн да ылайыктуубу?",
        answer:
          "Ооба. Мугалимдер үчүн да негизги маанилүү нерселер бирдей: туруктуулук, ыңгайлуулук, жетиштүү эс тутум жана онлайн платформалар менен жакшы иштөө.",
      },
      {
        question: "WhatsApp аркылуу Кыргызстан боюнча заказ кылса болобу?",
        answer:
          "Ооба. Менеджер менен бар-жогун, баасын жана комплектациясын тактап, Кыргызстандагы каалаган аймактан заказ берсе болот.",
      },
    ],
    keywords: [
      "студент үчүн ноутбук",
      "мугалим үчүн ноутбук",
      "ноутбук окууга",
      "ноутбук сатып алуу Кыргызстанда",
      "ноутбуктар Кыргызстан",
    ],
  },
};

const LAPTOP_TEACHERS_CONTENT: Record<Locale, CatalogLandingSeoContent> = {
  ru: {
    metaTitle: "Ноутбук для учителей в Кыргызстане | TOMSTORE",
    metaDescription:
      "Ноутбуки для учителей, школ и учебной работы в Кыргызстане. Удобные модели для уроков, презентаций и онлайн-занятий.",
    eyebrow: "TOMSTORE Ноутбуки",
    introTitle: "Ноутбук для учителей и преподавателей в Кыргызстане",
    introDescription:
      "Эта страница помогает подобрать ноутбук для уроков, презентаций, работы с документами и онлайн-занятий. Подходит для учителей, преподавателей и учебных центров.",
    summaryTitle: "Что важно учителю при выборе ноутбука",
    summaryDescription:
      "Нужны удобство, надежность, нормальная автономность, хороший экран и стабильная работа в браузере, презентациях и видеосервисах.",
    countLabel: "Релевантных разделов",
    catalogLabel: "Открыть ноутбуки",
    contactLabel: "Связаться с менеджером",
    highlights: [
      "Ноутбуки для учителей и преподавателей",
      "Удобные модели для уроков и презентаций",
      "Быстрый переход к категориям и каталогу",
      "Помощь менеджера с наличием и подбором",
    ],
    guideTitle: "Какая конфигурация нужна учителю",
    guideParagraphs: [
      "Для повседневной работы учителю достаточно ноутбука с SSD, хорошей батареей и 8-16 ГБ памяти. Он должен без проблем открывать документы, презентации и онлайн-платформы.",
      "Если планируются уроки с большим количеством вкладок, видео и материалов, лучше взять модель с запасом по памяти и более комфортным экраном.",
    ],
    faqs: [
      {
        question: "Нужен ли учителю мощный ноутбук?",
        answer:
          "Обычно нет. Для уроков, презентаций и документов важнее надежность, автономность и комфорт, чем избыточная мощность.",
      },
      {
        question: "Подходит ли эта страница для школ и учебных центров?",
        answer:
          "Да. Она полезна, когда нужно выбрать ноутбук для преподавателей, онлайн-уроков и рабочих задач учебного заведения.",
      },
      {
        question: "Можно ли заказать через WhatsApp?",
        answer:
          "Да. Вы можете уточнить цену, наличие и комплектацию через менеджера и оформить заказ по Кыргызстану.",
      },
    ],
    keywords: [
      "ноутбук для учителей",
      "ноутбук для преподавателей",
      "ноутбук для школы",
      "ноутбук для онлайн уроков",
      "купить ноутбук в Кыргызстане",
    ],
  },
  en: {
    metaTitle: "Laptop for teachers in Kyrgyzstan | TOMSTORE",
    metaDescription:
      "Laptops for teachers, schools and teaching work in Kyrgyzstan. Practical models for lessons, presentations and online classes.",
    eyebrow: "TOMSTORE Laptops",
    introTitle: "Laptop for teachers and educators in Kyrgyzstan",
    introDescription:
      "This page helps visitors choose a laptop for lessons, presentations, document work and online classes. It is a practical fit for teachers, tutors and training centers.",
    summaryTitle: "What teachers should look for",
    summaryDescription:
      "Comfort, reliability, decent battery life, a good display and stable performance in browsers, presentation apps and video platforms matter most.",
    countLabel: "Relevant sections",
    catalogLabel: "Open laptops",
    contactLabel: "Talk to manager",
    highlights: [
      "Laptops for teachers and educators",
      "Practical models for lessons and presentations",
      "Fast access to categories and catalog pages",
      "Manager support for stock and selection",
    ],
    guideTitle: "What configuration a teacher needs",
    guideParagraphs: [
      "For everyday work, a laptop with SSD storage, good battery life and 8-16 GB RAM is usually enough. It should handle documents, presentations and online platforms without issues.",
      "If lessons use more tabs, video and course materials, a model with more memory and a more comfortable display is a safer choice.",
    ],
    faqs: [
      {
        question: "Does a teacher need a powerful laptop?",
        answer:
          "Usually not. For lessons, presentations and documents, reliability, battery life and comfort matter more than extra raw power.",
      },
      {
        question: "Is this page useful for schools and training centers?",
        answer:
          "Yes. It helps when choosing laptops for teachers, online classes and educational work.",
      },
      {
        question: "Can I order through WhatsApp?",
        answer:
          "Yes. You can confirm price, stock and configuration with a manager and place the order across Kyrgyzstan.",
      },
    ],
    keywords: [
      "laptop for teachers",
      "laptop for educators",
      "school laptop",
      "online class laptop",
      "buy laptop in Kyrgyzstan",
    ],
  },
  ky: {
    metaTitle: "Кыргызстанда мугалимдер үчүн ноутбук | TOMSTORE",
    metaDescription:
      "Мугалимдерге, мектептерге жана окуу ишине ылайыктуу ноутбуктар Кыргызстанда. Сабак, презентация жана онлайн сабак үчүн практикалык моделдер.",
    eyebrow: "TOMSTORE Ноутбуктары",
    introTitle: "Мугалимдерге жана окутуучуларга ноутбук Кыргызстанда",
    introDescription:
      "Бул барак сабак, презентация, документ менен иштөө жана онлайн сабак үчүн ноутбук тандоого жардам берет. Мугалимдерге, репетиторлорго жана окуу борборлоруна ылайыктуу.",
    summaryTitle: "Мугалим ноутбук алууда эмнени карашы керек",
    summaryDescription:
      "Ыңгайлуулук, ишенимдүүлүк, жакшы батарея, сапаттуу экран жана браузер, презентация, видео сервистердеги туруктуу иштөө маанилүү.",
    countLabel: "Тиешелүү бөлүмдөр",
    catalogLabel: "Ноутбуктарды ачуу",
    contactLabel: "Менеджерге жазуу",
    highlights: [
      "Мугалимдерге жана окутуучуларга ноутбуктар",
      "Сабак жана презентация үчүн практикалык моделдер",
      "Категорияларга жана каталогго тез өтүү",
      "Бар-жогу жана тандоо боюнча менеджердин жардамы",
    ],
    guideTitle: "Мугалимге кандай конфигурация керек",
    guideParagraphs: [
      "Күнүмдүк иш үчүн SSD, жакшы батарея жана 8-16 ГБ эс тутуму бар ноутбук жетиштүү. Ал документ, презентация жана онлайн платформалар менен көйгөйсүз иштеши керек.",
      "Эгер сабакта көп өтмөк, видео жана окуу материалдары колдонулса, эс тутуму көбүрөөк жана экраны ыңгайлуу модель жакшыраак.",
    ],
    faqs: [
      {
        question: "Мугалимге күчтүү ноутбук керекпи?",
        answer:
          "Адатта жок. Сабак, презентация жана документтер үчүн ашыкча кубаттан көрө ишенимдүүлүк, батарея жана ыңгайлуулук маанилүүрөөк.",
      },
      {
        question: "Бул барак мектептер жана окуу борборлору үчүн ылайыктуубу?",
        answer:
          "Ооба. Мугалимдер, онлайн сабактар жана билим берүү иши үчүн ноутбук тандаганда бул барак пайдалуу болот.",
      },
      {
        question: "WhatsApp аркылуу заказ кылса болобу?",
        answer:
          "Ооба. Баасын, бар-жогун жана комплектациясын менеджер менен тактап, Кыргызстан боюнча заказ берсе болот.",
      },
    ],
    keywords: [
      "мугалим үчүн ноутбук",
      "окутуучу үчүн ноутбук",
      "мектеп үчүн ноутбук",
      "онлайн сабак үчүн ноутбук",
      "ноутбук сатып алуу Кыргызстанда",
    ],
  },
};

const OFFICE_PRINTER_CONTENT: Record<Locale, CatalogLandingSeoContent> = {
  ru: {
    metaTitle: "Офисный принтер в Кыргызстане | TOMSTORE",
    metaDescription:
      "Офисные принтеры для школ, компаний и домашнего офиса в Кыргызстане. Лазерные, струйные и МФУ для ежедневной печати.",
    eyebrow: "TOMSTORE Принтеры",
    introTitle: "Офисный принтер для школы, компании и дома в Кыргызстане",
    introDescription:
      "Эта страница помогает выбрать принтер для документов, отчетов, учебных материалов и повседневной офисной печати. Здесь собраны понятные критерии для быстрого выбора.",
    summaryTitle: "Как выбрать принтер для офиса",
    summaryDescription:
      "Сначала смотрят на объем печати, скорость, расходники и удобство обслуживания. Для офиса и школы чаще всего подходят лазерные модели или МФУ.",
    countLabel: "Релевантных разделов",
    catalogLabel: "Открыть принтеры",
    contactLabel: "Связаться с менеджером",
    highlights: [
      "Офисные принтеры и МФУ",
      "Модели для школы, компании и дома",
      "Быстрый переход к категориям и каталогу",
      "Помощь менеджера с расходниками и наличием",
    ],
    guideTitle: "Что важно для офисной печати",
    guideParagraphs: [
      "Если принтер нужен для регулярной печати документов, лучше выбирать лазерную модель с понятным обслуживанием и доступными расходниками.",
      "Для школы или небольшого офиса также подойдет МФУ, если кроме печати нужны сканирование и копирование. Перед заказом можно уточнить стоимость и наличие через WhatsApp.",
    ],
    faqs: [
      {
        question: "Какой принтер лучше для офиса?",
        answer:
          "Чаще всего для офиса берут лазерный принтер или МФУ, потому что они лучше подходят для регулярной печати документов и проще в обслуживании.",
      },
      {
        question: "Подойдет ли эта страница для школы?",
        answer:
          "Да. Для школы особенно важны надежность, скорость и удобство обслуживания, а эти параметры есть у офисных моделей и МФУ.",
      },
      {
        question: "Можно ли заказать принтер через WhatsApp?",
        answer:
          "Да. Можно уточнить цену, наличие, картриджи и быстро оформить заказ по Кыргызстану через менеджера.",
      },
    ],
    keywords: [
      "офисный принтер",
      "принтер для школы",
      "принтер для дома",
      "принтер для офиса",
      "купить принтер в Кыргызстане",
    ],
  },
  en: {
    metaTitle: "Office printer in Kyrgyzstan | TOMSTORE",
    metaDescription:
      "Office printers for schools, companies and home offices in Kyrgyzstan. Laser, inkjet and MFP models for daily printing.",
    eyebrow: "TOMSTORE Printers",
    introTitle: "Office printer for school, company and home in Kyrgyzstan",
    introDescription:
      "This page helps visitors choose a printer for documents, reports, study materials and everyday office printing. It focuses on the practical selection criteria.",
    summaryTitle: "How to choose an office printer",
    summaryDescription:
      "Start with print volume, speed, consumables and maintenance. For offices and schools, laser printers or MFPs are usually the best fit.",
    countLabel: "Relevant sections",
    catalogLabel: "Open printers",
    contactLabel: "Talk to manager",
    highlights: [
      "Office printers and multifunction devices",
      "Models for school, company and home",
      "Fast access to categories and catalog pages",
      "Manager support for consumables and stock",
    ],
    guideTitle: "What matters for office printing",
    guideParagraphs: [
      "If the printer will be used for regular document printing, a laser model with simple maintenance and available consumables is usually the safest choice.",
      "For a school or small office, an MFP is also a good option when scanning and copying are needed. You can confirm price and stock through WhatsApp before ordering.",
    ],
    faqs: [
      {
        question: "Which printer is best for an office?",
        answer:
          "For office use, a laser printer or multifunction device is usually the best option because it handles regular document printing and is easier to maintain.",
      },
      {
        question: "Is this page useful for schools too?",
        answer:
          "Yes. Schools need reliability, speed and easy maintenance, and office printers and MFPs are a strong fit for those tasks.",
      },
      {
        question: "Can I order a printer through WhatsApp?",
        answer:
          "Yes. You can confirm price, stock and cartridges with a manager and place the order across Kyrgyzstan.",
      },
    ],
    keywords: [
      "office printer",
      "printer for school",
      "printer for home",
      "printer for office",
      "buy printer in Kyrgyzstan",
    ],
  },
  ky: {
    metaTitle: "Кыргызстанда офис принтери | TOMSTORE",
    metaDescription:
      "Мектепке, компанияга жана үйдөгү офиске ылайыктуу принтерлер Кыргызстанда. Күнүмдүк басма үчүн лазердик, сыя жана МФУ моделдер.",
    eyebrow: "TOMSTORE Принтерлери",
    introTitle: "Мектепке, компанияга жана үйгө офис принтери Кыргызстанда",
    introDescription:
      "Бул барак документ, отчет, окуу материалы жана күнүмдүк офис басмасы үчүн принтер тандоого жардам берет. Практикалык критерийлерге көңүл бурат.",
    summaryTitle: "Офис үчүн принтерди кантип тандоо керек",
    summaryDescription:
      "Биринчи кезекте басма көлөмүн, ылдамдыкты, чыгымдалуучу материалдарды жана тейлөөнү караңыз. Офис жана мектеп үчүн көбүнчө лазердик принтер же МФУ жакшы болот.",
    countLabel: "Тиешелүү бөлүмдөр",
    catalogLabel: "Принтерлерди ачуу",
    contactLabel: "Менеджерге жазуу",
    highlights: [
      "Офис принтерлери жана МФУ",
      "Мектеп, компания жана үй үчүн моделдер",
      "Категорияларга жана каталогго тез өтүү",
      "Чыгымдалуучу материал жана бар-жогу боюнча жардам",
    ],
    guideTitle: "Офистик басма үчүн эмнени караш керек",
    guideParagraphs: [
      "Эгер принтер дайыма документ чыгарууга колдонулса, тейлөөсү оңой жана чыгымдалуучу материалдары жеткиликтүү лазердик модель жакшы чечим болот.",
      "Мектеп же чакан офис үчүн сканерлөө жана көчүрүү керек болсо, МФУ да ылайыктуу. Заказдан мурда WhatsApp аркылуу баасын жана бар-жогун тактап алса болот.",
    ],
    faqs: [
      {
        question: "Офис үчүн кайсы принтер жакшы?",
        answer:
          "Офистик колдонууга көбүнчө лазердик принтер же МФУ жакшы келет, анткени алар документти көп басууга ыңгайлуу жана тейлөөсү жеңил.",
      },
      {
        question: "Бул барак мектептер үчүн да пайдалуубу?",
        answer:
          "Ооба. Мектеп үчүн ишенимдүүлүк, ылдамдык жана тейлөө жеңилдиги маанилүү, ал эми офис моделдери жана МФУ ошол талаптарга жакшы жооп берет.",
      },
      {
        question: "WhatsApp аркылуу заказ кылса болобу?",
        answer:
          "Ооба. Менеджер менен баасын, бар-жогун жана картридждерин тактап, Кыргызстан боюнча заказ кылса болот.",
      },
    ],
    keywords: [
      "офис принтери",
      "мектеп үчүн принтер",
      "үйгө принтер",
      "офиске принтер",
      "принтер сатып алуу Кыргызстанда",
    ],
  },
};

export const getStudentLaptopSeoContent = (
  locale: Locale,
): CatalogLandingSeoContent => getContent(locale, LAPTOP_STUDENTS_CONTENT);

export const getTeacherLaptopSeoContent = (
  locale: Locale,
): CatalogLandingSeoContent => getContent(locale, LAPTOP_TEACHERS_CONTENT);

export const getOfficePrinterSeoContent = (
  locale: Locale,
): CatalogLandingSeoContent => getContent(locale, OFFICE_PRINTER_CONTENT);
