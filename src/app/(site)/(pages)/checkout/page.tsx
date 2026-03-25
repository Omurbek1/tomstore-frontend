import React from "react";
import Checkout from "@/components/Checkout";

import { Metadata } from "next";
import { buildNoIndexMetadata } from "@/seo/metadata";
export const metadata: Metadata = {
  ...buildNoIndexMetadata(
    "Оформление заказа",
    "Страница оформления заказа TOMSTORE.",
    "/checkout",
  ),
};

const CheckoutPage = () => {
  return (
    <main>
      <Checkout />
    </main>
  );
};

export default CheckoutPage;
