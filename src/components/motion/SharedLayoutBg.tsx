// beui.dev/components/motion/shared-layout-bg

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  type Variants,
} from "motion/react";
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

export type SharedLayoutBgProps = {
  children: ReactNode;
  className?: string;
  /** Tailwind class applied to the moving pill. */
  pillClassName?: string;
  /** Horizontal inset of the pill relative to each item (px). Default 0. */
  inset?: number;
};

const variants: Variants = {
  initial: { opacity: 0, filter: "blur(6px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  exit: (isActive: boolean) => (!isActive ? { opacity: 0, filter: "blur(6px)" } : {}),
};

const reducedVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: (isActive: boolean) => (!isActive ? { opacity: 0 } : {}),
};

export function SharedLayoutBg({
  children,
  className,
  pillClassName,
  inset = 0,
}: SharedLayoutBgProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const uid = useId();
  const reduce = useMotionReduced();

  return (
    <LayoutGroup id={`shared-layout-bg-${uid}`}>
      <motion.div
        layoutRoot
        onMouseLeave={() => setActiveId(null)}
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

          return cloneElement(
            el,
            {
              key: childKey,
              className: cn("relative", el.props.className),
              onMouseEnter: (event: MouseEvent<HTMLElement>) => {
                el.props.onMouseEnter?.(event);
                setActiveId(hoverable ? childKey : null);
              },
            },
            <>
              <AnimatePresence initial={false}>
                {activeId !== null ? (
                  <motion.div
                    variants={reduce ? reducedVariants : variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    custom={activeId !== null}
                    className="pointer-events-none absolute inset-y-0 z-0"
                    style={{ left: -inset, right: -inset }}
                  >
                    {activeId === childKey ? (
                      <motion.div
                        layoutId={`shared-bg-${uid}`}
                        transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
                        className={cn(
                          "pointer-events-none size-full rounded-xs bg-neutral-900/[0.06]",
                          pillClassName,
                        )}
                      />
                    ) : null}
                  </motion.div>
                ) : null}
              </AnimatePresence>
              {el.props.children}
            </>,
          );
        })}
      </motion.div>
    </LayoutGroup>
  );
}
