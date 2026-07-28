import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { homeMagazine } from "../../data/home";
import { useScrollExpandInset } from "../../hooks/useScrollExpandInset";
import { EASE_LUXURY } from "../../lib/motionEase";
import { cn } from "../../lib/cn";
import { BrandMotif } from "../brand/BrandMotif";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { TextRevealLead } from "../motion/TextRevealLead";

export function HomeMagazine() {
  const reducedMotion = useReducedMotion();
  const { targetRef, sideInset } = useScrollExpandInset<HTMLElement>();
  const {
    id,
    eyebrow,
    title,
    description,
    badge,
    image,
    primaryCta,
    secondaryCta,
  } = homeMagazine;

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "start 0.35"],
  });

  // Pages fan in toward their resting stack as the section enters view.
  const pageBackRotate = useTransform(scrollYProgress, [0, 1], [11, 3]);
  const pageBackX = useTransform(scrollYProgress, [0, 1], [28, 14]);
  const pageMidRotate = useTransform(scrollYProgress, [0, 1], [6, 1]);
  const pageMidX = useTransform(scrollYProgress, [0, 1], [16, 6]);
  const coverRotate = useTransform(scrollYProgress, [0, 1], [-9, -2]);

  return (
    <section
      ref={targetRef}
      id={id}
      aria-labelledby="home-magazine-title"
      className="py-[clamp(2rem,5vw,3rem)] md:py-[clamp(2.5rem,6vw,4rem)]"
    >
      <motion.div
        className="relative overflow-hidden rounded-xs bg-gold-100"
        style={{ marginLeft: sideInset, marginRight: sideInset }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <BrandMotif
            name="dots-grid"
            className="absolute top-6 inset-e-4 h-32 w-8 opacity-30 max-md:hidden md:top-8 md:inset-e-6 md:h-40 md:w-9"
          />
          <BrandMotif
            name="arc-dark"
            className="absolute -inset-e-14 -bottom-20 size-52 opacity-25 max-md:hidden"
          />
        </div>

        <div className="relative z-10 mx-auto grid max-w-384 items-center gap-10 px-[clamp(1.25rem,2.222vw,2.5rem)] py-10 md:gap-12 md:py-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14 lg:py-14">
          <div className="min-w-0">
            <Eyebrow variant="gold" className="mb-3 text-gold-600">
              {eyebrow}
            </Eyebrow>
            <TextRevealLead
              id="home-magazine-title"
              revealUnit="word"
              className="max-w-xl"
              typographyClassName="font-heading text-h2 leading-[1.1] tracking-tight font-medium"
              mutedClassName="text-neutral-900/20"
              fillClassName="text-neutral-900"
            >
              {title}
            </TextRevealLead>
            <p className="mt-4 mb-0 max-w-lg text-sm leading-relaxed text-neutral-700 md:text-ui">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={primaryCta.href} variant="primary" target="_blank" rel="noopener noreferrer">
                {primaryCta.label}
              </Button>
              <Button
                href={secondaryCta.href}
                variant="secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {secondaryCta.label}
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-76 py-4 sm:max-w-84 lg:ms-auto lg:me-0 lg:max-w-90 lg:py-6">
            <motion.div
              className="pointer-events-none absolute inset-x-0 inset-y-4 rounded-xs bg-neutral-0/80 shadow-1 lg:inset-y-6"
              style={
                reducedMotion
                  ? { x: 14, rotate: 3 }
                  : { x: pageBackX, rotate: pageBackRotate }
              }
              transition={{ ease: EASE_LUXURY }}
              aria-hidden="true"
            />
            <motion.div
              className="pointer-events-none absolute inset-x-0 inset-y-4 rounded-xs border border-neutral-200/80 bg-neutral-0 lg:inset-y-6"
              style={
                reducedMotion
                  ? { x: 6, rotate: 1 }
                  : { x: pageMidX, rotate: pageMidRotate }
              }
              transition={{ ease: EASE_LUXURY }}
              aria-hidden="true"
            />

            <motion.a
              href={primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group relative z-10 block overflow-hidden rounded-xs border border-neutral-200 bg-neutral-0 shadow-2",
                "outline-offset-4 transition-shadow duration-base ease-luxury",
                "hover:shadow-[0_12px_40px_rgba(26,24,21,0.12)]",
                "focus-visible:outline-2 focus-visible:outline-gold-500",
              )}
              style={reducedMotion ? { rotate: -2 } : { rotate: coverRotate }}
              aria-label={`${image.alt} - otwórz PDF`}
            >
              <span
                className="pointer-events-none absolute inset-y-0 inset-s-0 z-10 w-2.5 bg-linear-to-r from-neutral-900/25 via-neutral-900/8 to-transparent"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute inset-y-0 inset-e-0 z-10 w-px bg-neutral-300"
                aria-hidden="true"
              />

              <img
                src={image.src}
                alt=""
                className="aspect-3/4 w-full object-cover object-top"
                loading="lazy"
                draggable={false}
              />

              <span className="absolute top-3 inset-e-3 rounded-xs bg-gold-500 px-2 py-0.5 font-body text-[10px] font-medium tracking-wide text-neutral-0 uppercase shadow-subtle">
                {badge}
              </span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
