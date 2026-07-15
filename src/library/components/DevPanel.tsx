import type { DrupalDoc, ModuleState, PropDoc } from "../types";
import {
  libDevPanelBlockClassName,
  libDevPanelClassName,
  libDevPanelCodeClassName,
  libDevPanelHeadingClassName,
} from "../libStyles";

type DevPanelProps = {
  optionalProps?: PropDoc[];
  states?: ModuleState[];
  drupal?: DrupalDoc;
  docsPath?: string;
  variantProps?: Record<string, unknown>;
};

export function DevPanel({
  optionalProps,
  states,
  variantProps,
}: DevPanelProps) {
  const hasContent =
    (optionalProps && optionalProps.length > 0) ||
    (states && states.length > 0) ||
    variantProps;

  if (!hasContent) return null;

  return (
    <aside className={libDevPanelClassName} aria-label="Szczegóły techniczne modułu">
      {variantProps && Object.keys(variantProps).length > 0 ? (
        <div className={libDevPanelBlockClassName}>
          <h4 className={libDevPanelHeadingClassName}>Propsy wariantu</h4>
          <pre className={libDevPanelCodeClassName}>{JSON.stringify(variantProps, null, 2)}</pre>
        </div>
      ) : null}
    </aside>
  );
}
