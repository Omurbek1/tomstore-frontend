"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import ProductLabelBadges from "@/components/Common/ProductLabelBadges";
import { useI18n } from "@/i18n/provider";
import { getAvailabilityMessageKey } from "@/i18n/utils";
import { getWhatsAppHref } from "@/storefront/contact";
import {
  getStorefrontProductBrand,
  mapStorefrontProductsToProducts,
} from "@/storefront/mappers";
import type { StorefrontProductDetails } from "@/storefront/types";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { useEffect, useMemo, useRef, useState } from "react";

const ProductDetailsSectionPlaceholder = ({
  minHeightClassName,
}: {
  minHeightClassName: string;
}) => (
  <div
    className={`mt-20 animate-pulse rounded-[28px] border border-gray-3/70 bg-white/75 ${minHeightClassName}`}
  />
);

const ProductRecommendationsSection = dynamic(
  () => import("./ProductRecommendationsSection"),
  {
    loading: () => (
      <ProductDetailsSectionPlaceholder minHeightClassName="min-h-[420px]" />
    ),
  },
);

const Newsletter = dynamic(() => import("@/components/Common/Newsletter"), {
  loading: () => (
    <ProductDetailsSectionPlaceholder minHeightClassName="min-h-[220px]" />
  ),
});

type ProductDetailsViewProps = {
  categoryHref?: string;
  brandHref?: string;
  product: StorefrontProductDetails;
  whatsappPhone?: string;
};

type ShareMenuPlacement = {
  horizontal: "left" | "right";
  vertical: "bottom" | "top";
};

type StructuredProductAttributes = {
  highlights: string[];
  specs: Array<{
    name: string;
    value: string;
  }>;
  useCases: string[];
};

const GENERIC_ATTRIBUTE_NAMES = new Set([
  "характеристика",
  "характеристики",
  "feature",
  "features",
  "specification",
  "specifications",
  "мүнөздөмө",
  "мүнөздөмөлөр",
]);

const BULLET_MARKER_PATTERN = /^[\s]*[•●▪■-]\s*/;
const HIGHLIGHT_MARKER_PATTERN = /^[\s]*(✓|✔|✅)\s*/;
const LEADING_MARKER_PATTERN = /^[\s•●▪■✓✔✅-]+/;

const normalizeAttributeText = (value?: string | null) =>
  String(value || "").replace(/\s+/g, " ").trim();

const normalizeComparableText = (value: string) =>
  normalizeAttributeText(value).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");

const isGenericAttributeName = (name: string) => {
  const normalized = normalizeAttributeText(name).toLowerCase();
  return (
    GENERIC_ATTRIBUTE_NAMES.has(normalized) ||
    normalized.startsWith("характерист")
  );
};

const stripAttributeMarker = (value: string) =>
  normalizeAttributeText(value.replace(LEADING_MARKER_PATTERN, ""));

const toSentenceCaseStart = (value: string) => {
  const normalized = normalizeAttributeText(value);
  const [first = "", second = ""] = Array.from(normalized);

  if (
    first &&
    first === first.toUpperCase() &&
    second &&
    second === second.toLowerCase()
  ) {
    return `${first.toLowerCase()}${normalized.slice(first.length)}`;
  }

  return normalized;
};

const structureProductAttributes = (
  product: StorefrontProductDetails,
): StructuredProductAttributes => {
  const comparableProductName = normalizeComparableText(product.name);
  const seenSpecs = new Set<string>();
  const seenUseCases = new Set<string>();
  const seenHighlights = new Set<string>();

  return product.attributes.reduce<StructuredProductAttributes>(
    (result, attribute) => {
      const name = normalizeAttributeText(attribute.name);
      const rawValue = normalizeAttributeText(attribute.value);
      const value = stripAttributeMarker(rawValue);

      if (!name || !value) {
        return result;
      }

      const comparableValue = normalizeComparableText(value);

      if (
        comparableValue &&
        comparableProductName &&
        (comparableValue === comparableProductName ||
          comparableValue.includes(comparableProductName))
      ) {
        return result;
      }

      if (!isGenericAttributeName(name)) {
        const specKey = `${name.toLowerCase()}::${comparableValue}`;

        if (!seenSpecs.has(specKey)) {
          seenSpecs.add(specKey);
          result.specs.push({ name, value });
        }

        return result;
      }

      if (HIGHLIGHT_MARKER_PATTERN.test(rawValue)) {
        if (!seenHighlights.has(comparableValue)) {
          seenHighlights.add(comparableValue);
          result.highlights.push(value);
        }

        return result;
      }

      if (
        BULLET_MARKER_PATTERN.test(rawValue) ||
        value.length <= 56
      ) {
        if (!seenUseCases.has(comparableValue)) {
          seenUseCases.add(comparableValue);
          result.useCases.push(value);
        }

        return result;
      }

      if (!seenHighlights.has(comparableValue)) {
        seenHighlights.add(comparableValue);
        result.highlights.push(value);
      }

      return result;
    },
    {
      highlights: [],
      specs: [],
      useCases: [],
    },
  );
};

export default function ProductDetailsView({
  categoryHref,
  brandHref,
  product,
  whatsappPhone,
}: ProductDetailsViewProps) {
  const { t, formatPrice } = useI18n();
  const [shareUrl, setShareUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);
  const shareMenuDropdownRef = useRef<HTMLDivElement>(null);
  const [shareMenuPlacement, setShareMenuPlacement] =
    useState<ShareMenuPlacement>({
      horizontal: "left",
      vertical: "bottom",
    });
  const relatedProducts = useMemo(
    () => mapStorefrontProductsToProducts(product.relatedProducts),
    [product.relatedProducts],
  );
  const recommendedProducts = useMemo(
    () => mapStorefrontProductsToProducts(product.recommendedProducts),
    [product.recommendedProducts],
  );
  const productBrand = getStorefrontProductBrand(product);
  const whatsappHref = useMemo(
    () =>
      getWhatsAppHref(
        whatsappPhone,
        t("common.contactManagerWhatsappMessage", {
          product: product.name,
        }),
      ),
    [product.name, t, whatsappPhone],
  );
  const shareText = useMemo(
    () => `${product.name}. ${t("common.price")}: ${formatPrice(product.price)}`,
    [formatPrice, product.name, product.price, t],
  );
  const structuredAttributes = useMemo(
    () => structureProductAttributes(product),
    [product],
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setShareUrl(window.location.href);
  }, [product.slug]);

  useEffect(() => {
    if (!isShareMenuOpen || typeof document === "undefined") {
      return;
    }

    const updateShareMenuPlacement = () => {
      if (
        typeof window === "undefined" ||
        !shareMenuRef.current ||
        !shareMenuDropdownRef.current
      ) {
        return;
      }

      const containerRect = shareMenuRef.current.getBoundingClientRect();
      const dropdownRect = shareMenuDropdownRef.current.getBoundingClientRect();
      const viewportPadding = 12;

      const horizontal: ShareMenuPlacement["horizontal"] =
        dropdownRect.right > window.innerWidth - viewportPadding &&
        containerRect.right >= dropdownRect.width
          ? "right"
          : "left";

      const vertical: ShareMenuPlacement["vertical"] =
        dropdownRect.bottom > window.innerHeight - viewportPadding &&
        containerRect.top >= dropdownRect.height + 8
          ? "top"
          : "bottom";

      setShareMenuPlacement((current) =>
        current.horizontal === horizontal && current.vertical === vertical
          ? current
          : { horizontal, vertical },
      );
    };

    const handlePointerDown = (event: MouseEvent) => {
      if (!shareMenuRef.current?.contains(event.target as Node)) {
        setIsShareMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsShareMenuOpen(false);
      }
    };

    const frameId = window.requestAnimationFrame(updateShareMenuPlacement);

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", updateShareMenuPlacement);

    return () => {
      window.cancelAnimationFrame(frameId);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", updateShareMenuPlacement);
    };
  }, [isShareMenuOpen]);

  const handleCopyLink = async () => {
    if (!shareUrl || typeof navigator === "undefined") {
      return;
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      setIsShareMenuOpen(false);
      window.setTimeout(() => {
        setIsCopied(false);
      }, 1800);
    } catch {
      // Ignore clipboard failures for unsupported browsers.
    }
  };

  const handleNativeShare = async () => {
    if (!shareUrl || typeof navigator === "undefined") {
      return;
    }

    if (!navigator.share) {
      await handleCopyLink();
      return;
    }

    try {
      await navigator.share({
        title: product.name,
        text: shareText,
        url: shareUrl,
      });
      setIsShareMenuOpen(false);
    } catch {
      // Ignore share sheet dismissals.
    }
  };

  return (
    <main>
      <Breadcrumb title={product.name} pages={[product.category, product.name]} />

      <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,570px)_minmax(0,1fr)]">
            <div>
              <div className="rounded-lg shadow-1 bg-gray-2 p-4 sm:p-7.5 flex items-center justify-center">
                <Image
                  src={product.gallery[0] || "/images/products/product-1-sm-1.png"}
                  alt={product.name}
                  width={420}
                  height={420}
                  priority
                  sizes="(min-width: 1280px) 420px, (min-width: 1024px) 36vw, 92vw"
                  className="h-auto w-full max-w-[420px] object-contain"
                />
              </div>

              {product.gallery.length > 1 ? (
                <div className="grid grid-cols-4 gap-4 mt-6">
                  {product.gallery.slice(0, 4).map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className="rounded-lg bg-gray-2 shadow-1 p-3 flex items-center justify-center"
                    >
                      <Image
                        src={image}
                        alt={product.name}
                        width={100}
                        height={100}
                        sizes="100px"
                      />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <ProductLabelBadges labels={product.labels} />
                <span className="inline-flex rounded-full bg-gray-2 px-3 py-1 text-custom-xs">
                  {t(
                    getAvailabilityMessageKey(product.availability.status) ||
                      product.availability.label,
                  )}
                </span>
              </div>

              <h1 className="font-semibold text-2xl xl:text-heading-4 text-dark mb-4">
                {product.name}
              </h1>

              <p className="text-dark-4 mb-6">{product.shortDescription}</p>

              <div className="flex items-center gap-3 mb-6">
                <span className="font-semibold text-dark text-2xl">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && product.oldPrice > product.price ? (
                  <span className="text-dark-4 line-through text-lg">
                    {formatPrice(product.oldPrice)}
                  </span>
                ) : null}
              </div>

              <div className="mb-7.5 rounded-2xl border border-blue/10 bg-blue/5 px-4 py-3">
                <p className="text-sm font-medium text-dark">
                  {t("common.installment")}
                </p>
                <p className="mt-1 text-sm leading-6 text-dark-4">
                  {t("common.installmentManagerNote")}
                </p>
              </div>

              <div className="grid gap-3 rounded-lg bg-gray-1 p-5 mb-7.5">
                {productBrand ? (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-dark-4">{t("common.brand")}</span>
                    {brandHref ? (
                      <Link
                        href={brandHref}
                        className="text-dark font-medium transition-colors duration-200 hover:text-blue"
                      >
                        {productBrand}
                      </Link>
                    ) : (
                      <span className="text-dark font-medium">{productBrand}</span>
                    )}
                  </div>
                ) : null}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-dark-4">{t("common.category")}</span>
                  {categoryHref ? (
                    <Link
                      href={categoryHref}
                      className="text-dark font-medium transition-colors duration-200 hover:text-blue"
                    >
                      {product.category}
                    </Link>
                  ) : (
                    <span className="text-dark font-medium">{product.category}</span>
                  )}
                </div>
                {product.sku ? (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-dark-4">{t("common.sku")}</span>
                    <span className="text-dark font-medium">{product.sku}</span>
                  </div>
                ) : null}
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <Link
                  href="/shop-with-sidebar"
                  className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark"
                >
                  {t("common.backToCatalog")}
                </Link>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex font-medium text-dark bg-gray-1 py-3 px-7 rounded-md ease-out duration-200 hover:bg-dark hover:text-white"
                >
                  {t("common.contactManager")}
                </a>
                <div className="relative" ref={shareMenuRef}>
                  <button
                    type="button"
                    aria-expanded={isShareMenuOpen}
                    aria-haspopup="menu"
                    aria-label={isCopied ? t("product.linkCopied") : t("product.share")}
                    title={isCopied ? t("product.linkCopied") : t("product.share")}
                    onClick={() => {
                      setIsShareMenuOpen((current) => {
                        if (!current) {
                          setShareMenuPlacement({
                            horizontal: "left",
                            vertical: "bottom",
                          });
                        }

                        return !current;
                      });
                    }}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-gray-3 bg-white text-dark transition-all duration-200 hover:border-blue/20 hover:bg-blue/5 hover:text-blue"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M13.3333 6.66667C14.714 6.66667 15.8333 5.54738 15.8333 4.16667C15.8333 2.78596 14.714 1.66667 13.3333 1.66667C11.9526 1.66667 10.8333 2.78596 10.8333 4.16667C10.8333 4.49433 10.8963 4.80727 11.0111 5.09398L8.36227 6.63916C7.91238 6.08237 7.22367 5.72682 6.45192 5.72682C5.09568 5.72682 3.99609 6.82642 3.99609 8.18266C3.99609 9.53889 5.09568 10.6385 6.45192 10.6385C7.22377 10.6385 7.91255 10.2829 8.36244 9.72603L11.011 11.2711C10.8962 11.5579 10.8333 11.8709 10.8333 12.1987C10.8333 13.5794 11.9526 14.6987 13.3333 14.6987C14.714 14.6987 15.8333 13.5794 15.8333 12.1987C15.8333 10.818 14.714 9.69873 13.3333 9.69873C12.5615 9.69873 11.8728 10.0543 11.4229 10.6111L8.77426 9.06603C8.88899 8.77932 8.95192 8.46638 8.95192 8.13872C8.95192 7.81106 8.88899 7.49812 8.77426 7.21141L11.4228 5.66637C11.8727 6.22338 12.5614 6.57917 13.3333 6.57917V6.66667Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {isCopied ? (
                      <span className="absolute -right-1 -top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-green text-white">
                        <svg
                          className="h-2.5 w-2.5"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M2.5 6.25L4.75 8.5L9.5 3.75"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    ) : null}
                  </button>

                  {isShareMenuOpen ? (
                    <div
                      ref={shareMenuDropdownRef}
                      className={`absolute z-20 min-w-[220px] overflow-hidden rounded-2xl border border-gray-3 bg-white p-2 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.28)] ${
                        shareMenuPlacement.horizontal === "left"
                          ? "left-0"
                          : "right-0"
                      } ${
                        shareMenuPlacement.vertical === "bottom"
                          ? "top-full mt-2"
                          : "bottom-full mb-2"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          void handleNativeShare();
                        }}
                        disabled={!shareUrl}
                        className="flex min-h-[44px] w-full items-center rounded-xl px-3 py-2 text-left text-sm font-medium text-dark transition-colors duration-200 hover:bg-gray-1 hover:text-blue"
                      >
                        {t("product.share")}
                      </button>

                      <WhatsappShareButton
                        url={shareUrl}
                        title={shareText}
                        separator="\n"
                        resetButtonStyle={false}
                        beforeOnClick={() => {
                          setIsShareMenuOpen(false);
                        }}
                        disabled={!shareUrl}
                        className="flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-dark transition-colors duration-200 hover:bg-green/10 hover:text-green-dark disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <WhatsappIcon round size={22} />
                        WhatsApp
                      </WhatsappShareButton>

                      <TelegramShareButton
                        url={shareUrl}
                        title={shareText}
                        resetButtonStyle={false}
                        beforeOnClick={() => {
                          setIsShareMenuOpen(false);
                        }}
                        disabled={!shareUrl}
                        className="flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-dark transition-colors duration-200 hover:bg-blue/10 hover:text-blue-dark disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <TelegramIcon round size={22} />
                        Telegram
                      </TelegramShareButton>

                      <button
                        type="button"
                        onClick={() => {
                          void handleCopyLink();
                        }}
                        disabled={!shareUrl}
                        className="flex min-h-[44px] w-full items-center rounded-xl px-3 py-2 text-left text-sm font-medium text-dark transition-colors duration-200 hover:bg-gray-1 hover:text-dark"
                      >
                        {t("product.copyLink")}
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="rounded-lg bg-white shadow-1 p-5 sm:p-7.5">
                <h2 className="font-semibold text-xl text-dark mb-4">
                  {t("common.description")}
                </h2>
                <p className="text-dark-4 whitespace-pre-line">
                  {product.fullDescription}
                </p>

                {structuredAttributes.specs.length > 0 ||
                structuredAttributes.useCases.length > 0 ||
                structuredAttributes.highlights.length > 0 ? (
                  <>
                    <h3 className="font-semibold text-lg text-dark mt-8 mb-4">
                      {t("common.specifications")}
                    </h3>

                    {structuredAttributes.specs.length > 0 ? (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {structuredAttributes.specs.map((attribute) => (
                          <div
                            key={`${attribute.name}-${attribute.value}`}
                            className="rounded-[22px] border border-gray-3 bg-[linear-gradient(180deg,#fbfcff_0%,#f4f7ff_100%)] p-4 shadow-[0_18px_34px_-30px_rgba(15,23,42,0.18)]"
                          >
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-4">
                              {attribute.name}
                            </p>
                            <p className="mt-2 text-sm font-medium leading-6 text-dark">
                              {attribute.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {structuredAttributes.useCases.length > 0 ? (
                      <div className="mt-6">
                        <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-dark-4">
                          {t("product.bestFor")}
                        </h4>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {structuredAttributes.useCases.map((item) => (
                            <span
                              key={item}
                              className="inline-flex rounded-full border border-blue/10 bg-blue/5 px-3 py-2 text-sm font-medium text-blue-dark"
                            >
                              {t("product.useCaseLabel", {
                                item: toSentenceCaseStart(item),
                              })}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {structuredAttributes.highlights.length > 0 ? (
                      <div className="mt-6">
                        <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-dark-4">
                          {t("product.highlights")}
                        </h4>
                        <div className="mt-3 grid gap-2.5">
                          {structuredAttributes.highlights.map((item) => (
                            <div
                              key={item}
                              className="flex items-start gap-3 rounded-[20px] border border-green/10 bg-green/10 px-4 py-3"
                            >
                              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-green-dark shadow-[0_12px_24px_-18px_rgba(15,23,42,0.35)]">
                                <svg
                                  className="h-3.5 w-3.5"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M2.5 6.25L4.75 8.5L9.5 3.75"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                              <p className="text-sm leading-6 text-dark">
                                {item}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </>
                ) : null}
              </div>
            </div>
          </div>

          <ProductRecommendationsSection
            eyebrowKey="common.similarProducts"
            items={relatedProducts}
            titleKey="common.relatedItems"
          />

          <ProductRecommendationsSection
            eyebrowKey="common.recommended"
            items={recommendedProducts}
            titleKey="common.youMayAlsoLike"
          />
        </div>
      </section>

      <Newsletter />
    </main>
  );
}
