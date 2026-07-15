import { cn } from "../../lib/cn";

type DividerProps = {
  className?: string;
};

export function Divider({ className }: DividerProps) {
  return <hr className={cn("m-0 border-0 border-t border-neutral-200", className)} aria-hidden="true" />;
}
