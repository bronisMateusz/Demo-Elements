import { cn } from "../../lib/cn";
import { useFloatingCtaVisibility } from "../../hooks/useFloatingCtaVisibility";
import { Button } from "../ui/Button";

type FloatingAdvisorCtaProps = {
  label: string;
  onClick: () => void;
  iconClass?: string;
  id?: string;
  ariaLabel?: string;
  className?: string;
  showAfterScroll?: number;
  footerSelector?: string;
};

const floatingAdvisorCtaShellClassName = ({
  visible,
  className,
}: {
  visible: boolean;
  className?: string;
}) =>
  cn(
    "fixed inset-x-0 bottom-0 z-90 px-[clamp(1.25rem,2.222vw,2.5rem)] pb-4",
    "transition-transform duration-base ease-luxury",
    "sm:inset-x-auto sm:bottom-5 sm:inset-e-[clamp(1.25rem,2.222vw,2.5rem)] sm:w-auto sm:px-0 sm:pb-0",
    visible
      ? "translate-y-0"
      : "pointer-events-none translate-y-[calc(100%+1.25rem)]",
    className,
  );

/** Compact sticky advisor / visit CTA for marketing pages (not the PDP AskFab bar). */
export function FloatingAdvisorCta({
  label,
  onClick,
  iconClass = "ph ph-chat-circle",
  id = "floatingAdvisorCta",
  ariaLabel,
  className,
  showAfterScroll,
  footerSelector,
}: FloatingAdvisorCtaProps) {
  const visible = useFloatingCtaVisibility({
    showAfterScroll,
    footerSelector,
  });

  return (
    <aside
      id={id}
      className={floatingAdvisorCtaShellClassName({ visible, className })}
      aria-hidden={!visible}
    >
      <Button
        as="button"
        type="button"
        variant="primary"
        size="lg"
        className="w-full shadow-2 sm:w-auto sm:h-13"
        ariaLabel={ariaLabel ?? label}
        onClick={onClick}
      >
        <i className={iconClass} aria-hidden="true" />
        <span className="truncate">{label}</span>
        <i className="ph ph-arrow-right" aria-hidden="true" />
      </Button>
    </aside>
  );
}
