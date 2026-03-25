import ProductDetailsView from "@/components/Storefront/ProductDetailsView";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  storefrontCatalogQueryOptions,
  storefrontProductQueryOptions,
} from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildSeoMetadata } from "@/seo/metadata";
import { buildAbsoluteUrl } from "@/storefront/site";
import { getStorefrontProductBrand } from "@/storefront/mappers";
import {
  buildBrandPath,
  buildCategoryPath,
} from "@/storefront/catalog-routing";

const normalizeLookupValue = (value?: string | null) =>
  String(value || "")
    .trim()
    .toLowerCase();

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const queryClient = makeQueryClient();
  const product = await queryClient.fetchQuery(storefrontProductQueryOptions(slug));

  if (!product) {
    return {
      title: "Product not found | TOMSTORE",
      description: "This product could not be found.",
    };
  }

  const productBrand = getStorefrontProductBrand(product);

  return buildSeoMetadata({
    title: product.seoTitle || product.name,
    description:
      product.seoDescription || product.shortDescription || product.name,
    path: `/shop-details/${product.slug}`,
    image: product.gallery[0],
    keywords: [
      product.name,
      product.category,
      productBrand,
      product.sku,
    ].filter(Boolean) as string[],
  });
}

export default async function ShopDetailsSlugPage({ params }: Props) {
  const { slug } = await params;
  const queryClient = makeQueryClient();
  const [product, catalog] = await Promise.all([
    queryClient.fetchQuery(storefrontProductQueryOptions(slug)),
    queryClient.fetchQuery(storefrontCatalogQueryOptions({})),
  ]);

  if (!product) {
    notFound();
  }

  const productBrand = getStorefrontProductBrand(product);
  const categoryHref = catalog.filters.categories.find(
    (item) => normalizeLookupValue(item.name) === normalizeLookupValue(product.category),
  )?.slug;
  const brandHref =
    productBrand &&
    catalog.filters.brands.find(
      (item) => normalizeLookupValue(item.name) === normalizeLookupValue(productBrand),
    )?.slug;
  const resolvedCategoryHref = categoryHref ? buildCategoryPath(categoryHref) : undefined;
  const resolvedBrandHref = brandHref ? buildBrandPath(brandHref) : undefined;
  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.gallery.map((image) => buildAbsoluteUrl(image)),
    description: product.shortDescription || product.seoDescription || product.name,
    sku: product.sku,
    brand: productBrand
      ? {
          "@type": "Brand",
          name: productBrand,
        }
      : undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: "KGS",
      price: product.price,
      availability: product.availability.isInStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: buildAbsoluteUrl(`/shop-details/${product.slug}`),
    },
  };
  const breadcrumbs =
    product.breadcrumbs.length > 0
      ? product.breadcrumbs.map((item) =>
          normalizeLookupValue(item.label) === normalizeLookupValue(product.category) &&
          resolvedCategoryHref
            ? {
                ...item,
                href: resolvedCategoryHref,
              }
            : item,
        )
      : [
          {
            label: "Главная",
            href: "/",
          },
          {
            label: "Каталог",
            href: "/shop-with-sidebar",
          },
          ...(product.category && resolvedCategoryHref
            ? [
                {
                  label: product.category,
                  href: resolvedCategoryHref,
                },
              ]
            : []),
          {
            label: product.name,
            href: `/shop-details/${product.slug}`,
          },
        ];
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: buildAbsoluteUrl(item.href),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductDetailsView
          slug={slug}
          categoryHref={resolvedCategoryHref}
          brandHref={resolvedBrandHref || undefined}
        />
      </HydrationBoundary>
    </>
  );
}
