import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/cn";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { EASE_LUXURY } from "../../lib/motionEase";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import type { ProductImage } from "../../types/product";

export type OverlapPhotosProps = {
  /** Starts in the top-start slot. */
  back: ProductImage;
  /** Starts in the bottom-end slot (front). */
  front: ProductImage;
  className?: string;
};

/** Offset as % of the plate itself: 42% of parent / 58% plate ≈ 72.41%. */
const SLOT_END = "72.413793%";
const SWAP_MS = 4000;
const MOVE_S = 1.15;
const SHADOW_FRONT = "0 8px 32px rgba(26, 24, 21, 0.08)";

const plateClassName =
  "absolute inset-s-0 top-0 h-[58%] w-[58%] overflow-hidden rounded-xs";

/**
 * Baseframe Advisory-style overlapping photos - smooth diagonal slot swap.
 */
export function OverlapPhotos({ back, front, className }: OverlapPhotosProps) {
  const reducedMotion = useMotionReduced();
  const [swapped, setSwapped] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => {
      setSwapped((current) => !current);
    }, SWAP_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  return (
    <div
      className={cn("relative size-full min-h-48", className)}
      aria-hidden="true"
    >
      <OverlapPlate
        image={back}
        atEnd={reducedMotion ? false : swapped}
        reducedMotion={reducedMotion}
      />
      <OverlapPlate
        image={front}
        atEnd={reducedMotion ? true : !swapped}
        reducedMotion={reducedMotion}
      />
    </div>
  );
}

function OverlapPlate({
  image,
  atEnd,
  reducedMotion,
}: {
  image: ProductImage;
  atEnd: boolean;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      className={plateClassName}
      initial={false}
      animate={{
        x: atEnd ? SLOT_END : "0%",
        y: atEnd ? SLOT_END : "0%",
        zIndex: atEnd ? 2 : 1,
        boxShadow: atEnd ? SHADOW_FRONT : "0 0 0 rgba(0,0,0,0)",
      }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : {
              x: { duration: MOVE_S, ease: EASE_LUXURY },
              y: { duration: MOVE_S, ease: EASE_LUXURY },
              // Flip stacking mid-glide so the handoff is soft.
              zIndex: { delay: MOVE_S * 0.45, duration: 0 },
              boxShadow: { delay: MOVE_S * 0.45, duration: 0.25 },
            }
      }
    >
      <img
        src={image.src}
        alt=""
        className="size-full object-cover"
        style={{ objectPosition: productImageObjectPosition(image) }}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </motion.div>
  );
}
