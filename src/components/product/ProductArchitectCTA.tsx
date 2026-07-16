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
          <div className="relative min-h-[360px] md:min-h-[min(640px,58vw)]">
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
                className="size-24 opacity-95 brightness-0 invert md:size-32 lg:size-36"
                width={144}
                height={144}
                draggable={false}
              />
            </div>
          </div>

          <div className="flex flex-col bg-gold-100 px-10 py-12 md:px-14 md:py-16 lg:px-16 lg:py-20">
            <Eyebrow variant="gold" className="mb-0 text-sm tracking-widest text-gold-600">
              {eyebrow}
            </Eyebrow>

            <div className="flex flex-1 flex-col justify-center gap-5 py-10 md:gap-6 md:py-12">
              <TextRevealLead
                id="architect-cta-title"
                revealUnit="word"
                className="max-w-none text-balance"
                typographyClassName="font-heading text-h1 leading-heading tracking-tight"
                mutedClassName="text-neutral-900/20"
                fillClassName="text-neutral-900"
              >
                {title}
              </TextRevealLead>
              <p className="t-body-lg max-w-lg text-neutral-700">{description}</p>
            </div>

            <div className="flex justify-end">
              <Button href={href} variant="primary">
                {label}
                <i className="ph ph-arrow-right" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
