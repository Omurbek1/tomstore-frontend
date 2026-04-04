import type { Metadata } from "next";
import RegionsHubPage from "@/components/Storefront/RegionsHubPage";
import { getRegionsHubSeoContent } from "@/seo/regions-content";
import { buildSeoMetadata } from "@/seo/metadata";
import { getRegionalLocationChips } from "@/seo/location-data";
import { getRequestLocale } from "@/seo/request-locale";
import { buildElectronicsPath, buildRegionsPath } from "@/storefront/catalog-routing";

const getBreadcrumbLabels = (locale: string) => ({
  home: locale === "en" ? "Home" : locale === "ky" ? "Башкы бет" : "Главная",
  section:
    locale === "en" ? "Electronics" : locale === "ky" ? "Электроника" : "Электроника",
  current: locale === "en" ? "Regions" : locale === "ky" ? "Аймактар" : "Регионы",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const content = getRegionsHubSeoContent(locale);

  return buildSeoMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: buildRegionsPath(),
    keywords: content.keywords,
  });
}

export default async function RegionsPage() {
  const locale = await getRequestLocale();
  const content = getRegionsHubSeoContent(locale);
  const locations = getRegionalLocationChips(locale);
  const labels = getBreadcrumbLabels(locale);

  return (
    <RegionsHubPage
      content={content}
      locations={locations}
      path={buildRegionsPath()}
      homeLabel={labels.home}
      sectionLabel={labels.section}
      sectionHref={buildElectronicsPath()}
      currentLabel={labels.current}
    />
  );
}
