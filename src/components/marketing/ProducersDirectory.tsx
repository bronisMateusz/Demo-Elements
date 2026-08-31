import { useEffect, useId, useRef, useState } from "react";
import { LayoutGroup, motion } from "motion/react";
import { CategoryPromoBanner } from "./CategoryPromoBanner";
import { BrandLogoTile } from "./BrandLogoTile";
import { HomeBrands } from "../home/HomeBrands";
import { SharedLayoutUnderline } from "../motion/SharedLayoutUnderline";
import { Container } from "../ui/Container";
import { HorizontalScrollTrack } from "../ui/HorizontalScrollTrack";
import { inputClassName } from "../ui/inputClassName";
import { productFixedBarClassName } from "../ui/productFixedBarClassName";
import { cn } from "../../lib/cn";
import {
  internalSubnavActiveLineClassName,
  internalSubnavHoverLineClassName,
  internalSubnavLinkClassName,
  pageIntroHeroTopPaddingClassName,
  pageIntroTitleClassName,
  pxGutterClassName,
  sectionMarginTopClassName,
  sectionMarginYClassName,
  stickyUnderHeaderClassName,
} from "../../lib/layoutTokens";
import { useBrandAzNav } from "../../hooks/useBrandAzNav";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { SPRING_LAYOUT } from "../../lib/motionEase";
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
    <label
      htmlFor={id}
      className={cn("relative flex min-w-0 items-center", className)}
    >
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
  stuck?: boolean;
  className?: string;
};

function BrandAzIndex({
  lettersWithBrands,
  activeLetter,
  onSelect,
  query,
  onQueryChange,
  stuck = false,
  className,
}: BrandAzIndexProps) {
  const desktopSearchId = useId();
  const activeLineLayoutId = useId();
  const reduce = useMotionReduced();

  return (
    <div
      className={cn(
        "flex items-center gap-3 sm:gap-4",
        stuck && "lg:gap-5",
        pxGutterClassName,
        className,
      )}
    >
      <nav aria-label={producersPage.indexAria} className="min-w-0 flex-1">
        <HorizontalScrollTrack activeKey={activeLetter}>
          <LayoutGroup id={`brand-az-active-${activeLineLayoutId}`}>
            <SharedLayoutUnderline
              className="flex w-max flex-nowrap items-stretch justify-start gap-0 md:gap-1"
              lineClassName={internalSubnavHoverLineClassName}
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
                        internalSubnavLinkClassName,
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
                      internalSubnavLinkClassName,
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
                        layoutId={`brand-az-active-line-${activeLineLayoutId}`}
                        className={internalSubnavActiveLineClassName}
                        transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
                        aria-hidden="true"
                      />
                    ) : null}
                    {letter}
                  </a>
                );
              })}
            </SharedLayoutUnderline>
          </LayoutGroup>
        </HorizontalScrollTrack>
      </nav>

      <BrandSearchField
        id={desktopSearchId}
        query={query}
        onQueryChange={onQueryChange}
        className="hidden w-52 shrink-0 lg:flex lg:w-60"
        inputClassName="h-11 text-sm"
      />
    </div>
  );
}

type ProducersDirectoryProps = {
  brands?: readonly ProducerBrand[];
  featured?: readonly ProducerBrand[];
  className?: string;
};

function featuredAsHomeBrandItems(featured: readonly ProducerBrand[]) {
  return featured.flatMap((brand) =>
    brand.logoSrc
      ? [
          {
            label: brand.name,
            href: brand.href,
            logoSrc: brand.logoSrc,
          },
        ]
      : [],
  );
}

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
  const featuredItems = featuredAsHomeBrandItems(featured);

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
      <Container size="content">
        <header
          className={cn("min-w-0 max-w-3xl", pageIntroHeroTopPaddingClassName)}
        >
          <h1
            id="page-intro-title"
            className={cn(pageIntroTitleClassName, "max-w-4xl")}
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
      </Container>

      {featuredItems.length > 0 ? (
        <HomeBrands
          id="polecani-producenci"
          title={producersPage.featuredLabel}
          items={featuredItems}
          cycle={false}
          showSeeAll={false}
          className={sectionMarginTopClassName}
        />
      ) : null}

      <div ref={listingRef}>
        <div ref={sentinelRef} className="h-px" aria-hidden="true" />
        <div
          ref={navRef}
          className={cn(
            stickyUnderHeaderClassName,
            sectionMarginYClassName,
            "z-99 border-b border-transparent",
            stuck && "border-neutral-200 bg-neutral-0/95 py-2 backdrop-blur-sm",
          )}
        >
          <Container size="content" className="px-0">
            <BrandAzIndex
              lettersWithBrands={lettersWithBrands}
              activeLetter={activeLetter}
              onSelect={scrollToLetter}
              query={query}
              onQueryChange={setQuery}
              stuck={stuck}
            />
          </Container>
        </div>

        <Container size="content">
          {groups.length === 0 ? (
            <p className="m-0 font-body text-ui leading-relaxed text-neutral-600">
              {producersPage.emptyFilter}
            </p>
          ) : (
            <div>
              {groups.map(({ letter, items }) => {
                const hasPromo = letter === producersPage.promoAfterLetter;

                return (
                  <div key={letter} className={sectionMarginYClassName}>
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

                    {hasPromo ? (
                      <CategoryPromoBanner
                        eyebrow={producersPage.promo.eyebrow}
                        title={producersPage.promo.title}
                        description={producersPage.promo.description}
                        href={producersPage.promo.href}
                        label={producersPage.promo.label}
                        image={producersPage.promo.image}
                        className={sectionMarginTopClassName}
                      />
                    ) : null}
                  </div>
                );
              })}
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
