"use client";

import React from "react";
import ProductItem from "@/components/Common/ProductItem";
import { Product } from "@/types/product";

const SingleGridItem = ({ item }: { item: Product }) => {
  return <ProductItem item={item} />;
};

export default SingleGridItem;
