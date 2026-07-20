export type LightboxRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type LightboxViewport = {
  width: number;
  height: number;
  /** Offset of the image stage within the window (for fixed flyer positioning). */
  left?: number;
  top?: number;
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
 * Lightbox image frame - image contained within the stage, centered on both axes.
 * Mirrors the slide's `object-contain` so the fly-in handoff lands on the same rect.
 */
export function computeLightboxTargetRect(
  viewportWidth: number,
  viewportHeight: number,
  aspectRatio: number,
  offset: { left?: number; top?: number } = {},
): LightboxRect {
  let height = viewportHeight;
  let width = height * aspectRatio;

  // Wider than the stage → constrain by width and letterbox vertically.
  if (width > viewportWidth) {
    width = viewportWidth;
    height = width / aspectRatio;
  }

  const offsetLeft = offset.left ?? 0;
  const offsetTop = offset.top ?? 0;

  return {
    left: offsetLeft + (viewportWidth - width) / 2,
    top: offsetTop + (viewportHeight - height) / 2,
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
