import { cn } from "../../lib/cn";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import type { ProductImage } from "../../types/product";

export type ArcStackImage = ProductImage & {
  /** Per-product zoom inside the square card (1 = natural contain). */
  zoom?: number;
};

export type ArcStackProps = {
  images: readonly ArcStackImage[];
  className?: string;
};

const ARC_STACK_CARD_COUNT = 7;
const ARC_STACK_DURATION_S = 9.8;
const ARC_STACK_STEP_S = ARC_STACK_DURATION_S / ARC_STACK_CARD_COUNT;
const ARC_STACK_DEFAULT_ZOOM = 1.15;

const staticCardClassName = [
  "arc-stack-card-static-1",
  "arc-stack-card-static-2",
  "arc-stack-card-static-3",
  "arc-stack-card-static-4",
  "arc-stack-card-static-5",
  "arc-stack-card-static-6",
  "arc-stack-card-static-7",
] as const;

/**
 * beUI-style arc stack - square product cards fan through a 3D semicircle.
 * Expects up to 7 images; extras are ignored. Use `zoom` per image to fit packshots.
 */
export function ArcStack({ images, className }: ArcStackProps) {
  const reducedMotion = useMotionReduced();
  const cards = images.slice(0, ARC_STACK_CARD_COUNT);

  if (cards.length === 0) return null;

  return (
    <div
      role="img"
      aria-label="Podgląd wzorników i produktów w stosie kart"
      className={cn(
        "relative isolate size-full min-h-48 overflow-hidden",
        className,
      )}
    >
      <div
        className="absolute inset-0 flex items-center justify-center perspective-[900px]"
        aria-hidden="true"
      >
        <div className="relative aspect-square h-[52%] max-h-44 transform-3d">
          {cards.map((image, index) => {
            const step = index + 1;
            const delayS = -(
              ((index + 4) % ARC_STACK_CARD_COUNT) *
              ARC_STACK_STEP_S
            );
            const zoom = image.zoom ?? ARC_STACK_DEFAULT_ZOOM;

            return (
              <div
                key={`${image.src}-${index}`}
                data-step={step}
                className={cn(
                  "absolute inset-0 overflow-hidden rounded-xs border border-neutral-0/80 bg-neutral-0",
                  reducedMotion
                    ? cn(
                        "arc-stack-card-static",
                        staticCardClassName[index] ?? staticCardClassName[0],
                      )
                    : "arc-stack-card",
                )}
                style={
                  reducedMotion ? undefined : { animationDelay: `${delayS}s` }
                }
              >
                <img
                  src={image.src}
                  alt=""
                  className="size-full origin-center object-contain p-1"
                  style={{ transform: `scale(${zoom})` }}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
