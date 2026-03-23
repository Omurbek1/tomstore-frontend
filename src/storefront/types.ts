export type StorefrontProductLabel = "hit" | "new" | "sale";

export type StorefrontAvailability = {
  status: "in_stock" | "on_order" | "in_transit" | "out_of_stock";
  label: string;
  isInStock: boolean;
  quantity: number;
  incomingQty: number;
  incomingEta?: string | null;
};

export type StorefrontCategory = {
  name: string;
  slug: string;
  totalProducts: number;
  image?: string;
};

export type StorefrontBrand = {
  name: string;
  slug: string;
  totalProducts: number;
};

export type StorefrontHeroSlide = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  backgroundImageUrl?: string;
};

export type StorefrontProductCard = {
  id: string;
  slug: string;
  sku?: string;
  name: string;
  shortDescription: string;
  price: number;
  oldPrice?: number | null;
  availability: StorefrontAvailability;
  quantity: number;
  brand: string;
  category: string;
  labels: StorefrontProductLabel[];
  isFeatured: boolean;
  isOnSale: boolean;
  isNew: boolean;
  sortOrder: number;
  mainImage?: string;
  gallery: string[];
  seoTitle: string;
  seoDescription: string;
  updatedAt: string;
  createdAt: string;
};

export type StorefrontBreadcrumb = {
  label: string;
  href: string;
};

export type StorefrontAttribute = {
  name: string;
  value: string;
};

export type StorefrontProductDetails = StorefrontProductCard & {
  fullDescription: string;
  attributes: StorefrontAttribute[];
  videoUrl?: string | null;
  breadcrumbs: StorefrontBreadcrumb[];
  relatedProducts: StorefrontProductCard[];
  recommendedProducts: StorefrontProductCard[];
};

export type StorefrontCatalogResponse = {
  items: StorefrontProductCard[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  filters: {
    categories: StorefrontCategory[];
    brands: StorefrontBrand[];
    minPrice: number;
    maxPrice: number;
    selectedCategory?: string;
    selectedBrand?: string;
    selectedAvailability?: string;
    selectedLabel?: string;
    selectedSort?: string;
    query?: string;
  };
};

export type StorefrontHomeResponse = {
  hero: StorefrontHeroSlide & {
    slides?: StorefrontHeroSlide[];
  };
  categories: StorefrontCategory[];
  popularProducts: StorefrontProductCard[];
  recommendedProducts: StorefrontProductCard[];
  hitProducts: StorefrontProductCard[];
  saleProducts: StorefrontProductCard[];
  newProducts: StorefrontProductCard[];
  brands: StorefrontBrand[];
  advantages: Array<{
    title: string;
    description: string;
  }>;
};

export type StorefrontConfig = {
  companyName: string;
  siteUrl: string;
  whatsappPhone?: string;
  supportPhone?: string;
  instagramUrl?: string;
  workingHours?: string;
  mapUrl?: string;
  warrantyText?: string;
  contacts: Array<{
    name: string;
    address?: string;
    phone?: string;
  }>;
};

export type StorefrontRequestPayload = {
  type: "lead" | "order";
  productId: string;
  name: string;
  phone: string;
  comment?: string;
  source?: string;
  channel?: string;
  productUrl?: string;
};

export type StorefrontRequestResponse = {
  success: true;
  requestId: string;
  clientId: string;
  productId: string;
  managerHint?: string;
  whatsappUrl?: string;
};
