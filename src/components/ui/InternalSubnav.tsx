import { LayoutGroup, motion } from "motion/react";
import { useId } from "react";
import { cn } from "../../lib/cn";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { SPRING_LAYOUT } from "../../lib/motionEase";
import {
  internalSubnavActiveLineClassName,
  internalSubnavHoverLineClassName,
  internalSubnavLinkClassName,
} from "../../lib/layoutTokens";
import { SharedLayoutUnderline } from "../motion/SharedLayoutUnderline";
import { HorizontalScrollTrack } from "./HorizontalScrollTrack";

export type InternalSubnavItem = {
  id: string;
  label: string;
};

type InternalSubnavProps = {
  items: readonly InternalSubnavItem[];
  activeId: string;
  onSelect: (id: string) => void;
  ariaLabel: string;
  className?: string;
  trackClassName?: string;
  /** Center tabs when they fit - default matches PDP / wishlist internal menus. */
  centered?: boolean;
};

/** Underline tab scroller shared by PDP subnav, wishlist segments, listing filters, etc. */
export function InternalSubnav({
  items,
  activeId,
  onSelect,
  ariaLabel,
  className,
  trackClassName,
  centered = true,
}: InternalSubnavProps) {
  const layoutId = useId();
  const reduce = useMotionReduced();

  if (items.length === 0) return null;

  return (
    <nav aria-label={ariaLabel} className={cn("min-w-0", className)}>
      <HorizontalScrollTrack className={trackClassName} activeKey={activeId}>
        <LayoutGroup id={`internal-subnav-${layoutId}`}>
          <SharedLayoutUnderline
            className={cn(
              "mx-auto flex w-max min-w-full items-stretch gap-0 md:gap-1",
              centered ? "justify-start md:justify-center" : "justify-start",
            )}
            lineClassName={internalSubnavHoverLineClassName}
            insetX={12}
            bottom={0}
          >
            {items.map((item) => {
              const selected = item.id === activeId;

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-current={selected ? "true" : undefined}
                  className={cn(
                    internalSubnavLinkClassName,
                    selected ? "text-neutral-900" : "text-neutral-600",
                  )}
                  onClick={(event) => {
                    onSelect(item.id);
                    if (event.detail > 0) event.currentTarget.blur();
                  }}
                >
                  {selected ? (
                    <motion.span
                      layoutId={`internal-subnav-line-${layoutId}`}
                      className={internalSubnavActiveLineClassName}
                      transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
                      aria-hidden="true"
                    />
                  ) : null}
                  {item.label}
                </button>
              );
            })}
          </SharedLayoutUnderline>
        </LayoutGroup>
      </HorizontalScrollTrack>
    </nav>
  );
}
