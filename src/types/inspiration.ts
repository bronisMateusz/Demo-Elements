import type {
  ListingGridAdvisorCta,
  ListingGridLocateCta,
  ListingGridPromo,
} from "./listing";
import type {
  InspirationArrangement,
  ProductImage,
  RelatedProduct,
} from "./product";

export type InspirationListingItem = InspirationArrangement & {
  styleTags?: string[];
  producerTag?: string;
  /** Optional lead under the card title (producer gallery). */
  description?: string;
};

export type InspirationArticleSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  /** Extra copy after a bullet list within the same section. */
  paragraphsAfter?: string[];
  bullets?: string[];
  /** Optional closing credit line (e.g. project author). */
  credit?: string;
  /**
   * Inline gallery under the section copy. Breaks out of the prose column
   * to the content rail; opens ProductGalleryLightbox.
   */
  images?: ProductImage[];
};

export type InspirationArticleEmbed =
  | { type: "appointment"; afterSectionId: string }
  | { type: "magazine"; afterSectionId: string };

export type InspirationListingFilter = {
  id: string;
  label: string;
};

export type InspirationAdvisorCta = Omit<ListingGridAdvisorCta, "afterIndex">;

export type InspirationListingPageData = {
  title: string;
  description: string;
  breadcrumbs: { label: string; to?: string; current?: boolean }[];
  pageSize: number;
  filters: InspirationListingFilter[];
  items: InspirationListingItem[];
  locate?: {
    title: string;
    description: string;
    ctaLabel: string;
    image: ProductImage;
  };
  footerAdvisorCta?: InspirationAdvisorCta;
  gridLocateCta?: ListingGridLocateCta;
  gridAdvisorCta?: ListingGridAdvisorCta;
};

export type ArrangementsGalleryPageData = InspirationListingPageData & {
  gridPromo: ListingGridPromo;
};

export type InspirationArticlePageData = {
  title: string;
  metaDescription: string;
  lead: string;
  projectCredit: string;
  styleTags: { label: string; href: string }[];
  breadcrumbs: { label: string; to?: string; current?: boolean }[];
  heroImage: ProductImage;
  products: RelatedProduct[];
  sections: InspirationArticleSection[];
  embeds: InspirationArticleEmbed[];
  appointmentCta: {
    title: string;
    description: string;
    ctaLabel: string;
    image: ProductImage;
  };
  finalCta: {
    eyebrow: string;
    title: string;
    description: string;
    image: ProductImage;
    askLabel: string;
    bookLabel: string;
  };
  magazine: {
    id: string;
    eyebrow: string;
    title: string;
    description: string;
    image: ProductImage;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  relatedTitle: string;
  relatedArrangements: InspirationListingItem[];
};
