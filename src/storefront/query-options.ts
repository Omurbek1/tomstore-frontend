import { cache } from "react";
import { queryOptions } from "@tanstack/react-query";
import { getBackendUrl } from "./site";
import {
  buildStorefrontAuthorizationValue,
  getStorefrontAuthScope,
  readStorefrontAuthTokenFromDocument,
} from "./auth";
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
  authToken?: string;
};

type SerializedStorefrontRequest = {
  allowNotFound: boolean;
  authToken?: string;
  cache?: RequestCache;
  path: string;
  revalidate?: number;
};

export class StorefrontApiError extends Error {
  status: number;

  constructor(status: number) {
    super(`Storefront API error: ${status}`);
    this.name = "StorefrontApiError";
    this.status = status;
  }
}

const resolveStorefrontAuthToken = (token?: string) =>
  token || readStorefrontAuthTokenFromDocument();

const STORE_REVALIDATE_SECONDS = {
  config: 300,
  categories: 300,
  home: 180,
  catalog: 120,
  product: 120,
  blogs: 180,
  blogPost: 180,
} as const;

const STORE_STALE_TIME_MS = {
  config: STORE_REVALIDATE_SECONDS.config * 1000,
  categories: STORE_REVALIDATE_SECONDS.categories * 1000,
  home: STORE_REVALIDATE_SECONDS.home * 1000,
  catalog: STORE_REVALIDATE_SECONDS.catalog * 1000,
  product: STORE_REVALIDATE_SECONDS.product * 1000,
  blogs: STORE_REVALIDATE_SECONDS.blogs * 1000,
  blogPost: STORE_REVALIDATE_SECONDS.blogPost * 1000,
} as const;

const buildStorefrontUrl = (path: string) => `${getBackendUrl()}${path}`;

const performStorefrontJsonFetch = async <T>(
  path: string,
  options: StorefrontRequestOptions = {},
): Promise<T | null> => {
  const headers = new Headers(options.init?.headers);
  headers.set("Accept", "application/json");
  const authorization = buildStorefrontAuthorizationValue(
    resolveStorefrontAuthToken(options.authToken),
  );
  if (authorization) {
    headers.set("Authorization", authorization);
  }

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
    throw new StorefrontApiError(response.status);
  }

  return (await response.json()) as T;
};

const serializeStorefrontRequest = (
  path: string,
  options: StorefrontRequestOptions = {},
): string =>
  JSON.stringify({
    allowNotFound: Boolean(options.allowNotFound),
    authToken: resolveStorefrontAuthToken(options.authToken) || undefined,
    cache: options.init?.cache,
    path,
    revalidate: options.revalidate ?? options.init?.next?.revalidate,
  } satisfies SerializedStorefrontRequest);

const performCachedStorefrontJsonFetch = cache(
  async (serializedRequest: string): Promise<unknown | null> => {
    const request = JSON.parse(
      serializedRequest,
    ) as SerializedStorefrontRequest;

    return performStorefrontJsonFetch(request.path, {
      allowNotFound: request.allowNotFound,
      authToken: request.authToken,
      init: request.cache
        ? {
            cache: request.cache,
          }
        : undefined,
      revalidate: request.revalidate,
    });
  },
);

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
  if (typeof window === "undefined") {
    return (await performCachedStorefrontJsonFetch(
      serializeStorefrontRequest(path, options),
    )) as T | null;
  }

  return performStorefrontJsonFetch<T>(path, options);
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
    staleTime: STORE_STALE_TIME_MS.config,
    queryFn: () =>
      fetchRequiredStorefrontJson<StorefrontConfig>("/storefront/config", {
        revalidate: STORE_REVALIDATE_SECONDS.config,
      }),
  });

export const storefrontCategoriesQueryOptions = () =>
  queryOptions({
    queryKey: storefrontQueryKeys.categories(),
    staleTime: STORE_STALE_TIME_MS.categories,
    queryFn: async () => {
      const catalog = await fetchRequiredStorefrontJson<StorefrontCatalogResponse>(
        buildStorefrontCatalogPath({ pageSize: 1 }),
        {
          revalidate: STORE_REVALIDATE_SECONDS.categories,
        },
      );

      return catalog.filters.categories;
    },
  });

export const storefrontHomeQueryOptions = () =>
  queryOptions({
    queryKey: storefrontQueryKeys.home(),
    staleTime: STORE_STALE_TIME_MS.home,
    queryFn: () =>
      fetchRequiredStorefrontJson<StorefrontHomeResponse>("/storefront/home", {
        revalidate: STORE_REVALIDATE_SECONDS.home,
      }),
  });

export const storefrontBlogsQueryOptions = (
  query: StorefrontBlogRouteQuery = {},
  options: { authToken?: string } = {},
) => {
  const params = toStorefrontBlogApiParams(query);
  const authScope = getStorefrontAuthScope(
    resolveStorefrontAuthToken(options.authToken),
  );
  const isAuthorizedScope = authScope === "authorized";

  return queryOptions({
    queryKey: storefrontQueryKeys.blogs(params, authScope),
    staleTime: isAuthorizedScope ? 0 : STORE_STALE_TIME_MS.blogs,
    refetchOnMount: isAuthorizedScope ? "always" : false,
    queryFn: () =>
      fetchRequiredStorefrontJson<StorefrontBlogListResponse>(
        buildStorefrontBlogsPath(params),
        isAuthorizedScope
          ? {
              authToken: options.authToken,
              init: {
                cache: "no-store",
              },
            }
          : {
              authToken: options.authToken,
              revalidate: STORE_REVALIDATE_SECONDS.blogs,
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
    staleTime: STORE_STALE_TIME_MS.catalog,
    queryFn: () =>
      fetchRequiredStorefrontJson<StorefrontCatalogResponse>(
        buildStorefrontCatalogPath(params),
        {
          revalidate: STORE_REVALIDATE_SECONDS.catalog,
        },
      ),
  });
};

export const storefrontProductQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: storefrontQueryKeys.product(slug),
    staleTime: STORE_STALE_TIME_MS.product,
    queryFn: () =>
      fetchStorefrontJson<StorefrontProductDetails>(
        `/storefront/products/${slug}`,
        {
          allowNotFound: true,
          revalidate: STORE_REVALIDATE_SECONDS.product,
        },
      ),
  });

export const storefrontBlogQueryOptions = (
  slug: string,
  options: { authToken?: string } = {},
) =>
  {
    const authScope = getStorefrontAuthScope(
      resolveStorefrontAuthToken(options.authToken),
    );
    const isAuthorizedScope = authScope === "authorized";

    return queryOptions({
      queryKey: storefrontQueryKeys.blog(slug, authScope),
      staleTime: isAuthorizedScope ? 0 : STORE_STALE_TIME_MS.blogPost,
      refetchOnMount: isAuthorizedScope ? "always" : false,
      queryFn: () =>
        fetchStorefrontJson<StorefrontBlogPostDetails>(
          `/storefront/blogs/${slug}`,
          isAuthorizedScope
            ? {
                allowNotFound: true,
                authToken: options.authToken,
                init: {
                  cache: "no-store",
                },
              }
            : {
                allowNotFound: true,
                authToken: options.authToken,
                revalidate: STORE_REVALIDATE_SECONDS.blogPost,
              },
        ),
    });
  };
