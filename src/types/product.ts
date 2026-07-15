export type ProductBadge = {
  label: string;
  variant?: "default" | "gold" | "brand" | "outline";
};

export type ProductImageFocalPoint = {
  /** Horizontal focal axis (0–100), Drupal Focal Point convention. */
  x: number;
  /** Vertical focal axis (0–100), Drupal Focal Point convention. */
  y: number;
};

export type ProductImage = {
  src: string;
  alt: string;
  /** Optional focus point — maps 1:1 to Drupal 11 media focal point. */
  focalPoint?: ProductImageFocalPoint;
};

export type ProductPrice = {
  current: string;
  previous?: string;
  discount?: string;
  note?: string;
  legalNote?: string;
};

export type ProductVariantOption = {
  id: string;
  label: string;
  swatch?: string;
  image?: ProductImage;
  unavailable?: boolean;
  unavailableNote?: string;
};

export type ProductVariantAxis = {
  id: string;
  label: string;
  type: "chip" | "swatch" | "thumbnail";
  options: ProductVariantOption[];
};

export type ProductVariantCombination = {
  selection: Record<string, string>;
  sku: string;
  title: string;
  price: ProductPrice;
  available?: boolean;
  availabilityNote?: string;
};

export type ProductVariants = {
  axes: ProductVariantAxis[];
  combinations: ProductVariantCombination[];
  defaultSelection: Record<string, string>;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductDownload = {
  title: string;
  format: string;
  size: string;
  href: string;
};

export type ProductFeature = {
  title: string;
  description: string;
  image?: ProductImage;
};

export type RelatedProduct = {
  id: string;
  brand: string;
  title: string;
  image: ProductImage;
  /** Extra shots — carousel on card hover (OKA prd-Card). */
  images?: ProductImage[];
  href: string;
  hasStorage?: boolean;
  price?: string;
  subtitle?: string;
  badge?: ProductBadge;
  swatch?: ProductImage;
  colorCount?: number;
  sizeCount?: number;
};

export type InspirationArrangement = {
  id: string;
  title: string;
  image: ProductImage;
  items: string[];
};

export type Product = {
  id: string;
  slug: string;
  brand: string;
  title: string;
  sku: string;
  badges: ProductBadge[];
  variants?: ProductVariants;
  price: ProductPrice;
  cta: {
    label: string;
    /** Intro copy for ask-row (e.g. "Interesuje Cię ten produkt?"). */
    lead?: string;
    /** Highlighted CTA fragment (e.g. "Zadaj pytanie"). */
    actionLabel?: string;
    href: string;
    secondaryLabel?: string;
    secondaryHref?: string;
  };
  salonCard?: {
    eyebrow: string;
    description: string;
    href: string;
    label: string;
  };
  images: ProductImage[];
  seriesTitle: string;
  seriesProducts: RelatedProduct[];
  editorial: {
    eyebrow: string;
    title: string;
    lead: string;
    paragraphs: string[];
    features: ProductFeature[];
  };
  specifications: ProductSpec[];
  downloads: ProductDownload[];
  architectCta: {
    title: string;
    description: string;
    href: string;
    label: string;
  };
  inspirations: InspirationArrangement[];
  visualizationCta: {
    title: string;
    href: string;
    label: string;
  };
  similarProducts: RelatedProduct[];
  recentlyViewedProducts?: RelatedProduct[];
  breadcrumbs: { label: string; to?: string }[];
};
