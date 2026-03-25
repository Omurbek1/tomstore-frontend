"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMenuData } from "./menuData";
import Dropdown from "./Dropdown";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import Image from "next/image";
import { type LocalePreference, useI18n } from "@/i18n/provider";
import type { CurrencyPreference } from "@/i18n/currency";
import { isStorefrontBlogPublic } from "@/storefront/auth";
import {
  getPhoneHref,
  getStorefrontCompanyName,
  getStorefrontSupportPhone,
  getStorefrontWhatsappPhone,
  getWhatsAppHref,
} from "@/storefront/contact";
import {
  selectCartItemsCount,
  selectCartTotalPrice,
  useAppStore,
} from "@/store/app-store";
import { useStorefrontConfigQuery } from "@/storefront/hooks";

const CartIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.5433 9.5172C15.829 9.21725 15.8174 8.74252 15.5174 8.45686C15.2175 8.17119 14.7428 8.18277 14.4571 8.48272L12.1431 10.9125L11.5433 10.2827C11.2576 9.98277 10.7829 9.97119 10.483 10.2569C10.183 10.5425 10.1714 11.0173 10.4571 11.3172L11.6 12.5172C11.7415 12.6658 11.9378 12.75 12.1431 12.75C12.3483 12.75 12.5446 12.6658 12.6862 12.5172L15.5433 9.5172Z"
      fill="#3C50E0"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.29266 2.7512C1.43005 2.36044 1.8582 2.15503 2.24896 2.29242L2.55036 2.39838C3.16689 2.61511 3.69052 2.79919 4.10261 3.00139C4.54324 3.21759 4.92109 3.48393 5.20527 3.89979C5.48725 4.31243 5.60367 4.76515 5.6574 5.26153C5.66124 5.29706 5.6648 5.33321 5.66809 5.36996L17.1203 5.36996C17.9389 5.36995 18.7735 5.36993 19.4606 5.44674C19.8103 5.48584 20.1569 5.54814 20.4634 5.65583C20.7639 5.76141 21.0942 5.93432 21.3292 6.23974C21.711 6.73613 21.7777 7.31414 21.7416 7.90034C21.7071 8.45845 21.5686 9.15234 21.4039 9.97723L21.3935 10.0295L21.3925 10.0341L20.8836 12.5033C20.7339 13.2298 20.6079 13.841 20.4455 14.3231C20.2731 14.8346 20.0341 15.2842 19.6076 15.6318C19.1811 15.9793 18.6925 16.1226 18.1568 16.1882C17.6518 16.25 17.0278 16.25 16.2862 16.25L10.8804 16.25C9.53464 16.25 8.44479 16.25 7.58656 16.1283C6.69032 16.0012 5.93752 15.7285 5.34366 15.1022C4.79742 14.526 4.50529 13.9144 4.35897 13.0601C4.22191 12.2598 4.20828 11.2125 4.20828 9.75996V7.03832C4.20828 6.29837 4.20726 5.80316 4.16611 5.42295C4.12678 5.0596 4.05708 4.87818 3.96682 4.74609C3.87876 4.61723 3.74509 4.4968 3.44186 4.34802C3.11902 4.18961 2.68026 4.03406 2.01266 3.79934L1.75145 3.7075C1.36068 3.57012 1.15527 3.14197 1.29266 2.7512ZM5.70828 6.86996L5.70828 9.75996C5.70828 11.249 5.72628 12.1578 5.83744 12.8068C5.93933 13.4018 6.11202 13.7324 6.43219 14.0701C6.70473 14.3576 7.08235 14.5418 7.79716 14.6432C8.53783 14.7482 9.5209 14.75 10.9377 14.75H16.2406C17.0399 14.75 17.5714 14.7487 17.9746 14.6993C18.3573 14.6525 18.5348 14.571 18.66 14.469C18.7853 14.3669 18.9009 14.2095 19.024 13.8441C19.1537 13.4592 19.2623 12.9389 19.4237 12.156L19.9225 9.73591L19.9229 9.73369C20.1005 8.84376 20.217 8.2515 20.2444 7.80793C20.2704 7.38648 20.2043 7.23927 20.1429 7.15786C20.1367 7.15259 20.0931 7.11565 19.9661 7.07101C19.8107 7.01639 19.5895 6.97049 19.2939 6.93745C18.6991 6.87096 17.9454 6.86996 17.089 6.86996H5.70828Z"
      fill="#3C50E0"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.2502 19.5C5.2502 20.7426 6.25756 21.75 7.5002 21.75C8.74285 21.75 9.7502 20.7426 9.7502 19.5C9.7502 18.2573 8.74285 17.25 7.5002 17.25C6.25756 17.25 5.2502 18.2573 5.2502 19.5ZM7.5002 20.25C7.08599 20.25 6.7502 19.9142 6.7502 19.5C6.7502 19.0857 7.08599 18.75 7.5002 18.75C7.91442 18.75 8.2502 19.0857 8.2502 19.5C8.2502 19.9142 7.91442 20.25 7.5002 20.25Z"
      fill="#3C50E0"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.25 19.5001C14.25 20.7427 15.2574 21.7501 16.5 21.7501C17.7426 21.7501 18.75 20.7427 18.75 19.5001C18.75 18.2574 17.7426 17.2501 16.5 17.2501C15.2574 17.2501 14.25 18.2574 14.25 19.5001ZM16.5 20.2501C16.0858 20.2501 15.75 19.9143 15.75 19.5001C15.75 19.0859 16.0858 18.7501 16.5 18.7501C16.9142 18.7501 17.25 19.0859 17.25 19.5001C17.25 19.9143 16.9142 20.2501 16.5 20.2501Z"
      fill="#3C50E0"
    />
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2.25C6.61522 2.25 2.25 6.61522 2.25 12C2.25 13.7595 2.71774 15.4105 3.53509 16.8342L2.37053 20.8471C2.28167 21.1533 2.36667 21.4834 2.59117 21.708C2.81567 21.9325 3.14584 22.0175 3.45199 21.9286L7.41493 20.7786C8.80748 21.545 10.408 21.75 12 21.75C17.3848 21.75 21.75 17.3848 21.75 12C21.75 6.61522 17.3848 2.25 12 2.25ZM12 3.75C16.5563 3.75 20.25 7.44365 20.25 12C20.25 16.5563 16.5563 20.25 12 20.25C10.5489 20.25 9.09692 19.9232 7.8344 19.3138C7.66453 19.2318 7.46957 19.2153 7.28829 19.2675L4.18836 20.1666L5.09808 17.0312C5.15064 16.85 5.13427 16.6547 5.05219 16.4846C4.38666 15.1052 3.75 13.598 3.75 12C3.75 7.44365 7.44365 3.75 12 3.75Z"
      fill="#3C50E0"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.53293 7.94236C8.88868 7.42071 9.15393 7.41345 9.39993 7.40301C9.60018 7.39452 9.8283 7.39528 10.0568 7.39528C10.239 7.39528 10.5356 7.32654 10.8124 7.9911C11.102 8.68607 11.7977 10.3961 11.866 10.5341C11.9343 10.6722 11.9798 10.8349 11.8833 10.9976C11.7868 11.1603 11.7385 11.2616 11.5938 11.4284C11.4492 11.5951 11.2898 11.8015 11.1597 11.9307C11.0141 12.0754 10.8632 12.232 11.0299 12.5207C11.1967 12.8093 11.7721 13.7517 12.6209 14.508C13.7105 15.4788 14.6298 15.7794 14.9184 15.9461C15.2071 16.1129 15.3756 16.0908 15.5202 15.924C15.6649 15.7573 16.1469 15.1949 16.3154 14.9541C16.4839 14.7133 16.6523 14.7536 16.9409 14.9204C17.2296 15.0871 18.7668 15.8414 19.0796 16.0078C19.3924 16.1742 19.5999 16.2561 19.6723 16.3775C19.7446 16.4989 19.7446 17.0727 19.4132 17.7267C19.0819 18.3807 17.4703 19.02 16.8822 19.0544C16.2941 19.0889 15.7598 19.2206 13.2218 18.2189C10.6838 17.2172 9.0631 14.7688 8.93872 14.5983C8.81434 14.4278 7.34874 12.4718 7.34874 10.4497C7.34874 8.42754 8.17718 8.21137 8.53293 7.94236Z"
      fill="#3C50E0"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.7177 3.09215C5.94388 1.80121 7.9721 2.04307 8.98569 3.47665L10.2467 5.26014C11.0574 6.4068 10.9889 8.00097 10.0214 9.01965L9.7765 9.27743C9.77582 9.27921 9.7751 9.28115 9.77436 9.28323C9.76142 9.31959 9.7287 9.43538 9.7609 9.65513C9.82765 10.1107 10.1793 11.0364 11.607 12.5394C13.0391 14.0472 13.9078 14.4025 14.3103 14.4679C14.484 14.4961 14.5748 14.4716 14.6038 14.4614L15.0124 14.0312C15.8862 13.1113 17.2485 12.9301 18.347 13.5623L20.2575 14.662C21.8904 15.6019 22.2705 17.9011 20.9655 19.275L19.545 20.7705C19.1016 21.2373 18.497 21.6358 17.75 21.7095C15.9261 21.8895 11.701 21.655 7.27161 16.9917C3.13844 12.6403 2.35326 8.85538 2.25401 7.00615L2.92011 6.9704L2.25401 7.00615C2.20497 6.09248 2.61224 5.30879 3.1481 4.74464L4.7177 3.09215ZM7.7609 4.34262C7.24855 3.61797 6.32812 3.57473 5.80528 4.12518L4.23568 5.77767C3.90429 6.12656 3.73042 6.52646 3.75185 6.92576C3.83289 8.43558 4.48307 11.8779 8.35919 15.9587C12.4234 20.2375 16.1676 20.3584 17.6026 20.2167C17.8864 20.1887 18.1783 20.0313 18.4574 19.7375L19.8779 18.2419C20.4907 17.5968 20.3301 16.4345 19.5092 15.962L17.5987 14.8624C17.086 14.5673 16.4854 14.6584 16.1 15.0642L15.6445 15.5437L15.1174 15.043C15.6445 15.5438 15.6438 15.5445 15.6432 15.5452L15.6417 15.5467L15.6388 15.5498L15.6324 15.5562L15.6181 15.5704C15.6078 15.5803 15.5959 15.5913 15.5825 15.6031C15.5556 15.6266 15.5223 15.6535 15.4824 15.6819C15.4022 15.7387 15.2955 15.8012 15.1606 15.8544C14.8846 15.9633 14.5201 16.0216 14.0699 15.9485C13.1923 15.806 12.0422 15.1757 10.5194 13.5724C8.99202 11.9644 8.40746 10.7647 8.27675 9.87259C8.21022 9.41852 8.26346 9.05492 8.36116 8.78035C8.40921 8.64533 8.46594 8.53766 8.51826 8.4559C8.54435 8.41514 8.56922 8.381 8.5912 8.35322C8.60219 8.33933 8.61246 8.32703 8.62182 8.31627L8.63514 8.30129L8.64125 8.29465L8.64415 8.29154L8.64556 8.29004C8.64625 8.28931 8.64694 8.28859 9.17861 8.79357L8.64695 8.28858L8.93376 7.98662C9.3793 7.51755 9.44403 6.72317 9.02189 6.1261L7.7609 4.34262Z"
      fill="#3C50E0"
    />
  </svg>
);

const Header = () => {
  const pathname = usePathname();
  const {
    localePreference,
    setLocalePreference,
    currencyPreference,
    setCurrencyPreference,
    formatPrice,
    t,
  } = useI18n();
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [supplementaryNavHidden, setSupplementaryNavHidden] = useState(false);
  const [headerContrastMode, setHeaderContrastMode] = useState<
    "default" | "dark"
  >("default");
  const lastScrollYRef = useRef(0);
  const headerRef = useRef<HTMLElement>(null);
  const { openCartModal } = useCartModalContext();
  const { data: storefrontConfig } = useStorefrontConfigQuery();
  const companyName = getStorefrontCompanyName(storefrontConfig);
  const companyLogoUrl = storefrontConfig?.companyLogoUrl;
  const supportPhone = getStorefrontSupportPhone(storefrontConfig);
  const whatsappPhone = getStorefrontWhatsappPhone(storefrontConfig);
  const cartItemsCount = useAppStore(selectCartItemsCount);
  const totalPrice = useAppStore(selectCartTotalPrice);
  const compactHeader = stickyMenu;
  const headerOnDark =
    !stickyMenu && headerContrastMode === "dark" && !navigationOpen;
  const surfaceClass = headerOnDark
    ? "border-white/10 bg-[#0b1730]/46 shadow-[0_24px_60px_-38px_rgba(8,17,31,0.92)] backdrop-blur-xl"
    : "border-blue/10 bg-[linear-gradient(180deg,rgba(251,253,255,0.9)_0%,rgba(239,246,255,0.84)_100%)] shadow-[0_22px_44px_-32px_rgba(60,80,224,0.18)]";
  const mobileSurfaceClass = headerOnDark
    ? "border-white/10 bg-[#0b1730]/50 shadow-[0_22px_40px_-30px_rgba(8,17,31,0.88)] backdrop-blur-xl"
    : "border-blue/10 bg-[linear-gradient(180deg,rgba(251,253,255,0.94)_0%,rgba(239,246,255,0.88)_100%)] shadow-[0_22px_40px_-30px_rgba(60,80,224,0.2)]";
  const primaryTextClass = headerOnDark ? "text-white" : "text-dark";
  const secondaryTextClass = headerOnDark ? "text-white/68" : "text-dark-4";

  const handleOpenCartModal = () => {
    openCartModal();
  };

  useEffect(() => {
    const handleScrollState = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollYRef.current;

      setStickyMenu(currentScrollY >= 80);

      if (navigationOpen) {
        setSupplementaryNavHidden(false);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      if (currentScrollY < 40) {
        setSupplementaryNavHidden(false);
      } else if (scrollDelta > 12 && currentScrollY > 120) {
        setSupplementaryNavHidden(true);
      } else if (scrollDelta < -12) {
        setSupplementaryNavHidden(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    lastScrollYRef.current = window.scrollY;
    handleScrollState();

    window.addEventListener("scroll", handleScrollState, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollState);
  }, [navigationOpen]);

  useEffect(() => {
    setNavigationOpen(false);
    setSupplementaryNavHidden(false);
  }, [pathname]);
  const showBlogMenu = isStorefrontBlogPublic(storefrontConfig);
  const menuData = getMenuData(t, {
    showBlogMenu,
  });
  const closeNavigation = () => {
    setNavigationOpen(false);
  };
  const toggleNavigation = () => {
    setNavigationOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!navigationOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
    };
  }, [navigationOpen]);

  useEffect(() => {
    if (!navigationOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeNavigation();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigationOpen]);

  useEffect(() => {
    const updateHeaderContrast = () => {
      if (stickyMenu || navigationOpen) {
        setHeaderContrastMode("default");
        return;
      }

      const headerBottom = headerRef.current?.getBoundingClientRect().bottom ?? 0;
      const activeContrastSection = Array.from(
        document.querySelectorAll<HTMLElement>("[data-header-contrast]"),
      ).find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= headerBottom && rect.bottom >= 0;
      });

      setHeaderContrastMode(
        activeContrastSection?.dataset.headerContrast === "dark"
          ? "dark"
          : "default",
      );
    };

    updateHeaderContrast();

    window.addEventListener("scroll", updateHeaderContrast, { passive: true });
    window.addEventListener("resize", updateHeaderContrast);

    return () => {
      window.removeEventListener("scroll", updateHeaderContrast);
      window.removeEventListener("resize", updateHeaderContrast);
    };
  }, [navigationOpen, pathname, stickyMenu]);

  return (
    <header
      ref={headerRef}
      className={`fixed left-0 top-0 z-9999 w-full transition-all duration-300 ease-in-out ${
        headerOnDark
          ? "border-b border-white/10 bg-[#0b1730]/10 backdrop-blur-md"
          : "border-b border-blue/10 bg-[rgba(244,248,255,0.84)] backdrop-blur-xl"
      } ${
        stickyMenu ? "shadow-[0_18px_50px_-34px_rgba(15,23,42,0.35)]" : ""
      }`}
    >
      <div className="max-w-[1170px] mx-auto px-4 sm:px-7.5 xl:px-0">
        <div
          className={`xl:hidden ${compactHeader ? "space-y-1.5 py-2" : "space-y-2.5 py-4"}`}
        >
          <div className={`flex items-center ${compactHeader ? "gap-2" : "gap-2.5"}`}>
            <Link
              className={`flex min-w-0 flex-1 items-center overflow-hidden transition-all duration-300 ${mobileSurfaceClass} ${
                compactHeader
                  ? "h-9 gap-2 rounded-[18px] px-2.5"
                  : "h-11 gap-3 rounded-[24px] px-3.5"
              }`}
              href="/"
            >
              {companyLogoUrl ? (
                <img
                  src={companyLogoUrl}
                  alt={companyName}
                  className={`w-auto flex-shrink-0 object-contain transition-all duration-300 ${
                    compactHeader ? "h-6 max-w-[62px]" : "h-8 max-w-[84px]"
                  }`}
                />
              ) : (
                <Image
                  src="/images/logo/logo.svg"
                  alt={companyName}
                  width={164}
                  height={36}
                  className={`w-auto flex-shrink-0 object-contain transition-all duration-300 ${
                    compactHeader ? "h-6 max-w-[62px]" : "h-8 max-w-[84px]"
                  }`}
                />
              )}
              <span
                className={`min-w-0 truncate font-semibold uppercase transition-all duration-300 ${primaryTextClass} ${
                  compactHeader
                    ? "text-[11px] leading-none tracking-[0.1em]"
                    : "text-sm leading-none tracking-[0.18em]"
                }`}
              >
                {companyName}
              </span>
            </Link>

            <button
              onClick={handleOpenCartModal}
              aria-label={t("header.cart")}
              className={`relative inline-flex flex-shrink-0 items-center justify-center transition-all duration-300 ${mobileSurfaceClass} ${
                compactHeader
                  ? "h-9 w-9 rounded-[18px] [&_svg]:scale-[0.9]"
                  : "h-11 w-11 rounded-[24px]"
              }`}
            >
              <CartIcon />
              <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-blue px-1 text-[11px] font-medium text-white">
                {cartItemsCount}
              </span>
            </button>

            <button
              type="button"
              aria-label={navigationOpen ? t("common.close") : t("header.toggleAria")}
              aria-expanded={navigationOpen}
              className={`flex flex-shrink-0 items-center justify-center transition-all duration-300 ${mobileSurfaceClass} ${
                compactHeader
                  ? "h-9 w-9 rounded-[18px]"
                  : "h-11 w-11 rounded-[24px]"
              }`}
              onClick={toggleNavigation}
            >
              <span
                className={`relative block cursor-pointer transition-all duration-300 ${
                  compactHeader ? "h-5 w-5" : "h-5.5 w-5.5"
                }`}
              >
                <span className="du-block absolute right-0 w-full h-full">
                  <span
                    className={`block relative top-0 left-0 rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-[0] ${
                      headerOnDark ? "bg-white" : "bg-dark"
                    } ${
                      !navigationOpen && "!w-full delay-300"
                    }`}
                  ></span>
                  <span
                    className={`block relative top-0 left-0 rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-150 ${
                      headerOnDark ? "bg-white" : "bg-dark"
                    } ${
                      !navigationOpen && "!w-full delay-400"
                    }`}
                  ></span>
                  <span
                    className={`block relative top-0 left-0 rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-200 ${
                      headerOnDark ? "bg-white" : "bg-dark"
                    } ${
                      !navigationOpen && "!w-full delay-500"
                    }`}
                  ></span>
                </span>

                <span className="block absolute right-0 w-full h-full rotate-45">
                  <span
                    className={`block rounded-sm ease-in-out duration-200 delay-300 absolute left-2.5 top-0 w-0.5 h-full ${
                      headerOnDark ? "bg-white" : "bg-dark"
                    } ${
                      !navigationOpen && "!h-0 delay-[0] "
                    }`}
                  ></span>
                  <span
                    className={`block rounded-sm ease-in-out duration-200 delay-400 absolute left-0 top-2.5 w-full h-0.5 ${
                      headerOnDark ? "bg-white" : "bg-dark"
                    } ${
                      !navigationOpen && "!h-0 dealy-200"
                    }`}
                  ></span>
                </span>
              </span>
            </button>
          </div>

          <div
            className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
              supplementaryNavHidden
                ? "grid-rows-[0fr] opacity-0 -translate-y-2"
                : "grid-rows-[1fr] opacity-100 translate-y-0"
            }`}
          >
            <div className="overflow-hidden">
              {supportPhone ? (
                <a
                  href={getPhoneHref(supportPhone)}
                  className={`flex items-center justify-between transition-all duration-300 ${mobileSurfaceClass} ${
                    compactHeader
                      ? "h-9 rounded-[18px] px-3"
                      : "h-11 rounded-[24px] px-4"
                  }`}
                >
                  <span
                    className={`font-medium uppercase transition-all duration-300 ${secondaryTextClass} ${
                      compactHeader ? "text-[10px] tracking-[0.12em]" : "text-xs tracking-[0.18em]"
                    }`}
                  >
                    {t("header.support")}
                  </span>
                  <span
                    className={`font-semibold transition-all duration-300 ${primaryTextClass} ${
                      compactHeader ? "text-[13px]" : "text-sm"
                    }`}
                  >
                    {supportPhone}
                  </span>
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <div
          className={`fixed inset-0 z-[9998] xl:hidden ${
            navigationOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <button
            type="button"
            aria-label={t("common.close")}
            onClick={closeNavigation}
            className={`absolute inset-0 bg-dark/45 backdrop-blur-[2px] transition-opacity duration-300 ${
              navigationOpen ? "opacity-100" : "opacity-0"
            }`}
          />

          <aside
            aria-hidden={!navigationOpen}
            className={`absolute right-0 top-0 flex h-dvh w-full max-w-[380px] flex-col border-l border-white/60 bg-[#f8fbff]/96 shadow-2 backdrop-blur-xl transition-transform duration-300 ${
              navigationOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between gap-3 border-b border-gray-3 px-4 py-4">
              <Link
                href="/"
                onClick={closeNavigation}
                className="flex min-w-0 items-center gap-3"
              >
                {companyLogoUrl ? (
                  <img
                    src={companyLogoUrl}
                    alt={companyName}
                    className="h-8 w-auto max-w-[84px] flex-shrink-0 object-contain"
                  />
                ) : (
                  <Image
                    src="/images/logo/logo.svg"
                    alt={companyName}
                    width={164}
                    height={36}
                    className="h-8 w-auto max-w-[84px] flex-shrink-0 object-contain"
                  />
                )}
                <span className="min-w-0 truncate text-sm font-semibold uppercase tracking-[0.18em] text-dark">
                  {companyName}
                </span>
              </Link>

              <button
                type="button"
                aria-label={t("common.close")}
                onClick={closeNavigation}
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[24px] border border-white/70 bg-white/80 text-dark transition-colors duration-200 hover:border-blue hover:text-blue"
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
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 no-scrollbar">
              <div className="grid grid-cols-2 gap-3">
                {whatsappPhone ? (
                  <a
                    href={getWhatsAppHref(whatsappPhone)}
                    target="_blank"
                    rel="noreferrer"
                    className={`rounded-[24px] border border-white/70 bg-white/80 px-4 py-3 shadow-[0_18px_36px_-30px_rgba(15,23,42,0.25)] ${
                      !supportPhone ? "col-span-2" : ""
                    }`}
                  >
                    <div className="mb-3 flex items-center gap-2.5">
                      <WhatsAppIcon />
                      <span className="text-xs font-medium uppercase tracking-[0.16em] text-dark-4">
                        {t("header.whatsapp")}
                      </span>
                    </div>
                    <span className="block text-sm font-semibold text-dark">
                      {whatsappPhone}
                    </span>
                  </a>
                ) : null}

                {supportPhone ? (
                  <a
                    href={getPhoneHref(supportPhone)}
                    className={`rounded-[24px] border border-white/70 bg-white/80 px-4 py-3 shadow-[0_18px_36px_-30px_rgba(15,23,42,0.25)] ${
                      !whatsappPhone ? "col-span-2" : ""
                    }`}
                  >
                    <div className="mb-3 flex items-center gap-2.5">
                      <PhoneIcon />
                      <span className="text-xs font-medium uppercase tracking-[0.16em] text-dark-4">
                        {t("header.support")}
                      </span>
                    </div>
                    <span className="block text-sm font-semibold text-dark">
                      {supportPhone}
                    </span>
                  </a>
                ) : null}

                <button
                  type="button"
                  onClick={() => {
                    closeNavigation();
                    handleOpenCartModal();
                  }}
                  className="col-span-2 rounded-[24px] border border-blue/15 bg-blue/8 px-4 py-3 text-left shadow-[0_18px_36px_-30px_rgba(60,80,224,0.32)]"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2.5">
                      <CartIcon />
                      <span className="text-xs font-medium uppercase tracking-[0.16em] text-dark-4">
                        {t("header.cart")}
                      </span>
                    </span>
                    <span className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-blue px-1.5 text-xs font-semibold text-white">
                      {cartItemsCount}
                    </span>
                  </div>
                  <span className="block text-sm font-semibold text-dark">
                    {formatPrice(totalPrice)}
                  </span>
                </button>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="rounded-[24px] border border-white/70 bg-white/80 px-3 py-2.5">
                  <span className="mb-1 block text-[11px] uppercase tracking-[0.16em] text-dark-4">
                    {t("header.language")}
                  </span>
                  <select
                    value={localePreference}
                    onChange={(event) =>
                      setLocalePreference(
                        event.target.value as LocalePreference,
                      )
                    }
                    aria-label={t("header.language")}
                    className="w-full bg-transparent text-sm font-medium text-dark outline-none"
                  >
                    <option value="auto">{t("header.languageSystem")}</option>
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
                    <option value="ky">Кыргызча</option>
                  </select>
                </label>

                <label className="rounded-[24px] border border-white/70 bg-white/80 px-3 py-2.5">
                  <span className="mb-1 block text-[11px] uppercase tracking-[0.16em] text-dark-4">
                    {t("header.currency")}
                  </span>
                  <select
                    value={currencyPreference}
                    onChange={(event) =>
                      setCurrencyPreference(
                        event.target.value as CurrencyPreference,
                      )
                    }
                    aria-label={t("header.currency")}
                    className="w-full bg-transparent text-sm font-medium text-dark outline-none"
                  >
                    <option value="default">
                      {t("header.currencyDefault")}
                    </option>
                    <option value="KGS">{t("header.currencyKgs")}</option>
                    <option value="USD">{t("header.currencyUsd")}</option>
                  </select>
                </label>
              </div>

              <nav className="mt-4 border-t border-gray-3 pt-4">
                <ul className="flex flex-col gap-2.5">
                  {menuData.map((menuItem, i) =>
                    menuItem.submenu ? (
                      <Dropdown
                        key={i}
                        menuItem={menuItem}
                        stickyMenu={stickyMenu}
                        mobile
                        onNavigate={closeNavigation}
                      />
                    ) : (
                      <li key={i}>
                        <Link
                          href={menuItem.path}
                          onClick={closeNavigation}
                          className={`flex rounded-[20px] bg-white/80 px-4 py-3 text-base font-medium shadow-[0_18px_36px_-30px_rgba(15,23,42,0.2)] ${
                            pathname === menuItem.path
                              ? "text-blue"
                              : "text-dark"
                          }`}
                        >
                          {menuItem.title}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </nav>
            </div>
          </aside>
        </div>

        <div
          className={`hidden xl:flex xl:flex-row xl:flex-wrap xl:items-center xl:justify-between 2xl:flex-nowrap ${
            compactHeader ? "py-1.5" : "py-5"
          }`}
        >
          {/* <!-- header top left --> */}
          <div
            className={`flex w-full min-w-0 flex-1 flex-row items-center transition-all duration-300 ${
              compactHeader ? "gap-4" : "gap-6"
            }`}
          >
            <Link
              className={`flex w-auto min-w-0 items-center rounded-full transition-all duration-300 ${surfaceClass} ${
                compactHeader
                  ? "max-w-[280px] gap-2 px-3 py-2 2xl:max-w-[320px]"
                  : "max-w-[360px] gap-3 px-4 py-3 2xl:max-w-[400px]"
              }`}
              href="/"
            >
              {companyLogoUrl ? (
                <img
                  src={companyLogoUrl}
                  alt={companyName}
                  className={`w-auto flex-shrink-0 object-contain transition-all duration-300 ${
                    compactHeader
                      ? "h-7 max-w-[104px] sm:max-w-[124px]"
                      : "h-9 max-w-[140px] sm:max-w-[180px]"
                  }`}
                />
              ) : (
                <Image
                  src="/images/logo/logo.svg"
                  alt={companyName}
                  width={164}
                  height={36}
                  className={`h-auto w-auto flex-shrink-0 transition-all duration-300 ${
                    compactHeader
                      ? "max-w-[104px] sm:max-w-[124px]"
                      : "max-w-[140px] sm:max-w-[164px]"
                  }`}
                />
              )}
              <span
                className={`min-w-0 truncate font-semibold uppercase transition-all duration-300 ${primaryTextClass} ${
                  compactHeader
                    ? "text-[11px] tracking-[0.14em] sm:text-[12px]"
                    : "text-sm tracking-[0.28em] sm:text-base"
                }`}
              >
                {companyName}
              </span>
            </Link>
          </div>

          {/* <!-- header top right --> */}
          <div
            className={`flex w-full flex-col sm:flex-row sm:flex-wrap sm:items-stretch sm:justify-between xl:w-auto xl:flex-none xl:justify-end 2xl:flex-nowrap transition-all duration-300 ${
              compactHeader ? "gap-3 xl:gap-3.5 2xl:gap-4" : "gap-4 xl:gap-4 2xl:gap-5"
            }`}
          >
            <div
              className={`hidden min-w-0 items-center xl:flex xl:max-w-[240px] transition-all duration-300 rounded-full ${surfaceClass} ${
                compactHeader ? "h-11 gap-2 px-3" : "h-[52px] gap-3 px-4"
              }`}
            >
              <svg
                className="shrink-0"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.7177 3.09215C5.94388 1.80121 7.9721 2.04307 8.98569 3.47665L10.2467 5.26014C11.0574 6.4068 10.9889 8.00097 10.0214 9.01965L9.7765 9.27743C9.77582 9.27921 9.7751 9.28115 9.77436 9.28323C9.76142 9.31959 9.7287 9.43538 9.7609 9.65513C9.82765 10.1107 10.1793 11.0364 11.607 12.5394C13.0391 14.0472 13.9078 14.4025 14.3103 14.4679C14.484 14.4961 14.5748 14.4716 14.6038 14.4614L15.0124 14.0312C15.8862 13.1113 17.2485 12.9301 18.347 13.5623L20.2575 14.662C21.8904 15.6019 22.2705 17.9011 20.9655 19.275L19.545 20.7705C19.1016 21.2373 18.497 21.6358 17.75 21.7095C15.9261 21.8895 11.701 21.655 7.27161 16.9917C3.13844 12.6403 2.35326 8.85538 2.25401 7.00615L2.92011 6.9704L2.25401 7.00615C2.20497 6.09248 2.61224 5.30879 3.1481 4.74464L4.7177 3.09215ZM7.7609 4.34262C7.24855 3.61797 6.32812 3.57473 5.80528 4.12518L4.23568 5.77767C3.90429 6.12656 3.73042 6.52646 3.75185 6.92576C3.83289 8.43558 4.48307 11.8779 8.35919 15.9587C12.4234 20.2375 16.1676 20.3584 17.6026 20.2167C17.8864 20.1887 18.1783 20.0313 18.4574 19.7375L19.8779 18.2419C20.4907 17.5968 20.3301 16.4345 19.5092 15.962L17.5987 14.8624C17.086 14.5673 16.4854 14.6584 16.1 15.0642L15.6445 15.5437L15.1174 15.043C15.6445 15.5438 15.6438 15.5445 15.6432 15.5452L15.6417 15.5467L15.6388 15.5498L15.6324 15.5562L15.6181 15.5704C15.6078 15.5803 15.5959 15.5913 15.5825 15.6031C15.5556 15.6266 15.5223 15.6535 15.4824 15.6819C15.4022 15.7387 15.2955 15.8012 15.1606 15.8544C14.8846 15.9633 14.5201 16.0216 14.0699 15.9485C13.1923 15.806 12.0422 15.1757 10.5194 13.5724C8.99202 11.9644 8.40746 10.7647 8.27675 9.87259C8.21022 9.41852 8.26346 9.05492 8.36116 8.78035C8.40921 8.64533 8.46594 8.53766 8.51826 8.4559C8.54435 8.41514 8.56922 8.381 8.5912 8.35322C8.60219 8.33933 8.61246 8.32703 8.62182 8.31627L8.63514 8.30129L8.64125 8.29465L8.64415 8.29154L8.64556 8.29004C8.64625 8.28931 8.64694 8.28859 9.17861 8.79357L8.64695 8.28858L8.93376 7.98662C9.3793 7.51755 9.44403 6.72317 9.02189 6.1261L7.7609 4.34262Z"
                  fill="#3C50E0"
                />
                <path
                  d="M13.2595 1.88008C13.3257 1.47119 13.7122 1.19381 14.1211 1.26001C14.1464 1.26485 14.2279 1.28007 14.2705 1.28958C14.3559 1.30858 14.4749 1.33784 14.6233 1.38106C14.9201 1.46751 15.3347 1.60991 15.8323 1.83805C16.8286 2.2948 18.1544 3.09381 19.5302 4.46961C20.906 5.84541 21.705 7.17122 22.1617 8.1675C22.3899 8.66511 22.5323 9.07972 22.6187 9.3765C22.6619 9.5249 22.6912 9.64393 22.7102 9.72926C22.7197 9.77193 22.7267 9.80619 22.7315 9.8315L22.7373 9.86269C22.8034 10.2716 22.5286 10.6741 22.1197 10.7403C21.712 10.8063 21.3279 10.5303 21.2601 10.1233C21.258 10.1124 21.2522 10.083 21.2461 10.0553C21.2337 9.99994 21.2124 9.91212 21.1786 9.79597C21.1109 9.56363 20.9934 9.2183 20.7982 8.79262C20.4084 7.94232 19.7074 6.76813 18.4695 5.53027C17.2317 4.2924 16.0575 3.59141 15.2072 3.20158C14.7815 3.00642 14.4362 2.88889 14.2038 2.82122C14.0877 2.78739 13.9417 2.75387 13.8863 2.74154C13.4793 2.67372 13.1935 2.2878 13.2595 1.88008Z"
                  fill="#3C50E0"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.4861 5.32955C13.5999 4.93128 14.015 4.70066 14.4133 4.81445L14.2072 5.53559C14.4133 4.81445 14.4136 4.81455 14.414 4.81465L14.4147 4.81486L14.4162 4.81531L14.4196 4.81628L14.4273 4.81859L14.4471 4.82476C14.4622 4.82958 14.481 4.83586 14.5035 4.84383C14.5484 4.85976 14.6077 4.88243 14.6805 4.91363C14.8262 4.97607 15.0253 5.07249 15.2698 5.2172C15.7593 5.50688 16.4275 5.98806 17.2124 6.77303C17.9974 7.558 18.4786 8.22619 18.7683 8.71565C18.913 8.96016 19.0094 9.15923 19.0718 9.30491C19.103 9.37772 19.1257 9.43708 19.1416 9.48199C19.1496 9.50444 19.1559 9.52327 19.1607 9.53835L19.1669 9.55814L19.1692 9.56589L19.1702 9.56922L19.1706 9.57075L19.1708 9.57148C19.1709 9.57184 19.171 9.57219 18.4499 9.77823L19.171 9.57219C19.2848 9.97047 19.0542 10.3856 18.6559 10.4994C18.261 10.6122 17.8496 10.3864 17.7317 9.99438L17.728 9.9836C17.7227 9.96858 17.7116 9.93899 17.6931 9.89579C17.6561 9.80946 17.589 9.66823 17.4774 9.47963C17.2544 9.10289 16.8517 8.53364 16.1518 7.83369C15.4518 7.13374 14.8826 6.73103 14.5058 6.50806C14.3172 6.39645 14.176 6.32935 14.0897 6.29235C14.0465 6.27383 14.0169 6.2628 14.0019 6.25747L13.9911 6.25377C13.599 6.13589 13.3733 5.72445 13.4861 5.32955Z"
                  fill="#3C50E0"
                />
              </svg>

              <div className="min-w-0 leading-none">
                      <span className={`block text-2xs uppercase ${secondaryTextClass}`}>
                        {t("header.support")}
                      </span>
                      {supportPhone ? (
                        <a
                          href={getPhoneHref(supportPhone)}
                          className={`mt-1 block break-words font-medium leading-none text-custom-sm ${primaryTextClass} ${headerOnDark ? "hover:text-white/75" : "hover:text-blue"}`}
                        >
                          {supportPhone}
                        </a>
                ) : null}
              </div>
            </div>

            {/* <!-- divider --> */}
            <span className="hidden xl:block w-px h-7.5 bg-gray-4"></span>

            <div
              className={`flex w-full flex-wrap items-center justify-between sm:w-auto sm:justify-end transition-all duration-300 ${
                compactHeader ? "gap-3 sm:gap-4" : "gap-4 sm:gap-5"
              }`}
            >
              <div
                className={`flex flex-wrap items-center transition-all duration-300 ${
                  compactHeader ? "gap-3 sm:gap-4" : "gap-4 sm:gap-5"
                }`}
              >
                <label
                  className={`flex items-center gap-2 rounded-full transition-all duration-300 ${surfaceClass} ${
                    compactHeader ? "h-11 px-2.5" : "h-[52px] px-3.5"
                  }`}
                >
                
                  <select
                    value={localePreference}
                    onChange={(event) =>
                      setLocalePreference(
                        event.target.value as LocalePreference,
                      )
                    }
                    aria-label={t("header.language")}
                    className={`h-full bg-transparent font-medium outline-none transition-all duration-300 ${primaryTextClass} ${
                      compactHeader ? "min-w-[92px] text-xs" : "min-w-[112px] text-custom-sm"
                    }`}
                  >
                    <option value="auto">{t("header.languageSystem")}</option>
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
                    <option value="ky">Кыргызча</option>
                  </select>
                </label>

                <label
                  className={`flex items-center gap-2 rounded-full transition-all duration-300 ${surfaceClass} ${
                    compactHeader ? "h-11 px-2.5" : "h-[52px] px-3.5"
                  }`}
                >
                
                  <select
                    value={currencyPreference}
                    onChange={(event) =>
                      setCurrencyPreference(
                        event.target.value as CurrencyPreference,
                      )
                    }
                    aria-label={t("header.currency")}
                    className={`h-full bg-transparent font-medium outline-none transition-all duration-300 ${primaryTextClass} ${
                      compactHeader ? "min-w-[90px] text-xs" : "min-w-[110px] text-custom-sm"
                    }`}
                  >
                    <option value="default">{t("header.currencyDefault")}</option>
                    <option value="KGS">{t("header.currencyKgs")}</option>
                    <option value="USD">{t("header.currencyUsd")}</option>
                  </select>
                </label>

                {whatsappPhone ? (
                  <a
                    href={getWhatsAppHref(whatsappPhone)}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center rounded-full transition-all duration-300 ${surfaceClass} ${
                      compactHeader ? "h-11 gap-2 px-3" : "h-[52px] gap-2.5 px-4"
                    }`}
                  >
                    <WhatsAppIcon />
                    <div className="leading-none">
                      <span className={`block text-2xs uppercase ${secondaryTextClass}`}>
                        {t("header.whatsapp")}
                      </span>
                      <p className={`mt-1 font-medium leading-none text-custom-sm ${primaryTextClass}`}>
                        {whatsappPhone}
                      </p>
                    </div>
                  </a>
                ) : null}

                <button
                  onClick={handleOpenCartModal}
                  className={`flex items-center rounded-full transition-all duration-300 ${surfaceClass} ${
                    compactHeader ? "h-11 gap-2 px-3" : "h-[52px] gap-2.5 px-4"
                  }`}
                >
                  <span className="inline-block relative">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.5433 9.5172C15.829 9.21725 15.8174 8.74252 15.5174 8.45686C15.2175 8.17119 14.7428 8.18277 14.4571 8.48272L12.1431 10.9125L11.5433 10.2827C11.2576 9.98277 10.7829 9.97119 10.483 10.2569C10.183 10.5425 10.1714 11.0173 10.4571 11.3172L11.6 12.5172C11.7415 12.6658 11.9378 12.75 12.1431 12.75C12.3483 12.75 12.5446 12.6658 12.6862 12.5172L15.5433 9.5172Z"
                        fill="#3C50E0"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.29266 2.7512C1.43005 2.36044 1.8582 2.15503 2.24896 2.29242L2.55036 2.39838C3.16689 2.61511 3.69052 2.79919 4.10261 3.00139C4.54324 3.21759 4.92109 3.48393 5.20527 3.89979C5.48725 4.31243 5.60367 4.76515 5.6574 5.26153C5.66124 5.29706 5.6648 5.33321 5.66809 5.36996L17.1203 5.36996C17.9389 5.36995 18.7735 5.36993 19.4606 5.44674C19.8103 5.48584 20.1569 5.54814 20.4634 5.65583C20.7639 5.76141 21.0942 5.93432 21.3292 6.23974C21.711 6.73613 21.7777 7.31414 21.7416 7.90034C21.7071 8.45845 21.5686 9.15234 21.4039 9.97723L21.3935 10.0295L21.3925 10.0341L20.8836 12.5033C20.7339 13.2298 20.6079 13.841 20.4455 14.3231C20.2731 14.8346 20.0341 15.2842 19.6076 15.6318C19.1811 15.9793 18.6925 16.1226 18.1568 16.1882C17.6518 16.25 17.0278 16.25 16.2862 16.25L10.8804 16.25C9.53464 16.25 8.44479 16.25 7.58656 16.1283C6.69032 16.0012 5.93752 15.7285 5.34366 15.1022C4.79742 14.526 4.50529 13.9144 4.35897 13.0601C4.22191 12.2598 4.20828 11.2125 4.20828 9.75996V7.03832C4.20828 6.29837 4.20726 5.80316 4.16611 5.42295C4.12678 5.0596 4.05708 4.87818 3.96682 4.74609C3.87876 4.61723 3.74509 4.4968 3.44186 4.34802C3.11902 4.18961 2.68026 4.03406 2.01266 3.79934L1.75145 3.7075C1.36068 3.57012 1.15527 3.14197 1.29266 2.7512ZM5.70828 6.86996L5.70828 9.75996C5.70828 11.249 5.72628 12.1578 5.83744 12.8068C5.93933 13.4018 6.11202 13.7324 6.43219 14.0701C6.70473 14.3576 7.08235 14.5418 7.79716 14.6432C8.53783 14.7482 9.5209 14.75 10.9377 14.75H16.2406C17.0399 14.75 17.5714 14.7487 17.9746 14.6993C18.3573 14.6525 18.5348 14.571 18.66 14.469C18.7853 14.3669 18.9009 14.2095 19.024 13.8441C19.1537 13.4592 19.2623 12.9389 19.4237 12.156L19.9225 9.73591L19.9229 9.73369C20.1005 8.84376 20.217 8.2515 20.2444 7.80793C20.2704 7.38648 20.2043 7.23927 20.1429 7.15786C20.1367 7.15259 20.0931 7.11565 19.9661 7.07101C19.8107 7.01639 19.5895 6.97049 19.2939 6.93745C18.6991 6.87096 17.9454 6.86996 17.089 6.86996H5.70828Z"
                        fill="#3C50E0"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.2502 19.5C5.2502 20.7426 6.25756 21.75 7.5002 21.75C8.74285 21.75 9.7502 20.7426 9.7502 19.5C9.7502 18.2573 8.74285 17.25 7.5002 17.25C6.25756 17.25 5.2502 18.2573 5.2502 19.5ZM7.5002 20.25C7.08599 20.25 6.7502 19.9142 6.7502 19.5C6.7502 19.0857 7.08599 18.75 7.5002 18.75C7.91442 18.75 8.2502 19.0857 8.2502 19.5C8.2502 19.9142 7.91442 20.25 7.5002 20.25Z"
                        fill="#3C50E0"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.25 19.5001C14.25 20.7427 15.2574 21.7501 16.5 21.7501C17.7426 21.7501 18.75 20.7427 18.75 19.5001C18.75 18.2574 17.7426 17.2501 16.5 17.2501C15.2574 17.2501 14.25 18.2574 14.25 19.5001ZM16.5 20.2501C16.0858 20.2501 15.75 19.9143 15.75 19.5001C15.75 19.0859 16.0858 18.7501 16.5 18.7501C16.9142 18.7501 17.25 19.0859 17.25 19.5001C17.25 19.9143 16.9142 20.2501 16.5 20.2501Z"
                        fill="#3C50E0"
                      />
                    </svg>

                    <span className="flex items-center justify-center font-medium text-2xs absolute -right-2 -top-2.5 bg-blue w-4.5 h-4.5 rounded-full text-white">
                      {cartItemsCount}
                    </span>
                  </span>

                    <div className="leading-none">
                    <span className={`block text-2xs uppercase ${secondaryTextClass}`}>
                      {t("header.cart")}
                    </span>
                    <p className={`mt-1 font-medium leading-none text-custom-sm ${primaryTextClass}`}>
                      {formatPrice(totalPrice)}
                    </p>
                  </div>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div
        className={`hidden transition-all duration-300 ease-in-out xl:block ${
          supplementaryNavHidden
            ? "pointer-events-none max-h-0 -translate-y-3 overflow-hidden pb-0 opacity-0"
            : "max-h-[180px] translate-y-0 overflow-visible pb-4 opacity-100"
        }`}
      >
        <div className="max-w-[1170px] mx-auto px-4 sm:px-7.5 xl:px-0">
          <div
            className={`flex items-center justify-between rounded-[30px] px-6 ${
              headerOnDark
                ? "border border-white/10 bg-[#08111f]/36 shadow-[0_30px_80px_-42px_rgba(8,17,31,0.82)] backdrop-blur-xl"
                : "section-shell"
            }`}
          >
            {/* <!--=== Main Nav Start ===--> */}
            <div
              className={`w-[288px] absolute right-4 top-full xl:static xl:w-auto h-0 xl:h-auto invisible xl:visible xl:flex items-center justify-between ${
                navigationOpen &&
                `!visible bg-white shadow-lg border border-gray-3 !h-auto max-h-[400px] overflow-y-scroll rounded-md p-5`
              }`}
            >
              {/* <!-- Main Nav Start --> */}
              <nav>
                <ul className="flex xl:items-center flex-col xl:flex-row gap-5 xl:gap-6">
                  {menuData.map((menuItem, i) =>
                    menuItem.submenu ? (
                      <Dropdown
                        key={i}
                        menuItem={menuItem}
                        stickyMenu={stickyMenu}
                        darkMode={headerOnDark}
                        onNavigate={closeNavigation}
                      />
                    ) : (
                      <li
                        key={i}
                    className="group relative before:absolute before:left-0 before:top-0 before:h-[3px] before:w-0 before:rounded-b-[3px] before:bg-blue before:duration-200 before:ease-out hover:before:w-full"
                      >
                        <Link
                          href={menuItem.path}
                          className={`text-custom-sm font-medium flex ${
                            pathname === menuItem.path
                              ? "text-blue"
                              : headerOnDark
                                ? "text-white hover:text-white/75"
                                : "text-dark hover:text-blue"
                          } ${stickyMenu ? "xl:py-4" : "xl:py-5"}`}
                        >
                          {menuItem.title}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </nav>
              {/* //   <!-- Main Nav End --> */}
            </div>
            {/* // <!--=== Main Nav End ===--> */}

            {/* // <!--=== Nav Right Start ===--> */}
            <div className="hidden xl:block">
              <ul className="flex items-center gap-5.5">
                <li className="py-4">
                  <a
                    href="#"
                    className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 font-medium text-custom-sm transition-colors duration-200 ${
                      headerOnDark
                        ? "bg-[#08111f]/42 text-white hover:text-white/75"
                        : "bg-white text-dark hover:text-blue"
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
                        d="M2.45313 7.55556H1.70313V7.55556L2.45313 7.55556ZM2.45313 8.66667L1.92488 9.19908C2.21729 9.4892 2.68896 9.4892 2.98137 9.19908L2.45313 8.66667ZM4.10124 8.08797C4.39528 7.79623 4.39715 7.32135 4.10541 7.02731C3.81367 6.73327 3.3388 6.73141 3.04476 7.02315L4.10124 8.08797ZM1.86149 7.02315C1.56745 6.73141 1.09258 6.73327 0.800843 7.02731C0.509102 7.32135 0.510968 7.79623 0.805009 8.08797L1.86149 7.02315ZM12.1973 5.05946C12.4143 5.41232 12.8762 5.52252 13.229 5.30558C13.5819 5.08865 13.6921 4.62674 13.4752 4.27388L12.1973 5.05946ZM8.0525 1.25C4.5514 1.25 1.70313 4.06755 1.70313 7.55556H3.20313C3.20313 4.90706 5.3687 2.75 8.0525 2.75V1.25ZM1.70313 7.55556L1.70313 8.66667L3.20313 8.66667L3.20313 7.55556L1.70313 7.55556ZM2.98137 9.19908L4.10124 8.08797L3.04476 7.02315L1.92488 8.13426L2.98137 9.19908ZM2.98137 8.13426L1.86149 7.02315L0.805009 8.08797L1.92488 9.19908L2.98137 8.13426ZM13.4752 4.27388C12.3603 2.46049 10.3479 1.25 8.0525 1.25V2.75C9.80904 2.75 11.346 3.67466 12.1973 5.05946L13.4752 4.27388Z"
                        fill=""
                      />
                      <path
                        d="M13.5427 7.33337L14.0699 6.79996C13.7777 6.51118 13.3076 6.51118 13.0155 6.79996L13.5427 7.33337ZM11.8913 7.91107C11.5967 8.20225 11.5939 8.67711 11.8851 8.97171C12.1763 9.26631 12.6512 9.26908 12.9458 8.9779L11.8913 7.91107ZM14.1396 8.9779C14.4342 9.26908 14.9091 9.26631 15.2003 8.97171C15.4914 8.67711 15.4887 8.20225 15.1941 7.91107L14.1396 8.9779ZM3.75812 10.9395C3.54059 10.587 3.07849 10.4776 2.72599 10.6951C2.3735 10.9127 2.26409 11.3748 2.48163 11.7273L3.75812 10.9395ZM7.9219 14.75C11.4321 14.75 14.2927 11.9352 14.2927 8.44449H12.7927C12.7927 11.0903 10.6202 13.25 7.9219 13.25V14.75ZM14.2927 8.44449V7.33337H12.7927V8.44449H14.2927ZM13.0155 6.79996L11.8913 7.91107L12.9458 8.9779L14.0699 7.86679L13.0155 6.79996ZM13.0155 7.86679L14.1396 8.9779L15.1941 7.91107L14.0699 6.79996L13.0155 7.86679ZM2.48163 11.7273C3.60082 13.5408 5.62007 14.75 7.9219 14.75V13.25C6.15627 13.25 4.61261 12.3241 3.75812 10.9395L2.48163 11.7273Z"
                        fill=""
                      />
                    </svg>
                    {t("common.recentlyViewed")}
                  </a>
                </li>

                <li className="py-4">
                  <Link
                    href="/wishlist"
                    className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 font-medium text-custom-sm transition-colors duration-200 ${
                      headerOnDark
                        ? "bg-[#08111f]/42 text-white hover:text-white/75"
                        : "bg-white text-dark hover:text-blue"
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
                        d="M5.97441 12.6073L6.43872 12.0183L5.97441 12.6073ZM7.99992 3.66709L7.45955 4.18719C7.60094 4.33408 7.79604 4.41709 7.99992 4.41709C8.2038 4.41709 8.3989 4.33408 8.54028 4.18719L7.99992 3.66709ZM10.0254 12.6073L10.4897 13.1962L10.0254 12.6073ZM6.43872 12.0183C5.41345 11.21 4.33627 10.4524 3.47904 9.48717C2.64752 8.55085 2.08325 7.47831 2.08325 6.0914H0.583252C0.583252 7.94644 1.3588 9.35867 2.35747 10.4832C3.33043 11.5788 4.57383 12.4582 5.51009 13.1962L6.43872 12.0183ZM2.08325 6.0914C2.08325 4.75102 2.84027 3.63995 3.85342 3.17683C4.81929 2.73533 6.15155 2.82823 7.45955 4.18719L8.54028 3.14699C6.84839 1.38917 4.84732 1.07324 3.22983 1.8126C1.65962 2.53035 0.583252 4.18982 0.583252 6.0914H2.08325ZM5.51009 13.1962C5.84928 13.4636 6.22932 13.7618 6.61834 13.9891C7.00711 14.2163 7.47619 14.4167 7.99992 14.4167V12.9167C7.85698 12.9167 7.65939 12.8601 7.37512 12.694C7.0911 12.5281 6.79171 12.2965 6.43872 12.0183L5.51009 13.1962ZM10.4897 13.1962C11.426 12.4582 12.6694 11.5788 13.6424 10.4832C14.641 9.35867 15.4166 7.94644 15.4166 6.0914H13.9166C13.9166 7.47831 13.3523 8.55085 12.5208 9.48717C11.6636 10.4524 10.5864 11.21 9.56112 12.0183L10.4897 13.1962ZM15.4166 6.0914C15.4166 4.18982 14.3402 2.53035 12.77 1.8126C11.1525 1.07324 9.15145 1.38917 7.45955 3.14699L8.54028 4.18719C9.84828 2.82823 11.1805 2.73533 12.1464 3.17683C13.1596 3.63995 13.9166 4.75102 13.9166 6.0914H15.4166ZM9.56112 12.0183C9.20813 12.2965 8.90874 12.5281 8.62471 12.694C8.34044 12.8601 8.14285 12.9167 7.99992 12.9167V14.4167C8.52365 14.4167 8.99273 14.2163 9.3815 13.9891C9.77052 13.7618 10.1506 13.4636 10.4897 13.1962L9.56112 12.0183Z"
                        fill=""
                      />
                    </svg>
                    {t("wishlist.title")}
                  </Link>
                </li>
              </ul>
            </div>
            {/* <!--=== Nav Right End ===--> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
