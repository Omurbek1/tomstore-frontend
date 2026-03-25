import { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import CatalogView from "@/components/Storefront/CatalogView";
import {
  storefrontCatalogQueryOptions,
  type StorefrontCatalogRouteQuery,
} from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import { buildSeoMetadata } from "@/seo/metadata";
import { buildAbsoluteUrl } from "@/storefront/site";
import type { StorefrontCatalogResponse } from "@/storefront/types";
import {
  buildBrandPath,
  buildCatalogHref,
  buildCategoryPath,
  buildLegacyCatalogPath,
  humanizeCatalogSlug,
  isIndexableCatalogLanding,
  isSimpleBrandLanding,
  isSimpleCategoryLanding,
  normalizeCatalogQuery,
} from "@/storefront/catalog-routing";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const resolveCatalogSeo = (
  query: StorefrontCatalogRouteQuery,
  catalog?: StorefrontCatalogResponse,
) => {
  const selectedCategory = catalog?.filters.categories.find(
    (item) => item.slug === query.category,
  );
  const selectedBrand = catalog?.filters.brands.find(
    (item) => item.slug === query.brand,
  );
  const categoryName = selectedCategory?.name || humanizeCatalogSlug(query.category);
  const brandName = selectedBrand?.name || humanizeCatalogSlug(query.brand);

  if (isSimpleCategoryLanding(query) && categoryName) {
    return {
      title: `${categoryName} - купить в Бишкеке`,
      description: `${categoryName} в интернет-магазине TOMSTORE. Удобный выбор, актуальные цены и быстрый заказ через WhatsApp.`,
      path: buildCategoryPath(query.category || ""),
      keywords: [
        categoryName,
        `купить ${categoryName.toLowerCase()}`,
        `${categoryName} Бишкек`,
      ],
      breadcrumbLabel: categoryName,
    };
  }

  if (isSimpleBrandLanding(query) && brandName) {
    return {
      title: `${brandName} - техника и электроника`,
      description: `Техника ${brandName} в интернет-магазине TOMSTORE: ноутбуки, принтеры, компьютеры и аксессуары с удобным заказом через WhatsApp.`,
      path: buildBrandPath(query.brand || ""),
      keywords: [brandName, `${brandName} Бишкек`, `${brandName} Кыргызстан`],
      breadcrumbLabel: brandName,
    };
  }

  return {
    title: "Каталог товаров",
    description:
      "Каталог ноутбуков, принтеров, компьютеров и аксессуаров TOMSTORE.",
    path: buildLegacyCatalogPath(),
    keywords: [
      "каталог техники",
      "ноутбуки",
      "принтеры",
      "электроника",
      "компьютеры",
    ],
    breadcrumbLabel: "Каталог",
  };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const params = await searchParams;
  const query = normalizeCatalogQuery(params);
  const queryClient = makeQueryClient();
  const shouldIndex = isIndexableCatalogLanding(query);
  const catalog = shouldIndex
    ? await queryClient.fetchQuery(storefrontCatalogQueryOptions(query))
    : undefined;
  const seo = resolveCatalogSeo(query, catalog);

  return buildSeoMetadata({
    title: seo.title,
    description: seo.description,
    path: shouldIndex ? seo.path : "/shop-with-sidebar",
    noIndex: !shouldIndex,
    keywords: seo.keywords,
  });
}

const ShopWithSidebarPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const query = normalizeCatalogQuery(params);

  if (isSimpleCategoryLanding(query) && query.category) {
    redirect(
      buildCatalogHref(
        query,
        {
          type: "catalog",
        },
        "category",
      ),
    );
  }

  if (isSimpleBrandLanding(query) && query.brand) {
    redirect(
      buildCatalogHref(
        query,
        {
          type: "catalog",
        },
        "brand",
      ),
    );
  }

  const queryClient = makeQueryClient();
  const catalog = await queryClient.fetchQuery(storefrontCatalogQueryOptions(query));
  const seo = resolveCatalogSeo(query, catalog);
  const canonicalPath = isIndexableCatalogLanding(query) ? seo.path : "/shop-with-sidebar";
  const collectionStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: seo.title,
    description: seo.description,
    url: buildAbsoluteUrl(canonicalPath),
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
      ...(seo.breadcrumbLabel !== "Каталог"
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: seo.breadcrumbLabel,
              item: buildAbsoluteUrl(canonicalPath),
            },
          ]
        : []),
    ],
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
      <HydrationBoundary state={dehydrate(queryClient)}>
        <main>
          <CatalogView query={query} variant="sidebar" />
        </main>
      </HydrationBoundary>
    </>
  );
};

export default ShopWithSidebarPage;
