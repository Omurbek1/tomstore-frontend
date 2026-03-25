"use client";

import dynamic from "next/dynamic";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";

const CartSidebarModal = dynamic(() => import("./CartSidebarModal"), {
  ssr: false,
});

export default function LazyCartSidebarModal() {
  const { isCartModalOpen } = useCartModalContext();

  return isCartModalOpen ? <CartSidebarModal /> : null;
}
