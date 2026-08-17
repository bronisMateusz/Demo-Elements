import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { cn } from "../../lib/cn";
import {
  HEADER_UTILITY_CONCEAL_DELTA_PX,
  HEADER_UTILITY_CONCEAL_TOP_PX,
  LG_MIN_WIDTH_PX,
} from "../../lib/layoutTokens";
import { useSiteChrome } from "../../hooks/useSiteChrome";
import { useInspirationProductsDrawerRequest } from "../../hooks/useInspirationProductsDrawer";
import { useSalonDrawerRequest } from "../../hooks/useSelectedSalon";
import type { InspirationArrangement } from "../../types/product";
import { InspirationProductsDrawer } from "../inspiration/InspirationProductsDrawer";
import { HeaderBar } from "./header/HeaderBar";
import { HeaderSalonStrip } from "./header/HeaderSalonStrip";
import { HeaderUtility } from "./header/HeaderUtility";
import { MobileDrawer } from "./MobileDrawer";
import { SalonDrawer } from "./SalonDrawer";

function syncSiteHeaderBarHeightVar() {
  const bar = document.getElementById("siteHeaderBar");
  if (!bar) return;
  document.documentElement.style.setProperty(
    "--site-header-bar-height",
    `${bar.offsetHeight}px`,
  );
}

export function Header() {
  useSiteChrome();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [salonOpen, setSalonOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [inspirationOpen, setInspirationOpen] = useState(false);
  const [inspirationArrangement, setInspirationArrangement] =
    useState<InspirationArrangement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [utilityConcealed, setUtilityConcealed] = useState(false);
  const lastScrollY = useRef(0);
  // Drawers must not change header chrome (utility conceal stays scroll-driven).
  const concealUtility = utilityConcealed;

  const openSalonDrawer = useCallback(() => {
    setProductsOpen(false);
    setInspirationOpen(false);
    setInspirationArrangement(null);
    setSalonOpen(true);
  }, []);

  const openInspirationProducts = useCallback(
    (arrangement: InspirationArrangement) => {
      setProductsOpen(false);
      setSalonOpen(false);
      setInspirationArrangement(arrangement);
      setInspirationOpen(true);
    },
    [],
  );

  const closeInspirationProducts = useCallback(() => {
    setInspirationOpen(false);
    setInspirationArrangement(null);
  }, []);

  useSalonDrawerRequest(openSalonDrawer);
  useInspirationProductsDrawerRequest(openInspirationProducts);

  useLayoutEffect(() => {
    syncSiteHeaderBarHeightVar();
    const bar = document.getElementById("siteHeaderBar");
    if (!bar || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => syncSiteHeaderBarHeightVar());
    observer.observe(bar);
    window.addEventListener("resize", syncSiteHeaderBarHeightVar);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncSiteHeaderBarHeightVar);
      document.documentElement.style.removeProperty("--site-header-bar-height");
    };
  }, []);

  useEffect(() => {
    const lgQuery = window.matchMedia(`(min-width: ${LG_MIN_WIDTH_PX}px)`);

    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 8);

      // Utility strip exists only from lg up - never conceal the main bar on mobile.
      if (!lgQuery.matches) {
        setUtilityConcealed(false);
        lastScrollY.current = y;
        return;
      }

      if (y <= HEADER_UTILITY_CONCEAL_TOP_PX) {
        setUtilityConcealed(false);
      } else if (y > lastScrollY.current + HEADER_UTILITY_CONCEAL_DELTA_PX) {
        setUtilityConcealed(true);
      } else if (y < lastScrollY.current - HEADER_UTILITY_CONCEAL_DELTA_PX) {
        setUtilityConcealed(false);
      }

      lastScrollY.current = y;
    };

    const onBreakpointChange = () => {
      if (!lgQuery.matches) setUtilityConcealed(false);
      onScroll();
    };

    lastScrollY.current = window.scrollY;
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    lgQuery.addEventListener("change", onBreakpointChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      lgQuery.removeEventListener("change", onBreakpointChange);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "site-header-concealed",
      concealUtility,
    );
    return () =>
      document.documentElement.classList.remove("site-header-concealed");
  }, [concealUtility]);

  return (
    <>
      <div
        id="siteHeaderUtility"
        className="site-header-layer sticky top-0 z-102 hidden lg:block"
      >
        <HeaderUtility />
      </div>

      <div
        id="siteHeaderBar"
        className={cn(
          "site-header-layer sticky top-0 z-101 border-b border-neutral-200 bg-neutral-0/95 backdrop-blur-sm lg:top-11",
          isScrolled &&
            "bg-[color-mix(in_oklch,var(--color-neutral-0)_92%,transparent)]",
        )}
      >
        <header id="siteHeader">
          <HeaderBar
            onMenuToggle={() => setDrawerOpen(true)}
            onSalonToggle={openSalonDrawer}
            salonOpen={salonOpen}
            isScrolled={isScrolled}
            productsOpen={productsOpen}
            onProductsOpenChange={setProductsOpen}
          />
          <HeaderSalonStrip onClick={openSalonDrawer} open={salonOpen} />
        </header>
      </div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <SalonDrawer open={salonOpen} onClose={() => setSalonOpen(false)} />
      <InspirationProductsDrawer
        open={inspirationOpen}
        arrangement={inspirationArrangement}
        onClose={closeInspirationProducts}
      />
    </>
  );
}
