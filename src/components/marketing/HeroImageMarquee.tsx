import { cn } from "../../lib/cn";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import type { ProductImage } from "../../types/product";

export type HeroImageMarqueeProps = {
  /** Slower / fewer tiles - left column. */
  columnOne: readonly ProductImage[];
  /** Opposite scroll - right column. */
  columnTwo: readonly ProductImage[];
  className?: string;
};

function MarqueeTile({ image }: { image: ProductImage }) {
  return (
    <div className="relative aspect-4/5 w-full overflow-hidden rounded-xs bg-neutral-100">
      <img
        src={image.src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover"
        style={{ objectPosition: productImageObjectPosition(image) }}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </div>
  );
}

function MarqueeColumn({
  images,
  reverse,
  reducedMotion,
}: {
  images: readonly ProductImage[];
  reverse?: boolean;
  reducedMotion: boolean;
}) {
  const stack = reducedMotion ? images : [...images, ...images];

  return (
    <div className="min-w-0 flex-1 overflow-hidden">
      <div
        className={cn(
          "flex flex-col gap-3",
          !reducedMotion &&
            (reverse ? "animate-marquee-y-reverse" : "animate-marquee-y"),
        )}
      >
        {stack.map((image, index) => (
          <MarqueeTile key={`${image.src}-${index}`} image={image} />
        ))}
      </div>
    </div>
  );
}

/**
 * Dual-column vertical image marquee (Code House hero pattern).
 * Soft fades into page background; pauses when reduced motion is on.
 */
export function HeroImageMarquee({
  columnOne,
  columnTwo,
  className,
}: HeroImageMarqueeProps) {
  const reducedMotion = useMotionReduced();

  if (columnOne.length === 0 && columnTwo.length === 0) return null;

  return (
    <div
      className={cn(
        "relative mx-auto h-[min(36rem,68svh)] w-full max-w-xl overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-linear-to-b from-neutral-0 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-linear-to-t from-neutral-0 to-transparent"
        aria-hidden="true"
      />
      <div className="flex size-full gap-3">
        <MarqueeColumn images={columnOne} reducedMotion={reducedMotion} />
        <MarqueeColumn
          images={columnTwo}
          reverse
          reducedMotion={reducedMotion}
        />
      </div>
    </div>
  );
}
