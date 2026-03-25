import Contact from "@/components/Contact";

import { Metadata } from "next";
import { buildSeoMetadata } from "@/seo/metadata";
export const metadata: Metadata = {
  ...buildSeoMetadata({
    title: "Контакты",
    description:
      "Контакты TOMSTORE: адрес магазина, телефоны и WhatsApp для заказа и консультации.",
    path: "/contact",
  }),
};

const ContactPage = () => {
  return (
    <main>
      <Contact />
    </main>
  );
};

export default ContactPage;
