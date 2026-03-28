import type {
  StorefrontAvailability,
  StorefrontProductLabel,
} from "@/storefront/types";

export type Product = {
  id: string;
  slug: string;
  title: string;
  reviews: number;
  price: number;
  discountedPrice: number;
  sku?: string;
  brand?: string;
  category?: string;
  shortDescription?: string;
  description?: string;
  specs?: string[];
  availability?: StorefrontAvailability;
  labels?: StorefrontProductLabel[];
  isFeatured?: boolean;
  isOnSale?: boolean;
  isNew?: boolean;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};
