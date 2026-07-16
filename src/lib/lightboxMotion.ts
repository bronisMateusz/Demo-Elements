/** Shared timings for the product lightbox open/close choreography (seconds). */
export const LIGHTBOX_MOTION = {
  /** FLIP fly-in/out of the image frame between thumbnail and viewport. */
  flyDuration: 0.56,
  /** White frame ↔ overlay cross-fade at the fly-in handoff. */
  handoffDuration: 0.58,
  handoffDelay: 0.06,
  /** Full-screen overlay background fade. */
  overlayEnterDelay: 0.12,
  overlayExitDelay: 0.04,
  overlayEnterDuration: 0.42,
  overlayExitDuration: 0.56,
  /** Swiper content fade-in under the flyer. */
  contentFadeDuration: 0.32,
  /** Controls (chrome) fade. */
  chromeFadeDuration: 0.2,
} as const;

/** Swiper transition speed inside the lightbox (ms). */
export const LIGHTBOX_SWIPER_SPEED_MS = 420;
