import Home from "@/components/Home";
import { Metadata } from "next";
import { getStorefrontHome } from "@/storefront/api";
import {
  mapStorefrontCategoriesToCategories,
  mapStorefrontProductsToProducts,
} from "@/storefront/mappers";

export const metadata: Metadata = {
  title: "NextCommerce | Nextjs E-commerce template",
  description: "This is Home for NextCommerce Template",
  // other metadata
};

export default async function HomePage() {
  const home = await getStorefrontHome();

  return (
    <>
      <Home
        hero={home.hero}
        categories={mapStorefrontCategoriesToCategories(home.categories)}
        newProducts={mapStorefrontProductsToProducts(home.newProducts)}
        popularProducts={mapStorefrontProductsToProducts(home.popularProducts)}
        recommendedProducts={mapStorefrontProductsToProducts(
          home.recommendedProducts,
        )}
      />
    </>
  );
}
