"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import QueryStatusCard from "@/components/Common/QueryStatusCard";
import BlogMedia from "@/components/Storefront/BlogMedia";
import { useI18n } from "@/i18n/provider";
import { useStorefrontBlogQuery } from "@/storefront/hooks";
import Link from "next/link";

type BlogPostViewProps = {
  slug: string;
  variant: "plain" | "sidebar";
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

export default function BlogPostView({ slug, variant }: BlogPostViewProps) {
  const { t, formatPrice } = useI18n();
  const { data: post, isPending, isError, refetch } = useStorefrontBlogQuery(slug);
  const listPath =
    variant === "sidebar"
      ? "/blogs/blog-grid-with-sidebar"
      : "/blogs/blog-grid";
  const detailPath =
    variant === "sidebar"
      ? "/blogs/blog-details-with-sidebar"
      : "/blogs/blog-details";

  if (isPending && !post) {
    return (
      <main>
        <Breadcrumb title={t("blog.blogDetails")} pages={[t("blog.blogDetails")]} />
        <section className="overflow-hidden py-20 bg-gray-2">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <QueryStatusCard
              state="loading"
              title="Загружаем статью"
              description={t("common.loadingHint")}
            />
          </div>
        </section>
      </main>
    );
  }

  if (isError && !post) {
    return (
      <main>
        <Breadcrumb title={t("blog.blogDetails")} pages={[t("blog.blogDetails")]} />
        <section className="overflow-hidden py-20 bg-gray-2">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <QueryStatusCard
              state="error"
              title="Не удалось загрузить статью"
              description={t("common.errorHint")}
              actionLabel={t("common.retry")}
              onAction={() => {
                void refetch();
              }}
            />
          </div>
        </section>
      </main>
    );
  }

  if (!post) {
    return (
      <main>
        <Breadcrumb title={t("blog.blogDetails")} pages={[t("blog.blogDetails")]} />
        <section className="overflow-hidden py-20 bg-gray-2">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <div className="rounded-[10px] border border-gray-3 bg-white px-6 py-8 shadow-1">
              Статья не найдена.
            </div>
          </div>
        </section>
      </main>
    );
  }

  const article = (
    <article className="rounded-[10px] bg-white p-5 shadow-1 sm:p-7.5">
      {post.coverImageUrl || post.coverVideoUrl ? (
        <div className="rounded-[10px] overflow-hidden mb-7.5">
          <BlogMedia
            title={post.title}
            imageUrl={post.coverImageUrl}
            videoUrl={post.coverVideoUrl}
            detail
            mediaClassName="h-[420px] w-full rounded-[10px] object-cover"
          />
        </div>
      ) : null}

      <div>
        <span className="flex flex-wrap items-center gap-3 mb-4 text-custom-sm">
          <span>{formatBlogDate(post.publishedAt)}</span>
          <span className="block w-px h-4 bg-gray-4"></span>
          <span>
            {post.views} {t("common.views")}
          </span>
          {post.category ? (
            <>
              <span className="block w-px h-4 bg-gray-4"></span>
              <span>{post.category}</span>
            </>
          ) : null}
        </span>

        <h1 className="font-medium text-dark text-xl lg:text-2xl xl:text-custom-4xl mb-4">
          {post.title}
        </h1>

        {post.excerpt ? (
          <p className="mb-6 text-lg text-dark-4">{post.excerpt}</p>
        ) : null}

        <div className="whitespace-pre-line text-dark-4 leading-8">
          {post.content}
        </div>

        {post.tags.length ? (
          <div className="flex flex-wrap items-center gap-3 mt-10">
            <span>{t("blog.popularTags")}</span>
            {post.tags.map((tag) => (
              <Link
                key={tag}
                className="inline-flex hover:text-white border border-gray-3 bg-white py-2 px-4 rounded-md ease-out duration-200 hover:bg-blue hover:border-blue"
                href={`${listPath}?tag=${encodeURIComponent(tag)}`}
              >
                {tag}
              </Link>
            ))}
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={listPath}
            className="inline-flex rounded-md bg-blue px-5 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-dark"
          >
            Назад к статьям
          </Link>
        </div>
      </div>
    </article>
  );

  return (
    <>
      <Breadcrumb
        title={variant === "sidebar" ? t("blog.blogDetailsSidebar") : t("blog.blogDetails")}
        pages={[post.title]}
      />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          {variant === "sidebar" ? (
            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-12.5">
              <div className="lg:max-w-[750px] w-full">{article}</div>

              <aside className="lg:max-w-[370px] w-full space-y-7.5">
                <div className="shadow-1 bg-white rounded-xl">
                  <div className="px-4 sm:px-6 py-4.5 border-b border-gray-3">
                    <h2 className="font-medium text-lg text-dark">
                      {t("blog.recentPosts")}
                    </h2>
                  </div>

                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col gap-6">
                      {post.recentPosts.map((item) => (
                        <div className="flex items-center gap-4" key={item.slug}>
                          <Link
                            href={`${detailPath}?slug=${item.slug}`}
                            className="max-w-[110px] w-full rounded-[10px] overflow-hidden"
                          >
                            <BlogMedia
                              title={item.title}
                              imageUrl={item.coverImageUrl}
                              videoUrl={item.coverVideoUrl}
                              mediaClassName="h-20 w-full rounded-[10px] object-cover"
                              fallbackClassName="flex h-20 w-full items-center justify-center rounded-[10px] bg-gray-1 px-3 text-center text-xs text-dark-4"
                            />
                          </Link>

                          <div>
                            <h3 className="text-dark leading-[22px] ease-out duration-200 mb-1.5 hover:text-blue">
                              <Link href={`${detailPath}?slug=${item.slug}`}>
                                {item.title}
                              </Link>
                            </h3>
                            <span className="text-custom-xs">
                              {formatBlogDate(item.publishedAt)}
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
                      {post.featuredProducts.map((product) => (
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
                      {post.categories.map((category) => (
                        <Link
                          key={category.slug}
                          href={`${listPath}?category=${category.slug}`}
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
                      {post.availableTags.map((tag) => (
                        <Link
                          key={tag.slug}
                          href={`${listPath}?tag=${tag.slug}`}
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
            <div className="max-w-[850px] mx-auto">{article}</div>
          )}
        </div>
      </section>
    </>
  );
}
