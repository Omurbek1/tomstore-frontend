import type { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound, redirect } from "next/navigation";
import BlogPostView from "@/components/Storefront/BlogPostView";
import { buildNoIndexMetadata, buildSeoMetadata } from "@/seo/metadata";
import { isStorefrontBlogPublic } from "@/storefront/auth";
import {
  buildBlogCategoryPath,
  buildBlogPath,
  buildBlogPostPath,
} from "@/storefront/blog-routing";
import { getStorefrontCompanyName } from "@/storefront/contact";
import {
  StorefrontApiError,
  storefrontBlogQueryOptions,
  storefrontConfigQueryOptions,
} from "@/storefront/query-options";
import { buildAbsoluteUrl } from "@/storefront/site";
import { makeQueryClient } from "@/tanstack-query/query-client";

type Props = {
  params: Promise<{ slug: string }>;
};

const findMatchingCategory = (
  categoryName?: string,
  categories?: Array<{ slug: string; name: string }>,
) => {
  if (!categoryName) {
    return null;
  }

  const normalizedCategoryName = categoryName.trim().toLowerCase();

  return (
    categories?.find(
      (item) => item.name.trim().toLowerCase() === normalizedCategoryName,
    ) || null
  );
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const queryClient = makeQueryClient();
  const post = await queryClient.fetchQuery(storefrontBlogQueryOptions(slug));

  if (!post) {
    return buildNoIndexMetadata(
      "Статья не найдена",
      "Запрошенная статья не найдена.",
      buildBlogPath(),
    );
  }

  return buildSeoMetadata({
    title: post.title,
    description: post.excerpt,
    path: buildBlogPostPath(slug),
    image: post.coverImageUrl,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const queryClient = makeQueryClient();
  const storefrontConfig = await queryClient.fetchQuery(
    storefrontConfigQueryOptions(),
  );

  if (!isStorefrontBlogPublic(storefrontConfig)) {
    redirect("/");
  }

  let post = null;

  try {
    post = await queryClient.fetchQuery(storefrontBlogQueryOptions(slug));
  } catch (error) {
    if (error instanceof StorefrontApiError && error.status === 401) {
      redirect("/");
    }

    throw error;
  }

  if (!post) {
    notFound();
  }

  const companyName = getStorefrontCompanyName(storefrontConfig);
  const matchedCategory = findMatchingCategory(post.category, post.categories);
  const articlePath = buildBlogPostPath(slug);
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImageUrl ? [buildAbsoluteUrl(post.coverImageUrl)] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: buildAbsoluteUrl(articlePath),
    author: post.authorName
      ? {
          "@type": "Person",
          name: post.authorName,
        }
      : {
          "@type": "Organization",
          name: companyName,
        },
    publisher: {
      "@type": "Organization",
      name: companyName,
      logo: storefrontConfig?.companyLogoUrl
        ? {
            "@type": "ImageObject",
            url: buildAbsoluteUrl(storefrontConfig.companyLogoUrl),
          }
        : undefined,
    },
    articleSection: post.category,
    keywords: post.tags.join(", "),
  };
  const breadcrumbItems = [
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
  ];

  if (matchedCategory) {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: breadcrumbItems.length + 1,
      name: matchedCategory.name,
      item: buildAbsoluteUrl(buildBlogCategoryPath(matchedCategory.slug)),
    });
  }

  breadcrumbItems.push({
    "@type": "ListItem",
    position: breadcrumbItems.length + 1,
    name: post.title,
    item: buildAbsoluteUrl(articlePath),
  });

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <main>
          <BlogPostView slug={slug} variant="plain" />
        </main>
      </HydrationBoundary>
    </>
  );
}
