import type { ProductImage, RelatedProduct } from "./product";

export type ListingFacetKey =
  "brand" | "collection" | "purpose" | "mount" | "size" | "structure" | "color";

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
  /** Large bento tile (2×2) - same mosaic as SubcategoryBento. */
  featured?: boolean;
};

/** In-grid magazine / campaign promo cell on the PLP product grid. */
export type ListingGridPromo = {
  /** Prefer a multiple of 6 (LCM of 2- and 3-col grids) so a full-width promo leaves no empty cells. */
  afterIndex: number;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  image: ProductImage;
};
