export type ProductBadge = {
  label: string;
  variant?: "default" | "gold" | "brand" | "outline";
};

export type ProductImageFocalPoint = {
  /** Pozioma oś kadrowania (0–100), zgodna z konwencją Drupal Focal Point. */
  x: number;
  /** Pionowa oś kadrowania (0–100), zgodna z konwencją Drupal Focal Point. */
  y: number;
};

export type ProductImage = {
  src: string;
  alt: string;
  /** Opcjonalny punkt ostrości — mapowany 1:1 na Drupal 11 media focal point. */
  focalPoint?: ProductImageFocalPoint;
};

export type ProductPrice = {
  current: string;
  previous?: string;
  discount?: string;
  note?: string;
  legalNote?: string;
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
};

export type RelatedProduct = {
  id: string;
  brand: string;
  title: string;
  image: ProductImage;
  href: string;
  hasStorage?: boolean;
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
  price: ProductPrice;
  cta: {
    label: string;
    href: string;
    secondaryLabel?: string;
    secondaryHref?: string;
  };
  offerNote?: {
    title: string;
    description: string;
  };
  images: ProductImage[];
  seriesTitle: string;
  seriesProducts: RelatedProduct[];
  editorial: {
    eyebrow: string;
    title: string;
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
  breadcrumbs: { label: string; to?: string }[];
};
