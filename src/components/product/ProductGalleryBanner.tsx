import { cn } from "../../lib/cn";
import { sectionBottomPaddingClassName } from "../../lib/layoutTokens";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import type { ProductImage } from "../../types/product";
import { splitMediaCtaButtonClassName } from "../structural/splitMediaCtaButtonClassName";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";

type ProductGalleryBannerProps = {
  eyebrow: string;
  title: string;
  titleId?: string;
  description?: string;
  href: string;
  label: string;
  image?: ProductImage;
  className?: string;
};

/** Split eyebrow into LocateCta-style two-line slogan when it has 2+ words. */
function sloganLines(eyebrow: string): [string, string | null] {
  const parts = eyebrow.trim().split(/\s+/).filter(Boolean);
  if (parts.length < 2) return [eyebrow, null];
  return [parts.slice(0, -1).join(" "), parts[parts.length - 1]!];
}

/** Collection promo band (PDP, above subnav) - same split layout as LocateCta. */
export function ProductGalleryBanner({
  eyebrow,
  title,
  titleId = "product-gallery-banner-title",
  description,
  href,
  label,
  image,
  className,
}: ProductGalleryBannerProps) {
  const [sloganLead, sloganTail] = sloganLines(eyebrow);

  const card = (
    <div
      className={cn(
        "group/banner grid overflow-hidden rounded-xs border border-neutral-800/10 bg-neutral-900",
        image && "lg:grid-cols-[0.82fr_1.18fr]",
      )}
    >
      {image ? (
        <div className="relative flex min-h-44 items-center px-6 py-8 md:min-h-52 md:px-10 md:py-10">
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
          <div
            className="absolute inset-0 bg-neutral-950/55"
            aria-hidden="true"
          />
          <p className="relative z-10 m-0 max-w-[18ch] font-body text-sm font-semibold tracking-[0.06em] text-neutral-0 uppercase md:text-base">
            {sloganLead}
            {sloganTail ? (
              <>
                <br />
                {sloganTail}
              </>
            ) : null}
          </p>
        </div>
      ) : null}

      <div
        className={cn(
          "relative flex flex-col items-start justify-center gap-3 overflow-hidden px-6 py-8 md:gap-4 md:px-10 md:py-10",
          image && "border-t border-neutral-0/10 md:border-t-0 md:border-s",
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-radial-[at_0%_0%] from-gold-500/22 to-transparent to-58%"
          aria-hidden="true"
        />
        {!image ? (
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
        <Button
          href={href}
          variant="primary"
          tone="onDark"
          size="lg"
          className={cn("relative mt-1", splitMediaCtaButtonClassName)}
        >
          {label}
          <i className="ph ph-arrow-right" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );

  return (
    <section
      aria-labelledby={titleId}
      className={cn(sectionBottomPaddingClassName, className)}
    >
      <Container size="content">{card}</Container>
    </section>
  );
}
