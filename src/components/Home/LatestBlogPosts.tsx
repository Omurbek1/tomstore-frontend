"use client";

import BlogMedia from "@/components/Storefront/BlogMedia";
import { useI18n } from "@/i18n/provider";
import { buildBlogPath, buildBlogPostPath } from "@/storefront/blog-routing";
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
    <section className="overflow-hidden">
      <div className="mx-auto max-w-[1170px]">
        <div className="section-shell px-4 py-7 sm:px-8 sm:py-8 xl:px-10 xl:py-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="section-kicker">
              {t("common.blogs")}
            </span>
            <h2 className="section-title mt-4">
              {t("common.blogs")}
            </h2>
          </div>

          <Link
            href={buildBlogPath()}
            className="inline-flex rounded-full border border-white bg-white px-5 py-3 text-sm font-medium text-dark transition-all duration-200 hover:-translate-y-0.5 hover:bg-dark hover:text-white"
          >
            {t("common.viewAll")}
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-[26px] border border-white/80 bg-white/90 p-4 shadow-[0_24px_52px_-36px_rgba(15,23,42,0.34)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_64px_-36px_rgba(60,80,224,0.22)]"
            >
              <Link
                href={buildBlogPostPath(post.slug)}
                className="block overflow-hidden rounded-[20px]"
              >
                <BlogMedia
                  title={post.title}
                  imageUrl={post.coverImageUrl}
                  videoUrl={post.coverVideoUrl}
                  mediaClassName="h-[240px] w-full rounded-[20px] object-cover"
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
                  <Link href={buildBlogPostPath(post.slug)}>
                    {post.title}
                  </Link>
                </h3>

                <p className="mb-5 text-custom-sm text-dark-4">{post.excerpt}</p>

                <Link
                  href={buildBlogPostPath(post.slug)}
                  className="inline-flex items-center gap-2 text-custom-sm font-medium text-blue"
                >
                  {t("common.readMore")}
                </Link>
              </div>
            </article>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
