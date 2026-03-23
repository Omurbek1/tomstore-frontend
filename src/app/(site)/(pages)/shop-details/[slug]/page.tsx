import ProductDetailsView from "@/components/Storefront/ProductDetailsView";
import { getStorefrontProduct } from "@/storefront/api";
import {
  mapStorefrontProductToProduct,
  mapStorefrontProductsToProducts,
} from "@/storefront/mappers";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getStorefrontProduct(slug);

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
  const product = await getStorefrontProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = mapStorefrontProductsToProducts(product.relatedProducts);
  const recommendedProducts = mapStorefrontProductsToProducts(
    product.recommendedProducts,
  );

  return (
    <ProductDetailsView
      product={product}
      relatedProducts={relatedProducts}
      recommendedProducts={recommendedProducts}
    />
  );
}
