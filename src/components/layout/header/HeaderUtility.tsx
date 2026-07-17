import { utilityNavItems, utilityTagline } from "../../../data/nav";
import { cn } from "../../../lib/cn";

export function HeaderUtility() {
  return (
    <div className="border-b border-neutral-200 bg-neutral-50">
      <div className="container flex h-header-utility-h items-stretch justify-between gap-6">
        <p className="m-0 flex shrink-0 items-center text-xs leading-none text-neutral-600 italic">
          {utilityTagline}
        </p>

        <nav aria-label="Strefy i skróty" className="min-w-0 self-stretch">
          <ul className="m-0 flex h-full list-none items-stretch gap-0">
            {utilityNavItems.map((item) => (
              <li
                key={item.href + item.label}
                className={cn(
                  "flex items-stretch",
                  "dividerAfter" in item &&
                    item.dividerAfter &&
                    "after:mx-1 after:block after:w-px after:self-center after:h-3 after:bg-neutral-300 after:content-['']",
                )}
              >
                <a
                  href={item.href}
                  className="inline-flex h-full items-center gap-1.5 px-2.5 text-xs leading-none text-neutral-600 no-underline transition-colors duration-fast ease-out hover:text-gold-500"
                >
                  {"iconClass" in item && item.iconClass ? (
                    <i className={cn(item.iconClass, "text-sm leading-none")} aria-hidden="true" />
                  ) : null}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
