import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "TOMSTORE",
  description: "Страница товара TOMSTORE.",
};

const ShopDetailsPage = () => {
  redirect("/shop-with-sidebar");
};

export default ShopDetailsPage;
