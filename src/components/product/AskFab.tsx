import { useEffect, useState } from "react";
import { cn } from "../../lib/cn";
import { askFabClassName } from "../ui/askFabClassName";

type AskFabProps = {
  href?: string;
  label?: string;
  className?: string;
  /** Scroll offset (px) after which the FAB becomes visible. */
  showAfterScroll?: number;
};

export function AskFab({
  href = "#kontakt",
  label = "Zadaj pytanie",
  className,
  showAfterScroll = 320,
}: AskFabProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > showAfterScroll);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfterScroll]);

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
