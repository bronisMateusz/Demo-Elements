import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/cn";
import { SharedLayoutBg } from "../motion/SharedLayoutBg";
import { inputClassName } from "./inputClassName";

export type ListSelectOption = {
  value: string;
  label: string;
};

type ListSelectProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly ListSelectOption[];
  placeholder?: string;
  className?: string;
  leadingIconClass?: string;
  "aria-label"?: string;
};

type PanelPosition = {
  top: number;
  left: number;
  width: number;
};

const PANEL_OFFSET_PX = 4;

export function ListSelect({
  id,
  value,
  onChange,
  options,
  placeholder,
  className,
  leadingIconClass,
  "aria-label": ariaLabel,
}: ListSelectProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [panelPosition, setPanelPosition] = useState<PanelPosition | null>(
    null,
  );

  const selected = options.find((option) => option.value === value);
  const triggerLabel = selected?.label ?? placeholder ?? "";

  const updatePanelPosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    setPanelPosition({
      top: rect.bottom + PANEL_OFFSET_PX,
      left: rect.left,
      width: rect.width,
    });
  }, []);

  useLayoutEffect(() => {
    if (!open) return;

    updatePanelPosition();

    window.addEventListener("resize", updatePanelPosition);
    window.addEventListener("scroll", updatePanelPosition, true);

    return () => {
      window.removeEventListener("resize", updatePanelPosition);
      window.removeEventListener("scroll", updatePanelPosition, true);
    };
  }, [open, updatePanelPosition]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        rootRef.current?.contains(target) ||
        panelRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const selectOption = (nextValue: string) => {
    onChange(nextValue);
    setOpen(false);
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (
      event.key === "ArrowDown" ||
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      setOpen(true);
    }
    if (event.key === "Escape") {
      setOpen(false);
    }
  };

  const panel =
    open && panelPosition && typeof document !== "undefined"
      ? createPortal(
          <div
            ref={panelRef}
            style={{
              top: panelPosition.top,
              left: panelPosition.left,
              width: panelPosition.width,
            }}
            className="fixed z-100 overflow-hidden rounded-xs border border-neutral-900 bg-neutral-0 shadow-subtle"
          >
            <div className="max-h-96 overflow-y-auto overscroll-contain">
              <ul
                id={listId}
                role="listbox"
                aria-label={ariaLabel}
                className="m-0 list-none p-1"
              >
                <SharedLayoutBg
                  className="flex w-full flex-col"
                  pillClassName="rounded-xs bg-neutral-200"
                >
                  {options.map((option) => {
                    const isSelected = option.value === value;

                    return (
                      <li key={option.value} role="none">
                        <button
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          className={cn(
                            "relative z-10 flex w-full cursor-pointer items-center px-3 py-2.5 text-start",
                            "font-body text-ui text-neutral-900",
                            "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-neutral-800",
                            isSelected && "font-medium",
                          )}
                          onClick={() => selectOption(option.value)}
                        >
                          {option.label}
                        </button>
                      </li>
                    );
                  })}
                </SharedLayoutBg>
              </ul>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        className={cn(
          inputClassName,
          "flex cursor-pointer items-center justify-between gap-3 text-start",
          leadingIconClass ? "ps-11 pe-10" : "pe-10",
          !selected && "text-neutral-400",
          open && "border-neutral-900 bg-neutral-0 shadow-none",
        )}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={handleTriggerKeyDown}
      >
        {leadingIconClass ? (
          <i
            className={cn(
              leadingIconClass,
              "pointer-events-none absolute inset-s-4 top-1/2 z-1 -translate-y-1/2 text-lg text-neutral-500",
            )}
            aria-hidden="true"
          />
        ) : null}
        <span className="relative z-1 min-w-0 truncate">{triggerLabel}</span>
        <i
          className={cn(
            "ph ph-caret-down pointer-events-none absolute inset-e-4 top-1/2 -translate-y-1/2 text-base text-neutral-500 transition-transform duration-base ease-luxury",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      {panel}
    </div>
  );
}
