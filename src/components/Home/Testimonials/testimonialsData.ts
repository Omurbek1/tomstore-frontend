import type { Locale } from "@/i18n/messages";
import type { Testimonial } from "@/types/testimonial";

const testimonialsByLocale: Record<Locale, Testimonial[]> = {
  ru: [
    {
      review:
        "Брали ноутбук для офиса. Подобрали быстро, сразу объяснили разницу между моделями и помогли настроить всё в день покупки. Сервис реально топ, давно не видел такого отношения к клиенту.",
      authorName: "Айбек С.",
      authorImg: "/images/users/user-01.jpg",
      authorRole: "Руководитель отдела продаж",
    },
    {
      review:
        "Покупали принтер для школы. Подсказали, какой вариант выгоднее по картриджам и по нагрузке, ничего лишнего не навязали. Цена хорошая, печатает отлично, дети уже пользуются каждый день.",
      authorName: "Гульмира А.",
      authorImg: "/images/users/user-02.jpg",
      authorRole: "Администратор учебного центра",
    },
    {
      review:
        "За ноутбуком пришёл по рекомендации и не пожалел. Консультация спокойная, без спешки, всё показали и проверили при мне. По сервису и по цене магазин прямо приятно удивил.",
      authorName: "Нурсултан Т.",
      authorImg: "/images/users/user-03.jpg",
      authorRole: "Предприниматель",
    },
    {
      review:
        "Нужен был принтер в офис срочно, и здесь вопрос закрыли за один визит. Подобрали модель, дали понятные советы по обслуживанию и расходникам. Сервис сильный, всё очень по-человечески.",
      authorName: "Елена К.",
      authorImg: "/images/users/user-01.jpg",
      authorRole: "Офис-менеджер",
    },
    {
      review:
        "Брали ноутбук для учёбы сыну. Важно было уложиться в бюджет, и здесь нашли хороший вариант без переплаты. Цена топ, а консультант ещё помог выбрать сумку и мышку без лишнего давления.",
      authorName: "Айнура Ж.",
      authorImg: "/images/users/user-02.jpg",
      authorRole: "Покупатель",
    },
    {
      review:
        "Очень понравилось, что после покупки не пропали: помогли с настройкой и ответили на вопросы уже после выдачи. Сейчас редко встретишь такой сервис. Магазин оставил действительно сильное впечатление.",
      authorName: "Даниил М.",
      authorImg: "/images/users/user-03.jpg",
      authorRole: "Дизайнер",
    },
  ],
  en: [
    {
      review:
        "We bought a laptop for our office team and the consultation was excellent. They explained the differences between models, set everything up on the same day, and the service was honestly top-tier.",
      authorName: "Aibek S.",
      authorImg: "/images/users/user-01.jpg",
      authorRole: "Sales Team Lead",
    },
    {
      review:
        "We needed a printer for our training center and got the right model right away. They were clear about cartridge costs and daily workload. Great price, smooth process, and very professional support.",
      authorName: "Gulmira A.",
      authorImg: "/images/users/user-02.jpg",
      authorRole: "Training Center Administrator",
    },
    {
      review:
        "I came in for a laptop and ended up staying because the team was patient and detailed. No pressure, no upselling, just solid advice. I rarely see service this good.",
      authorName: "Nursultan T.",
      authorImg: "/images/users/user-03.jpg",
      authorRole: "Business Owner",
    },
    {
      review:
        "We urgently needed a printer for the office, and the team solved it in one visit. They recommended the right model, explained maintenance, and made the whole purchase feel easy and reliable.",
      authorName: "Elena K.",
      authorImg: "/images/users/user-01.jpg",
      authorRole: "Office Manager",
    },
    {
      review:
        "Bought a laptop for my son’s studies and wanted a strong option without going over budget. The price was great, and the consultant helped us choose only what we actually needed.",
      authorName: "Ainura Zh.",
      authorImg: "/images/users/user-02.jpg",
      authorRole: "Customer",
    },
    {
      review:
        "What impressed me most was the after-sales care. They answered setup questions even after the purchase, which almost never happens these days. Excellent service and a very trustworthy store.",
      authorName: "Daniil M.",
      authorImg: "/images/users/user-03.jpg",
      authorRole: "Designer",
    },
  ],
  ky: [
    {
      review:
        "Офиске ноутбук алдык. Моделдердин айырмасын так түшүндүрүп, ошол эле күнү баарын орнотуп беришти. Сервис чындап эле жогорку деңгээлде, мындай мамилени сейрек көрөсүң.",
      authorName: "Айбек С.",
      authorImg: "/images/users/user-01.jpg",
      authorRole: "Сатуу бөлүмүнүн жетекчиси",
    },
    {
      review:
        "Окуу борборуна принтер керек болчу. Кайсы модель үнөмдүү экенин, картридж чыгымын жана жүктөмүн жакшы түшүндүрүштү. Баасы жакшы, иши так, кызмат көрсөтүү да мыкты болду.",
      authorName: "Гүлмира А.",
      authorImg: "/images/users/user-02.jpg",
      authorRole: "Окуу борборунун администратору",
    },
    {
      review:
        "Ноутбук алуу үчүн келгем, кеңеши абдан жакты. Шашпай көрсөтүп, баарын текшерип беришти. Баасы да жакшы экен, сервис боюнча бул дүкөн чындап таң калтырды.",
      authorName: "Нурсултан Т.",
      authorImg: "/images/users/user-03.jpg",
      authorRole: "Ишкер",
    },
    {
      review:
        "Кеңсеге принтер шашылыш керек эле, бул жакта бир эле жолу келип маселени чечтик. Туура моделди сунуштап, тейлөө боюнча да түшүнүктүү айтып беришти. Абдан жакшы деңгээл.",
      authorName: "Елена К.",
      authorImg: "/images/users/user-01.jpg",
      authorRole: "Кеңсе менеджери",
    },
    {
      review:
        "Балага окууга ноутбук алдык. Бюджеттен ашпай жакшы вариант таап беришти, керексиз нерсени таңуулашкан жок. Баасы да топ, мамилеси да абдан жакшы болду.",
      authorName: "Айнура Ж.",
      authorImg: "/images/users/user-02.jpg",
      authorRole: "Кардар",
    },
    {
      review:
        "Сатып алгандан кийин да байланышты үзүшкөн жок, орнотуу боюнча суроолорго жооп беришти. Азыр мындай сервисти көп көрбөйсүң. Дүкөн абдан жакшы таасир калтырды.",
      authorName: "Даниил М.",
      authorImg: "/images/users/user-03.jpg",
      authorRole: "Дизайнер",
    },
  ],
};

export const getTestimonialsData = (locale: Locale): Testimonial[] =>
  testimonialsByLocale[locale] || testimonialsByLocale.ru;
