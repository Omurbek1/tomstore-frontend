import { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import BlogPostView from "@/components/Storefront/BlogPostView";
import {
  StorefrontApiError,
  storefrontBlogQueryOptions,
  storefrontBlogsQueryOptions,
  storefrontConfigQueryOptions,
} from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import { redirect } from "next/navigation";
import { isStorefrontBlogPublic } from "@/storefront/auth";
import { buildNoIndexMetadata } from "@/seo/metadata";
export const metadata: Metadata = {
  ...buildNoIndexMetadata(
    "Статья",
    "Альтернативный вариант страницы статьи TOMSTORE.",
    "/blogs/blog-grid",
  ),
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const BlogDetailsWithSidebarPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const slug = typeof params.slug === "string" ? params.slug : undefined;
  const queryClient = makeQueryClient();
  const storefrontConfig = await queryClient.fetchQuery(
    storefrontConfigQueryOptions(),
  );
  if (!isStorefrontBlogPublic(storefrontConfig)) {
    redirect("/");
  }

  if (!slug) {
    let blogs = null;
    try {
      blogs = await queryClient.fetchQuery(storefrontBlogsQueryOptions());
    } catch (error) {
      if (error instanceof StorefrontApiError && error.status === 401) {
        redirect("/");
      }
      throw error;
    }
    if (blogs.items[0]?.slug) {
      redirect(`/blogs/blog-details-with-sidebar?slug=${blogs.items[0].slug}`);
    }
    redirect("/blogs/blog-grid-with-sidebar");
  }

  let post = null;
  try {
    post = await queryClient.fetchQuery(storefrontBlogQueryOptions(slug));
  } catch (error) {
    if (error instanceof StorefrontApiError && error.status === 401) {
      redirect("/");
    }
    throw error;
  }
  if (!post) {
    redirect("/blogs/blog-grid-with-sidebar");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <BlogPostView slug={slug} variant="sidebar" />
      </main>
    </HydrationBoundary>
  );
};

export default BlogDetailsWithSidebarPage;
