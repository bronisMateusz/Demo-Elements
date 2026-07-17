import { useCallback, useEffect, useRef, useState } from "react";
import { assetUrl } from "../../app/assets";
import { liftHeaderAboveLightbox, lockLightboxScroll } from "../../hooks/useSiteChrome";
import { cn } from "../../lib/cn";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import type { InspirationArrangement } from "../../types/product";
import { Container } from "../ui/Container";
import { IconButton } from "../ui/IconButton";
import { SectionHeader } from "../structural/SectionHeader";
import { ProductGalleryLightbox } from "./ProductGalleryLightbox";
import type { LightboxOpenOrigin } from "./ProductGalleryLightboxFlyer";

type ProductInspirationProps = {
  arrangements: InspirationArrangement[];
};

export function ProductInspiration({ arrangements }: ProductInspirationProps) {
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxOrigin, setLightboxOrigin] = useState<LightboxOpenOrigin | null>(null);
  const [lightboxClosing, setLightboxClosing] = useState(false);
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
    <section aria-labelledby="inspiration-title">
      <Container>
        <SectionHeader
          eyebrow="Produkt w aranżacji"
          title="Inspiracje producenta"
          titleId="inspiration-title"
        />
        <div className="flex flex-col gap-16 md:gap-20">
          {arrangements.map((arrangement, index) => {
            const imageLast = index % 2 === 1;
            const image = arrangement.image;
            const alt = image.alt || arrangement.title;

            return (
              <article
                key={arrangement.id}
                className="grid items-start gap-8 md:grid-cols-2 md:gap-12 lg:gap-16"
              >
                <div
                  className={cn(
                    "relative overflow-hidden bg-neutral-50",
                    imageLast && "md:order-2",
                  )}
                >
                  <button
                    type="button"
                    className="relative block w-full cursor-crosshair"
                    onClick={() => openAt(index)}
                    aria-label={`Powiększ: ${alt}`}
                  >
                    <img
                      ref={(node) => registerImage(index, node)}
                      src={image.src}
                      alt={alt}
                      className={cn(
                        "aspect-[4/3] w-full object-cover",
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

                <div
                  className={cn(
                    "md:sticky md:top-[calc(var(--spacing-header-h)+58px+1rem)] md:self-start",
                    imageLast && "md:order-1",
                  )}
                >
                  <h3 className="t-h3 mb-6 md:mb-8">{arrangement.title}</h3>
                  <ul className="m-0 flex list-none flex-col gap-3 p-0">
                    {arrangement.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-ui leading-body text-neutral-700">
                        <img
                          src={assetUrl("sygnet.svg")}
                          alt=""
                          aria-hidden="true"
                          className="mt-1 size-3.5 shrink-0"
                          width={14}
                          height={14}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </Container>

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
