"use client";

import dynamic from "next/dynamic";
import { useModalContext } from "@/app/context/QuickViewModalContext";

const QuickViewModal = dynamic(() => import("./QuickViewModal"), {
  ssr: false,
});

export default function LazyQuickViewModal() {
  const { isModalOpen } = useModalContext();

  return isModalOpen ? <QuickViewModal /> : null;
}
