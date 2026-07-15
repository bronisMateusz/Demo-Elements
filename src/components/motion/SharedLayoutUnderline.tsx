// beui.dev/components/motion/shared-layout-underline

import { LayoutGroup, motion } from "motion/react";
import {
  Children,
  cloneElement,
  isValidElement,
  useId,
  useState,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { SPRING_LAYOUT } from "../../lib/motionEase";

export type SharedLayoutUnderlineProps = {
  children: ReactNode;
  className?: string;
  /** Tailwind classes on the moving line. */
  lineClassName?: string;
  /** Horizontal inset of the line relative to each item (px). Default 0. */
  insetX?: number;
  /** Distance from the bottom of each item (px). Default 0. */
  bottom?: number;
};

export function SharedLayoutUnderline({
  children,
  className,
  lineClassName = "bg-neutral-900",
  insetX = 0,
  bottom = 0,
}: SharedLayoutUnderlineProps) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const uid = useId();
  const reduce = useMotionReduced();
  const lineStyle = { left: insetX, right: insetX, bottom };
  const lineClass = cn("pointer-events-none absolute h-px", lineClassName);

  return (
    <LayoutGroup id={`shared-underline-${uid}`}>
      <motion.div
        layoutRoot
        onMouseLeave={() => setHoveredKey(null)}
        className={cn("flex", className)}
      >
        {Children.toArray(children)
          .filter(isValidElement)
          .map((child, index) => {
            const el = child as ReactElement<{
              className?: string;
              onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
              "data-hoverable"?: boolean;
              children?: ReactNode;
            }>;
            const childKey = el.key ? String(el.key) : `item-${index}`;
            const hoverable = el.props["data-hoverable"] !== false;
            const isHovered = hoveredKey === childKey;

            return cloneElement(
              el,
              {
                key: childKey,
                className: cn("relative", el.props.className),
                onMouseEnter: (event: MouseEvent<HTMLElement>) => {
                  el.props.onMouseEnter?.(event);
                  setHoveredKey(hoverable ? childKey : null);
                },
              },
              <>
                {isHovered ? (
                  <motion.span
                    layoutId={`shared-underline-${uid}`}
                    transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
                    className={cn(lineClass, "z-30")}
                    style={lineStyle}
                    aria-hidden="true"
                  />
                ) : null}
                {el.props.children}
              </>,
            );
          })}
      </motion.div>
    </LayoutGroup>
  );
}
