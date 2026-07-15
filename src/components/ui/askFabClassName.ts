import { cn } from "../../lib/cn";
import { buttonClassName } from "./buttonClassName";

type AskFabClassNameOptions = {
  visible?: boolean;
  fixed?: boolean;
  className?: string;
};

export function askFabClassName({
  visible = true,
  fixed = true,
  className,
}: AskFabClassNameOptions = {}) {
  return buttonClassName({
    variant: "primary",
    className: cn(
      "ask-fab gap-2 shadow-1 no-underline",
      "transition-[opacity,transform] duration-base ease-luxury",
      fixed && "fixed right-4 bottom-4 z-[250] max-lg:right-3 max-lg:bottom-3",
      visible
        ? "visible translate-y-0 opacity-100"
        : "pointer-events-none translate-y-2 opacity-0 max-lg:translate-y-3",
      className,
    ),
  });
}
