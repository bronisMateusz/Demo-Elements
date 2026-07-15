import { useEffect, useState } from "react";
import { cn } from "../../lib/cn";
import { askFabClassName } from "../ui/askFabClassName";

/** Hide when footer top enters this band above the viewport bottom (FAB height + offset + gap). */
const FOOTER_CLEARANCE_PX = 120;

type AskFabProps = {
  href?: string;
  label?: string;
  className?: string;
  /** Scroll offset (px) after which the FAB becomes visible. */
  showAfterScroll?: number;
  /** Footer element to watch; defaults to `footer[role="contentinfo"]`. */
  footerSelector?: string;
};

export function AskFab({
  href = "#kontakt",
  label = "Zadaj pytanie",
  className,
  showAfterScroll = 320,
  footerSelector = 'footer[role="contentinfo"]',
}: AskFabProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector<HTMLElement>(footerSelector);
    if (!footer) return;

    let scrolledEnough = window.scrollY > showAfterScroll;
    let footerNear = false;

    const syncVisible = () => setVisible(scrolledEnough && !footerNear);

    const onScroll = () => {
      scrolledEnough = window.scrollY > showAfterScroll;
      syncVisible();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        footerNear = entry.isIntersecting;
        syncVisible();
      },
      { rootMargin: `0px 0px -${FOOTER_CLEARANCE_PX}px 0px`, threshold: 0 },
    );

    observer.observe(footer);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [showAfterScroll, footerSelector]);

  return (
    <a
      id="askFab"
      href={href}
      className={cn(askFabClassName({ visible, className }))}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      data-action="ask"
      data-event="click_cta"
    >
      <i className="ph ph-chat-circle" aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}
