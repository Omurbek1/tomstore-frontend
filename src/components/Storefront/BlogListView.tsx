"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import QueryStatusCard from "@/components/Common/QueryStatusCard";
import { useI18n } from "@/i18n/provider";
import type { BlogRouteContext } from "@/storefront/blog-routing";
import { useStorefrontBlogsQuery } from "@/storefront/hooks";
import type { StorefrontBlogRouteQuery } from "@/storefront/query-keys";
import BlogResults from "./BlogResults";
import BlogSidebar from "./BlogSidebar";

type BlogListViewProps = {
  pathname: string;
  query: StorefrontBlogRouteQuery;
  routeContext?: BlogRouteContext;
  title?: string;
  breadcrumbCurrent?: string;
  variant: "grid" | "sidebar";
};

export default function BlogListView({
  pathname,
  query,
  routeContext = {
    type: "blogs",
  },
  title,
  breadcrumbCurrent,
  variant,
}: BlogListViewProps) {
  const { t, formatPrice } = useI18n();
  const { data, isPending, isError, refetch } = useStorefrontBlogsQuery(query);
  const resolvedTitle =
    title ||
    (variant === "sidebar" ? t("blog.blogGridSidebar") : t("blog.blogGrid"));
  const posts = data?.items || [];
  const recentPosts = data?.recentPosts || [];
  const categories = data?.categories || [];
  const tags = data?.tags || [];
  const featuredProducts = data?.featuredProducts || [];

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
    content = <BlogResults posts={posts} variant={variant} />;
  }

  return (
    <>
      <Breadcrumb
        title={resolvedTitle}
        pages={[breadcrumbCurrent || resolvedTitle]}
      />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          {variant === "sidebar" ? (
            <div className="flex flex-col lg:flex-row gap-7.5">
              <div className="lg:max-w-[770px] w-full">{content}</div>

              <BlogSidebar
                categories={categories}
                featuredProducts={featuredProducts}
                pathname={pathname}
                query={query}
                recentPosts={recentPosts}
                routeContext={routeContext}
                tags={tags}
                variant={variant}
              />
            </div>
          ) : (
            content
          )}
        </div>
      </section>
    </>
  );
}
