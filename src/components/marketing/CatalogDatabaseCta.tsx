import { LocateCta, type LocateCtaImage } from "./LocateCta";

export type CatalogDatabaseCtaContent = {
  slogan: readonly [string, string];
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  image: LocateCtaImage;
};

type CatalogDatabaseCtaProps = CatalogDatabaseCtaContent & {
  className?: string;
};

/** Split-media catalog database promo below architect download lists. */
export function CatalogDatabaseCta({
  slogan,
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
      slogan={slogan}
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
