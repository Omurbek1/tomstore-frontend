export type OrderListItem = {
  orderId: string;
  createdAt: string;
  status: string;
  total: string;
  title: string;
};

export const getOrders = async (): Promise<OrderListItem[]> => {
  const response = await fetch("/api/order", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Orders API error: ${response.status}`);
  }

  const data = (await response.json()) as {
    orders?: OrderListItem[];
  };

  return Array.isArray(data.orders) ? data.orders : [];
};
