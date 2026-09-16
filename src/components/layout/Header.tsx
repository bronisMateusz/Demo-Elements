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
  XL_MIN_WIDTH_PX,
} from "../../lib/layoutTokens";
import { useSiteChrome } from "../../hooks/useSiteChrome";
import { useInspirationAskDrawerRequest } from "../../hooks/useInspirationAskDrawer";
import { useInspirationProductsDrawerRequest } from "../../hooks/useInspirationProductsDrawer";
import { useSalonDrawerRequest } from "../../hooks/useSelectedSalon";
import type { InspirationArrangement, ProductImage } from "../../types/product";
import { AdvisorAskDrawer } from "../marketing/AdvisorAskDrawer";
import { BookAppointmentDrawer } from "../marketing/BookAppointmentDrawer";
import { InspirationProductsDrawer } from "../inspiration/InspirationProductsDrawer";
import { SalonDrawer } from "./SalonDrawer";
import { DrawerShell } from "./DrawerShell";
import { HeaderBar } from "./header/HeaderBar";
import { HeaderSalonStrip } from "./header/HeaderSalonStrip";
import { HeaderUtility } from "./header/HeaderUtility";
import { MobileDrawer } from "./MobileDrawer";
import { bookAppointmentCopy } from "../../data/bookAppointment";

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
  const [askOpen, setAskOpen] = useState(false);
  const [askTopic, setAskTopic] = useState("Elements");
  const [askTopicImage, setAskTopicImage] = useState<
    ProductImage | undefined
  >();
  const [askFromProducts, setAskFromProducts] = useState(false);
  const [askArrangement, setAskArrangement] =
    useState<InspirationArrangement | null>(null);
  const [inspirationSalonOpen, setInspirationSalonOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [utilityConcealed, setUtilityConcealed] = useState(false);
  const lastScrollY = useRef(0);
  // Drawers must not change header chrome (utility conceal stays scroll-driven).
  const concealUtility = utilityConcealed;

  const openSalonDrawer = useCallback(() => {
    setProductsOpen(false);
    setInspirationOpen(false);
    setInspirationArrangement(null);
    setAskOpen(false);
    setAskFromProducts(false);
    setAskArrangement(null);
    setAskTopicImage(undefined);
    setInspirationSalonOpen(false);
    setSalonOpen(true);
  }, []);

  const openInspirationProducts = useCallback(
    (arrangement: InspirationArrangement) => {
      setProductsOpen(false);
      setSalonOpen(false);
      setAskOpen(false);
      setAskFromProducts(false);
      setAskArrangement(null);
      setAskTopicImage(undefined);
      setInspirationSalonOpen(false);
      setInspirationArrangement(arrangement);
      setInspirationOpen(true);
    },
    [],
  );

  const openInspirationAsk = useCallback(
    (arrangement: InspirationArrangement) => {
      // Keep shell mounted - only swap step content (no reopen animation).
      setInspirationOpen(false);
      setInspirationSalonOpen(false);
      setAskTopic(arrangement.title);
      setAskTopicImage(arrangement.image);
      setAskArrangement(arrangement);
      setAskFromProducts(true);
      setAskOpen(true);
    },
    [],
  );

  const openInspirationSalon = useCallback(() => {
    setInspirationOpen(false);
    setAskOpen(false);
    setAskFromProducts(false);
    setAskTopicImage(undefined);
    setInspirationSalonOpen(true);
  }, []);

  const backAskToProducts = useCallback(() => {
    if (!askArrangement) return;
    setAskOpen(false);
    setAskFromProducts(false);
    setAskTopicImage(undefined);
    setInspirationArrangement(askArrangement);
    setInspirationOpen(true);
  }, [askArrangement]);

  const backSalonToProducts = useCallback(() => {
    setInspirationSalonOpen(false);
    setInspirationOpen(true);
  }, []);

  const closeInspirationAskFlow = useCallback(() => {
    setInspirationOpen(false);
    setInspirationArrangement(null);
    setAskOpen(false);
    setAskTopicImage(undefined);
    setAskFromProducts(false);
    setAskArrangement(null);
    setInspirationSalonOpen(false);
  }, []);

  const inspirationAskFlowOpen =
    inspirationOpen || (askOpen && askFromProducts) || inspirationSalonOpen;

  useSalonDrawerRequest(openSalonDrawer);
  useInspirationProductsDrawerRequest(openInspirationProducts);
  useInspirationAskDrawerRequest(openInspirationAsk);

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
    const xlQuery = window.matchMedia(`(min-width: ${XL_MIN_WIDTH_PX}px)`);

    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 8);

      // Utility strip exists only from xl up - never conceal the main bar below that.
      if (!xlQuery.matches) {
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
      if (!xlQuery.matches) setUtilityConcealed(false);
      onScroll();
    };

    lastScrollY.current = window.scrollY;
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    xlQuery.addEventListener("change", onBreakpointChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      xlQuery.removeEventListener("change", onBreakpointChange);
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
        className="site-header-layer sticky top-0 z-102 hidden xl:block"
      >
        <HeaderUtility />
      </div>

      <div
        id="siteHeaderBar"
        className={cn(
          "site-header-layer sticky top-0 z-101 border-b border-neutral-300 bg-neutral-0/95 backdrop-blur-sm xl:top-11",
          isScrolled && "bg-neutral-0/92",
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
      <DrawerShell
        open={inspirationAskFlowOpen}
        onClose={closeInspirationAskFlow}
        label={
          inspirationOpen
            ? (inspirationArrangement?.title ?? "Produkty w aranżacji")
            : inspirationSalonOpen
              ? bookAppointmentCopy.title
              : askTopic
        }
        closeLabel="Zamknij"
      >
        {inspirationOpen ? (
          <InspirationProductsDrawer
            embedded
            open={inspirationOpen}
            arrangement={inspirationArrangement}
            onClose={closeInspirationAskFlow}
            onAsk={openInspirationAsk}
            onBookSalon={openInspirationSalon}
          />
        ) : null}
        {askOpen && askFromProducts ? (
          <AdvisorAskDrawer
            embedded
            open={askOpen}
            onClose={closeInspirationAskFlow}
            topicTitle={askTopic}
            topicImage={askTopicImage}
            fromProductsStep
            onBackToProducts={backAskToProducts}
          />
        ) : null}
        {inspirationSalonOpen ? (
          <BookAppointmentDrawer
            embedded
            open={inspirationSalonOpen}
            onClose={closeInspirationAskFlow}
            embedSalonPicker
            fromProductsStep
            onBackToProducts={backSalonToProducts}
          />
        ) : null}
      </DrawerShell>
      {askOpen && !askFromProducts ? (
        <AdvisorAskDrawer
          open={askOpen}
          onClose={() => {
            setAskOpen(false);
            setAskTopicImage(undefined);
            setAskArrangement(null);
          }}
          topicTitle={askTopic}
          topicImage={askTopicImage}
        />
      ) : null}
    </>
  );
}
