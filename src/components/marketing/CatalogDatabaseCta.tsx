import { LocateCta, type LocateCtaImage } from "./LocateCta";

export type CatalogDatabaseCtaContent = {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  image: LocateCtaImage;
  eyebrow?: string;
  note?: string;
  /** @deprecated Unused - kept optional for existing data shapes. */
  slogan?: readonly [string, string];
};

type CatalogDatabaseCtaProps = CatalogDatabaseCtaContent & {
  className?: string;
  /** When false, wraps in section + Container (page-level promo). Default: embedded card only. */
  embedded?: boolean;
  titleId?: string;
  sectionId?: string;
};

/** Split-media catalog / downloads promo (architect zone + downloads page). */
export function CatalogDatabaseCta({
  title,
  description,
  ctaLabel,
  href,
  image,
  eyebrow,
  note,
  className,
  embedded = true,
  titleId = "architect-catalog-cta-title",
  sectionId,
}: CatalogDatabaseCtaProps) {
  const isExternal = /^https?:\/\//i.test(href);

  return (
    <LocateCta
      embedded={embedded}
      sectionId={sectionId}
      eyebrow={eyebrow}
      title={title}
      titleId={titleId}
      description={description}
      note={note}
      ctaLabel={ctaLabel}
      ctaHref={href}
      ctaTarget={isExternal ? "_blank" : undefined}
      ctaRel={isExternal ? "noopener noreferrer" : undefined}
      image={image}
      className={className}
    />
  );
}
