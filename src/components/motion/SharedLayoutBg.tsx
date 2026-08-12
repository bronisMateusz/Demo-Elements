// beui.dev/components/motion/shared-layout-bg

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  type HTMLMotionProps,
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
  /**
   * Horizontal inset of the pill relative to each item (px).
   * `0` uses `inset-0` (fits bordered chips). beui default is 20 for nav rows.
   */
  inset?: number;
  /** Optional positioning override for the pill wrapper inside each item. */
  pillContainerClassName?: string;
} & Omit<HTMLMotionProps<"div">, "children" | "className">;

const variants: Variants = {
  initial: { opacity: 0, filter: "blur(0.375rem)" },
  animate: { opacity: 1, filter: "blur(0)" },
  exit: (isActive: boolean) =>
    !isActive ? { opacity: 0, filter: "blur(0.375rem)" } : {},
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
  pillContainerClassName,
  inset = 0,
  onMouseLeave,
  ...rest
}: SharedLayoutBgProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const uid = useId();
  const reduce = useMotionReduced();

  // layoutRoot scopes the pill's layout projection to this list, so fixed or
  // scrolled ancestors can't smear scroll offsets into its movement.
  return (
    <LayoutGroup id={`shared-layout-bg-${uid}`}>
      <motion.div
        layoutRoot
        {...rest}
        onMouseLeave={(event) => {
          onMouseLeave?.(event);
          setActiveId(null);
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
                      className={cn(
                        "pointer-events-none absolute z-0",
                        inset === 0 ? "inset-0" : "inset-y-0",
                        pillContainerClassName,
                      )}
                      style={
                        inset === 0
                          ? undefined
                          : { left: -inset, right: -inset }
                      }
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
