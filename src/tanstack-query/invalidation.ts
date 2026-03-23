import type { QueryClient } from "@tanstack/react-query";
import { ordersQueryKeys } from "@/orders/query-keys";
import { storefrontQueryKeys } from "@/storefront/query-keys";

export const queryInvalidation = {
  storefront: {
    all: (queryClient: QueryClient) =>
      queryClient.invalidateQueries({ queryKey: storefrontQueryKeys.all }),
    config: (queryClient: QueryClient) =>
      queryClient.invalidateQueries({ queryKey: storefrontQueryKeys.config() }),
    categories: (queryClient: QueryClient) =>
      queryClient.invalidateQueries({
        queryKey: storefrontQueryKeys.categories(),
      }),
    home: (queryClient: QueryClient) =>
      queryClient.invalidateQueries({ queryKey: storefrontQueryKeys.home() }),
    blogs: (queryClient: QueryClient) =>
      queryClient.invalidateQueries({
        queryKey: [...storefrontQueryKeys.all, "blogs"],
      }),
    blog: (queryClient: QueryClient, slug: string) =>
      queryClient.invalidateQueries({
        queryKey: storefrontQueryKeys.blog(slug),
      }),
    catalog: (queryClient: QueryClient) =>
      queryClient.invalidateQueries({
        queryKey: [...storefrontQueryKeys.all, "catalog"],
      }),
    product: (queryClient: QueryClient, slug: string) =>
      queryClient.invalidateQueries({
        queryKey: storefrontQueryKeys.product(slug),
      }),
  },
  orders: {
    all: (queryClient: QueryClient) =>
      queryClient.invalidateQueries({ queryKey: ordersQueryKeys.all }),
    list: (queryClient: QueryClient) =>
      queryClient.invalidateQueries({ queryKey: ordersQueryKeys.list() }),
  },
};
