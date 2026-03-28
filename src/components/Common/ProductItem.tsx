"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { useI18n } from "@/i18n/provider";
import { getAvailabilityMessageKey } from "@/i18n/utils";
import ProductWhatsAppButton from "./ProductWhatsAppButton";
import { useAppStore } from "@/store/app-store";
import { useCartToast } from "./useCartToast";
import { useWishlistToast } from "./useWishlistToast";
import { useShallow } from "zustand/react/shallow";
import { markPendingCatalogRestore } from "@/storefront/catalog-restoration";

const FALLBACK_IMAGE = "/images/products/product-1-sm-1.png";

const StarIcon = ({ filled }: { filled?: boolean }) => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 16 16"
    fill={filled ? "#FACC15" : "none"}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 1.5L9.854 5.752L14.5 6.382L11.25 9.548L12.09 14.5L8 12.277L3.91 14.5L4.75 9.548L1.5 6.382L6.146 5.752L8 1.5Z"
      stroke="#FACC15"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
);

const ProductItemComponent = ({ item }: { item: Product }) => {
  const { openModal } = useModalContext();
  const { t, formatPrice } = useI18n();
  const {
    addItemToCart,
    addItemToWishlist,
    isInWishlist,
    removeItemFromWishlist,
    setProductDetails,
    setQuickViewProduct,
  } = useAppStore(
    useShallow((state) => ({
      addItemToCart: state.addItemToCart,
      addItemToWishlist: state.addItemToWishlist,
      isInWishlist: state.wishlistItems.some(
        (wishlistItem) => wishlistItem.id === item.id,
      ),
      removeItemFromWishlist: state.removeItemFromWishlist,
      setProductDetails: state.setProductDetails,
      setQuickViewProduct: state.setQuickViewProduct,
    })),
  );
  const showCartToast = useCartToast();
  const showWishlistToast = useWishlistToast();

  const availabilityStatus = item.availability?.status || "in_stock";
  const availabilityMessageKey = getAvailabilityMessageKey(availabilityStatus);
  const availabilityLabel =
    item.availability?.label ||
    (availabilityMessageKey ? t(availabilityMessageKey) : t("common.inStock"));

  const imageSrc =
    item.imgs?.previews?.[0] || item.imgs?.thumbnails?.[0] || FALLBACK_IMAGE;
  const hasDiscount = item.price > item.discountedPrice;
  const discountPercent =
    hasDiscount && item.price > 0
      ? Math.round(((item.price - item.discountedPrice) / item.price) * 100)
      : 0;

  // Primary badge: first custom label, else isNew / isFeatured
  const primaryLabel = item.labels?.[0];
  const badgeText = primaryLabel?.text || (item.isNew ? t("product.new") : item.isFeatured ? t("product.hit") : null);
  const badgeClass = primaryLabel
    ? "bg-green-100 text-green-700 border-green-200"
    : item.isNew
    ? "bg-emerald-100 text-emerald-700 border-emerald-200"
    : "bg-orange-100 text-orange-600 border-orange-200";

  // Rating (static 5 stars rendered, filled based on item reviews > 0)
  const ratingValue = item.reviews > 0 ? 4.8 : 0;
  const fullStars = Math.round(ratingValue);

  const isOutOfStock = availabilityStatus === "out_of_stock";

  const handleQuickViewUpdate = () => setQuickViewProduct(item);

  const handleAddToCart = () => {
    const cartItem = { ...item, quantity: 1 };
    addItemToCart(cartItem);
    showCartToast(cartItem);
  };

  const handleItemToWishList = () => {
    if (isInWishlist) {
      removeItemFromWishlist(item.id);
      showWishlistToast({ ...item, status: item.availability?.status, quantity: 1 }, "removed");
      return;
    }
    const wishlistItem = { ...item, status: item.availability?.status, quantity: 1 };
    addItemToWishlist(wishlistItem);
    showWishlistToast(wishlistItem, "added");
  };

  const handleProductDetails = () => setProductDetails(item);

  const productHref = `/shop-details/${item.slug}`;
  const linkProps = {
    href: productHref,
    onClick: (e: React.MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      markPendingCatalogRestore();
      handleProductDetails();
    },
    prefetch: false as const,
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-100 bg-white shadow-[0_2px_16px_0_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_-8px_rgba(60,80,224,0.18)]">

      {/* ── Image area ── */}
      <div className="relative overflow-hidden bg-[linear-gradient(160deg,#f8faff_0%,#eef2ff_100%)]">

        {/* Badge top-left */}
        {badgeText ? (
          <span
            className={`absolute left-3 top-3 z-10 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badgeClass}`}
          >
            {badgeText}
          </span>
        ) : null}

        {/* Actions top-right */}
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={handleItemToWishList}
            aria-label={t("common.addToWishlist")}
            className={`flex h-8 w-8 items-center justify-center rounded-full border shadow-sm transition-all duration-200 hover:-translate-y-0.5 ${
              isInWishlist
                ? "border-red/20 bg-red/10 text-red"
                : "border-white/80 bg-white text-slate-400 hover:text-red"
            }`}
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill={isInWishlist ? "currentColor" : "none"} xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 13.5C8 13.5 2 9.5 2 5.5C2 4.09 3.09 3 4.5 3C5.55 3 6.45 3.67 7 4.5C7.55 3.67 8.45 3 9.5 3C10.91 3 12 4.09 12 5.5C12 9.5 8 13.5 8 13.5Z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => { handleQuickViewUpdate(); openModal(); }}
            aria-label={t("common.view")}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/80 bg-white text-slate-400 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:text-blue"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M8 5.5C6.62 5.5 5.5 6.62 5.5 8S6.62 10.5 8 10.5 10.5 9.38 10.5 8 9.38 5.5 8 5.5Zm-1 2.5a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" fill="currentColor"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M8 2.17C5 2.17 2.96 3.97 1.79 5.5c-.27.35-.52.67-.69 1.07-.18.4-.25.84-.25 1.43s.07.63.25 1.03c.17.38.42.7.69 1.05C2.96 12.03 5 13.83 8 13.83s5.04-1.8 6.21-3.33c.27-.35.52-.67.69-1.05.18-.4.25-.84.25-1.43s-.07-.63-.25-1.03a4.3 4.3 0 0 0-.69-1.07C13.04 3.97 11 2.17 8 2.17Zm-5.42 3.94C3.67 4.7 5.43 3.17 8 3.17s4.33 1.53 5.42 2.94c.29.38.46.65.57.9.1.24.17.53.17 1s-.07.57-.17.8c-.11.25-.28.52-.57.9C12.33 11.3 10.57 12.83 8 12.83s-4.33-1.53-5.42-2.94a3.3 3.3 0 0 1-.57-.9C1.91 8.75 1.83 8.5 1.83 8s.06-.57.17-.8c.11-.25.28-.52.57-.9Z" fill="currentColor"/>
            </svg>
          </button>
        </div>

        {/* Product image */}
        <Link {...linkProps} className="block">
          <div className="aspect-square relative">
            <Image
              src={imageSrc}
              alt={item.title}
              fill
              sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 24vw, (min-width: 640px) 30vw, 47vw"
              className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.06] drop-shadow-[0_16px_24px_rgba(15,23,42,0.12)]"
            />
          </div>
        </Link>

        {/* Out-of-stock overlay */}
        {isOutOfStock ? (
          <div className="pointer-events-none absolute inset-0 bg-white/60 backdrop-blur-[2px]">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-500">
              {availabilityLabel}
            </span>
          </div>
        ) : null}
      </div>

      {/* ── Content area ── */}
      <div className="flex flex-1 flex-col gap-2.5 p-3.5 sm:p-4">

        {/* Rating */}
        {item.reviews > 0 ? (
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} filled={i < fullStars} />
              ))}
            </div>
            <span className="text-[12px] font-semibold text-slate-700">{ratingValue}</span>
            <span className="text-[11px] text-slate-400">
              ({item.reviews})
            </span>
          </div>
        ) : null}

        {/* Title */}
        <h3 className="line-clamp-2 text-[13px] font-bold leading-snug text-slate-800 transition-colors duration-200 group-hover:text-blue sm:text-[14px]">
          <Link {...linkProps}>{item.title}</Link>
        </h3>

        {/* Specs */}
        {item.specs && item.specs.length > 0 ? (
          <ul className="flex flex-col gap-1">
            {item.specs.slice(0, 4).map((spec, i) => (
              <li key={i} className="flex items-center gap-2 text-[11px] text-slate-500 sm:text-[12px]">
                <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-blue/40" />
                {spec}
              </li>
            ))}
          </ul>
        ) : null}

        {/* Price block */}
        <div className="mt-auto pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[18px] font-extrabold leading-none text-slate-900 sm:text-[20px]">
              {formatPrice(item.discountedPrice)}
            </span>
            {hasDiscount ? (
              <span className="rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-bold text-green-600">
                -{discountPercent}%
              </span>
            ) : null}
          </div>

          {hasDiscount ? (
            <span className="mt-0.5 block text-[12px] text-slate-400 line-through">
              {formatPrice(item.price)}
            </span>
          ) : null}
        </div>

        {/* Benefits */}
        <div className="flex flex-col gap-1 rounded-[12px] bg-slate-50 px-3 py-2.5">
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 text-blue">
              <path d="M1 12L5 8V16H1V12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M5 9H15L19 12L21 15H5V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <circle cx="8.5" cy="18" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="17.5" cy="18" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            {t("common.deliveryAcrossKyrgyzstan")}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 text-blue">
              <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M2 10H22" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M6 15H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {t("common.installment")} {t("common.installmentTerm", { months: 12 })}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="inline-flex items-center justify-center gap-1.5 rounded-[14px] bg-blue px-3 py-2.5 text-[12px] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(60,80,224,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-dark disabled:opacity-50 sm:text-[13px]"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 fill-current">
              <path fillRule="evenodd" clipRule="evenodd" d="M1.49 1.53a.5.5 0 0 0-.31.95l.18.06c.45.15.75.25.97.35.21.1.3.18.36.26.06.08.1.19.13.42.03.24.03.55.03 1.03v1.78c0 .91 0 1.65.08 2.23.08.6.25 1.1.65 1.5.4.4.91.58 1.51.65.58.08 1.32.08 2.23.08h5.34a.5.5 0 0 0 0-1H7.33c-.96 0-1.63 0-2.13-.07-.49-.07-.75-.19-.94-.38a.9.9 0 0 1-.18-.35h6.6c.3 0 .56 0 .78-.03.24-.02.46-.08.67-.22.22-.14.36-.33.47-.54.11-.19.21-.43.33-.7l.31-.72c.26-.6.47-1.1.57-1.51.11-.43.14-.87-.12-1.27-.26-.4-.68-.55-1.11-.62-.42-.06-.96-.06-1.61-.06H3.8l-.02-.11c-.04-.32-.12-.61-.31-.88-.19-.27-.45-.44-.75-.58-.27-.13-.62-.25-1.04-.38L1.49 1.53Z" fill=""/>
              <circle cx="5" cy="13" r="1" fill=""/>
              <circle cx="11" cy="13" r="1" fill=""/>
            </svg>
            <span className="truncate">{t("common.addToCart")}</span>
          </button>

          <ProductWhatsAppButton product={item} variant="pill" className="rounded-[14px] !px-3 !py-2.5 !text-[12px] !font-semibold sm:!text-[13px]" />
        </div>
      </div>
    </article>
  );
};

const ProductItem = React.memo(ProductItemComponent);
ProductItem.displayName = "ProductItem";
export default ProductItem;
