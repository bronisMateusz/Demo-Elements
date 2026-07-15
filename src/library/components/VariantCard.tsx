import { useId, type ReactNode } from "react";
import type { DrupalDoc, ModuleState, PropDoc } from "../types";
import {
  libVariantClassName,
  libVariantDescClassName,
  libVariantHeaderClassName,
  libVariantLabelClassName,
  libVariantPreviewClassName,
} from "../libStyles";
import { DevPanel } from "./DevPanel";

type VariantCardProps = {
  label: string;
  description: string;
  children: ReactNode;
  devMode: boolean;
  optionalProps?: PropDoc[];
  states?: ModuleState[];
  drupal?: DrupalDoc;
  variantProps?: Record<string, unknown>;
};

export function VariantCard({
  label,
  description,
  children,
  devMode,
  optionalProps,
  states,
  drupal,
  variantProps,
}: VariantCardProps) {
  const headingId = useId();

  return (
    <article className={libVariantClassName} data-lib-variant aria-labelledby={headingId}>
      <header className={libVariantHeaderClassName}>
        <h3 className={libVariantLabelClassName} id={headingId}>
          {label}
        </h3>
        <p className={libVariantDescClassName}>{description}</p>
      </header>
      <div className={libVariantPreviewClassName({ hasDevPanel: devMode })}>{children}</div>
      {devMode ? (
        <DevPanel
          optionalProps={optionalProps}
          states={states}
          drupal={drupal}
          variantProps={variantProps}
        />
      ) : null}
    </article>
  );
}
