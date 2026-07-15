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
  "flex items-center gap-3 rounded-sm px-3 py-3 text-small font-medium leading-compact text-text-strong no-underline transition-[background-color] duration-fast ease-out hover:bg-bg-muted focus-visible:bg-bg-muted focus-visible:outline-2 focus-visible:outline-offset-[var(--focus-ring-offset)] focus-visible:outline-focus-ring";

const sectionTitleClassName =
  "m-0 px-3 pt-2 pb-1 text-eyebrow font-medium uppercase tracking-wide text-text-muted";

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
        <div className="mx-3 my-2 h-px bg-border" role="separator" aria-hidden="true" />
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

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      className="fixed right-4 bottom-4 z-[300] max-lg:right-3 max-lg:bottom-3"
      ref={rootRef}
    >
      <div className="relative">
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
              "ph ph-caret-down text-sm transition-transform duration-fast ease-out",
              open && "rotate-180",
            )}
            aria-hidden="true"
          />
        </button>

        {open ? (
          <div
            className="absolute right-0 bottom-[calc(100%+var(--space-2))] max-h-[min(70vh,28rem)] min-w-[min(360px,calc(100vw-var(--space-6)))] overflow-auto rounded-sm border border-border bg-bg shadow-2"
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
