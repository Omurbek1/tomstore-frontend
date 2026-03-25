import type { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound, redirect } from "next/navigation";
import BlogListView from "@/components/Storefront/BlogListView";
import CatalogSeoSection from "@/components/Storefront/CatalogSeoSection";
import {
  getBlogCategorySeoContent,
} from "@/seo/content";
import { buildSeoMetadata } from "@/seo/metadata";
import { getRequestLocale } from "@/seo/request-locale";
import { isStorefrontBlogPublic } from "@/storefront/auth";
import {
  buildBlogCategoryPath,
  buildBlogHref,
  buildBlogPath,
  buildBlogPostPath,
  isSimpleBlogCategoryLanding,
  normalizeBlogQuery,
} from "@/storefront/blog-routing";
import {
  StorefrontApiError,
  storefrontBlogsQueryOptions,
  storefrontConfigQueryOptions,
} from "@/storefront/query-options";
import { buildAbsoluteUrl } from "@/storefront/site";
import { makeQueryClient } from "@/tanstack-query/query-client";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const buildCategoryQuery = (
  slug: string,
  params: Record<string, string | string[] | undefined>,
) => ({
  ...normalizeBlogQuery(params),
  category: slug,
});

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const [{ slug }, rawSearchParams, locale] = await Promise.all([
    params,
    searchParams,
    getRequestLocale(),
  ]);
  const query = buildCategoryQuery(slug, rawSearchParams);
  const queryClient = makeQueryClient();
  const blogs = await queryClient.fetchQuery(storefrontBlogsQueryOptions(query));
  const category = blogs.categories.find((item) => item.slug === slug);

  if (!category) {
    return {
      title: "Blog category not found | TOMSTORE",
      description: "This blog category could not be found.",
    };
  }

  const content = getBlogCategorySeoContent(locale, category.name);

  return buildSeoMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: buildBlogCategoryPath(slug),
    noIndex: !isSimpleBlogCategoryLanding(query),
    keywords: content.keywords,
  });
}

export default async function BlogCategoryPage({
  params,
  searchParams,
}: Props) {
  const [{ slug }, rawSearchParams, locale] = await Promise.all([
    params,
    searchParams,
    getRequestLocale(),
  ]);
  const query = buildCategoryQuery(slug, rawSearchParams);
  const queryClient = makeQueryClient();
  const storefrontConfig = await queryClient.fetchQuery(
    storefrontConfigQueryOptions(),
  );

  if (!isStorefrontBlogPublic(storefrontConfig)) {
    redirect("/");
  }

  try {
    const blogs = await queryClient.fetchQuery(storefrontBlogsQueryOptions(query));
    const category = blogs.categories.find((item) => item.slug === slug);

    if (!category) {
      notFound();
    }

    const content = getBlogCategorySeoContent(locale, category.name);
    const routeContext = {
      type: "category" as const,
      slug,
    };
    const currentPath = buildBlogHref(query, routeContext);
    const collectionStructuredData = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: content.metaTitle,
      description: content.metaDescription,
      url: buildAbsoluteUrl(currentPath),
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: blogs.total,
        itemListElement: blogs.items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: buildAbsoluteUrl(buildBlogPostPath(item.slug)),
          name: item.title,
        })),
      },
    };
    const breadcrumbStructuredData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Главная",
          item: buildAbsoluteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Блог",
          item: buildAbsoluteUrl(buildBlogPath()),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: category.name,
          item: buildAbsoluteUrl(currentPath),
        },
      ],
    };
    const faqStructuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: content.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(collectionStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData),
          }}
        />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <main className="relative overflow-hidden pb-16 sm:pb-20">
            <BlogListView
              pathname={currentPath}
              query={query}
              routeContext={routeContext}
              title={content.introTitle}
              breadcrumbCurrent={category.name}
              variant="grid"
            />
            <div className="relative z-10 -mt-4 sm:-mt-6">
              <CatalogSeoSection
                content={content}
                totalProducts={blogs.total}
                catalogHref={buildBlogPath()}
              />
            </div>
          </main>
        </HydrationBoundary>
      </>
    );
  } catch (error) {
    if (error instanceof StorefrontApiError && error.status === 401) {
      redirect("/");
    }

    throw error;
  }
}
