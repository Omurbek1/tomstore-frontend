"use client";

import { Toaster } from "react-hot-toast";

const AppToaster = () => (
  <Toaster
    position="top-right"
    gutter={12}
    containerStyle={{
      top: 20,
      right: 16,
      left: 16,
    }}
    toastOptions={{
      duration: 3200,
      style: {
        background: "transparent",
        boxShadow: "none",
        padding: 0,
      },
    }}
  />
);

export default AppToaster;
