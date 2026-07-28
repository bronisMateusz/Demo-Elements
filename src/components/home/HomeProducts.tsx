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
  ProductCarouselNavButtons,
  type ProductCarouselControls,
} from "../product/ProductCarousel";
import { Button } from "../ui/Button";

const PANEL_TRANSITION = { duration: 0.3, ease: EASE_LUXURY } as const;

export function HomeProducts() {
  const [activeTab, setActiveTab] = useState<HomeProductTabId>("promocje");
  const [controls, setControls] = useState<(ProductCarouselControls & { tabId: HomeProductTabId }) | null>(
    null,
  );
  const [panelMinHeight, setPanelMinHeight] = useState<number>();
  const panelRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef(activeTab);
  const tab = homeProductTabs.find((entry) => entry.id === activeTab) ?? homeProductTabs[0];
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
    <Section ariaLabelledby="home-products-title">
      <Container size="content" className="mb-8 md:mb-10">
        <TextRevealLead
          id="home-products-title"
          revealUnit="word"
          className="max-w-2xl"
          typographyClassName="font-heading text-h2 leading-[1.1] tracking-tight font-medium"
          mutedClassName="text-neutral-900/20"
          fillClassName="text-neutral-900"
        >
          {homeProductsSection.title}
        </TextRevealLead>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div role="tablist" aria-label="Kategorie produktów" className="min-w-0">
            <LayoutGroup id="home-product-tabs-active">
              <SharedLayoutUnderline
                className="flex-wrap gap-2 border-b border-neutral-200"
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
                      aria-controls={`home-product-panel-${entry.id}`}
                      tabIndex={selected ? 0 : -1}
                      className={cn(
                        "px-3 py-2.5 font-body text-sm font-medium transition-colors duration-fast",
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
          </div>

          {tab.products.length > 1 ? (
            <ProductCarouselNavButtons
              atStart={Boolean(controls?.atStart)}
              atEnd={Boolean(controls?.atEnd)}
              layout="bleed"
              loop={controls?.loop ?? true}
              onPrev={() => {
                if (!navLive || !controls) return;
                controls.slidePrev();
              }}
              onNext={() => {
                if (!navLive || !controls) return;
                controls.slideNext();
              }}
              className={cn(navPending && "pointer-events-none")}
            />
          ) : null}
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
          </motion.div>
        </AnimatePresence>
      </div>

      <Container size="content" className="mt-8 flex justify-center md:mt-10">
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
