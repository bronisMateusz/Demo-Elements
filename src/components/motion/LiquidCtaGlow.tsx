import { useEffect, useId, useState } from "react";
import { cn } from "../../lib/cn";
import {
  isMotionPaused,
  subscribeMotionPreference,
} from "../../lib/a11yPreferences";

type LiquidCtaGlowProps = {
  className?: string;
};

/** Absolute fill - use on the CTA section root. */
export function LiquidCtaGlow({ className }: LiquidCtaGlowProps) {
  const rawId = useId();
  const filterId = `liquid-cta-${rawId.replace(/:/g, "")}`;
  const [paused, setPaused] = useState(() => isMotionPaused());

  useEffect(() => subscribeMotionPreference(setPaused), []);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden bg-gold-600",
        className,
      )}
      aria-hidden="true"
    >
      <svg className="absolute size-0" aria-hidden="true">
        <defs>
          <filter
            id={filterId}
            x="-25%"
            y="-25%"
            width="150%"
            height="150%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.012"
              numOctaves="3"
              seed="4"
              result="noise"
            >
              {!paused ? (
                <animate
                  attributeName="baseFrequency"
                  dur="18s"
                  values="0.008 0.012;0.014 0.009;0.009 0.015;0.008 0.012"
                  repeatCount="indefinite"
                />
              ) : null}
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="75"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="absolute inset-[-35%] opacity-95 motion-reduce:opacity-80"
        style={{ filter: `url(#${filterId})` }}
      >
        <div className="liquid-cta-blob absolute inset-s-[-5%] top-[5%] h-[70%] w-[55%] rounded-full bg-gold-400/90 blur-2xl" />
        <div className="liquid-cta-blob liquid-cta-blob-swirl absolute inset-e-[-10%] top-[-5%] h-[65%] w-[50%] rounded-full bg-gold-400/70 blur-2xl [animation-delay:-6s]" />
        <div className="liquid-cta-blob absolute bottom-[-15%] inset-s-[20%] h-[60%] w-[55%] rounded-full bg-gold-500/85 blur-2xl [animation-delay:-12s]" />
        <div className="liquid-cta-blob liquid-cta-blob-swirl absolute bottom-[5%] inset-e-[15%] h-[50%] w-[45%] rounded-full bg-gold-500/75 blur-2xl [animation-delay:-18s]" />
      </div>

      <div className="absolute inset-0 bg-neutral-900/12" />
      <div className="absolute inset-0 bg-linear-to-br from-neutral-900/25 via-gold-600/20 to-neutral-900/35" />
      <div className="absolute inset-0 bg-radial-[at_50%_120%] from-neutral-900/42 to-transparent to-55%" />
    </div>
  );
}
