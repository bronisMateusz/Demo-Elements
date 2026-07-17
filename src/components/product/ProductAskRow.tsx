import { cn } from "../../lib/cn";
import { Button } from "../ui/Button";

type ProductAskRowProps = {
  href: string;
  lead: string;
  actionLabel: string;
  className?: string;
};

/** Lead copy + separate CTA — not a full-bleed “mega” button. */
export function ProductAskRow({ href, lead, actionLabel, className }: ProductAskRowProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <p className="m-0 font-body text-base leading-body text-neutral-600">{lead}</p>
      <div>
        <Button href={href} variant="secondary" size="lg" ariaLabel={`${lead} ${actionLabel}`}>
          <i className="ph ph-chat-circle" aria-hidden="true" />
          {actionLabel}
          <i className="ph ph-arrow-right" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
