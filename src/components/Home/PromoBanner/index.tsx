import Image from "next/image";
import type { Locale } from "@/i18n/messages";

const getPromoBannerCopy = (locale: Locale) => ({
  featuredDrop:
    locale === "en" ? "Featured Drop" : locale === "ky" ? "Атайын сунуш" : "Хит недели",
  primaryTitle: "Apple iPhone 14 Plus",
  primaryText:
    locale === "en"
      ? "Popular electronics with clear pricing and quick ordering across Kyrgyzstan."
      : locale === "ky"
        ? "Кыргызстан боюнча түшүнүктүү баа жана тез заказ менен популярдуу электроника."
        : "Популярная электроника с понятной ценой и быстрым заказом по всему Кыргызстану.",
  buyNow:
    locale === "en" ? "Buy now" : locale === "ky" ? "Азыр алуу" : "Купить сейчас",
  workoutSubtitle:
    locale === "en"
      ? "For active days"
      : locale === "ky"
        ? "Шаардык күндөр үчүн"
        : "Для активного дня",
  workoutTitle:
    locale === "en"
      ? "Smart deals for everyday use"
      : locale === "ky"
        ? "Күнүмдүк колдонууга ылайыктуу сунуштар"
        : "Выгодные предложения на каждый день",
  workoutDiscount:
    locale === "en"
      ? "Up to 15% off selected items"
      : locale === "ky"
        ? "Айрым товарларга 15% чейин арзандатуу"
        : "Скидки до 15% на отдельные товары",
  grabNow:
    locale === "en" ? "Grab now" : locale === "ky" ? "Дароо алуу" : "Забрать сейчас",
  watchSubtitle:
    locale === "en"
      ? "For work and viewing"
      : locale === "ky"
        ? "Иш жана көңүл ачуу үчүн"
        : "Для работы и просмотра",
  watchTitle:
    locale === "en"
      ? "Laptops and accessories"
      : locale === "ky"
        ? "Ноутбуктар жана аксессуарлар"
        : "Ноутбуки и аксессуары",
  watchText:
    locale === "en"
      ? "Useful picks for study, work and home."
      : locale === "ky"
        ? "Окуу, иш жана үй үчүн пайдалуу варианттар."
        : "Полезные варианты для учебы, работы и дома.",
});

const PromoBanner = ({ locale }: { locale: Locale }) => {
  const copy = getPromoBannerCopy(locale);

  return (
    <section className="overflow-hidden">
      <div className="mx-auto w-full max-w-[1170px]">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.65fr)]">
          <div className="section-shell-dark min-h-[380px] px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
            <div className="relative z-10 max-w-[560px]">
              <span className="section-kicker-dark mb-5">
                {copy.featuredDrop}
              </span>
              <span className="mb-3 block text-xl font-medium text-white/72">
                {copy.primaryTitle}
              </span>

              <h2 className="mb-5 text-3xl font-semibold leading-tight text-white sm:text-4xl xl:text-[46px]">
                {copy.primaryTitle}
              </h2>

              <p className="max-w-[520px] text-sm leading-7 text-white/70 sm:text-base">
                {copy.primaryText}
              </p>

              <a
                href="/shop-with-sidebar"
                className="mt-8 inline-flex rounded-full bg-white px-7 py-3 text-sm font-medium text-dark transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue hover:text-white"
              >
                {copy.buyNow}
              </a>
            </div>

            <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-white/8 blur-3xl" />
            <Image
              src="/images/promo/promo-01.png"
              alt="promo img"
              className="absolute bottom-0 right-4 h-auto w-auto max-w-[290px] drop-shadow-[0_26px_40px_rgba(0,0,0,0.3)] sm:right-10 lg:right-8 xl:right-12"
              width={290}
              height={360}
            />
          </div>

          <div className="grid gap-6">
            <div className="section-shell min-h-[177px] px-6 py-7 sm:px-7.5">
              <div className="relative z-10 ml-auto max-w-[235px] text-right">
                <span className="mb-1.5 block text-lg text-dark">
                  {copy.workoutSubtitle}
                </span>

                <h2 className="mb-2 text-2xl font-semibold leading-tight text-dark">
                  {copy.workoutTitle}
                </h2>

                <p className="text-custom-1 font-semibold text-teal">
                  {copy.workoutDiscount}
                </p>

                <a
                  href="/shop-with-sidebar"
                  className="mt-7 inline-flex rounded-full bg-teal px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-dark"
                >
                  {copy.grabNow}
                </a>
              </div>

              <Image
                src="/images/promo/promo-02.png"
                alt="promo img"
                className="absolute left-4 top-1/2 -translate-y-1/2"
                width={210}
                height={210}
              />
            </div>

            <div className="section-shell min-h-[177px] px-6 py-7 sm:px-7.5">
              <div className="relative z-10 max-w-[240px]">
                <span className="mb-1.5 block text-lg text-dark">
                  {copy.watchSubtitle}
                </span>

                <h2 className="mb-2 text-2xl font-semibold leading-tight text-dark">
                  {copy.watchTitle}
                </h2>

                <p className="max-w-[220px] text-sm leading-7 text-dark-4">
                  {copy.watchText}
                </p>

                <a
                  href="/shop-with-sidebar"
                  className="mt-6 inline-flex rounded-full bg-orange px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-dark"
                >
                  {copy.buyNow}
                </a>
              </div>

              <Image
                src="/images/promo/promo-03.png"
                alt="promo img"
                className="absolute bottom-4 right-4"
                width={170}
                height={170}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
