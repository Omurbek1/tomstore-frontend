import type { Locale } from "@/i18n/messages";

type CanonicalRegionalLocationKey =
  | "bishkek"
  | "osh"
  | "talas"
  | "batken"
  | "kara-suu"
  | "ozgon"
  | "manas"
  | "chuy"
  | "karakol"
  | "kara-balta"
  | "cholpon-ata"
  | "issyk-kul"
  | "leylek"
  | "kemin"
  | "kara-kulja"
  | "naryn"
  | "kochkor"
  | "at-bashy"
  | "aktalaa"
  | "kadamjay"
  | "toktogul"
  | "sokuluk"
  | "tokmok"
  | "kant"
  | "belovodskoe"
  | "lebedinovka"
  | "moskovskaya"
  | "ivanovka"
  | "alamudun"
  | "jayil"
  | "panfilov"
  | "aravan"
  | "nookat"
  | "chong-alay"
  | "alai"
  | "jalal-abad"
  | "tash-kumyr"
  | "suzak"
  | "bazar-korgon"
  | "kok-jangak"
  | "mayluu-suu"
  | "aksy"
  | "chatkal"
  | "toguz-toro"
  | "isfana"
  | "suluktu"
  | "kyzyl-kiya"
  | "jumgal"
  | "chaek"
  | "balykchy"
  | "ak-suu"
  | "tyup"
  | "jeti-oguz"
  | "ton"
  | "kyzyl-suu"
  | "kara-buura"
  | "bakai-ata"
  | "pokrovka";

export type RegionalLocationKey =
  | CanonicalRegionalLocationKey
  | "uzgen"
  | "leilek"
  | "nookata"
  | "ak-talaa";

export type LocalizedText = {
  ru: string;
  en: string;
  ky: string;
};

export type RegionalLocation = {
  slug: CanonicalRegionalLocationKey;
  name: LocalizedText;
  in: LocalizedText;
};

const createRegionalLocation = (
  slug: CanonicalRegionalLocationKey,
  name: LocalizedText,
  inText: LocalizedText,
): RegionalLocation => ({
  slug,
  name,
  in: inText,
});

const REGIONAL_LOCATION_ENTRIES = [
  // Бишкек и Чуйская область
  [
    "bishkek",
    createRegionalLocation(
      "bishkek",
      { ru: "Бишкек", en: "Bishkek", ky: "Бишкек" },
      { ru: "в Бишкеке", en: "in Bishkek", ky: "Бишкекте" },
    ),
  ],
  [
    "chuy",
    createRegionalLocation(
      "chuy",
      { ru: "Чуй", en: "Chuy", ky: "Чүй" },
      { ru: "в Чуйской области", en: "in Chuy Region", ky: "Чүй облусунда" },
    ),
  ],
  [
    "sokuluk",
    createRegionalLocation(
      "sokuluk",
      { ru: "Сокулук", en: "Sokuluk", ky: "Сокулук" },
      { ru: "в Сокулуке", en: "in Sokuluk", ky: "Сокулукта" },
    ),
  ],
  [
    "tokmok",
    createRegionalLocation(
      "tokmok",
      { ru: "Токмок", en: "Tokmok", ky: "Токмок" },
      { ru: "в Токмоке", en: "in Tokmok", ky: "Токмокто" },
    ),
  ],
  [
    "kant",
    createRegionalLocation(
      "kant",
      { ru: "Кант", en: "Kant", ky: "Кант" },
      { ru: "в Канте", en: "in Kant", ky: "Кантта" },
    ),
  ],
  [
    "belovodskoe",
    createRegionalLocation(
      "belovodskoe",
      { ru: "Беловодское", en: "Belovodskoe", ky: "Беловодское" },
      { ru: "в Беловодском", en: "in Belovodskoe", ky: "Беловодскодо" },
    ),
  ],
  [
    "lebedinovka",
    createRegionalLocation(
      "lebedinovka",
      { ru: "Лебединовка", en: "Lebedinovka", ky: "Лебединовка" },
      { ru: "в Лебединовке", en: "in Lebedinovka", ky: "Лебединовкада" },
    ),
  ],
  [
    "moskovskaya",
    createRegionalLocation(
      "moskovskaya",
      { ru: "Московская", en: "Moskovskaya", ky: "Московская" },
      { ru: "в Московской", en: "in Moskovskaya", ky: "Московскаяда" },
    ),
  ],
  [
    "ivanovka",
    createRegionalLocation(
      "ivanovka",
      { ru: "Ивановка", en: "Ivanovka", ky: "Ивановка" },
      { ru: "в Ивановке", en: "in Ivanovka", ky: "Ивановкада" },
    ),
  ],
  [
    "alamudun",
    createRegionalLocation(
      "alamudun",
      { ru: "Аламудун", en: "Alamudun", ky: "Аламүдүн" },
      { ru: "в Аламудуне", en: "in Alamudun", ky: "Аламудунда" },
    ),
  ],
  [
    "jayil",
    createRegionalLocation(
      "jayil",
      { ru: "Жайыл", en: "Jayil", ky: "Жайыл" },
      { ru: "в Жайыле", en: "in Jayil", ky: "Жайылда" },
    ),
  ],
  [
    "panfilov",
    createRegionalLocation(
      "panfilov",
      { ru: "Панфилов", en: "Panfilov", ky: "Панфилов" },
      { ru: "в Панфилове", en: "in Panfilov", ky: "Панфиловдо" },
    ),
  ],
  [
    "kara-balta",
    createRegionalLocation(
      "kara-balta",
      { ru: "Кара-Балта", en: "Kara-Balta", ky: "Кара-Балта" },
      { ru: "в Кара-Балте", en: "in Kara-Balta", ky: "Кара-Балтада" },
    ),
  ],
  [
    "kemin",
    createRegionalLocation(
      "kemin",
      { ru: "Кемин", en: "Kemin", ky: "Кемин" },
      { ru: "в Кемине", en: "in Kemin", ky: "Кеминде" },
    ),
  ],
  // Ошская область
  [
    "osh",
    createRegionalLocation(
      "osh",
      { ru: "Ош", en: "Osh", ky: "Ош" },
      { ru: "в Оше", en: "in Osh", ky: "Ошто" },
    ),
  ],
  [
    "kara-suu",
    createRegionalLocation(
      "kara-suu",
      { ru: "Кара-Суу", en: "Kara-Suu", ky: "Кара-Суу" },
      { ru: "в Кара-Суу", en: "in Kara-Suu", ky: "Кара-Сууда" },
    ),
  ],
  [
    "ozgon",
    createRegionalLocation(
      "ozgon",
      { ru: "Узген", en: "Uzgen", ky: "Өзгөн" },
      { ru: "в Узгене", en: "in Uzgen", ky: "Өзгөндө" },
    ),
  ],
  [
    "aravan",
    createRegionalLocation(
      "aravan",
      { ru: "Араван", en: "Aravan", ky: "Араван" },
      { ru: "в Араване", en: "in Aravan", ky: "Араванда" },
    ),
  ],
  [
    "nookat",
    createRegionalLocation(
      "nookat",
      { ru: "Ноокат", en: "Nookat", ky: "Ноокат" },
      { ru: "в Ноокате", en: "in Nookat", ky: "Ноокатта" },
    ),
  ],
  [
    "chong-alay",
    createRegionalLocation(
      "chong-alay",
      { ru: "Чон-Алай", en: "Chong-Alay", ky: "Чоң-Алай" },
      { ru: "в Чон-Алае", en: "in Chong-Alay", ky: "Чоң-Алайда" },
    ),
  ],
  [
    "alai",
    createRegionalLocation(
      "alai",
      { ru: "Алай", en: "Alai", ky: "Алай" },
      { ru: "в Алае", en: "in Alai", ky: "Алайда" },
    ),
  ],
  [
    "kara-kulja",
    createRegionalLocation(
      "kara-kulja",
      { ru: "Кара-Кулжа", en: "Kara-Kulja", ky: "Кара-Кулжа" },
      { ru: "в Кара-Кулже", en: "in Kara-Kulja", ky: "Кара-Кулжада" },
    ),
  ],
  // Джалал-Абадская область
  [
    "jalal-abad",
    createRegionalLocation(
      "jalal-abad",
      { ru: "Джалал-Абад", en: "Jalal-Abad", ky: "Жалал-Абад" },
      { ru: "в Джалал-Абаде", en: "in Jalal-Abad", ky: "Жалал-Абадда" },
    ),
  ],
  [
    "toktogul",
    createRegionalLocation(
      "toktogul",
      { ru: "Токтогул", en: "Toktogul", ky: "Токтогул" },
      { ru: "в Токтогуле", en: "in Toktogul", ky: "Токтогулда" },
    ),
  ],
  [
    "tash-kumyr",
    createRegionalLocation(
      "tash-kumyr",
      { ru: "Таш-Кумыр", en: "Tash-Kumyr", ky: "Таш-Көмүр" },
      { ru: "в Таш-Кумыре", en: "in Tash-Kumyr", ky: "Таш-Көмүрдө" },
    ),
  ],
  [
    "suzak",
    createRegionalLocation(
      "suzak",
      { ru: "Сузак", en: "Suzak", ky: "Сузак" },
      { ru: "в Сузаке", en: "in Suzak", ky: "Сузакта" },
    ),
  ],
  [
    "bazar-korgon",
    createRegionalLocation(
      "bazar-korgon",
      { ru: "Базар-Коргон", en: "Bazar-Korgon", ky: "Базар-Коргон" },
      { ru: "в Базар-Коргоне", en: "in Bazar-Korgon", ky: "Базар-Коргондо" },
    ),
  ],
  [
    "kok-jangak",
    createRegionalLocation(
      "kok-jangak",
      { ru: "Кок-Жангак", en: "Kok-Jangak", ky: "Көк-Жаңак" },
      { ru: "в Кок-Жангаке", en: "in Kok-Jangak", ky: "Көк-Жаңакта" },
    ),
  ],
  [
    "mayluu-suu",
    createRegionalLocation(
      "mayluu-suu",
      { ru: "Майлуу-Суу", en: "Mayluu-Suu", ky: "Майлуу-Суу" },
      { ru: "в Майлуу-Суу", en: "in Mayluu-Suu", ky: "Майлуу-Сууда" },
    ),
  ],
  [
    "aksy",
    createRegionalLocation(
      "aksy",
      { ru: "Аксый", en: "Aksy", ky: "Аксы" },
      { ru: "в Аксые", en: "in Aksy", ky: "Аксыда" },
    ),
  ],
  [
    "chatkal",
    createRegionalLocation(
      "chatkal",
      { ru: "Чаткал", en: "Chatkal", ky: "Чаткал" },
      { ru: "в Чаткале", en: "in Chatkal", ky: "Чаткалда" },
    ),
  ],
  [
    "toguz-toro",
    createRegionalLocation(
      "toguz-toro",
      { ru: "Тогуз-Торо", en: "Toguz-Toro", ky: "Тогуз-Торо" },
      { ru: "в Тогуз-Торо", en: "in Toguz-Toro", ky: "Тогуз-Торода" },
    ),
  ],
  // Баткенская область
  [
    "batken",
    createRegionalLocation(
      "batken",
      { ru: "Баткен", en: "Batken", ky: "Баткен" },
      { ru: "в Баткене", en: "in Batken", ky: "Баткенде" },
    ),
  ],
  [
    "kadamjay",
    createRegionalLocation(
      "kadamjay",
      { ru: "Кадамжай", en: "Kadamjay", ky: "Кадамжай" },
      { ru: "в Кадамжае", en: "in Kadamjay", ky: "Кадамжайда" },
    ),
  ],
  [
    "leylek",
    createRegionalLocation(
      "leylek",
      { ru: "Лейлек", en: "Leylek", ky: "Лейлек" },
      { ru: "в Лейлеке", en: "in Leylek", ky: "Лейлекте" },
    ),
  ],
  [
    "isfana",
    createRegionalLocation(
      "isfana",
      { ru: "Исфана", en: "Isfana", ky: "Исфана" },
      { ru: "в Исфане", en: "in Isfana", ky: "Исфанада" },
    ),
  ],
  [
    "suluktu",
    createRegionalLocation(
      "suluktu",
      { ru: "Сулюкта", en: "Suluktu", ky: "Сүлүктү" },
      { ru: "в Сулюкте", en: "in Suluktu", ky: "Сүлүктүдө" },
    ),
  ],
  [
    "kyzyl-kiya",
    createRegionalLocation(
      "kyzyl-kiya",
      { ru: "Кызыл-Кия", en: "Kyzyl-Kiya", ky: "Кызыл-Кыя" },
      { ru: "в Кызыл-Кие", en: "in Kyzyl-Kiya", ky: "Кызыл-Кыяда" },
    ),
  ],
  // Нарынская область
  [
    "naryn",
    createRegionalLocation(
      "naryn",
      { ru: "Нарын", en: "Naryn", ky: "Нарын" },
      { ru: "в Нарыне", en: "in Naryn", ky: "Нарында" },
    ),
  ],
  [
    "kochkor",
    createRegionalLocation(
      "kochkor",
      { ru: "Кочкор", en: "Kochkor", ky: "Кочкор" },
      { ru: "в Кочкоре", en: "in Kochkor", ky: "Кочкордо" },
    ),
  ],
  [
    "at-bashy",
    createRegionalLocation(
      "at-bashy",
      { ru: "Ат-Башы", en: "At-Bashy", ky: "Ат-Башы" },
      { ru: "в Ат-Башы", en: "in At-Bashy", ky: "Ат-Башыда" },
    ),
  ],
  [
    "aktalaa",
    createRegionalLocation(
      "aktalaa",
      { ru: "Акталаа", en: "Aktalaa", ky: "Акталаа" },
      { ru: "в Акталаа", en: "in Aktalaa", ky: "Акталаада" },
    ),
  ],
  [
    "jumgal",
    createRegionalLocation(
      "jumgal",
      { ru: "Жумгал", en: "Jumgal", ky: "Жумгал" },
      { ru: "в Жумгале", en: "in Jumgal", ky: "Жумгалда" },
    ),
  ],
  [
    "chaek",
    createRegionalLocation(
      "chaek",
      { ru: "Чаек", en: "Chaek", ky: "Чаек" },
      { ru: "в Чаеке", en: "in Chaek", ky: "Чаекте" },
    ),
  ],
  // Иссык-Кульская область
  [
    "karakol",
    createRegionalLocation(
      "karakol",
      { ru: "Каракол", en: "Karakol", ky: "Каракол" },
      { ru: "в Караколе", en: "in Karakol", ky: "Караколдо" },
    ),
  ],
  [
    "cholpon-ata",
    createRegionalLocation(
      "cholpon-ata",
      { ru: "Чолпон-Ата", en: "Cholpon-Ata", ky: "Чолпон-Ата" },
      { ru: "в Чолпон-Ате", en: "in Cholpon-Ata", ky: "Чолпон-Атада" },
    ),
  ],
  [
    "issyk-kul",
    createRegionalLocation(
      "issyk-kul",
      { ru: "Иссык-Куль", en: "Issyk-Kul", ky: "Ысык-Көл" },
      {
        ru: "в Иссык-Кульской области",
        en: "in Issyk-Kul Region",
        ky: "Ысык-Көл облусунда",
      },
    ),
  ],
  [
    "balykchy",
    createRegionalLocation(
      "balykchy",
      { ru: "Балыкчы", en: "Balykchy", ky: "Балыкчы" },
      { ru: "в Балыкчы", en: "in Balykchy", ky: "Балыкчыда" },
    ),
  ],
  [
    "ak-suu",
    createRegionalLocation(
      "ak-suu",
      { ru: "Ак-Суу", en: "Ak-Suu", ky: "Ак-Суу" },
      { ru: "в Ак-Суу", en: "in Ak-Suu", ky: "Ак-Сууда" },
    ),
  ],
  [
    "tyup",
    createRegionalLocation(
      "tyup",
      { ru: "Тюп", en: "Tyup", ky: "Түп" },
      { ru: "в Тюпе", en: "in Tyup", ky: "Түптө" },
    ),
  ],
  [
    "jeti-oguz",
    createRegionalLocation(
      "jeti-oguz",
      { ru: "Жети-Өгүз", en: "Jeti-Oguz", ky: "Жети-Өгүз" },
      { ru: "в Жети-Өгүзе", en: "in Jeti-Oguz", ky: "Жети-Өгүздө" },
    ),
  ],
  [
    "ton",
    createRegionalLocation(
      "ton",
      { ru: "Тон", en: "Ton", ky: "Тоң" },
      { ru: "в Тоне", en: "in Ton", ky: "Тоңдо" },
    ),
  ],
  [
    "kyzyl-suu",
    createRegionalLocation(
      "kyzyl-suu",
      { ru: "Кызыл-Суу", en: "Kyzyl-Suu", ky: "Кызыл-Суу" },
      { ru: "в Кызыл-Суу", en: "in Kyzyl-Suu", ky: "Кызыл-Сууда" },
    ),
  ],
  // Таласская область
  [
    "talas",
    createRegionalLocation(
      "talas",
      { ru: "Талас", en: "Talas", ky: "Талас" },
      { ru: "в Таласе", en: "in Talas", ky: "Таласта" },
    ),
  ],
  [
    "manas",
    createRegionalLocation(
      "manas",
      { ru: "Манас", en: "Manas", ky: "Манас" },
      { ru: "в Манасе", en: "in Manas", ky: "Манаста" },
    ),
  ],
  [
    "kara-buura",
    createRegionalLocation(
      "kara-buura",
      { ru: "Кара-Буура", en: "Kara-Buura", ky: "Кара-Буура" },
      { ru: "в Кара-Буура", en: "in Kara-Buura", ky: "Кара-Буурада" },
    ),
  ],
  [
    "bakai-ata",
    createRegionalLocation(
      "bakai-ata",
      { ru: "Бакай-Ата", en: "Bakai-Ata", ky: "Бакай-Ата" },
      { ru: "в Бакай-Ате", en: "in Bakai-Ata", ky: "Бакай-Атада" },
    ),
  ],
  [
    "pokrovka",
    createRegionalLocation(
      "pokrovka",
      { ru: "Покровка", en: "Pokrovka", ky: "Покровка" },
      { ru: "в Покровке", en: "in Pokrovka", ky: "Покровкада" },
    ),
  ],
] as const satisfies ReadonlyArray<
  readonly [CanonicalRegionalLocationKey, RegionalLocation]
>;

export const REGIONAL_LOCATION_ORDER: CanonicalRegionalLocationKey[] =
  REGIONAL_LOCATION_ENTRIES.map(([slug]) => slug);

export const STATIC_REGIONAL_LOCATION_KEYS: CanonicalRegionalLocationKey[] = [
  "bishkek",
  "osh",
  "talas",
];

export const REGIONAL_LOCATION_ALIASES = {
  uzgen: "ozgon",
  leilek: "leylek",
  nookata: "nookat",
  "ak-talaa": "aktalaa",
} as const satisfies Partial<
  Record<RegionalLocationKey, CanonicalRegionalLocationKey>
>;

export const REGIONAL_LOCATIONS = REGIONAL_LOCATION_ENTRIES.reduce(
  (acc, [slug, location]) => {
    acc[slug] = location;
    return acc;
  },
  {} as Record<CanonicalRegionalLocationKey, RegionalLocation>,
);

export const resolveRegionalLocationKey = (
  slug: string,
): CanonicalRegionalLocationKey | undefined => {
  const canonicalSlug =
    REGIONAL_LOCATION_ALIASES[slug as RegionalLocationKey] ?? slug;

  return canonicalSlug in REGIONAL_LOCATIONS
    ? (canonicalSlug as CanonicalRegionalLocationKey)
    : undefined;
};

export const getRegionalLocation = (
  slug: string,
): RegionalLocation | undefined => {
  const resolvedSlug = resolveRegionalLocationKey(slug);

  return resolvedSlug ? REGIONAL_LOCATIONS[resolvedSlug] : undefined;
};

export const getRegionalLocationText = (
  locale: Locale,
  slug: string,
) => getRegionalLocation(slug)?.name[locale] || slug;

export const getRegionalLocationInText = (
  locale: Locale,
  slug: string,
) => getRegionalLocation(slug)?.in[locale] || slug;

export const getRegionalLocationChips = (locale: Locale) =>
  REGIONAL_LOCATION_ORDER.map((slug) => ({
    slug,
    name: getRegionalLocationText(locale, slug),
    in: getRegionalLocationInText(locale, slug),
  }));
