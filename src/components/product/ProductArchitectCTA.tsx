import { assetUrl } from "../../app/assets";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { TextRevealLead } from "../motion/TextRevealLead";
import type { ProductImage } from "../../types/product";

type ProductArchitectCTAProps = {
  title: string;
  description: string;
  href: string;
  label: string;
  eyebrow?: string;
  image: ProductImage;
  video?: string;
};

export function ProductArchitectCTA({
  title,
  description,
  href,
  label,
  eyebrow = "Strefa architekta",
  image,
  video,
}: ProductArchitectCTAProps) {
  const reducedMotion = useMotionReduced();
  const showVideo = Boolean(video) && !reducedMotion;

  return (
    <section
      aria-labelledby="architect-cta-title"
      className="py-[var(--spacing-section-sm)] md:py-[var(--spacing-section)]"
    >
      <div className="w-full">
        <div className="grid overflow-hidden md:grid-cols-2">
          <div className="relative min-h-[280px] md:min-h-[min(420px,38vw)]">
            {showVideo ? (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                poster={image.src}
              >
                <source src={assetUrl(video!)} type="video/mp4" />
              </video>
            ) : (
              <img
                src={image.src}
                alt={image.alt}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: productImageObjectPosition(image) }}
                loading="lazy"
                draggable={false}
              />
            )}
            <div
              className="absolute inset-0 flex items-center justify-center bg-neutral-900/15"
              aria-hidden="true"
            >
              <img
                src={assetUrl("sygnet.svg")}
                alt=""
                className="size-24 opacity-95 brightness-0 invert md:size-32 lg:size-40"
                width={160}
                height={160}
                draggable={false}
              />
            </div>
          </div>

          <div className="flex flex-col bg-gold-100 px-8 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
            <Eyebrow variant="gold" className="mb-0 text-sm tracking-widest text-gold-600">
              {eyebrow}
            </Eyebrow>

            <div className="flex flex-1 flex-col justify-center gap-4 py-6 md:gap-5 md:py-8">
              <TextRevealLead
                id="architect-cta-title"
                revealUnit="word"
                className="max-w-none text-balance"
                typographyClassName="font-heading text-h2 leading-heading tracking-tight"
                mutedClassName="text-neutral-900/20"
                fillClassName="text-neutral-900"
              >
                {title}
              </TextRevealLead>
              <p className="t-body max-w-lg text-neutral-700">{description}</p>
            </div>

            <div className="flex justify-start">
              <Button href={href} variant="primary" size="lg">
                {label}
                <i className="ph ph-triangle" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
