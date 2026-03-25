"use client";

import { createContext, useContext, type ReactNode } from "react";
import { getStorefrontWhatsappPhone } from "./contact";

type StorefrontContactContextValue = {
  whatsappPhone?: string;
};

const StorefrontContactContext = createContext<StorefrontContactContextValue>({
  whatsappPhone: getStorefrontWhatsappPhone(),
});

type StorefrontContactProviderProps = {
  children: ReactNode;
  whatsappPhone?: string;
};

export const StorefrontContactProvider = ({
  children,
  whatsappPhone,
}: StorefrontContactProviderProps) => (
  <StorefrontContactContext.Provider
    value={{
      whatsappPhone: whatsappPhone || getStorefrontWhatsappPhone(),
    }}
  >
    {children}
  </StorefrontContactContext.Provider>
);

export const useStorefrontContact = () => useContext(StorefrontContactContext);
