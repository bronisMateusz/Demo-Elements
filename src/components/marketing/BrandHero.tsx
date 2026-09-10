import { cn } from "../../lib/cn";
import {
  pageIntroHeroTopPaddingClassName,
  pageIntroTitleClassName,
} from "../../lib/layoutTokens";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import type { ProductImage } from "../../types/product";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { HeroImageMarquee } from "./HeroImageMarquee";

type BrandHeroBaseProps = {
  title: string;
  titleId?: string;
  /** Optional label above the H1 (Architect Zone). */
  eyebrow?: string;
  lead: string;
  askLabel: string;
  /** Primary CTA as button. Prefer over `askHref` when both are set. */
  onAsk?: () => void;
  /** Primary CTA as in-page / external link when `onAsk` is omitted. */
  askHref?: string;
  productsLabel: string;
  productsHref: string;
  logoSrc?: string;
  className?: string;
};

type BrandHeroSingleImageProps = BrandHeroBaseProps & {
  image: ProductImage;
  gallery?: never;
};

type BrandHeroGalleryProps = BrandHeroBaseProps & {
  image?: ProductImage;
  gallery: {
    columnOne: readonly ProductImage[];
    columnTwo: readonly ProductImage[];
  };
};

export type BrandHeroProps = BrandHeroSingleImageProps | BrandHeroGalleryProps;

export function BrandHero({
  title,
  titleId = "brand-hero-title",
  eyebrow,
  lead,
  askLabel,
  onAsk,
  askHref,
  productsLabel,
  productsHref,
  image,
  gallery,
  logoSrc,
  className,
}: BrandHeroProps) {
  const primaryCta = onAsk ? (
    <Button
      as="button"
      type="button"
      variant="primary"
      size="lg"
      onClick={onAsk}
    >
      {askLabel}
    </Button>
  ) : (
    <Button href={askHref ?? "#"} variant="primary" size="lg">
      {askLabel}
    </Button>
  );

  return (
    <section aria-labelledby={titleId} className={className}>
      <Container size="content">
        <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div
            className={cn(
              "order-1 min-w-0 lg:col-start-1",
              pageIntroHeroTopPaddingClassName,
            )}
          >
            {logoSrc ? (
              <img
                src={logoSrc}
                alt=""
                className="mb-5 max-h-16 max-w-50 object-contain"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            ) : null}
            {!logoSrc && eyebrow ? (
              <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
            ) : null}
            {logoSrc ? (
              <h1 id={titleId} className="sr-only">
                {title}
              </h1>
            ) : (
              <h1
                id={titleId}
                className={cn(pageIntroTitleClassName, "max-w-4xl")}
              >
                {title}
              </h1>
            )}
            <p
              className={cn(
                "m-0 max-w-[52ch] font-heading text-lg font-light leading-relaxed text-neutral-600",
                !logoSrc && "mt-4",
              )}
            >
              {lead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryCta}
              <Button href={productsHref} variant="secondary" size="lg">
                {productsLabel}
              </Button>
            </div>
          </div>

          {gallery ? (
            <HeroImageMarquee
              className="order-2 min-w-0 w-full"
              columnOne={gallery.columnOne}
              columnTwo={gallery.columnTwo}
            />
          ) : image ? (
            <div className="relative order-2 min-w-0 w-full overflow-hidden rounded-xs bg-neutral-100 aspect-4/3">
              <img
                src={image.src}
                alt={image.alt}
                className="absolute inset-0 size-full max-w-none object-cover"
                style={{ objectPosition: productImageObjectPosition(image) }}
              />
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
