import { utilityNavItems, utilityTagline } from "../../../data/nav";
import { cn } from "../../../lib/cn";

export function HeaderUtility() {
  return (
    <div className="border-b border-neutral-200 bg-neutral-50">
      <div className="container flex h-header-utility-h items-center justify-between gap-6">
        <p className="m-0 shrink-0 text-xs leading-none text-neutral-600">{utilityTagline}</p>

        <nav aria-label="Strefy i skróty" className="min-w-0">
          <ul className="m-0 flex list-none items-center gap-0">
            {utilityNavItems.map((item) => (
              <li
                key={item.href + item.label}
                className={cn(
                  "flex items-center",
                  "dividerAfter" in item &&
                    item.dividerAfter &&
                    "after:mx-3 after:block after:h-3 after:w-px after:bg-neutral-300 after:content-['']",
                )}
              >
                <a
                  href={item.href}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs leading-none text-neutral-700 no-underline transition-colors hover:text-neutral-900"
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
