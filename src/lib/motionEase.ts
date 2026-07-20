/** Shared-layout glides - pills, indicators and panels morphing between positions. */
export const SPRING_LAYOUT = {
  type: "spring",
  stiffness: 360,
  damping: 32,
  mass: 0.6,
} as const;

/** Press feedback on buttons and other tappable surfaces. */
export const SPRING_PRESS = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.6,
} as const;

/** Overlay panel entrances - modals, sheets and popovers. */
export const SPRING_PANEL = {
  type: "spring",
  stiffness: 420,
  damping: 40,
  mass: 0.5,
} as const;

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Matches `--ease-luxury` - slow settle for overlay fades. */
export const EASE_LUXURY = [0.25, 0.1, 0.25, 1] as const;
