"use client";

import { useQuery } from "@tanstack/react-query";
import { ordersListQueryOptions } from "./query-options";

export const useOrdersQuery = () => useQuery(ordersListQueryOptions());
