"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import Newsletter from "@/components/Common/Newsletter";
import ProductItem from "@/components/Common/ProductItem";
import { useI18n } from "@/i18n/provider";
import {
  getAvailabilityMessageKey,
  getProductLabelMessageKey,
} from "@/i18n/utils";
import type { Product } from "@/types/product";
import type { StorefrontProductDetails } from "@/storefront/types";
import Image from "next/image";
import Link from "next/link";

type ProductDetailsViewProps = {
  product: StorefrontProductDetails;
  relatedProducts: Product[];
  recommendedProducts: Product[];
};

export default function ProductDetailsView({
  product,
  relatedProducts,
  recommendedProducts,
}: ProductDetailsViewProps) {
  const { t } = useI18n();

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
                />
              </div>

              {product.gallery.length > 1 ? (
                <div className="grid grid-cols-4 gap-4 mt-6">
                  {product.gallery.slice(0, 4).map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className="rounded-lg bg-gray-2 shadow-1 p-3 flex items-center justify-center"
                    >
                      <Image src={image} alt={product.name} width={100} height={100} />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {product.labels.map((label) => (
                  <span
                    key={label}
                    className="inline-flex rounded-full bg-blue px-3 py-1 text-custom-xs font-medium uppercase tracking-wide text-white"
                  >
                    {t(getProductLabelMessageKey(label) || label)}
                  </span>
                ))}
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
                  ${product.price}
                </span>
                {product.oldPrice && product.oldPrice > product.price ? (
                  <span className="text-dark-4 line-through text-lg">
                    ${product.oldPrice}
                  </span>
                ) : null}
              </div>

              <div className="grid gap-3 rounded-lg bg-gray-1 p-5 mb-7.5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-dark-4">{t("common.brand")}</span>
                  <span className="text-dark font-medium">{product.brand}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-dark-4">{t("common.category")}</span>
                  <span className="text-dark font-medium">{product.category}</span>
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
                <Link
                  href="/contact"
                  className="inline-flex font-medium text-dark bg-gray-1 py-3 px-7 rounded-md ease-out duration-200 hover:bg-dark hover:text-white"
                >
                  {t("common.contactManager")}
                </Link>
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

          {relatedProducts.length > 0 ? (
            <div className="mt-20">
              <div className="mb-7 flex items-center justify-between">
                <div>
                  <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
                    {t("common.similarProducts")}
                  </span>
                  <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
                    {t("common.relatedItems")}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7.5 gap-y-9">
                {relatedProducts.slice(0, 4).map((item) => (
                  <ProductItem item={item} key={item.id} />
                ))}
              </div>
            </div>
          ) : null}

          {recommendedProducts.length > 0 ? (
            <div className="mt-20">
              <div className="mb-7 flex items-center justify-between">
                <div>
                  <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
                    {t("common.recommended")}
                  </span>
                  <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
                    {t("common.youMayAlsoLike")}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7.5 gap-y-9">
                {recommendedProducts.slice(0, 4).map((item) => (
                  <ProductItem item={item} key={item.id} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <Newsletter />
    </main>
  );
}
