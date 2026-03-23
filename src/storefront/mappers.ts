import type { Category } from "@/types/category";
import type { Product } from "@/types/product";
import type {
  StorefrontCategory,
  StorefrontProductCard,
  StorefrontProductDetails,
} from "@/storefront/types";

const CATEGORY_FALLBACK_IMAGES = [
  "/images/categories/categories-01.png",
  "/images/categories/categories-02.png",
  "/images/categories/categories-03.png",
  "/images/categories/categories-04.png",
  "/images/categories/categories-05.png",
  "/images/categories/categories-06.png",
  "/images/categories/categories-07.png",
];

const ensureGallery = (gallery: string[], fallback?: string) => {
  const unique = Array.from(new Set(gallery.filter(Boolean)));

  if (unique.length > 0) {
    return unique;
  }

  if (fallback) {
    return [fallback];
  }

  return ["/images/products/product-1-sm-1.png"];
};

export const mapStorefrontProductToProduct = (
  product: StorefrontProductCard | StorefrontProductDetails,
): Product => {
  const gallery = ensureGallery(product.gallery || [], product.mainImage);
  const discountedPrice = Number(product.price || 0);
  const originalPrice =
    product.oldPrice && Number(product.oldPrice) > discountedPrice
      ? Number(product.oldPrice)
      : discountedPrice;

  return {
    id: product.id,
    slug: product.slug,
    title: product.name,
    reviews: 0,
    price: originalPrice,
    discountedPrice,
    sku: product.sku,
    brand: product.brand,
    category: product.category,
    shortDescription: product.shortDescription,
    description:
      "fullDescription" in product ? product.fullDescription : product.shortDescription,
    availability: product.availability,
    labels: product.labels,
    isFeatured: product.isFeatured,
    isOnSale: product.isOnSale,
    isNew: product.isNew,
    imgs: {
      thumbnails: gallery,
      previews: gallery,
    },
  };
};

export const mapStorefrontProductsToProducts = (
  products: Array<StorefrontProductCard | StorefrontProductDetails>,
) => products.map(mapStorefrontProductToProduct);

export const mapStorefrontCategoryToCategory = (
  category: StorefrontCategory,
  index = 0,
): Category => ({
  id: category.slug,
  slug: category.slug,
  title: category.name,
  totalProducts: category.totalProducts,
  img:
    category.image ||
    CATEGORY_FALLBACK_IMAGES[index % CATEGORY_FALLBACK_IMAGES.length],
});

export const mapStorefrontCategoriesToCategories = (
  categories: StorefrontCategory[],
) => categories.map((category, index) => mapStorefrontCategoryToCategory(category, index));
