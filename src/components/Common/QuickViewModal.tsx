"use client";

import React, { useEffect, useState } from "react";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/i18n/provider";
import { getAvailabilityMessageKey } from "@/i18n/utils";
import ProductLabelBadges from "./ProductLabelBadges";
import { useAppStore } from "@/store/app-store";
import { useCartToast } from "./useCartToast";
import { useWishlistToast } from "./useWishlistToast";
import { useShallow } from "zustand/react/shallow";
import { markPendingCatalogRestore } from "@/storefront/catalog-restoration";

const QuickViewModal = () => {
  const { isModalOpen, closeModal } = useModalContext();
  const { t, formatPrice } = useI18n();
  const [activeImg, setActiveImg] = useState(0);

  const {
    addItemToCart, addItemToWishlist, isInWishlist,
    product, removeItemFromWishlist, setProductDetails,
  } = useAppStore(
    useShallow((state) => ({
      addItemToCart: state.addItemToCart,
      addItemToWishlist: state.addItemToWishlist,
      isInWishlist: state.wishlistItems.some(
        (w) => w.id === state.quickViewProduct.id,
      ),
      product: state.quickViewProduct,
      removeItemFromWishlist: state.removeItemFromWishlist,
      setProductDetails: state.setProductDetails,
    })),
  );
  const showCartToast = useCartToast();
  const showWishlistToast = useWishlistToast();

  /* close on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      if (!e.target.closest(".qv-card")) closeModal();
    };
    if (isModalOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isModalOpen, closeModal]);

  /* reset slide on open */
  useEffect(() => { if (isModalOpen) setActiveImg(0); }, [isModalOpen]);

  if (!isModalOpen) return null;

  const availabilityStatus = product.availability?.status || "in_stock";
  const availabilityKey = getAvailabilityMessageKey(availabilityStatus);
  const availabilityLabel =
    product.availability?.label ||
    (availabilityKey ? t(availabilityKey) : t("common.inStock"));
  const isInStock = availabilityStatus === "in_stock";

  const hasDiscount = product.price > product.discountedPrice;
  const discountPct =
    hasDiscount && product.price > 0
      ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
      : 0;

  const images = [
    ...(product.imgs?.previews ?? []),
    ...(product.imgs?.thumbnails ?? []),
  ].filter((v, i, a) => a.indexOf(v) === i).slice(0, 6);
  const imageSrc = images[activeImg] || images[0] || "/images/products/product-1-sm-1.png";

  const handleAddToCart = () => {
    const c = { ...product, quantity: 1 };
    addItemToCart(c);
    showCartToast(c);
    closeModal();
  };

  const handleWishlist = () => {
    const w = { ...product, status: availabilityStatus, quantity: 1 };
    if (isInWishlist) {
      removeItemFromWishlist(product.id);
      showWishlistToast(w, "removed");
    } else {
      addItemToWishlist(w);
      showWishlistToast(w, "added");
    }
  };

  const handleOpenProduct = () => {
    markPendingCatalogRestore();
    setProductDetails(product);
    closeModal();
  };

  return (
    /* backdrop */
    <div className="fixed inset-0 z-[99999] flex items-end justify-center bg-black/50 backdrop-blur-[2px] sm:items-center sm:p-4">

      {/* card */}
      <div className="qv-card relative flex w-full max-w-[480px] flex-col overflow-hidden rounded-t-[28px] bg-white shadow-2xl sm:rounded-[28px]">

        {/* ── image zone ── */}
        <div className="relative bg-[#F4F4F4]">

          {/* badges */}
          <div className="absolute left-3 top-3 z-10">
            <ProductLabelBadges labels={product.labels} compact />
          </div>

          {/* close */}
          <button
            type="button"
            onClick={closeModal}
            aria-label={t("common.close")}
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#E8E8E8] bg-white text-[#666] shadow-sm transition-colors hover:bg-gray-50"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>

          {/* main image */}
          <div className="aspect-square relative">
            <Image
              src={imageSrc}
              alt={product.title}
              fill
              sizes="480px"
              className="object-contain p-8 drop-shadow-[0_8px_24px_rgba(0,0,0,0.10)]"
            />
          </div>

          {/* thumbnail dots */}
          {images.length > 1 ? (
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeImg
                      ? "h-2 w-5 bg-[#7B2FBE]"
                      : "h-2 w-2 bg-[#CFCFCF] hover:bg-[#ABABAB]"
                  }`}
                />
              ))}
            </div>
          ) : null}
        </div>

        {/* ── info zone ── */}
        <div className="flex flex-col gap-3 px-5 pb-6 pt-4">

          {/* status + brand */}
          <div className="flex items-center justify-between">
            <span className={`text-[11px] font-bold uppercase tracking-widest ${isInStock ? "text-[#16A34A]" : "text-[#DC2626]"}`}>
              {availabilityLabel}
            </span>
            {product.brand ? (
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#9E9E9E]">
                {product.brand}
              </span>
            ) : null}
          </div>

          {/* title */}
          <h3 className="line-clamp-2 text-[17px] font-bold leading-snug text-[#1a1a1a]">
            {product.title}
          </h3>

          {/* price */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[22px] font-extrabold leading-none text-[#1a1a1a]">
              {formatPrice(product.discountedPrice)}
            </span>
            {hasDiscount ? (
              <>
                <span className="text-[15px] text-[#9E9E9E] line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="rounded-md border border-[#FECACA] bg-[#FEE2E2] px-2 py-0.5 text-[12px] font-bold text-[#991B1B]">
                  -{discountPct}%
                </span>
              </>
            ) : null}
          </div>

          {/* wishlist toggle */}
          <button
            type="button"
            onClick={handleWishlist}
            className={`flex w-full items-center justify-center gap-2 rounded-full border py-2.5 text-[13px] font-semibold transition-all duration-200 ${
              isInWishlist
                ? "border-[#FECACA] bg-[#FEE2E2] text-[#991B1B]"
                : "border-[#E8E8E8] bg-white text-[#555] hover:border-[#FECACA] hover:bg-[#FEE2E2] hover:text-[#991B1B]"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24"
              fill={isInWishlist ? "currentColor" : "none"}
              stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
              <path d="M12 21C12 21 3 14.5 3 8.5 3 6 5 4 7.5 4c1.74 0 3.41 1 4.5 2.5C13.09 5 14.76 4 16.5 4 19 4 21 6 21 8.5c0 6-9 12.5-9 12.5z"/>
            </svg>
            {isInWishlist ? t("wishlist.removeItem") : t("common.addToWishlist")}
          </button>

          {/* main buttons */}
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#7B2FBE] py-3.5 text-[14px] font-bold text-white shadow-[0_4px_16px_rgba(123,47,190,0.35)] transition-all hover:bg-[#6A28A6] active:scale-[0.98]"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {t("common.addToCart")}
            </button>

            <Link
              href={`/shop-details/${product.slug}`}
              onClick={handleOpenProduct}
              className="flex flex-1 items-center justify-center rounded-full border border-[#E8E8E8] bg-white py-3.5 text-[14px] font-bold text-[#1a1a1a] transition-all hover:border-[#D0D0D0] hover:bg-gray-50 active:scale-[0.98]"
            >
              {t("wishlist.openProduct")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
