"use client";
import React from "react";
import Link from "next/link";
import Breadcrumb from "../Common/Breadcrumb";
import { useI18n } from "@/i18n/provider";
import {
  selectWishlistItemsCount,
  useAppStore,
} from "@/store/app-store";
import SingleItem from "./SingleItem";

export const Wishlist = () => {
  const { t } = useI18n();
  const wishlistItems = useAppStore((state) => state.wishlistItems);
  const wishlistItemsCount = useAppStore(selectWishlistItemsCount);
  const removeAllItemsFromWishlist = useAppStore(
    (state) => state.removeAllItemsFromWishlist,
  );

  return (
    <>
      <Breadcrumb title={t("wishlist.title")} pages={[t("wishlist.title")]} />
      <section className="overflow-hidden px-4 py-12 sm:px-8 xl:px-0 xl:py-16">
        <div className="mx-auto max-w-[1170px]">
          <div className="section-shell px-5 py-7 sm:px-8 sm:py-8 xl:px-10 xl:py-10">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="section-kicker">{t("wishlist.title")}</span>
                <h2 className="section-title mt-4">{t("wishlist.yourWishlist")}</h2>
                <p className="section-copy">
                  {t("wishlist.itemsCount", { count: wishlistItemsCount })}
                </p>
              </div>

              {wishlistItemsCount > 0 ? (
                <button
                  type="button"
                  onClick={removeAllItemsFromWishlist}
                  className="inline-flex rounded-full border border-white bg-white px-5 py-3 text-sm font-medium text-dark transition-all duration-200 hover:-translate-y-0.5 hover:bg-dark hover:text-white"
                >
                  {t("wishlist.clearWishlist")}
                </button>
              ) : null}
            </div>

            {wishlistItems.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {wishlistItems.map((item) => (
                  <SingleItem item={item} key={item.id} />
                ))}
              </div>
            ) : (
              <div className="rounded-[28px] border border-white/70 bg-white/80 px-5 py-10 text-center shadow-[0_24px_52px_-36px_rgba(15,23,42,0.3)]">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue/10 text-blue">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.71673 6.02295C6.78065 6.90767 5.36255 9.01199 5.36255 11.5213C5.36255 14.0859 6.41164 16.0619 7.91556 17.7553C9.15409 19.1495 10.6546 20.304 12.1179 21.4318C12.4654 21.6995 12.8107 21.9657 13.1501 22.2332C13.7638 22.717 14.3112 23.1418 14.8388 23.45C15.3667 23.7585 15.7916 23.8993 16.1528 23.8993C16.514 23.8993 16.939 23.7585 17.4668 23.45C17.9945 23.1418 18.5418 22.717 19.1556 22.2332C19.4949 21.9657 19.8402 21.6995 20.1878 21.4318C21.651 20.304 23.1516 19.1495 24.3901 17.7553C25.894 16.0619 26.9431 14.0859 26.9431 11.5213C26.9431 9.01199 25.525 6.90767 23.5889 6.02295C21.7086 5.16345 19.1819 5.39107 16.781 7.88558C16.6161 8.05696 16.3884 8.15383 16.1501 8.15383C15.9119 8.15383 15.6841 8.05696 15.5192 7.88558C13.1184 5.39107 10.5916 5.16345 8.71135 6.02295"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <h3 className="mt-5 text-2xl font-semibold text-dark">
                  {t("wishlist.emptyTitle")}
                </h3>
                <p className="mx-auto mt-3 max-w-[460px] text-sm leading-7 text-dark-4 sm:text-base">
                  {t("wishlist.emptyDescription")}
                </p>

                <Link
                  href="/shop-with-sidebar"
                  className="mt-7 inline-flex rounded-full bg-blue px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-dark"
                >
                  {t("common.continueShopping")}
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
