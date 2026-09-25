import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { assetUrl } from "../../app/assets";
import { cn } from "../../lib/cn";
import {
  pxGutterClassName,
  sectionBandPaddingClassName,
} from "../../lib/layoutTokens";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import { Section } from "../structural/Section";
import { TextRevealLead } from "../motion/TextRevealLead";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { iconButtonClassName } from "../ui/iconButtonClassName";
import "swiper/css";

/** Desktop: exactly four equal cards inside the content rail. */
const DESKTOP_VISIBLE = 4;

/** Controlled system graphic when an item has no photo. */
const EDITORIAL_IMAGE_FALLBACK = {
  src: assetUrl("home/about-salon.png"),
  alt: "",
  fit: "cover" as const,
};

export type EditorialCardItem = {
  id: string;
  title: string;
  href: string;
  /** Kept for data sources; not rendered in the Porcelanosa card schema. */
  excerpt?: string;
  date?: string;
  image?: {
    src: string;
    alt: string;
    fit?: "cover" | "contain";
    focalPoint?: { x: number; y: number };
  } | null;
};

type EditorialCarouselProps = {
  id?: string;
  title: string;
  titleId?: string;
  /** Optional lead under the section title. */
  lead?: string;
  items: EditorialCardItem[];
  seeAll?: { label: string; href: string };
  a11yPrevLabel?: string;
  a11yNextLabel?: string;
};

function EditorialCard({ item }: { item: EditorialCardItem }) {
  const image = item.image?.src ? item.image : EDITORIAL_IMAGE_FALLBACK;
  const isExternal = item.href.startsWith("http") || item.href === "#";

  const body = (
    <>
      <div className="relative aspect-16/10 overflow-hidden bg-neutral-200">
        <img
          src={image.src}
          alt={image.alt}
          className={cn(
            "size-full transition-transform duration-slow ease-luxury group-hover/editorial:scale-105",
            image.fit === "contain" ? "object-contain" : "object-cover",
          )}
          style={{
            objectPosition: productImageObjectPosition(image),
          }}
          loading="lazy"
          draggable={false}
        />
      </div>
      <div className="flex grow flex-col gap-2.5 pt-5">
        {item.date ? (
          <span className="font-body text-sm tracking-[0.04em] text-neutral-500 uppercase md:text-ui">
            {item.date}
          </span>
        ) : null}
        <span className="line-clamp-2 font-heading text-lg leading-snug font-medium text-neutral-900 md:text-xl">
          {item.title}
        </span>
        <span className="mt-auto inline-flex items-center gap-1 pt-4 font-body text-sm font-medium text-gold-700 transition-colors group-hover/editorial:text-gold-500">
          Czytaj dalej
          <i className="ph ph-arrow-right text-sm" aria-hidden="true" />
        </span>
      </div>
    </>
  );

  const cardClassName = cn(
    "group/editorial flex h-full flex-col no-underline",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
  );

  if (isExternal) {
    return (
      <a href={item.href} className={cardClassName}>
        {body}
      </a>
    );
  }

  return (
    <Link to={item.href} className={cardClassName}>
      {body}
    </Link>
  );
}

function NavButtons({
  a11yPrevLabel,
  a11yNextLabel,
  atStart,
  atEnd,
  onPrev,
  onNext,
  className,
}: {
  a11yPrevLabel: string;
  a11yNextLabel: string;
  atStart: boolean;
  atEnd: boolean;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}) {
  return (
    <div className={cn("flex shrink-0 items-center gap-2", className)}>
      <button
        type="button"
        className={iconButtonClassName({
          variant: "elevated",
          className: cn(
            "border border-neutral-300 bg-neutral-0 shadow-none",
            atStart && "opacity-35",
          ),
        })}
        aria-label={a11yPrevLabel}
        aria-disabled={atStart}
        disabled={atStart}
        onClick={onPrev}
      >
        <i className="ph ph-caret-left" aria-hidden="true" />
      </button>
      <button
        type="button"
        className={iconButtonClassName({
          variant: "elevated",
          className: cn(
            "border border-neutral-300 bg-neutral-0 shadow-none",
            atEnd && "opacity-35",
          ),
        })}
        aria-label={a11yNextLabel}
        aria-disabled={atEnd}
        disabled={atEnd}
        onClick={onNext}
      >
        <i className="ph ph-caret-right" aria-hidden="true" />
      </button>
    </div>
  );
}

/**
 * Editorial / news rail - gray band + card track.
 * Title stays on the content rail; cards span page gutters.
 */
export function EditorialCarousel({
  id,
  title,
  titleId = "editorial-carousel-title",
  lead,
  items,
  seeAll,
  a11yPrevLabel = "Poprzednie",
  a11yNextLabel = "Następne",
}: EditorialCarouselProps) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [atStart, setAtStart] = useState(() => items.length <= 1);
  const [atEnd, setAtEnd] = useState(false);

  const itemCount = items.length;
  const canNavigate = itemCount > 1;
  const enableLoop = canNavigate;

  const syncEdges = useCallback(
    (instance: SwiperInstance) => {
      if (enableLoop) {
        setAtStart(false);
        setAtEnd(false);
        return;
      }
      setAtStart(instance.isBeginning);
      setAtEnd(instance.isEnd);
    },
    [enableLoop],
  );

  const slidePrev = useCallback(() => {
    swiper?.slidePrev();
  }, [swiper]);
  const slideNext = useCallback(() => {
    swiper?.slideNext();
  }, [swiper]);

  return (
    <Section id={id} ariaLabelledby={titleId} className="overflow-x-clip">
      <div className={cn("relative", sectionBandPaddingClassName)}>
        {/* Full-height gray band - desktop: ends at mid of the 3rd of 4 tiles. */}
        <div
          className="absolute inset-y-0 inset-s-0 z-0 w-[calc(clamp(0.75rem,2.222vw,2.5rem)+0.625*(100%-2*clamp(0.75rem,2.222vw,2.5rem)))] bg-neutral-200 max-lg:inset-e-1/4 max-lg:w-auto"
          aria-hidden="true"
        />

        <Container size="content" className="relative z-10">
          <div
            className="mb-6 flex items-end justify-between gap-6 md:mb-12"
            aria-labelledby={titleId}
          >
            <div className="min-w-0 max-w-3xl">
              <TextRevealLead
                id={titleId}
                revealUnit="word"
                className="min-w-0"
                typographyClassName="font-heading text-h2 leading-[1.1] tracking-tight font-medium"
                mutedClassName="text-neutral-900/20"
                fillClassName="text-neutral-900"
              >
                {title}
              </TextRevealLead>
              {lead ? (
                <p className="mt-3 mb-0 max-w-prose font-body text-ui leading-relaxed text-neutral-600">
                  {lead}
                </p>
              ) : null}
            </div>

            {canNavigate ? (
              <NavButtons
                a11yPrevLabel={a11yPrevLabel}
                a11yNextLabel={a11yNextLabel}
                atStart={atStart}
                atEnd={atEnd}
                onPrev={slidePrev}
                onNext={slideNext}
              />
            ) : null}
          </div>
        </Container>

        <div className={cn("relative z-10", pxGutterClassName)}>
          <Swiper
            className={cn(
              "w-full touch-pan-y overflow-hidden touch-[pan-y_pinch-zoom]",
              "[&_.swiper-slide]:h-auto!",
            )}
            modules={[A11y, Mousewheel]}
            watchOverflow={!enableLoop}
            loop={enableLoop}
            loopAdditionalSlides={
              enableLoop ? Math.max(itemCount, DESKTOP_VISIBLE) : 0
            }
            slidesPerView={1.14}
            slidesPerGroup={1}
            spaceBetween={16}
            speed={480}
            allowTouchMove={canNavigate}
            focusableElements="input, select, option, textarea, video, label"
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: DESKTOP_VISIBLE,
                spaceBetween: 24,
              },
            }}
            mousewheel={
              canNavigate
                ? {
                    forceToAxis: true,
                    releaseOnEdges: !enableLoop,
                    sensitivity: 0.85,
                  }
                : false
            }
            onSwiper={(instance) => {
              setSwiper(instance);
              syncEdges(instance);
            }}
            onSlideChange={syncEdges}
            onResize={syncEdges}
            onSlidesUpdated={syncEdges}
            a11y={{
              prevSlideMessage: a11yPrevLabel,
              nextSlideMessage: a11yNextLabel,
            }}
          >
            {items.map((item) => (
              <SwiperSlide key={item.id} className="h-auto!">
                <EditorialCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {seeAll ? (
          <Container size="content" className="relative z-10">
            <div className="mt-8 flex justify-center md:mt-10">
              <Button
                href={seeAll.href}
                variant="secondary"
                className="w-fit"
                ariaLabel={seeAll.label}
              >
                {seeAll.label}
                <i className="ph ph-arrow-right" aria-hidden="true" />
              </Button>
            </div>
          </Container>
        ) : null}
      </div>
    </Section>
  );
}
