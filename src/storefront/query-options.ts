import { queryOptions } from "@tanstack/react-query";
import { getBackendUrl } from "./site";
import {
  storefrontQueryKeys,
  toStorefrontBlogApiParams,
  toStorefrontCatalogApiParams,
  type StorefrontBlogApiParams,
  type StorefrontBlogRouteQuery,
  type StorefrontCatalogApiParams,
  type StorefrontCatalogRouteQuery,
} from "./query-keys";
import type {
  StorefrontBlogListResponse,
  StorefrontBlogPostDetails,
  StorefrontCatalogResponse,
  StorefrontConfig,
  StorefrontHomeResponse,
  StorefrontProductDetails,
} from "./types";

export type {
  StorefrontBlogApiParams,
  StorefrontBlogRouteQuery,
  StorefrontCatalogApiParams,
  StorefrontCatalogRouteQuery,
} from "./query-keys";
export { storefrontQueryKeys } from "./query-keys";

type StorefrontRequestInit = RequestInit & {
  next?: {
    revalidate?: number;
  };
};

type StorefrontRequestOptions = {
  allowNotFound?: boolean;
  init?: StorefrontRequestInit;
  revalidate?: number;
};

const buildStorefrontUrl = (path: string) => `${getBackendUrl()}${path}`;

const buildStorefrontCatalogPath = (
  params: StorefrontCatalogApiParams = {},
) => {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "" || value === "all") {
      continue;
    }

    searchParams.set(key, String(value));
  }

  const query = searchParams.toString();
  return `/storefront/catalog${query ? `?${query}` : ""}`;
};

const buildStorefrontBlogsPath = (
  params: StorefrontBlogApiParams = {},
) => {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "" || value === "all") {
      continue;
    }

    searchParams.set(key, String(value));
  }

  const query = searchParams.toString();
  return `/storefront/blogs${query ? `?${query}` : ""}`;
};

const fetchStorefrontJson = async <T>(
  path: string,
  options: StorefrontRequestOptions = {},
): Promise<T | null> => {
  const headers = new Headers(options.init?.headers);
  headers.set("Accept", "application/json");

  const response = await fetch(buildStorefrontUrl(path), {
    ...options.init,
    headers,
    next:
      options.revalidate !== undefined
        ? { revalidate: options.revalidate }
        : options.init?.next,
  });

  if (response.status === 404 && options.allowNotFound) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Storefront API error: ${response.status}`);
  }

  return (await response.json()) as T;
};

const fetchRequiredStorefrontJson = async <T>(
  path: string,
  options: StorefrontRequestOptions = {},
) => {
  const data = await fetchStorefrontJson<T>(path, options);

  if (data === null) {
    throw new Error(`Storefront API returned empty response for ${path}`);
  }

  return data;
};

export const storefrontConfigQueryOptions = () =>
  queryOptions({
    queryKey: storefrontQueryKeys.config(),
    queryFn: () =>
      fetchRequiredStorefrontJson<StorefrontConfig>("/storefront/config", {
        init: {
          cache: "no-store",
        },
      }),
  });

export const storefrontCategoriesQueryOptions = () =>
  queryOptions({
    queryKey: storefrontQueryKeys.categories(),
    queryFn: async () => {
      const catalog = await fetchRequiredStorefrontJson<StorefrontCatalogResponse>(
        buildStorefrontCatalogPath({ pageSize: 1 }),
        {
          revalidate: 120,
        },
      );

      return catalog.filters.categories;
    },
  });

export const storefrontHomeQueryOptions = () =>
  queryOptions({
    queryKey: storefrontQueryKeys.home(),
    queryFn: () =>
      fetchRequiredStorefrontJson<StorefrontHomeResponse>("/storefront/home", {
        revalidate: 180,
      }),
  });

export const storefrontBlogsQueryOptions = (
  query: StorefrontBlogRouteQuery = {},
) => {
  const params = toStorefrontBlogApiParams(query);

  return queryOptions({
    queryKey: storefrontQueryKeys.blogs(params),
    queryFn: () =>
      fetchRequiredStorefrontJson<StorefrontBlogListResponse>(
        buildStorefrontBlogsPath(params),
        {
          revalidate: 120,
        },
      ),
  });
};

export const storefrontCatalogQueryOptions = (
  query: StorefrontCatalogRouteQuery,
) => {
  const params = toStorefrontCatalogApiParams(query);

  return queryOptions({
    queryKey: storefrontQueryKeys.catalog(params),
    queryFn: () =>
      fetchRequiredStorefrontJson<StorefrontCatalogResponse>(
        buildStorefrontCatalogPath(params),
        {
          revalidate: 120,
        },
      ),
  });
};

export const storefrontProductQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: storefrontQueryKeys.product(slug),
    queryFn: () =>
      fetchStorefrontJson<StorefrontProductDetails>(
        `/storefront/products/${slug}`,
        {
          allowNotFound: true,
          revalidate: 120,
        },
      ),
  });

export const storefrontBlogQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: storefrontQueryKeys.blog(slug),
    queryFn: () =>
      fetchStorefrontJson<StorefrontBlogPostDetails>(`/storefront/blogs/${slug}`, {
        allowNotFound: true,
        revalidate: 120,
      }),
  });
