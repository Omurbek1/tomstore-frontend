import { Metadata } from "next";
import CatalogView from "@/components/Storefront/CatalogView";
import { getStorefrontCatalog } from "@/storefront/api";
import { mapStorefrontProductsToProducts } from "@/storefront/mappers";

export const metadata: Metadata = {
  title: "Shop Grid | TOMSTORE",
  description: "Каталог товаров TOMSTORE без боковой панели.",
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const ShopWithoutSidebarPage = async ({ searchParams }: Props) => {
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

  const data = await getStorefrontCatalog({
    q,
    category,
    brand,
    availability,
    label,
    sort,
    page,
  });

  return (
    <main>
      <CatalogView
        title="Explore All Products"
        pathname="/shop-without-sidebar"
        products={mapStorefrontProductsToProducts(data.items)}
        total={data.total}
        page={data.page}
        totalPages={data.totalPages}
        filters={data.filters}
        query={{
          q,
          category,
          brand,
          availability,
          label,
          sort,
          page,
          view,
        }}
        variant="full"
      />
    </main>
  );
};

export default ShopWithoutSidebarPage;
