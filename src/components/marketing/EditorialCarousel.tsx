import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "../../lib/cn";
import { formatSlideIndex } from "../../lib/formatSlideIndex";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import { useContentInsetPx } from "../../hooks/useContentInsetPx";
import { useGutterPx } from "../../hooks/useGutterPx";
import { Section } from "../structural/Section";
import { TextRevealLead } from "../motion/TextRevealLead";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
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

  const enableLoop = items.length > 4;
  const itemCount = items.length;
  const swiperKey = `editorial-bleed-${contentInsetPx}-${itemCount}-${titleId}`;

  const syncEdges = (instance: SwiperInstance) => {
    const real = instance.realIndex ?? instance.activeIndex;
    setActiveIndex(itemCount > 0 ? real % itemCount : 0);
  };

  const slidePrev = useCallback(() => {
    swiper?.slidePrev();
  }, [swiper]);
  const slideNext = useCallback(() => {
    swiper?.slideNext();
  }, [swiper]);

  const footerNav =
    itemCount > 1 ? (
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
    ) : null;

  return (
    <Section id={id} ariaLabelledby={titleId} className="overflow-x-clip">
      <div
        className={cn(productCarouselBleedWrapperClassName, "relative z-10")}
      >
        <div
          className={productCarouselRootClassName({ layout: "bleed" })}
          aria-labelledby={titleId}
        >
          <div className="mx-auto mb-8 w-full max-w-384 px-[clamp(1.25rem,2.222vw,2.5rem)] md:mb-10">
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
            loop={enableLoop}
            loopAdditionalSlides={enableLoop ? 4 : 0}
            slidesPerView="auto"
            slidesPerGroup={1}
            spaceBetween={5}
            speed={480}
            threshold={8}
            grabCursor
            simulateTouch
            // Card links - keep out of focusableElements so drag still starts on them.
            focusableElements="input, select, option, textarea, video, label"
            slidesOffsetBefore={contentInsetPx}
            slidesOffsetAfter={gutterPx}
            mousewheel={{
              forceToAxis: true,
              releaseOnEdges: !enableLoop,
              sensitivity: 0.45,
              thresholdDelta: 40,
              thresholdTime: 360,
            }}
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
            {items.map((item) => {
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
                  key={item.id}
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

          {seeAll ? (
            <Container
              size="content"
              className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:mt-10"
            >
              {footerNav}
              <Button
                href={seeAll.href}
                variant="secondary"
                className="w-fit"
                ariaLabel={seeAll.label}
              >
                {seeAll.label}
                <i className="ph ph-arrow-right" aria-hidden="true" />
              </Button>
            </Container>
          ) : itemCount > 1 ? (
            <div className="mx-auto mt-8 flex w-full max-w-384 items-center justify-center gap-3 px-[clamp(1.25rem,2.222vw,2.5rem)] md:mt-10">
              {footerNav}
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
