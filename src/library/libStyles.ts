import { cn } from "../lib/cn";

export const libPageClassName = "pb-12 bg-bg-muted";

export const libMainClassName =
  "w-full min-w-0 pb-8 scroll-mt-[calc(var(--lib-header-h,160px)+var(--spacing-4))]";

export const libCategoryIntroClassName = "mb-12 border-b border-border bg-bg py-8";

export const libCategoryIntroTitleClassName = "mb-4";

export const libCategoryIntroLedeClassName =
  "m-0 max-w-[68ch] text-body-lg leading-body text-text-body";

export const libHeaderClassName =
  "site-header sticky top-0 z-[200] bg-bg border-b border-border [--lib-header-h:160px]";

export const libCatNavClassName = "border-b border-border bg-bg";

export const libCatNavInnerClassName = cn(
  "container flex min-h-[52px] items-center gap-4 py-2",
  "max-lg:flex-col max-lg:items-stretch max-lg:gap-2 max-lg:py-3",
);

export const libCatNavLabelClassName =
  "m-0 shrink-0 font-body text-eyebrow font-medium tracking-wide uppercase text-text-muted";

export const libCatNavListClassName =
  "m-0 flex list-none flex-nowrap gap-2 overflow-x-auto p-0 [scrollbar-width:thin]";

export function libCatNavLinkClassName({ active = false }: { active?: boolean } = {}) {
  return cn(
    "inline-flex min-h-11 items-center whitespace-nowrap rounded-sm border border-border bg-bg px-4 text-ui font-medium text-text-body no-underline transition-[color,border-color,background-color] duration-fast ease-out",
    "hover:border-text-strong hover:text-text",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[var(--spacing-focus-ring-offset)] focus-visible:outline-focus-ring",
    active && "border-text bg-bg-muted text-text",
  );
}

export const libModuleClassName = cn(
  "mb-12 last:mb-0 overflow-hidden rounded-sm border border-border bg-bg shadow-subtle",
  "mx-auto w-full",
);

export const libModuleHeaderClassName = "container border-b border-border py-8 md:py-10";

export const libModuleEyebrowClassName = "mb-3";

export const libModuleTitleClassName = "m-0 mb-4";

export const libModuleDescClassName = "m-0 max-w-[72ch]";

export const libModuleVariantsClassName =
  "grid min-w-0 gap-8 overflow-x-clip bg-bg-muted p-[var(--gutter)] md:p-8";

export const libVariantClassName =
  "min-w-0 max-w-full overflow-hidden rounded-sm border border-border bg-bg shadow-subtle";

export const libVariantHeaderClassName =
  "border-b border-border border-l-2 border-l-gold px-[var(--gutter)] py-4";

export const libVariantLabelClassName =
  "m-0 mb-1.5 font-heading text-ui text-text";

export const libVariantDescClassName = "m-0 text-small leading-normal text-text-body";

export function libVariantPreviewClassName({ hasDevPanel = false }: { hasDevPanel?: boolean } = {}) {
  return cn("w-full bg-bg border-b border-border", !hasDevPanel && "border-b-0");
}

export const libDevPanelClassName =
  "border-t border-dashed border-border px-[var(--gutter)] py-4 text-small leading-normal bg-bg-warm";

export const libDevPanelBlockClassName =
  "not-first:mt-4 not-first:border-t not-first:border-border not-first:pt-4";

export const libDevPanelHeadingClassName =
  "m-0 mb-2 text-eyebrow uppercase tracking-wide text-text-muted";

export const libDevPanelCodeClassName =
  "m-0 overflow-x-auto rounded-sm bg-neutral-800 p-3 text-xs text-neutral-100";

export const libPreviewFullBleedWrapperClassName = "w-full min-w-0 max-w-full overflow-x-clip";

export const libPreviewChromeClassName =
  "grid min-h-12 place-items-center border-b border-dashed border-border bg-bg px-8 py-3 text-small text-text-body";
