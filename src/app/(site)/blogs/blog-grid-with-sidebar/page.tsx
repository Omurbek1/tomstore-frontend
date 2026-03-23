import { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import BlogListView from "@/components/Storefront/BlogListView";
import {
  storefrontBlogsQueryOptions,
  type StorefrontBlogRouteQuery,
} from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
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
  await queryClient.prefetchQuery(storefrontBlogsQueryOptions(query));

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
