import { cn } from "../../lib/cn";

type ProductFixedBarClassNameOptions = {
  visible?: boolean;
  className?: string;
};

/** OKA-style sticky PDP bar - full-bleed on mobile, inset on desktop. */
export function productFixedBarClassName({
  visible = true,
  className,
}: ProductFixedBarClassNameOptions = {}) {
  return cn(
    "fixed inset-x-0 bottom-0 z-[90] transition-transform duration-base ease-luxury",
    "lg:inset-x-gutter lg:bottom-5",
    visible
      ? "translate-y-0"
      : "pointer-events-none translate-y-[calc(100%+1.25rem)]",
    className,
  );
}
