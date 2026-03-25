import React from "react";
import Error from "@/components/Error";

import { Metadata } from "next";
import { buildNoIndexMetadata } from "@/seo/metadata";
export const metadata: Metadata = {
  ...buildNoIndexMetadata(
    "Ошибка",
    "Служебная страница ошибки TOMSTORE.",
    "/error",
  ),
};

const ErrorPage = () => {
  return (
    <main>
      <Error />
    </main>
  );
};

export default ErrorPage;
