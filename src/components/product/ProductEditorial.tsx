import { useId } from "react";
import { BrandMotif } from "../brand/BrandMotif";
import { Container } from "../ui/Container";
import { SectionHeader } from "../structural/SectionHeader";
import { cn } from "../../lib/cn";
import { contentDividerTopClassName } from "../../lib/layoutTokens";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import type { ProductFeature } from "../../types/product";
import { pdpAccordionToggleClassName } from "../../constants/pdpSubnav";
import { usePdpSectionAccordion } from "../../hooks/usePdpSectionAccordion";
import { AccordionCollapse } from "../motion/AccordionCollapse";

type ProductEditorialProps = {
  eyebrow: string;
  title: string;
  lead: string;
  paragraphs: string[];
  features: ProductFeature[];
  /**
   * When set, mobile accordion opens when the PDP subnav navigates to this
   * section id (or the URL hash matches). Closed by default on mobile.
   */
  expandOnSectionId?: string;
};

function ProductFeatureItem({ feature }: { feature: ProductFeature }) {
  const visual = feature.iconClass ? (
    <div
      className="flex size-14 shrink-0 items-center justify-center rounded-xs border border-neutral-300 bg-neutral-50 sm:size-16"
      aria-hidden="true"
    >
      <i
        className={cn(
          feature.iconClass,
          "text-2xl leading-none text-gold-500 sm:text-3xl",
        )}
      />
    </div>
  ) : feature.image ? (
    <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xs border border-neutral-300 bg-neutral-50 sm:size-16">
      <img
        src={feature.image.src}
        alt={feature.image.alt}
        className="size-full object-contain p-1.5"
        style={{
          objectPosition: productImageObjectPosition(feature.image),
        }}
        loading="lazy"
        decoding="async"
      />
    </div>
  ) : null;

  return (
    <li className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
      {visual}
      <div className="min-w-0">
        <h3 className="mb-1 font-body text-base leading-snug font-medium text-neutral-900">
          {feature.title}
        </h3>
        <p className="t-small m-0 text-neutral-600">{feature.description}</p>
      </div>
    </li>
  );
}

export function ProductEditorial({
  eyebrow,
  title,
  lead,
  paragraphs,
  features,
  expandOnSectionId,
}: ProductEditorialProps) {
  const panelId = useId();
  const { open, setOpen, accordionEnabled } =
    usePdpSectionAccordion(expandOnSectionId);

  const header = accordionEnabled ? (
    <>
      <div className="mb-8 hidden md:block">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          titleId="editorial-title-desktop"
          className="mb-0"
        />
      </div>
      <h2 className="mb-6 font-heading text-h2 leading-[1.1] font-medium tracking-tight text-neutral-900 md:hidden">
        {title}
      </h2>
    </>
  ) : (
    <SectionHeader
      eyebrow={eyebrow}
      title={title}
      titleId="editorial-title"
      className="mb-8"
    />
  );

  const copy = (
    <div className="space-y-6">
      <p className="mb-3 max-w-prose font-body text-lg leading-relaxed font-medium text-neutral-900 md:text-xl">
        {lead}
      </p>
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 32)} className="t-body-lg max-w-prose">
          {paragraph}
        </p>
      ))}
    </div>
  );

  const featuresList = (
    <ul
      className={cn(
        "flex list-none flex-col gap-6 pt-8 lg:border-t-0 lg:border-s lg:border-neutral-300 lg:pt-0 lg:ps-12",
        contentDividerTopClassName,
      )}
    >
      {features.map((feature) => (
        <ProductFeatureItem key={feature.title} feature={feature} />
      ))}
    </ul>
  );

  // Desktop: header alone in row 1; lead + features share row 2 so the feature
  // column starts at the lead baseline (empty cell keeps row 1 height = header).
  const body = (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-x-20">
      <div className="min-w-0 lg:col-start-1 lg:row-start-1">{header}</div>
      <div
        className="hidden lg:col-start-2 lg:row-start-1 lg:block"
        aria-hidden="true"
      />
      <div
        className={cn(
          "min-w-0 lg:col-start-1 lg:row-start-2",
          "lg:sticky lg:top-(--site-header-bar-height,7.25rem) xl:top-47.5 header-concealed:xl:top-36.5 lg:self-start",
        )}
      >
        {copy}
      </div>
      <div className="min-w-0 lg:col-start-2 lg:row-start-2">
        {featuresList}
      </div>
    </div>
  );

  return (
    <section
      aria-labelledby="editorial-title"
      className="relative overflow-visible"
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
        {accordionEnabled ? (
          <>
            <button
              type="button"
              className={pdpAccordionToggleClassName}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((value) => !value)}
            >
              <span
                id="editorial-title"
                className="font-heading text-h2 leading-[1.1] font-medium tracking-tight text-neutral-900"
              >
                {eyebrow}
              </span>
              <i
                className={cn(
                  "ph ph-caret-down shrink-0 text-xl leading-none text-neutral-500 transition-transform duration-base ease-luxury",
                  open && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>

            <div className="hidden md:block">{body}</div>

            <AccordionCollapse
              open={open}
              id={panelId}
              className="md:hidden"
              innerClassName="pt-4"
            >
              {body}
            </AccordionCollapse>
          </>
        ) : (
          body
        )}
      </Container>
    </section>
  );
}
