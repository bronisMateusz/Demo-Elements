import { motion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { EASE_LUXURY, EASE_OUT } from "../../lib/motionEase";
import { LIGHTBOX_MOTION } from "../../lib/lightboxMotion";
import {
  type LightboxRect,
  rectFromDomRect,
} from "../../lib/lightboxImageRect";
import { productImageFitClassName } from "../../lib/productImageStyle";
import type { ProductImage } from "../../types/product";

export type LightboxOpenOrigin = {
  rect: DOMRectReadOnly;
  objectPosition?: string;
  /** Natural aspect from the already-loaded thumb - required for a stable FLIP target. */
  aspectRatio?: number;
};

type ProductGalleryLightboxFlyerProps = {
  image: ProductImage;
  origin: LightboxOpenOrigin;
  mode: "enter" | "exit";
  /** Precomputed contained frame - shared with the Swiper slide so handoff sizes match. */
  targetRect: LightboxRect;
  fadingOut?: boolean;
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
  targetRect,
  fadingOut = false,
  onPositionComplete,
  onFadeComplete,
}: ProductGalleryLightboxFlyerProps) {
  const fromRect = rectFromDomRect(origin.rect);
  const [positionDone, setPositionDone] = useState(false);
  const fadeDoneRef = useRef(false);
  const reportedRef = useRef(false);

  useLayoutEffect(() => {
    fadeDoneRef.current = false;
    reportedRef.current = false;
  }, [fadingOut, mode]);

  useEffect(() => {
    if (mode !== "enter" || reportedRef.current) return;
    const timer = window.setTimeout(() => {
      if (reportedRef.current) return;
      reportedRef.current = true;
      setPositionDone(true);
      onPositionComplete();
    }, FLYER_DURATION_S * 1000);
    return () => window.clearTimeout(timer);
  }, [mode, onPositionComplete]);

  useEffect(() => {
    if (!fadingOut) return;
    const timer = window.setTimeout(
      () => onFadeComplete?.(),
      (FLYER_HANDOFF_DELAY_S + FLYER_HANDOFF_S) * 1000,
    );
    return () => window.clearTimeout(timer);
  }, [fadingOut, onFadeComplete]);

  useEffect(() => {
    if (mode !== "exit") return;
    const timer = window.setTimeout(() => {
      if (fadeDoneRef.current) return;
      fadeDoneRef.current = true;
      onFadeComplete?.();
    }, FLYER_DURATION_S * 1000);
    return () => window.clearTimeout(timer);
  }, [mode, onFadeComplete]);

  const frameFrom = mode === "enter" ? fromRect : targetRect;
  const frameTo = mode === "enter" ? targetRect : fromRect;
  const handoffActive = fadingOut && mode === "enter";
  const frameBackgroundInitialOpacity = mode === "exit" ? 0 : 1;
  const frameBackgroundOpacity = handoffActive ? 0 : 1;

  const thumbPosition = origin.objectPosition ?? "50% 50%";
  const positionFrom = mode === "enter" ? thumbPosition : "50% 50%";
  const positionTo = mode === "enter" ? "50% 50%" : thumbPosition;

  // Always match the gallery fit. For cover images the lightbox target frame shares the
  // natural aspect, so cover ≡ contain there - and the exit lands on the same crop as the slide.
  const imageFitClass = productImageFitClassName(image);

  return (
    <motion.div
      className="pointer-events-none fixed z-402 overflow-hidden"
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
        className={cn("relative z-1 block size-full", imageFitClass)}
        initial={{ objectPosition: positionFrom }}
        animate={{ objectPosition: positionTo }}
        transition={{ duration: FLYER_DURATION_S, ease: EASE_OUT }}
        draggable={false}
      />
    </motion.div>
  );
}
