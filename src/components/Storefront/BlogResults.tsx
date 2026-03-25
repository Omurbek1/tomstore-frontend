"use client";

import BlogMedia from "@/components/Storefront/BlogMedia";
import { useI18n } from "@/i18n/provider";
import {
  buildBlogPostPath,
  buildLegacyBlogPostPath,
} from "@/storefront/blog-routing";
import type { StorefrontBlogPostSummary } from "@/storefront/types";
import Link from "next/link";
import { memo } from "react";

type BlogResultsProps = {
  posts: StorefrontBlogPostSummary[];
  variant: "grid" | "sidebar";
};

const formatBlogDate = (value?: string) => {
  if (!value) {
    return "—";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function BlogResultsComponent({ posts, variant }: BlogResultsProps) {
  const { t } = useI18n();
  const detailPath =
    variant === "sidebar" ? "/blogs/blog-details-with-sidebar" : undefined;
  const buildPostHref = (slug: string) =>
    variant === "sidebar"
      ? buildLegacyBlogPostPath(slug, detailPath)
      : buildBlogPostPath(slug);

  return (
    <div
      className={`grid grid-cols-1 ${
        variant === "sidebar"
          ? "sm:grid-cols-2"
          : "sm:grid-cols-2 lg:grid-cols-3"
      } gap-y-10 gap-x-7.5`}
    >
      {posts.map((blog) => (
        <article
          key={blog.slug}
          className="shadow-1 bg-white rounded-xl px-4 sm:px-5 pt-5 pb-4"
        >
          <Link
            href={buildPostHref(blog.slug)}
            className="block rounded-md overflow-hidden"
          >
            <BlogMedia
              title={blog.title}
              imageUrl={blog.coverImageUrl}
              videoUrl={blog.coverVideoUrl}
              mediaClassName="h-[210px] w-full rounded-md object-cover"
            />
          </Link>

          <div className="mt-5.5">
            <span className="flex items-center gap-3 mb-2.5 text-custom-sm">
              <span>{formatBlogDate(blog.publishedAt)}</span>
              <span className="block w-px h-4 bg-gray-4"></span>
              <span>
                {blog.views} {t("common.views")}
              </span>
            </span>

            <h2 className="font-medium text-dark text-lg sm:text-xl ease-out duration-200 mb-3 hover:text-blue">
              <Link href={buildPostHref(blog.slug)}>{blog.title}</Link>
            </h2>

            <p className="mb-4 text-custom-sm text-dark-4">{blog.excerpt}</p>

            <Link
              href={buildPostHref(blog.slug)}
              className="text-custom-sm inline-flex items-center gap-2 py-2 ease-out duration-200 hover:text-blue"
            >
              {t("common.readMore")}
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

const BlogResults = memo(BlogResultsComponent);

BlogResults.displayName = "BlogResults";

export default BlogResults;
