import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import type {
  InspirationArticleEmbed,
  InspirationArticleSection,
} from "../../types/inspiration";
import type { ProductImage } from "../../types/product";
import {
  liftHeaderAboveLightbox,
  lockLightboxScroll,
} from "../../hooks/useSiteChrome";
import { cn } from "../../lib/cn";
import {
  pageIntroHeroTopPaddingClassName,
  contentDividerTopClassName,
  pageSectionStackChildSpacingClassName,
  sectionMarginTopClassName,
} from "../../lib/layoutTokens";
import { peekImageAspectRatio } from "../../lib/lightboxImageRect";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import { HomeMagazine } from "../home/HomeMagazine";
import { LocateCta, type LocateCtaImage } from "../marketing/LocateCta";
import { ProductGalleryLightbox } from "../product/ProductGalleryLightbox";
import type { LightboxOpenOrigin } from "../product/ProductGalleryLightboxFlyer";
import { Section } from "../structural/Section";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { IconButton } from "../ui/IconButton";

type MagazineContent = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: ProductImage;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

type InspirationArticleContentProps = {
  sections: InspirationArticleSection[];
  embeds: InspirationArticleEmbed[];
  appointmentCta: {
    title: string;
    description: string;
    ctaLabel: string;
    image: LocateCtaImage;
  };
  magazine: MagazineContent;
  onAppointmentClick?: () => void;
};

function SectionImageTile({
  image,
  imageIndex,
  registerImage,
  onOpen,
}: {
  image: ProductImage;
  imageIndex: number;
  registerImage: (index: number, node: HTMLImageElement | null) => void;
  onOpen: (origin: LightboxOpenOrigin) => void;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const open = () => {
    lockLightboxScroll(true);
    requestAnimationFrame(() => {
      const rect =
        imgRef.current?.getBoundingClientRect() ??
        frameRef.current?.getBoundingClientRect() ??
        new DOMRect(0, 0, 0, 0);
      const node = imgRef.current;
      const aspectRatio =
        node && node.naturalWidth > 0 && node.naturalHeight > 0
          ? node.naturalWidth / node.naturalHeight
          : (peekImageAspectRatio(image.src) ?? undefined);
      onOpen({
        rect,
        objectPosition: productImageObjectPosition(image),
        aspectRatio,
      });
    });
  };

  return (
    <div
      ref={frameRef}
      className="relative min-w-0 overflow-hidden rounded-xs bg-neutral-200 aspect-16/10"
    >
      <button
        type="button"
        className="group/insp block size-full cursor-zoom-in"
        onClick={open}
        aria-label={`Powiększ: ${image.alt}`}
      >
        <img
          ref={(node) => {
            imgRef.current = node;
            registerImage(imageIndex, node);
          }}
          src={image.src}
          alt={image.alt}
          className="size-full object-cover transition-transform duration-500 ease-out group-hover/insp:scale-[1.03] motion-reduce:group-hover/insp:scale-100"
          style={{ objectPosition: productImageObjectPosition(image) }}
          loading="lazy"
          draggable={false}
        />
      </button>
      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-2 flex justify-end px-4">
        <IconButton
          label="Powiększ zdjęcie"
          iconClass="ph ph-magnifying-glass-plus"
          variant="elevated"
          className="pointer-events-auto shadow-subtle"
          onClick={open}
        />
      </div>
    </div>
  );
}

/** Section gallery - full content-rail width (breaks the prose `max-w-4xl` column). */
function SectionImagePair({
  images,
  startIndex,
  registerImage,
  onOpen,
  className,
}: {
  images: ProductImage[];
  startIndex: number;
  registerImage: (index: number, node: HTMLImageElement | null) => void;
  onOpen: (imageIndex: number, origin: LightboxOpenOrigin) => void;
  className?: string;
}) {
  const isPair = images.length > 1;

  return (
    <div
      className={cn(
        isPair
          ? "grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-5"
          : "grid grid-cols-1",
        className,
      )}
    >
      {images.map((image, offset) => {
        const imageIndex = startIndex + offset;
        return (
          <SectionImageTile
            key={`${image.src}-${imageIndex}`}
            image={image}
            imageIndex={imageIndex}
            registerImage={registerImage}
            onOpen={(origin) => onOpen(imageIndex, origin)}
          />
        );
      })}
    </div>
  );
}

function ArticleSectionBlock({
  section,
  className,
}: {
  section: InspirationArticleSection;
  className?: string;
}) {
  const headingId = `article-section-${section.id}`;

  return (
    <div className={className}>
      <h2
        id={headingId}
        className="mb-5 font-heading text-h2 leading-[1.15] font-medium tracking-tight text-neutral-900"
      >
        {section.heading}
      </h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 32)} className="t-body-lg mb-4">
          {paragraph}
        </p>
      ))}
      {section.bullets && section.bullets.length > 0 ? (
        <ul className="mb-4 list-disc space-y-2 ps-5 font-body text-base leading-relaxed text-neutral-700">
          {section.bullets.map((bullet) => (
            <li key={bullet.slice(0, 32)}>{bullet}</li>
          ))}
        </ul>
      ) : null}
      {section.paragraphsAfter?.map((paragraph) => (
        <p key={paragraph.slice(0, 32)} className="t-body-lg mb-4 last:mb-0">
          {paragraph}
        </p>
      ))}
      {section.credit ? (
        <p className="t-body-lg m-0 font-semibold">{section.credit}</p>
      ) : null}
    </div>
  );
}

export function InspirationArticleContent({
  sections,
  embeds,
  appointmentCta,
  magazine,
  onAppointmentClick,
}: InspirationArticleContentProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOrigin, setLightboxOrigin] =
    useState<LightboxOpenOrigin | null>(null);
  const imageRefs = useRef<Map<number, HTMLImageElement>>(new Map());

  const registerImage = useCallback(
    (index: number, node: HTMLImageElement | null) => {
      if (node) imageRefs.current.set(index, node);
      else imageRefs.current.delete(index);
    },
    [],
  );

  const galleryImages = useMemo(
    () => sections.flatMap((section) => section.images ?? []),
    [sections],
  );

  const galleryStartIndexBySectionId = useMemo(() => {
    const map = new Map<string, number>();
    let index = 0;
    for (const section of sections) {
      if (section.images && section.images.length > 0) {
        map.set(section.id, index);
        index += section.images.length;
      }
    }
    return map;
  }, [sections]);

  /** Runs of chapters between full-bleed embeds - one continuous CKEditor-like body. */
  const articleChunks = useMemo(() => {
    const chunks: {
      sections: InspirationArticleSection[];
      embedAfterLast: InspirationArticleEmbed | null;
    }[] = [];
    let current: InspirationArticleSection[] = [];

    for (const section of sections) {
      current.push(section);
      const embed = embeds.find((entry) => entry.afterSectionId === section.id);
      if (embed) {
        chunks.push({ sections: current, embedAfterLast: embed });
        current = [];
      }
    }

    if (current.length > 0) {
      chunks.push({ sections: current, embedAfterLast: null });
    }

    return chunks;
  }, [sections, embeds]);

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
    liftHeaderAboveLightbox(false);
    setLightboxOpen(true);
  };

  const startClosing = () => {
    liftHeaderAboveLightbox(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxOrigin(null);
    liftHeaderAboveLightbox(false);
  };

  const getSlideRect = useCallback((index: number) => {
    return imageRefs.current.get(index)?.getBoundingClientRect() ?? null;
  }, []);

  return (
    <>
      <div className={pageSectionStackChildSpacingClassName}>
        {articleChunks.map((chunk, chunkIndex) => {
          const firstId = chunk.sections[0]?.id ?? `chunk-${chunkIndex}`;
          const embed = chunk.embedAfterLast;

          return (
            <Fragment key={firstId}>
              <Section ariaLabelledby={`article-section-${firstId}`}>
                <Container size="content">
                  <article>
                    {chunk.sections.map((section, sectionIndex) => {
                      const galleryStart =
                        galleryStartIndexBySectionId.get(section.id) ?? 0;
                      const sectionImages = section.images ?? [];

                      return (
                        <Fragment key={section.id}>
                          <ArticleSectionBlock
                            section={section}
                            className={cn(
                              "mx-auto max-w-4xl",
                              sectionIndex > 0 && "mt-10 md:mt-12",
                            )}
                          />
                          {sectionImages.length > 0 ? (
                            <SectionImagePair
                              images={sectionImages}
                              startIndex={galleryStart}
                              registerImage={registerImage}
                              onOpen={openLightbox}
                              className={sectionMarginTopClassName}
                            />
                          ) : null}
                        </Fragment>
                      );
                    })}
                  </article>
                </Container>
              </Section>

              {embed?.type === "appointment" ? (
                <LocateCta
                  key={`${firstId}-appointment`}
                  title={appointmentCta.title}
                  description={appointmentCta.description}
                  ctaLabel={appointmentCta.ctaLabel}
                  image={appointmentCta.image}
                  onCtaClick={onAppointmentClick}
                />
              ) : null}

              {embed?.type === "magazine" ? (
                <div key={`${firstId}-magazine`}>
                  <HomeMagazine content={magazine} />
                </div>
              ) : null}
            </Fragment>
          );
        })}
      </div>

      {lightboxOpen && lightboxOrigin ? (
        <ProductGalleryLightbox
          images={galleryImages}
          index={lightboxIndex}
          origin={lightboxOrigin}
          getSlideRect={getSlideRect}
          onClosingStart={startClosing}
          onClose={closeLightbox}
          onIndexChange={setLightboxIndex}
        />
      ) : null}
    </>
  );
}

type InspirationArticleHeroProps = {
  title: string;
  lead: string;
  projectCredit: string;
  styleTags: { label: string; href: string }[];
  heroImage: ProductImage;
  titleId?: string;
};

export function InspirationArticleHero({
  title,
  lead,
  projectCredit,
  styleTags,
  heroImage,
  titleId = "inspiration-article-title",
}: InspirationArticleHeroProps) {
  return (
    <Container size="content">
      {/*
        Desktop matches SalonHero: copy has intro padding, photo starts at the
        grid top and stretches to the copy column height.
      */}
      <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-12">
        <div className={cn("min-w-0", pageIntroHeroTopPaddingClassName)}>
          <h1
            id={titleId}
            className="mb-4 font-heading text-h1 leading-[1.1] font-medium tracking-tight text-neutral-900"
          >
            {title}
          </h1>
          <p className="m-0 max-w-prose font-body text-lg leading-relaxed font-medium text-neutral-900 md:text-xl">
            {lead}
          </p>
          <div className={cn("mt-6 pt-6", contentDividerTopClassName)}>
            <Eyebrow className="mb-0">{projectCredit}</Eyebrow>
            <div className="mt-4 flex flex-wrap gap-2">
              {styleTags.map((tag) => (
                <Link
                  key={tag.label}
                  to={tag.href}
                  className={cn(
                    "inline-flex items-center rounded-xs border border-neutral-300 bg-neutral-0",
                    "px-3 py-1.5 font-body text-sm text-neutral-700 no-underline",
                    "transition-colors duration-fast ease-out hover:border-neutral-400 hover:text-neutral-900",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800",
                  )}
                >
                  {tag.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <figure className="relative m-0 min-w-0 overflow-hidden rounded-xs bg-neutral-100 aspect-4/3 lg:aspect-auto lg:min-h-0 lg:h-full">
          <img
            src={heroImage.src}
            alt={heroImage.alt}
            className="absolute inset-0 size-full max-w-none object-cover"
            style={{ objectPosition: productImageObjectPosition(heroImage) }}
            loading="eager"
            decoding="async"
            draggable={false}
          />
        </figure>
      </div>
    </Container>
  );
}
