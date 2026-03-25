import type { StorefrontBlogRouteQuery } from "./query-keys";

export type BlogRouteContext =
  | { type: "blogs"; path?: string }
  | { type: "category"; slug: string };

const DEFAULT_ROUTE_CONTEXT: BlogRouteContext = {
  type: "blogs",
  path: "/blogs",
};

const serializeBlogQuery = (
  query: StorefrontBlogRouteQuery,
  routeContext: BlogRouteContext,
) => {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (!value || value === "all") {
      continue;
    }

    if (
      routeContext.type === "category" &&
      key === "category" &&
      value === routeContext.slug
    ) {
      continue;
    }

    searchParams.set(key, value);
  }

  return searchParams.toString();
};

const resolveNextRouteContext = (
  query: StorefrontBlogRouteQuery,
  routeContext: BlogRouteContext,
): BlogRouteContext => {
  if (routeContext.type === "category" && query.category) {
    return {
      type: "category",
      slug: query.category,
    };
  }

  if (query.category) {
    return {
      type: "category",
      slug: query.category,
    };
  }

  if (routeContext.type === "blogs") {
    return routeContext;
  }

  return DEFAULT_ROUTE_CONTEXT;
};

export const normalizeBlogQuery = (
  params: Record<string, string | string[] | undefined>,
): StorefrontBlogRouteQuery => ({
  q: typeof params.q === "string" ? params.q : undefined,
  category: typeof params.category === "string" ? params.category : undefined,
  tag: typeof params.tag === "string" ? params.tag : undefined,
});

export const buildBlogPath = () => "/blogs";

export const buildBlogPostPath = (slug: string) =>
  `/blogs/${encodeURIComponent(slug)}`;

export const buildBlogCategoryPath = (slug: string) =>
  `/blogs/category/${encodeURIComponent(slug)}`;

export const buildLegacyBlogListPath = (
  query: StorefrontBlogRouteQuery = {},
  pathname = "/blogs/blog-grid",
) => {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (!value || value === "all") {
      continue;
    }

    searchParams.set(key, value);
  }

  const serialized = searchParams.toString();
  return serialized ? `${pathname}?${serialized}` : pathname;
};

export const buildLegacyBlogPostPath = (
  slug: string,
  pathname = "/blogs/blog-details",
) => `${pathname}?slug=${encodeURIComponent(slug)}`;

export const getBlogBaseQuery = (
  routeContext: BlogRouteContext = DEFAULT_ROUTE_CONTEXT,
): StorefrontBlogRouteQuery =>
  routeContext.type === "category" ? { category: routeContext.slug } : {};

export const buildBlogHref = (
  query: StorefrontBlogRouteQuery,
  routeContext: BlogRouteContext = DEFAULT_ROUTE_CONTEXT,
) => {
  const nextRouteContext = resolveNextRouteContext(query, routeContext);
  const pathname =
    nextRouteContext.type === "category"
      ? buildBlogCategoryPath(nextRouteContext.slug)
      : nextRouteContext.path || DEFAULT_ROUTE_CONTEXT.path || buildBlogPath();
  const serialized = serializeBlogQuery(query, nextRouteContext);

  return serialized ? `${pathname}?${serialized}` : pathname;
};

export const isSimpleBlogCategoryLanding = (query: StorefrontBlogRouteQuery) =>
  Boolean(query.category) && !query.q && !query.tag;

export const isIndexableBlogLanding = (query: StorefrontBlogRouteQuery) =>
  (!query.q && !query.tag && !query.category) || isSimpleBlogCategoryLanding(query);

export const humanizeBlogSlug = (value?: string) =>
  String(value || "")
    .replace(/[-_]+/g, " ")
    .trim();
