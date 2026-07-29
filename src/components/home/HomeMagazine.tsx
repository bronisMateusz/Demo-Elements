import { useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
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
  const [stackHovered, setStackHovered] = useState(false);
  const { targetRef, sideInset } = useScrollExpandInset<HTMLElement>();
  const { id, eyebrow, title, description, image, primaryCta, secondaryCta } =
    homeMagazine;

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

  // Hover gently fans the stack open on top of the scroll-settled pose.
  const hoverFan = useMotionValue(0);
  const setHovered = (hovered: boolean) => {
    setStackHovered(hovered);
    if (reducedMotion) {
      hoverFan.set(hovered ? 1 : 0);
      return;
    }
    animate(hoverFan, hovered ? 1 : 0, { duration: 0.45, ease: EASE_LUXURY });
  };

  const pageBackXLive = useTransform(
    [pageBackX, hoverFan],
    ([x, h]) => Number(x) + Number(h) * 14,
  );
  const pageBackRotateLive = useTransform(
    [pageBackRotate, hoverFan],
    ([r, h]) => Number(r) + Number(h) * 5,
  );
  const pageMidXLive = useTransform(
    [pageMidX, hoverFan],
    ([x, h]) => Number(x) + Number(h) * 8,
  );
  const pageMidRotateLive = useTransform(
    [pageMidRotate, hoverFan],
    ([r, h]) => Number(r) + Number(h) * 2.5,
  );
  const coverRotateLive = useTransform(
    [coverRotate, hoverFan],
    ([r, h]) => Number(r) - Number(h) * 1.5,
  );

  return (
    <section
      ref={targetRef}
      id={id}
      aria-labelledby="home-magazine-title"
      className="overflow-x-clip py-[clamp(2.5rem,6vw,4rem)] md:py-[clamp(3rem,7vw,5rem)]"
    >
      <motion.div
        className="relative overflow-visible"
        style={{ marginLeft: sideInset, marginRight: sideInset }}
      >
        {/* Clipped surface - magazine stack sits above and can overhang. */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-xs"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-linear-to-br from-neutral-700 via-brown-600 to-neutral-800" />
          <div className="absolute inset-0 bg-radial-[at_85%_15%] from-gold-500/25 via-gold-600/10 to-transparent to-55%" />
          <div className="absolute inset-0 bg-radial-[at_10%_90%] from-brown-700/50 to-transparent to-45%" />
          <BrandMotif
            name="dots-grid"
            className="absolute top-8 inset-e-6 h-36 w-9 opacity-40 brightness-0 invert max-md:hidden"
          />
          <BrandMotif
            name="arc-light"
            className="absolute -bottom-10 -inset-e-8 size-[min(48vw,20rem)] opacity-35 max-md:hidden"
          />
        </div>

        <div className="relative z-10 mx-auto grid max-w-5xl items-center gap-10 px-[clamp(1.25rem,2.222vw,2.5rem)] py-10 md:gap-12 md:py-12 lg:max-w-6xl lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-10 lg:py-14 xl:gap-12 xl:py-16">
          <div className="min-w-0 lg:max-w-xl">
            <Eyebrow variant="gold" className="mb-3 text-gold-400">
              {eyebrow}
            </Eyebrow>
            <TextRevealLead
              id="home-magazine-title"
              revealUnit="word"
              className="max-w-xl"
              typographyClassName="font-heading text-h2 leading-[1.1] tracking-tight font-medium"
              mutedClassName="text-neutral-0/25"
              fillClassName="text-neutral-0"
            >
              {title}
            </TextRevealLead>
            <p className="mt-4 mb-0 max-w-lg text-sm leading-relaxed text-neutral-200 md:text-ui">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href={primaryCta.href}
                variant="primary"
                tone="onDark"
                target="_blank"
                rel="noopener noreferrer"
              >
                {primaryCta.label}
              </Button>
              <Button
                href={secondaryCta.href}
                variant="secondary"
                tone="onDark"
                target="_blank"
                rel="noopener noreferrer"
              >
                {secondaryCta.label}
              </Button>
            </div>
          </div>

          <div
            className="relative z-20 mx-auto w-full max-w-88 py-2 sm:max-w-100 md:-my-10 lg:mx-0 lg:w-112 lg:max-w-none lg:-my-24 lg:py-0 xl:w-120 xl:-my-30"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocusCapture={() => setHovered(true)}
            onBlurCapture={(event) => {
              if (
                !event.currentTarget.contains(
                  event.relatedTarget as Node | null,
                )
              ) {
                setHovered(false);
              }
            }}
          >
            <motion.div
              className="pointer-events-none absolute inset-x-0 inset-y-2 rounded-xs border border-neutral-200 bg-neutral-0 shadow-2 lg:inset-y-0"
              style={
                reducedMotion
                  ? {
                      x: 14 + (stackHovered ? 14 : 0),
                      rotate: 3 + (stackHovered ? 5 : 0),
                    }
                  : { x: pageBackXLive, rotate: pageBackRotateLive }
              }
              aria-hidden="true"
            />
            <motion.div
              className="pointer-events-none absolute inset-x-0 inset-y-2 rounded-xs border border-neutral-200/70 bg-neutral-0 shadow-1 lg:inset-y-0"
              style={
                reducedMotion
                  ? {
                      x: 6 + (stackHovered ? 8 : 0),
                      rotate: 1 + (stackHovered ? 2.5 : 0),
                    }
                  : { x: pageMidXLive, rotate: pageMidRotateLive }
              }
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
              style={
                reducedMotion
                  ? { rotate: -2 - (stackHovered ? 1.5 : 0) }
                  : { rotate: coverRotateLive }
              }
              aria-label={`${image.alt} - otwórz magazyn online`}
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
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
