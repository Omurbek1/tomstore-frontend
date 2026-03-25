import type { Metadata } from "next";
import { buildAbsoluteUrl, getSiteUrl } from "@/storefront/site";

export const DEFAULT_SEO_TITLE = "TOMSTORE";
export const DEFAULT_SEO_DESCRIPTION =
  "TOMSTORE — интернет-магазин ноутбуков, принтеров, компьютеров и аксессуаров с доставкой по Кыргызстану.";

const DEFAULT_OG_IMAGE = buildAbsoluteUrl("/images/hero/hero-01.png");

export const getMetadataBase = () => {
  const siteUrl = getSiteUrl();

  try {
    return new URL(siteUrl);
  } catch {
    return new URL("http://127.0.0.1:3001");
  }
};

type BuildSeoMetadataParams = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  keywords?: string[];
};

export const buildSeoMetadata = ({
  title,
  description = DEFAULT_SEO_DESCRIPTION,
  path,
  image,
  noIndex = false,
  type = "website",
  keywords,
}: BuildSeoMetadataParams = {}): Metadata => {
  const canonicalUrl = path ? buildAbsoluteUrl(path) : getSiteUrl();
  const resolvedTitle = title || DEFAULT_SEO_TITLE;
  const resolvedImage = image || DEFAULT_OG_IMAGE;

  return {
    metadataBase: getMetadataBase(),
    title: resolvedTitle,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !noIndex,
      follow: true,
      googleBot: {
        index: !noIndex,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type,
      title: resolvedTitle,
      description,
      url: canonicalUrl,
      siteName: DEFAULT_SEO_TITLE,
      images: [
        {
          url: resolvedImage,
          width: 1200,
          height: 630,
          alt: resolvedTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [resolvedImage],
    },
  };
};

export const buildNoIndexMetadata = (
  title: string,
  description: string,
  path?: string,
): Metadata =>
  buildSeoMetadata({
    title,
    description,
    path,
    noIndex: true,
  });
