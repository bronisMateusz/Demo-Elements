import { motion, useReducedMotion } from "motion/react";
import { assetUrl } from "../../app/assets";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { useScrollExpandInset } from "../../hooks/useScrollExpandInset";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import { BrandMotif } from "../brand/BrandMotif";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { TextRevealLead } from "../motion/TextRevealLead";
import { EASE_OUT } from "../../lib/motionEase";
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
  const preferReducedMotion = useReducedMotion();
  const showVideo = Boolean(video) && !reducedMotion;
  const { targetRef, sideInset } = useScrollExpandInset<HTMLElement>();

  return (
    <section
      ref={targetRef}
      aria-labelledby="architect-cta-title"
      className="py-[var(--spacing-section-sm)] md:py-[var(--spacing-section)]"
    >
      <motion.div
        className="relative overflow-hidden rounded-xs"
        style={{ marginLeft: sideInset, marginRight: sideInset }}
      >
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[280px] overflow-hidden md:min-h-[min(420px,38vw)]">
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

          <div className="relative flex flex-col justify-center bg-gold-100 px-8 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
              <BrandMotif
                name="dots-grid"
                className="absolute top-6 right-4 h-32 w-8 opacity-30 max-md:hidden md:top-8 md:right-6 md:h-40 md:w-9"
              />
              <BrandMotif
                name="arc-dark"
                className="absolute -right-14 -bottom-20 size-52 opacity-25 max-md:hidden"
              />
            </div>

            <div className="relative z-10 flex flex-col gap-5 md:gap-6">
              <Eyebrow variant="gold" className="mb-0 text-sm tracking-widest text-gold-600">
                {eyebrow}
              </Eyebrow>

              <div className="flex flex-col gap-4 md:gap-5">
                <TextRevealLead
                  id="architect-cta-title"
                  revealUnit="word"
                  className="max-w-none"
                  typographyClassName="font-heading text-h2 leading-heading tracking-tight font-medium"
                  mutedClassName="text-neutral-900/20"
                  fillClassName="text-neutral-900"
                >
                  {title}
                </TextRevealLead>
                <p className="t-body max-w-lg text-neutral-700">{description}</p>
              </div>

              <motion.div
                className="flex justify-start"
                initial={preferReducedMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, delay: 0.12, ease: EASE_OUT }}
              >
                <Button href={href} variant="primary" size="lg">
                  {label}
                  <i className="ph ph-triangle" aria-hidden="true" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
