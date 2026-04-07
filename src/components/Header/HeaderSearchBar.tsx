"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/i18n/provider";

type HeaderSearchBarProps = {
  variant?: "desktop" | "drawer";
  compact?: boolean;
  headerOnDark?: boolean;
  className?: string;
  onNavigate?: () => void;
};

const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="4.75" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M11.5 11.5L15.5 15.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const HeaderSearchBar = ({
  variant = "desktop",
  compact = false,
  headerOnDark = false,
  className = "",
  onNavigate,
}: HeaderSearchBarProps) => {
  const router = useRouter();
  const { t } = useI18n();
  const [searchValue, setSearchValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isDrawer = variant === "drawer";

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchValue.trim();

    if (!query) {
      return;
    }

    setIsExpanded(false);
    router.push(`/shop-with-sidebar?${new URLSearchParams({ q: query }).toString()}`);
    onNavigate?.();
  };

  useEffect(() => {
    if (!isExpanded || isDrawer) {
      return;
    }

    inputRef.current?.focus();
  }, [isDrawer, isExpanded]);

  const expandSearch = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  const handleInputBlur = () => {
    window.setTimeout(() => {
      const form = formRef.current;

      if (!form || form.contains(document.activeElement)) {
        return;
      }

      if (!searchValue.trim()) {
        setIsExpanded(false);
      }
    }, 0);
  };

  const surfaceClass = headerOnDark
    ? "border-white/10 bg-[#08111f]/42 shadow-[0_18px_38px_-24px_rgba(8,17,31,0.5)] backdrop-blur-xl"
    : "border-blue/10 bg-white shadow-[0_16px_34px_-24px_rgba(60,80,224,0.16)] backdrop-blur-xl";
  const textClass = headerOnDark ? "text-white" : "text-dark";
  const placeholderClass = headerOnDark
    ? "placeholder:text-white/45"
    : "placeholder:text-dark-4";
  const iconClass = headerOnDark ? "text-white/72" : "text-blue";
  const drawerSurfaceClass =
    "border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(245,249,255,0.9)_100%)] shadow-[0_20px_42px_-28px_rgba(15,23,42,0.18)] backdrop-blur-xl";
  const drawerInputClass =
    "border-white/50 bg-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]";
  const drawerTextClass = "text-dark";
  const drawerPlaceholderClass = "placeholder:text-dark-4";
  const desktopWidthClass = isExpanded
    ? compact
      ? "w-[236px]"
      : "w-[272px]"
    : "w-11";

  if (isDrawer) {
    return (
      <form
        onSubmit={submitSearch}
        className={`rounded-[24px] border p-3 ${drawerSurfaceClass} ${className}`}
      >
        <div className={`flex items-center gap-2.5 rounded-[18px] border px-3 py-2.5 backdrop-blur-md ${drawerInputClass}`}>
          <SearchIcon className={`shrink-0 ${iconClass}`} />
          <input
            type="search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder={t("header.searchPlaceholder")}
            aria-label={t("header.searchAria")}
            autoComplete="off"
            spellCheck={false}
            className={`min-w-0 flex-1 bg-transparent text-sm font-medium outline-none ${drawerTextClass} ${drawerPlaceholderClass}`}
          />
        </div>

        <button
          type="submit"
          className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-[18px] bg-blue px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue/90"
        >
          <SearchIcon className="text-white" />
          {t("common.go")}
        </button>
      </form>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={submitSearch}
      className={`flex h-11 items-center overflow-hidden rounded-full border transition-all duration-300 ${desktopWidthClass} ${surfaceClass} ${className}`}
    >
      <button
        type={isExpanded ? "submit" : "button"}
        onClick={isExpanded ? undefined : expandSearch}
        aria-label={t("header.searchAria")}
        className="inline-flex h-full w-11 flex-shrink-0 items-center justify-center text-blue transition-colors duration-200 hover:text-blue/80"
      >
        <SearchIcon className={iconClass} />
      </button>
      <input
        ref={inputRef}
        type="search"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder={t("header.searchPlaceholder")}
        aria-label={t("header.searchAria")}
        autoComplete="off"
        spellCheck={false}
        onBlur={handleInputBlur}
        onFocus={() => setIsExpanded(true)}
        className={`min-w-0 bg-transparent text-sm font-medium outline-none transition-all duration-300 ${
          isExpanded
            ? `flex-1 pr-4 opacity-100 ${textClass} ${placeholderClass}`
            : "w-0 flex-none opacity-0 pointer-events-none"
        }`}
      />
    </form>
  );
};

export default HeaderSearchBar;
