import { useEffect, useState } from "react";
import { cn } from "../../lib/cn";
import { useSiteChrome } from "../../hooks/useSiteChrome";
import { HeaderBar } from "./header/HeaderBar";
import { MobileDrawer } from "./MobileDrawer";

export function Header() {
  useSiteChrome();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "site-header sticky top-0 z-[100] bg-bg/95 backdrop-blur-sm",
          isScrolled && "is-scrolled",
        )}
        id="siteHeader"
      >
        <HeaderBar
          onMenuToggle={() => setDrawerOpen(true)}
          isScrolled={isScrolled}
        />
      </header>
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
