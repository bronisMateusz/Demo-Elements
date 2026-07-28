import { useCallback, useState, type AnimationEvent, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  HOME_HERO_AUTOPLAY_MS,
  homeHeroSlides,
  type HomeHeroSlide,
} from "../../data/home";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { cn } from "../../lib/cn";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { iconButtonClassName } from "../ui/iconButtonClassName";

function HeroSlideContent({ slide }: { slide: HomeHeroSlide }) {
  if (slide.kind === "main") {
    return (
      <Container
        size="content"
        className="relative z-10 flex h-full min-h-[inherit] flex-col justify-end pb-8 pt-28 md:pb-10 md:pt-32"
      >
        <div className="max-w-2xl">
          <p className="m-0 mb-3 font-heading text-lg font-medium tracking-tight text-neutral-0 md:text-xl">
            Elements
          </p>
          <h1
            id="home-hero-title"
            className="m-0 font-heading text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.08] font-medium tracking-tight text-balance"
          >
            {slide.title}
          </h1>
          <p className="mt-4 mb-0 max-w-lg text-ui leading-relaxed text-neutral-200 md:text-lg">
            {slide.lead}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={slide.primaryCta.href} variant="gold" size="lg">
              {slide.primaryCta.label}
            </Button>
            <Button
              href={slide.secondaryCta.href}
              variant="secondary"
              size="lg"
              className={cn(
                "border-neutral-0/50 bg-neutral-0/10 text-neutral-0 backdrop-blur-sm",
                "hover:border-gold-400 hover:text-neutral-0",
              )}
            >
              {slide.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container
      size="content"
      className="relative z-10 flex h-full min-h-[inherit] flex-col justify-end pb-8 pt-28 md:pb-10 md:pt-32"
    >
      <div className="max-w-xl">
        <p className="m-0 text-xs font-medium tracking-wide text-gold-400 uppercase">
          {slide.brand}
        </p>
        <h2 className="mt-2 mb-0 font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.12] font-medium tracking-tight text-balance text-neutral-0">
          {slide.title}
        </h2>
        <p className="mt-3 mb-0 text-ui text-neutral-200">{slide.description}</p>
        <div className="mt-8">
          <Button href={slide.href} variant="gold" size="lg">
            Zobacz więcej
            <i className="ph ph-arrow-right" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </Container>
  );
}

export function HomeHero() {
  const reducedMotion = useMotionReduced();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slideCount = homeHeroSlides.length;
  const activeSlide = homeHeroSlides[activeIndex] ?? homeHeroSlides[0];

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % slideCount) + slideCount) % slideCount);
    },
    [slideCount],
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  const onProgressEnd = (event: AnimationEvent<HTMLSpanElement>) => {
    if (event.animationName !== "home-hero-progress") return;
    if (reducedMotion || paused) return;
    goNext();
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Banery główne"
      className="relative isolate bg-neutral-900 text-neutral-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="relative min-h-[min(72svh,36rem)] overflow-hidden md:min-h-[min(78svh,42rem)]">
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={activeSlide.id}
            className="absolute inset-0 flex flex-col"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${activeIndex + 1} z ${slideCount}: ${activeSlide.hint}`}
          >
            <img
              src={activeSlide.image.src}
              alt=""
              className="absolute inset-0 size-full object-cover"
              style={{ objectPosition: productImageObjectPosition(activeSlide.image) }}
              fetchPriority={activeIndex === 0 ? "high" : "low"}
              draggable={false}
            />
            <div
              className="absolute inset-0 bg-linear-to-t from-neutral-900/90 via-neutral-900/45 to-neutral-900/20"
              aria-hidden="true"
            />
            <HeroSlideContent slide={activeSlide} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-20 border-t border-neutral-200 bg-neutral-50 text-neutral-900">
        <div className="flex items-stretch">
          <button
            type="button"
            className={iconButtonClassName({
              variant: "default",
              className: "size-auto min-h-14 w-12 shrink-0 rounded-none border-0 md:w-14",
            })}
            aria-label="Poprzedni baner"
            onClick={goPrev}
          >
            <i className="ph ph-caret-left" aria-hidden="true" />
          </button>

          <div
            role="tablist"
            aria-label="Wybór banera"
            className="grid min-w-0 flex-1 grid-cols-2 md:grid-cols-4"
          >
            {homeHeroSlides.map((slide, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="home-hero-panel"
                  id={`home-hero-tab-${slide.id}`}
                  className={cn(
                    "relative min-h-14 px-3 py-3 text-start transition-colors duration-fast",
                    "focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gold-500",
                    selected
                      ? "bg-neutral-0 text-neutral-900"
                      : "text-neutral-500 hover:bg-neutral-0/70 hover:text-neutral-800",
                    index > 0 && "border-s border-neutral-200",
                  )}
                  onClick={() => goTo(index)}
                >
                  <span className="line-clamp-2 font-body text-[11px] leading-snug md:text-xs">
                    {slide.hint}
                  </span>
                  {selected ? (
                    <span
                      className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden bg-neutral-200"
                      aria-hidden="true"
                    >
                      <span
                        key={activeIndex}
                        className={cn(
                          "home-hero-progress block h-full origin-left bg-gold-500",
                          !reducedMotion && "animate-[home-hero-progress_var(--home-hero-autoplay)_linear_forwards]",
                          reducedMotion && "scale-x-100",
                        )}
                        style={
                          {
                            "--home-hero-autoplay": `${HOME_HERO_AUTOPLAY_MS}ms`,
                            animationPlayState: paused ? "paused" : "running",
                          } as CSSProperties
                        }
                        onAnimationEnd={onProgressEnd}
                      />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className={iconButtonClassName({
              variant: "default",
              className: "size-auto min-h-14 w-12 shrink-0 rounded-none border-0 md:w-14",
            })}
            aria-label="Następny baner"
            onClick={goNext}
          >
            <i className="ph ph-caret-right" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id="home-hero-panel" className="sr-only" aria-live="polite">
        {activeSlide.hint}
      </div>
    </section>
  );
}
