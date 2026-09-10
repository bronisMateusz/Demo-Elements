import { cn } from "../../lib/cn";
import { useMotionReduced } from "../../hooks/useMotionReduced";

export type BrandLogoItem = {
  label: string;
  logoSrc: string;
};

/** @deprecated Use BrandLogoItem */
export type BrandLogoPill = BrandLogoItem;

type BrandLogoMarqueeProps = {
  logos: readonly BrandLogoItem[];
  className?: string;
};

function LogoCell({ logo }: { logo: BrandLogoItem }) {
  return (
    <div
      className={cn(
        "flex h-14 w-32 shrink-0 items-center justify-center border-e border-neutral-300 bg-neutral-0 px-3",
        "sm:h-16 sm:w-36 sm:px-4",
      )}
    >
      <span className="flex h-8 w-full items-center justify-center sm:h-9">
        <img
          src={logo.logoSrc}
          alt=""
          aria-hidden="true"
          className="max-h-full max-w-full object-contain opacity-70"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </span>
    </div>
  );
}

function MarqueeRow({
  logos,
  reverse,
  reducedMotion,
}: {
  logos: readonly BrandLogoItem[];
  reverse?: boolean;
  reducedMotion: boolean;
}) {
  const stack = reducedMotion ? logos : [...logos, ...logos];

  return (
    <div className="flex w-max border-b border-neutral-300 last:border-b-0">
      <div
        className={cn(
          "flex w-max",
          !reducedMotion &&
            (reverse ? "animate-marquee-x-reverse" : "animate-marquee-x"),
        )}
      >
        {stack.map((logo, index) => (
          <LogoCell key={`${logo.label}-${index}`} logo={logo} />
        ))}
      </div>
    </div>
  );
}

/**
 * Dual-row horizontal logo marquee - HomeBrands-style rectangular cells, no labels.
 */
export function BrandLogoMarquee({ logos, className }: BrandLogoMarqueeProps) {
  const reducedMotion = useMotionReduced();
  if (logos.length === 0) return null;

  const mid = Math.ceil(logos.length / 2);
  const rowOne = logos.slice(0, mid);
  const rowTwo = logos.slice(mid);
  const secondRow = rowTwo.length > 0 ? rowTwo : logos;

  return (
    <div
      className={cn(
        "relative h-28 w-full overflow-hidden border border-neutral-300 bg-neutral-0 sm:h-32",
        "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 flex flex-col justify-center">
        <MarqueeRow logos={rowOne} reducedMotion={reducedMotion} />
        <MarqueeRow logos={secondRow} reverse reducedMotion={reducedMotion} />
      </div>
    </div>
  );
}
