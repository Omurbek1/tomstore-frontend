"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import QueryStatusCard from "@/components/Common/QueryStatusCard";
import { useI18n } from "@/i18n/provider";
import { useStorefrontBlogsQuery } from "@/storefront/hooks";
import type { StorefrontBlogRouteQuery } from "@/storefront/query-keys";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type BlogListViewProps = {
  pathname: string;
  query: StorefrontBlogRouteQuery;
  variant: "grid" | "sidebar";
};

const buildBlogQueryString = (
  pathname: string,
  query: StorefrontBlogRouteQuery,
  overrides: Partial<StorefrontBlogRouteQuery> = {},
) => {
  const nextQuery = { ...query, ...overrides };
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(nextQuery)) {
    if (!value || value === "all") {
      continue;
    }

    searchParams.set(key, value);
  }

  const serialized = searchParams.toString();
  return serialized ? `${pathname}?${serialized}` : pathname;
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

export default function BlogListView({
  pathname,
  query,
  variant,
}: BlogListViewProps) {
  const router = useRouter();
  const { t, formatPrice } = useI18n();
  const { data, isPending, isError, refetch } = useStorefrontBlogsQuery(query);
  const [searchValue, setSearchValue] = useState(query.q || "");

  useEffect(() => {
    setSearchValue(query.q || "");
  }, [query.q]);

  const detailPath =
    variant === "sidebar"
      ? "/blogs/blog-details-with-sidebar"
      : "/blogs/blog-details";
  const title =
    variant === "sidebar" ? t("blog.blogGridSidebar") : t("blog.blogGrid");
  const posts = data?.items || [];
  const recentPosts = data?.recentPosts || [];
  const categories = data?.categories || [];
  const tags = data?.tags || [];
  const featuredProducts = data?.featuredProducts || [];

  const applySearch = () => {
    router.push(
      buildBlogQueryString(pathname, query, {
        q: searchValue.trim() || undefined,
      }),
    );
  };

  let content: React.ReactNode;

  if (isPending && !data) {
    content = (
      <QueryStatusCard
        state="loading"
        title="Загружаем блог"
        description={t("common.loadingHint")}
      />
    );
  } else if (isError && !data) {
    content = (
      <QueryStatusCard
        state="error"
        title="Не удалось загрузить блог"
        description={t("common.errorHint")}
        actionLabel={t("common.retry")}
        onAction={() => {
          void refetch();
        }}
      />
    );
  } else if (!data?.enabled) {
    content = (
      <div className="rounded-[10px] border border-gray-3 bg-white px-6 py-8 shadow-1">
        Блог сейчас скрыт в настройках магазина.
      </div>
    );
  } else if (posts.length === 0) {
    content = (
      <div className="rounded-[10px] border border-gray-3 bg-white px-6 py-8 shadow-1">
        По текущему фильтру статей пока нет.
      </div>
    );
  } else {
    content = (
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
              href={`${detailPath}?slug=${blog.slug}`}
              className="block rounded-md overflow-hidden"
            >
              {blog.coverImageUrl ? (
                <img
                  src={blog.coverImageUrl}
                  alt={blog.title}
                  className="h-[210px] w-full rounded-md object-cover"
                />
              ) : (
                <div className="flex h-[210px] w-full items-center justify-center rounded-md bg-gray-1 text-dark-4">
                  {blog.title}
                </div>
              )}
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
                <Link href={`${detailPath}?slug=${blog.slug}`}>{blog.title}</Link>
              </h2>

              <p className="mb-4 text-custom-sm text-dark-4">{blog.excerpt}</p>

              <Link
                href={`${detailPath}?slug=${blog.slug}`}
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

  return (
    <>
      <Breadcrumb title={title} pages={[title]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          {variant === "sidebar" ? (
            <div className="flex flex-col lg:flex-row gap-7.5">
              <div className="lg:max-w-[770px] w-full">{content}</div>

              <aside className="lg:max-w-[370px] w-full space-y-7.5">
                <div className="shadow-1 bg-white rounded-xl">
                  <div className="px-4 sm:px-6 py-4.5 border-b border-gray-3">
                    <h2 className="font-medium text-lg text-dark">
                      {t("blog.search")}
                    </h2>
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
                        <button className="text-dark-2 absolute right-0 top-0 px-4 py-3.5 ease-out duration-200 hover:text-blue">
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
                            href={`${detailPath}?slug=${blog.slug}`}
                            className="max-w-[110px] w-full rounded-[10px] overflow-hidden"
                          >
                            {blog.coverImageUrl ? (
                              <img
                                src={blog.coverImageUrl}
                                alt={blog.title}
                                className="h-20 w-full rounded-[10px] object-cover"
                              />
                            ) : (
                              <div className="flex h-20 w-full items-center justify-center rounded-[10px] bg-gray-1 px-3 text-center text-xs text-dark-4">
                                {blog.title}
                              </div>
                            )}
                          </Link>

                          <div>
                            <h3 className="text-dark leading-[22px] ease-out duration-200 mb-1.5 hover:text-blue">
                              <Link href={`${detailPath}?slug=${blog.slug}`}>
                                {blog.title}
                              </Link>
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
                              <img
                                src={product.mainImage}
                                alt={product.name}
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
                          href={buildBlogQueryString(pathname, query, {
                            category:
                              query.category === category.slug
                                ? undefined
                                : category.slug,
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
                          href={buildBlogQueryString(pathname, query, {
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
            </div>
          ) : (
            content
          )}
        </div>
      </section>
    </>
  );
}
