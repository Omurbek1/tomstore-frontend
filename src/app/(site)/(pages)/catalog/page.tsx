import { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildNoIndexMetadata } from "@/seo/metadata";

export const metadata: Metadata = buildNoIndexMetadata(
  "Каталог",
  "Промежуточная страница каталога.",
  "/shop-with-sidebar",
);

const CatalogPage = () => {
  redirect("/shop-with-sidebar");
};

export default CatalogPage;
