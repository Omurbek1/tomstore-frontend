export type StorefrontCatalogRouteQuery = {
  q?: string;
  category?: string;
  brand?: string;
  availability?: string;
  label?: string;
  sort?: string;
  page?: string;
  view?: string;
};

export type StorefrontCatalogApiParams = Omit<
  StorefrontCatalogRouteQuery,
  "view"
> & {
  pageSize?: string | number;
};

export type StorefrontBlogRouteQuery = {
  q?: string;
  category?: string;
  tag?: string;
};

export type StorefrontBlogApiParams = StorefrontBlogRouteQuery;
export type StorefrontAuthScope = "public" | "authorized";

export const normalizeStorefrontCatalogParams = (
  params: StorefrontCatalogApiParams = {},
): StorefrontCatalogApiParams =>
  Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== "",
    ),
  ) as StorefrontCatalogApiParams;

export const toStorefrontCatalogApiParams = (
  query: StorefrontCatalogRouteQuery,
) =>
  normalizeStorefrontCatalogParams({
    q: query.q,
    category: query.category,
    brand: query.brand,
    availability: query.availability,
    label: query.label,
    sort: query.sort,
    page: query.page,
  });

export const normalizeStorefrontBlogParams = (
  params: StorefrontBlogApiParams = {},
): StorefrontBlogApiParams =>
  Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== "",
    ),
  ) as StorefrontBlogApiParams;

export const toStorefrontBlogApiParams = (query: StorefrontBlogRouteQuery) =>
  normalizeStorefrontBlogParams({
    q: query.q,
    category: query.category,
    tag: query.tag,
  });

export const storefrontQueryKeys = {
  all: ["storefront"] as const,
  config: () => [...storefrontQueryKeys.all, "config"] as const,
  categories: () => [...storefrontQueryKeys.all, "categories"] as const,
  home: () => [...storefrontQueryKeys.all, "home"] as const,
  blogs: (
    params: StorefrontBlogApiParams = {},
    authScope: StorefrontAuthScope = "public",
  ) =>
    [
      ...storefrontQueryKeys.all,
      "blogs",
      authScope,
      normalizeStorefrontBlogParams(params),
    ] as const,
  blog: (slug: string, authScope: StorefrontAuthScope = "public") =>
    [...storefrontQueryKeys.all, "blog", authScope, slug] as const,
  catalog: (params: StorefrontCatalogApiParams = {}) =>
    [
      ...storefrontQueryKeys.all,
      "catalog",
      normalizeStorefrontCatalogParams(params),
    ] as const,
  product: (slug: string) =>
    [...storefrontQueryKeys.all, "product", slug] as const,
};
