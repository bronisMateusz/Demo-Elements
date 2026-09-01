import { cn } from "../../lib/cn";
import { Button } from "../ui/Button";

type ProductAskRowProps = {
  href?: string;
  lead: string;
  actionLabel: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
  /** Inside ProductPriceBlock - no outer frame. */
  embedded?: boolean;
  onAskOpen?: () => void;
};

export function ProductAskRow({
  href = "#kontakt",
  lead,
  actionLabel,
  secondaryLabel,
  secondaryHref = "/salony",
  className,
  embedded = false,
  onAskOpen,
}: ProductAskRowProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        !embedded &&
          "rounded-xs border border-neutral-300 bg-neutral-50 px-5 py-5",
        className,
      )}
    >
      <p className="m-0 font-heading text-lg leading-[1.35] text-neutral-900">
        {lead}
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        {onAskOpen ? (
          <Button
            as="button"
            type="button"
            variant="secondary"
            size="lg"
            full
            className={secondaryLabel ? "min-w-0 sm:flex-1" : undefined}
            ariaLabel={`${lead} ${actionLabel}`}
            onClick={onAskOpen}
          >
            <i className="ph ph-chat-circle" aria-hidden="true" />
            {actionLabel}
          </Button>
        ) : (
          <Button
            href={href}
            variant="secondary"
            size="lg"
            full
            className={secondaryLabel ? "min-w-0 sm:flex-1" : undefined}
            ariaLabel={`${lead} ${actionLabel}`}
          >
            <i className="ph ph-chat-circle" aria-hidden="true" />
            {actionLabel}
          </Button>
        )}
        {secondaryLabel ? (
          <Button
            href={secondaryHref}
            variant="secondary"
            size="lg"
            full
            className="min-w-0 sm:flex-1"
            ariaLabel={secondaryLabel}
          >
            <i className="ph ph-storefront" aria-hidden="true" />
            {secondaryLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
