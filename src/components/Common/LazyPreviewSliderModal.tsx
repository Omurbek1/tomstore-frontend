"use client";

import dynamic from "next/dynamic";
import { usePreviewSlider } from "@/app/context/PreviewSliderContext";

const PreviewSliderModal = dynamic(() => import("./PreviewSlider"), {
  ssr: false,
});

export default function LazyPreviewSliderModal() {
  const { isModalPreviewOpen } = usePreviewSlider();

  return isModalPreviewOpen ? <PreviewSliderModal /> : null;
}
