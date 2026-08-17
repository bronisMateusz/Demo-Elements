export type ProductBadge = {
  label: string;
  variant?: "default" | "gold" | "brand" | "outline" | "promo" | "neutral";
  /** Listing / filter target - badges in the buy box render as links. */
  href?: string;
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
  /** Optional focus point - maps 1:1 to Drupal 11 media focal point. */
  focalPoint?: ProductImageFocalPoint;
  /**
   * How the image fills gallery frames.
   * `contain` (default) = packshot, no crop.
   * `cover` = lifestyle / scene - fills the frame.
   */
  fit?: "contain" | "cover";
};

export type ProductPrice = {
  current: string;
  previous?: string;
  discount?: string;
  note?: string;
  /** Omnibus - lowest price in the 30 days before the reduction (may differ from `previous`). */
  lowestPrice30Days?: string;
  legalNote?: string;
};

export type ProductVariantOption = {
  id: string;
  label: string;
  image?: ProductImage;
  unavailable?: boolean;
  unavailableNote?: string;
};

export type ProductVariantAxis = {
  id: string;
  label: string;
  type: "chip" | "thumbnail";
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
  /** Phosphor class, e.g. `ph ph-drop`. Preferred over lifestyle photos. */
  iconClass?: string;
  image?: ProductImage;
};

export type RelatedProduct = {
  id: string;
  brand: string;
  title: string;
  image: ProductImage;
  /** Extra shots - carousel on card hover (OKA prd-Card). */
  images?: ProductImage[];
  href: string;
  hasStorage?: boolean;
  price?: string;
  pricePrevious?: string;
  subtitle?: string;
  badge?: ProductBadge;
  /** When set, product cards show all badges (listing multi-flag products). */
  badges?: ProductBadge[];
  swatch?: ProductImage;
  colorCount?: number;
  sizeCount?: number;
};

export type InspirationArrangement = {
  id: string;
  title: string;
  image: ProductImage;
  /** Short bullets under the card / PDP inspiration slide. */
  items: string[];
  /** Products shown in the arrangement products drawer (galeria-aranzacji). */
  products?: RelatedProduct[];
  /** Whole card links to an article (inspiracje-listing pattern). */
  href?: string;
  /**
   * Show “Pokaż produkty” chip instead of lightbox loupe
   * (galeria-aranzacji pattern). Ignored when `href` is set.
   */
  showProducts?: boolean;
};

export type Product = {
  id: string;
  slug: string;
  brand: string;
  title: string;
  /** Collection name linked inside the PDP title (e.g. “Montebianco”). */
  collection?: {
    name: string;
    href: string;
  };
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
  /** Optional promo strip under the PDP gallery carousel. */
  galleryBanner?: {
    eyebrow: string;
    title: string;
    description?: string;
    href: string;
    label: string;
    image?: ProductImage;
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
    eyebrow?: string;
    image: ProductImage;
    /** Path under `assets/` - looped background video for the media panel. */
    video?: string;
  };
  inspirations: InspirationArrangement[];
  visualizationCta: {
    title: string;
    description?: string;
    href: string;
    label: string;
    note?: string;
    eyebrow?: string;
    image: ProductImage;
    secondary?: {
      href: string;
      label: string;
    };
  };
  similarProducts: RelatedProduct[];
  recentlyViewedProducts?: RelatedProduct[];
  breadcrumbs: { label: string; to?: string }[];
};
