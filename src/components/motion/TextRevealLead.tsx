import { useMemo, useRef } from "react";
import { cn } from "../../lib/cn";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { useScrollRevealProgress } from "../../hooks/useScrollRevealProgress";
import { getLineRevealProgress, useTextLineSplit } from "../../hooks/useTextLineSplit";

export const textRevealLeadTypographyClassName =
  "font-heading text-[clamp(26px,2.8vw,38px)] leading-[1.3] tracking-tight text-neutral-900";

type TextRevealLeadProps = {
  children: string;
  className?: string;
  id?: string;
  /** `line` — one line at a time; `word` — sequential word reveal (better for centered multi-line headings). */
  revealUnit?: "line" | "word";
  typographyClassName?: string;
  mutedClassName?: string;
  fillClassName?: string;
};

type TextRevealSegmentProps = {
  text: string;
  progress: number;
  mutedClassName: string;
  fillClassName: string;
};

type TextRevealLineProps = {
  line: string;
  progress: number;
  typographyClassName: string;
  mutedClassName: string;
  fillClassName: string;
};

function TextRevealSegment({
  text,
  progress,
  mutedClassName,
  fillClassName,
}: TextRevealSegmentProps) {
  const clipRight = `${(1 - progress) * 100}%`;

  // inline-block is required so absolute overlay shares the word box
  // (inline + absolute inset-0 draws a second visible word beside the muted one).
  return (
    <span className="relative inline-block">
      <span className={mutedClassName}>{text}</span>
      <span
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden whitespace-nowrap",
          fillClassName,
        )}
        data-text-reveal-el="overlay"
        style={{ clipPath: `inset(0 ${clipRight} 0 0)` }}
      >
        {text}
      </span>
    </span>
  );
}

function TextRevealLine({
  line,
  progress,
  typographyClassName,
  mutedClassName,
  fillClassName,
}: TextRevealLineProps) {
  const clipRight = `${(1 - progress) * 100}%`;

  return (
    <div className="relative overflow-hidden">
      <p className={cn(typographyClassName, mutedClassName)}>{line}</p>
      <div
        className="absolute inset-0 overflow-hidden"
        data-text-reveal-el="overlay"
        style={{ clipPath: `inset(0 ${clipRight} 0 0)` }}
      >
        <p className={cn(typographyClassName, fillClassName)}>{line}</p>
      </div>
    </div>
  );
}

export function TextRevealLead({
  children,
  className,
  id,
  revealUnit = "line",
  typographyClassName = textRevealLeadTypographyClassName,
  mutedClassName = "text-neutral-200",
  fillClassName = "text-neutral-900",
}: TextRevealLeadProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useMotionReduced();
  const words = useMemo(() => children.split(/\s+/).filter(Boolean), [children]);
  const lines = useTextLineSplit(children, containerRef, typographyClassName);
  const segmentCount = revealUnit === "word" ? words.length : (lines?.length ?? 1);
  // Start above the sticky product bar; finish before editorial sticky freezes rect.top.
  const progress = useScrollRevealProgress(containerRef, {
    start: 0.8,
    end: Math.max(0.4, 0.55 - segmentCount * (revealUnit === "word" ? 0.01 : 0.014)),
  });

  if (reduce) {
    return (
      <p id={id} className={cn(typographyClassName, fillClassName, "max-w-prose", className)}>
        {children}
      </p>
    );
  }

  return (
    <div ref={containerRef} className={cn("text-reveal relative max-w-prose", className)}>
      <p id={id} className="sr-only">
        {children}
      </p>
      {revealUnit === "word" ? (
        <p className={cn(typographyClassName)} aria-hidden="true">
          {words.map((word, index) => (
            <span key={`${index}-${word}`}>
              <TextRevealSegment
                text={word}
                progress={getLineRevealProgress(progress, index, words.length)}
                mutedClassName={mutedClassName}
                fillClassName={fillClassName}
              />
              {index < words.length - 1 ? " " : null}
            </span>
          ))}
        </p>
      ) : revealUnit === "line" && lines ? (
        <div className="relative" aria-hidden="true">
          {lines.map((line, index) => (
            <TextRevealLine
              key={`${index}-${line.slice(0, 24)}`}
              line={line}
              progress={getLineRevealProgress(progress, index, lines.length)}
              typographyClassName={typographyClassName}
              mutedClassName={mutedClassName}
              fillClassName={fillClassName}
            />
          ))}
        </div>
      ) : (
        <p className={cn(typographyClassName, mutedClassName)} aria-hidden="true">
          {children}
        </p>
      )}
    </div>
  );
}
