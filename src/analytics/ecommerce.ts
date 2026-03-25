"use client";

import { track } from "@vercel/analytics";

type TrackableCartItem = {
  id: string;
  slug?: string | null;
  title: string;
  price?: number | null;
  discountedPrice?: number | null;
  quantity: number;
};

type CartSnapshot = {
  cartSize: number;
  totalQuantity: number;
  totalValue: number;
  itemIds: string;
  itemSlugs: string;
  itemNames: string;
};

const toFiniteNumber = (value: number | null | undefined) =>
  typeof value === "number" && Number.isFinite(value) ? value : 0;

const toOptionalString = (value: string | null | undefined) => {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
};

const hasFiniteNumber = (value: number | null | undefined): value is number =>
  typeof value === "number" && Number.isFinite(value);

const getUnitPrice = (item: TrackableCartItem) =>
  hasFiniteNumber(item.discountedPrice)
    ? item.discountedPrice
    : toFiniteNumber(item.price);

const getTotalQuantity = (items: TrackableCartItem[]) =>
  items.reduce((total, item) => total + Math.max(item.quantity, 0), 0);

const getTotalValue = (items: TrackableCartItem[]) =>
  items.reduce(
    (total, item) => total + getUnitPrice(item) * Math.max(item.quantity, 0),
    0,
  );

const buildJoinedValue = (
  items: TrackableCartItem[],
  getValue: (item: TrackableCartItem) => string | null | undefined,
) =>
  items
    .map(getValue)
    .map((value) => value?.trim())
    .filter((value): value is string => Boolean(value))
    .join(", ");

const buildPurchaseSnapshot = (
  items: TrackableCartItem[],
  totalValue = getTotalValue(items),
): CartSnapshot => ({
  cartSize: items.length,
  totalQuantity: getTotalQuantity(items),
  totalValue,
  itemIds: buildJoinedValue(items, (item) => item.id),
  itemSlugs: buildJoinedValue(items, (item) => item.slug),
  itemNames: buildJoinedValue(items, (item) => item.title),
});

export const trackAddToCart = (item: TrackableCartItem) => {
  const unitPrice = getUnitPrice(item);
  const quantity = Math.max(item.quantity, 0);

  track("add_to_cart", {
    product_id: item.id,
    product_slug: toOptionalString(item.slug),
    product_name: item.title,
    quantity,
    unit_price: unitPrice,
    line_value: unitPrice * quantity,
    has_discount: hasFiniteNumber(item.price) ? item.price > unitPrice : false,
  });
};

export const trackCheckoutStarted = (
  items: TrackableCartItem[],
  totalValue = getTotalValue(items),
) => {
  if (items.length === 0) {
    return;
  }

  const snapshot = buildPurchaseSnapshot(items, totalValue);

  track("checkout_started", {
    cart_size: snapshot.cartSize,
    total_quantity: snapshot.totalQuantity,
    total_value: snapshot.totalValue,
    item_ids: snapshot.itemIds || undefined,
    item_slugs: snapshot.itemSlugs || undefined,
    item_names: snapshot.itemNames || undefined,
  });
};

export const trackCheckoutSubmitted = (
  items: TrackableCartItem[],
  properties?: {
    paymentMethod?: string;
    shippingMethod?: string;
    hasAlternateShippingAddress?: boolean;
  },
  totalValue = getTotalValue(items),
) => {
  if (items.length === 0) {
    return;
  }

  const snapshot = buildPurchaseSnapshot(items, totalValue);

  track("checkout_submitted", {
    cart_size: snapshot.cartSize,
    total_quantity: snapshot.totalQuantity,
    total_value: snapshot.totalValue,
    item_ids: snapshot.itemIds || undefined,
    item_slugs: snapshot.itemSlugs || undefined,
    item_names: snapshot.itemNames || undefined,
    channel: "whatsapp",
    payment_method: toOptionalString(properties?.paymentMethod),
    shipping_method: toOptionalString(properties?.shippingMethod),
    has_alternate_shipping_address:
      properties?.hasAlternateShippingAddress ?? false,
  });
};
