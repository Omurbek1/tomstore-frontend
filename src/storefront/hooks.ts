"use client";

import { useQuery } from "@tanstack/react-query";
import {
  storefrontBlogQueryOptions,
  storefrontBlogsQueryOptions,
  storefrontCatalogQueryOptions,
  storefrontCategoriesQueryOptions,
  storefrontConfigQueryOptions,
  storefrontHomeQueryOptions,
  storefrontProductQueryOptions,
} from "./query-options";
import type {
  StorefrontBlogRouteQuery,
  StorefrontCatalogRouteQuery,
} from "./query-keys";

export const useStorefrontConfigQuery = () =>
  useQuery(storefrontConfigQueryOptions());

export const useStorefrontCategoriesQuery = () =>
  useQuery(storefrontCategoriesQueryOptions());

export const useStorefrontHomeQuery = () =>
  useQuery(storefrontHomeQueryOptions());

export const useStorefrontBlogsQuery = (
  query: StorefrontBlogRouteQuery = {},
  options?: { enabled?: boolean },
) =>
  useQuery({
    ...storefrontBlogsQueryOptions(query),
    enabled: options?.enabled,
  });

export const useStorefrontCatalogQuery = (
  query: StorefrontCatalogRouteQuery,
) => useQuery(storefrontCatalogQueryOptions(query));

export const useStorefrontProductQuery = (slug: string) =>
  useQuery(storefrontProductQueryOptions(slug));

export const useStorefrontBlogQuery = (slug: string) =>
  useQuery(storefrontBlogQueryOptions(slug));
