import type { CatalogHubSeoContent } from "@/seo/content";
import { buildAbsoluteUrl } from "@/storefront/site";
import {
  buildBrandPath,
  buildCategoryPath,
} from "@/storefront/catalog-routing";
import type { StorefrontBrand, StorefrontCategory } from "@/storefront/types";
import CatalogHubSection from "./CatalogHubSection";

type CatalogHubPageProps = {
  content: CatalogHubSeoContent;
  items: Array<StorefrontCategory | StorefrontBrand>;
  type: "category" | "brand";
  path: string;
  homeLabel: string;
  sectionLabel: string;
  sectionHref: string;
  currentLabel: string;
};

export default function CatalogHubPage({
  content,
  items,
  type,
  path,
  homeLabel,
  sectionLabel,
  sectionHref,
  currentLabel,
}: CatalogHubPageProps) {
  const collectionStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: content.metaTitle,
    description: content.metaDescription,
    url: buildAbsoluteUrl(path),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: buildAbsoluteUrl(
          type === "category"
            ? buildCategoryPath(item.slug)
            : buildBrandPath(item.slug),
        ),
        name: item.name,
      })),
    },
  };
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeLabel,
        item: buildAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: sectionLabel,
        item: buildAbsoluteUrl(sectionHref),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: currentLabel,
        item: buildAbsoluteUrl(path),
      },
    ],
  };
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      <CatalogHubSection content={content} type={type} items={items} />
    </>
  );
}
