import { cn } from "../../lib/cn";
import { Button } from "../ui/Button";

type ProductAskRowProps = {
  href: string;
  lead: string;
  actionLabel: string;
  className?: string;
  /** Inside ProductPriceBlock — no outer frame. */
  embedded?: boolean;
};

export function ProductAskRow({
  href,
  lead,
  actionLabel,
  className,
  embedded = false,
}: ProductAskRowProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        !embedded && "rounded-xs border border-neutral-200 bg-neutral-50 px-5 py-5",
        className,
      )}
    >
      <p className="m-0 font-heading text-[18px] leading-[1.35] text-neutral-900">{lead}</p>
      <Button href={href} variant="secondary" size="lg" full ariaLabel={`${lead} ${actionLabel}`}>
        <i className="ph ph-chat-circle" aria-hidden="true" />
        {actionLabel}
      </Button>
    </div>
  );
}
