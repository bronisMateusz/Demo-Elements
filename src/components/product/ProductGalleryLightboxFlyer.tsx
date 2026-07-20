import { motion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { EASE_LUXURY, EASE_OUT } from "../../lib/motionEase";
import { LIGHTBOX_MOTION } from "../../lib/lightboxMotion";
import {
  computeLightboxTargetRect,
  type LightboxRect,
  rectFromDomRect,
  resolveImageAspectRatio,
} from "../../lib/lightboxImageRect";
import { productImageFitClassName } from "../../lib/productImageStyle";
import type { ProductImage } from "../../types/product";

export type LightboxOpenOrigin = {
  rect: DOMRectReadOnly;
  objectPosition?: string;
};

type ProductGalleryLightboxFlyerProps = {
  image: ProductImage;
  origin: LightboxOpenOrigin;
  mode: "enter" | "exit";
  fadingOut?: boolean;
  /** Live size/offset of the image stage - the box the slide fills. */
  getViewport: () => { width: number; height: number; left?: number; top?: number };
  onPositionComplete: () => void;
  onFadeComplete?: () => void;
};

const {
  flyDuration: FLYER_DURATION_S,
  handoffDuration: FLYER_HANDOFF_S,
  handoffDelay: FLYER_HANDOFF_DELAY_S,
  overlayExitDelay: FLYER_EXIT_BG_DELAY_S,
} = LIGHTBOX_MOTION;

export function ProductGalleryLightboxFlyer({
  image,
  origin,
  mode,
  fadingOut = false,
  getViewport,
  onPositionComplete,
  onFadeComplete,
}: ProductGalleryLightboxFlyerProps) {
  const [targetRect, setTargetRect] = useState<LightboxRect | null>(null);
  const [positionDone, setPositionDone] = useState(false);
  const fadeDoneRef = useRef(false);
  const fromRect = rectFromDomRect(origin.rect);

  useLayoutEffect(() => {
    fadeDoneRef.current = false;
  }, [fadingOut, mode]);

  useEffect(() => {
    if (!fadingOut) return;
    const timer = window.setTimeout(
      () => onFadeComplete?.(),
      (FLYER_HANDOFF_DELAY_S + FLYER_HANDOFF_S) * 1000,
    );
    return () => window.clearTimeout(timer);
  }, [fadingOut, onFadeComplete]);

  useLayoutEffect(() => {
    let cancelled = false;
    const fallbackAspect = origin.rect.width / origin.rect.height || 1;

    resolveImageAspectRatio(image.src, fallbackAspect).then((aspectRatio) => {
      if (cancelled) return;
      const viewport = getViewport();
      setTargetRect(
        computeLightboxTargetRect(viewport.width, viewport.height, aspectRatio, {
          left: viewport.left,
          top: viewport.top,
        }),
      );
    });

    return () => {
      cancelled = true;
    };
  }, [getViewport, image.src, origin.rect]);

  if (!targetRect) return null;

  const frameFrom = mode === "enter" ? fromRect : targetRect;
  const frameTo = mode === "enter" ? targetRect : fromRect;
  const handoffActive = fadingOut && mode === "enter";
  const frameBackgroundInitialOpacity = mode === "exit" ? 0 : 1;
  const frameBackgroundOpacity = handoffActive ? 0 : 1;

  // Match gallery object-fit so the exit handoff does not flash contain→cover
  // (or the reverse). Target rect shares the image aspect, so both fits look
  // identical at the lightbox end of the flight.
  const thumbPosition = origin.objectPosition ?? "50% 50%";
  const positionFrom = mode === "enter" ? thumbPosition : "50% 50%";
  const positionTo = mode === "enter" ? "50% 50%" : thumbPosition;

  return (
    <motion.div
      className="pointer-events-none fixed z-[402] overflow-hidden"
      initial={{
        left: frameFrom.left,
        top: frameFrom.top,
        width: frameFrom.width,
        height: frameFrom.height,
        boxShadow: mode === "enter" ? "var(--shadow-subtle)" : "0 0 #0000",
      }}
      animate={{
        left: frameTo.left,
        top: frameTo.top,
        width: frameTo.width,
        height: frameTo.height,
        boxShadow: handoffActive || positionDone ? "0 0 #0000" : "var(--shadow-subtle)",
      }}
      transition={{
        left: { duration: FLYER_DURATION_S, ease: EASE_OUT },
        top: { duration: FLYER_DURATION_S, ease: EASE_OUT },
        width: { duration: FLYER_DURATION_S, ease: EASE_OUT },
        height: { duration: FLYER_DURATION_S, ease: EASE_OUT },
        boxShadow: {
          delay: handoffActive ? FLYER_HANDOFF_DELAY_S : 0,
          duration: FLYER_HANDOFF_S,
          ease: EASE_LUXURY,
        },
      }}
      onAnimationComplete={() => {
        if (mode === "exit") {
          if (fadeDoneRef.current) return;
          fadeDoneRef.current = true;
          onFadeComplete?.();
          return;
        }
        if (positionDone || fadingOut) return;
        setPositionDone(true);
        onPositionComplete();
      }}
    >
      <motion.div
        className="absolute inset-0 bg-neutral-0"
        initial={{ opacity: frameBackgroundInitialOpacity }}
        animate={{ opacity: frameBackgroundOpacity }}
        transition={{
          delay: handoffActive
            ? FLYER_HANDOFF_DELAY_S
            : mode === "exit"
              ? FLYER_EXIT_BG_DELAY_S
              : 0,
          duration: FLYER_HANDOFF_S,
          ease: EASE_LUXURY,
        }}
      />
      <motion.img
        src={image.src}
        alt=""
        className={cn("relative z-[1] block h-full w-full", productImageFitClassName(image))}
        initial={{ objectPosition: positionFrom }}
        animate={{ objectPosition: positionTo }}
        transition={{ duration: FLYER_DURATION_S, ease: EASE_OUT }}
        draggable={false}
      />
    </motion.div>
  );
}
