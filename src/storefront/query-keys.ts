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

export const storefrontQueryKeys = {
  all: ["storefront"] as const,
  config: () => [...storefrontQueryKeys.all, "config"] as const,
  categories: () => [...storefrontQueryKeys.all, "categories"] as const,
  home: () => [...storefrontQueryKeys.all, "home"] as const,
  catalog: (params: StorefrontCatalogApiParams = {}) =>
    [
      ...storefrontQueryKeys.all,
      "catalog",
      normalizeStorefrontCatalogParams(params),
    ] as const,
  product: (slug: string) =>
    [...storefrontQueryKeys.all, "product", slug] as const,
};
