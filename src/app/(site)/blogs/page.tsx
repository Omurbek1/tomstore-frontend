import type { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import BlogListView from "@/components/Storefront/BlogListView";
import CatalogSeoSection from "@/components/Storefront/CatalogSeoSection";
import { buildSeoMetadata } from "@/seo/metadata";
import { getBlogsLandingSeoContent } from "@/seo/content";
import { getRequestLocale } from "@/seo/request-locale";
import { isStorefrontBlogPublic } from "@/storefront/auth";
import {
  buildBlogHref,
  buildBlogPath,
  buildBlogPostPath,
  isIndexableBlogLanding,
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
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const [params, locale] = await Promise.all([searchParams, getRequestLocale()]);
  const query = normalizeBlogQuery(params);
  const content = getBlogsLandingSeoContent(locale);

  return buildSeoMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: buildBlogPath(),
    noIndex: !isIndexableBlogLanding(query),
    keywords: content.keywords,
  });
}

export default async function BlogsPage({ searchParams }: Props) {
  const [params, locale] = await Promise.all([searchParams, getRequestLocale()]);
  const query = normalizeBlogQuery(params);

  if (query.category) {
    redirect(buildBlogHref(query));
  }

  const queryClient = makeQueryClient();
  const storefrontConfig = await queryClient.fetchQuery(
    storefrontConfigQueryOptions(),
  );

  if (!isStorefrontBlogPublic(storefrontConfig)) {
    redirect("/");
  }

  try {
    const blogs = await queryClient.fetchQuery(storefrontBlogsQueryOptions(query));
    const content = getBlogsLandingSeoContent(locale);
    const currentPath = buildBlogHref(query);
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
              pathname={buildBlogPath()}
              query={query}
              routeContext={{
                type: "blogs",
              }}
              title={content.introTitle}
              breadcrumbCurrent="Блог"
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
