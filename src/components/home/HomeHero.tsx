import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type AnimationEvent,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import {
  HOME_HERO_AUTOPLAY_MS,
  homeHeroSlides,
  type HomeHeroSlide,
} from "../../data/home";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { cn } from "../../lib/cn";
import { formatSlideIndex } from "../../lib/formatSlideIndex";
import { SPRING_LAYOUT } from "../../lib/motionEase";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import { SharedLayoutUnderline } from "../motion/SharedLayoutUnderline";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { iconButtonClassName } from "../ui/iconButtonClassName";

const DRAG_THRESHOLD_PX = 48;
const WHEEL_COOLDOWN_MS = 450;

function HeroSlideContent({ slide }: { slide: HomeHeroSlide }) {
  const isMain = slide.kind === "main";
  const title = slide.title;
  const lead = isMain ? slide.lead : slide.description;
  const TitleTag = isMain ? "h1" : "h2";

  return (
    <Container
      size="content"
      className="relative z-10 flex h-full min-h-[inherit] flex-col justify-end pb-8 pt-28 md:pb-10 md:pt-32"
    >
      <div className="max-w-2xl">
        <TitleTag
          id={isMain ? "home-hero-title" : undefined}
          className="m-0 font-heading text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.08] font-medium tracking-tight text-balance text-neutral-0"
        >
          {title}
        </TitleTag>
        <p className="mt-4 mb-0 max-w-xl text-ui leading-relaxed text-neutral-200 md:text-lg">
          {lead}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {isMain ? (
            <>
              <Button
                href={slide.primaryCta.href}
                variant="primary"
                tone="onDark"
                size="lg"
              >
                {slide.primaryCta.label}
              </Button>
              <Button
                href={slide.secondaryCta.href}
                variant="secondary"
                tone="onDark"
                size="lg"
              >
                {slide.secondaryCta.label}
              </Button>
            </>
          ) : (
            <Button href={slide.href} variant="primary" tone="onDark" size="lg">
              Zobacz więcej
              <i className="ph ph-arrow-right" aria-hidden="true" />
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
}

export function HomeHero() {
  const reducedMotion = useMotionReduced();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  /** Manual slide change while paused - keep the active tab progress full until autoplay resumes. */
  const [holdFullProgress, setHoldFullProgress] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const dragDeltaX = useRef(0);
  const dragPointerId = useRef<number | null>(null);
  const wheelLockUntil = useRef(0);
  const slideCount = homeHeroSlides.length;
  const activeSlide = homeHeroSlides[activeIndex] ?? homeHeroSlides[0];
  const progressComplete = reducedMotion || holdFullProgress;

  const resumeAutoplay = useCallback(() => {
    setPaused(false);
    setHoldFullProgress(false);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % slideCount) + slideCount) % slideCount);
      if (paused) setHoldFullProgress(true);
    },
    [paused, slideCount],
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  const onProgressEnd = (event: AnimationEvent<HTMLSpanElement>) => {
    if (event.animationName !== "home-hero-progress") return;
    if (reducedMotion || paused || holdFullProgress) return;
    goNext();
  };

  const onStagePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    // Ignore drag starting on interactive controls (links / buttons).
    if ((event.target as HTMLElement | null)?.closest("a, button")) return;

    dragStartX.current = event.clientX;
    dragDeltaX.current = 0;
    dragPointerId.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onStagePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (
      dragPointerId.current !== event.pointerId ||
      dragStartX.current === null
    )
      return;
    dragDeltaX.current = event.clientX - dragStartX.current;
  };

  const endStageDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragPointerId.current !== event.pointerId) return;

    const delta = dragDeltaX.current;
    dragStartX.current = null;
    dragDeltaX.current = 0;
    dragPointerId.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (Math.abs(delta) < DRAG_THRESHOLD_PX) return;
    if (delta < 0) goNext();
    else goPrev();
  };

  const onStageWheel = useCallback(
    (event: WheelEvent) => {
      const dominantX = Math.abs(event.deltaX) > Math.abs(event.deltaY);
      const shiftScroll = event.shiftKey && Math.abs(event.deltaY) > 0;
      if (!dominantX && !shiftScroll) return;

      const delta = dominantX ? event.deltaX : event.deltaY;
      if (Math.abs(delta) < 8) return;

      event.preventDefault();
      const now = performance.now();
      if (now < wheelLockUntil.current) return;
      wheelLockUntil.current = now + WHEEL_COOLDOWN_MS;

      if (delta > 0) goNext();
      else goPrev();
    },
    [goNext, goPrev],
  );

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    node.addEventListener("wheel", onStageWheel, { passive: false });
    return () => node.removeEventListener("wheel", onStageWheel);
  }, [onStageWheel]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Banery główne"
      className="relative isolate bg-neutral-900 text-neutral-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={resumeAutoplay}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          resumeAutoplay();
        }
      }}
    >
      <div
        ref={stageRef}
        className="relative min-h-[min(72svh,36rem)] touch-pan-y overflow-hidden md:min-h-[min(78svh,42rem)] cursor-grab active:cursor-grabbing"
        onPointerDown={onStagePointerDown}
        onPointerMove={onStagePointerMove}
        onPointerUp={endStageDrag}
        onPointerCancel={endStageDrag}
      >
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
              className="pointer-events-none absolute inset-0 size-full object-cover select-none"
              style={{
                objectPosition: productImageObjectPosition(activeSlide.image),
              }}
              fetchPriority={activeIndex === 0 ? "high" : "low"}
              draggable={false}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-linear-to-t from-neutral-900/80 via-neutral-900/35 to-neutral-900/10"
              aria-hidden="true"
            />
            <HeroSlideContent slide={activeSlide} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-20 border-t border-neutral-200 bg-neutral-50 text-neutral-900">
        <Container size="content">
          <div className="flex items-stretch">
            <button
              type="button"
              className={iconButtonClassName({
                variant: "ghost",
                className:
                  "size-auto min-h-14 w-11 shrink-0 rounded-none border-0 bg-transparent shadow-none md:w-14",
              })}
              aria-label="Poprzedni baner"
              onClick={goPrev}
            >
              <i className="ph ph-caret-left" aria-hidden="true" />
            </button>

            {/* Mobile: current slide only - 2x2 tab grid is too cramped. */}
            <div className="relative flex min-h-14 min-w-0 flex-1 items-center gap-2.5 px-1 py-3 md:hidden">
              <span className="shrink-0 font-body text-xs tabular-nums tracking-[0.08em] text-neutral-400">
                {formatSlideIndex(activeIndex, slideCount)}
              </span>
              <p className="m-0 min-w-0 truncate font-body text-xs leading-snug text-neutral-900">
                {activeSlide.hint}
              </p>
              <span
                className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 overflow-hidden bg-neutral-200"
                aria-hidden="true"
              >
                <span
                  key={
                    progressComplete
                      ? `full-m-${activeIndex}`
                      : `run-m-${activeIndex}`
                  }
                  className={cn(
                    "home-hero-progress block h-full origin-left bg-gold-500",
                    progressComplete
                      ? "scale-x-100"
                      : "animate-[home-hero-progress_var(--home-hero-autoplay)_linear_forwards]",
                  )}
                  style={
                    progressComplete
                      ? undefined
                      : ({
                          "--home-hero-autoplay": `${HOME_HERO_AUTOPLAY_MS}ms`,
                          animationPlayState: paused ? "paused" : "running",
                        } as CSSProperties)
                  }
                  onAnimationEnd={onProgressEnd}
                />
              </span>
            </div>

            <LayoutGroup id="home-hero-tabs-active">
              <SharedLayoutUnderline
                className="hidden min-w-0 flex-1 md:grid md:grid-cols-4"
                lineClassName="h-0.5 bg-gold-500/45"
                role="tablist"
                aria-label="Wybór banera"
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
                          : "text-neutral-500 hover:text-neutral-800",
                        index > 0 && "border-s border-neutral-200",
                      )}
                      onClick={() => goTo(index)}
                    >
                      <span className="line-clamp-2 font-body text-xs leading-snug">
                        {slide.hint}
                      </span>
                      {selected ? (
                        <motion.span
                          layoutId="home-hero-tab-active-line"
                          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-0.5 overflow-hidden bg-neutral-200"
                          transition={
                            reducedMotion ? { duration: 0 } : SPRING_LAYOUT
                          }
                          aria-hidden="true"
                        >
                          <span
                            key={
                              progressComplete
                                ? `full-${activeIndex}`
                                : `run-${activeIndex}`
                            }
                            className={cn(
                              "home-hero-progress block h-full origin-left bg-gold-500",
                              progressComplete
                                ? "scale-x-100"
                                : "animate-[home-hero-progress_var(--home-hero-autoplay)_linear_forwards]",
                            )}
                            style={
                              progressComplete
                                ? undefined
                                : ({
                                    "--home-hero-autoplay": `${HOME_HERO_AUTOPLAY_MS}ms`,
                                    animationPlayState: paused
                                      ? "paused"
                                      : "running",
                                  } as CSSProperties)
                            }
                            onAnimationEnd={onProgressEnd}
                          />
                        </motion.span>
                      ) : null}
                    </button>
                  );
                })}
              </SharedLayoutUnderline>
            </LayoutGroup>

            <button
              type="button"
              className={iconButtonClassName({
                variant: "ghost",
                className:
                  "size-auto min-h-14 w-11 shrink-0 rounded-none border-0 bg-transparent shadow-none md:w-14",
              })}
              aria-label="Następny baner"
              onClick={goNext}
            >
              <i className="ph ph-caret-right" aria-hidden="true" />
            </button>
          </div>
        </Container>
      </div>

      <div id="home-hero-panel" className="sr-only" aria-live="polite">
        {activeSlide.hint}
      </div>
    </section>
  );
}
