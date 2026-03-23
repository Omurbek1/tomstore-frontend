import { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import BlogPostView from "@/components/Storefront/BlogPostView";
import {
  storefrontBlogQueryOptions,
  storefrontBlogsQueryOptions,
} from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Blog Details Page | NextCommerce Nextjs E-commerce template",
  description: "This is Blog Details Page for NextCommerce Template",
  // other metadata
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const BlogDetailsWithSidebarPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const slug = typeof params.slug === "string" ? params.slug : undefined;
  const queryClient = makeQueryClient();

  if (!slug) {
    const blogs = await queryClient.fetchQuery(storefrontBlogsQueryOptions());
    if (blogs.items[0]?.slug) {
      redirect(`/blogs/blog-details-with-sidebar?slug=${blogs.items[0].slug}`);
    }
    redirect("/blogs/blog-grid-with-sidebar");
  }

  const post = await queryClient.fetchQuery(storefrontBlogQueryOptions(slug));
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
