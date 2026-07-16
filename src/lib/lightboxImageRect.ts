export type LightboxRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export function rectFromDomRect(rect: DOMRectReadOnly): LightboxRect {
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
  };
}

/**
 * Lightbox image frame — image contained within the viewport, top-aligned,
 * centered horizontally. Mirrors the slide's `object-contain object-top` so the
 * fly-in handoff lands on the exact same rect (no scale/position jump).
 */
export function computeLightboxTargetRect(
  viewportWidth: number,
  viewportHeight: number,
  aspectRatio: number,
): LightboxRect {
  let height = viewportHeight;
  let width = height * aspectRatio;

  // Wider than the viewport → constrain by width and letterbox vertically.
  if (width > viewportWidth) {
    width = viewportWidth;
    height = width / aspectRatio;
  }

  return {
    left: (viewportWidth - width) / 2,
    top: 0,
    width,
    height,
  };
}

export function resolveImageAspectRatio(
  src: string,
  fallbackAspect: number,
): Promise<number> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const aspect = img.naturalWidth / img.naturalHeight;
      resolve(aspect > 0 ? aspect : fallbackAspect);
    };
    img.onerror = () => resolve(fallbackAspect);
    img.src = src;
  });
}
