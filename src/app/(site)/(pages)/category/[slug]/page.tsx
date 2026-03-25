import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogView from "@/components/Storefront/CatalogView";
import CatalogSeoSection from "@/components/Storefront/CatalogSeoSection";
import {
  buildCatalogHref,
  buildCategoryPath,
  isSimpleCategoryLanding,
  normalizeCatalogQuery,
} from "@/storefront/catalog-routing";
import { buildSeoMetadata } from "@/seo/metadata";
import { getCategorySeoContent } from "@/seo/content";
import { getRequestLocale } from "@/seo/request-locale";
import { storefrontCatalogQueryOptions } from "@/storefront/query-options";
import { buildAbsoluteUrl } from "@/storefront/site";
import { makeQueryClient } from "@/tanstack-query/query-client";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const buildCategoryQuery = (
  slug: string,
  params: Record<string, string | string[] | undefined>,
) => ({
  ...normalizeCatalogQuery(params),
  category: slug,
});

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const [{ slug }, rawSearchParams, locale] = await Promise.all([
    params,
    searchParams,
    getRequestLocale(),
  ]);
  const query = buildCategoryQuery(slug, rawSearchParams);
  const queryClient = makeQueryClient();
  const catalog = await queryClient.fetchQuery(storefrontCatalogQueryOptions(query));
  const category = catalog.filters.categories.find((item) => item.slug === slug);

  if (!category) {
    return {
      title: "Category not found | TOMSTORE",
      description: "This category could not be found.",
    };
  }

  const content = getCategorySeoContent(locale, category.name);

  return buildSeoMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: buildCategoryPath(slug),
    image: category.image,
    noIndex: !isSimpleCategoryLanding(query),
    keywords: content.keywords,
  });
}

export default async function CategoryLandingPage({
  params,
  searchParams,
}: Props) {
  const [{ slug }, rawSearchParams, locale] = await Promise.all([
    params,
    searchParams,
    getRequestLocale(),
  ]);
  const query = buildCategoryQuery(slug, rawSearchParams);
  const queryClient = makeQueryClient();
  const catalog = await queryClient.fetchQuery(storefrontCatalogQueryOptions(query));
  const category = catalog.filters.categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const content = getCategorySeoContent(locale, category.name);
  const routeContext = {
    type: "category" as const,
    slug,
  };
  const currentPath = buildCatalogHref(query, routeContext);
  const collectionStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: content.metaTitle,
    description: content.metaDescription,
    url: buildAbsoluteUrl(currentPath),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: catalog.total,
      itemListElement: catalog.items.slice(0, 12).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: buildAbsoluteUrl(`/shop-details/${item.slug}`),
        item: {
          "@type": "Product",
          name: item.name,
          image: item.gallery?.[0]
            ? buildAbsoluteUrl(item.gallery[0])
            : undefined,
          offers: {
            "@type": "Offer",
            priceCurrency: "KGS",
            price: item.price,
            availability: item.availability.isInStock
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            url: buildAbsoluteUrl(`/shop-details/${item.slug}`),
          },
        },
      })),
    },
  };
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: buildAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Каталог",
        item: buildAbsoluteUrl("/shop-with-sidebar"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: buildAbsoluteUrl(currentPath),
      },
    ],
  };
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      <main className="relative overflow-hidden pb-16 sm:pb-20">
        <CatalogView
          catalog={catalog}
          title={content.introTitle}
          breadcrumbCurrent={category.name}
          routeContext={routeContext}
          query={query}
          variant="sidebar"
        />
        <div className="relative z-10 -mt-4 sm:-mt-6">
          <CatalogSeoSection
            content={content}
            totalProducts={category.totalProducts}
          />
        </div>
      </main>
    </>
  );
}
