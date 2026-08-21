import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Autoplay, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { salonPage } from "../../data/salon";
import { cn } from "../../lib/cn";
import { formatSlideIndex } from "../../lib/formatSlideIndex";
import { peekImageAspectRatio } from "../../lib/lightboxImageRect";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import {
  liftHeaderAboveLightbox,
  lockLightboxScroll,
} from "../../hooks/useSiteChrome";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { AnimatedNumber } from "../motion/AnimatedNumber";
import { InspirationGallery } from "../inspiration/InspirationGallery";
import { ProductGalleryLightbox } from "../product/ProductGalleryLightbox";
import type { LightboxOpenOrigin } from "../product/ProductGalleryLightboxFlyer";
import { Container } from "../ui/Container";
import { IconButton } from "../ui/IconButton";
import { Section } from "../structural/Section";
import { SectionHeader } from "../structural/SectionHeader";
import { pdpSectionScrollMarginClassName } from "../../constants/pdpSubnav";
import { NewsCardGrid } from "../marketing/NewsCardGrid";
import { ProductDownloads } from "../product/ProductDownloads";
import { BrandMotif } from "../brand/BrandMotif";
import { TextRevealLead } from "../motion/TextRevealLead";
import { AdvisorCta } from "../marketing/AdvisorCta";
import { PromoSplitCta } from "../structural/PromoSplitCta";
import { IconTile } from "../ui/IconTile";
import { requestSalonDrawer } from "../../hooks/useSelectedSalon";
import "swiper/css";

export function SalonUsps() {
  const { usps } = salonPage;
  return (
    <Section ariaLabelledby="salon-usps-title">
      <Container size="content">
        <TextRevealLead
          id="salon-usps-title"
          revealUnit="word"
          className="mb-8 max-w-2xl md:mb-10"
          typographyClassName="font-heading text-h2 leading-[1.1] tracking-tight font-medium"
          mutedClassName="text-neutral-900/20"
          fillClassName="text-neutral-900"
        >
          {usps.title}
        </TextRevealLead>

        <ul
          className={cn(
            "m-0 grid list-none grid-cols-2 gap-2 p-0",
            "sm:grid-cols-2 lg:grid-cols-4",
          )}
        >
          {usps.items.map((item) => {
            const cta = "cta" in item ? item.cta : undefined;
            return (
              <li key={item.title} className="min-h-0">
                <IconTile
                  iconClass={item.iconClass}
                  label={item.title}
                  href={cta?.href}
                  ctaLabel={cta?.label}
                />
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

export function SalonAbout() {
  const { about } = salonPage;
  return (
    <Section
      id={about.id}
      ariaLabelledby="salon-about-title"
      className={cn(
        "relative overflow-visible",
        pdpSectionScrollMarginClassName,
      )}
    >
      <BrandMotif
        name="circle-beige"
        className="absolute -top-24 -inset-e-20 size-[min(70vw,28rem)] opacity-40 max-md:hidden"
      />
      <BrandMotif
        name="arc-light"
        className="absolute -bottom-8 -inset-s-16 size-[min(50vw,18rem)] opacity-50 max-md:hidden"
      />

      <Container size="content" className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-20">
          <div className="min-w-0 lg:sticky lg:top-[var(--site-header-bar-height,7.25rem)] xl:top-47.5 header-concealed:xl:top-36.5 lg:self-start">
            <SectionHeader
              eyebrow={about.eyebrow}
              title={about.title}
              titleId="salon-about-title"
              className="mb-0"
            />
            <p className="mt-6 mb-0 max-w-prose font-body text-lg leading-relaxed font-medium text-neutral-900 md:text-xl">
              {about.lead}
            </p>
          </div>
          <div className="space-y-6">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="t-body-lg max-w-prose">
                {paragraph}
              </p>
            ))}
            <p className="t-body-lg max-w-prose font-medium text-neutral-900">
              {about.closing}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function SalonStats() {
  const { stats } = salonPage;
  return (
    <Section
      id={stats.id}
      ariaLabelledby="salon-stats-title"
      tone="warm"
      className={pdpSectionScrollMarginClassName}
    >
      <Container size="content">
        <h2
          id="salon-stats-title"
          className="m-0 font-heading text-h2 leading-[1.1] font-medium tracking-tight text-neutral-900"
        >
          {stats.title}
        </h2>
        <p className="mt-3 mb-0 max-w-2xl font-body text-ui text-neutral-600">
          {stats.lead}
        </p>
        <ul
          className={cn(
            "mt-12 m-0 grid list-none gap-x-6 gap-y-8 p-0 md:mt-14",
            "md:grid-cols-3 md:gap-x-8 lg:gap-x-10",
          )}
        >
          {stats.items.map((item, index) => (
            <li
              key={item.label}
              className={cn(
                "min-w-0",
                index > 0 &&
                  "md:border-s md:border-neutral-300 md:ps-6 lg:ps-8",
              )}
            >
              <p className="m-0 font-heading text-[clamp(2.5rem,5vw,3.5rem)] leading-none font-medium tracking-tight text-neutral-900">
                <AnimatedNumber value={item.value} />
                {"suffix" in item && item.suffix ? (
                  <em className="ms-1 text-[0.45em] not-italic text-neutral-900">
                    {item.suffix}
                  </em>
                ) : null}
              </p>
              <p className="mt-3 mb-0 max-w-56 font-body text-sm text-neutral-600">
                {item.label}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function SalonExpo() {
  const { expo } = salonPage;
  const reduceMotion = useMotionReduced();
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOrigin, setLightboxOrigin] =
    useState<LightboxOpenOrigin | null>(null);
  const [lightboxClosing, setLightboxClosing] = useState(false);
  const imageRefs = useRef(new Map<number, HTMLImageElement>());
  const swiperRef = useRef<SwiperInstance | null>(null);
  const hasMultiple = expo.images.length > 1;
  const useThumbStrip = hasMultiple && expo.images.length <= 6;
  const autoplayEnabled = hasMultiple && !reduceMotion;

  useEffect(() => {
    lockLightboxScroll(lightboxOpen);
    return () => lockLightboxScroll(false);
  }, [lightboxOpen]);

  useEffect(() => {
    return () => liftHeaderAboveLightbox(false);
  }, []);

  useEffect(() => {
    const autoplay = swiperRef.current?.autoplay;
    if (!autoplay) return;
    if (lightboxOpen || lightboxClosing) autoplay.stop();
    else if (autoplayEnabled) autoplay.start();
  }, [autoplayEnabled, lightboxClosing, lightboxOpen]);

  const registerImage = (index: number, node: HTMLImageElement | null) => {
    if (node) imageRefs.current.set(index, node);
    else imageRefs.current.delete(index);
  };

  const openLightbox = (index: number, origin: LightboxOpenOrigin) => {
    setLightboxIndex(index);
    setLightboxOrigin(origin);
    setLightboxClosing(false);
    liftHeaderAboveLightbox(false);
    setLightboxOpen(true);
  };

  const openAt = (index: number) => {
    const image = expo.images[index];
    if (!image) return;
    const img = imageRefs.current.get(index);
    lockLightboxScroll(true);

    const open = () => {
      requestAnimationFrame(() => {
        const node = imageRefs.current.get(index);
        const rect = node?.getBoundingClientRect() ?? new DOMRect(0, 0, 0, 0);
        const aspectRatio =
          node && node.naturalWidth > 0 && node.naturalHeight > 0
            ? node.naturalWidth / node.naturalHeight
            : (peekImageAspectRatio(image.src) ?? undefined);
        openLightbox(index, {
          rect,
          objectPosition: productImageObjectPosition(image),
          aspectRatio,
        });
      });
    };

    if (img?.decode) {
      void img.decode().then(open).catch(open);
      return;
    }
    open();
  };

  const startClosing = () => {
    setLightboxClosing(true);
    liftHeaderAboveLightbox(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxOrigin(null);
    setLightboxClosing(false);
    liftHeaderAboveLightbox(false);
  };

  const handleLightboxIndexChange = (index: number) => {
    setLightboxIndex(index);
    setActive(index);
    if (hasMultiple) swiperRef.current?.slideToLoop(index);
    else swiperRef.current?.slideTo(index);
  };

  const goTo = (index: number) => {
    setActive(index);
    if (hasMultiple) swiperRef.current?.slideToLoop(index);
    else swiperRef.current?.slideTo(index);
  };

  const goPrev = () => swiperRef.current?.slidePrev();
  const goNext = () => swiperRef.current?.slideNext();

  return (
    <Section
      id={expo.id}
      ariaLabelledby="salon-expo-title"
      tone="muted"
      className={pdpSectionScrollMarginClassName}
    >
      <Container size="content">
        <h2
          id="salon-expo-title"
          className="m-0 font-heading text-h2 leading-[1.1] font-medium tracking-tight text-neutral-900"
        >
          {expo.title}
        </h2>
        <p className="mt-3 mb-0 max-w-2xl font-body text-ui text-neutral-600">
          {expo.lead}
        </p>

        <div className="relative mt-8 overflow-hidden rounded-xs bg-neutral-0">
          <Swiper
            modules={[A11y, Autoplay, Mousewheel]}
            slidesPerView={1}
            spaceBetween={0}
            speed={520}
            loop={hasMultiple}
            roundLengths
            resistanceRatio={0}
            grabCursor
            simulateTouch
            // Image open is a button - keep it out of focusableElements so drag still starts on it.
            focusableElements="input, select, option, textarea, video, label"
            threshold={6}
            autoplay={
              autoplayEnabled
                ? {
                    delay: 4500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
                : false
            }
            mousewheel={{
              enabled: true,
              forceToAxis: true,
              releaseOnEdges: true,
              sensitivity: 0.85,
            }}
            className={cn(
              "aspect-16/8 w-full touch-pan-y touch-[pan-y_pinch-zoom]",
              "[&_.swiper-slide]:h-full [&_.swiper-wrapper]:h-full",
            )}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              if (lightboxOpen || lightboxClosing) swiper.autoplay?.stop();
            }}
            onSlideChange={(swiper) => {
              setActive(hasMultiple ? swiper.realIndex : swiper.activeIndex);
            }}
            a11y={{
              prevSlideMessage: "Poprzednie zdjęcie",
              nextSlideMessage: "Następne zdjęcie",
            }}
          >
            {expo.images.map((image, index) => (
              <SwiperSlide key={image.id} className="h-full!">
                <button
                  type="button"
                  aria-label={`Powiększ: ${image.alt}`}
                  className={cn(
                    "relative block size-full overflow-hidden p-0",
                    hasMultiple
                      ? "cursor-grab active:cursor-grabbing"
                      : "cursor-zoom-in",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
                  )}
                  onClick={() => openAt(index)}
                >
                  <img
                    ref={(node) => registerImage(index, node)}
                    src={image.src}
                    alt={image.alt}
                    className={cn(
                      "size-full object-cover",
                      lightboxClosing && lightboxIndex === index && "opacity-0",
                    )}
                    style={{
                      objectPosition: productImageObjectPosition(image),
                    }}
                    draggable={false}
                  />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="pointer-events-none absolute inset-x-0 bottom-4 z-2 flex items-end justify-between gap-3 px-4">
            {useThumbStrip ? (
              <ul className="pointer-events-auto m-0 flex max-w-[min(100%,calc(100%-7rem))] list-none gap-1.5 overflow-x-auto p-0 scrollbar-none sm:gap-2">
                {expo.images.map((image, index) => {
                  const isActive = active === index;
                  return (
                    <li key={image.id} className="shrink-0">
                      <button
                        type="button"
                        aria-label={image.alt}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "block size-10 overflow-hidden rounded-xs border-2 bg-neutral-0 shadow-subtle sm:size-12 md:size-14",
                          "transition-[border-color,opacity] duration-fast ease-out",
                          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
                          isActive
                            ? "border-gold-500 opacity-100"
                            : "border-transparent opacity-80 hover:opacity-100",
                        )}
                        onClick={() => goTo(index)}
                      >
                        <img
                          src={image.src}
                          alt=""
                          aria-hidden="true"
                          className="size-full object-cover"
                          style={{
                            objectPosition: productImageObjectPosition(image),
                          }}
                          draggable={false}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : hasMultiple ? (
              <p
                className="pointer-events-auto m-0 inline-flex h-12 min-w-12 items-center justify-center rounded-xs border border-neutral-200 bg-neutral-0 px-3 font-body text-sm tabular-nums tracking-[0.12em] text-neutral-800 shadow-subtle"
                aria-live="polite"
              >
                {formatSlideIndex(active, expo.images.length)}
              </p>
            ) : (
              <span />
            )}

            <div className="pointer-events-auto flex shrink-0 gap-1">
              <IconButton
                label="Powiększ zdjęcie"
                iconClass="ph ph-magnifying-glass-plus"
                variant="elevated"
                className="hidden shadow-subtle lg:inline-flex"
                onClick={() => openAt(active)}
              />
              {hasMultiple ? (
                <>
                  <IconButton
                    label="Poprzednie zdjęcie"
                    iconClass="ph ph-caret-left"
                    variant="elevated"
                    className="shadow-subtle"
                    onClick={goPrev}
                  />
                  <IconButton
                    label="Następne zdjęcie"
                    iconClass="ph ph-caret-right"
                    variant="elevated"
                    className="shadow-subtle"
                    onClick={goNext}
                  />
                </>
              ) : null}
            </div>
          </div>
        </div>
      </Container>

      {lightboxOpen && lightboxOrigin ? (
        <ProductGalleryLightbox
          images={[...expo.images]}
          index={lightboxIndex}
          origin={lightboxOrigin}
          getSlideRect={(index) =>
            imageRefs.current.get(index)?.getBoundingClientRect() ?? null
          }
          onClosingStart={startClosing}
          onClose={closeLightbox}
          onIndexChange={handleLightboxIndexChange}
        />
      ) : null}
    </Section>
  );
}

export function SalonNews() {
  return (
    <NewsCardGrid
      id={salonPage.news.id}
      title={salonPage.news.title}
      items={[...salonPage.news.items]}
      titleId="salon-news-title"
    />
  );
}

export function SalonInspiration() {
  return (
    <Section
      id={salonPage.inspiration.id}
      ariaLabelledby="salon-insp-title"
      className={pdpSectionScrollMarginClassName}
    >
      <InspirationGallery
        arrangements={[...salonPage.inspiration.arrangements]}
        title={salonPage.inspiration.title}
        titleId="salon-insp-title"
        endCap={salonPage.inspiration.endCap}
      />
    </Section>
  );
}

export function SalonDesignStrip() {
  const { design } = salonPage;
  return (
    <PromoSplitCta
      id={design.id}
      titleId="salon-design-title"
      eyebrow={design.eyebrow}
      title={design.title}
      description={design.description}
      image={design.image}
      video={design.video}
      primary={{ href: design.ctaHref, label: design.ctaLabel }}
    />
  );
}

export function SalonDownloads() {
  const { downloads } = salonPage;
  return (
    <Section
      ariaLabelledby="salon-docs-title"
      className={pdpSectionScrollMarginClassName}
    >
      <ProductDownloads
        title={downloads.title}
        titleId="salon-docs-title"
        downloads={downloads.items}
      />
    </Section>
  );
}

export function SalonVisitCta({ onAskOpen }: { onAskOpen: () => void }) {
  const { visit } = salonPage;
  return (
    <AdvisorCta
      titleId="salon-visit-title"
      primaryAction="book"
      onAskOpen={onAskOpen}
      onBookOpen={requestSalonDrawer}
      className={pdpSectionScrollMarginClassName}
      content={{
        id: visit.id,
        eyebrow: visit.eyebrow,
        title: visit.title,
        description: visit.description,
        note: visit.note,
        image: visit.image,
        askLabel: visit.secondaryLabel,
        bookLabel: visit.primaryLabel,
      }}
    />
  );
}
