"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useI18n } from "@/i18n/provider";
import type { WishlistItem } from "@/store/app-store";

type WishlistToastMode = "added" | "removed";

export const useWishlistToast = () => {
  const { t } = useI18n();

  return (item: WishlistItem, mode: WishlistToastMode) => {
    const title =
      mode === "added"
        ? t("wishlist.toastAddedTitle")
        : t("wishlist.toastRemovedTitle");

    toast.custom(
      (toastItem) => (
        <div className="pointer-events-auto w-full max-w-[340px] rounded-2xl border border-gray-3 bg-white p-3 shadow-1">
          <div className="flex items-start gap-3">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                mode === "added"
                  ? "bg-red/10 text-red"
                  : "bg-gray-1 text-dark"
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.68689 4.68688C4.3044 5.31882 3.2916 6.82191 3.2916 8.6143C3.2916 10.4455 4.04094 11.8569 5.11517 13.0665C6.00053 14.0635 7.07229 14.8897 8.11754 15.6956C8.36579 15.8869 8.61256 16.0772 8.85497 16.2683C9.29333 16.6139 9.68436 16.9172 10.0613 17.1374C10.4384 17.3578 10.7419 17.4584 10.9999 17.4584C11.2579 17.4584 11.5615 17.3578 11.9386 17.1374C12.3155 16.9172 12.7066 16.6139 13.1449 16.2683C13.3873 16.0772 13.6341 15.8869 13.8823 15.6956C14.9276 14.8897 15.9994 14.0635 16.8847 13.0665C17.959 11.8569 18.7083 10.4455 18.7083 8.6143C18.7083 6.82191 17.6954 5.31882 16.313 4.68688C14.9699 4.07295 13.1652 4.23553 11.4502 6.01733C11.3324 6.13974 11.1698 6.20891 10.9999 6.20891C10.83 6.20891 10.6674 6.13974 10.5496 6.01733C8.83465 4.23553 7.02999 4.07295 5.68689 4.68688Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-dark">{title}</p>
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

              <div className="mt-3 flex items-center gap-2">
                <Link
                  href="/wishlist"
                  onClick={() => toast.dismiss(toastItem.id)}
                  className="inline-flex rounded-lg bg-dark px-3.5 py-2 text-sm font-medium text-white transition hover:bg-dark/90"
                >
                  {t("wishlist.toastViewWishlist")}
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
        duration: 2600,
      },
    );
  };
};
