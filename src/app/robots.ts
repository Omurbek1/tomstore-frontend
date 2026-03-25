import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/storefront/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/cart",
          "/checkout",
          "/wishlist",
          "/signin",
          "/signup",
          "/my-account",
          "/mail-success",
          "/error",
          "/shop-without-sidebar",
          "/blogs/blog-grid-with-sidebar",
          "/blogs/blog-details-with-sidebar",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
