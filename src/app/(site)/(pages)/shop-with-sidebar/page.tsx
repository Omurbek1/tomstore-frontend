import { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import CatalogView from "@/components/Storefront/CatalogView";
import {
  storefrontCatalogQueryOptions,
  type StorefrontCatalogRouteQuery,
} from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import { buildSeoMetadata } from "@/seo/metadata";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const params = await searchParams;
  const hasQueryParams = Object.values(params).some((value) =>
    Array.isArray(value) ? value.length > 0 : Boolean(value),
  );

  return buildSeoMetadata({
    title: "Каталог товаров",
    description:
      "Каталог ноутбуков, принтеров, компьютеров и аксессуаров TOMSTORE.",
    path: "/shop-with-sidebar",
    noIndex: hasQueryParams,
  });
}

const ShopWithSidebarPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : undefined;
  const category = typeof params.category === "string" ? params.category : undefined;
  const brand = typeof params.brand === "string" ? params.brand : undefined;
  const availability =
    typeof params.availability === "string" ? params.availability : undefined;
  const label = typeof params.label === "string" ? params.label : undefined;
  const sort = typeof params.sort === "string" ? params.sort : undefined;
  const page = typeof params.page === "string" ? params.page : undefined;
  const view = typeof params.view === "string" ? params.view : undefined;
  const query: StorefrontCatalogRouteQuery = {
    q,
    category,
    brand,
    availability,
    label,
    sort,
    page,
    view,
  };
  const queryClient = makeQueryClient();
  await queryClient.prefetchQuery(storefrontCatalogQueryOptions(query));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <CatalogView
          title="Explore All Products"
          pathname="/shop-with-sidebar"
          query={query}
          variant="sidebar"
        />
      </main>
    </HydrationBoundary>
  );
};

export default ShopWithSidebarPage;
