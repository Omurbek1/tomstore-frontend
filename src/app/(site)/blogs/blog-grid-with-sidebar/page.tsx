import { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import BlogListView from "@/components/Storefront/BlogListView";
import {
  StorefrontApiError,
  storefrontBlogsQueryOptions,
  storefrontConfigQueryOptions,
  type StorefrontBlogRouteQuery,
} from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import { isStorefrontBlogPublic } from "@/storefront/auth";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Blog Grid Page | NextCommerce Nextjs E-commerce template",
  description: "This is Blog Grid Page for NextCommerce Template",
  // other metadata
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const BlogGridWithSidebarPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const query: StorefrontBlogRouteQuery = {
    q: typeof params.q === "string" ? params.q : undefined,
    category:
      typeof params.category === "string" ? params.category : undefined,
    tag: typeof params.tag === "string" ? params.tag : undefined,
  };
  const queryClient = makeQueryClient();
  const storefrontConfig = await queryClient.fetchQuery(
    storefrontConfigQueryOptions(),
  );
  if (!isStorefrontBlogPublic(storefrontConfig)) {
    redirect("/");
  }

  try {
    await queryClient.fetchQuery(storefrontBlogsQueryOptions(query));
  } catch (error) {
    if (error instanceof StorefrontApiError && error.status === 401) {
      redirect("/");
    }
    throw error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <BlogListView
          pathname="/blogs/blog-grid-with-sidebar"
          query={query}
          variant="sidebar"
        />
      </main>
    </HydrationBoundary>
  );
};

export default BlogGridWithSidebarPage;
