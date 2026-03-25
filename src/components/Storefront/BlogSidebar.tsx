"use client";

import BlogMedia from "@/components/Storefront/BlogMedia";
import { useI18n } from "@/i18n/provider";
import type { BlogRouteContext } from "@/storefront/blog-routing";
import {
  buildBlogHref,
  buildBlogPostPath,
  buildLegacyBlogListPath,
  buildLegacyBlogPostPath,
} from "@/storefront/blog-routing";
import type { StorefrontBlogRouteQuery } from "@/storefront/query-keys";
import type {
  StorefrontBlogCategory,
  StorefrontBlogPostSummary,
  StorefrontBlogTag,
  StorefrontProductCard,
} from "@/storefront/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

type BlogSidebarProps = {
  categories: StorefrontBlogCategory[];
  featuredProducts: StorefrontProductCard[];
  pathname: string;
  query: StorefrontBlogRouteQuery;
  recentPosts: StorefrontBlogPostSummary[];
  routeContext: BlogRouteContext;
  tags: StorefrontBlogTag[];
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

export default function BlogSidebar({
  categories,
  featuredProducts,
  pathname,
  query,
  recentPosts,
  routeContext,
  tags,
  variant,
}: BlogSidebarProps) {
  const router = useRouter();
  const { t, formatPrice } = useI18n();
  const [searchValue, setSearchValue] = useState(query.q || "");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setSearchValue(query.q || "");
  }, [query.q]);

  const detailPath =
    variant === "sidebar" ? "/blogs/blog-details-with-sidebar" : undefined;

  const buildListHref = (overrides: Partial<StorefrontBlogRouteQuery> = {}) => {
    const nextQuery = { ...query, ...overrides };

    return variant === "sidebar"
      ? buildLegacyBlogListPath(nextQuery, pathname)
      : buildBlogHref(nextQuery, routeContext);
  };

  const buildPostHref = (slug: string) =>
    variant === "sidebar"
      ? buildLegacyBlogPostPath(slug, detailPath)
      : buildBlogPostPath(slug);

  const applySearch = () => {
    startTransition(() => {
      router.push(
        buildListHref({
          q: searchValue.trim() || undefined,
        }),
      );
    });
  };

  return (
    <aside className="lg:max-w-[370px] w-full space-y-7.5">
      <div className="shadow-1 bg-white rounded-xl">
        <div className="px-4 sm:px-6 py-4.5 border-b border-gray-3">
          <h2 className="font-medium text-lg text-dark">{t("blog.search")}</h2>
        </div>

        <div className="p-4 sm:p-6">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              applySearch();
            }}
          >
            <div className="relative">
              <input
                type="text"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder={t("blog.searchPlaceholder")}
                className="w-full rounded-md border border-gray-3 py-3 pl-5 pr-13 outline-none ease-out duration-200 placeholder:text-dark-5 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
              />
              <button
                disabled={isPending}
                className="text-dark-2 absolute right-0 top-0 px-4 py-3.5 ease-out duration-200 hover:text-blue disabled:cursor-not-allowed disabled:opacity-70"
              >
                {t("common.search")}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="shadow-1 bg-white rounded-xl">
        <div className="px-4 sm:px-6 py-4.5 border-b border-gray-3">
          <h2 className="font-medium text-lg text-dark">
            {t("blog.recentPosts")}
          </h2>
        </div>

        <div className="p-4 sm:p-6">
          <div className="flex flex-col gap-6">
            {recentPosts.map((blog) => (
              <div className="flex items-center gap-4" key={blog.slug}>
                <Link
                  href={buildPostHref(blog.slug)}
                  className="max-w-[110px] w-full rounded-[10px] overflow-hidden"
                >
                  <BlogMedia
                    title={blog.title}
                    imageUrl={blog.coverImageUrl}
                    videoUrl={blog.coverVideoUrl}
                    mediaClassName="h-20 w-full rounded-[10px] object-cover"
                    fallbackClassName="flex h-20 w-full items-center justify-center rounded-[10px] bg-gray-1 px-3 text-center text-xs text-dark-4"
                  />
                </Link>

                <div>
                  <h3 className="text-dark leading-[22px] ease-out duration-200 mb-1.5 hover:text-blue">
                    <Link href={buildPostHref(blog.slug)}>{blog.title}</Link>
                  </h3>

                  <span className="flex items-center gap-3 text-custom-xs">
                    <span>{formatBlogDate(blog.publishedAt)}</span>
                    <span className="block w-px h-4 bg-gray-4"></span>
                    <span>
                      {blog.views} {t("common.views")}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="shadow-1 bg-white rounded-xl">
        <div className="px-4 sm:px-6 py-4.5 border-b border-gray-3">
          <h2 className="font-medium text-lg text-dark">
            {t("blog.latestProducts")}
          </h2>
        </div>

        <div className="p-4 sm:p-6">
          <div className="flex flex-col gap-6">
            {featuredProducts.map((product) => (
              <div className="flex items-center gap-6" key={product.id}>
                <div className="flex items-center justify-center rounded-[10px] bg-gray-3 max-w-[90px] w-full h-22.5 overflow-hidden">
                  {product.mainImage ? (
                    <Image
                      src={product.mainImage}
                      alt={product.name}
                      width={180}
                      height={180}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-xs text-dark-4">{product.name}</div>
                  )}
                </div>

                <div>
                  <h3 className="font-medium text-dark mb-1 ease-out duration-200 hover:text-blue">
                    <Link href={`/shop-details/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-custom-sm">
                    {t("blog.pricePrefix")} {formatPrice(product.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="shadow-1 bg-white rounded-xl">
        <div className="px-4 sm:px-6 py-4.5 border-b border-gray-3">
          <h2 className="font-medium text-lg text-dark">
            {t("blog.popularCategory")}
          </h2>
        </div>

        <div className="p-4 sm:p-6">
          <div className="flex flex-col gap-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={buildListHref({
                  category:
                    query.category === category.slug ? undefined : category.slug,
                })}
                className="group flex items-center justify-between ease-out duration-200 text-dark hover:text-blue"
              >
                {category.name}
                <span className="inline-flex rounded-[30px] bg-gray-2 text-custom-xs px-1.5 ease-out duration-200 group-hover:text-white group-hover:bg-blue">
                  {category.totalPosts}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="shadow-1 bg-white rounded-xl">
        <div className="px-4 sm:px-6 py-4.5 border-b border-gray-3">
          <h2 className="font-medium text-lg text-dark">{t("blog.tags")}</h2>
        </div>

        <div className="p-4 sm:p-6">
          <div className="flex flex-wrap gap-3.5">
            {tags.map((tag) => (
              <Link
                key={tag.slug}
                href={buildListHref({
                  tag: query.tag === tag.slug ? undefined : tag.slug,
                })}
                className="inline-flex hover:text-white border border-gray-3 py-2 px-4 rounded-md ease-out duration-200 hover:bg-blue hover:border-blue"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
