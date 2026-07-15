import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  prototypeHomeItem,
  prototypeSections,
  type PrototypeMenuItem,
} from "../../data/prototypeRegistry";
import { cn } from "../../lib/cn";
import { buttonClassName } from "../ui/buttonClassName";

const menuItemClass =
  "flex items-center gap-3 rounded-xs px-3 py-3 text-sm font-medium leading-compact text-neutral-800 no-underline transition-[background-color] duration-fast ease-out hover:bg-neutral-50 focus-visible:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-[var(--spacing-focus-ring-offset)] focus-visible:outline-neutral-800";

const sectionTitleClassName =
  "m-0 px-3 pt-2 pb-1 text-xs font-medium uppercase tracking-wide text-neutral-500";

function PrototypeMenuLink({
  item,
  onNavigate,
}: {
  item: PrototypeMenuItem;
  onNavigate: () => void;
}) {
  return (
    <Link className={menuItemClass} to={item.to} role="menuitem" onClick={onNavigate}>
      <i className={item.iconClass} aria-hidden="true" />
      <span>{item.label}</span>
    </Link>
  );
}

function PrototypeMenuSection({
  title,
  items,
  onNavigate,
}: {
  title: string;
  items: PrototypeMenuItem[];
  onNavigate: () => void;
}) {
  return (
    <>
      <li role="none">
        <div className="mx-3 my-2 h-px bg-neutral-200" role="separator" aria-hidden="true" />
        <p className={sectionTitleClassName}>{title}</p>
      </li>
      {items.map((item) => (
        <li key={item.to} role="none">
          <PrototypeMenuLink item={item} onNavigate={onNavigate} />
        </li>
      ))}
    </>
  );
}

export function PrototypeFabs() {
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    // Defer so the opening click does not immediately close the menu.
    const listenerId = window.setTimeout(() => {
      document.addEventListener("pointerdown", onPointerDown);
    }, 0);

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(listenerId);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      className="fixed bottom-4 left-1/2 z-[300] -translate-x-1/2 max-lg:bottom-3"
      ref={rootRef}
    >
      <div className="relative overflow-visible">
        <button
          type="button"
          className={buttonClassName({
            variant: "primary",
            className: "gap-2 shadow-1",
          })}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((current) => !current)}
        >
          <i className="ph ph-squares-four" aria-hidden="true" />
          <span className="max-[479px]:sr-only">Zasoby</span>
          <i
            className={cn(
              "ph ph-caret-up text-sm transition-transform duration-fast ease-out",
              open && "rotate-180",
            )}
            aria-hidden="true"
          />
        </button>

        {open ? (
          <div
            className="absolute bottom-full left-1/2 z-10 mb-2 max-h-[min(70vh,28rem)] min-w-[min(360px,calc(100vw-2*var(--spacing-gutter)))] -translate-x-1/2 overflow-auto rounded-xs border border-neutral-200 bg-neutral-0 shadow-2"
            id={menuId}
            role="menu"
            aria-label="Skróty prototypu"
          >
            <ul className="m-0 list-none p-2" role="none">
              <li role="none">
                <PrototypeMenuLink
                  item={prototypeHomeItem}
                  onNavigate={() => setOpen(false)}
                />
              </li>
              {prototypeSections.map((section) => (
                <PrototypeMenuSection
                  key={section.title}
                  title={section.title}
                  items={section.items}
                  onNavigate={() => setOpen(false)}
                />
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
