import { Metadata } from "next";
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
import { buildNoIndexMetadata } from "@/seo/metadata";
export const metadata: Metadata = {
  ...buildNoIndexMetadata(
    "Блог",
    "Альтернативный вариант списка статей TOMSTORE.",
    "/blogs",
  ),
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
    const blogs = await queryClient.fetchQuery(storefrontBlogsQueryOptions(query));

    return (
      <main>
        <BlogListView
          blogs={blogs}
          pathname="/blogs/blog-grid-with-sidebar"
          query={query}
          variant="sidebar"
        />
      </main>
    );
  } catch (error) {
    if (error instanceof StorefrontApiError && error.status === 401) {
      redirect("/");
    }
    throw error;
  }
};

export default BlogGridWithSidebarPage;
