import { useFloatingCtaVisibility } from "../../hooks/useFloatingCtaVisibility";
import { floatingBottomShellClassName } from "../ui/floatingBottomShellClassName";
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
      className={floatingBottomShellClassName({
        visible,
        placement: "end",
        className,
      })}
      aria-hidden={!visible}
    >
      <Button
        as="button"
        type="button"
        variant="primary"
        size="lg"
        className="w-full shadow-2 sm:w-auto sm:h-11"
        ariaLabel={ariaLabel ?? label}
        onClick={onClick}
      >
        <i className={iconClass} aria-hidden="true" />
        <span className="truncate">{label}</span>
      </Button>
    </aside>
  );
}
