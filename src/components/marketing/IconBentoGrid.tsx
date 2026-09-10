import { cn } from "../../lib/cn";
import { assetUrl } from "../../app/assets";
import { pdpSectionScrollMarginClassName } from "../../constants/pdpSubnav";
import { sectionHeaderTrackGapClassName } from "../../lib/layoutTokens";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import type { ProductImage } from "../../types/product";
import { TextRevealLead } from "../motion/TextRevealLead";
import { Section } from "../structural/Section";
import { Container } from "../ui/Container";
import { ArcStack, type ArcStackImage } from "./ArcStack";
import { BrandLogoMarquee, type BrandLogoItem } from "./BrandLogoMarquee";
import { OverlapPhotos } from "./OverlapPhotos";

export type IconBentoItem = {
  title: string;
  text: string;
  /** Optional Phosphor class - prefer media over icons in bento. */
  iconClass?: string;
  /** Full-bleed photo (poster when `video` is set). */
  image?: ProductImage;
  /** Path under `assets/` - looped background video. */
  video?: string;
  /** Brand logo marquee (HomeBrands-style rectangular cells). */
  logos?: readonly BrandLogoItem[];
  /** beUI-style arc stack of sample / product photos. */
  arcStack?: readonly ArcStackImage[];
  /** Baseframe-style overlapping photo pair. */
  overlapPhotos?: {
    back: ProductImage;
    front: ProductImage;
  };
};

type IconBentoGridProps = {
  id: string;
  titleId: string;
  title: string;
  items: readonly IconBentoItem[];
  className?: string;
};

/** Baseframe bento-1: 5-col with alternating 3/2 spans; featured cells on dark / media. */
const BENTO_COL_SPAN = [
  "md:col-span-3",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-3",
  "md:col-span-3",
  "md:col-span-2",
] as const;

const BENTO_FEATURED = [true, false, false, true, true, false] as const;

/** Fixed tile height so every bento row matches (Baseframe-style equal bands). */
const bentoTileHeightClassName = "min-h-80 md:h-128 md:min-h-128";

function BentoTile({
  item,
  featured,
  className,
}: {
  item: IconBentoItem;
  featured: boolean;
  className?: string;
}) {
  const reducedMotion = useMotionReduced();
  const onDark = featured;
  const hasImage = Boolean(item.image);
  const hasVideo = Boolean(item.video);
  const showVideo = hasVideo && !reducedMotion;
  const hasMedia = hasImage || showVideo;
  const hasLogos = Boolean(item.logos?.length);
  const hasArcStack = Boolean(item.arcStack?.length);
  const hasOverlap = Boolean(item.overlapPhotos);
  const hasAside = hasLogos || hasArcStack || hasOverlap;
  const textOnMedia = onDark || hasMedia;

  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-xs",
        onDark && !hasMedia && "bg-neutral-900",
        !onDark && "bg-gold-50",
        className,
      )}
    >
      {hasMedia ? (
        <div className="absolute inset-0" aria-hidden="true">
          {showVideo ? (
            <video
              className="absolute inset-0 size-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              poster={item.image?.src}
            >
              <source src={assetUrl(item.video!)} type="video/mp4" />
            </video>
          ) : item.image ? (
            <img
              src={item.image.src}
              alt=""
              className="absolute inset-0 size-full object-cover"
              style={{ objectPosition: productImageObjectPosition(item.image) }}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          ) : null}
          <div className="absolute inset-0 bg-linear-to-b from-neutral-900/88 via-neutral-900/55 to-neutral-900/30" />
        </div>
      ) : null}

      <div className="relative z-10 flex h-full min-h-0 flex-col">
        <div
          className={cn(
            "flex max-w-md flex-col gap-2 p-8 md:p-12",
            hasAside && "pb-4 md:pb-5",
          )}
        >
          {item.iconClass ? (
            <i
              className={cn(
                item.iconClass,
                "mb-1 shrink-0 text-3xl leading-none",
                textOnMedia ? "text-neutral-0" : "text-neutral-900",
              )}
              aria-hidden="true"
            />
          ) : null}
          <p
            className={cn(
              "m-0 font-heading text-h3 leading-[1.15] font-medium tracking-tight text-balance",
              textOnMedia ? "text-neutral-0" : "text-neutral-900",
            )}
          >
            {item.title}
          </p>
          <p
            className={cn(
              "m-0 max-w-96 font-body text-ui leading-relaxed",
              textOnMedia ? "text-neutral-0/90" : "text-neutral-600",
            )}
          >
            {item.text}
          </p>
        </div>

        {hasLogos && item.logos ? (
          <div className="mt-auto w-full shrink-0 pb-6 md:pb-8">
            <BrandLogoMarquee
              logos={item.logos}
              className="rounded-none border-x-0"
            />
          </div>
        ) : null}

        {hasArcStack && item.arcStack ? (
          <div className="mt-auto flex min-h-0 w-full flex-1 flex-col justify-end pb-4 md:pb-6">
            <ArcStack images={item.arcStack} className="min-h-0 flex-1" />
          </div>
        ) : null}

        {hasOverlap && item.overlapPhotos ? (
          <div className="mt-auto flex min-h-0 w-full flex-1 flex-col justify-end px-6 pb-6 md:px-8 md:pb-8">
            <OverlapPhotos
              back={item.overlapPhotos.back}
              front={item.overlapPhotos.front}
              className="min-h-0 flex-1"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function IconBentoGrid({
  id,
  titleId,
  title,
  items,
  className,
}: IconBentoGridProps) {
  return (
    <Section
      id={id}
      ariaLabelledby={titleId}
      className={cn(pdpSectionScrollMarginClassName, className)}
    >
      <Container size="content">
        <TextRevealLead
          id={titleId}
          revealUnit="word"
          className={cn("max-w-3xl", sectionHeaderTrackGapClassName)}
          typographyClassName="font-heading text-h2 leading-[1.1] tracking-tight font-medium"
          mutedClassName="text-neutral-900/20"
          fillClassName="text-neutral-900"
        >
          {title}
        </TextRevealLead>

        <ul
          className={cn(
            "m-0 grid list-none grid-cols-1 items-stretch gap-4 p-0",
            "sm:grid-cols-2",
            "md:grid-cols-5",
          )}
        >
          {items.map((item, index) => {
            const featured = BENTO_FEATURED[index] ?? false;
            const span = BENTO_COL_SPAN[index] ?? "md:col-span-2";

            return (
              <li key={item.title} className={cn("flex min-h-0", span)}>
                <BentoTile
                  item={item}
                  featured={featured}
                  className={cn(bentoTileHeightClassName, "w-full grow")}
                />
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
