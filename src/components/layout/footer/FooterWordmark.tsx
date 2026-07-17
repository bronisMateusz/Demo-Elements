import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "../../../lib/cn";
import { useMotionReduced } from "../../../hooks/useMotionReduced";

type FooterWordmarkProps = {
  text?: string;
  className?: string;
  pointer: { active: boolean; clientX: number; clientY: number };
};

const wordmarkTextClassName = cn(
  "m-0 block select-none whitespace-nowrap font-heading font-bold uppercase leading-none tracking-tighter",
  "text-[clamp(5.5rem,20vw,14rem)]",
);

type PointerState = {
  active: boolean;
  clientX: number;
  clientY: number;
};

/** Tracks cursor over the footer main block for the wordmark spotlight. */
export function FooterSpotlightRoot({
  children,
  className,
}: {
  children: (pointer: PointerState) => ReactNode;
  className?: string;
}) {
  const reduce = useMotionReduced();
  const [pointer, setPointer] = useState<PointerState>({
    active: false,
    clientX: 0,
    clientY: 0,
  });

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    setPointer({
      active: true,
      clientX: event.clientX,
      clientY: event.clientY,
    });
  };

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onMouseMove={onMove}
      onMouseLeave={() => setPointer((current) => ({ ...current, active: false }))}
    >
      {children(pointer)}
    </div>
  );
}

/**
 * Giant outline wordmark with a cursor spotlight that reveals a solid fill (beUI-style).
 * Bottom ~1/3 is clipped so the mark feels oversized for the section.
 */
export function FooterWordmark({
  text = "ELEMENTS",
  className,
  pointer,
}: FooterWordmarkProps) {
  const markRef = useRef<HTMLDivElement>(null);
  const reduce = useMotionReduced();
  const [local, setLocal] = useState({ x: 50, y: 50 });

  useLayoutEffect(() => {
    if (!pointer.active || reduce) return;
    const rect = markRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) return;
    setLocal({
      x: ((pointer.clientX - rect.left) / rect.width) * 100,
      y: ((pointer.clientY - rect.top) / rect.height) * 100,
    });
  }, [pointer, reduce]);

  const maskStyle = {
    opacity: !reduce && pointer.active ? 1 : 0,
    maskImage: `radial-gradient(circle 14rem at ${local.x}% ${local.y}%, #000 15%, transparent 70%)`,
    WebkitMaskImage: `radial-gradient(circle 14rem at ${local.x}% ${local.y}%, #000 15%, transparent 70%)`,
  } satisfies CSSProperties;

  return (
    <div
      ref={markRef}
      className={cn(
        "pointer-events-none relative h-[clamp(4.5rem,12vw,8rem)] overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        <div className="relative translate-y-[42%]">
          <p
            className={cn(
              wordmarkTextClassName,
              "text-transparent",
              "[-webkit-text-stroke:1px_var(--color-neutral-300)]",
            )}
          >
            {text}
          </p>
          <p
            className={cn(
              wordmarkTextClassName,
              "absolute inset-0 text-neutral-300/70 transition-opacity duration-base ease-out",
            )}
            style={maskStyle}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
