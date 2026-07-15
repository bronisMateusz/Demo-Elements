import { cn } from "../../lib/cn";
import {
  askRowActionClassName,
  askRowChevronClassName,
  askRowClassName,
  askRowIconClassName,
  askRowTextClassName,
} from "./askRowClassName";

type ProductAskRowProps = {
  href: string;
  lead: string;
  actionLabel: string;
  className?: string;
};

export function ProductAskRow({ href, lead, actionLabel, className }: ProductAskRowProps) {
  return (
    <a
      href={href}
      className={cn(askRowClassName, className)}
      aria-label={`${lead} ${actionLabel}`}
    >
      <i className={cn("ph ph-chat-circle", askRowIconClassName)} aria-hidden="true" />
      <span className={askRowTextClassName}>
        {lead} <strong className={askRowActionClassName}>{actionLabel}</strong>
      </span>
      <i className={cn("ph ph-caret-right", askRowChevronClassName)} aria-hidden="true" />
    </a>
  );
}
