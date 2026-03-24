"use client";

import BlogMedia from "@/components/Storefront/BlogMedia";
import { useI18n } from "@/i18n/provider";
import { useStorefrontBlogsQuery } from "@/storefront/hooks";
import Link from "next/link";

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

export default function LatestBlogPosts({
  enabled = true,
}: {
  enabled?: boolean;
}) {
  const { t } = useI18n();
  const { data } = useStorefrontBlogsQuery({}, { enabled });
  if (!enabled) return null;
  const posts = data?.enabled ? data.items.slice(0, 3) : [];

  if (!posts.length) {
    return null;
  }

  return (
    <section className="overflow-hidden bg-white py-18">
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.24em] text-blue">
              {t("common.blogs")}
            </span>
            <h2 className="text-2xl font-semibold text-dark sm:text-[34px]">
              {t("common.blogs")}
            </h2>
          </div>

          <Link
            href="/blogs/blog-grid"
            className="inline-flex rounded-md border border-blue px-5 py-3 font-medium text-blue transition-colors duration-200 hover:bg-blue hover:text-white"
          >
            {t("common.viewAll")}
          </Link>
        </div>

        <div className="grid gap-7.5 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-xl border border-gray-3 bg-white p-4 shadow-1"
            >
              <Link
                href={`/blogs/blog-details?slug=${post.slug}`}
                className="block overflow-hidden rounded-md"
              >
                <BlogMedia
                  title={post.title}
                  imageUrl={post.coverImageUrl}
                  videoUrl={post.coverVideoUrl}
                  mediaClassName="h-[220px] w-full rounded-md object-cover"
                />
              </Link>

              <div className="mt-5">
                <div className="mb-3 flex flex-wrap items-center gap-3 text-custom-sm text-dark-4">
                  <span>{formatBlogDate(post.publishedAt)}</span>
                  <span className="block h-4 w-px bg-gray-4"></span>
                  <span>
                    {post.views} {t("common.views")}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-medium text-dark transition-colors duration-200 hover:text-blue">
                  <Link href={`/blogs/blog-details?slug=${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="mb-5 text-custom-sm text-dark-4">{post.excerpt}</p>

                <Link
                  href={`/blogs/blog-details?slug=${post.slug}`}
                  className="inline-flex items-center gap-2 text-custom-sm font-medium text-blue"
                >
                  {t("common.readMore")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
