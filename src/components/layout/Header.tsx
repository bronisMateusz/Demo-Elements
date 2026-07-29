import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { LG_MIN_WIDTH_PX } from "../../lib/layoutTokens";
import { useSiteChrome } from "../../hooks/useSiteChrome";
import { useSalonDrawerRequest } from "../../hooks/useSelectedSalon";
import { HeaderBar } from "./header/HeaderBar";
import { HeaderUtility } from "./header/HeaderUtility";
import { MobileDrawer } from "./MobileDrawer";
import { SalonDrawer } from "./SalonDrawer";

const TOP_ALWAYS_VISIBLE_PX = 64;
const DIRECTION_DELTA_PX = 6;

export function Header() {
  useSiteChrome();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [salonOpen, setSalonOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [utilityConcealed, setUtilityConcealed] = useState(false);
  const lastScrollY = useRef(0);
  // Drawers keep the utility strip visible; bar hover / mega menu must not toggle it.
  const chromeLocked = drawerOpen || salonOpen;
  const concealUtility = utilityConcealed && !chromeLocked;

  const openSalonDrawer = useCallback(() => {
    setProductsOpen(false);
    setSalonOpen(true);
  }, []);

  useSalonDrawerRequest(openSalonDrawer);

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

      if (y <= TOP_ALWAYS_VISIBLE_PX) {
        setUtilityConcealed(false);
      } else if (y > lastScrollY.current + DIRECTION_DELTA_PX) {
        setUtilityConcealed(true);
      } else if (y < lastScrollY.current - DIRECTION_DELTA_PX) {
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
    document.documentElement.classList.toggle("site-header-concealed", concealUtility);
    return () => document.documentElement.classList.remove("site-header-concealed");
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
        </header>
      </div>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSalonOpen={() => setSalonOpen(true)}
      />
      <SalonDrawer open={salonOpen} onClose={() => setSalonOpen(false)} />
    </>
  );
}
