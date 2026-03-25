import type { Locale } from "@/i18n/messages";

export type SeoFaqItem = {
  question: string;
  answer: string;
};

export type HomeSeoContent = {
  metaTitle: string;
  metaDescription: string;
  introEyebrow: string;
  introTitle: string;
  introDescription: string;
  catalogLabel: string;
  contactLabel: string;
  highlights: string[];
  faqs: SeoFaqItem[];
};

export type CatalogLandingSeoContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  introTitle: string;
  introDescription: string;
  summaryTitle: string;
  summaryDescription: string;
  countLabel: string;
  catalogLabel: string;
  contactLabel: string;
  highlights: string[];
  guideTitle: string;
  guideParagraphs: string[];
  faqs: SeoFaqItem[];
  keywords: string[];
};

export type CatalogHubSeoContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  introTitle: string;
  introDescription: string;
  countLabel: string;
  cardLabel: string;
  itemCountLabel: string;
  sectionTitle: string;
  sectionDescription: string;
  catalogLabel: string;
  contactLabel: string;
  highlights: string[];
  faqs: SeoFaqItem[];
  keywords: string[];
};

export type BlogLandingSeoContent = CatalogLandingSeoContent;

const HOME_SEO_CONTENT: Record<Locale, HomeSeoContent> = {
  ru: {
    metaTitle: "Купить ноутбук, принтер и электронику в Бишкеке",
    metaDescription:
      "TOMSTORE - интернет-магазин ноутбуков, принтеров, компьютеров и электроники в Бишкеке. Актуальные модели, выгодные цены и быстрый заказ через WhatsApp.",
    introEyebrow: "TOMSTORE SEO",
    introTitle: "Ноутбуки, принтеры и электроника в Бишкеке",
    introDescription:
      "В TOMSTORE можно подобрать ноутбук для учебы и работы, офисный или домашний принтер, компьютеры, мониторы и другую электронику с быстрой консультацией менеджера и удобным заказом через WhatsApp.",
    catalogLabel: "В каталог",
    contactLabel: "Контакты",
    highlights: [
      "Каталог ноутбуков для учебы, бизнеса, дизайна и игр",
      "Принтеры и офисная техника для дома, школы и компании",
      "Аксессуары, компьютеры и электроника с понятным выбором",
      "Быстрая консультация, актуальные цены и помощь менеджера",
    ],
    faqs: [
      {
        question: "Как выбрать ноутбук для учебы и работы?",
        answer:
          "Ориентируйтесь на задачи: для учебы и офиса подойдут легкие модели с SSD и 8-16 ГБ оперативной памяти, для дизайна и монтажа лучше выбирать более мощные ноутбуки с хорошим экраном.",
      },
      {
        question: "Какой принтер лучше купить для дома или офиса?",
        answer:
          "Для дома чаще выбирают компактные струйные или лазерные модели, а для офиса - лазерные принтеры и МФУ с более высокой скоростью печати и удобной заправкой.",
      },
      {
        question: "Можно ли заказать технику через WhatsApp?",
        answer:
          "Да, на сайте можно сразу перейти в WhatsApp, уточнить наличие, цену, комплектацию и быстро оформить заказ через менеджера.",
      },
      {
        question: "Есть ли в магазине электроника помимо ноутбуков и принтеров?",
        answer:
          "Да, в каталоге TOMSTORE есть компьютеры, мониторы, аксессуары и другая востребованная электроника для дома, учебы и бизнеса.",
      },
    ],
  },
  en: {
    metaTitle: "Buy laptops, printers and electronics in Bishkek",
    metaDescription:
      "TOMSTORE is an electronics store in Bishkek with laptops, printers, computers and accessories, clear prices and fast ordering via WhatsApp.",
    introEyebrow: "TOMSTORE SEO",
    introTitle: "Laptops, printers and electronics in Bishkek",
    introDescription:
      "TOMSTORE helps customers choose laptops for study and work, printers for home and office, computers, monitors and everyday electronics with quick manager support and easy WhatsApp ordering.",
    catalogLabel: "Open catalog",
    contactLabel: "Contacts",
    highlights: [
      "Laptops for study, office work, gaming and creative tasks",
      "Printers and office equipment for home, school and business",
      "Computers, accessories and electronics in one catalog",
      "Fast manager support, clear prices and quick ordering",
    ],
    faqs: [
      {
        question: "How do I choose a laptop for study or work?",
        answer:
          "Choose based on workload: light notebooks with SSD storage and 8-16 GB RAM fit study and office tasks, while design and editing need more powerful hardware and a better display.",
      },
      {
        question: "Which printer is better for home or office?",
        answer:
          "Home users usually prefer compact inkjet or laser models, while offices often need laser printers or multifunction devices with faster printing and easier maintenance.",
      },
      {
        question: "Can I place an order through WhatsApp?",
        answer:
          "Yes. The storefront can send customers directly to WhatsApp, where they can confirm availability, price and configuration with a manager and place the order quickly.",
      },
      {
        question: "Do you sell more than laptops and printers?",
        answer:
          "Yes. TOMSTORE also offers computers, monitors, accessories and other electronics for home, education and business needs.",
      },
    ],
  },
  ky: {
    metaTitle: "Бишкектен ноутбук, принтер жана электроника сатып алуу",
    metaDescription:
      "TOMSTORE - Бишкектеги ноутбук, принтер, компьютер жана электроника дүкөнү. Ыңгайлуу тандоо, актуалдуу баа жана WhatsApp аркылуу тез заказ.",
    introEyebrow: "TOMSTORE SEO",
    introTitle: "Ноутбук, принтер жана электроника",
    introDescription:
      "TOMSTORE окуу, иш, офис жана үй үчүн ноутбук, принтер, компьютер, монитор жана башка электрониканы тандап берүүгө жардам берет. Заказды WhatsApp аркылуу тез тактоого болот.",
    catalogLabel: "Каталогго өтүү",
    contactLabel: "Байланыш",
    highlights: [
      "Окуу, иш жана оюн үчүн ноутбуктар",
      "Үйгө жана офиске принтерлер менен оргтехника",
      "Компьютерлер, аксессуарлар жана керектүү электроника",
      "Менеджерден тез кеңеш жана ыңгайлуу заказ",
    ],
    faqs: [
      {
        question: "Окууга же ишке ноутбукту кантип тандаса болот?",
        answer:
          "Максатка жараша тандаңыз: окуу жана офис үчүн SSD жана 8-16 ГБ эс тутуму бар жеңил моделдер ылайыктуу, ал эми дизайн же монтаж үчүн кубаттуу ноутбук керек.",
      },
      {
        question: "Үйгө же офиске кайсы принтер жакшы?",
        answer:
          "Үй үчүн көбүнчө компакттуу сыя же лазер принтерлер ылайыктуу, ал эми офис үчүн ылдамдыгы жогору лазер принтер же МФУ ыңгайлуу болот.",
      },
      {
        question: "Заказды WhatsApp аркылуу берсе болобу?",
        answer:
          "Ооба, сайттан түз эле WhatsAppка өтүп, баасын, бар-жогун жана комплектин менеджер менен тактап, тез заказ кылса болот.",
      },
      {
        question: "Ноутбук менен принтерден башка электроника барбы?",
        answer:
          "Ооба, TOMSTORE каталогунда компьютерлер, мониторлор, аксессуарлар жана күнүмдүк суроо-талаптагы башка электроника да бар.",
      },
    ],
  },
};

export const getHomeSeoContent = (locale: Locale): HomeSeoContent =>
  HOME_SEO_CONTENT[locale] || HOME_SEO_CONTENT.ru;

export const getCategorySeoContent = (
  locale: Locale,
  categoryName: string,
): CatalogLandingSeoContent => {
  switch (locale) {
    case "en":
      return {
        metaTitle: `${categoryName} in Bishkek - TOMSTORE catalog`,
        metaDescription: `Browse the ${categoryName} category at TOMSTORE with current availability, clear prices and quick ordering through WhatsApp in Bishkek.`,
        eyebrow: "TOMSTORE Category",
        introTitle: `${categoryName} in the TOMSTORE catalog`,
        introDescription: `This page brings together products from the ${categoryName} category, making it easier to compare models, check availability and quickly choose the right option for home, study, office or business.`,
        summaryTitle: `${categoryName} collection`,
        summaryDescription: `The dedicated category page keeps the assortment focused, so customers can move through the ${categoryName} range faster and reach a decision without extra navigation.`,
        countLabel: "Products in collection",
        catalogLabel: "Full catalog",
        contactLabel: "Talk to manager",
        highlights: [
          `Focused landing page for ${categoryName}`,
          "Current availability and ordering through WhatsApp",
          "Faster comparison inside one product category",
          "Manager support when you need a quicker shortlist",
        ],
        guideTitle: `How to choose products in ${categoryName}`,
        guideParagraphs: [
          `Start with the main use case: everyday needs, study, office work or a more demanding business setup. This narrows the product set before comparing specific models in ${categoryName}.`,
          `If you want a faster recommendation, use the catalog filters and then confirm availability, configuration and delivery details with the TOMSTORE manager before ordering.`,
        ],
        faqs: [
          {
            question: `What should I compare in the ${categoryName} category first?`,
            answer:
              "Focus on the practical criteria first: performance, size, compatibility, stock status and price. After that, compare the details that matter to your scenario.",
          },
          {
            question: `Can I confirm stock and price for ${categoryName} before ordering?`,
            answer:
              "Yes. The page helps narrow the selection, and the manager can confirm current stock, price and configuration through WhatsApp before the order is placed.",
          },
          {
            question: `Is this page useful for both retail and office purchases?`,
            answer:
              "Yes. A dedicated category page works for single-item purchases as well as for faster selection of options for office, school or business needs.",
          },
        ],
        keywords: [
          categoryName,
          `${categoryName} Bishkek`,
          `${categoryName} TOMSTORE`,
          `buy ${categoryName}`,
        ],
      };
    case "ky":
      return {
        metaTitle: `${categoryName} Бишкекте - TOMSTORE каталогу`,
        metaDescription: `TOMSTORE дүкөнүндөгү «${categoryName}» категориясы: актуалдуу ассортимент, баалар, бар-жогу жана WhatsApp аркылуу тез заказ.`,
        eyebrow: "TOMSTORE Категориясы",
        introTitle: `TOMSTORE каталогунда ${categoryName}`,
        introDescription: `Бул баракка «${categoryName}» категориясындагы товарлар чогултулган. Моделдерди салыштырып, бар-жогун текшерип, үйгө, окууга, офиске же бизнеске ылайыктуу вариантты тез табууга болот.`,
        summaryTitle: `«${categoryName}» боюнча өзүнчө подборка`,
        summaryDescription: `Өзүнчө категория барагы керектүү товарларды жалпы каталогдон издеп убара болбой, ошол эле бөлүмдүн ичинде ылдам карап чыгууга жардам берет.`,
        countLabel: "Подборкадагы товарлар",
        catalogLabel: "Толук каталог",
        contactLabel: "Менеджерге жазуу",
        highlights: [
          `«${categoryName}» үчүн өзүнчө барак`,
          "Бар-жогун жана заказды WhatsApp аркылуу тез тактоо",
          "Бир эле категориянын ичинде ыңгайлуу салыштыруу",
          "Тандоону тездетүү үчүн менеджердин жардамы",
        ],
        guideTitle: `«${categoryName}» категориясында кантип тандоо керек`,
        guideParagraphs: [
          `Адегенде кайсы тапшырма үчүн товар керек экенин аныктаңыз: үй, окуу, офис же бизнес. Ошондо «${categoryName}» ичиндеги керектүү варианттарды бат бөлүп алууга болот.`,
          `Эгер тез тандоо керек болсо, фильтрлерди колдонуп, андан кийин менеджер менен баасын, бар-жогун жана ылайыктуу комплектациясын тактап коюңуз.`,
        ],
        faqs: [
          {
            question: `«${categoryName}» категориясында эмнени биринчи салыштыруу керек?`,
            answer:
              "Алгач негизги көрсөткүчтөрдү салыштырыңыз: мүнөздөмө, өлчөм, шайкештик, бар-жогу жана баа. Андан кийин сизге маанилүү болгон кошумча өзгөчөлүктөрдү караңыз.",
          },
          {
            question: `Заказдан мурун «${categoryName}» боюнча бааны жана бар-жогун тактаса болобу?`,
            answer:
              "Ооба. Барак керектүү позицияларды тандап алууга жардам берет, андан кийин менеджер WhatsApp аркылуу актуалдуу бааны, бар-жогун жана комплектациясын тактап берет.",
          },
          {
            question: `Бул барак жеке кардарларга да, офис үчүн алууга да ылайыктуубу?`,
            answer:
              "Ооба. Өзүнчө категория барагы бир даана товар тандаганда да, офис же бизнес үчүн бир нече вариантты ылдам салыштырганда да ыңгайлуу.",
          },
        ],
        keywords: [
          categoryName,
          `${categoryName} Бишкек`,
          `${categoryName} TOMSTORE`,
          `${categoryName} сатып алуу`,
        ],
      };
    case "ru":
    default:
      return {
        metaTitle: `${categoryName} в Бишкеке - купить в TOMSTORE`,
        metaDescription: `Категория «${categoryName}» в TOMSTORE: актуальные модели, наличие, цены и быстрый заказ техники через WhatsApp в Бишкеке.`,
        eyebrow: "Категория TOMSTORE",
        introTitle: `${categoryName} в каталоге TOMSTORE`,
        introDescription: `На этой странице собраны товары из категории «${categoryName}». Здесь удобно сравнить модели, проверить наличие и быстро подобрать подходящий вариант для дома, учебы, офиса или бизнеса.`,
        summaryTitle: `Подборка категории «${categoryName}»`,
        summaryDescription: `Отдельная страница категории помогает быстрее пройти по ассортименту, увидеть актуальные позиции и не теряться внутри общего каталога.`,
        countLabel: "Товаров в подборке",
        catalogLabel: "Весь каталог",
        contactLabel: "Связаться с менеджером",
        highlights: [
          `Актуальные товары из категории «${categoryName}»`,
          "Наличие и заказ через WhatsApp без лишних шагов",
          "Быстрое сравнение моделей внутри одной категории",
          "Помощь менеджера, если нужен короткий шортлист",
        ],
        guideTitle: `Как выбрать товары в категории «${categoryName}»`,
        guideParagraphs: [
          `Сначала определите задачу: техника для дома, учебы, офиса или бизнеса. Так проще быстро отсечь лишние позиции и сравнивать только действительно подходящие товары в категории «${categoryName}».`,
          `Если нужен быстрый подбор, используйте фильтры каталога и затем уточните у менеджера TOMSTORE наличие, цену и комплектацию через WhatsApp перед оформлением заказа.`,
        ],
        faqs: [
          {
            question: `Что в категории «${categoryName}» стоит сравнить в первую очередь?`,
            answer:
              "Сначала сравните ключевые параметры: характеристики, размер, совместимость, наличие и цену. После этого уже имеет смысл смотреть на дополнительные опции и нюансы комплектации.",
          },
          {
            question: `Можно ли уточнить наличие и цену по категории «${categoryName}» перед заказом?`,
            answer:
              "Да. Страница помогает отобрать нужные позиции, а менеджер TOMSTORE может через WhatsApp подтвердить актуальную цену, наличие и подходящую комплектацию перед заказом.",
          },
          {
            question: `Подходит ли эта страница для розничных и офисных закупок?`,
            answer:
              "Да. Отдельная страница категории удобна как для выбора одного товара, так и для быстрого сравнения нескольких вариантов под офис, школу или бизнес-задачи.",
          },
        ],
        keywords: [
          categoryName,
          `${categoryName} Бишкек`,
          `${categoryName} TOMSTORE`,
          `купить ${categoryName}`,
        ],
      };
  }
};

export const getBrandSeoContent = (
  locale: Locale,
  brandName: string,
): CatalogLandingSeoContent => {
  switch (locale) {
    case "en":
      return {
        metaTitle: `${brandName} in TOMSTORE - brand catalog`,
        metaDescription: `Explore the ${brandName} brand page at TOMSTORE with current models, clear prices, availability and fast ordering through WhatsApp.`,
        eyebrow: "TOMSTORE Brand",
        introTitle: `${brandName} in the TOMSTORE catalog`,
        introDescription: `This page groups together products from the ${brandName} brand so customers can stay within one brand, compare available models and make a faster buying decision.`,
        summaryTitle: `Why use the ${brandName} brand page`,
        summaryDescription: `A dedicated brand page gives a cleaner path to the full ${brandName} assortment and reduces friction compared with browsing the entire catalog.`,
        countLabel: "Brand products",
        catalogLabel: "Full catalog",
        contactLabel: "Talk to manager",
        highlights: [
          `Separate landing page for ${brandName}`,
          "Current pricing and availability in one place",
          "Faster brand-level comparison before ordering",
          "Manager support for configuration and stock questions",
        ],
        guideTitle: `How to choose ${brandName} products`,
        guideParagraphs: [
          `Start by deciding what matters most inside the ${brandName} lineup: performance, format, compatibility, price or delivery timing. That makes the shortlist smaller and easier to compare.`,
          `If you already know the brand but not the exact model, the brand page is the fastest route to compare available options and confirm the final setup with the TOMSTORE manager.`,
        ],
        faqs: [
          {
            question: `Why open a dedicated ${brandName} page instead of the full catalog?`,
            answer:
              "Because it removes unrelated items and keeps the comparison focused on one brand, which usually makes the buying process faster.",
          },
          {
            question: `Can I confirm the current ${brandName} assortment before ordering?`,
            answer:
              "Yes. The manager can confirm which ${brandName} models are currently available, what configurations they have and which option fits the task best.",
          },
          {
            question: `Does the ${brandName} page work for both personal and office purchases?`,
            answer:
              "Yes. It is useful for retail customers and for teams that need to shortlist several models from one brand for office or business use.",
          },
        ],
        keywords: [
          brandName,
          `${brandName} Bishkek`,
          `${brandName} TOMSTORE`,
          `${brandName} catalog`,
        ],
      };
    case "ky":
      return {
        metaTitle: `${brandName} TOMSTORE каталогунда`,
        metaDescription: `${brandName} брендинин барагы TOMSTORE дүкөнүндө: актуалдуу модельдер, баалар, бар-жогу жана WhatsApp аркылуу тез заказ.`,
        eyebrow: "TOMSTORE Бренди",
        introTitle: `TOMSTORE каталогунда ${brandName}`,
        introDescription: `Бул баракка ${brandName} брендиндеги товарлар чогултулган. Бир бренддин ичинде моделдерди салыштырып, керектүүсүн тез табууга жана заказ алдында маалыматты тактоого ыңгайлуу.`,
        summaryTitle: `Эмне үчүн ${brandName} барагы пайдалуу`,
        summaryDescription: `Өзүнчө бренд барагы жалпы каталогду аралабай эле ${brandName} ассортиментинин баарын бир жерден көрүүгө мүмкүнчүлүк берет.`,
        countLabel: "Бренд товарлары",
        catalogLabel: "Толук каталог",
        contactLabel: "Менеджерге жазуу",
        highlights: [
          `${brandName} үчүн өзүнчө барак`,
          "Актуалдуу баалар жана бар-жогу бир жерде",
          "Бир бренддин ичинде ыңгайлуу салыштыруу",
          "Комплектация жана заказ боюнча менеджердин жардамы",
        ],
        guideTitle: `${brandName} товарларын кантип тандоо керек`,
        guideParagraphs: [
          `Алгач ${brandName} ичинен кайсы нерсе маанилүүрөөк экенин аныктаңыз: өндүрүмдүүлүк, формат, шайкештик, баа же жеткирүү мөөнөтү. Ошондо керектүү моделдерди бат бөлүп алууга болот.`,
          `Эгер бренд белгилүү болуп, бирок так модель али тандалбаса, ушул барак ылайыктуу варианттарды тез салыштырып, акыркы чечимди менеджер менен тактоого жардам берет.`,
        ],
        faqs: [
          {
            question: `Эмне үчүн жалпы каталогдун ордуна ${brandName} барагын ачкан ыңгайлуу?`,
            answer:
              "Анткени бул жерде башка товарлар аралашпайт жана тандоо бир бренддин ичинде эле жүрөт. Натыйжада салыштыруу да, чечим кабыл алуу да тезирээк болот.",
          },
          {
            question: `Заказдан мурун ${brandName} ассортиментинин актуалдуулугун тактаса болобу?`,
            answer:
              "Ооба. Менеджер учурда бар болгон ${brandName} моделдерин, конфигурацияларын жана кайсы вариант жакшыраак туура келерин тактап бере алат.",
          },
          {
            question: `${brandName} барагы жеке кардарларга да, офиске да ылайыктуубу?`,
            answer:
              "Ооба. Бул барак бир товар тандаганда да, офис же бизнес үчүн бир бренддин ичинен бир нече моделди салыштырганда да пайдалуу.",
          },
        ],
        keywords: [
          brandName,
          `${brandName} Бишкек`,
          `${brandName} TOMSTORE`,
          `${brandName} каталогу`,
        ],
      };
    case "ru":
    default:
      return {
        metaTitle: `${brandName} в TOMSTORE - каталог бренда`,
        metaDescription: `Страница бренда ${brandName} в TOMSTORE: актуальные модели, цены, наличие и быстрый заказ техники через WhatsApp.`,
        eyebrow: "Бренд TOMSTORE",
        introTitle: `${brandName} в каталоге TOMSTORE`,
        introDescription: `На этой странице собрана техника бренда ${brandName}. Здесь удобно держать фокус на одном бренде, сравнивать доступные модели и быстрее принимать решение о покупке.`,
        summaryTitle: `Почему удобна страница бренда ${brandName}`,
        summaryDescription: `Отдельный брендовый лендинг сокращает путь до нужного ассортимента и помогает быстрее пройти от выбора к заказу без лишних переходов по каталогу.`,
        countLabel: "Товаров бренда",
        catalogLabel: "Весь каталог",
        contactLabel: "Связаться с менеджером",
        highlights: [
          `Отдельная подборка бренда ${brandName}`,
          "Актуальные цены и наличие в одном месте",
          "Быстрое сравнение моделей внутри бренда",
          "Помощь менеджера по наличию и комплектации",
        ],
        guideTitle: `Как выбирать технику ${brandName}`,
        guideParagraphs: [
          `Сначала определите, что важнее именно для вас внутри линейки ${brandName}: производительность, формат, совместимость, цена или срок поставки. Так выбор становится заметно быстрее.`,
          `Если бренд уже выбран, но модель ещё не определена, отдельная страница ${brandName} помогает быстро сравнить доступные позиции и затем уточнить у менеджера наличие и финальную комплектацию.`,
        ],
        faqs: [
          {
            question: `Зачем открывать страницу ${brandName}, а не весь каталог?`,
            answer:
              "Потому что на отдельной странице бренда нет лишних товаров. Это ускоряет сравнение моделей и помогает быстрее принять решение внутри одной линейки.",
          },
          {
            question: `Можно ли перед заказом уточнить актуальный ассортимент ${brandName}?`,
            answer:
              "Да. Менеджер TOMSTORE может подтвердить, какие модели ${brandName} доступны сейчас, какие есть конфигурации и что лучше подходит под вашу задачу.",
          },
          {
            question: `Подходит ли страница бренда для личных и корпоративных покупок?`,
            answer:
              "Да. Такой лендинг удобен как для розничного выбора, так и для офисных закупок, когда нужно быстро собрать несколько вариантов внутри одного бренда.",
          },
        ],
        keywords: [
          brandName,
          `${brandName} Бишкек`,
          `${brandName} TOMSTORE`,
          `${brandName} каталог`,
        ],
      };
  }
};

export const getBlogsLandingSeoContent = (
  locale: Locale,
): BlogLandingSeoContent => {
  switch (locale) {
    case "en":
      return {
        metaTitle: "TOMSTORE blog: electronics guides and buying tips",
        metaDescription:
          "Read the TOMSTORE blog with product guides, buying advice, comparisons and practical tips for laptops, printers, computers and electronics.",
        eyebrow: "TOMSTORE Blog",
        introTitle: "TOMSTORE blog with reviews, guides and practical advice",
        introDescription:
          "The blog collects helpful materials for customers who want to understand the difference between models, choose electronics faster and buy with fewer mistakes.",
        summaryTitle: "Why the TOMSTORE blog is useful before buying",
        summaryDescription:
          "Articles help users move from broad demand to a clearer shortlist, which supports both SEO visibility and stronger internal linking between content and catalog pages.",
        countLabel: "Articles in the blog",
        catalogLabel: "All articles",
        contactLabel: "Talk to manager",
        highlights: [
          "Reviews and comparisons of popular electronics",
          "Buying guides for laptops, printers and office equipment",
          "Helpful materials for home, study, work and business needs",
          "Internal links from content to catalog and product pages",
        ],
        guideTitle: "What users can find in the TOMSTORE blog",
        guideParagraphs: [
          "The blog covers practical selection scenarios, product comparisons and purchase tips so users can understand which model category fits their tasks before they open the catalog.",
          "It also supports content-driven traffic: readers can move from a useful article to a focused category page, a product listing or a specific product card without unnecessary navigation.",
        ],
        faqs: [
          {
            question: "What kind of articles are published in the TOMSTORE blog?",
            answer:
              "The blog focuses on product reviews, comparisons, selection advice and practical explanations related to laptops, printers, computers and popular electronics.",
          },
          {
            question: "Can the blog help before opening the catalog?",
            answer:
              "Yes. Articles are designed to narrow the choice first, so visitors can move to the catalog with a clearer understanding of what type of device or configuration they need.",
          },
          {
            question: "Does the blog connect to product and category pages?",
            answer:
              "Yes. The blog improves internal linking by sending readers to the main blog hub, category landings, product collections and product detail pages.",
          },
        ],
        keywords: [
          "TOMSTORE blog",
          "electronics blog Bishkek",
          "laptop buying guide",
          "printer buying advice",
        ],
      };
    case "ky":
      return {
        metaTitle: "TOMSTORE блогу: техника боюнча кеңештер жана материалдар",
        metaDescription:
          "TOMSTORE блогунда ноутбук, принтер, компьютер жана электроника боюнча обзорлор, тандоо кеңештери жана пайдалуу материалдар жарыяланат.",
        eyebrow: "TOMSTORE Блогу",
        introTitle: "TOMSTORE блогу: обзорлор, салыштыруулар жана кеңештер",
        introDescription:
          "Бул бөлүм керектүү техниканы түшүнүктүүрөөк тандап алууга жардам берген материалдарды чогултат: кайсы модель кимге ылайыктуу, эмнени салыштыруу керек жана сатып алууда эмнеге көңүл буруу маанилүү.",
        summaryTitle: "Эмне үчүн TOMSTORE блогун окуу пайдалуу",
        summaryDescription:
          "Блог суроо-талапты тактоого жардам берет: окурман пайдалуу макаладан кийин туура категорияга, подборкага же конкреттүү товарга тез өтө алат.",
        countLabel: "Блогдогу макалалар",
        catalogLabel: "Бардык макалалар",
        contactLabel: "Менеджерге жазуу",
        highlights: [
          "Популярдуу техника боюнча обзорлор жана салыштыруулар",
          "Ноутбук, принтер жана оргтехника тандоо боюнча кеңештер",
          "Үйгө, окууга, ишке жана бизнеске ылайыктуу материалдар",
          "Макалалардан каталогго жана товар барактарына ички шилтемелер",
        ],
        guideTitle: "TOMSTORE блогунан эмнени табууга болот",
        guideParagraphs: [
          "Бул жерде практикалык тандоо сценарийлери, моделдердин салыштыруулары жана сатып алууга чейинки пайдалуу түшүндүрмөлөр бар. Мунун баары каталогго кирерден мурун туура багытты түшүнүүгө жардам берет.",
          "Контент SEO жагынан да пайдалуу: колдонуучу макаладан түз эле блог-хабга, category page'ге, подборкага же конкреттүү товар барагына өтө алат.",
        ],
        faqs: [
          {
            question: "TOMSTORE блогунда кандай макалалар чыгат?",
            answer:
              "Негизинен техника боюнча обзорлор, салыштыруулар, тандоо кеңештери жана ноутбук, принтер, компьютер жана күнүмдүк электроника боюнча пайдалуу түшүндүрмөлөр чыгат.",
          },
          {
            question: "Блог каталогго кирерден мурун жардам бере алабы?",
            answer:
              "Ооба. Макалалар алгач керектүү багытты тактоого жардам берет, андан кийин колдонуучу каталогго даяр суроо-талап менен өтөт.",
          },
          {
            question: "Блогдон категорияларга жана товарларга өтүүгө болобу?",
            answer:
              "Ооба. Блогдун ичинде негизги блог-баракка, category landing page'лерге, подборкаларга жана товар карточкаларына ички шилтемелер бар.",
          },
        ],
        keywords: [
          "TOMSTORE блогу",
          "электроника блогу Бишкек",
          "ноутбук тандоо кеңеши",
          "принтер тандоо боюнча макала",
        ],
      };
    case "ru":
    default:
      return {
        metaTitle: "Блог TOMSTORE: обзоры техники и советы по выбору",
        metaDescription:
          "Читайте блог TOMSTORE: обзоры техники, советы по выбору ноутбуков, принтеров и компьютеров, сравнения моделей и полезные материалы перед покупкой.",
        eyebrow: "Блог TOMSTORE",
        introTitle: "Блог TOMSTORE с обзорами, советами и полезными материалами",
        introDescription:
          "В блоге TOMSTORE собраны статьи, которые помогают быстрее разобраться в технике, сравнить варианты и перейти к покупке с более понятным запросом и коротким списком моделей.",
        summaryTitle: "Чем полезен блог TOMSTORE перед покупкой",
        summaryDescription:
          "Контентный раздел усиливает SEO по информационным запросам и помогает переводить читателя из статьи в категорию, подборку или конкретный товар без лишних шагов.",
        countLabel: "Статей в блоге",
        catalogLabel: "Все статьи",
        contactLabel: "Связаться с менеджером",
        highlights: [
          "Обзоры и сравнения актуальной техники",
          "Советы по выбору ноутбуков, принтеров и офисных решений",
          "Полезные материалы для дома, учебы, работы и бизнеса",
          "Внутренняя перелинковка из контента в каталог и карточки товаров",
        ],
        guideTitle: "Что можно найти в блоге TOMSTORE",
        guideParagraphs: [
          "Здесь собраны практические статьи по выбору техники, объяснения отличий между моделями и советы, которые помогают понять, какой тип устройства нужен под конкретную задачу ещё до перехода в каталог.",
          "Блог также работает как SEO-хаб: из материалов пользователь может перейти в общий список статей, тематическую category page, товарную подборку или сразу в карточку интересующего товара.",
        ],
        faqs: [
          {
            question: "Какие статьи публикуются в блоге TOMSTORE?",
            answer:
              "В блоге выходят обзоры, сравнения, практические советы по выбору и полезные материалы по ноутбукам, принтерам, компьютерам и другой востребованной технике.",
          },
          {
            question: "Помогает ли блог перед переходом в каталог?",
            answer:
              "Да. Материалы помогают сначала сузить выбор и понять нужный сценарий использования, а уже потом переходить в каталог за конкретными моделями.",
          },
          {
            question: "Есть ли в блоге переходы на категории и товары?",
            answer:
              "Да. Блог усиливает внутреннюю перелинковку: читатель может перейти из статьи в общий хаб блога, категорийную страницу, подборку товаров или карточку конкретной модели.",
          },
        ],
        keywords: [
          "блог TOMSTORE",
          "обзоры техники Бишкек",
          "советы по выбору ноутбука",
          "как выбрать принтер",
        ],
      };
  }
};

export const getBlogCategorySeoContent = (
  locale: Locale,
  categoryName: string,
): BlogLandingSeoContent => {
  switch (locale) {
    case "en":
      return {
        metaTitle: `${categoryName} articles in the TOMSTORE blog`,
        metaDescription: `Browse ${categoryName} articles in the TOMSTORE blog with guides, comparisons and practical buying advice connected to this topic.`,
        eyebrow: "TOMSTORE Blog Category",
        introTitle: `${categoryName} articles in the TOMSTORE blog`,
        introDescription:
          `This page groups blog posts related to ${categoryName}, making it easier to read focused materials, compare recommendations and continue to the relevant catalog or product pages.`,
        summaryTitle: `Why a dedicated ${categoryName} content page matters`,
        summaryDescription:
          `A focused category page helps both readers and search engines understand the topic cluster and creates a stronger bridge from informational demand to commercial pages.`,
        countLabel: "Articles in this section",
        catalogLabel: "All articles",
        contactLabel: "Talk to manager",
        highlights: [
          `Focused content hub for ${categoryName}`,
          "Clearer topical relevance for readers and search engines",
          "Faster movement from advice to catalog pages",
          "Useful internal links between content and storefront pages",
        ],
        guideTitle: `What users get from ${categoryName} articles`,
        guideParagraphs: [
          `The page keeps all articles about ${categoryName} in one place, so visitors can compare advice, understand the differences between options and move to the next step with less friction.`,
          `It also strengthens the topic cluster around ${categoryName}: informational content supports category and product discovery instead of living as isolated posts.`,
        ],
        faqs: [
          {
            question: `What is published in the ${categoryName} section?`,
            answer:
              "The section contains articles, comparisons and practical recommendations related to this topic, helping visitors understand which direction or product type suits them best.",
          },
          {
            question: `Can I move from ${categoryName} articles to catalog pages?`,
            answer:
              "Yes. The page is part of the internal linking structure and helps readers continue from content to category collections and product pages.",
          },
          {
            question: `Is this section useful for SEO as well as users?`,
            answer:
              "Yes. A topic-focused blog category page improves navigation for readers and helps search engines see a clearer content cluster around the subject.",
          },
        ],
        keywords: [
          `${categoryName} blog`,
          `${categoryName} articles`,
          `${categoryName} guide`,
          `TOMSTORE ${categoryName}`,
        ],
      };
    case "ky":
      return {
        metaTitle: `${categoryName} боюнча макалалар - TOMSTORE блогу`,
        metaDescription: `TOMSTORE блогундагы ${categoryName} темасына байланышкан макалаларды окуңуз: кеңештер, салыштыруулар жана пайдалуу түшүндүрмөлөр.`,
        eyebrow: "TOMSTORE Блог Категориясы",
        introTitle: `${categoryName} боюнча макалалар`,
        introDescription:
          `Бул барак ${categoryName} темасына тиешелүү бардык материалдарды бир жерге чогултат. Макалаларды окуп, сунуштарды салыштырып, андан ары тиешелүү категорияларга же товарларга өтүү оңой болот.`,
        summaryTitle: `Эмне үчүн ${categoryName} боюнча өзүнчө бөлүм пайдалуу`,
        summaryDescription:
          `Темалык барак окурманга да, издөө системасына да мазмундун багытын жакшыраак түшүнүүгө жардам берет жана маалыматтык суроо-талапты коммерциялык барактарга жакындатат.`,
        countLabel: "Бул бөлүмдөгү макалалар",
        catalogLabel: "Бардык макалалар",
        contactLabel: "Менеджерге жазуу",
        highlights: [
          `${categoryName} боюнча өзүнчө контент-хаб`,
          "Тема боюнча такыраак структура жана релеванттуулук",
          "Макаладан каталогго тез өтүү",
          "Контент менен storefront барактарынын ортосундагы ички шилтемелер",
        ],
        guideTitle: `${categoryName} макалаларынан кандай пайда бар`,
        guideParagraphs: [
          `Бул жерде ${categoryName} темасына тиешелүү материалдар топтолгон. Ошондуктан колдонуучу пайдалуу кеңештерди бир жерден окуп чыгып, керектүү багытты бат түшүнө алат.`,
          `Мындай барак SEO үчүн да маанилүү: маалыматтык контент өзүнчө калбай, категориялар жана товарлар менен байланышкан бүтүн тема-кластерди түзөт.`,
        ],
        faqs: [
          {
            question: `${categoryName} бөлүмүндө кандай материалдар бар?`,
            answer:
              "Бул жерде ушул темага тиешелүү обзорлор, салыштыруулар жана практикалык кеңештер чогултулат. Алар колдонуучуга керектүү багытты жакшыраак түшүнүүгө жардам берет.",
          },
          {
            question: `${categoryName} макалаларынан каталогго өтсө болобу?`,
            answer:
              "Ооба. Бөлүм ички перелинковканын бир бөлүгү болуп, окурманды макалалардан category page'лерге жана товар барактарына жеткирет.",
          },
          {
            question: `Бул бөлүм SEO жана навигация үчүн тең пайдалуубу?`,
            answer:
              "Ооба. Темалык барак окурман үчүн навигацияны жөнөкөйлөтөт жана издөө системасына тема-кластерди такыраак көрсөтөт.",
          },
        ],
        keywords: [
          `${categoryName} блог`,
          `${categoryName} макалалар`,
          `${categoryName} боюнча кеңеш`,
          `TOMSTORE ${categoryName}`,
        ],
      };
    case "ru":
    default:
      return {
        metaTitle: `${categoryName} в блоге TOMSTORE`,
        metaDescription: `Подборка статей по теме «${categoryName}» в блоге TOMSTORE: советы, сравнения, обзоры и полезные материалы по выбору техники.`,
        eyebrow: "Категория блога TOMSTORE",
        introTitle: `${categoryName} в блоге TOMSTORE`,
        introDescription:
          `Эта страница собирает материалы по теме «${categoryName}» в одном месте. Здесь проще читать тематические статьи, сравнивать рекомендации и затем переходить в связанные категории и товары.`,
        summaryTitle: `Зачем нужна отдельная блоговая страница по теме «${categoryName}»`,
        summaryDescription:
          "Тематика, собранная в одном URL, помогает и пользователю, и поисковой системе лучше понимать содержимое раздела и выстраивает более сильную связь между информационными и коммерческими страницами.",
        countLabel: "Статей в разделе",
        catalogLabel: "Все статьи",
        contactLabel: "Связаться с менеджером",
        highlights: [
          `Отдельный контент-хаб по теме «${categoryName}»`,
          "Более сильная тематическая релевантность для SEO",
          "Быстрый переход из статьи в каталог и карточки товаров",
          "Усиленная внутренняя перелинковка между контентом и витриной",
        ],
        guideTitle: `Что дают статьи по теме «${categoryName}»`,
        guideParagraphs: [
          `Когда материалы по одной теме собраны в отдельную страницу, пользователю проще последовательно изучить советы, обзоры и сравнения, а затем перейти к нужной категории или товару без лишних поисков по сайту.`,
          `Для SEO такая страница формирует понятный тематический кластер вокруг «${categoryName}» и усиливает связь между информационным трафиком и коммерческими разделами магазина.`,
        ],
        faqs: [
          {
            question: `Какие материалы собраны в разделе «${categoryName}»?`,
            answer:
              "В разделе собраны статьи, обзоры, сравнения и практические советы, связанные с этой темой. Они помогают лучше понять, какие решения и модели подходят под конкретные задачи.",
          },
          {
            question: `Можно ли из раздела «${categoryName}» перейти к товарам и категориям?`,
            answer:
              "Да. Такая страница работает как часть внутренней перелинковки и помогает переводить читателя из контента в категорийные страницы и карточки товаров.",
          },
          {
            question: `Полезна ли эта страница и для пользователей, и для SEO?`,
            answer:
              "Да. Пользователь получает понятную тематическую навигацию, а поисковая система видит структурированный контентный кластер по конкретной теме.",
          },
        ],
        keywords: [
          `${categoryName} блог`,
          `${categoryName} статьи`,
          `${categoryName} советы`,
          `TOMSTORE ${categoryName}`,
        ],
      };
  }
};

export const getCategoriesHubSeoContent = (
  locale: Locale,
): CatalogHubSeoContent => {
  switch (locale) {
    case "en":
      return {
        metaTitle: "Product categories in TOMSTORE",
        metaDescription:
          "Browse all TOMSTORE product categories in one place and move to clean category pages with focused assortments, current availability and fast ordering.",
        eyebrow: "TOMSTORE Categories",
        introTitle: "All product categories in one hub",
        introDescription:
          "This page collects the core TOMSTORE categories and links each one to a dedicated landing page. It is the fastest route for users who want to start from a product group instead of the full catalog.",
        countLabel: "Available categories",
        cardLabel: "Category",
        itemCountLabel: "products",
        sectionTitle: "Choose a category and continue to a focused landing page",
        sectionDescription:
          "Every category page narrows the assortment, improves comparison and gives a cleaner path from search intent to the right product set.",
        catalogLabel: "Open catalog",
        contactLabel: "Contacts",
        highlights: [
          "All main product groups gathered on one page",
          "Fast access to clean category landing pages",
          "Better internal linking between hub, catalog and product pages",
          "Useful for users who search by product type first",
        ],
        faqs: [
          {
            question: "Why open the categories hub instead of the full catalog?",
            answer:
              "Because it helps users start with the right product group first and then continue to a much narrower landing page instead of browsing the entire assortment at once.",
          },
          {
            question: "Do category pages contain current stock and prices?",
            answer:
              "Yes. The category landing pages are connected to the storefront catalog, so users can continue from the hub to focused pages with current items, availability and prices.",
          },
          {
            question: "Can I still use filters after choosing a category?",
            answer:
              "Yes. The hub page only improves the first navigation step. After opening a category page, users can still refine the selection with the available catalog filters.",
          },
        ],
        keywords: [
          "TOMSTORE categories",
          "electronics categories Bishkek",
          "product categories TOMSTORE",
          "buy electronics by category",
        ],
      };
    case "ky":
      return {
        metaTitle: "TOMSTORE категориялары",
        metaDescription:
          "TOMSTORE дүкөнүнүн бардык товар категориялары бир жерде. Ар бир бөлүмдөн өзүнчө category landing page'ге өтүп, керектүү товарларды ылдам табууга болот.",
        eyebrow: "TOMSTORE Категориялары",
        introTitle: "Бардык товар категориялары бир хаб-баракта",
        introDescription:
          "Бул барак TOMSTORE дүкөнүндөгү негизги категорияларды чогултат жана ар бирин өзүнчө clean URL менен категория барагына алып барат. Жалпы каталогдон эмес, түз эле товар түрүнөн баштагандар үчүн бул эң ыңгайлуу кирүү чекити.",
        countLabel: "Жеткиликтүү категориялар",
        cardLabel: "Категория",
        itemCountLabel: "товар",
        sectionTitle: "Категорияны тандап, өзүнчө подборка барагына өтүңүз",
        sectionDescription:
          "Ар бир категория барагы ассортименти тарылтып, салыштырууну жеңилдетет жана керектүү товарларга тез жетүүгө жардам берет.",
        catalogLabel: "Каталог",
        contactLabel: "Контакттар",
        highlights: [
          "Негизги товар топтору бир жерде топтолгон",
          "Category landing page'лерге тез өтүү",
          "Хаб, каталог жана товар барактарынын ортосунда жакшыраак перелинковка",
          "Алгач товар түрү боюнча издегендер үчүн ыңгайлуу",
        ],
        faqs: [
          {
            question: "Эмне үчүн жалпы каталогдун ордуна категориялар хабын ачкан жакшы?",
            answer:
              "Анткени адегенде туура товар тобун тандап алуу оңой болот. Андан кийин ошол категориянын өзүнчө барагына өтүп, тандоону бир топ тездетсе болот.",
          },
          {
            question: "Категория барактарында актуалдуу баа жана бар-жогу көрүнөбү?",
            answer:
              "Ооба. Категория барактары storefront каталогу менен байланышкан, ошондуктан ал жакта учурдагы товарлар, баалар жана бар-жогу көрсөтүлөт.",
          },
          {
            question: "Категорияны тандагандан кийин фильтрлер иштейби?",
            answer:
              "Ооба. Хаб-барак биринчи кадамды гана жеңилдетет. Категория барагына өткөндөн кийин кошумча фильтрлер менен тандоону тактай аласыз.",
          },
        ],
        keywords: [
          "TOMSTORE категориялары",
          "электроника категориялары Бишкек",
          "товар категориялары TOMSTORE",
          "категория боюнча электроника сатып алуу",
        ],
      };
    case "ru":
    default:
      return {
        metaTitle: "Категории товаров TOMSTORE",
        metaDescription:
          "Все категории товаров TOMSTORE на одной странице. Переходите в отдельные category landing pages с чистыми URL, актуальными позициями и удобным выбором.",
        eyebrow: "Категории TOMSTORE",
        introTitle: "Все категории товаров в одном хабе",
        introDescription:
          "Эта страница собирает основные категории TOMSTORE и ведёт в отдельные category landing pages. Это удобная точка входа для тех, кто начинает поиск не с общего каталога, а с конкретного типа товара.",
        countLabel: "Доступных категорий",
        cardLabel: "Категория",
        itemCountLabel: "товаров",
        sectionTitle: "Выберите категорию и перейдите в её отдельную подборку",
        sectionDescription:
          "Каждая категория ведёт на собственную SEO-страницу с более узким ассортиментом, понятной структурой и быстрым переходом к нужным товарам.",
        catalogLabel: "В каталог",
        contactLabel: "Контакты",
        highlights: [
          "Все основные товарные группы собраны на одной странице",
          "Быстрый переход в category landing pages с чистыми URL",
          "Усиленная перелинковка между хабом, каталогом и товарами",
          "Удобный старт для пользователей, которые ищут по типу товара",
        ],
        faqs: [
          {
            question: "Зачем открывать хаб категорий, а не общий каталог?",
            answer:
              "Потому что так проще сначала выбрать нужную товарную группу, а затем перейти в более узкую категорийную страницу и быстрее дойти до подходящих товаров.",
          },
          {
            question: "На category-страницах показываются актуальные товары и цены?",
            answer:
              "Да. Категорийные страницы связаны с основным storefront-каталогом, поэтому пользователь попадает на актуальную выборку товаров с ценами и наличием.",
          },
          {
            question: "После перехода в категорию фильтры каталога сохраняются?",
            answer:
              "Да. Хаб категорий лишь упрощает первый шаг навигации. Дальше на category landing page можно продолжать работать с фильтрами и уточнять выбор.",
          },
        ],
        keywords: [
          "категории товаров TOMSTORE",
          "категории электроники Бишкек",
          "категории магазина техники",
          "купить технику по категории",
        ],
      };
  }
};

export const getBrandsHubSeoContent = (
  locale: Locale,
): CatalogHubSeoContent => {
  switch (locale) {
    case "en":
      return {
        metaTitle: "Brands in TOMSTORE",
        metaDescription:
          "Browse TOMSTORE brands in one place and continue to focused brand pages with clean URLs, current assortments and faster brand-level navigation.",
        eyebrow: "TOMSTORE Brands",
        introTitle: "All brands collected in one brand hub",
        introDescription:
          "This page groups the brands available in TOMSTORE and links each one to a dedicated brand landing page. It is useful when users already know the brand and want to compare models inside that lineup.",
        countLabel: "Available brands",
        cardLabel: "Brand",
        itemCountLabel: "products",
        sectionTitle: "Open a brand page and compare models inside one lineup",
        sectionDescription:
          "Brand hubs work well for brand-driven demand and help connect users from broad navigation pages to narrower branded collections.",
        catalogLabel: "Open catalog",
        contactLabel: "Contacts",
        highlights: [
          "All main storefront brands collected on one page",
          "Fast access to dedicated brand landing pages",
          "Better internal linking to brand-based collections",
          "Useful for users who search by brand before model",
        ],
        faqs: [
          {
            question: "Why use a brands hub page?",
            answer:
              "It shortens the route for users who already trust a specific brand and want to compare its available models without browsing the whole catalog.",
          },
          {
            question: "Do brand pages still support filtering?",
            answer:
              "Yes. A brand page acts as the starting point, and visitors can still use catalog filters to narrow the selection further.",
          },
          {
            question: "Is the brands hub useful for SEO and navigation together?",
            answer:
              "Yes. It helps search engines and users understand the store structure, while also passing internal link equity to dedicated brand landing pages.",
          },
        ],
        keywords: [
          "TOMSTORE brands",
          "electronics brands Bishkek",
          "brand pages TOMSTORE",
          "shop by brand electronics",
        ],
      };
    case "ky":
      return {
        metaTitle: "TOMSTORE бренддери",
        metaDescription:
          "TOMSTORE дүкөнүндөгү бренддер бир жерде. Ар бир брендден clean URL менен өзүнчө brand page'ге өтүп, ошол бренддин моделдерин ыңгайлуу салыштырууга болот.",
        eyebrow: "TOMSTORE Бренддери",
        introTitle: "Бардык бренддер бир бренд-хабда",
        introDescription:
          "Бул барак TOMSTORE дүкөнүндө жеткиликтүү бренддерди топтойт жана ар бирин өзүнчө brand landing page'ге алып барат. Бренд белгилүү болуп, модель али тандала элек учурлар үчүн эң ыңгайлуу.",
        countLabel: "Жеткиликтүү бренддер",
        cardLabel: "Бренд",
        itemCountLabel: "товар",
        sectionTitle: "Бренд барагын ачып, бир линейканын ичинде салыштырыңыз",
        sectionDescription:
          "Мындай хаб бренд боюнча издеген суроо-талаптарга жакшы жооп берет жана жалпы навигациядан тар бренд подборкаларына өткөрөт.",
        catalogLabel: "Каталог",
        contactLabel: "Контакттар",
        highlights: [
          "Негизги бренддердин баары бир жерде",
          "Өзүнчө brand landing page'лерге тез өтүү",
          "Бренд боюнча подборкаларга жакшыраак ички шилтемелер",
          "Алгач бренд боюнча издегендер үчүн ыңгайлуу",
        ],
        faqs: [
          {
            question: "Эмне үчүн бренддер хабын колдонуу пайдалуу?",
            answer:
              "Эгер колдонуучу белгилүү брендди жактырып турса, бул барак жалпы каталогду аралабай эле ошол бренддин моделдерине тез өтүүгө жардам берет.",
          },
          {
            question: "Бренд барактарында кошумча фильтрлер иштейби?",
            answer:
              "Ооба. Brand page баштапкы чекит болуп берет, андан кийин колдонуучу фильтрлер менен тандоону дагы тактай алат.",
          },
          {
            question: "Бренддер хабы SEO жана навигация үчүн бирдей пайдалуубу?",
            answer:
              "Ооба. Ал сайттын түзүмүн түшүнүктүүрөөк кылат жана өзүнчө бренд барактарына ички салмакты өткөрүүгө жардам берет.",
          },
        ],
        keywords: [
          "TOMSTORE бренддери",
          "электроника бренддери Бишкек",
          "TOMSTORE бренд барактары",
          "бренд боюнча техника тандоо",
        ],
      };
    case "ru":
    default:
      return {
        metaTitle: "Бренды в TOMSTORE",
        metaDescription:
          "Все бренды TOMSTORE на одной странице. Переходите в отдельные brand landing pages с чистыми URL и быстрее выбирайте технику внутри нужного бренда.",
        eyebrow: "Бренды TOMSTORE",
        introTitle: "Все бренды собраны в одном бренд-хабе",
        introDescription:
          "Эта страница собирает бренды, представленные в TOMSTORE, и ведёт на отдельные brand landing pages. Она особенно полезна, когда покупатель уже знает нужный бренд и хочет сравнить модели внутри его линейки.",
        countLabel: "Доступных брендов",
        cardLabel: "Бренд",
        itemCountLabel: "товаров",
        sectionTitle: "Откройте страницу бренда и сравнивайте модели внутри одной линейки",
        sectionDescription:
          "Брендовые хабы хорошо закрывают спрос по брендам и связывают общие навигационные страницы с более узкими бренд-подборками.",
        catalogLabel: "В каталог",
        contactLabel: "Контакты",
        highlights: [
          "Все основные бренды витрины собраны на одной странице",
          "Быстрый переход в brand landing pages с чистыми URL",
          "Усиленная внутренняя перелинковка по брендовым подборкам",
          "Удобно для пользователей, которые ищут сначала бренд, а потом модель",
        ],
        faqs: [
          {
            question: "Зачем нужен отдельный хаб брендов?",
            answer:
              "Он сокращает путь для тех, кто уже ориентируется на конкретный бренд и хочет быстро перейти к доступным моделям без просмотра всего каталога.",
          },
          {
            question: "На brand-страницах после перехода сохраняются фильтры?",
            answer:
              "Да. Brand landing page работает как вход в нужную линейку, а дальше пользователь может уточнять выбор через фильтры каталога.",
          },
          {
            question: "Хаб брендов полезен и для SEO, и для навигации?",
            answer:
              "Да. Он делает структуру магазина понятнее для поисковых систем и пользователей, а также передаёт внутренний ссылочный вес на отдельные брендовые страницы.",
          },
        ],
        keywords: [
          "бренды TOMSTORE",
          "бренды электроники Бишкек",
          "страницы брендов TOMSTORE",
          "купить технику по бренду",
        ],
      };
  }
};
