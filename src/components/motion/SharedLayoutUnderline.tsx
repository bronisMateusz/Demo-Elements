// beui.dev/components/motion/shared-layout-underline

import { LayoutGroup, motion, type HTMLMotionProps } from "motion/react";
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
import { internalSubnavHoverLineClassName } from "../../lib/layoutTokens";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { SPRING_LAYOUT } from "../../lib/motionEase";

export type SharedLayoutUnderlineProps = {
  children: ReactNode;
  className?: string;
  /** Tailwind classes on the hover preview line. */
  lineClassName?: string;
  /** Horizontal inset of the line relative to each item (px). Default 0. */
  insetX?: number;
  /** Distance from the bottom of each item (px). Default 0. */
  bottom?: number;
} & Omit<HTMLMotionProps<"div">, "children" | "className">;

export function SharedLayoutUnderline({
  children,
  className,
  lineClassName = internalSubnavHoverLineClassName,
  insetX = 0,
  bottom = 0,
  onMouseLeave,
  ...rest
}: SharedLayoutUnderlineProps) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const uid = useId();
  const reduce = useMotionReduced();
  const lineStyle = { left: insetX, right: insetX, bottom };
  const hoverLineClassName = cn(
    "pointer-events-none absolute z-30 h-px",
    lineClassName,
  );
  const hoverLayoutId = `shared-underline-hover-${uid}`;

  return (
    <LayoutGroup id={`shared-underline-${uid}`}>
      <motion.div
        layoutRoot
        {...rest}
        onMouseLeave={(event) => {
          onMouseLeave?.(event);
          setHoveredKey(null);
        }}
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
            const isHovered = hoverable && hoveredKey === childKey;

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
                    layoutId={hoverLayoutId}
                    transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
                    className={hoverLineClassName}
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
