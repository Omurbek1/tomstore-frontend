import type { Locale } from "@/i18n/messages";
import type { CatalogHubSeoContent } from "./content";

const getLocalizedHubContent = (
  locale: Locale,
  content: Record<Locale, CatalogHubSeoContent>,
) => content[locale] || content.ru;

const LAPTOPS_HUB_CONTENT: Record<Locale, CatalogHubSeoContent> = {
  ru: {
    metaTitle: "Ноутбуки в Кыргызстане для студентов, учителей и офиса | TOMSTORE",
    metaDescription:
      "Ноутбуки TOMSTORE для студентов, учителей, учебы, работы и бизнеса по всему Кыргызстану. Выберите подходящую категорию и закажите через WhatsApp.",
    eyebrow: "Ноутбуки TOMSTORE",
    introTitle: "Ноутбуки для студентов, учителей и офиса в Кыргызстане",
    introDescription:
      "Если нужен ноутбук для учебы, дистанционных уроков, офисной работы или дома, здесь собраны категории и советы, которые помогают быстро сузить выбор и перейти к подходящей модели.",
    countLabel: "Категорий ноутбуков",
    cardLabel: "Категория",
    itemCountLabel: "товаров",
    sectionTitle: "Выберите ноутбук под свою задачу",
    sectionDescription:
      "Сравните модели для учебы, работы, дома или бизнеса и переходите к заказу через WhatsApp по всему Кыргызстану.",
    catalogLabel: "В каталог",
    contactLabel: "Контакты",
    highlights: [
      "Ноутбуки для учебы, работы и дома",
      "Подборки для студентов, учителей и офиса",
      "Быстрый переход к категориям и каталогу",
      "Помощь менеджера по наличию и комплектации",
    ],
    faqs: [
      {
        question: "Какой ноутбук подойдет студенту или учителю?",
        answer:
          "Для учебы и ежедневной работы чаще выбирают легкие модели с SSD и 8-16 ГБ оперативной памяти. Они удобны в переноске и справляются с документами, браузером и видеосвязью.",
      },
      {
        question: "Что лучше для офиса и работы?",
        answer:
          "Для офиса обычно подходят сбалансированные ноутбуки с хорошей автономностью, а для дизайна, монтажа или сложной многозадачности стоит смотреть на более мощные модели.",
      },
      {
        question: "Можно ли заказать ноутбук через WhatsApp по Кыргызстану?",
        answer:
          "Да. Можно уточнить наличие, цену и комплектацию у менеджера и быстро оформить заказ из любого региона Кыргызстана.",
      },
    ],
    keywords: [
      "ноутбуки Кыргызстан",
      "ноутбук для студентов",
      "ноутбук для учителей",
      "ноутбук для офиса",
      "купить ноутбук в Кыргызстане",
    ],
  },
  en: {
    metaTitle: "Laptops in Kyrgyzstan for students, teachers and offices | TOMSTORE",
    metaDescription:
      "TOMSTORE laptops for students, teachers, study, work and business across Kyrgyzstan. Start from a focused laptop page and order through WhatsApp.",
    eyebrow: "TOMSTORE Laptops",
    introTitle: "Laptops for students, teachers and office work in Kyrgyzstan",
    introDescription:
      "If you need a laptop for study, online classes, office work or home use, this page helps narrow the choice and move faster to the right model.",
    countLabel: "Laptop categories",
    cardLabel: "Category",
    itemCountLabel: "products",
    sectionTitle: "Choose a laptop for the task you have",
    sectionDescription:
      "Compare study, office and home options, then continue with WhatsApp ordering across Kyrgyzstan.",
    catalogLabel: "Open catalog",
    contactLabel: "Contacts",
    highlights: [
      "Laptops for study, work and home",
      "Shortlists for students, teachers and offices",
      "Fast access to categories and catalog pages",
      "Manager support for stock and configuration",
    ],
    faqs: [
      {
        question: "Which laptop is suitable for a student or teacher?",
        answer:
          "For study and everyday work, light laptops with SSD storage and 8-16 GB RAM are usually the best fit. They are easy to carry and handle documents, browsers and video calls.",
      },
      {
        question: "What is better for office work?",
        answer:
          "Balanced laptops with good battery life are usually enough for office tasks, while design, editing and heavier multitasking need more powerful hardware.",
      },
      {
        question: "Can I order a laptop through WhatsApp from any region?",
        answer:
          "Yes. You can confirm stock, price and configuration with a manager and place the order from any region of Kyrgyzstan.",
      },
    ],
    keywords: [
      "laptops Kyrgyzstan",
      "laptop for students",
      "laptop for teachers",
      "office laptop",
      "buy laptop in Kyrgyzstan",
    ],
  },
  ky: {
    metaTitle: "Кыргызстанда студенттерге, мугалимдерге жана офиске ноутбуктар | TOMSTORE",
    metaDescription:
      "TOMSTORE Кыргызстан боюнча студенттерге, мугалимдерге, окууга, ишке жана бизнеске ылайыктуу ноутбуктарды сунуштайт. Тандоону жеңилдеткен өзүнчө барак.",
    eyebrow: "TOMSTORE Ноутбуктары",
    introTitle: "Студенттерге, мугалимдерге жана офиске ноутбуктар Кыргызстанда",
    introDescription:
      "Эгер сизге окуу, онлайн сабак, офис же үй үчүн ноутбук керек болсо, бул барак тандоону бат тарылтып, туура моделге тез өтүүгө жардам берет.",
    countLabel: "Ноутбук категориялары",
    cardLabel: "Категория",
    itemCountLabel: "товар",
    sectionTitle: "Керектүү ишке ылайыктуу ноутбук тандаңыз",
    sectionDescription:
      "Окуу, иш жана үй үчүн варианттарды салыштырып, андан кийин WhatsApp аркылуу Кыргызстан боюнча заказ кылсаңыз болот.",
    catalogLabel: "Каталогго өтүү",
    contactLabel: "Байланыш",
    highlights: [
      "Окуу, иш жана үй үчүн ноутбуктар",
      "Студенттерге, мугалимдерге жана офиске ылайыктуу тандоолор",
      "Категориялар менен каталогго тез өтүү",
      "Бар-жогу жана комплектация боюнча менеджердин жардамы",
    ],
    faqs: [
      {
        question: "Студентке же мугалимге кайсы ноутбук ылайыктуу?",
        answer:
          "Окуу жана күнүмдүк иш үчүн SSD жана 8-16 ГБ эс тутуму бар жеңил ноутбуктар жакшы ылайыктуу. Алар көтөрүп жүрүүгө оңой жана документ, браузер, видеосүйлөшүү үчүн жетиштүү.",
      },
      {
        question: "Офис үчүн эмне жакшы?",
        answer:
          "Офистик иштер үчүн ишенимдүү жана батареясы жакшы ноутбуктар жетиштүү. Дизайн, монтаж же оор көп тапшырма үчүн кубаттуураак модель керек.",
      },
      {
        question: "Ноутбукту WhatsApp аркылуу Кыргызстан боюнча заказ кылса болобу?",
        answer:
          "Ооба. Менеджер менен бар-жогун, баасын жана комплектациясын тактап, Кыргызстандагы каалаган аймактан заказ берсе болот.",
      },
    ],
    keywords: [
      "ноутбуктар Кыргызстан",
      "студент үчүн ноутбук",
      "мугалим үчүн ноутбук",
      "офис үчүн ноутбук",
      "ноутбук сатып алуу Кыргызстанда",
    ],
  },
};

const PRINTERS_HUB_CONTENT: Record<Locale, CatalogHubSeoContent> = {
  ru: {
    metaTitle: "Принтеры в Кыргызстане для дома, школы и офиса | TOMSTORE",
    metaDescription:
      "Принтеры TOMSTORE для дома, школы, офиса и бизнеса по всему Кыргызстану. Лазерные, струйные и МФУ в одном месте.",
    eyebrow: "Принтеры TOMSTORE",
    introTitle: "Принтеры для дома, школы и офиса в Кыргызстане",
    introDescription:
      "Если нужен принтер для документов, отчетов, учебных материалов или офисной печати, здесь собраны модели и подсказки, которые помогают выбрать подходящий вариант быстрее.",
    countLabel: "Категорий принтеров",
    cardLabel: "Категория",
    itemCountLabel: "товаров",
    sectionTitle: "Выберите принтер под нагрузку и задачу",
    sectionDescription:
      "Сравните модели для дома, школы и офиса, а затем уточните наличие и заказ через WhatsApp по всему Кыргызстану.",
    catalogLabel: "В каталог",
    contactLabel: "Контакты",
    highlights: [
      "Лазерные и струйные принтеры",
      "МФУ для школы, дома и офиса",
      "Подбор по нагрузке, расходникам и цене",
      "Быстрый заказ и консультация через WhatsApp",
    ],
    faqs: [
      {
        question: "Что выбрать для дома, школы или офиса?",
        answer:
          "Для дома часто достаточно компактного струйного или лазерного принтера. Для школы и офиса обычно лучше подходят лазерные модели и МФУ с более высокой скоростью печати.",
      },
      {
        question: "Чем отличается лазерный принтер от струйного?",
        answer:
          "Струйные модели удобны для небольших объемов и цветной печати, а лазерные лучше справляются с частой печатью документов и обычно проще в обслуживании.",
      },
      {
        question: "Можно ли уточнить наличие и расходники через WhatsApp?",
        answer:
          "Да. Можно сразу связаться с менеджером, уточнить цену, наличие, картриджи и быстро оформить заказ по Кыргызстану.",
      },
    ],
    keywords: [
      "принтеры Кыргызстан",
      "офисный принтер",
      "принтер для школы",
      "принтер для дома",
      "купить принтер в Кыргызстане",
    ],
  },
  en: {
    metaTitle: "Printers in Kyrgyzstan for home, school and office | TOMSTORE",
    metaDescription:
      "TOMSTORE printers for home, school, office and business across Kyrgyzstan. Compare laser, inkjet and multifunction devices in one place.",
    eyebrow: "TOMSTORE Printers",
    introTitle: "Printers for home, school and office in Kyrgyzstan",
    introDescription:
      "If you need a printer for documents, reports, homework or office printing, this page brings together the models and tips that make the choice faster.",
    countLabel: "Printer categories",
    cardLabel: "Category",
    itemCountLabel: "products",
    sectionTitle: "Choose a printer for the workload you have",
    sectionDescription:
      "Compare home, school and office options, then confirm stock and order through WhatsApp across Kyrgyzstan.",
    catalogLabel: "Open catalog",
    contactLabel: "Contacts",
    highlights: [
      "Laser and inkjet printers",
      "Multifunction devices for school, home and office",
      "Selection by workload, consumables and price",
      "Fast WhatsApp support and ordering",
    ],
    faqs: [
      {
        question: "What is best for home, school or office?",
        answer:
          "For home use, a compact inkjet or laser printer is often enough. For schools and offices, laser models and MFPs are usually better because they print faster and handle more pages.",
      },
      {
        question: "What is the difference between laser and inkjet?",
        answer:
          "Inkjet printers are good for smaller volumes and color jobs, while laser printers are better for frequent document printing and usually easier to maintain.",
      },
      {
        question: "Can I check stock and consumables through WhatsApp?",
        answer:
          "Yes. You can contact a manager, confirm price, stock and cartridges, and place an order from anywhere in Kyrgyzstan.",
      },
    ],
    keywords: [
      "printers Kyrgyzstan",
      "office printer",
      "printer for school",
      "printer for home",
      "buy printer in Kyrgyzstan",
    ],
  },
  ky: {
    metaTitle: "Кыргызстанда үйгө, мектепке жана офиске принтерлер | TOMSTORE",
    metaDescription:
      "TOMSTORE Кыргызстан боюнча үйгө, мектепке, офиске жана бизнеске ылайыктуу принтерлерди сунуштайт. Лазердик, сыя жана МФУ бир жерде.",
    eyebrow: "TOMSTORE Принтерлери",
    introTitle: "Үйгө, мектепке жана офиске принтерлер Кыргызстанда",
    introDescription:
      "Эгер документ, отчет, окуу материалы же офис басмасы үчүн принтер керек болсо, бул барак туура моделди тез тандоого жардам берген маалыматтарды топтойт.",
    countLabel: "Принтер категориялары",
    cardLabel: "Категория",
    itemCountLabel: "товар",
    sectionTitle: "Жүктөмгө ылайык принтерди тандаңыз",
    sectionDescription:
      "Үй, мектеп жана офис үчүн варианттарды салыштырып, андан кийин WhatsApp аркылуу Кыргызстан боюнча заказ кылсаңыз болот.",
    catalogLabel: "Каталогго өтүү",
    contactLabel: "Байланыш",
    highlights: [
      "Лазердик жана сыя принтерлер",
      "Үйгө, мектепке жана офиске МФУ",
      "Жүктөм, чыгымдалуучу материал жана баа боюнча тандоо",
      "WhatsApp аркылуу тез байланыш жана заказ",
    ],
    faqs: [
      {
        question: "Үйгө, мектепке же офиске эмне ылайыктуу?",
        answer:
          "Үй үчүн компакттуу сыя же лазер принтери жетиштүү болушу мүмкүн. Мектеп жана офис үчүн болсо ылдамыраак лазер моделдер жана МФУ жакшыраак иштейт.",
      },
      {
        question: "Лазердик жана сыя принтердин айырмасы эмнеде?",
        answer:
          "Сыя принтерлер азыраак көлөм жана түстүү басма үчүн ыңгайлуу, ал эми лазер принтерлер документти тез-тез басууга жана тейлөө жагынан жеңил болот.",
      },
      {
        question: "WhatsApp аркылуу бар-жогун жана чыгымдалуучу материалдарды тактасам болобу?",
        answer:
          "Ооба. Менеджер менен байланышып, баасын, бар-жогун жана картридждерин тактап, Кыргызстан боюнча заказ кылса болот.",
      },
    ],
    keywords: [
      "принтерлер Кыргызстан",
      "офис принтери",
      "мектеп үчүн принтер",
      "үйгө принтер",
      "принтер сатып алуу Кыргызстанда",
    ],
  },
};

const COMPUTERS_HUB_CONTENT: Record<Locale, CatalogHubSeoContent> = {
  ru: {
    metaTitle: "Компьютеры в Кыргызстане для офиса, учебы и бизнеса | TOMSTORE",
    metaDescription:
      "Компьютеры TOMSTORE для офиса, учебы, дома и бизнеса по всему Кыргызстану. Рабочие ПК, моноблоки и другие решения в одном месте.",
    eyebrow: "Компьютеры TOMSTORE",
    introTitle: "Компьютеры для офиса, учебы и бизнеса в Кыргызстане",
    introDescription:
      "Если нужен компьютер для рабочих задач, обучения, офиса или дома, здесь собраны категории и советы, которые помогают выбрать подходящую конфигурацию быстрее.",
    countLabel: "Категорий компьютеров",
    cardLabel: "Категория",
    itemCountLabel: "товаров",
    sectionTitle: "Выберите компьютер под сценарий использования",
    sectionDescription:
      "Сравните офисные, учебные и домашние варианты, а затем оформите заказ через WhatsApp по всему Кыргызстану.",
    catalogLabel: "В каталог",
    contactLabel: "Контакты",
    highlights: [
      "Компьютеры для офиса, учебы и дома",
      "Подбор под рабочие и бизнес-сценарии",
      "Быстрый переход к категориям и каталогу",
      "Помощь менеджера с конфигурацией и наличием",
    ],
    faqs: [
      {
        question: "Какой компьютер подходит для офиса?",
        answer:
          "Для офиса обычно хватает сбалансированного компьютера с SSD, достаточным объемом памяти и быстрым запуском приложений для документов, таблиц и видеосвязи.",
      },
      {
        question: "Что выбрать для дома или учебы?",
        answer:
          "Для дома и учебы удобно брать надежный компьютер с понятной конфигурацией, который справляется с браузером, обучающими сервисами и повседневными задачами.",
      },
      {
        question: "Можно ли заказать компьютер через WhatsApp по Кыргызстану?",
        answer:
          "Да. Можно обсудить конфигурацию с менеджером, уточнить цену и наличие и быстро оформить заказ из любого региона Кыргызстана.",
      },
    ],
    keywords: [
      "компьютеры Кыргызстан",
      "офисный компьютер",
      "компьютер для дома",
      "компьютер для учебы",
      "купить компьютер в Кыргызстане",
    ],
  },
  en: {
    metaTitle: "Computers in Kyrgyzstan for office, study and business | TOMSTORE",
    metaDescription:
      "TOMSTORE computers for office, study, home and business across Kyrgyzstan. Work PCs, all-in-ones and other desktop solutions in one place.",
    eyebrow: "TOMSTORE Computers",
    introTitle: "Computers for office, study and business in Kyrgyzstan",
    introDescription:
      "If you need a computer for work, study, office use or home, this page collects the categories and guidance that make the choice faster.",
    countLabel: "Computer categories",
    cardLabel: "Category",
    itemCountLabel: "products",
    sectionTitle: "Choose a computer for the use case you need",
    sectionDescription:
      "Compare office, study and home options, then place the order through WhatsApp across Kyrgyzstan.",
    catalogLabel: "Open catalog",
    contactLabel: "Contacts",
    highlights: [
      "Computers for office, study and home",
      "Selection for work and business scenarios",
      "Fast access to categories and catalog pages",
      "Manager support for configuration and stock",
    ],
    faqs: [
      {
        question: "Which computer fits office work?",
        answer:
          "For office work, a balanced computer with SSD storage, enough memory and fast startup is usually enough for documents, spreadsheets and video calls.",
      },
      {
        question: "What should I choose for home or study?",
        answer:
          "For home and study, a reliable computer with a practical configuration is usually enough for browsers, learning services and daily tasks.",
      },
      {
        question: "Can I order a computer through WhatsApp from any region?",
        answer:
          "Yes. You can discuss the configuration with a manager, confirm price and stock, and place the order from any region of Kyrgyzstan.",
      },
    ],
    keywords: [
      "computers Kyrgyzstan",
      "office computer",
      "home computer",
      "study computer",
      "buy computer in Kyrgyzstan",
    ],
  },
  ky: {
    metaTitle: "Кыргызстанда офиске, окууга жана бизнеске компьютерлер | TOMSTORE",
    metaDescription:
      "TOMSTORE Кыргызстан боюнча офиске, окууга, үйгө жана бизнеске ылайыктуу компьютерлерди сунуштайт. Иштөөчү ПК, моноблок жана башка чечимдер.",
    eyebrow: "TOMSTORE Компьютерлери",
    introTitle: "Офиске, окууга жана бизнеске компьютерлер Кыргызстанда",
    introDescription:
      "Эгер жумуш, окуу, офис же үй үчүн компьютер керек болсо, бул барак туура конфигурацияны бат тандоого жардам берген категорияларды жана кеңештерди топтойт.",
    countLabel: "Компьютер категориялары",
    cardLabel: "Категория",
    itemCountLabel: "товар",
    sectionTitle: "Колдонуу сценарийине ылайык компьютер тандаңыз",
    sectionDescription:
      "Офистик, окуу жана үй варианттарын салыштырып, андан кийин WhatsApp аркылуу Кыргызстан боюнча заказ берсе болот.",
    catalogLabel: "Каталогго өтүү",
    contactLabel: "Байланыш",
    highlights: [
      "Офиске, окууга жана үйгө компьютерлер",
      "Жумуш жана бизнес сценарийлерине ылайык тандоо",
      "Категориялар менен каталогго тез өтүү",
      "Конфигурация жана бар-жогу боюнча менеджердин жардамы",
    ],
    faqs: [
      {
        question: "Офистик иш үчүн кайсы компьютер ылайыктуу?",
        answer:
          "Офис үчүн SSD, жетиштүү эс тутум жана тез ишке кирген конфигурациясы бар компьютер жетиштүү болот. Бул документ, таблица жана видеосүйлөшүү үчүн ыңгайлуу.",
      },
      {
        question: "Үйгө же окууга эмне тандаса болот?",
        answer:
          "Үй жана окуу үчүн браузер, окуу кызматтары жана күнүмдүк иштерди алып кете турган ишенимдүү компьютер туура келет.",
      },
      {
        question: "WhatsApp аркылуу Кыргызстан боюнча компьютер заказ кылсам болобу?",
        answer:
          "Ооба. Менеджер менен конфигурациясын талкуулап, баасын жана бар-жогун тактап, Кыргызстандагы каалаган аймактан заказ берсе болот.",
      },
    ],
    keywords: [
      "компьютерлер Кыргызстан",
      "офис компьютер",
      "үйгө компьютер",
      "окууга компьютер",
      "компьютер сатып алуу Кыргызстанда",
    ],
  },
};

export const getLaptopsHubSeoContent = (locale: Locale): CatalogHubSeoContent =>
  getLocalizedHubContent(locale, LAPTOPS_HUB_CONTENT);

export const getPrintersHubSeoContent = (locale: Locale): CatalogHubSeoContent =>
  getLocalizedHubContent(locale, PRINTERS_HUB_CONTENT);

export const getComputersHubSeoContent = (locale: Locale): CatalogHubSeoContent =>
  getLocalizedHubContent(locale, COMPUTERS_HUB_CONTENT);
