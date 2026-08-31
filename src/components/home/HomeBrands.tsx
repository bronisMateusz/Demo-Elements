import { Link } from "react-router-dom";
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

export type HomeBrandItem = {
  label: string;
  href: string;
  logoSrc: string;
};

type BrandCellChromeProps = {
  href: string;
  children?: ReactNode;
  className?: string;
  onMouseEnter?: (event: MouseEvent<HTMLAnchorElement>) => void;
} & Omit<
  HTMLAttributes<HTMLAnchorElement>,
  "href" | "children" | "onMouseEnter" | "className"
>;

const brandCellClassName = cn(
  "group relative flex min-h-20 items-center justify-center px-4 py-6 no-underline",
  "md:min-h-24 md:px-6 md:py-8",
  "focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gold-500",
);

function BrandCellChrome({
  href,
  children,
  className,
  onMouseEnter,
  ...rest
}: BrandCellChromeProps) {
  const isInternal = href.startsWith("/") && href !== "#";

  const classNames = cn(brandCellClassName, className);

  if (isInternal) {
    return (
      <Link
        {...rest}
        to={href}
        onMouseEnter={onMouseEnter}
        className={classNames}
      >
        {children}
      </Link>
    );
  }

  return (
    <a {...rest} href={href} onMouseEnter={onMouseEnter} className={classNames}>
      {children}
    </a>
  );
}

type BrandCycleCellProps = {
  pool: readonly HomeBrandItem[];
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
    <BrandCellChrome
      {...rest}
      href={brand.href}
      onMouseEnter={onMouseEnter}
      className={className}
    >
      {children}
      <span className="relative z-10 flex h-10 w-full max-w-40 items-center justify-center overflow-hidden px-1 md:h-12">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={brand.label}
            className="flex size-full items-center justify-center"
            initial={
              reduce ? false : { opacity: 0, y: 10, filter: "blur(6px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={
              reduce ? undefined : { opacity: 0, y: -8, filter: "blur(6px)" }
            }
            transition={{ duration: 0.45, ease: EASE_OUT }}
          >
            <img
              src={brand.logoSrc}
              alt={brand.label}
              className="max-h-full max-w-full object-contain opacity-70 transition-opacity duration-fast ease-out group-hover:opacity-100"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </motion.span>
        </AnimatePresence>
      </span>
    </BrandCellChrome>
  );
}

type BrandStaticCellProps = {
  brand: HomeBrandItem;
  children?: ReactNode;
  className?: string;
  onMouseEnter?: (event: MouseEvent<HTMLAnchorElement>) => void;
} & Omit<
  HTMLAttributes<HTMLAnchorElement>,
  "href" | "children" | "onMouseEnter" | "className"
>;

function BrandStaticCell({
  brand,
  children,
  className,
  onMouseEnter,
  ...rest
}: BrandStaticCellProps) {
  return (
    <BrandCellChrome
      {...rest}
      href={brand.href}
      onMouseEnter={onMouseEnter}
      className={className}
    >
      {children}
      <span className="relative z-10 flex h-10 w-full max-w-40 items-center justify-center px-1 md:h-12">
        <img
          src={brand.logoSrc}
          alt={brand.label}
          className="max-h-full max-w-full object-contain opacity-70 transition-opacity duration-fast ease-out group-hover:opacity-100"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </span>
    </BrandCellChrome>
  );
}

type HomeBrandsProps = {
  id?: string;
  className?: string;
  /** Override default home title. */
  title?: string;
  /** Optional lead under the title (salon brands block). */
  description?: string;
  /** Footer CTA under the brand grid (home only by default). */
  showSeeAll?: boolean;
  /** Brand pool; defaults to home brands. */
  items?: readonly HomeBrandItem[];
  /**
   * When true (default), rotate through a fixed slot count.
   * When false, render every item once (no cycle).
   */
  cycle?: boolean;
};

export function HomeBrands({
  id,
  className,
  title = homeBrands.title,
  description,
  showSeeAll = true,
  items = homeBrands.items,
  cycle = true,
}: HomeBrandsProps = {}) {
  const [paused, setPaused] = useState(false);
  const pool = items;
  const slotCount = cycle
    ? Math.min(homeBrands.slotCount, pool.length)
    : pool.length;
  const slots = Array.from({ length: slotCount }, (_, index) => index);
  const titleId = id ? `${id}-title` : "home-brands-title";

  return (
    <Section id={id} ariaLabelledby={titleId} className={className}>
      <Container size="content">
        <h2
          id={titleId}
          className="m-0 font-heading text-h2 leading-[1.1] font-medium tracking-tight text-balance text-neutral-900 md:whitespace-nowrap"
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-3 mb-0 max-w-2xl font-body text-sm leading-relaxed text-neutral-600 md:mt-4 md:text-ui">
            {description}
          </p>
        ) : null}

        <SharedLayoutBg
          className={cn(
            "grid w-full grid-cols-2",
            "mt-8 md:mt-10",
            "sm:grid-cols-3 md:grid-cols-4",
          )}
          pillClassName="rounded-none bg-neutral-100"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {cycle
            ? slots.map((slotIndex) => (
                <BrandCycleCell
                  key={slotIndex}
                  pool={pool}
                  slotIndex={slotIndex}
                  slotCount={slotCount}
                  paused={paused}
                />
              ))
            : pool.map((brand) => (
                <BrandStaticCell key={brand.label} brand={brand} />
              ))}
        </SharedLayoutBg>

        {showSeeAll ? (
          <div className="mt-8 flex justify-center md:mt-10">
            <Button
              href={homeBrands.seeAllHref}
              variant="secondary"
              className="w-fit"
            >
              {homeBrands.seeAllLabel}
              <i className="ph ph-arrow-right" aria-hidden="true" />
            </Button>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
