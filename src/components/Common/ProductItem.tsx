"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
const SLIDE_INTERVAL = 1800;

/* ─── icons ──────────────────────────────────────────────── */

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24"
    fill={filled ? "#ef4444" : "none"}
    stroke={filled ? "#ef4444" : "#1a1a1a"}
    strokeWidth="1.6" strokeLinejoin="round">
    <path d="M12 21C12 21 3 14.5 3 8.5 3 6 5 4 7.5 4c1.74 0 3.41 1 4.5 2.5C13.09 5 14.76 4 16.5 4 19 4 21 6 21 8.5c0 6-9 12.5-9 12.5z"/>
  </svg>
);

const CartIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.2"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

/* ─── quantity stepper (Wildberries style) ───────────────── */

const QuantityStepper = ({
  quantity, onIncrease, onDecrease, labelDecrease, labelIncrease,
}: {
  quantity: number; onIncrease: () => void; onDecrease: () => void;
  labelDecrease: string; labelIncrease: string;
}) => (
  <div className="flex h-[48px] w-full items-center justify-between overflow-hidden rounded-full bg-[#7B2FBE] px-1">
    <button type="button" onClick={onDecrease} aria-label={labelDecrease}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white/90 transition-all hover:bg-white/15 active:scale-90">
      {quantity === 1 ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2"/>
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      )}
    </button>
    <span className="text-[16px] font-bold text-white">{quantity}</span>
    <button type="button" onClick={onIncrease} aria-label={labelIncrease}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white/90 transition-all hover:bg-white/15 active:scale-90">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    </button>
  </div>
);

/* ─── main ───────────────────────────────────────────────── */

const ProductItemComponent = ({ item }: { item: Product }) => {
  const { openModal } = useModalContext();
  const { t, formatPrice } = useI18n();

  const {
    addItemToCart, addItemToWishlist, isInWishlist,
    removeItemFromWishlist, setProductDetails, setQuickViewProduct,
    cartQuantity, updateCartItemQuantity, removeItemFromCart,
  } = useAppStore(
    useShallow((state) => ({
      addItemToCart: state.addItemToCart,
      addItemToWishlist: state.addItemToWishlist,
      isInWishlist: state.wishlistItems.some((w) => w.id === item.id),
      removeItemFromWishlist: state.removeItemFromWishlist,
      setProductDetails: state.setProductDetails,
      setQuickViewProduct: state.setQuickViewProduct,
      cartQuantity: state.cartItems.find((c) => c.id === item.id)?.quantity ?? 0,
      updateCartItemQuantity: state.updateCartItemQuantity,
      removeItemFromCart: state.removeItemFromCart,
    })),
  );
  const showCartToast = useCartToast();
  const showWishlistToast = useWishlistToast();

  /* ── images ── */
  const allImages = Array.from(new Set([
    ...(item.imgs?.previews ?? []),
    ...(item.imgs?.thumbnails ?? []),
  ])).slice(0, 6);
  const images = allImages.length > 0 ? allImages : [FALLBACK_IMAGE];
  const hasMultiple = images.length > 1;

  /* ── slider ── */
  const [activeIdx, setActiveIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopSlider = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const startSlider = useCallback(() => {
    if (!hasMultiple) return;
    stopSlider();
    timerRef.current = setInterval(
      () => setActiveIdx((p) => (p + 1) % images.length),
      SLIDE_INTERVAL,
    );
  }, [hasMultiple, images.length, stopSlider]);

  const onEnter = useCallback(() => { setHovered(true); startSlider(); }, [startSlider]);
  const onLeave = useCallback(() => { setHovered(false); stopSlider(); setActiveIdx(0); }, [stopSlider]);

  useEffect(() => () => stopSlider(), [stopSlider]);

  /* ── availability ── */
  const availabilityStatus = item.availability?.status || "in_stock";
  const availabilityMessageKey = getAvailabilityMessageKey(availabilityStatus);
  const availabilityLabel =
    item.availability?.label ||
    (availabilityMessageKey ? t(availabilityMessageKey) : t("common.inStock"));
  const isOutOfStock = availabilityStatus === "out_of_stock";

  /* ── price ── */
  const hasDiscount = item.price > item.discountedPrice;
  const discountPct =
    hasDiscount && item.price > 0
      ? Math.round(((item.price - item.discountedPrice) / item.price) * 100) : 0;

  /* ── badge ── */
  const primaryLabel = item.labels?.[0];
  const BADGE: Record<string, { label: string; cls: string }> = {
    new:  { label: t("product.new"),  cls: "border border-[#BBF7D0] bg-[#DCFCE7] text-[#166534]" },
    hit:  { label: t("product.hit"),  cls: "border border-[#FDE68A] bg-[#FEF9C3] text-[#854D0E]" },
    sale: { label: t("product.sale"), cls: "border border-[#FECACA] bg-[#FEE2E2] text-[#991B1B]" },
  };
  const badge = primaryLabel ? (BADGE[primaryLabel] ?? null)
    : item.isNew ? BADGE.new
    : item.isFeatured ? BADGE.hit
    : null;

  /* ── nav ── */
  const href = `/shop-details/${item.slug}`;
  const nav = (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    markPendingCatalogRestore(); setProductDetails(item);
  };
  const lp = { href, onClick: nav, prefetch: false as const };

  /* ── handlers ── */
  const handleAddToCart = () => {
    const c = { ...item, quantity: 1 }; addItemToCart(c); showCartToast(c);
  };
  const handleIncrease = () =>
    updateCartItemQuantity({ id: item.id, quantity: cartQuantity + 1 });
  const handleDecrease = () => {
    if (cartQuantity <= 1) removeItemFromCart(item.id);
    else updateCartItemQuantity({ id: item.id, quantity: cartQuantity - 1 });
  };
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (isInWishlist) {
      removeItemFromWishlist(item.id);
      showWishlistToast({ ...item, status: availabilityStatus, quantity: 1 }, "removed");
    } else {
      const w = { ...item, status: availabilityStatus, quantity: 1 };
      addItemToWishlist(w); showWishlistToast(w, "added");
    }
  };
  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setQuickViewProduct(item); openModal();
  };

  /* ── render ── */
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-[#EBEBEB] bg-white transition-all duration-300 hover:border-[#D0D5DD] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]">

      {/* ══ PHOTO ════════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden rounded-2xl bg-[#F4F4F4]"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {/* badge top-left */}
        {badge ? (
          <span className={`absolute left-2.5 top-2.5 z-10 rounded-sm px-2 py-[3px] text-[11px] font-bold ${badge.cls}`}>
            {badge.label}
          </span>
        ) : null}

        {/* discount % — top-left below badge (WB style) */}
        {hasDiscount && !badge ? (
          <span className="absolute left-2.5 top-2.5 z-10 rounded-sm border border-[#FECACA] bg-[#FEE2E2] px-2 py-[3px] text-[11px] font-bold text-[#991B1B]">
            -{discountPct}%
          </span>
        ) : hasDiscount && badge ? (
          <span className="absolute left-2.5 top-9 z-10 rounded-sm border border-[#FECACA] bg-[#FEE2E2] px-2 py-[3px] text-[11px] font-bold text-[#991B1B]">
            -{discountPct}%
          </span>
        ) : null}

        {/* heart — top-right */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={t("common.addToWishlist")}
          className="absolute right-2.5 top-2.5 z-10 p-1 transition-transform duration-150 hover:scale-110 active:scale-95"
        >
          <HeartIcon filled={isInWishlist} />
        </button>

        {/* images */}
        <Link {...lp} className="block">
          <div className="aspect-[3/4] relative sm:aspect-square">
            {images.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt={`${item.title} ${i + 1}`}
                fill
                sizes="(min-width: 1280px) 18vw,(min-width:1024px) 24vw,(min-width:640px) 30vw,47vw"
                className={`object-cover transition-opacity duration-500 ${i === activeIdx ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
        </Link>

        {/* slide dots */}
        {hasMultiple ? (
          <div className="absolute bottom-[52px] left-1/2 z-10 flex -translate-x-1/2 items-center gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${i + 1}`}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveIdx(i); }}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIdx ? "h-1.5 w-4 bg-white shadow-sm" : "h-1.5 w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        ) : null}

        {/* quick-view button — white pill at bottom */}
        <div className={`absolute bottom-0 left-0 right-0 z-10 px-3 pb-3 transition-all duration-250 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}>
          <button
            type="button"
            onClick={handleQuickView}
            className="w-full rounded-xl border border-[#E2E8F0] bg-white/95 py-2.5 text-[13px] font-semibold text-[#1a1a1a] shadow-[0_2px_12px_rgba(0,0,0,0.10)] backdrop-blur-sm transition-all duration-150 hover:border-[#CBD5E1] hover:bg-white"
          >
            {t("common.view")}
          </button>
        </div>

        {/* out-of-stock */}
        {isOutOfStock ? (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/75 backdrop-blur-sm">
            <span className="rounded-full bg-white px-4 py-1.5 text-[12px] font-semibold text-slate-400 shadow-sm">
              {availabilityLabel}
            </span>
          </div>
        ) : null}
      </div>

      {/* ══ INFO ═════════════════════════════════════════════ */}
      <div className="flex flex-1 flex-col px-1 pt-2.5 pb-1">

        {/* price row */}
        <div className="mb-1 ml-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-[17px] font-bold leading-none text-[#1a1a1a] sm:text-[18px]">
            {formatPrice(item.discountedPrice)}
          </span>
          {hasDiscount ? (
            <span className="text-[13px] font-normal text-[#9E9E9E] line-through">
              {formatPrice(item.price)}
            </span>
          ) : null}
        </div>

        {/* title */}
        <p className="mb-3 ml-1.5 line-clamp-2 text-[13px] leading-[1.4] text-[#3D3D3D] sm:text-[13.5px]">
          <Link {...lp}>{item.title}</Link>
        </p>

        {/* CTA */}
        <div className="mt-auto flex flex-col gap-2">
          {cartQuantity > 0 ? (
            <QuantityStepper
              quantity={cartQuantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              labelDecrease={t("common.decreaseQuantity")}
              labelIncrease={t("common.increaseQuantity")}
            />
          ) : (
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#7B2FBE] py-3 text-[13px] font-semibold text-white transition-all duration-200 hover:bg-[#6A28A6] active:scale-[0.98] disabled:opacity-50 sm:text-[14px]"
            >
              <CartIcon />
              {t("common.addToCart")}
            </button>
          )}

          <ProductWhatsAppButton
            product={item}
            variant="pill"
            className="!w-full !rounded-full !py-3 !text-[13px] !font-semibold sm:!text-[14px]"
          />
        </div>
      </div>
    </article>
  );
};

/* ─── export ─────────────────────────────────────────────── */

const ProductItem = React.memo(ProductItemComponent);
ProductItem.displayName = "ProductItem";
export default ProductItem;
