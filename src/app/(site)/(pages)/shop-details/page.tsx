import { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildNoIndexMetadata } from "@/seo/metadata";

export const metadata: Metadata = buildNoIndexMetadata(
  "Страница товара",
  "Промежуточная страница карточки товара.",
  "/shop-with-sidebar",
);

const ShopDetailsPage = () => {
  redirect("/shop-with-sidebar");
};

export default ShopDetailsPage;
