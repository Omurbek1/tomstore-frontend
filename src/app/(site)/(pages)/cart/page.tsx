import React from "react";
import Cart from "@/components/Cart";

import { Metadata } from "next";
import { buildNoIndexMetadata } from "@/seo/metadata";
export const metadata: Metadata = {
  ...buildNoIndexMetadata(
    "Корзина",
    "Корзина интернет-магазина TOMSTORE.",
    "/cart",
  ),
};

const CartPage = () => {
  return (
    <>
      <Cart />
    </>
  );
};

export default CartPage;
