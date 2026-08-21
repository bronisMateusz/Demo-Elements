import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import {
  homeProductTabs,
  homeProductsSection,
  type HomeProductTabId,
} from "../../data/home";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { EASE_LUXURY, SPRING_LAYOUT } from "../../lib/motionEase";
import { cn } from "../../lib/cn";
import { Container } from "../ui/Container";
import { Section } from "../structural/Section";
import { TextRevealLead } from "../motion/TextRevealLead";
import { TextCascade } from "../motion/TextCascade";
import { SharedLayoutUnderline } from "../motion/SharedLayoutUnderline";
import {
  ProductCarousel,
  type ProductCarouselControls,
} from "../product/ProductCarousel";
import { productCarouselBleedWrapperClassName } from "../product/productCarouselClassName";
import { iconButtonClassName } from "../ui/iconButtonClassName";
import { Button } from "../ui/Button";
import { HorizontalScrollTrack } from "../ui/HorizontalScrollTrack";
import { formatSlideIndex } from "../../lib/formatSlideIndex";

const PANEL_TRANSITION = { duration: 0.3, ease: EASE_LUXURY } as const;

export function HomeProducts() {
  const [activeTab, setActiveTab] = useState<HomeProductTabId>("promocje");
  const [controls, setControls] = useState<
    (ProductCarouselControls & { tabId: HomeProductTabId }) | null
  >(null);
  const [panelMinHeight, setPanelMinHeight] = useState<number>();
  const panelRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef(activeTab);
  const tab =
    homeProductTabs.find((entry) => entry.id === activeTab) ??
    homeProductTabs[0];
  const reduce = useMotionReduced();
  const navLive = controls?.tabId === activeTab;
  const navPending = controls !== null && !navLive;

  useLayoutEffect(() => {
    const node = panelRef.current;
    if (!node) return;
    setPanelMinHeight(node.offsetHeight);
  }, [tab.id]);

  const selectTab = (id: HomeProductTabId) => {
    if (id === activeTab) return;
    activeTabRef.current = id;
    setActiveTab(id);
  };

  return (
    <Section ariaLabelledby="home-products-title" className="overflow-x-clip">
      <Container size="content" className="mb-8 md:mb-10">
        <TextRevealLead
          id="home-products-title"
          revealUnit="word"
          className="max-w-none whitespace-nowrap"
          typographyClassName="font-heading text-h2 leading-[1.1] tracking-tight font-medium"
          mutedClassName="text-neutral-900/20"
          fillClassName="text-neutral-900"
        >
          {homeProductsSection.title}
        </TextRevealLead>

        <div
          role="tablist"
          aria-label="Kategorie produktów"
          className="mt-6 min-w-0"
        >
          <HorizontalScrollTrack activeKey={activeTab}>
            <LayoutGroup id="home-product-tabs-active">
              <SharedLayoutUnderline
                className="w-max min-w-full flex-nowrap gap-2 border-b border-neutral-200"
                lineClassName="h-0.5 bg-gold-500/45"
                insetX={12}
                bottom={0}
              >
                {homeProductTabs.map((entry) => {
                  const selected = entry.id === activeTab;
                  return (
                    <button
                      key={entry.id}
                      type="button"
                      role="tab"
                      id={`home-product-tab-${entry.id}`}
                      aria-selected={selected}
                      aria-current={selected ? "true" : undefined}
                      aria-controls={`home-product-panel-${entry.id}`}
                      tabIndex={selected ? 0 : -1}
                      className={cn(
                        "relative shrink-0 px-3 py-2.5 font-body text-sm font-medium transition-colors duration-fast",
                        selected
                          ? "text-neutral-900"
                          : "text-neutral-500 hover:text-neutral-800",
                      )}
                      onClick={() => selectTab(entry.id)}
                    >
                      {selected ? (
                        <motion.span
                          layoutId="home-product-tab-active-line"
                          className="pointer-events-none absolute inset-x-3 bottom-0 z-20 h-0.5 bg-gold-500"
                          transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
                          aria-hidden="true"
                        />
                      ) : null}
                      {entry.label}
                    </button>
                  );
                })}
              </SharedLayoutUnderline>
            </LayoutGroup>
          </HorizontalScrollTrack>
        </div>
      </Container>

      <div
        className="relative overflow-hidden"
        style={panelMinHeight ? { minHeight: panelMinHeight } : undefined}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab.id}
            ref={panelRef}
            role="tabpanel"
            id={`home-product-panel-${tab.id}`}
            aria-labelledby={`home-product-tab-${tab.id}`}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={reduce ? { duration: 0 } : PANEL_TRANSITION}
          >
            <div
              className={cn(productCarouselBleedWrapperClassName, "relative")}
            >
              <ProductCarousel
                products={tab.products}
                layout="bleed"
                navPlacement="none"
                labelledBy="home-products-title"
                onControlsChange={(next) => {
                  if (activeTabRef.current !== tab.id) return;
                  setControls({ ...next, tabId: tab.id });
                }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <Container
        size="content"
        className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:mt-10"
      >
        {tab.products.length > 1 ? (
          <div
            className={cn(
              "flex items-center gap-3",
              navPending && "pointer-events-none opacity-60",
            )}
          >
            <button
              type="button"
              className={iconButtonClassName({
                variant: "elevated",
                className: cn(
                  "shadow-subtle",
                  !navLive || (!(controls?.loop ?? true) && controls?.atStart)
                    ? "pointer-events-none opacity-35"
                    : null,
                ),
              })}
              aria-label="Poprzednie produkty"
              disabled={
                !navLive ||
                (!(controls?.loop ?? true) && Boolean(controls?.atStart))
              }
              onClick={() => {
                if (!navLive || !controls) return;
                controls.slidePrev();
              }}
            >
              <i className="ph ph-caret-left" aria-hidden="true" />
            </button>

            <p
              className="m-0 min-w-14 text-center font-body text-sm tabular-nums tracking-[0.12em] text-neutral-600"
              aria-live="polite"
            >
              {formatSlideIndex(
                navLive ? (controls?.activeIndex ?? 0) : 0,
                navLive
                  ? (controls?.count ?? tab.products.length)
                  : tab.products.length,
              )}
            </p>

            <button
              type="button"
              className={iconButtonClassName({
                variant: "elevated",
                className: cn(
                  "shadow-subtle",
                  !navLive || (!(controls?.loop ?? true) && controls?.atEnd)
                    ? "pointer-events-none opacity-35"
                    : null,
                ),
              })}
              aria-label="Następne produkty"
              disabled={
                !navLive ||
                (!(controls?.loop ?? true) && Boolean(controls?.atEnd))
              }
              onClick={() => {
                if (!navLive || !controls) return;
                controls.slideNext();
              }}
            >
              <i className="ph ph-caret-right" aria-hidden="true" />
            </button>
          </div>
        ) : null}

        <Button
          href={tab.seeAllHref}
          variant="secondary"
          className="w-fit"
          ariaLabel={tab.seeAllLabel}
        >
          <TextCascade text={tab.seeAllLabel} />
          <i className="ph ph-arrow-right" aria-hidden="true" />
        </Button>
      </Container>
    </Section>
  );
}
