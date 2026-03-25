"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { useI18n } from "@/i18n/provider";
import { getAvailabilityMessageKey } from "@/i18n/utils";
import ProductLabelBadges from "@/components/Common/ProductLabelBadges";
import { useAppStore } from "@/store/app-store";
import { useCartToast } from "@/components/Common/useCartToast";
import { useWishlistToast } from "@/components/Common/useWishlistToast";
import { useShallow } from "zustand/react/shallow";

const FALLBACK_IMAGE = "/images/products/product-1-sm-1.png";

const STATUS_CLASS_BY_STATUS = {
  in_stock: "border-green/10 bg-green/10 text-green-dark",
  on_order: "border-yellow-dark/10 bg-yellow-light-2 text-yellow-dark-2",
  in_transit: "border-blue/10 bg-blue/10 text-blue-dark",
  out_of_stock: "border-red/10 bg-red/10 text-red",
} as const;

const SingleListItemComponent = ({ item }: { item: Product }) => {
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
  const availabilityClass =
    STATUS_CLASS_BY_STATUS[
      availabilityStatus as keyof typeof STATUS_CLASS_BY_STATUS
    ] || STATUS_CLASS_BY_STATUS.in_stock;
  const imageSrc =
    item.imgs?.previews?.[0] || item.imgs?.thumbnails?.[0] || FALLBACK_IMAGE;
  const hasDiscount = item.price > item.discountedPrice;
  const discountPercent =
    hasDiscount && item.price > 0
      ? Math.round(((item.price - item.discountedPrice) / item.price) * 100)
      : 0;

  const handleQuickViewUpdate = () => {
    setQuickViewProduct(item);
  };

  const handleAddToCart = () => {
    const cartItem = {
      ...item,
      quantity: 1,
    };

    addItemToCart(cartItem);
    showCartToast(cartItem);
  };

  const handleItemToWishList = () => {
    if (isInWishlist) {
      removeItemFromWishlist(item.id);
      showWishlistToast(
        {
          ...item,
          status: item.availability?.status,
          quantity: 1,
        },
        "removed",
      );
      return;
    }

    const wishlistItem = {
      ...item,
      status: item.availability?.status,
      quantity: 1,
    };

    addItemToWishlist(wishlistItem);
    showWishlistToast(wishlistItem, "added");
  };

  return (
    <article className="group overflow-hidden rounded-[30px] border border-white/80 bg-white/92 p-3 shadow-[0_24px_52px_-36px_rgba(15,23,42,0.34)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-blue/20 hover:shadow-[0_38px_75px_-40px_rgba(60,80,224,0.24)] sm:p-4">
      <div className="flex flex-col gap-3 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:items-stretch xl:grid-cols-[260px_minmax(0,1fr)]">
        <div className="relative flex min-h-[224px] items-center justify-center overflow-hidden rounded-[26px] border border-white/75 bg-[radial-gradient(circle_at_top,#ffffff_0%,#f3f7ff_52%,#e8efff_100%)] px-4 pb-5 pt-16">
          <div className="absolute left-1/2 top-5 h-24 w-24 -translate-x-1/2 rounded-full bg-blue/15 blur-2xl" />

          <ProductLabelBadges
            labels={item.labels}
            className="absolute left-3 top-3 z-10 max-w-[calc(100%-24px)]"
          />

          <div className="absolute right-3 top-3 z-10 flex items-center gap-2">
            <button
              type="button"
              onClick={handleItemToWishList}
              aria-label={t("common.addToWishlist")}
              className={`flex h-10 w-10 items-center justify-center rounded-full border shadow-sm backdrop-blur-sm transition-all duration-200 ${
                isInWishlist
                  ? "border-red/10 bg-red/10 text-red"
                  : "border-white/70 bg-white/90 text-dark hover:-translate-y-0.5 hover:border-blue/20 hover:text-blue"
              }`}
            >
              <svg
                className="fill-current"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.74949 2.94946C2.6435 3.45502 1.83325 4.65749 1.83325 6.0914C1.83325 7.55633 2.43273 8.68549 3.29211 9.65318C4.0004 10.4507 4.85781 11.1118 5.694 11.7564C5.89261 11.9095 6.09002 12.0617 6.28395 12.2146C6.63464 12.491 6.94747 12.7337 7.24899 12.9099C7.55068 13.0862 7.79352 13.1667 7.99992 13.1667C8.20632 13.1667 8.44916 13.0862 8.75085 12.9099C9.05237 12.7337 9.3652 12.491 9.71589 12.2146C9.90982 12.0617 10.1072 11.9095 10.3058 11.7564C11.142 11.1118 11.9994 10.4507 12.7077 9.65318C13.5671 8.68549 14.1666 7.55633 14.1666 6.0914C14.1666 4.65749 13.3563 3.45502 12.2503 2.94946C11.1759 2.45832 9.73214 2.58839 8.36016 4.01382C8.2659 4.11175 8.13584 4.16709 7.99992 4.16709C7.864 4.16709 7.73393 4.11175 7.63967 4.01382C6.26769 2.58839 4.82396 2.45832 3.74949 2.94946ZM7.99992 2.97255C6.45855 1.5935 4.73256 1.40058 3.33376 2.03998C1.85639 2.71528 0.833252 4.28336 0.833252 6.0914C0.833252 7.86842 1.57358 9.22404 2.5444 10.3172C3.32183 11.1926 4.2734 11.9253 5.1138 12.5724C5.30431 12.7191 5.48911 12.8614 5.66486 12.9999C6.00636 13.2691 6.37295 13.5562 6.74447 13.7733C7.11582 13.9903 7.53965 14.1667 7.99992 14.1667C8.46018 14.1667 8.88401 13.9903 9.25537 13.7733C9.62689 13.5562 9.99348 13.2691 10.335 12.9999C10.5107 12.8614 10.6955 12.7191 10.886 12.5724C11.7264 11.9253 12.678 11.1926 13.4554 10.3172C14.4263 9.22404 15.1666 7.86842 15.1666 6.0914C15.1666 4.28336 14.1434 2.71528 12.6661 2.03998C11.2673 1.40058 9.54129 1.5935 7.99992 2.97255Z"
                  fill={isInWishlist ? "currentColor" : ""}
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => {
                handleQuickViewUpdate();
                openModal();
              }}
              aria-label={t("common.view")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/90 text-dark shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue/20 hover:text-blue"
            >
              <svg
                className="fill-current"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.00016 5.5C6.61945 5.5 5.50016 6.61929 5.50016 8C5.50016 9.38071 6.61945 10.5 8.00016 10.5C9.38087 10.5 10.5002 9.38071 10.5002 8C10.5002 6.61929 9.38087 5.5 8.00016 5.5ZM6.50016 8C6.50016 7.17157 7.17174 6.5 8.00016 6.5C8.82859 6.5 9.50016 7.17157 9.50016 8C9.50016 8.82842 8.82859 9.5 8.00016 9.5C7.17174 9.5 6.50016 8.82842 6.50016 8Z"
                  fill=""
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.00016 2.16666C4.99074 2.16666 2.96369 3.96946 1.78721 5.49791L1.76599 5.52546C1.49992 5.87102 1.25487 6.18928 1.08862 6.5656C0.910592 6.96858 0.833496 7.40779 0.833496 8C0.833496 8.5922 0.910592 9.03142 1.08862 9.4344C1.25487 9.81072 1.49992 10.129 1.76599 10.4745L1.78721 10.5021C2.96369 12.0305 4.99074 13.8333 8.00016 13.8333C11.0096 13.8333 13.0366 12.0305 14.2131 10.5021L14.2343 10.4745C14.5004 10.129 14.7455 9.81072 14.9117 9.4344C15.0897 9.03142 15.1668 8.5922 15.1668 8C15.1668 7.40779 15.0897 6.96858 14.9117 6.5656C14.7455 6.18927 14.5004 5.87101 14.2343 5.52545L14.2131 5.49791C13.0366 3.96946 11.0096 2.16666 8.00016 2.16666ZM2.57964 6.10786C3.66592 4.69661 5.43374 3.16666 8.00016 3.16666C10.5666 3.16666 12.3344 4.69661 13.4207 6.10786C13.7131 6.48772 13.8843 6.7147 13.997 6.9697C14.1023 7.20801 14.1668 7.49929 14.1668 8C14.1668 8.50071 14.1023 8.79199 13.997 9.0303C13.8843 9.28529 13.7131 9.51227 13.4207 9.89213C12.3344 11.3034 10.5666 12.8333 8.00016 12.8333C5.43374 12.8333 3.66592 11.3034 2.57964 9.89213C2.28725 9.51227 2.11599 9.28529 2.00334 9.0303C1.89805 8.79199 1.8335 8.50071 1.8335 8C1.8335 7.49929 1.89805 7.20801 2.00334 6.9697C2.11599 6.7147 2.28725 6.48772 2.57964 6.10786Z"
                  fill=""
                />
              </svg>
            </button>
          </div>

          {hasDiscount ? (
            <div className="absolute bottom-3 left-3 inline-flex items-center rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-red shadow-sm backdrop-blur-sm">
              -{discountPercent}%
            </div>
          ) : null}

          <Image
            src={imageSrc}
            alt={item.title}
            width={250}
            height={250}
            sizes="(min-width: 1280px) 260px, (min-width: 1024px) 240px, 90vw"
            className="relative z-[1] h-auto max-h-[182px] w-auto object-contain drop-shadow-[0_18px_30px_rgba(15,23,42,0.12)] transition-transform duration-300 group-hover:scale-[1.04]"
          />
        </div>

        <div className="flex min-w-0 flex-col justify-between gap-4 px-1 py-1 lg:px-2">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                {item.brand ? (
                  <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-blue/85">
                    {item.brand}
                  </p>
                ) : null}
                <h3
                  className="overflow-hidden text-xl font-semibold leading-8 text-dark transition-colors duration-200 hover:text-blue [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]"
                  onClick={() => setProductDetails(item)}
                >
                  <Link href={`/shop-details/${item.slug}`} prefetch={false}>
                    {item.title}
                  </Link>
                </h3>
              </div>

              <span
                className={`inline-flex max-w-full rounded-full border px-3 py-1.5 text-center text-[11px] font-semibold leading-4 ${availabilityClass}`}
              >
                {availabilityLabel}
              </span>
            </div>

            {item.shortDescription ? (
              <p className="max-w-2xl overflow-hidden text-[13px] leading-6 text-dark-4 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                {item.shortDescription}
              </p>
            ) : null}

            {item.reviews > 0 ? (
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Image
                      key={index}
                      src="/images/icons/icon-star.svg"
                      alt="star icon"
                      width={15}
                      height={15}
                    />
                  ))}
                </div>

                <p className="text-sm font-medium text-dark-4">
                  {t("common.reviewsLabel", { count: item.reviews })}
                </p>
              </div>
            ) : null}
          </div>

          <div className="grid gap-3 border-t border-gray-3/70 pt-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="grid gap-3 rounded-[24px] border border-gray-3/80 bg-[linear-gradient(180deg,#fbfcff_0%,#f4f7ff_100%)] p-4">
              <div className="flex flex-wrap items-start justify-between gap-2.5">
                <div className="min-w-0 flex-1">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-4">
                    {t("common.price")}
                  </p>

                  <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
                    <span className="max-w-full break-words text-[24px] font-semibold leading-tight text-dark lg:text-[26px]">
                      {formatPrice(item.discountedPrice)}
                    </span>
                    {hasDiscount ? (
                      <span className="inline-flex max-w-full rounded-full bg-white px-3 py-1 text-sm font-medium text-dark-4 line-through shadow-[0_10px_24px_-20px_rgba(15,23,42,0.45)]">
                        {formatPrice(item.price)}
                      </span>
                    ) : null}
                  </div>
                </div>

                {hasDiscount ? (
                  <span className="shrink-0 rounded-full border border-green/10 bg-green/10 px-3 py-1 text-[11px] font-semibold text-green-dark">
                    -{discountPercent}%
                  </span>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:items-stretch lg:justify-end xl:flex-row">
              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue px-6 py-3 text-sm font-medium text-white shadow-[0_20px_30px_-20px_rgba(60,80,224,0.8)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-dark sm:w-auto"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.4915 1.52567C1.22953 1.43835 0.94637 1.57993 0.859046 1.8419C0.771722 2.10387 0.913302 2.38703 1.17527 2.47436L1.35188 2.53322C1.80282 2.68354 2.10095 2.78371 2.32058 2.88589C2.52856 2.98264 2.61848 3.0605 2.67609 3.14043C2.7337 3.22037 2.77914 3.33029 2.80516 3.55819C2.83263 3.79886 2.83339 4.11337 2.83339 4.5887L2.83339 6.36993C2.83337 7.28166 2.83336 8.01654 2.91107 8.59451C2.99175 9.19459 3.16434 9.69984 3.56562 10.1011C3.9669 10.5024 4.47215 10.675 5.07222 10.7557C5.6502 10.8334 6.38507 10.8334 7.29679 10.8333H12.6667C12.9429 10.8333 13.1667 10.6095 13.1667 10.3333C13.1667 10.0572 12.9429 9.83335 12.6667 9.83335H7.33339C6.37644 9.83335 5.70903 9.83228 5.20547 9.76458C4.71628 9.69881 4.45724 9.57852 4.27273 9.39401C4.20826 9.32954 4.15164 9.25598 4.10244 9.16668H10.7057C11.0046 9.1667 11.2675 9.16671 11.4858 9.14315C11.7221 9.11764 11.951 9.06096 12.1664 8.91894C12.3818 8.77692 12.524 8.58882 12.6406 8.3817C12.7482 8.19036 12.8518 7.94869 12.9695 7.67396L13.2807 6.94778C13.537 6.34978 13.7515 5.84948 13.8588 5.44258C13.9708 5.01809 13.9999 4.57488 13.7358 4.17428C13.4716 3.77367 13.0528 3.62588 12.6185 3.56159C12.2022 3.49996 11.6579 3.49999 11.0073 3.50001L3.80456 3.50001C3.80273 3.48135 3.80078 3.46293 3.7987 3.44476C3.7618 3.12155 3.6814 2.82497 3.48733 2.55572C3.29327 2.28647 3.03734 2.11641 2.74238 1.9792C2.46489 1.85011 2.11201 1.73249 1.69443 1.59331L1.4915 1.52567Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.50005 13C3.50005 13.8284 4.17163 14.5 5.00005 14.5C5.82848 14.5 6.50005 13.8284 6.50005 13C6.50005 12.1716 5.82848 11.5 5.00005 11.5C4.17163 11.5 3.50005 12.1716 3.50005 13ZM5.00005 13.5C4.72391 13.5 4.50005 13.2762 4.50005 13C4.50005 12.7239 4.72391 12.5 5.00005 12.5C5.2762 12.5 5.50005 12.7239 5.50005 13C5.50005 13.2762 5.2762 13.5 5.00005 13.5Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.0001 14.5001C10.1716 14.5001 9.50005 13.8285 9.50005 13.0001C9.50005 12.1716 10.1716 11.5001 11.0001 11.5001C11.8285 11.5001 12.5001 12.1716 12.5001 13.0001C12.5001 13.8285 11.8285 14.5001 11.0001 14.5001ZM10.5001 13.0001C10.5001 13.2762 10.7239 13.5001 11.0001 13.5001C11.2762 13.5001 11.5001 13.2762 11.5001 13.0001C11.5001 12.7239 11.2762 12.5001 11.0001 12.5001C10.7239 12.5001 10.5001 12.7239 10.5001 13.0001Z"
                    fill=""
                  />
                </svg>
                {t("common.addToCart")}
              </button>

              <Link
                href={`/shop-details/${item.slug}`}
                prefetch={false}
                className="inline-flex w-full items-center justify-center rounded-full border border-gray-3 bg-white px-6 py-3 text-sm font-medium text-dark transition-all duration-200 hover:-translate-y-0.5 hover:border-dark sm:w-auto"
              >
                {t("common.view")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

const SingleListItem = React.memo(SingleListItemComponent);

SingleListItem.displayName = "SingleListItem";

export default SingleListItem;
