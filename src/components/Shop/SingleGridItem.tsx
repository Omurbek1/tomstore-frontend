"use client";

import React from "react";
import ProductItem from "@/components/Common/ProductItem";
import { Product } from "@/types/product";

const SingleGridItemComponent = ({ item }: { item: Product }) => {
  return <ProductItem item={item} />;
};

const SingleGridItem = React.memo(SingleGridItemComponent);

SingleGridItem.displayName = "SingleGridItem";

export default SingleGridItem;
