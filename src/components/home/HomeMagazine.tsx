import { motion } from "motion/react";
import { homeMagazine } from "../../data/home";
import { useScrollExpandInset } from "../../hooks/useScrollExpandInset";
import { cn } from "../../lib/cn";
import { BrandMotif } from "../brand/BrandMotif";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { TextRevealLead } from "../motion/TextRevealLead";

type HomeMagazineContent = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
    fit?: "cover" | "contain";
  };
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

type HomeMagazineProps = {
  content?: HomeMagazineContent;
};

export function HomeMagazine({
  content = homeMagazine,
}: HomeMagazineProps = {}) {
  const { targetRef, sideInset } = useScrollExpandInset<HTMLElement>();
  const { id, eyebrow, title, description, image, primaryCta, secondaryCta } =
    content;

  return (
    <section
      ref={targetRef}
      id={id}
      aria-labelledby="home-magazine-title"
      className="relative z-20 overflow-x-clip"
    >
      <motion.div
        className="relative overflow-hidden rounded-xs"
        style={{ marginLeft: sideInset, marginRight: sideInset }}
      >
        <div
          className="pointer-events-none absolute inset-0"
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

        <div className="relative z-10 mx-auto grid max-w-5xl items-center gap-8 px-[clamp(0.75rem,2.222vw,2.5rem)] py-12 md:gap-10 lg:max-w-6xl lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] xl:gap-14">
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
            <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap">
              <Button
                href={primaryCta.href}
                variant="primary"
                tone="onDark"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                {primaryCta.label}
              </Button>
              <Button
                href={secondaryCta.href}
                variant="secondary"
                tone="onDark"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                {secondaryCta.label}
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-72 sm:max-w-80 lg:mx-0 lg:max-w-none">
            <a
              href={primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group relative z-10 block overflow-hidden rounded-xs bg-neutral-0 shadow-2",
                "outline-offset-4 transition-shadow duration-base ease-luxury",
                "hover:shadow-[0_12px_40px_rgba(26,24,21,0.12)]",
                "focus-visible:outline-2 focus-visible:outline-gold-500",
              )}
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
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
