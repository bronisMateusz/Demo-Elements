import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { assetUrl } from "../../app/assets";
import { useGutterPx } from "../../hooks/useGutterPx";
import { liftHeaderAboveLightbox, lockLightboxScroll } from "../../hooks/useSiteChrome";
import { cn } from "../../lib/cn";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import type { InspirationArrangement } from "../../types/product";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { IconButton } from "../ui/IconButton";
import { iconButtonClassName } from "../ui/iconButtonClassName";
import { TextRevealLead } from "../motion/TextRevealLead";
import { ProductGalleryLightbox } from "./ProductGalleryLightbox";
import type { LightboxOpenOrigin } from "./ProductGalleryLightboxFlyer";
import "swiper/css";

type ProductInspirationProps = {
  arrangements: InspirationArrangement[];
};

function formatIndex(index: number, total: number) {
  return `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
}

export function ProductInspiration({ arrangements }: ProductInspirationProps) {
  const gutterPx = useGutterPx();
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxOrigin, setLightboxOrigin] = useState<LightboxOpenOrigin | null>(null);
  const [lightboxClosing, setLightboxClosing] = useState(false);
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const imageRefs = useRef<Map<number, HTMLImageElement>>(new Map());

  const registerImage = useCallback((index: number, node: HTMLImageElement | null) => {
    if (node) {
      imageRefs.current.set(index, node);
      return;
    }
    imageRefs.current.delete(index);
  }, []);

  const getSlideRect = useCallback((index: number) => {
    return imageRefs.current.get(index)?.getBoundingClientRect() ?? null;
  }, []);

  useEffect(() => {
    lockLightboxScroll(lightboxOpen);
    return () => lockLightboxScroll(false);
  }, [lightboxOpen]);

  useEffect(() => {
    return () => liftHeaderAboveLightbox(false);
  }, []);

  const syncEdges = (instance: SwiperInstance) => {
    setActiveIndex(instance.realIndex);
    setAtStart(instance.isBeginning);
    setAtEnd(instance.isEnd);
  };

  const openLightbox = (index: number, origin: LightboxOpenOrigin) => {
    setLightboxIndex(index);
    setLightboxOrigin(origin);
    setLightboxClosing(false);
    liftHeaderAboveLightbox(false);
    setLightboxOpen(true);
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

  const openAt = (index: number) => {
    const image = arrangements[index]?.image;
    if (!image) return;
    const rect = getSlideRect(index) ?? new DOMRect(0, 0, 0, 0);
    openLightbox(index, {
      rect,
      objectPosition: productImageObjectPosition(image),
    });
  };

  const lightboxImages = arrangements.map((arrangement) => ({
    ...arrangement.image,
    alt: arrangement.image.alt || arrangement.title,
  }));

  return (
    <section aria-labelledby="inspiration-title" className="overflow-x-clip">
      <Container size="content">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6 md:mb-10">
          <div className="min-w-0 max-w-2xl">
            <Eyebrow className="mb-3">Produkt w aranżacji</Eyebrow>
            <TextRevealLead
              id="inspiration-title"
              revealUnit="word"
              className="max-w-none"
              typographyClassName="font-heading text-h2 leading-heading tracking-tight"
              mutedClassName="text-neutral-900/20"
              fillClassName="text-neutral-900"
            >
              Inspiracje producenta
            </TextRevealLead>
          </div>

          {arrangements.length > 1 ? (
            <div className="flex items-center gap-4">
              <p className="m-0 font-body text-sm tabular-nums tracking-wide text-neutral-600">
                {formatIndex(activeIndex, arrangements.length)}
              </p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className={iconButtonClassName({
                    variant: "elevated",
                    className: cn("shadow-subtle", atStart && "pointer-events-none opacity-35"),
                  })}
                  aria-label="Poprzednia aranżacja"
                  disabled={atStart}
                  onClick={() => swiper?.slidePrev()}
                >
                  <i className="ph ph-caret-left" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className={iconButtonClassName({
                    variant: "elevated",
                    className: cn("shadow-subtle", atEnd && "pointer-events-none opacity-35"),
                  })}
                  aria-label="Następna aranżacja"
                  disabled={atEnd}
                  onClick={() => swiper?.slideNext()}
                >
                  <i className="ph ph-caret-right" aria-hidden="true" />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </Container>

      <div
        className="relative"
        style={{ "--inspiration-inset": `${gutterPx}px` } as CSSProperties}
      >
        <Swiper
          key={`inspiration-${gutterPx}`}
          className={cn(
            "w-full touch-pan-y [touch-action:pan-y_pinch-zoom]",
            // Start at page gutter; peek past the right edge on ultrawide.
            "[&_.swiper-slide]:!h-auto [&_.swiper-slide]:!w-[min(calc(100vw-var(--inspiration-inset)*2-2rem),72rem)] [&_.swiper-slide]:shrink-0",
          )}
          modules={[A11y, Mousewheel]}
          slidesPerView="auto"
          spaceBetween={12}
          slidesOffsetBefore={gutterPx}
          slidesOffsetAfter={gutterPx}
          watchOverflow
          mousewheel={{ forceToAxis: true, releaseOnEdges: true, sensitivity: 0.85 }}
          onSwiper={(instance) => {
            setSwiper(instance);
            syncEdges(instance);
          }}
          onSlideChange={syncEdges}
          onResize={syncEdges}
          a11y={{
            prevSlideMessage: "Poprzednia aranżacja",
            nextSlideMessage: "Następna aranżacja",
          }}
        >
          {arrangements.map((arrangement, index) => {
            const image = arrangement.image;
            const alt = image.alt || arrangement.title;

            return (
              <SwiperSlide key={arrangement.id}>
                <article className="grid overflow-hidden bg-neutral-100 md:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.85fr)]">
                  <div className="relative min-h-[240px] bg-neutral-200 md:min-h-[min(28rem,52vh)]">
                    <button
                      type="button"
                      className="absolute inset-0 block cursor-crosshair"
                      onClick={() => openAt(index)}
                      aria-label={`Powiększ: ${alt}`}
                    >
                      <img
                        ref={(node) => registerImage(index, node)}
                        src={image.src}
                        alt={alt}
                        className={cn(
                          "absolute inset-0 size-full object-cover",
                          lightboxClosing && lightboxIndex === index && "opacity-0",
                        )}
                        style={{ objectPosition: productImageObjectPosition(image) }}
                        loading="lazy"
                        draggable={false}
                      />
                    </button>
                    <div className="pointer-events-none absolute inset-x-0 bottom-4 z-[2] flex justify-end px-4">
                      <IconButton
                        label="Powiększ zdjęcie"
                        iconClass="ph ph-magnifying-glass-plus"
                        variant="elevated"
                        className="pointer-events-auto shadow-subtle"
                        onClick={() => openAt(index)}
                      />
                    </div>
                  </div>

                  <div className="relative flex flex-col justify-center border-t border-neutral-200/80 px-6 py-8 md:border-t-0 md:border-l md:px-8 md:py-10 lg:px-10">
                    <div
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(184,151,90,0.14),transparent_55%)]"
                      aria-hidden="true"
                    />
                    <div className="relative">
                      <h3 className="t-h3 mb-6 max-w-[16ch] text-balance md:mb-8">
                        {arrangement.title}
                      </h3>
                      <ul className="m-0 flex list-none flex-col gap-3 p-0">
                        {arrangement.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-ui leading-body text-neutral-700"
                          >
                            <img
                              src={assetUrl("sygnet.svg")}
                              alt=""
                              aria-hidden="true"
                              className="mt-1 size-3.5 shrink-0 opacity-70"
                              width={14}
                              height={14}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {lightboxOpen && lightboxOrigin ? (
        <ProductGalleryLightbox
          images={lightboxImages}
          index={lightboxIndex}
          origin={lightboxOrigin}
          getSlideRect={getSlideRect}
          onClosingStart={startClosing}
          onClose={closeLightbox}
          onIndexChange={setLightboxIndex}
        />
      ) : null}
    </section>
  );
}
