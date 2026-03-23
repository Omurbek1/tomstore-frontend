"use client";

import { useQuery } from "@tanstack/react-query";
import {
  storefrontCatalogQueryOptions,
  storefrontCategoriesQueryOptions,
  storefrontConfigQueryOptions,
  storefrontHomeQueryOptions,
  storefrontProductQueryOptions,
} from "./query-options";
import type { StorefrontCatalogRouteQuery } from "./query-keys";

export const useStorefrontConfigQuery = () =>
  useQuery(storefrontConfigQueryOptions());

export const useStorefrontCategoriesQuery = () =>
  useQuery(storefrontCategoriesQueryOptions());

export const useStorefrontHomeQuery = () =>
  useQuery(storefrontHomeQueryOptions());

export const useStorefrontCatalogQuery = (
  query: StorefrontCatalogRouteQuery,
) => useQuery(storefrontCatalogQueryOptions(query));

export const useStorefrontProductQuery = (slug: string) =>
  useQuery(storefrontProductQueryOptions(slug));
