import type { StorefrontCatalogRouteQuery } from "./query-keys";

export type CatalogRouteContext =
  | { type: "catalog"; path?: string }
  | { type: "category"; slug: string }
  | { type: "brand"; slug: string };

type CatalogPrimaryPreference = "auto" | "category" | "brand";

const DEFAULT_ROUTE_CONTEXT: CatalogRouteContext = {
  type: "catalog",
  path: "/shop-with-sidebar",
};

const serializeCatalogQuery = (
  query: StorefrontCatalogRouteQuery,
  routeContext: CatalogRouteContext,
) => {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (!value || value === "all") {
      continue;
    }

    if (key === "page" && value === "1") {
      continue;
    }

    if (
      routeContext.type === "category" &&
      key === "category" &&
      value === routeContext.slug
    ) {
      continue;
    }

    if (
      routeContext.type === "brand" &&
      key === "brand" &&
      value === routeContext.slug
    ) {
      continue;
    }

    searchParams.set(key, value);
  }

  return searchParams.toString();
};

const resolveNextRouteContext = (
  query: StorefrontCatalogRouteQuery,
  routeContext: CatalogRouteContext,
  preferredPrimary: CatalogPrimaryPreference,
): CatalogRouteContext => {
  if (preferredPrimary === "category" && query.category) {
    return {
      type: "category",
      slug: query.category,
    };
  }

  if (preferredPrimary === "brand" && query.brand) {
    return {
      type: "brand",
      slug: query.brand,
    };
  }

  if (routeContext.type === "category" && query.category) {
    return {
      type: "category",
      slug: query.category,
    };
  }

  if (routeContext.type === "brand" && query.brand) {
    return {
      type: "brand",
      slug: query.brand,
    };
  }

  if (query.category) {
    return {
      type: "category",
      slug: query.category,
    };
  }

  if (query.brand) {
    return {
      type: "brand",
      slug: query.brand,
    };
  }

  if (routeContext.type === "catalog") {
    return routeContext;
  }

  return DEFAULT_ROUTE_CONTEXT;
};

export const normalizeCatalogQuery = (
  params: Record<string, string | string[] | undefined>,
): StorefrontCatalogRouteQuery => ({
  q: typeof params.q === "string" ? params.q : undefined,
  category: typeof params.category === "string" ? params.category : undefined,
  brand: typeof params.brand === "string" ? params.brand : undefined,
  availability:
    typeof params.availability === "string" ? params.availability : undefined,
  label: typeof params.label === "string" ? params.label : undefined,
  sort: typeof params.sort === "string" ? params.sort : undefined,
  page: typeof params.page === "string" ? params.page : undefined,
  view: typeof params.view === "string" ? params.view : undefined,
});

export const buildCategoryPath = (slug: string) =>
  `/category/${encodeURIComponent(slug)}`;

export const buildBrandPath = (slug: string) =>
  `/brand/${encodeURIComponent(slug)}`;

export const buildCategoriesHubPath = () => "/categories";

export const buildBrandsHubPath = () => "/brands";

export const buildLegacyCatalogPath = (query: StorefrontCatalogRouteQuery = {}) => {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (!value || key === "view") {
      continue;
    }

    if (key === "page" && value === "1") {
      continue;
    }

    searchParams.set(key, value);
  }

  const serialized = searchParams.toString();
  return `/shop-with-sidebar${serialized ? `?${serialized}` : ""}`;
};

export const getCatalogBaseQuery = (
  routeContext: CatalogRouteContext = DEFAULT_ROUTE_CONTEXT,
): StorefrontCatalogRouteQuery => {
  if (routeContext.type === "category") {
    return {
      category: routeContext.slug,
    };
  }

  if (routeContext.type === "brand") {
    return {
      brand: routeContext.slug,
    };
  }

  return {};
};

export const buildCatalogHref = (
  query: StorefrontCatalogRouteQuery,
  routeContext: CatalogRouteContext = DEFAULT_ROUTE_CONTEXT,
  preferredPrimary: CatalogPrimaryPreference = "auto",
) => {
  const nextRouteContext = resolveNextRouteContext(
    query,
    routeContext,
    preferredPrimary,
  );
  const pathname =
    nextRouteContext.type === "category"
      ? buildCategoryPath(nextRouteContext.slug)
      : nextRouteContext.type === "brand"
        ? buildBrandPath(nextRouteContext.slug)
        : nextRouteContext.path || DEFAULT_ROUTE_CONTEXT.path || "/shop-with-sidebar";
  const serialized = serializeCatalogQuery(query, nextRouteContext);

  return serialized ? `${pathname}?${serialized}` : pathname;
};

export const isDefaultCatalogPage = (page?: string) => !page || page === "1";

export const isSimpleCategoryLanding = (query: StorefrontCatalogRouteQuery) =>
  Boolean(query.category) &&
  !query.q &&
  !query.brand &&
  !query.availability &&
  !query.label &&
  !query.sort &&
  isDefaultCatalogPage(query.page);

export const isSimpleBrandLanding = (query: StorefrontCatalogRouteQuery) =>
  Boolean(query.brand) &&
  !query.q &&
  !query.category &&
  !query.availability &&
  !query.label &&
  !query.sort &&
  isDefaultCatalogPage(query.page);

export const isIndexableCatalogLanding = (query: StorefrontCatalogRouteQuery) =>
  (!query.q &&
    !query.category &&
    !query.brand &&
    !query.availability &&
    !query.label &&
    !query.sort &&
    isDefaultCatalogPage(query.page)) ||
  isSimpleCategoryLanding(query) ||
  isSimpleBrandLanding(query);

export const humanizeCatalogSlug = (value?: string) =>
  String(value || "")
    .replace(/[-_]+/g, " ")
    .trim();
