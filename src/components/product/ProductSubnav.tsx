import { LayoutGroup, motion } from "motion/react";
import { cn } from "../../lib/cn";
import type { PdpSubnavItem } from "../../constants/pdpSubnav";
import { usePdpSubnav } from "../../hooks/usePdpSubnav";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { SPRING_LAYOUT } from "../../lib/motionEase";
import { SharedLayoutUnderline } from "../motion/SharedLayoutUnderline";

type ProductSubnavProps = {
  items: PdpSubnavItem[];
};

export function ProductSubnav({ items }: ProductSubnavProps) {
  const { activeId, stuck, sentinelRef, scrollToSection } = usePdpSubnav(items);
  const reduce = useMotionReduced();

  if (items.length === 0) return null;

  return (
    <>
      <div ref={sentinelRef} id="pdp-subnav-sentinel" className="h-px" aria-hidden="true" />
      <nav
        id="pdpSubnav"
        className={cn(
          "pdp-subnav sticky top-header-h z-[99] border-b border-transparent bg-neutral-0/95 backdrop-blur-sm transition-[border-color,background-color,transform] duration-base ease-luxury",
          stuck &&
            "is-stuck border-neutral-200 [background:color-mix(in_oklch,var(--color-neutral-0)_92%,transparent)]",
        )}
        aria-label="Sekcje strony produktu"
      >
        <div className="container mx-auto max-w-content overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <LayoutGroup id="pdp-subnav-active">
            <SharedLayoutUnderline
              className="mx-auto flex w-max min-w-full items-stretch justify-center gap-0 md:gap-1"
              lineClassName="h-0.5 bg-neutral-900/45"
              insetX={12}
              bottom={0}
            >
              {items.map((item) => {
                const isActive = item.id === activeId;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={cn(
                      "relative inline-flex min-h-[58px] items-center px-3 py-3 font-body text-ui leading-none text-neutral-600 no-underline transition-colors duration-fast ease-out",
                      "hover:text-neutral-900",
                      "focus-visible:outline-2 focus-visible:outline-offset-[var(--spacing-focus-ring-offset)] focus-visible:outline-neutral-800",
                      "md:px-4",
                      isActive && "text-neutral-900",
                    )}
                    aria-current={isActive ? "true" : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection(item.id);
                    }}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="pdp-subnav-active-line"
                        className="pointer-events-none absolute inset-x-3 bottom-0 z-20 h-0.5 bg-neutral-900 md:inset-x-4"
                        transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
                        aria-hidden="true"
                      />
                    ) : null}
                    {item.label}
                  </a>
                );
              })}
            </SharedLayoutUnderline>
          </LayoutGroup>
        </div>
      </nav>
    </>
  );
}
