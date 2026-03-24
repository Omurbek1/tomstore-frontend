"use client";
import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import { useI18n } from "@/i18n/provider";
import { useAppStore } from "@/store/app-store";
import SingleItem from "./SingleItem";

export const Wishlist = () => {
  const { t } = useI18n();
  const wishlistItems = useAppStore((state) => state.wishlistItems);
  const removeAllItemsFromWishlist = useAppStore(
    (state) => state.removeAllItemsFromWishlist,
  );

  return (
    <>
      <Breadcrumb title={t("wishlist.title")} pages={[t("wishlist.title")]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
            <h2 className="font-medium text-dark text-2xl">{t("wishlist.yourWishlist")}</h2>
            <button
              type="button"
              onClick={removeAllItemsFromWishlist}
              className="text-blue"
            >
              {t("wishlist.clearWishlist")}
            </button>
          </div>

          <div className="bg-white rounded-[10px] shadow-1">
            <div className="w-full overflow-x-auto">
              <div className="min-w-[1170px]">
                {/* <!-- table header --> */}
                <div className="flex items-center py-5.5 px-10">
                  <div className="min-w-[83px]"></div>
                  <div className="min-w-[387px]">
                    <p className="text-dark">{t("common.product")}</p>
                  </div>

                  <div className="min-w-[205px]">
                    <p className="text-dark">{t("wishlist.unitPrice")}</p>
                  </div>

                  <div className="min-w-[265px]">
                    <p className="text-dark">{t("wishlist.stockStatus")}</p>
                  </div>

                  <div className="min-w-[150px]">
                    <p className="text-dark text-right">{t("common.action")}</p>
                  </div>
                </div>

                {/* <!-- wish item --> */}
                {wishlistItems.map((item, key) => (
                  <SingleItem item={item} key={key} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
