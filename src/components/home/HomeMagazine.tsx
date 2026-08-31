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

/** Homepage magazine band - ListingPromoTile rhythm below lg; original desktop scale from lg. */
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
            className="absolute top-5 inset-e-4 h-24 w-7 opacity-40 brightness-0 invert sm:top-6 sm:inset-e-5 md:top-8 md:inset-e-6 md:h-36 md:w-9"
          />
          <BrandMotif
            name="arc-light"
            className="absolute -bottom-8 -inset-e-6 size-[min(42vw,14rem)] opacity-35 md:-bottom-10 md:-inset-e-8 md:size-[min(48vw,20rem)]"
          />
        </div>

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-stretch gap-5 px-[clamp(0.75rem,2.222vw,2.5rem)] py-8 sm:flex-row sm:items-center sm:gap-8 sm:py-10 md:gap-10 md:py-12 lg:max-w-6xl lg:gap-12 lg:py-12 xl:gap-14">
          <div className="flex min-w-0 flex-1 flex-col items-stretch gap-3 sm:items-start lg:max-w-xl">
            <Eyebrow variant="gold" className="text-gold-400">
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
            <p className="m-0 max-w-lg font-body text-sm leading-relaxed text-neutral-200 md:text-ui">
              {description}
            </p>
            <div className="mt-1 flex w-full flex-col items-stretch gap-3 sm:mt-4 sm:flex-row sm:flex-wrap sm:items-start lg:mt-8">
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

          <a
            href={primaryCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "relative mx-auto aspect-3/4 w-44 shrink-0 overflow-hidden rounded-xs bg-neutral-0 shadow-2 sm:mx-0 sm:w-48 md:w-52 lg:w-88 xl:w-96",
              "outline-offset-4 transition-shadow duration-base ease-luxury",
              "hover:shadow-[0_12px_40px_rgb(26_24_21/0.12)]",
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
              className="size-full object-cover object-top"
              loading="lazy"
              draggable={false}
            />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
