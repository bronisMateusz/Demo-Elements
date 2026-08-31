import { floatingBottomShellClassName } from "./floatingBottomShellClassName";

type ProductFixedBarClassNameOptions = {
  visible?: boolean;
  className?: string;
};

/** OKA-style sticky PDP bar - full-bleed on mobile, capped + centered on desktop. */
export function productFixedBarClassName({
  visible = true,
  className,
}: ProductFixedBarClassNameOptions = {}) {
  return floatingBottomShellClassName({
    visible,
    placement: "bar",
    className,
  });
}
