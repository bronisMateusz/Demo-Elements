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
  /** When false, wraps in section + Container (page-level promo). Default: embedded card only. */
  embedded?: boolean;
  titleId?: string;
};

/** Split-media catalog / downloads promo (architect zone + downloads page). */
export function CatalogDatabaseCta({
  title,
  description,
  ctaLabel,
  href,
  image,
  className,
  embedded = true,
  titleId = "architect-catalog-cta-title",
}: CatalogDatabaseCtaProps) {
  const isExternal = /^https?:\/\//i.test(href);

  return (
    <LocateCta
      embedded={embedded}
      title={title}
      titleId={titleId}
      description={description}
      ctaLabel={ctaLabel}
      ctaHref={href}
      ctaTarget={isExternal ? "_blank" : undefined}
      ctaRel={isExternal ? "noopener noreferrer" : undefined}
      image={image}
      className={className}
    />
  );
}
