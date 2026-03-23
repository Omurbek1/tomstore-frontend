"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import SingleGridItem from "@/components/Shop/SingleGridItem";
import SingleListItem from "@/components/Shop/SingleListItem";
import type { Product } from "@/types/product";
import type {
  StorefrontBrand,
  StorefrontCategory,
} from "@/storefront/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type CatalogQuery = {
  q?: string;
  category?: string;
  brand?: string;
  availability?: string;
  label?: string;
  sort?: string;
  page?: string;
  view?: string;
};

type CatalogViewProps = {
  title: string;
  pathname: string;
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
  filters: {
    categories: StorefrontCategory[];
    brands: StorefrontBrand[];
  };
  query: CatalogQuery;
  variant: "sidebar" | "full";
};

const buildQueryString = (
  pathname: string,
  query: CatalogQuery,
  overrides: Partial<CatalogQuery> = {},
) => {
  const nextQuery = { ...query, ...overrides };
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(nextQuery)) {
    if (!value || value === "all") {
      continue;
    }

    searchParams.set(key, value);
  }

  const serialized = searchParams.toString();
  return serialized ? `${pathname}?${serialized}` : pathname;
};

const buildPages = (currentPage: number, totalPages: number) => {
  const pages = new Set<number>([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);

  return Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((left, right) => left - right);
};

export default function CatalogView({
  title,
  pathname,
  products,
  total,
  page,
  totalPages,
  filters,
  query,
  variant,
}: CatalogViewProps) {
  const router = useRouter();
  const [productStyle, setProductStyle] = useState(
    query.view === "list" ? "list" : "grid",
  );
  const [searchValue, setSearchValue] = useState(query.q || "");

  const pages = useMemo(() => buildPages(page, totalPages), [page, totalPages]);

  const applySearch = () => {
    router.push(
      buildQueryString(pathname, query, {
        q: searchValue.trim() || undefined,
        page: undefined,
      }),
    );
  };

  return (
    <>
      <Breadcrumb title={title} pages={["shop"]} />

      <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28 bg-[#f3f4f6]">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex gap-7.5 items-start">
            {variant === "sidebar" ? (
              <aside className="hidden xl:block max-w-[270px] w-full">
                <div className="flex flex-col gap-6 sticky top-28">
                  <div className="bg-white shadow-1 rounded-lg py-4 px-5">
                    <div className="flex items-center justify-between gap-4">
                      <p>Filters</p>
                      <Link
                        href={pathname}
                        className="text-blue text-custom-sm"
                      >
                        Clean all
                      </Link>
                    </div>
                  </div>

                  <div className="bg-white shadow-1 rounded-lg py-5 px-6">
                    <h3 className="font-medium text-dark mb-4">Search</h3>
                    <div className="flex gap-2">
                      <input
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                            applySearch();
                          }
                        }}
                        type="search"
                        placeholder="Поиск товара"
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-4 outline-none"
                      />
                      <button
                        onClick={applySearch}
                        className="inline-flex items-center justify-center rounded-md bg-blue px-4 text-white"
                      >
                        Go
                      </button>
                    </div>
                  </div>

                  <div className="bg-white shadow-1 rounded-lg py-5 px-6">
                    <h3 className="font-medium text-dark mb-4">Categories</h3>
                    <div className="flex flex-col gap-3">
                      {filters.categories.map((category) => {
                        const href = buildQueryString(pathname, query, {
                          category:
                            query.category === category.slug
                              ? undefined
                              : category.slug,
                          page: undefined,
                        });

                        return (
                          <Link
                            key={category.slug}
                            href={href}
                            className={`flex items-center justify-between gap-3 ${
                              query.category === category.slug
                                ? "text-blue"
                                : "text-dark"
                            }`}
                          >
                            <span>{category.name}</span>
                            <span className="inline-flex rounded-full bg-gray-2 px-2 py-0.5 text-custom-xs">
                              {category.totalProducts}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-white shadow-1 rounded-lg py-5 px-6">
                    <h3 className="font-medium text-dark mb-4">Brands</h3>
                    <div className="flex flex-col gap-3">
                      {filters.brands.slice(0, 12).map((brand) => {
                        const href = buildQueryString(pathname, query, {
                          brand:
                            query.brand === brand.slug ? undefined : brand.slug,
                          page: undefined,
                        });

                        return (
                          <Link
                            key={brand.slug}
                            href={href}
                            className={`flex items-center justify-between gap-3 ${
                              query.brand === brand.slug ? "text-blue" : "text-dark"
                            }`}
                          >
                            <span>{brand.name}</span>
                            <span className="inline-flex rounded-full bg-gray-2 px-2 py-0.5 text-custom-xs">
                              {brand.totalProducts}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-white shadow-1 rounded-lg py-5 px-6">
                    <h3 className="font-medium text-dark mb-4">Availability</h3>
                    <div className="flex flex-col gap-3">
                      {[
                        { value: "in_stock", label: "In stock" },
                        { value: "on_order", label: "On order" },
                        { value: "in_transit", label: "In transit" },
                        { value: "out_of_stock", label: "Out of stock" },
                      ].map((item) => (
                        <Link
                          key={item.value}
                          href={buildQueryString(pathname, query, {
                            availability:
                              query.availability === item.value
                                ? undefined
                                : item.value,
                            page: undefined,
                          })}
                          className={
                            query.availability === item.value
                              ? "text-blue"
                              : "text-dark"
                          }
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            ) : null}

            <div className="w-full">
              <div className="rounded-lg bg-white shadow-1 p-4 sm:px-5 sm:py-3 mb-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-wrap items-center gap-4">
                    <select
                      value={query.sort || "popular"}
                      onChange={(event) =>
                        router.push(
                          buildQueryString(pathname, query, {
                            sort: event.target.value,
                            page: undefined,
                          }),
                        )
                      }
                      className="rounded-md border border-gray-3 bg-gray-1 px-3 py-2 outline-none"
                    >
                      <option value="popular">Popular</option>
                      <option value="newest">Newest</option>
                      <option value="price_asc">Price: low to high</option>
                      <option value="price_desc">Price: high to low</option>
                      <option value="name">Name</option>
                    </select>

                    <p>
                      Showing <span className="text-dark">{products.length}</span> of{" "}
                      <span className="text-dark">{total}</span> products
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => setProductStyle("grid")}
                      className={`flex items-center justify-center w-10.5 h-9 rounded-[5px] border ${
                        productStyle === "grid"
                          ? "bg-blue border-blue text-white"
                          : "text-dark bg-gray-1 border-gray-3"
                      }`}
                    >
                      G
                    </button>
                    <button
                      onClick={() => setProductStyle("list")}
                      className={`flex items-center justify-center w-10.5 h-9 rounded-[5px] border ${
                        productStyle === "list"
                          ? "bg-blue border-blue text-white"
                          : "text-dark bg-gray-1 border-gray-3"
                      }`}
                    >
                      L
                    </button>
                  </div>
                </div>
              </div>

              <div
                className={
                  productStyle === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7.5 gap-y-9"
                    : "flex flex-col gap-7.5"
                }
              >
                {products.map((item) =>
                  productStyle === "grid" ? (
                    <SingleGridItem item={item} key={item.id} />
                  ) : (
                    <SingleListItem item={item} key={item.id} />
                  ),
                )}
              </div>

              {totalPages > 1 ? (
                <div className="flex justify-center mt-15">
                  <div className="bg-white shadow-1 rounded-md p-2">
                    <ul className="flex items-center gap-1">
                      {pages.map((pageNumber) => (
                        <li key={pageNumber}>
                          <Link
                            href={buildQueryString(pathname, query, {
                              page: String(pageNumber),
                            })}
                            className={`flex py-1.5 px-3.5 rounded-[3px] duration-200 ${
                              pageNumber === page
                                ? "bg-blue text-white"
                                : "hover:text-white hover:bg-blue"
                            }`}
                          >
                            {pageNumber}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
