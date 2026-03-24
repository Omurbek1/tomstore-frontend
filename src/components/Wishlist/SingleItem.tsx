"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/i18n/provider";
import { getAvailabilityMessageKey } from "@/i18n/utils";
import ProductLabelBadges from "@/components/Common/ProductLabelBadges";
import { useCartToast } from "@/components/Common/useCartToast";
import { useAppStore, type WishlistItem } from "@/store/app-store";

const FALLBACK_IMAGE = "/images/products/product-1-sm-1.png";

const STATUS_CLASS_BY_STATUS = {
  in_stock: "bg-green-500/10 text-green-700",
  on_order: "bg-amber-500/10 text-amber-700",
  in_transit: "bg-sky-500/10 text-sky-700",
  out_of_stock: "bg-red/10 text-red",
} as const;

const SingleItem = ({ item }: { item: WishlistItem }) => {
  const { t, formatPrice } = useI18n();
  const removeItemFromWishlist = useAppStore(
    (state) => state.removeItemFromWishlist,
  );
  const addItemToCart = useAppStore((state) => state.addItemToCart);
  const showCartToast = useCartToast();

  const availabilityStatus = item.availability?.status || "in_stock";
  const availabilityMessageKey = getAvailabilityMessageKey(availabilityStatus);
  const availabilityLabel =
    item.availability?.label ||
    (availabilityMessageKey ? t(availabilityMessageKey) : t("common.inStock"));
  const availabilityClass =
    STATUS_CLASS_BY_STATUS[
      availabilityStatus as keyof typeof STATUS_CLASS_BY_STATUS
    ] || STATUS_CLASS_BY_STATUS.in_stock;

  const handleRemoveFromWishlist = () => {
    removeItemFromWishlist(item.id);
  };

  const handleAddToCart = () => {
    const cartItem = {
      ...item,
      quantity: 1,
    };

    addItemToCart(cartItem);
    showCartToast(cartItem);
  };

  return (
    <article className="group h-full rounded-[28px] border border-white/70 bg-white/88 p-4 shadow-[0_24px_52px_-36px_rgba(15,23,42,0.34)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_34px_66px_-36px_rgba(60,80,224,0.22)]">
      <div className="relative mb-5 overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,#f9fbff_0%,#eef3ff_100%)]">
        <div className="absolute left-1/2 top-6 h-28 w-28 -translate-x-1/2 rounded-full bg-blue/10 blur-2xl" />
        <ProductLabelBadges
          labels={item.labels}
          className="absolute left-3 top-3 z-10"
        />

        <button
          type="button"
          onClick={handleRemoveFromWishlist}
          aria-label={t("wishlist.removeItem")}
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/90 text-dark shadow-sm transition-colors duration-200 hover:bg-red/10 hover:text-red"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="flex min-h-[250px] items-center justify-center px-4 py-8">
          <Image
            src={item.imgs?.previews?.[0] || item.imgs?.thumbnails?.[0] || FALLBACK_IMAGE}
            alt={item.title}
            width={240}
            height={220}
            className="h-auto max-h-[210px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      </div>

      <div className="flex h-[calc(100%-270px)] flex-col">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${availabilityClass}`}
          >
            {availabilityLabel}
          </span>

          {item.brand ? (
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-4">
              {item.brand}
            </span>
          ) : null}
        </div>

        <h3 className="text-lg font-semibold leading-7 text-dark transition-colors duration-200 hover:text-blue">
          <Link href={`/shop-details/${item.slug}`}>
            {item.title}
          </Link>
        </h3>

        <div className="mt-3 flex items-center gap-2 text-lg font-medium">
          <span className="text-dark">{formatPrice(item.discountedPrice)}</span>
          {item.price > item.discountedPrice ? (
            <span className="text-dark-4 line-through">
              {formatPrice(item.price)}
            </span>
          ) : null}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-5">
          <button
            type="button"
            onClick={handleAddToCart}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-blue px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-dark"
          >
            {t("wishlist.moveToCart")}
          </button>

          <Link
            href={`/shop-details/${item.slug}`}
            className="inline-flex items-center justify-center rounded-full border border-gray-3 bg-white px-5 py-3 text-sm font-medium text-dark transition-all duration-200 hover:-translate-y-0.5 hover:border-dark"
          >
            {t("wishlist.openProduct")}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default SingleItem;
