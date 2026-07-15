import { useRef } from "react";
import { cn } from "../../lib/cn";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { useScrollRevealProgress } from "../../hooks/useScrollRevealProgress";
import { getLineRevealProgress, useTextLineSplit } from "../../hooks/useTextLineSplit";

export const textRevealLeadTypographyClassName =
  "font-heading text-[clamp(26px,2.8vw,38px)] leading-[1.3] tracking-tight text-neutral-900";

type TextRevealLeadProps = {
  children: string;
  className?: string;
};

type TextRevealLineProps = {
  line: string;
  progress: number;
};

function TextRevealLine({ line, progress }: TextRevealLineProps) {
  const clipRight = `${(1 - progress) * 100}%`;

  return (
    <div className="relative overflow-hidden">
      <p className={cn(textRevealLeadTypographyClassName, "text-neutral-200")}>{line}</p>
      <div
        className="absolute inset-0 overflow-hidden"
        data-text-reveal-el="overlay"
        style={{ clipPath: `inset(0 ${clipRight} 0 0)` }}
      >
        <p className={textRevealLeadTypographyClassName}>{line}</p>
      </div>
    </div>
  );
}

export function TextRevealLead({ children, className }: TextRevealLeadProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useMotionReduced();
  const lines = useTextLineSplit(children, containerRef, textRevealLeadTypographyClassName);
  const lineCount = lines?.length ?? 1;
  const progress = useScrollRevealProgress(containerRef, {
    start: 0.9,
    end: Math.max(0.28, 0.5 - lineCount * 0.018),
  });

  if (reduce) {
    return (
      <p className={cn(textRevealLeadTypographyClassName, "max-w-prose", className)}>{children}</p>
    );
  }

  return (
    <div ref={containerRef} className={cn("text-reveal relative max-w-prose", className)}>
      <p className="sr-only">{children}</p>
      {lines ? (
        <div className="relative" aria-hidden="true">
          {lines.map((line, index) => (
            <TextRevealLine
              key={`${index}-${line.slice(0, 24)}`}
              line={line}
              progress={getLineRevealProgress(progress, index, lines.length)}
            />
          ))}
        </div>
      ) : (
        <p className={cn(textRevealLeadTypographyClassName, "text-neutral-200")} aria-hidden="true">
          {children}
        </p>
      )}
    </div>
  );
}
