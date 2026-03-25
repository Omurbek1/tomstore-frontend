import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildNoIndexMetadata } from "@/seo/metadata";
import { buildBlogHref, normalizeBlogQuery } from "@/storefront/blog-routing";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = {
  ...buildNoIndexMetadata(
    "Блог",
    "Устаревший маршрут списка статей TOMSTORE.",
    "/blogs",
  ),
};

const BlogGridPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  redirect(buildBlogHref(normalizeBlogQuery(params)));
};

export default BlogGridPage;
