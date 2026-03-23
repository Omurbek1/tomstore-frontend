import { queryOptions } from "@tanstack/react-query";
import { getOrders } from "./api";
import { ordersQueryKeys } from "./query-keys";

export const ordersListQueryOptions = () =>
  queryOptions({
    queryKey: ordersQueryKeys.list(),
    queryFn: getOrders,
    staleTime: 60_000,
  });
