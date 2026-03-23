import type {
  StorefrontCatalogResponse,
  StorefrontConfig,
  StorefrontHomeResponse,
  StorefrontProductDetails,
} from "@/storefront/types";
import { getBackendUrl, getSiteUrl } from "@/storefront/site";

const FALLBACK_CONFIG: StorefrontConfig = {
  companyName: "TOMSTORE",
  siteUrl: getSiteUrl(),
  workingHours: "Пн-Вс: 10:00 - 20:00",
  contacts: [],
};

const FALLBACK_HOME: StorefrontHomeResponse = {
  hero: {
    eyebrow: "TOMSTORE",
    title: "TOMSTORE",
    subtitle: "Каталог техники и аксессуаров",
    primaryCtaLabel: "В каталог",
    primaryCtaHref: "/shop-with-sidebar",
    secondaryCtaLabel: "Контакты",
    secondaryCtaHref: "/contact",
    slides: [
      {
        eyebrow: "TOMSTORE",
        title: "TOMSTORE",
        subtitle: "Каталог техники и аксессуаров",
        primaryCtaLabel: "В каталог",
        primaryCtaHref: "/shop-with-sidebar",
        secondaryCtaLabel: "Контакты",
        secondaryCtaHref: "/contact",
      },
    ],
  },
  categories: [],
  popularProducts: [],
  recommendedProducts: [],
  hitProducts: [],
  saleProducts: [],
  newProducts: [],
  brands: [],
  advantages: [],
};

const FALLBACK_CATALOG: StorefrontCatalogResponse = {
  items: [],
  total: 0,
  page: 1,
  pageSize: 12,
  totalPages: 1,
  filters: {
    categories: [],
    brands: [],
    minPrice: 0,
    maxPrice: 0,
  },
};

const buildUrl = (path: string) => `${getBackendUrl()}${path}`;

async function fetchJson<T>(
  path: string,
  options?: {
    revalidate?: number;
    fallback?: T;
    allowNotFound?: boolean;
    init?: RequestInit;
  },
): Promise<T | null> {
  try {
    const response = await fetch(buildUrl(path), {
      headers: {
        Accept: "application/json",
        ...(options?.init?.headers || {}),
      },
      next:
        options?.revalidate !== undefined
          ? { revalidate: options.revalidate }
          : undefined,
      ...options?.init,
    });

    if (response.status === 404 && options?.allowNotFound) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Storefront API error: ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (options?.fallback !== undefined) {
      return options.fallback;
    }

    if (options?.allowNotFound) {
      return null;
    }

    throw error;
  }
}

export const getStorefrontConfig = async () =>
  (await fetchJson<StorefrontConfig>("/storefront/config", {
    revalidate: 300,
    fallback: FALLBACK_CONFIG,
  })) || FALLBACK_CONFIG;

export const getStorefrontHome = async () =>
  (await fetchJson<StorefrontHomeResponse>("/storefront/home", {
    revalidate: 180,
    fallback: FALLBACK_HOME,
  })) || FALLBACK_HOME;

export const getStorefrontCatalog = async (params?: {
  q?: string;
  category?: string;
  brand?: string;
  availability?: string;
  label?: string;
  sort?: string;
  page?: string | number;
  pageSize?: string | number;
}) => {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params || {})) {
    if (value === undefined || value === "" || value === "all") {
      continue;
    }

    searchParams.set(key, String(value));
  }

  const query = searchParams.toString();

  return (
    (await fetchJson<StorefrontCatalogResponse>(
      `/storefront/catalog${query ? `?${query}` : ""}`,
      {
        revalidate: 120,
        fallback: FALLBACK_CATALOG,
      },
    )) || FALLBACK_CATALOG
  );
};

export const getStorefrontProduct = async (slug: string) =>
  fetchJson<StorefrontProductDetails>(`/storefront/products/${slug}`, {
    revalidate: 120,
    allowNotFound: true,
  });
