import ProductDetailsView from "@/components/Storefront/ProductDetailsView";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { storefrontProductQueryOptions } from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

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

  return {
    title: product.seoTitle,
    description: product.seoDescription,
  };
}

export default async function ShopDetailsSlugPage({ params }: Props) {
  const { slug } = await params;
  const queryClient = makeQueryClient();
  const product = await queryClient.fetchQuery(storefrontProductQueryOptions(slug));

  if (!product) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetailsView slug={slug} />
    </HydrationBoundary>
  );
}
