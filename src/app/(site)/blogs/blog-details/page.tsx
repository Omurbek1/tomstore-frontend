import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildNoIndexMetadata } from "@/seo/metadata";
import { buildBlogPath, buildBlogPostPath } from "@/storefront/blog-routing";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = {
  ...buildNoIndexMetadata(
    "Статья",
    "Устаревший маршрут статьи TOMSTORE.",
    buildBlogPath(),
  ),
};

const BlogDetailsPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const slug = typeof params.slug === "string" ? params.slug : undefined;

  if (slug) {
    redirect(buildBlogPostPath(slug));
  }

  redirect(buildBlogPath());
};

export default BlogDetailsPage;
