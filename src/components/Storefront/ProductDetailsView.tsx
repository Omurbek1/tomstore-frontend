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

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
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
                    onClick={() => {
                      setIsShareMenuOpen((current) => !current);
                    }}
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-md border border-gray-3 bg-white px-5 py-3 font-medium text-dark transition-all duration-200 hover:border-blue/20 hover:bg-blue/5 hover:text-blue"
                  >
                    {isCopied ? t("product.linkCopied") : t("product.share")}
                    <svg
                      className={`h-4 w-4 transition-transform duration-200 ${isShareMenuOpen ? "rotate-180" : ""}`}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {isShareMenuOpen ? (
                    <div className="absolute left-0 top-full z-20 mt-2 min-w-[220px] overflow-hidden rounded-2xl border border-gray-3 bg-white p-2 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.28)]">
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

                {product.attributes.length > 0 ? (
                  <>
                    <h3 className="font-semibold text-lg text-dark mt-8 mb-4">
                      {t("common.specifications")}
                    </h3>
                    <div className="grid gap-3">
                      {product.attributes.map((attribute) => (
                        <div
                          key={`${attribute.name}-${attribute.value}`}
                          className="flex items-start justify-between gap-4 border-b border-gray-3 pb-3"
                        >
                          <span className="text-dark-4">{attribute.name}</span>
                          <span className="text-dark font-medium text-right">
                            {attribute.value}
                          </span>
                        </div>
                      ))}
                    </div>
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
