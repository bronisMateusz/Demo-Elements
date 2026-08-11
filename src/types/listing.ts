import type { RelatedProduct } from "./product";

export type ListingFacetKey =
  | "brand"
  | "collection"
  | "purpose"
  | "mount"
  | "size"
  | "structure"
  | "color";

export type ListingQuickFilter = "bestseller" | "outlet" | "new" | "promo";

export type ListingSortId = "popular" | "price-asc" | "price-desc" | "name";

export type ListingProductFlags = {
  bestseller?: boolean;
  outlet?: boolean;
  new?: boolean;
  promo?: boolean;
};

/** RelatedProduct plus facet metadata for PLP filtering. */
export type ListingProduct = RelatedProduct & {
  collection: string;
  purpose: string;
  mount: string;
  size: string;
  structure: string;
  color: string;
  flags: ListingProductFlags;
  /** Higher = more popular (default sort). */
  popularity: number;
};

export type ListingFacetOption = {
  value: string;
  label: string;
};

export type ListingFacetGroup = {
  key: ListingFacetKey;
  label: string;
  options: ListingFacetOption[];
};

export type ListingQuickFilterOption = {
  id: ListingQuickFilter;
  label: string;
  /** Same Badge variant as on product cards. */
  variant: "gold" | "brand" | "promo" | "neutral";
};

export type ListingSortOption = {
  id: ListingSortId;
  label: string;
};

export type ListingFilterState = {
  facets: Record<ListingFacetKey, string[]>;
  quick: ListingQuickFilter[];
  sort: ListingSortId;
};

export type ListingCuratedTile = {
  label: string;
  href: string;
  image: RelatedProduct["image"];
};
