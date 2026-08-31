import { LocateCta, type LocateCtaImage } from "./LocateCta";

export type CatalogDatabaseCtaContent = {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  image: LocateCtaImage;
  /** @deprecated Unused - kept optional for existing data shapes. */
  slogan?: readonly [string, string];
};

type CatalogDatabaseCtaProps = CatalogDatabaseCtaContent & {
  className?: string;
};

/** Split-media catalog database promo below architect download lists. */
export function CatalogDatabaseCta({
  title,
  description,
  ctaLabel,
  href,
  image,
  className,
}: CatalogDatabaseCtaProps) {
  return (
    <LocateCta
      embedded
      title={title}
      titleId="architect-catalog-cta-title"
      description={description}
      ctaLabel={ctaLabel}
      ctaHref={href}
      ctaTarget="_blank"
      ctaRel="noopener noreferrer"
      image={image}
      className={className}
    />
  );
}
