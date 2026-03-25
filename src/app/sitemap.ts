import type { MetadataRoute } from "next";
import { buildAbsoluteUrl, getBackendUrl } from "@/storefront/site";
import {
  buildBrandPath,
  buildBrandsHubPath,
  buildCategoryPath,
  buildCategoriesHubPath,
} from "@/storefront/catalog-routing";
import {
  buildBlogCategoryPath,
  buildBlogPath,
  buildBlogPostPath,
} from "@/storefront/blog-routing";
import type {
  StorefrontBlogListResponse,
  StorefrontCatalogResponse,
} from "@/storefront/types";

export const revalidate = 3600;

const fetchStorefrontJson = async <T>(path: string) => {
  try {
    const response = await fetch(`${getBackendUrl()}${path}`, {
      next: {
        revalidate,
      },
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
};

const fetchCatalogEntries = async () => {
  const firstPage = await fetchStorefrontJson<StorefrontCatalogResponse>(
    "/storefront/catalog?pageSize=100",
  );

  if (!firstPage) {
    return [];
  }

  const items = [...firstPage.items];

  for (let page = 2; page <= firstPage.totalPages; page += 1) {
    const nextPage = await fetchStorefrontJson<StorefrontCatalogResponse>(
      `/storefront/catalog?page=${page}&pageSize=100`,
    );

    if (!nextPage) {
      continue;
    }

    items.push(...nextPage.items);
  }

  return items.map((item) => ({
    url: buildAbsoluteUrl(`/shop-details/${item.slug}`),
    lastModified: item.updatedAt || item.createdAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
};

const fetchCatalogLandingEntries = async () => {
  const catalog = await fetchStorefrontJson<StorefrontCatalogResponse>(
    "/storefront/catalog?pageSize=1",
  );

  if (!catalog) {
    return [];
  }

  return [
    ...catalog.filters.categories.map((category) => ({
      url: buildAbsoluteUrl(buildCategoryPath(category.slug)),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...catalog.filters.brands.map((brand) => ({
      url: buildAbsoluteUrl(buildBrandPath(brand.slug)),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
};

const fetchBlogEntries = async () => {
  const blogList =
    await fetchStorefrontJson<StorefrontBlogListResponse>("/storefront/blogs");

  if (!blogList?.enabled) {
    return {
      posts: [],
      categories: [],
    };
  }

  return {
    posts: blogList.items.map((item) => ({
      url: buildAbsoluteUrl(buildBlogPostPath(item.slug)),
      lastModified: item.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    categories: blogList.categories.map((category) => ({
      url: buildAbsoluteUrl(buildBlogCategoryPath(category.slug)),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.65,
    })),
  };
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [catalogEntries, catalogLandingEntries, blogEntries] = await Promise.all([
    fetchCatalogEntries(),
    fetchCatalogLandingEntries(),
    fetchBlogEntries(),
  ]);

  return [
    {
      url: buildAbsoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: buildAbsoluteUrl("/shop-with-sidebar"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: buildAbsoluteUrl("/contact"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: buildAbsoluteUrl(buildCategoriesHubPath()),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: buildAbsoluteUrl(buildBrandsHubPath()),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: buildAbsoluteUrl(buildBlogPath()),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...catalogLandingEntries,
    ...catalogEntries,
    ...blogEntries.categories,
    ...blogEntries.posts,
  ];
}
