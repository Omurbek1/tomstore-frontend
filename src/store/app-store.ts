"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Product } from "@/types/product";

export type CartItem = Pick<
  Product,
  "id" | "slug" | "title" | "price" | "discountedPrice" | "imgs"
> & {
  quantity: number;
};

export type WishlistItem = Pick<
  Product,
  "id" | "slug" | "title" | "price" | "discountedPrice" | "imgs"
> & {
  quantity: number;
  status?: string;
};

const EMPTY_PRODUCT: Product = {
  id: "",
  slug: "",
  title: "",
  reviews: 0,
  price: 0,
  discountedPrice: 0,
  imgs: {
    thumbnails: [],
    previews: [],
  },
};

type AppStoreState = {
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];
  quickViewProduct: Product;
  productDetails: Product;
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (id: string) => void;
  updateCartItemQuantity: (payload: { id: string; quantity: number }) => void;
  removeAllItemsFromCart: () => void;
  addItemToWishlist: (item: WishlistItem) => void;
  removeItemFromWishlist: (id: string) => void;
  removeAllItemsFromWishlist: () => void;
  setQuickViewProduct: (product: Product) => void;
  resetQuickViewProduct: () => void;
  setProductDetails: (product: Product) => void;
};

const upsertCartItem = (items: CartItem[], item: CartItem) => {
  const existingItem = items.find((entry) => entry.id === item.id);

  if (!existingItem) {
    return [...items, item];
  }

  return items.map((entry) =>
    entry.id === item.id
      ? { ...entry, quantity: entry.quantity + item.quantity }
      : entry,
  );
};

const upsertWishlistItem = (items: WishlistItem[], item: WishlistItem) => {
  const existingItem = items.find((entry) => entry.id === item.id);

  if (!existingItem) {
    return [...items, item];
  }

  return items.map((entry) =>
    entry.id === item.id
      ? {
          ...entry,
          quantity: entry.quantity + item.quantity,
          status: item.status || entry.status,
        }
      : entry,
  );
};

export const useAppStore = create<AppStoreState>()(
  persist(
    (set) => ({
      cartItems: [],
      wishlistItems: [],
      quickViewProduct: EMPTY_PRODUCT,
      productDetails: EMPTY_PRODUCT,
      addItemToCart: (item) =>
        set((state) => ({
          cartItems: upsertCartItem(state.cartItems, item),
        })),
      removeItemFromCart: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),
      updateCartItemQuantity: ({ id, quantity }) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, quantity) }
              : item,
          ),
        })),
      removeAllItemsFromCart: () =>
        set({
          cartItems: [],
        }),
      addItemToWishlist: (item) =>
        set((state) => ({
          wishlistItems: upsertWishlistItem(state.wishlistItems, item),
        })),
      removeItemFromWishlist: (id) =>
        set((state) => ({
          wishlistItems: state.wishlistItems.filter((item) => item.id !== id),
        })),
      removeAllItemsFromWishlist: () =>
        set({
          wishlistItems: [],
        }),
      setQuickViewProduct: (product) =>
        set({
          quickViewProduct: product,
        }),
      resetQuickViewProduct: () =>
        set({
          quickViewProduct: EMPTY_PRODUCT,
        }),
      setProductDetails: (product) =>
        set({
          productDetails: product,
        }),
    }),
    {
      name: "tomstore-app-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cartItems: state.cartItems,
        wishlistItems: state.wishlistItems,
        productDetails: state.productDetails,
      }),
    },
  ),
);

export const selectCartTotalPrice = (state: AppStoreState) =>
  state.cartItems.reduce(
    (total, item) => total + item.discountedPrice * item.quantity,
    0,
  );

export const selectCartItemsCount = (state: AppStoreState) =>
  state.cartItems.length;
