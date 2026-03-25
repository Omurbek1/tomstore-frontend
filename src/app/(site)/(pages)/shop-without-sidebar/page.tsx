import { Metadata } from "next";
import CatalogView from "@/components/Storefront/CatalogView";
import {
  storefrontCatalogQueryOptions,
  type StorefrontCatalogRouteQuery,
} from "@/storefront/query-options";
import { makeQueryClient } from "@/tanstack-query/query-client";
import { buildNoIndexMetadata } from "@/seo/metadata";
import { normalizeCatalogQuery } from "@/storefront/catalog-routing";

export const metadata: Metadata = {
  ...buildNoIndexMetadata(
    "Каталог товаров",
    "Альтернативный вариант каталога TOMSTORE.",
    "/shop-with-sidebar",
  ),
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const ShopWithoutSidebarPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const query: StorefrontCatalogRouteQuery = normalizeCatalogQuery(params);
  const queryClient = makeQueryClient();
  const catalog = await queryClient.fetchQuery(storefrontCatalogQueryOptions(query));

  return (
    <main>
      <CatalogView
        catalog={catalog}
        routeContext={{
          type: "catalog",
          path: "/shop-without-sidebar",
        }}
        query={query}
        variant="full"
      />
    </main>
  );
};

export default ShopWithoutSidebarPage;
