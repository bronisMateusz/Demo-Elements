import {
  useEffect,
  useState,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { homeBrands } from "../../data/home";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { cn } from "../../lib/cn";
import { EASE_OUT } from "../../lib/motionEase";
import { SharedLayoutBg } from "../motion/SharedLayoutBg";
import { Container } from "../ui/Container";
import { Section } from "../structural/Section";
import { Button } from "../ui/Button";

type BrandItem = (typeof homeBrands.items)[number];

type BrandCycleCellProps = {
  pool: readonly BrandItem[];
  slotIndex: number;
  slotCount: number;
  paused: boolean;
  /** SharedLayoutBg injects the sliding pill here. */
  children?: ReactNode;
  className?: string;
  onMouseEnter?: (event: MouseEvent<HTMLAnchorElement>) => void;
} & Omit<
  HTMLAttributes<HTMLAnchorElement>,
  "href" | "children" | "onMouseEnter" | "className"
>;

function BrandCycleCell({
  pool,
  slotIndex,
  slotCount,
  paused,
  children,
  className,
  onMouseEnter,
  ...rest
}: BrandCycleCellProps) {
  const reduce = useMotionReduced();
  const [poolIndex, setPoolIndex] = useState(slotIndex % pool.length);
  const brand = pool[poolIndex] ?? pool[0];

  useEffect(() => {
    if (reduce || paused || pool.length <= slotCount) return;

    const intervalMs = homeBrands.cycleIntervalMs;
    // Stagger each cell so the grid flips gradually, not all at once.
    const startDelay = slotIndex * 280;

    let intervalId = 0;
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setPoolIndex((current) => {
          let next = (current + slotCount) % pool.length;
          if (next === current) next = (current + 1) % pool.length;
          return next;
        });
      }, intervalMs);
    }, startDelay);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [paused, pool.length, reduce, slotCount, slotIndex]);

  if (!brand) return null;

  return (
    <a
      {...rest}
      href={brand.href}
      onMouseEnter={onMouseEnter}
      className={cn(
        "group relative flex min-h-20 items-center justify-center border-r border-b border-neutral-200 px-4 py-6 no-underline",
        "md:min-h-24 md:px-6 md:py-8",
        "focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gold-500",
        className,
      )}
    >
      {children}
      <span className="relative z-10 flex min-h-[1.5em] items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={brand.label}
            className="text-center font-heading text-base font-medium tracking-tight text-neutral-500 transition-colors duration-fast ease-out group-hover:text-neutral-900 md:text-lg"
            initial={reduce ? false : { opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduce ? undefined : { opacity: 0, y: -8, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
          >
            {brand.label}
          </motion.span>
        </AnimatePresence>
      </span>
    </a>
  );
}

export function HomeBrands() {
  const [paused, setPaused] = useState(false);
  const slotCount = Math.min(homeBrands.slotCount, homeBrands.items.length);
  const slots = Array.from({ length: slotCount }, (_, index) => index);

  return (
    <Section ariaLabelledby="home-brands-title">
      <Container size="content">
        <h2
          id="home-brands-title"
          className="m-0 max-w-md font-heading text-h2 leading-[1.1] font-medium tracking-tight text-neutral-900"
        >
          {homeBrands.title}
        </h2>

        <SharedLayoutBg
          className={cn(
            "mt-8 grid w-full grid-cols-2 border-t border-l border-neutral-200 md:mt-10",
            "sm:grid-cols-3 md:grid-cols-4",
          )}
          pillClassName="rounded-none bg-neutral-100"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {slots.map((slotIndex) => (
            <BrandCycleCell
              key={slotIndex}
              pool={homeBrands.items}
              slotIndex={slotIndex}
              slotCount={slotCount}
              paused={paused}
            />
          ))}
        </SharedLayoutBg>

        <div className="mt-8 flex justify-center md:mt-10">
          <Button href={homeBrands.seeAllHref} variant="secondary" className="w-fit">
            {homeBrands.seeAllLabel}
            <i className="ph ph-arrow-right" aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </Section>
  );
}
