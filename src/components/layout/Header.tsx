import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { PDP_HEADER_HEIGHT_PX } from "../../constants/pdpSubnav";
import { useSiteChrome } from "../../hooks/useSiteChrome";
import { useSalonDrawerRequest } from "../../hooks/useSelectedSalon";
import { HeaderBar } from "./header/HeaderBar";
import { HeaderUtility } from "./header/HeaderUtility";
import { MobileDrawer } from "./MobileDrawer";
import { SalonDrawer } from "./SalonDrawer";

const TOP_ALWAYS_VISIBLE_PX = 64;
const DIRECTION_DELTA_PX = 6;

/** On PDP, only conceal after the sticky section menu has actually pinned under the header. */
function canConcealHeader(): boolean {
  const subnav = document.getElementById("pdpSubnav");
  if (!subnav) return true;
  if (!document.documentElement.classList.contains("pdp-subnav-stuck")) return false;
  const headerH = Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--spacing-header-h"),
  );
  const offset = Number.isFinite(headerH) ? headerH : PDP_HEADER_HEIGHT_PX;
  return subnav.getBoundingClientRect().top <= offset + 2;
}

export function Header() {
  useSiteChrome();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [salonOpen, setSalonOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [concealed, setConcealed] = useState(false);
  const lastScrollY = useRef(0);
  const chromeLocked = drawerOpen || salonOpen || productsOpen;
  const chromeConcealed = concealed && !chromeLocked;

  const openSalonDrawer = useCallback(() => {
    setProductsOpen(false);
    setSalonOpen(true);
  }, []);

  useSalonDrawerRequest(openSalonDrawer);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 8);

      if (y <= TOP_ALWAYS_VISIBLE_PX || !canConcealHeader()) {
        setConcealed(false);
      } else if (y > lastScrollY.current + DIRECTION_DELTA_PX) {
        setConcealed(true);
      } else if (y < lastScrollY.current - DIRECTION_DELTA_PX) {
        setConcealed(false);
      }

      lastScrollY.current = y;
    };

    lastScrollY.current = window.scrollY;
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("site-header-concealed", chromeConcealed);
    return () => document.documentElement.classList.remove("site-header-concealed");
  }, [chromeConcealed]);

  return (
    <>
      {/* Split sticky layers so utility → bar → subnav can stagger on show/hide. */}
      <div
        id="siteHeaderUtility"
        className="site-header-layer sticky top-0 z-[102] hidden lg:block"
      >
        <HeaderUtility />
      </div>

      <div
        id="siteHeaderBar"
        className={cn(
          "site-header-layer sticky top-0 z-[101] border-b border-neutral-200 bg-neutral-0/95 backdrop-blur-sm lg:top-header-utility-h",
          "transition-[border-color,background-color,transform] duration-base ease-luxury",
          isScrolled &&
            "[background:color-mix(in_oklch,var(--color-neutral-0)_92%,transparent)]",
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
