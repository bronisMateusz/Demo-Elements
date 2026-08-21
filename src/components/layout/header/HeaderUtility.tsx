import { utilityNavItems, utilityTagline } from "../../../data/nav";
import { cn } from "../../../lib/cn";
import {
  btnAnimatedBaseClassName,
  btnAnimatedFillLightClassName,
  btnAnimatedSecondaryClassName,
} from "../../ui/btnAnimatedClassName";

const utilityAccentLinkClassName = cn(
  btnAnimatedBaseClassName,
  btnAnimatedFillLightClassName,
  "border-0 bg-gold-50 text-neutral-900",
  "hover:border-neutral-800 hover:text-neutral-0",
  "focus-visible:border-neutral-800 focus-visible:text-neutral-0",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800",
);

const utilityLinkClassName = cn(
  btnAnimatedBaseClassName,
  btnAnimatedSecondaryClassName,
  btnAnimatedFillLightClassName,
  "border-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800",
);

/** Bleed accent strip through the container end gutter to the viewport edge. */
const accentStripClassName = cn(
  "flex h-full list-none items-stretch gap-0 bg-gold-50 p-0",
  "pe-[clamp(0.75rem,2.222vw,2.5rem)] me-[calc(-1*clamp(0.75rem,2.222vw,2.5rem))]",
);

const primaryItems = utilityNavItems.filter(
  (item) => !("accent" in item && item.accent),
);
const accentItems = utilityNavItems.filter(
  (item) => "accent" in item && item.accent,
);

export function HeaderUtility() {
  return (
    <div className="border-b border-neutral-200 bg-neutral-0">
      <div className="container flex h-11 items-stretch justify-between gap-6">
        <p className="m-0 flex shrink-0 items-center text-xs leading-none text-neutral-600 italic">
          {utilityTagline}
        </p>

        <nav aria-label="Strefy i skróty" className="min-w-0 self-stretch">
          <ul className="m-0 flex h-full list-none items-stretch gap-0">
            {primaryItems.map((item) => (
              <li key={item.href + item.label} className="flex items-stretch">
                <a
                  href={item.href}
                  className={cn(
                    "inline-flex h-full items-center gap-1.5 px-3.5 text-xs font-medium leading-none no-underline",
                    utilityLinkClassName,
                  )}
                >
                  {"iconClass" in item && item.iconClass ? (
                    <i
                      className={cn(
                        item.iconClass,
                        "relative z-1 text-sm leading-none",
                      )}
                      aria-hidden="true"
                    />
                  ) : null}
                  <span className="relative z-1">{item.label}</span>
                </a>
              </li>
            ))}
            <li className="flex items-stretch">
              <ul className={accentStripClassName}>
                {accentItems.map((item) => (
                  <li
                    key={item.href + item.label}
                    className="flex items-stretch"
                  >
                    <a
                      href={item.href}
                      className={cn(
                        "inline-flex h-full items-center gap-1.5 px-3.5 text-xs font-medium leading-none no-underline",
                        utilityAccentLinkClassName,
                      )}
                    >
                      {"iconClass" in item && item.iconClass ? (
                        <i
                          className={cn(
                            item.iconClass,
                            "relative z-1 text-sm leading-none",
                          )}
                          aria-hidden="true"
                        />
                      ) : null}
                      <span className="relative z-1">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
