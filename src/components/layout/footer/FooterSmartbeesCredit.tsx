import { cn } from "../../../lib/cn";
import { LoopingWord } from "../../motion/LoopingWord";

type FooterSmartbeesCreditProps = {
  className?: string;
};

export function FooterSmartbeesCredit({ className }: FooterSmartbeesCreditProps) {
  return (
    <p className={cn("inline-flex items-baseline gap-1 text-sm leading-none text-neutral-500", className)}>
      <LoopingWord words={["Projekt", "Realizacja"]} align="end" />
      <a
        href="https://smartbees.pl"
        target="_blank"
        rel="noopener noreferrer"
        className="leading-none text-neutral-600 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline"
      >
        Smartbees
      </a>
    </p>
  );
}
