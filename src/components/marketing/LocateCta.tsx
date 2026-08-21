import { cn } from "../../lib/cn";
import { requestSalonDrawer } from "../../hooks/useSelectedSalon";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import { splitMediaCtaButtonClassName } from "../structural/splitMediaCtaButtonClassName";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";

type LocateImage = {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
  focalPoint?: { x: number; y: number };
};

type LocateCtaProps = {
  slogan: readonly [string, string];
  title: string;
  titleId?: string;
  description: string;
  ctaLabel: string;
  image: LocateImage;
  onCtaClick?: () => void;
  className?: string;
};

export function LocateCta({
  slogan,
  title,
  titleId = "locate-cta-title",
  description,
  ctaLabel,
  image,
  onCtaClick = requestSalonDrawer,
  className,
}: LocateCtaProps) {
  const [sloganLead, sloganTail] = slogan;

  return (
    <section
      aria-labelledby={titleId}
      className={cn(
        "py-[clamp(2rem,5vw,3rem)] md:py-[clamp(2.5rem,6vw,4rem)]",
        className,
      )}
    >
      <Container size="content">
        <div
          className={cn(
            "group/locate grid overflow-hidden rounded-xs border border-neutral-800/10 bg-neutral-900",
            "lg:grid-cols-[0.82fr_1.18fr]",
          )}
        >
          <div className="relative flex min-h-44 items-center px-6 py-8 md:min-h-52 md:px-10 md:py-10">
            <img
              src={image.src}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 size-full object-cover"
              style={{ objectPosition: productImageObjectPosition(image) }}
              loading="lazy"
              draggable={false}
            />
            <div
              className="absolute inset-0 bg-neutral-950/55"
              aria-hidden="true"
            />
            <p className="relative z-10 m-0 max-w-[18ch] font-body text-sm font-semibold tracking-[0.06em] text-neutral-0 uppercase md:text-base">
              {sloganLead}
              <br />
              {sloganTail}
            </p>
          </div>

          <div className="relative flex flex-col items-start justify-center gap-3 overflow-hidden border-t border-neutral-0/10 px-6 py-8 md:gap-4 md:border-t-0 md:border-s md:px-10 md:py-10">
            <div
              className="pointer-events-none absolute inset-0 bg-radial-[at_0%_0%] from-gold-500/22 to-transparent to-58%"
              aria-hidden="true"
            />
            <h2
              id={titleId}
              className="relative m-0 font-heading text-[clamp(1.125rem,1.75vw,1.375rem)] leading-[1.1] tracking-tight text-neutral-0"
            >
              {title}
            </h2>
            <p className="relative m-0 max-w-prose font-body text-sm leading-relaxed text-neutral-400">
              {description}
            </p>
            <Button
              as="button"
              type="button"
              variant="primary"
              tone="onDark"
              size="lg"
              className={cn("relative mt-1", splitMediaCtaButtonClassName)}
              onClick={onCtaClick}
            >
              {ctaLabel}
              <i className="ph ph-arrow-right" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
