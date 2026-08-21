import { cn } from "../../lib/cn";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import { splitMediaCtaButtonClassName } from "../structural/splitMediaCtaButtonClassName";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";

type CategoryPromoBannerProps = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  label: string;
  image: {
    src: string;
    alt: string;
    fit?: "cover" | "contain";
    focalPoint?: { x: number; y: number };
  };
  className?: string;
};

/** Wide split promo band for category listings - matches SplitMediaCta / HomeAppointment scale. */
export function CategoryPromoBanner({
  eyebrow,
  title,
  description,
  href,
  label,
  image,
  className,
}: CategoryPromoBannerProps) {
  return (
    <div
      className={cn(
        "group/promo grid overflow-hidden rounded-xs border border-neutral-800/10 bg-gold-100",
        "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]",
        "transition-[border-color] duration-base ease-out hover:border-gold-500",
        className,
      )}
    >
      <div className="relative min-h-52 overflow-hidden bg-neutral-100 max-lg:aspect-16/10 lg:min-h-72">
        <img
          src={image.src}
          alt={image.alt}
          className="absolute inset-0 size-full object-cover transition-transform duration-slow ease-luxury group-hover/promo:scale-105"
          style={{ objectPosition: productImageObjectPosition(image) }}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>

      <div className="relative flex flex-col items-start justify-center gap-3 overflow-hidden px-6 py-8 md:gap-4 md:px-10 md:py-10 lg:px-12">
        <div
          className="pointer-events-none absolute inset-0 bg-radial-[at_100%_0%] from-gold-500/18 to-transparent to-55%"
          aria-hidden="true"
        />
        <Eyebrow variant="gold" className="relative mb-0 text-neutral-700">
          {eyebrow}
        </Eyebrow>
        <p className="relative m-0 font-heading text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.1] font-medium tracking-tight text-balance text-neutral-900">
          {title}
        </p>
        <p className="relative m-0 max-w-prose font-body text-sm leading-relaxed text-neutral-700 md:text-ui">
          {description}
        </p>
        <Button
          href={href}
          variant="primary"
          size="lg"
          className={cn("relative mt-1", splitMediaCtaButtonClassName)}
        >
          {label}
          <i className="ph ph-arrow-right" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
