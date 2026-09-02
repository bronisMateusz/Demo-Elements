import { cn } from "../../lib/cn";
import { requestSalonDrawer } from "../../hooks/useSelectedSalon";
import { sectionMarginYClassName } from "../../lib/layoutTokens";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import { splitMediaCtaButtonClassName } from "../structural/splitMediaCtaButtonClassName";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";

export type LocateCtaImage = {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
  focalPoint?: { x: number; y: number };
};

type LocateCtaBaseProps = {
  title: string;
  titleId?: string;
  description?: string;
  /** Shown only when there is no image (e.g. PDP collection band without media). */
  eyebrow?: string;
  ctaLabel: string;
  /** Optional media column - when omitted, copy panel is full width. */
  image?: LocateCtaImage;
  className?: string;
  /** Renders only the split card (no section padding / outer container). */
  embedded?: boolean;
  /** Adds page section vertical margin (PDP gallery banner). */
  sectionMargin?: boolean;
};

type LocateCtaLinkProps = LocateCtaBaseProps & {
  ctaHref: string;
  ctaTarget?: "_blank" | "_self";
  ctaRel?: string;
  onCtaClick?: never;
};

type LocateCtaActionProps = LocateCtaBaseProps & {
  ctaHref?: never;
  ctaTarget?: never;
  ctaRel?: never;
  onCtaClick?: () => void;
};

export type LocateCtaProps = LocateCtaLinkProps | LocateCtaActionProps;

/**
 * Dark split CTA - home/category appointment band, architect catalog promo,
 * and PDP collection banner (optional image).
 */
export function LocateCta({
  title,
  titleId = "locate-cta-title",
  description,
  eyebrow,
  ctaLabel,
  image,
  className,
  embedded = false,
  sectionMargin = false,
  ...actionOrLink
}: LocateCtaProps) {
  const ctaHref = "ctaHref" in actionOrLink ? actionOrLink.ctaHref : undefined;
  const ctaTarget =
    "ctaTarget" in actionOrLink ? actionOrLink.ctaTarget : undefined;
  const ctaRel = "ctaRel" in actionOrLink ? actionOrLink.ctaRel : undefined;
  const onCtaClick =
    "onCtaClick" in actionOrLink ? actionOrLink.onCtaClick : undefined;

  const card = (
    <div
      className={cn(
        "group/locate grid overflow-hidden rounded-xs bg-neutral-900",
        image && "lg:grid-cols-[0.82fr_1.18fr]",
      )}
    >
      {image ? (
        <div className="relative min-h-44 md:min-h-52">
          <img
            src={image.src}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover"
            style={{ objectPosition: productImageObjectPosition(image) }}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>
      ) : null}

      <div
        className={cn(
          "relative flex flex-col items-start justify-center gap-3 overflow-hidden px-6 py-6 md:gap-4 md:px-10 md:py-12 lg:px-12",
          image && "border-t border-neutral-0/10 md:border-t-0 md:border-s",
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-radial-[at_0%_0%] from-gold-500/22 to-transparent to-58%"
          aria-hidden="true"
        />
        {!image && eyebrow ? (
          <p className="relative m-0 font-body text-sm font-semibold tracking-[0.06em] text-gold-400 uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2
          id={titleId}
          className="relative m-0 font-heading text-[clamp(1.125rem,1.75vw,1.375rem)] leading-[1.1] tracking-tight text-neutral-0"
        >
          {title}
        </h2>
        {description ? (
          <p className="relative m-0 max-w-prose font-body text-sm leading-relaxed text-neutral-400">
            {description}
          </p>
        ) : null}
        {ctaHref ? (
          <Button
            href={ctaHref}
            target={ctaTarget}
            rel={ctaRel}
            variant="primary"
            tone="onDark"
            size="lg"
            className={cn("relative mt-1", splitMediaCtaButtonClassName)}
          >
            {ctaLabel}
            <i className="ph ph-arrow-right" aria-hidden="true" />
          </Button>
        ) : (
          <Button
            as="button"
            type="button"
            variant="primary"
            tone="onDark"
            size="lg"
            className={cn("relative mt-1", splitMediaCtaButtonClassName)}
            onClick={onCtaClick ?? requestSalonDrawer}
          >
            {ctaLabel}
          </Button>
        )}
      </div>
    </div>
  );

  if (embedded) {
    return <div className={className}>{card}</div>;
  }

  return (
    <section
      aria-labelledby={titleId}
      className={cn(sectionMargin && sectionMarginYClassName, className)}
    >
      <Container size="content">{card}</Container>
    </section>
  );
}
