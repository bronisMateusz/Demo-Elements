import { LayoutGroup, motion } from "motion/react";
import { useEffect, useId, useRef } from "react";
import { CategoryPromoBanner } from "./CategoryPromoBanner";
import { BrandLogoTile } from "./BrandLogoTile";
import { MotionFieldGroup } from "../motion/MotionFieldGroup";
import { SharedLayoutBg } from "../motion/SharedLayoutBg";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { cn } from "../../lib/cn";
import { isMotionPaused } from "../../lib/a11yPreferences";
import {
  pxGutterClassName,
  stickyUnderHeaderClassName,
} from "../../lib/layoutTokens";
import { useBrandAzNav } from "../../hooks/useBrandAzNav";
import {
  featuredProducerBrands,
  groupBrandsByLetter,
  letterOfBrand,
  producerAlphabet,
  producerBrands,
  producersPage,
  type ProducerBrand,
} from "../../data/producers";

const letterSectionScrollMtClassName =
  "scroll-mt-[calc(7.25rem+var(--brand-az-nav-height,3.75rem)+1rem)] header-concealed:scroll-mt-[calc(4.5rem+var(--brand-az-nav-height,3.75rem)+1rem)]";

type BrandAzIndexProps = {
  lettersWithBrands: ReadonlySet<string>;
  activeLetter: string;
  onSelect: (letter: string) => void;
  className?: string;
};

function BrandAzIndex({
  lettersWithBrands,
  activeLetter,
  onSelect,
  className,
}: BrandAzIndexProps) {
  const selectedLayoutId = useId();
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const selected = scroller.querySelector<HTMLElement>(
      '[aria-current="true"]',
    );
    if (!selected) return;

    const scrollerBox = scroller.getBoundingClientRect();
    const selectedBox = selected.getBoundingClientRect();
    const nextLeft =
      scroller.scrollLeft +
      (selectedBox.left + selectedBox.width / 2) -
      (scrollerBox.left + scrollerBox.width / 2);

    scroller.scrollTo({
      left: nextLeft,
      behavior: isMotionPaused() ? "auto" : "smooth",
    });
  }, [activeLetter]);

  return (
    <div className={className}>
      <nav aria-label={producersPage.indexAria}>
        <LayoutGroup id={`brand-az-${selectedLayoutId}`}>
          <MotionFieldGroup>
            <div
              ref={scrollerRef}
              className="min-w-0 touch-pan-x overflow-x-auto overscroll-x-contain scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              <SharedLayoutBg
                className={cn(
                  pxGutterClassName,
                  "w-max flex-nowrap justify-start gap-1",
                )}
                pillClassName="rounded-xs bg-neutral-300"
                inset={0}
              >
                {producerAlphabet.map((letter) => {
                  const available = lettersWithBrands.has(letter);
                  const selected = available && activeLetter === letter;

                  return (
                    <div
                      key={letter}
                      data-hoverable={available ? undefined : false}
                      className={cn(
                        "group relative shrink-0 rounded-xs bg-neutral-0",
                        "after:pointer-events-none after:absolute after:inset-0 after:z-20 after:rounded-xs after:border after:transition-[border-color] after:duration-base after:ease-out",
                        selected
                          ? "after:border-transparent"
                          : "after:border-neutral-800 hover:after:border-neutral-900",
                        !available && "cursor-not-allowed",
                      )}
                    >
                      {selected ? (
                        <motion.span
                          layoutId={selectedLayoutId}
                          className="absolute inset-0 z-1 rounded-xs bg-neutral-900"
                          aria-hidden="true"
                        />
                      ) : null}
                      {available ? (
                        <a
                          href={`#letter-${letter}`}
                          aria-current={selected ? "true" : undefined}
                          className={cn(
                            "relative z-10 inline-flex min-h-11 min-w-11 items-center justify-center rounded-xs px-3 py-2 font-body text-sm font-medium leading-none no-underline",
                            "transition-[color] duration-base ease-out",
                            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800",
                            selected ? "text-neutral-0" : "text-neutral-900",
                          )}
                          onClick={(event) => {
                            event.preventDefault();
                            onSelect(letter);
                            if (event.detail > 0) event.currentTarget.blur();
                          }}
                        >
                          {letter}
                        </a>
                      ) : (
                        <span
                          className={cn(
                            "relative z-10 inline-flex min-h-11 min-w-11 items-center justify-center rounded-xs px-3 py-2 font-body text-sm font-medium leading-none",
                            "pointer-events-none text-neutral-900 opacity-45",
                          )}
                        >
                          {letter}
                        </span>
                      )}
                    </div>
                  );
                })}
              </SharedLayoutBg>
            </div>
          </MotionFieldGroup>
        </LayoutGroup>
      </nav>
    </div>
  );
}

type FeaturedProducersPanelProps = {
  featured?: readonly ProducerBrand[];
  className?: string;
};

export function FeaturedProducersPanel({
  featured = featuredProducerBrands,
  className,
}: FeaturedProducersPanelProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-xs bg-neutral-900 px-5 py-6 sm:px-6 sm:py-7 lg:h-full",
        className,
      )}
      aria-labelledby="featured-producers-title"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-radial-[at_0%_0%] from-gold-500/22 to-transparent to-58%"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 inset-e-0 w-1/3 bg-radial-[at_100%_50%] from-gold-50/7 to-transparent to-70%"
        aria-hidden="true"
      />
      <div className="relative">
        <h2 id="featured-producers-title" className="m-0 mb-5 md:mb-6">
          <Eyebrow variant="gold" className="mb-0 text-gold-400">
            {producersPage.featuredLabel}
          </Eyebrow>
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-x-3 sm:gap-y-5">
          {featured.map((brand) => (
            <BrandLogoTile
              key={brand.slug}
              brand={brand}
              emphasized
              showName={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type ProducersDirectoryProps = {
  brands?: readonly ProducerBrand[];
  featured?: readonly ProducerBrand[];
  className?: string;
};

export function ProducersDirectory({
  brands = producerBrands,
  featured = featuredProducerBrands,
  className,
}: ProducersDirectoryProps) {
  const groups = groupBrandsByLetter(brands);
  const lettersWithBrands = new Set(
    brands.map((brand) => letterOfBrand(brand.name)),
  );
  const availableLetters = groups.map((group) => group.letter);
  const { activeLetter, stuck, sentinelRef, navRef, scrollToLetter } =
    useBrandAzNav(availableLetters);

  return (
    <div className={cn("flex flex-col", className)}>
      <Container size="content" className="pt-6 md:pt-8 lg:pt-10">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] xl:gap-12">
          <header className="min-w-0">
            <h1
              id="page-intro-title"
              className="m-0 max-w-4xl font-heading text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] font-medium tracking-tight text-neutral-900"
            >
              {producersPage.title}
            </h1>
            <p className="mt-4 mb-0 font-body text-ui leading-relaxed text-neutral-600 md:text-lg">
              {producersPage.description[0]}
              <br />
              <br />
              {producersPage.description[1]}
            </p>
          </header>
          <FeaturedProducersPanel featured={featured} />
        </div>
      </Container>

      <div
        ref={sentinelRef}
        className="mt-8 h-px md:mt-10"
        aria-hidden="true"
      />
      <div
        ref={navRef}
        className={cn(
          stickyUnderHeaderClassName,
          "z-99 border-b border-transparent py-2",
          stuck && "border-neutral-200 bg-neutral-0/95 backdrop-blur-sm",
        )}
      >
        <Container size="content" className="px-0">
          <BrandAzIndex
            lettersWithBrands={lettersWithBrands}
            activeLetter={activeLetter}
            onSelect={scrollToLetter}
          />
        </Container>
      </div>

      <Container size="content" className="mt-10 md:mt-12">
        <div className="flex flex-col gap-10">
          {groups.map(({ letter, items }) => (
            <div
              key={letter}
              className={cn(
                "flex flex-col",
                letter === producersPage.promoAfterLetter
                  ? "gap-14 pb-6 md:gap-16 md:pb-10"
                  : "gap-6",
              )}
            >
              <section
                id={`letter-${letter}`}
                className={letterSectionScrollMtClassName}
                aria-labelledby={`letter-heading-${letter}`}
              >
                <h2
                  id={`letter-heading-${letter}`}
                  className="m-0 border-b border-neutral-200 pb-3 font-heading text-h3 font-light tracking-tight text-neutral-900"
                >
                  {letter}
                </h2>
                <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {items.map((brand) => (
                    <BrandLogoTile key={brand.slug} brand={brand} />
                  ))}
                </div>
              </section>

              {letter === producersPage.promoAfterLetter ? (
                <CategoryPromoBanner
                  eyebrow={producersPage.promo.eyebrow}
                  title={producersPage.promo.title}
                  description={producersPage.promo.description}
                  href={producersPage.promo.href}
                  label={producersPage.promo.label}
                  image={producersPage.promo.image}
                />
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
