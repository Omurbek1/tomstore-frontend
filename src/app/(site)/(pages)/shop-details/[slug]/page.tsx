import ProductDetailsView from "@/components/Storefront/ProductDetailsView";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { storefrontProductQueryOptions } from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildSeoMetadata } from "@/seo/metadata";
import { buildAbsoluteUrl } from "@/storefront/site";
import { getStorefrontProductBrand } from "@/storefront/mappers";

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

  return buildSeoMetadata({
    title: product.seoTitle || product.name,
    description:
      product.seoDescription || product.shortDescription || product.name,
    path: `/shop-details/${product.slug}`,
    image: product.gallery[0],
    keywords: [
      product.name,
      product.category,
      product.brand,
      product.sku,
    ].filter(Boolean) as string[],
  });
}

export default async function ShopDetailsSlugPage({ params }: Props) {
  const { slug } = await params;
  const queryClient = makeQueryClient();
  const product = await queryClient.fetchQuery(storefrontProductQueryOptions(slug));

  if (!product) {
    notFound();
  }

  const productBrand = getStorefrontProductBrand(product);
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
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: product.breadcrumbs.map((item, index) => ({
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
        <ProductDetailsView slug={slug} />
      </HydrationBoundary>
    </>
  );
}
