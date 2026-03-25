import React from "react";
import MailSuccess from "@/components/MailSuccess";

import { Metadata } from "next";
import { buildNoIndexMetadata } from "@/seo/metadata";
export const metadata: Metadata = {
  ...buildNoIndexMetadata(
    "Сообщение отправлено",
    "Служебная страница успешной отправки сообщения.",
    "/mail-success",
  ),
};

const MailSuccessPage = () => {
  return (
    <main>
      <MailSuccess />
    </main>
  );
};

export default MailSuccessPage;
