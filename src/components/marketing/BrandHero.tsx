import { cn } from "../../lib/cn";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";

type BrandHeroProps = {
  title: string;
  titleId?: string;
  lead: string;
  askLabel: string;
  onAsk: () => void;
  productsLabel: string;
  productsHref: string;
  image: {
    src: string;
    alt: string;
    fit?: "cover" | "contain";
    focalPoint?: { x: number; y: number };
  };
  logoSrc?: string;
  className?: string;
};

export function BrandHero({
  title,
  titleId = "brand-hero-title",
  lead,
  askLabel,
  onAsk,
  productsLabel,
  productsHref,
  image,
  logoSrc,
  className,
}: BrandHeroProps) {
  return (
    <section
      aria-labelledby={titleId}
      className={cn("pt-6 pb-8 md:pt-8 md:pb-10 lg:pt-10", className)}
    >
      <Container size="content">
        <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="order-1 min-w-0 lg:col-start-1">
            {logoSrc ? (
              <img
                src={logoSrc}
                alt=""
                className="mb-5 max-h-16 max-w-50 object-contain"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            ) : (
              <div className="mb-5" aria-hidden="true">
                <i
                  className="ph ph-buildings text-2xl text-gold-600 opacity-65"
                  aria-hidden="true"
                />
              </div>
            )}
            <h1 id={titleId} className="sr-only">
              {title}
            </h1>
            <p className="m-0 max-w-[52ch] font-heading text-lg font-light leading-relaxed text-neutral-600">
              {lead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                as="button"
                type="button"
                variant="primary"
                size="lg"
                onClick={onAsk}
              >
                {askLabel}
              </Button>
              <Button href={productsHref} variant="secondary" size="lg">
                {productsLabel}
              </Button>
            </div>
          </div>

          <div className="relative order-2 min-w-0 w-full overflow-hidden rounded-xs bg-neutral-100 aspect-4/3">
            <img
              src={image.src}
              alt={image.alt}
              className="absolute inset-0 size-full max-w-none object-cover"
              style={{ objectPosition: productImageObjectPosition(image) }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
