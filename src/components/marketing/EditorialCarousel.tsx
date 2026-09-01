import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "../../lib/cn";
import {
  sectionHeaderTrackGapClassName,
  sectionMarginTopClassName,
} from "../../lib/layoutTokens";
import { formatSlideIndex } from "../../lib/formatSlideIndex";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import { useContentInsetPx } from "../../hooks/useContentInsetPx";
import { useGutterPx } from "../../hooks/useGutterPx";
import { Section } from "../structural/Section";
import { TextRevealLead } from "../motion/TextRevealLead";
import { Button } from "../ui/Button";
import { iconButtonClassName } from "../ui/iconButtonClassName";
import {
  productCarouselBleedWrapperClassName,
  productCarouselRootClassName,
  productCarouselSlideClassName,
  productCarouselSwiperClassName,
} from "../product/productCarouselClassName";
import "swiper/css";

export type EditorialCardItem = {
  id: string;
  title: string;
  excerpt: string;
  href: string;
  date?: string;
  image: {
    src: string;
    alt: string;
    fit?: "cover" | "contain";
    focalPoint?: { x: number; y: number };
  };
};

type EditorialCarouselProps = {
  id?: string;
  title: string;
  titleId?: string;
  items: EditorialCardItem[];
  seeAll?: { label: string; href: string };
  a11yPrevLabel?: string;
  a11yNextLabel?: string;
};

function createLoopTrack<T>(items: T[]) {
  if (items.length <= 1) {
    return { slides: items, middleStart: 0 };
  }

  const minimumCycles = Math.max(3, Math.ceil(20 / items.length));
  const cycleCount =
    minimumCycles % 2 === 0 ? minimumCycles + 1 : minimumCycles;
  const slides = Array.from({ length: cycleCount }, () => items).flat();

  return {
    slides,
    middleStart: Math.floor(cycleCount / 2) * items.length,
  };
}

export function EditorialCarousel({
  id,
  title,
  titleId = "editorial-carousel-title",
  items,
  seeAll,
  a11yPrevLabel = "Poprzednie",
  a11yNextLabel = "Następne",
}: EditorialCarouselProps) {
  const gutterPx = useGutterPx();
  const contentInsetPx = useContentInsetPx();
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const itemCount = items.length;
  const enableLoop = itemCount > 1;
  const { slides, middleStart } = useMemo(
    () => createLoopTrack(items),
    [items],
  );
  const swiperKey = `editorial-bleed-${contentInsetPx}-${slides.length}-${titleId}`;

  const syncEdges = (instance: SwiperInstance) => {
    setActiveIndex(
      itemCount > 0
        ? ((instance.activeIndex % itemCount) + itemCount) % itemCount
        : 0,
    );
  };

  const recenterLoop = (instance: SwiperInstance) => {
    if (!enableLoop) return;

    const index = instance.activeIndex;
    const nearStart = index < itemCount;
    const nearEnd = index >= slides.length - itemCount;
    if (!nearStart && !nearEnd) return;

    const logicalIndex = ((index % itemCount) + itemCount) % itemCount;
    instance.slideTo(middleStart + logicalIndex, 0, false);
  };

  const slidePrev = useCallback(() => {
    swiper?.slidePrev();
  }, [swiper]);
  const slideNext = useCallback(() => {
    swiper?.slideNext();
  }, [swiper]);

  return (
    <Section id={id} ariaLabelledby={titleId} className="overflow-x-clip">
      <div
        className={cn(productCarouselBleedWrapperClassName, "relative z-10")}
      >
        <div
          className={productCarouselRootClassName({ layout: "bleed" })}
          aria-labelledby={titleId}
        >
          <div
            className={cn(
              "mx-auto w-full max-w-384 px-[clamp(0.75rem,2.222vw,2.5rem)]",
              sectionHeaderTrackGapClassName,
            )}
          >
            <TextRevealLead
              id={titleId}
              revealUnit="word"
              className="min-w-0 max-w-2xl"
              typographyClassName="font-heading text-h2 leading-[1.1] tracking-tight font-medium"
              mutedClassName="text-neutral-900/20"
              fillClassName="text-neutral-900"
            >
              {title}
            </TextRevealLead>
          </div>

          <Swiper
            key={swiperKey}
            className={productCarouselSwiperClassName("bleed")}
            modules={[A11y, Mousewheel]}
            watchOverflow={!enableLoop}
            initialSlide={enableLoop ? middleStart : 0}
            slidesPerView="auto"
            slidesPerGroup={1}
            spaceBetween={5}
            speed={480}
            // Card links - keep out of focusableElements so drag still starts on them.
            focusableElements="input, select, option, textarea, video, label"
            slidesOffsetBefore={contentInsetPx}
            slidesOffsetAfter={gutterPx}
            mousewheel={{
              forceToAxis: true,
              releaseOnEdges: !enableLoop,
              sensitivity: 0.85,
            }}
            onSwiper={(instance) => {
              setSwiper(instance);
              syncEdges(instance);
            }}
            onSlideChange={syncEdges}
            onTransitionEnd={recenterLoop}
            onResize={syncEdges}
            onSlidesUpdated={syncEdges}
            a11y={{
              prevSlideMessage: a11yPrevLabel,
              nextSlideMessage: a11yNextLabel,
            }}
          >
            {slides.map((item, index) => {
              const isExternal =
                item.href.startsWith("http") || item.href === "#";
              const body = (
                <>
                  <div className="relative aspect-16/10 overflow-hidden bg-neutral-100">
                    <img
                      src={item.image.src}
                      alt={item.image.alt}
                      className="size-full object-cover transition-transform duration-slow ease-luxury group-hover/editorial:scale-105"
                      style={{
                        objectPosition: productImageObjectPosition(item.image),
                      }}
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 px-1 pt-4">
                    {item.date ? (
                      <span className="font-body text-xs tracking-[0.04em] text-neutral-500 uppercase">
                        {item.date}
                      </span>
                    ) : null}
                    <span className="line-clamp-2 font-heading text-lg leading-snug font-medium text-neutral-900">
                      {item.title}
                    </span>
                    <span className="line-clamp-2 font-body text-sm leading-relaxed text-neutral-600">
                      {item.excerpt}
                    </span>
                    <span className="mt-auto inline-flex items-center gap-1 pt-2 font-body text-sm font-medium text-gold-700 transition-colors group-hover/editorial:text-gold-500">
                      Czytaj dalej
                      <i
                        className="ph ph-arrow-right text-sm"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </>
              );

              const cardClassName = cn(
                "group/editorial flex h-full flex-col no-underline",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
              );

              return (
                <SwiperSlide
                  key={`${item.id}-${index}`}
                  className={productCarouselSlideClassName("bleed")}
                >
                  {isExternal ? (
                    <a href={item.href} className={cardClassName}>
                      {body}
                    </a>
                  ) : (
                    <Link to={item.href} className={cardClassName}>
                      {body}
                    </Link>
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>

          {itemCount > 1 || seeAll ? (
            <div
              className={cn(
                "mx-auto flex w-full max-w-384 flex-wrap items-center justify-center gap-x-6 gap-y-4 px-[clamp(0.75rem,2.222vw,2.5rem)]",
                sectionMarginTopClassName,
              )}
            >
              {itemCount > 1 ? (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className={iconButtonClassName({
                      variant: "elevated",
                      className: "shadow-subtle",
                    })}
                    aria-label={a11yPrevLabel}
                    onClick={slidePrev}
                  >
                    <i className="ph ph-caret-left" aria-hidden="true" />
                  </button>
                  <p
                    className="m-0 min-w-14 text-center font-body text-sm tabular-nums tracking-[0.12em] text-neutral-600"
                    aria-live="polite"
                  >
                    {formatSlideIndex(activeIndex, itemCount)}
                  </p>
                  <button
                    type="button"
                    className={iconButtonClassName({
                      variant: "elevated",
                      className: "shadow-subtle",
                    })}
                    aria-label={a11yNextLabel}
                    onClick={slideNext}
                  >
                    <i className="ph ph-caret-right" aria-hidden="true" />
                  </button>
                </div>
              ) : null}
              {seeAll ? (
                <Button
                  href={seeAll.href}
                  variant="secondary"
                  className="w-fit"
                  ariaLabel={seeAll.label}
                >
                  {seeAll.label}
                  <i className="ph ph-arrow-right" aria-hidden="true" />
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
