import { LayoutGroup, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { CategoryPromoBanner } from "./CategoryPromoBanner";
import { BrandLogoTile } from "./BrandLogoTile";
import { MotionFieldGroup } from "../motion/MotionFieldGroup";
import { SharedLayoutUnderline } from "../motion/SharedLayoutUnderline";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { HorizontalScrollTrack } from "../ui/HorizontalScrollTrack";
import { inputClassName } from "../ui/inputClassName";
import { productFixedBarClassName } from "../ui/productFixedBarClassName";
import { cn } from "../../lib/cn";
import {
  pxGutterClassName,
  stickyUnderHeaderClassName,
} from "../../lib/layoutTokens";
import { SPRING_LAYOUT } from "../../lib/motionEase";
import { useBrandAzNav } from "../../hooks/useBrandAzNav";
import { useMotionReduced } from "../../hooks/useMotionReduced";
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

const letterLinkClassName = cn(
  "relative inline-flex shrink-0 items-center justify-center border-0 bg-transparent font-body leading-none no-underline",
  "min-h-11 min-w-11 px-3 py-2 text-sm md:min-h-14.5 md:px-4 md:py-3 md:text-ui",
  "transition-colors duration-fast ease-out",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800",
);

function BrandSearchField({
  id,
  query,
  onQueryChange,
  className,
  inputClassName: inputExtraClassName,
}: {
  id: string;
  query: string;
  onQueryChange: (value: string) => void;
  className?: string;
  inputClassName?: string;
}) {
  return (
    <label htmlFor={id} className={cn("relative min-w-0", className)}>
      <span className="sr-only">{producersPage.searchPlaceholder}</span>
      <i
        className="ph ph-magnifying-glass pointer-events-none absolute inset-s-3 top-1/2 -translate-y-1/2 text-base text-neutral-400"
        aria-hidden="true"
      />
      <input
        id={id}
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder={producersPage.searchPlaceholder}
        autoComplete="off"
        className={cn(inputClassName, "pe-3 ps-10", inputExtraClassName)}
      />
    </label>
  );
}

type BrandAzIndexProps = {
  lettersWithBrands: ReadonlySet<string>;
  activeLetter: string;
  onSelect: (letter: string) => void;
  query: string;
  onQueryChange: (value: string) => void;
  className?: string;
};

function BrandAzIndex({
  lettersWithBrands,
  activeLetter,
  onSelect,
  query,
  onQueryChange,
  className,
}: BrandAzIndexProps) {
  const selectedLayoutId = useId();
  const desktopSearchId = useId();
  const reduce = useMotionReduced();

  return (
    <div
      className={cn(
        "flex items-center gap-3 sm:gap-4",
        pxGutterClassName,
        className,
      )}
    >
      <nav aria-label={producersPage.indexAria} className="min-w-0 flex-1">
        <LayoutGroup id={`brand-az-${selectedLayoutId}`}>
          <MotionFieldGroup>
            <HorizontalScrollTrack activeKey={activeLetter}>
              <SharedLayoutUnderline
                className="w-max flex-nowrap justify-start gap-0"
                lineClassName="h-0.5 bg-neutral-900/45"
                insetX={12}
                bottom={0}
              >
                {producerAlphabet.map((letter) => {
                  const available = lettersWithBrands.has(letter);
                  const selected = available && activeLetter === letter;

                  if (!available) {
                    return (
                      <span
                        key={letter}
                        className={cn(
                          letterLinkClassName,
                          "pointer-events-none text-neutral-300",
                        )}
                        aria-hidden="true"
                      >
                        {letter}
                      </span>
                    );
                  }

                  return (
                    <a
                      key={letter}
                      href={`#letter-${letter}`}
                      aria-current={selected ? "true" : undefined}
                      className={cn(
                        letterLinkClassName,
                        "hover:text-neutral-900",
                        selected ? "text-neutral-900" : "text-neutral-600",
                      )}
                      onClick={(event) => {
                        event.preventDefault();
                        onSelect(letter);
                        if (event.detail > 0) event.currentTarget.blur();
                      }}
                    >
                      {selected ? (
                        <motion.span
                          layoutId={selectedLayoutId}
                          className="pointer-events-none absolute inset-x-3 bottom-0 z-20 h-0.5 bg-neutral-900 md:inset-x-4"
                          transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
                          aria-hidden="true"
                        />
                      ) : null}
                      {letter}
                    </a>
                  );
                })}
              </SharedLayoutUnderline>
            </HorizontalScrollTrack>
          </MotionFieldGroup>
        </LayoutGroup>
      </nav>

      <BrandSearchField
        id={desktopSearchId}
        query={query}
        onQueryChange={onQueryChange}
        className="hidden w-52 shrink-0 lg:block lg:w-60"
        inputClassName="h-12 text-sm"
      />
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
        "relative rounded-xs bg-gold-100 p-4 sm:p-6 lg:h-full",
        className,
      )}
      aria-labelledby="featured-producers-title"
    >
      <h2 id="featured-producers-title" className="m-0 mb-5 md:mb-6">
        <Eyebrow variant="gold" className="mb-0 text-neutral-700">
          {producersPage.featuredLabel}
        </Eyebrow>
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-x-3 sm:gap-y-5">
        {featured.map((brand) => (
          <BrandLogoTile key={brand.slug} brand={brand} showName={false} />
        ))}
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
  const [query, setQuery] = useState("");
  const [listingInView, setListingInView] = useState(false);
  const listingRef = useRef<HTMLDivElement>(null);
  const mobileSearchId = useId();
  const normalizedQuery = query.trim().toLowerCase();
  const filteredBrands = normalizedQuery
    ? brands.filter((brand) =>
        brand.name.toLowerCase().includes(normalizedQuery),
      )
    : brands;
  const groups = groupBrandsByLetter(filteredBrands);
  const lettersWithBrands = new Set(
    filteredBrands.map((brand) => letterOfBrand(brand.name)),
  );
  const availableLetters = groups.map((group) => group.letter);
  const { activeLetter, stuck, sentinelRef, navRef, scrollToLetter } =
    useBrandAzNav(availableLetters);

  useEffect(() => {
    const listing = listingRef.current;
    if (!listing) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setListingInView(entry.isIntersecting);
      },
      {
        // Hide once listing barely leaves the viewport (above sticky search bar).
        rootMargin: "0px 0px -72px 0px",
        threshold: 0,
      },
    );
    observer.observe(listing);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col lg:pb-0",
        listingInView && "pb-20",
        className,
      )}
    >
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

      <div ref={listingRef}>
        <div
          ref={sentinelRef}
          className="mt-8 h-px md:mt-10"
          aria-hidden="true"
        />
        <div
          ref={navRef}
          className={cn(
            stickyUnderHeaderClassName,
            "z-99 border-b border-transparent",
            stuck && "border-neutral-200 bg-neutral-0/95 backdrop-blur-sm",
          )}
        >
          <Container size="content" className="px-0">
            <BrandAzIndex
              lettersWithBrands={lettersWithBrands}
              activeLetter={activeLetter}
              onSelect={scrollToLetter}
              query={query}
              onQueryChange={setQuery}
            />
          </Container>
        </div>

        <Container size="content" className="mt-10 md:mt-12">
          {groups.length === 0 ? (
            <p className="m-0 font-body text-ui leading-relaxed text-neutral-600">
              {producersPage.emptyFilter}
            </p>
          ) : (
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
          )}
        </Container>
      </div>

      {/* Outside sticky/backdrop-filter so `fixed` stays viewport-bottom. */}
      <aside
        className={cn(
          productFixedBarClassName({ visible: listingInView }),
          "lg:hidden",
        )}
        aria-hidden={!listingInView}
        aria-label={producersPage.searchPlaceholder}
      >
        <div className="flex items-center gap-2 border border-x-0 border-b-0 border-neutral-200/80 bg-neutral-0 px-3 py-2 shadow-2">
          <BrandSearchField
            id={mobileSearchId}
            query={query}
            onQueryChange={setQuery}
            className="min-w-0 flex-1"
            inputClassName="h-11 text-sm"
          />
        </div>
      </aside>
    </div>
  );
}
