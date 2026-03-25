"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import { useI18n } from "@/i18n/provider";
import type { BlogRouteContext } from "@/storefront/blog-routing";
import type { StorefrontBlogRouteQuery } from "@/storefront/query-keys";
import type { StorefrontBlogListResponse } from "@/storefront/types";
import BlogResults from "./BlogResults";
import BlogSidebar from "./BlogSidebar";

type BlogListViewProps = {
  blogs: StorefrontBlogListResponse;
  pathname: string;
  query: StorefrontBlogRouteQuery;
  routeContext?: BlogRouteContext;
  title?: string;
  breadcrumbCurrent?: string;
  variant: "grid" | "sidebar";
};

export default function BlogListView({
  blogs,
  pathname,
  query,
  routeContext = {
    type: "blogs",
  },
  title,
  breadcrumbCurrent,
  variant,
}: BlogListViewProps) {
  const { t } = useI18n();
  const resolvedTitle =
    title ||
    (variant === "sidebar" ? t("blog.blogGridSidebar") : t("blog.blogGrid"));
  const posts = blogs.items || [];
  const recentPosts = blogs.recentPosts || [];
  const categories = blogs.categories || [];
  const tags = blogs.tags || [];
  const featuredProducts = blogs.featuredProducts || [];

  let content: React.ReactNode;

  if (!blogs.enabled) {
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
