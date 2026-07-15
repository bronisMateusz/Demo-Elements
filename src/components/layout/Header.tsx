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
          "sticky top-0 z-[100] bg-neutral-0/95 backdrop-blur-sm transition-[border-color,background-color] duration-base ease-luxury",
          isScrolled && "border-b border-neutral-200 [background:color-mix(in_oklch,var(--color-neutral-0)_92%,transparent)]",
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
