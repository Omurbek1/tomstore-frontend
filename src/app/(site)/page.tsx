import Home from "@/components/Home";
import { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  storefrontBlogsQueryOptions,
  storefrontConfigQueryOptions,
  storefrontHomeQueryOptions,
  StorefrontApiError,
} from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import { isStorefrontBlogPublic } from "@/storefront/auth";
import { buildSeoMetadata } from "@/seo/metadata";

export const metadata: Metadata = {
  ...buildSeoMetadata({
    title: "Интернет-магазин техники",
    description:
      "Ноутбуки, принтеры, компьютеры и аксессуары TOMSTORE с актуальными ценами и удобным заказом через WhatsApp.",
    path: "/",
  }),
};

export default async function HomePage() {
  const queryClient = makeQueryClient();
  const [storefrontConfig] = await Promise.all([
    queryClient.fetchQuery(storefrontConfigQueryOptions()),
    queryClient.prefetchQuery(storefrontHomeQueryOptions()),
  ]);
  let canShowBlogPreview = isStorefrontBlogPublic(storefrontConfig);

  if (canShowBlogPreview) {
    try {
      await queryClient.fetchQuery(storefrontBlogsQueryOptions());
    } catch (error) {
      if (error instanceof StorefrontApiError && error.status === 401) {
        canShowBlogPreview = false;
      } else {
        throw error;
      }
    }
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Home canShowBlogPreview={canShowBlogPreview} />
    </HydrationBoundary>
  );
}
