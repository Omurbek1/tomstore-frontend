import React from "react";
import { Wishlist } from "@/components/Wishlist";
import { Metadata } from "next";
import { buildNoIndexMetadata } from "@/seo/metadata";

export const metadata: Metadata = {
  ...buildNoIndexMetadata(
    "Избранное",
    "Список избранных товаров TOMSTORE.",
    "/wishlist",
  ),
};

const WishlistPage = () => {
  return (
    <main>
      <Wishlist />
    </main>
  );
};

export default WishlistPage;
