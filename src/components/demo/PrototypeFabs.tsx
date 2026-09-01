import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  prototypeHomeItem,
  prototypeSections,
  type PrototypeMenuItem,
  type PrototypePageStatus,
} from "../../data/prototypeRegistry";
import { cn } from "../../lib/cn";
import { buttonClassName } from "../ui/buttonClassName";

const menuItemClass =
  "flex items-center gap-3 rounded-xs px-3 py-3 text-sm font-medium leading-compact text-neutral-800 no-underline transition-[background-color,color] duration-fast ease-out hover:bg-neutral-100 focus-visible:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800";

const menuItemActiveClass =
  "bg-neutral-800 text-neutral-0 hover:bg-neutral-800 hover:text-neutral-0 focus-visible:bg-neutral-800 focus-visible:outline-neutral-0";

const sectionTitleClassName =
  "m-0 px-3 pt-2 pb-1 text-xs font-medium uppercase tracking-wide text-neutral-500";

const prototypeStatusLabels: Record<PrototypePageStatus, string> = {
  accepted: "Zaakceptowane",
  round2: "II Tura",
  round1: "I Tura",
  new: "Nowe",
};

/** Dev-only status chips — intentionally off-brand for quick scanning. */
const prototypeStatusClassName: Record<PrototypePageStatus, string> = {
  accepted: "border-0 bg-green-600 text-white",
  round2: "border-0 bg-violet-600 text-white",
  round1: "border-0 bg-sky-600 text-white",
  new: "border-0 bg-zinc-300 text-zinc-800",
};

const prototypeStatusActiveClassName: Record<PrototypePageStatus, string> = {
  accepted: "border-0 bg-green-500 text-white",
  round2: "border-0 bg-violet-500 text-white",
  round1: "border-0 bg-sky-500 text-white",
  new: "border-0 bg-zinc-500 text-white",
};

const prototypeStatusBadgeClassName =
  "ms-auto shrink-0 rounded-xs px-1.5 py-0.5 text-[0.625rem] font-medium uppercase leading-none tracking-[0.08em]";

function PrototypeStatusBadge({
  status,
  active,
}: {
  status: PrototypePageStatus;
  active: boolean;
}) {
  return (
    <span
      className={cn(
        prototypeStatusBadgeClassName,
        active
          ? prototypeStatusActiveClassName[status]
          : prototypeStatusClassName[status],
      )}
    >
      {prototypeStatusLabels[status]}
    </span>
  );
}

/** Exact path match; `/salony` listing is exact only - details use `/salony/:slug`. */
function isPrototypePathActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  if (to === "/salony") {
    return pathname === "/salony";
  }
  return pathname === to || pathname.startsWith(`${to}/`);
}

function PrototypeMenuLink({
  item,
  active,
  onNavigate,
  showPageStatus = false,
}: {
  item: PrototypeMenuItem;
  active: boolean;
  onNavigate: () => void;
  showPageStatus?: boolean;
}) {
  const status = showPageStatus ? (item.status ?? "new") : undefined;

  return (
    <Link
      className={cn(menuItemClass, active && menuItemActiveClass)}
      to={item.to}
      role="menuitem"
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
    >
      <i className={cn(item.iconClass, "shrink-0")} aria-hidden="true" />
      <span className="min-w-0 flex-1">{item.label}</span>
      {status ? <PrototypeStatusBadge status={status} active={active} /> : null}
    </Link>
  );
}

function PrototypeMenuSection({
  title,
  items,
  pathname,
  onNavigate,
  showPageStatus = false,
}: {
  title: string;
  items: PrototypeMenuItem[];
  pathname: string;
  onNavigate: () => void;
  showPageStatus?: boolean;
}) {
  return (
    <>
      <li role="none">
        <div
          className="mx-3 my-2 h-px bg-neutral-200"
          role="separator"
          aria-hidden="true"
        />
        <p className={sectionTitleClassName}>{title}</p>
      </li>
      {items.map((item) => (
        <li key={item.to} role="none">
          <PrototypeMenuLink
            item={item}
            active={isPrototypePathActive(pathname, item.to)}
            onNavigate={onNavigate}
            showPageStatus={showPageStatus}
          />
        </li>
      ))}
    </>
  );
}

export function PrototypeFabs() {
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
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
      className="fixed top-1/2 inset-s-4 z-100 -translate-y-1/2 max-lg:inset-s-3"
      ref={rootRef}
    >
      <div className="relative overflow-visible">
        <button
          type="button"
          className={buttonClassName({
            variant: "primary",
            className: cn("size-12 px-0 shadow-1", open && "bg-neutral-800"),
          })}
          aria-label="Zasoby"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((current) => !current)}
        >
          <i className="ph ph-squares-four" aria-hidden="true" />
        </button>

        {open ? (
          <div
            className={cn(
              "absolute top-1/2 inset-s-full z-10 ms-2 -translate-y-1/2 overflow-auto rounded-xs",
              "w-[min(26rem,calc(100vw-4.5rem))] max-h-[min(70vh,28rem)]",
              "border border-neutral-300 bg-neutral-0 shadow-2",
            )}
            id={menuId}
            role="menu"
            aria-label="Skróty prototypu"
          >
            <ul className="m-0 list-none p-2" role="none">
              <li role="none">
                <PrototypeMenuLink
                  item={prototypeHomeItem}
                  active={isPrototypePathActive(pathname, prototypeHomeItem.to)}
                  onNavigate={() => setOpen(false)}
                  showPageStatus
                />
              </li>
              {prototypeSections.map((section) => (
                <PrototypeMenuSection
                  key={section.title}
                  title={section.title}
                  items={section.items}
                  pathname={pathname}
                  onNavigate={() => setOpen(false)}
                  showPageStatus={section.title === "Strony"}
                />
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
