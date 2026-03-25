"use client";

import dynamic from "next/dynamic";

const AppToaster = dynamic(() => import("./AppToaster"), {
  ssr: false,
});

export default function LazyAppToaster() {
  return <AppToaster />;
}
