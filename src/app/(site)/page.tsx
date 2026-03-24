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

export const metadata: Metadata = {
  title: "NextCommerce | Nextjs E-commerce template",
  description: "This is Home for NextCommerce Template",
  // other metadata
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
