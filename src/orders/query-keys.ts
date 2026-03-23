export const ordersQueryKeys = {
  all: ["orders"] as const,
  list: () => [...ordersQueryKeys.all, "list"] as const,
};
