import { cn } from "../lib/cn";
import {
  buttonClassName,
  type ButtonSize,
  type ButtonVariant,
} from "../components/ui/buttonClassName";
import { btnAnimatedPreviewClassName } from "../components/ui/btnAnimatedClassName";
import {
  iconButtonClassName,
  type IconButtonVariant,
} from "../components/ui/iconButtonClassName";

export const libPageClassName = "pb-12 bg-neutral-50";

export const libMainClassName =
  "w-full min-w-0 pb-8 scroll-mt-[calc(var(--lib-header-h,160px)+var(--spacing-4))]";

export const libCategoryIntroClassName = "mb-12 border-b border-neutral-200 bg-neutral-0 py-8";

export const libCategoryIntroTitleClassName = "mb-4";

export const libCategoryIntroLedeClassName =
  "m-0 max-w-[68ch] text-lg leading-body text-neutral-600";

export const libHeaderClassName =
  "sticky top-0 z-[200] bg-neutral-0 border-b border-neutral-200 transition-[border-color,background-color] duration-base ease-luxury [--lib-header-h:160px]";

export const libCatNavClassName = "border-b border-neutral-200 bg-neutral-0";

export const libCatNavInnerClassName = cn(
  "container flex min-h-[52px] items-center gap-4 py-2",
  "max-lg:flex-col max-lg:items-stretch max-lg:gap-2 max-lg:py-3",
);

export const libCatNavLabelClassName =
  "m-0 shrink-0 font-body text-xs font-medium tracking-wide uppercase text-neutral-500";

export const libCatNavListClassName =
  "m-0 flex list-none flex-nowrap gap-2 overflow-x-auto p-0 [scrollbar-width:thin]";

export function libCatNavLinkClassName({ active = false }: { active?: boolean } = {}) {
  return cn(
    "inline-flex min-h-11 items-center whitespace-nowrap rounded-xs border border-neutral-200 bg-neutral-0 px-4 text-ui font-medium text-neutral-600 no-underline transition-[color,border-color,background-color] duration-fast ease-out",
    "hover:border-neutral-800 hover:text-neutral-900",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[var(--spacing-focus-ring-offset)] focus-visible:outline-neutral-800",
    active && "border-neutral-900 bg-neutral-50 text-neutral-900",
  );
}

export const libModuleClassName = cn(
  "mb-12 last:mb-0 overflow-hidden rounded-xs border border-neutral-200 bg-neutral-0 shadow-subtle",
  "mx-auto w-full",
);

export const libModuleHeaderClassName = "container border-b border-neutral-200 py-8 md:py-10";

export const libModuleEyebrowClassName = "mb-3";

export const libModuleTitleClassName = "m-0 mb-4";

export const libModuleDescClassName = "m-0 max-w-[72ch]";

export const libModuleVariantsClassName =
  "grid min-w-0 gap-8 overflow-x-clip bg-neutral-50 p-gutter md:p-8";

export const libVariantClassName =
  "min-w-0 max-w-full overflow-hidden rounded-xs border border-neutral-200 bg-neutral-0 shadow-subtle";

export const libVariantHeaderClassName =
  "border-b border-neutral-200 border-l-2 border-l-gold-500 px-gutter py-4";

export const libVariantLabelClassName =
  "m-0 mb-1.5 font-heading text-ui text-neutral-900";

export const libVariantDescClassName = "m-0 text-sm leading-normal text-neutral-600";

export function libVariantPreviewClassName({ hasDevPanel = false }: { hasDevPanel?: boolean } = {}) {
  return cn("w-full bg-neutral-0 border-b border-neutral-200", !hasDevPanel && "border-b-0");
}

export const libDevPanelClassName =
  "border-t border-dashed border-neutral-200 px-gutter py-4 text-sm leading-normal bg-neutral-100";

export const libDevPanelBlockClassName =
  "not-first:mt-4 not-first:border-t not-first:border-neutral-200 not-first:pt-4";

export const libDevPanelHeadingClassName =
  "m-0 mb-2 text-xs uppercase tracking-wide text-neutral-500";

export const libDevPanelCodeClassName =
  "m-0 overflow-x-auto rounded-xs bg-neutral-800 p-3 text-xs text-neutral-100";

export const libPreviewFullBleedWrapperClassName = "w-full min-w-0 max-w-full overflow-x-clip";

export const libPreviewArticleClassName = "p-gutter md:p-8";

export const libPreviewChromeClassName =
  "grid min-h-12 place-items-center border-b border-dashed border-neutral-200 bg-neutral-0 px-8 py-3 text-sm text-neutral-600";

/* ── Button system demos ───────────────────────────────────── */

export const libBtnRowClassName = "flex flex-wrap items-center gap-4";

export const libBtnStatesGridClassName = cn(
  "grid gap-5 max-md:w-full",
  "[&_.lib-btn-state>button:not(.icon-btn)]:max-md:w-full sm:[&_.lib-btn-state>button:not(.icon-btn)]:w-fit sm:[&_.lib-btn-state>button]:justify-self-start",
);

export const libBtnStateClassName = "lib-btn-state grid gap-2";

export const libBtnStateLabelClassName =
  "lib-btn-state-label text-xs font-medium tracking-wide uppercase text-neutral-500";

export const libBtnDarkSurfaceClassName =
  "rounded-xs bg-neutral-800 p-gutter md:p-8";

export type LibButtonPreviewState = "default" | "hover" | "focus" | "active" | "disabled";

const focusRingClassName =
  "outline outline-2 outline-offset-[var(--spacing-focus-ring-offset)] outline-neutral-800";

const focusRingOnContrastClassName =
  "outline outline-2 outline-offset-[var(--spacing-focus-ring-offset)] outline-neutral-0";

const disabledClassName = "pointer-events-none cursor-not-allowed opacity-50";

const libButtonStateOverrides: Partial<
  Record<
    ButtonVariant,
    Partial<Record<Exclude<LibButtonPreviewState, "default" | "focus" | "disabled">, string>>
  >
> = {
  primary: {
    hover: btnAnimatedPreviewClassName(true),
    active: cn(btnAnimatedPreviewClassName(true), "translate-y-px"),
  },
  secondary: {
    hover: cn(btnAnimatedPreviewClassName(true), "border-gold-500 text-neutral-0"),
    active: cn(btnAnimatedPreviewClassName(true), "translate-y-px border-gold-500 text-neutral-0"),
  },
  gold: {
    hover: cn(btnAnimatedPreviewClassName(true), "text-neutral-0"),
    active: cn(btnAnimatedPreviewClassName(true), "translate-y-px text-neutral-0"),
  },
  ghost: {
    hover: "bg-neutral-100 text-neutral-900",
    active: "translate-y-px bg-neutral-200 text-neutral-900",
  },
  tertiary: {
    hover: "text-gold-500 underline",
    active: "translate-y-px text-gold-500",
  },
};

function libButtonStateClassName(
  variant: ButtonVariant,
  state: LibButtonPreviewState,
): string | undefined {
  if (state === "disabled") return disabledClassName;
  if (state === "focus") return focusRingClassName;
  if (state === "default") return undefined;
  return libButtonStateOverrides[variant]?.[state];
}

export function libButtonPreviewClassName({
  variant,
  state = "default",
  size = "md",
  full = false,
  className,
}: {
  variant: ButtonVariant;
  state?: LibButtonPreviewState;
  size?: ButtonSize;
  full?: boolean;
  className?: string;
}) {
  return buttonClassName({
    variant,
    size,
    full,
    className: cn(libButtonStateClassName(variant, state), className),
  });
}

const libIconButtonStateOverrides: Partial<
  Record<
    IconButtonVariant,
    Partial<Record<Exclude<LibButtonPreviewState, "default" | "focus" | "disabled">, string>>
  >
> = {
  default: {
    hover: "bg-neutral-100 text-neutral-900",
    active: "translate-y-px bg-neutral-200 text-neutral-900",
  },
  bordered: {
    hover: "border-neutral-800 text-neutral-900",
    active: "translate-y-px border-neutral-800 text-neutral-900",
  },
  elevated: {
    hover: "bg-neutral-100 text-neutral-900",
    active: "translate-y-px bg-neutral-100 text-neutral-900",
  },
  "on-dark": {
    hover: "bg-white/10 text-neutral-0",
    active: "translate-y-px bg-white/10 text-neutral-0",
  },
};

function libIconButtonStateClassName(
  variant: IconButtonVariant,
  state: LibButtonPreviewState,
  onDark = false,
): string | undefined {
  if (state === "disabled") return disabledClassName;
  if (state === "focus") return onDark ? focusRingOnContrastClassName : focusRingClassName;
  if (state === "default") return undefined;
  return libIconButtonStateOverrides[variant]?.[state];
}

export function libIconButtonPreviewClassName({
  variant = "default",
  state = "default",
  active = false,
  onDark = false,
  className,
}: {
  variant?: IconButtonVariant;
  state?: LibButtonPreviewState;
  active?: boolean;
  onDark?: boolean;
  className?: string;
}) {
  return iconButtonClassName({
    variant,
    active: active || state === "active",
    className: cn(libIconButtonStateClassName(variant, state, onDark), className),
  });
}
