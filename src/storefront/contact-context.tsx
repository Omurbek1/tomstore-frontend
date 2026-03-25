"use client";

import { createContext, useContext, type ReactNode } from "react";
import {
  getStorefrontCompanyName,
  getStorefrontWhatsappPhone,
} from "./contact";

type StorefrontContactContextValue = {
  companyName: string;
  facebookUrl?: string;
  instagramUrl?: string;
  mapUrl?: string;
  tiktokUrl?: string;
  twoGisUrl?: string;
  whatsappPhone?: string;
};

const StorefrontContactContext = createContext<StorefrontContactContextValue>({
  companyName: getStorefrontCompanyName(),
  whatsappPhone: getStorefrontWhatsappPhone(),
});

type StorefrontContactProviderProps = {
  children: ReactNode;
  companyName?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  mapUrl?: string;
  tiktokUrl?: string;
  twoGisUrl?: string;
  whatsappPhone?: string;
};

export const StorefrontContactProvider = ({
  children,
  companyName,
  facebookUrl,
  instagramUrl,
  mapUrl,
  tiktokUrl,
  twoGisUrl,
  whatsappPhone,
}: StorefrontContactProviderProps) => (
  <StorefrontContactContext.Provider
    value={{
      companyName: companyName || getStorefrontCompanyName(),
      facebookUrl,
      instagramUrl,
      mapUrl,
      tiktokUrl,
      twoGisUrl,
      whatsappPhone: whatsappPhone || getStorefrontWhatsappPhone(),
    }}
  >
    {children}
  </StorefrontContactContext.Provider>
);

export const useStorefrontContact = () => useContext(StorefrontContactContext);
