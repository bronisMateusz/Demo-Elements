import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  mainNavItems,
  productsMegaMenu,
  utilityNavItems,
  type MegaMenuGroup,
} from "../../data/nav";
import { useMotionReduced } from "../../hooks/useMotionReduced";
import { cn } from "../../lib/cn";
import { EASE_LUXURY } from "../../lib/motionEase";
import { DrawerHeader, DrawerShell } from "./DrawerShell";

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
};

type RootFrame = { kind: "root" };
type ProductsFrame = { kind: "products" };
type GroupFrame = { kind: "group"; href: string };
type Frame = RootFrame | ProductsFrame | GroupFrame;

const PANEL_DURATION_S = 0.32;
const PANEL_PAD = "px-[clamp(0.75rem,2.222vw,2.5rem)] py-8";
const PANEL_SURFACE =
  "absolute inset-0 flex flex-col overflow-y-auto bg-neutral-0 " + PANEL_PAD;

const productGroups: MegaMenuGroup[] = productsMegaMenu.flatMap(
  (column) => column.groups,
);

function peek(stack: Frame[]): Frame {
  return stack[stack.length - 1] ?? { kind: "root" };
}

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const reduce = useMotionReduced();
  const [stack, setStack] = useState<Frame[]>([{ kind: "root" }]);

  // While closed, treat as root so reopen never flashes a nested panel.
  const activeStack = open ? stack : ([{ kind: "root" }] as Frame[]);
  const top = peek(activeStack);
  const depth = activeStack.length - 1;

  const activeGroup = useMemo(() => {
    if (top.kind !== "group") return null;
    return productGroups.find((group) => group.href === top.href) ?? null;
  }, [top]);

  const productsItem = mainNavItems.find((item) => item.hasMenu);

  const handleClose = useCallback(() => {
    setStack([{ kind: "root" }]);
    onClose();
  }, [onClose]);

  const goBack = useCallback(() => {
    setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const openProducts = useCallback(() => {
    setStack([{ kind: "root" }, { kind: "products" }]);
  }, []);

  const openGroup = useCallback((href: string) => {
    setStack([{ kind: "root" }, { kind: "products" }, { kind: "group", href }]);
  }, []);

  const headerTitle =
    top.kind === "group"
      ? (activeGroup?.title ?? "Produkty")
      : top.kind === "products"
        ? (productsItem?.label ?? "Produkty")
        : "Menu";

  const headerIconClass =
    top.kind === "group"
      ? activeGroup?.iconClass
      : top.kind === "products"
        ? productsItem?.iconClass
        : undefined;

  const backLabel =
    top.kind === "group"
      ? "Wróć do produktów"
      : top.kind === "products"
        ? "Wróć do menu"
        : undefined;

  const panelTransition = {
    duration: reduce ? 0 : PANEL_DURATION_S,
    ease: EASE_LUXURY,
  };

  const nestedShift = (isBehind: boolean) =>
    reduce
      ? { x: 0, opacity: isBehind ? 0 : 1 }
      : {
          x: isBehind ? "-28%" : 0,
          opacity: isBehind ? 0.55 : 1,
        };

  return (
    <DrawerShell
      open={open}
      onClose={handleClose}
      label="Menu nawigacji"
      closeLabel="Zamknij menu"
      className="xl:hidden"
    >
      <DrawerHeader
        title={headerTitle}
        titleIconClass={headerIconClass}
        closeLabel="Zamknij menu"
        onClose={handleClose}
        compact
        onBack={depth > 0 ? goBack : undefined}
        backLabel={backLabel}
      />

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <motion.div
          className={`absolute inset-0 flex flex-col overflow-y-auto ${PANEL_PAD}`}
          aria-hidden={top.kind !== "root"}
          animate={nestedShift(depth > 0)}
          transition={panelTransition}
          style={{ pointerEvents: top.kind === "root" ? "auto" : "none" }}
        >
          <nav aria-label="Menu mobilne">
            <ul className="flex list-none flex-col gap-1">
              {mainNavItems.map((item) => {
                const icon = item.iconClass ? (
                  <i
                    className={cn(
                      item.iconClass,
                      "text-xl leading-none text-gold-500",
                    )}
                    aria-hidden="true"
                  />
                ) : null;

                if (item.hasMenu) {
                  return (
                    <li key={item.href}>
                      <button
                        type="button"
                        className="flex w-full items-center gap-3 py-3 text-start font-body text-lg text-neutral-900 transition-colors hover:text-gold-500"
                        onClick={openProducts}
                      >
                        {icon}
                        <span className="min-w-0 flex-1">{item.label}</span>
                        <i
                          className="ph ph-caret-right text-sm text-neutral-500"
                          aria-hidden="true"
                        />
                      </button>
                    </li>
                  );
                }

                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="flex items-center gap-3 py-3 font-body text-lg text-neutral-900 no-underline transition-colors hover:text-gold-500"
                      onClick={handleClose}
                    >
                      {icon}
                      <span className="min-w-0 flex-1">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-8 border-t border-neutral-200 pt-6">
            <nav aria-label="Strefy i skróty">
              <ul className="m-0 flex list-none flex-col gap-1 p-0">
                {utilityNavItems
                  .filter((item) => "accent" in item && item.accent)
                  .map((item) => (
                    <li key={item.href + item.label}>
                      <a
                        href={item.href}
                        className="flex items-center gap-3 py-3 font-body text-lg text-neutral-900 no-underline transition-colors hover:text-gold-500"
                        onClick={handleClose}
                      >
                        {"iconClass" in item && item.iconClass ? (
                          <i
                            className={cn(
                              item.iconClass,
                              "text-xl leading-none text-gold-500",
                            )}
                            aria-hidden="true"
                          />
                        ) : null}
                        <span className="min-w-0 flex-1">{item.label}</span>
                      </a>
                    </li>
                  ))}
              </ul>
              <ul className="m-0 mt-6 flex list-none flex-col gap-1 border-t border-neutral-200 p-0 pt-6">
                {utilityNavItems
                  .filter((item) => !("accent" in item && item.accent))
                  .map((item) => (
                    <li key={item.href + item.label}>
                      <a
                        href={item.href}
                        className="flex items-center gap-3 py-3 font-body text-lg text-neutral-900 no-underline transition-colors hover:text-gold-500"
                        onClick={handleClose}
                      >
                        <span className="min-w-0 flex-1">{item.label}</span>
                      </a>
                    </li>
                  ))}
              </ul>
            </nav>
          </div>
        </motion.div>

        <AnimatePresence>
          {depth >= 1 ? (
            <motion.nav
              key="products-panel"
              aria-label={productsItem?.label ?? "Produkty"}
              aria-hidden={top.kind !== "products"}
              className={PANEL_SURFACE}
              initial={reduce ? false : { x: "100%" }}
              animate={nestedShift(top.kind === "group")}
              exit={reduce ? undefined : { x: "100%" }}
              transition={panelTransition}
              style={{
                pointerEvents: top.kind === "products" ? "auto" : "none",
              }}
            >
              <ul className="flex list-none flex-col gap-1">
                {productGroups.map((group) => (
                  <li key={group.href}>
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 py-3 text-start font-body text-lg text-neutral-900 transition-colors hover:text-gold-500"
                      onClick={() => openGroup(group.href)}
                    >
                      {group.iconClass ? (
                        <i
                          className={cn(
                            group.iconClass,
                            "text-xl leading-none text-gold-500",
                          )}
                          aria-hidden="true"
                        />
                      ) : null}
                      <span className="min-w-0 flex-1">{group.title}</span>
                      <i
                        className="ph ph-caret-right text-sm text-neutral-500"
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </motion.nav>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {top.kind === "group" && activeGroup ? (
            <motion.nav
              key={`group-${activeGroup.href}`}
              aria-label={activeGroup.title}
              className={PANEL_SURFACE}
              initial={reduce ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={reduce ? undefined : { x: "100%" }}
              transition={panelTransition}
            >
              <a
                href={activeGroup.href}
                className="mb-6 inline-flex w-full items-center justify-center gap-2 border border-neutral-800 px-4 py-2.5 font-body text-ui font-medium text-neutral-800 no-underline transition-colors duration-fast ease-out hover:bg-neutral-800 hover:text-neutral-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800"
                onClick={handleClose}
              >
                Przejdź do kategorii
                <i
                  className="ph ph-arrow-right text-sm leading-none"
                  aria-hidden="true"
                />
              </a>
              <ul className="flex list-none flex-col border-t border-neutral-200">
                {activeGroup.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="flex w-full items-center py-3 font-body text-lg text-neutral-900 no-underline transition-colors hover:text-gold-500"
                      onClick={handleClose}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </DrawerShell>
  );
}
