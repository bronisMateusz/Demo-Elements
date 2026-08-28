export const phosphorIconInFlexClassName = "[&_i]:leading-none";

/** Fixed 22px Phosphor glyph in buttons and icon plates. */
export const phosphorIconGlyphClassName = "[&_i]:text-h4";

/** Regular Phosphor strings (`ph ph-*`) → Light weight; fill icons unchanged. */
export function phosphorGlyphClassName(iconClass: string): string {
  if (/\bph-fill\b/.test(iconClass) || /\bph-light\b/.test(iconClass)) {
    return iconClass;
  }

  return iconClass.replace(/\bph\b(?!-)/, "ph-light");
}
