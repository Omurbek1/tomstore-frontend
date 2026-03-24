"use client";

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useI18n } from "@/i18n/provider";
import type { CartItem } from "@/store/app-store";

const FALLBACK_IMAGE = "/images/products/product-1-sm-1.png";

export const useCartToast = () => {
  const { formatPrice, t } = useI18n();

  return (item: CartItem) => {
    const imageSrc =
      item.imgs?.thumbnails?.[0] || item.imgs?.previews?.[0] || FALLBACK_IMAGE;

    toast.custom(
      (toastItem) => (
        <div className="pointer-events-auto w-full max-w-[360px] rounded-2xl border border-gray-3 bg-white p-3 shadow-1">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ECFDF3] text-[#039855]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.6663 5L7.49967 14.1667L3.33301 10"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-dark">
                    {t("cart.toastAddedTitle")}
                  </p>
                  <p className="mt-0.5 truncate text-sm text-dark-4">
                    {item.title}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => toast.dismiss(toastItem.id)}
                  aria-label={t("common.close")}
                  className="text-dark-4 transition hover:text-dark"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="mt-3 flex items-center gap-3 rounded-xl bg-gray-1 p-2.5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white">
                  <Image
                    src={imageSrc}
                    alt={item.title}
                    width={56}
                    height={56}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs text-dark-4">
                    {t("cart.toastQuantity", { count: item.quantity })}
                  </p>
                  <p className="mt-1 font-semibold text-dark">
                    {formatPrice(item.discountedPrice * item.quantity)}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <Link
                  href="/cart"
                  onClick={() => toast.dismiss(toastItem.id)}
                  className="inline-flex rounded-lg bg-blue px-3.5 py-2 text-sm font-medium text-white transition hover:bg-blue-dark"
                >
                  {t("cart.toastViewCart")}
                </Link>

                <button
                  type="button"
                  onClick={() => toast.dismiss(toastItem.id)}
                  className="inline-flex rounded-lg border border-gray-3 px-3.5 py-2 text-sm font-medium text-dark transition hover:border-dark hover:text-dark"
                >
                  {t("common.close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        duration: 3600,
      },
    );
  };
};
