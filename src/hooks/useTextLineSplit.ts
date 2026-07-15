import { useEffect, useState, type RefObject } from "react";

export function splitTextIntoLines(
  text: string,
  width: number,
  typographyClassName: string,
): string[] {
  if (width <= 0) return [text];

  const probe = document.createElement("p");
  probe.className = typographyClassName;
  Object.assign(probe.style, {
    position: "absolute",
    visibility: "hidden",
    pointerEvents: "none",
    width: `${width}px`,
    left: "0",
    top: "0",
    margin: "0",
  });

  const words = text.split(/\s+/).filter(Boolean);
  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.style.display = "inline";
    span.textContent = word + (index < words.length - 1 ? " " : "");
    probe.appendChild(span);
  });

  document.body.appendChild(probe);

  const spans = probe.querySelectorAll("span");
  const nextLines: string[] = [];
  let lineWords: string[] = [];
  let lastTop = -1;

  spans.forEach((span) => {
    const top = (span as HTMLElement).offsetTop;
    if (lastTop !== -1 && top !== lastTop) {
      nextLines.push(lineWords.join(" "));
      lineWords = [];
    }
    lastTop = top;
    lineWords.push(span.textContent?.trim() ?? "");
  });

  if (lineWords.length) nextLines.push(lineWords.join(" "));

  document.body.removeChild(probe);

  return nextLines.length ? nextLines : [text];
}

export function useTextLineSplit(
  text: string,
  containerRef: RefObject<HTMLElement | null>,
  typographyClassName: string,
) {
  const [lines, setLines] = useState<string[] | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const width = container.clientWidth;
      if (width <= 0) return;
      setLines(splitTextIntoLines(text, width, typographyClassName));
    };

    let raf = 0;
    const scheduleMeasure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    scheduleMeasure();

    const observer = new ResizeObserver(scheduleMeasure);
    observer.observe(container);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [text, containerRef, typographyClassName]);

  return lines;
}

export function getLineRevealProgress(overall: number, index: number, total: number): number {
  if (total <= 1) return overall;

  const segment = 1 / total;
  const lineStart = index * segment;
  const lineEnd = (index + 1) * segment;

  if (overall <= lineStart) return 0;
  if (overall >= lineEnd) return 1;
  return (overall - lineStart) / segment;
}
