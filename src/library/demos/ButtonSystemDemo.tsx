import type { ReactNode } from "react";
import { ProductAskRow } from "../../components/product/ProductAskRow";
import {
  libBtnDarkSurfaceClassName,
  libBtnRowClassName,
  libBtnStateClassName,
  libBtnStateLabelClassName,
  libBtnStatesGridClassName,
  libButtonPreviewClassName,
  libIconButtonPreviewClassName,
  type LibButtonPreviewState,
} from "../libStyles";
import type { ButtonVariant } from "../../components/ui/buttonClassName";

type ButtonStateRowProps = {
  label: string;
  variant: ButtonVariant;
  state?: LibButtonPreviewState;
  size?: "sm" | "md" | "lg";
  full?: boolean;
  children: ReactNode;
  inactive?: boolean;
};

function ButtonStateRow({
  label,
  variant,
  state = "default",
  size = "md",
  full = false,
  children,
  inactive = false,
}: ButtonStateRowProps) {
  return (
    <div className={libBtnStateClassName}>
      <span className={libBtnStateLabelClassName}>{label}</span>
      <button
        type="button"
        className={libButtonPreviewClassName({ variant, state, size, full })}
        disabled={inactive}
      >
        {children}
      </button>
    </div>
  );
}

function stateLabel(state: LibButtonPreviewState) {
  return state === "default"
    ? "Default"
    : state.charAt(0).toUpperCase() + state.slice(1);
}

function VariantStateDemo({
  variant,
  label,
}: {
  variant: ButtonVariant;
  label: string;
}) {
  const states: LibButtonPreviewState[] = [
    "default",
    "hover",
    "focus",
    "active",
    "disabled",
  ];

  return (
    <div className={libBtnStatesGridClassName}>
      {states.map((state) => (
        <ButtonStateRow
          key={state}
          label={stateLabel(state)}
          variant={variant}
          state={state}
          inactive={state === "disabled"}
        >
          {label}
        </ButtonStateRow>
      ))}
    </div>
  );
}

export function ButtonHierarchyDemo() {
  return (
    <div className={libBtnRowClassName}>
      <button
        type="button"
        className={libButtonPreviewClassName({ variant: "primary" })}
      >
        Umów wizytę w salonie
      </button>
      <button
        type="button"
        className={libButtonPreviewClassName({ variant: "secondary" })}
      >
        Pobierz katalog
      </button>
      <button
        type="button"
        className={libButtonPreviewClassName({ variant: "gold" })}
      >
        Strefa architekta
      </button>
      <button
        type="button"
        className={libButtonPreviewClassName({ variant: "ghost" })}
      >
        Zapisz na listę
      </button>
      <button
        type="button"
        className={libButtonPreviewClassName({ variant: "tertiary" })}
      >
        Zobacz całą kolekcję
      </button>
    </div>
  );
}

export function ButtonSizesDemo() {
  return (
    <div className={libBtnRowClassName}>
      <button
        type="button"
        className={libButtonPreviewClassName({
          variant: "primary",
          size: "lg",
        })}
      >
        Large
      </button>
      <button
        type="button"
        className={libButtonPreviewClassName({ variant: "primary" })}
      >
        Default
      </button>
      <button
        type="button"
        className={libButtonPreviewClassName({
          variant: "primary",
          size: "sm",
        })}
      >
        Small
      </button>
    </div>
  );
}

export function ButtonPrimaryStatesDemo() {
  return <VariantStateDemo variant="primary" label="Umów wizytę w salonie" />;
}

export function ButtonSecondaryStatesDemo() {
  return <VariantStateDemo variant="secondary" label="Pobierz katalog" />;
}

export function ButtonGoldStatesDemo() {
  return <VariantStateDemo variant="gold" label="Strefa architekta" />;
}

export function ButtonGhostStatesDemo() {
  return <VariantStateDemo variant="ghost" label="Zapisz na listę" />;
}

export function ButtonTertiaryStatesDemo() {
  return <VariantStateDemo variant="tertiary" label="Zobacz całą kolekcję" />;
}

export function ButtonFullWidthDemo() {
  return (
    <div className="grid max-w-md gap-4">
      <button
        type="button"
        className={libButtonPreviewClassName({
          variant: "primary",
          full: true,
        })}
      >
        Pełna szerokość - Primary
      </button>
      <button
        type="button"
        className={libButtonPreviewClassName({
          variant: "secondary",
          full: true,
        })}
      >
        Pełna szerokość - Secondary
      </button>
    </div>
  );
}

export function ButtonIconsDemo() {
  const states: LibButtonPreviewState[] = [
    "default",
    "hover",
    "focus",
    "disabled",
  ];

  return (
    <div className={libBtnStatesGridClassName}>
      <div className={libBtnStateClassName}>
        <span className={libBtnStateLabelClassName}>
          Primary + ikona trailing
        </span>
        <button
          type="button"
          className={libButtonPreviewClassName({ variant: "primary" })}
        >
          <span>Umów wizytę</span>
          <i className="ph ph-arrow-right" aria-hidden="true" />
        </button>
      </div>
      <div className={libBtnStateClassName}>
        <span className={libBtnStateLabelClassName}>
          Secondary + ikona leading
        </span>
        <button
          type="button"
          className={libButtonPreviewClassName({ variant: "secondary" })}
        >
          <i className="ph ph-download-simple" aria-hidden="true" />
          <span>Pobierz katalog</span>
        </button>
      </div>
      <div className={libBtnStateClassName}>
        <span className={libBtnStateLabelClassName}>Tertiary + chevron</span>
        <button
          type="button"
          className={libButtonPreviewClassName({ variant: "tertiary" })}
        >
          <span>Zobacz całą serię</span>
          <i className="ph ph-arrow-right" aria-hidden="true" />
        </button>
      </div>

      {states.map((state) => (
        <div key={`icon-default-${state}`} className={libBtnStateClassName}>
          <span className={libBtnStateLabelClassName}>
            IconButton · default · {stateLabel(state)}
          </span>
          <button
            type="button"
            className={libIconButtonPreviewClassName({
              variant: "default",
              state,
            })}
            disabled={state === "disabled"}
            aria-label="Szukaj"
          >
            <i className="ph ph-magnifying-glass" aria-hidden="true" />
          </button>
        </div>
      ))}

      {states.map((state) => (
        <div key={`icon-bordered-${state}`} className={libBtnStateClassName}>
          <span className={libBtnStateLabelClassName}>
            IconButton · bordered · {stateLabel(state)}
          </span>
          <button
            type="button"
            className={libIconButtonPreviewClassName({
              variant: "bordered",
              state,
            })}
            disabled={state === "disabled"}
            aria-label="Poprzednie produkty"
          >
            <i className="ph ph-caret-left" aria-hidden="true" />
          </button>
        </div>
      ))}

      {states.map((state) => (
        <div key={`icon-elevated-${state}`} className={libBtnStateClassName}>
          <span className={libBtnStateLabelClassName}>
            IconButton · elevated · {stateLabel(state)}
          </span>
          <button
            type="button"
            className={libIconButtonPreviewClassName({
              variant: "elevated",
              state,
            })}
            disabled={state === "disabled"}
            aria-label="Ulubione"
          >
            <i className="ph ph-heart" aria-hidden="true" />
          </button>
        </div>
      ))}

      <div className={libBtnStateClassName}>
        <span className={libBtnStateLabelClassName}>IconButton · on-dark</span>
        <div className={libBtnDarkSurfaceClassName}>
          <div className={libBtnRowClassName}>
            {states.map((state) => (
              <button
                key={`icon-dark-${state}`}
                type="button"
                className={libIconButtonPreviewClassName({
                  variant: "on-dark",
                  state,
                  onDark: true,
                })}
                disabled={state === "disabled"}
                aria-label="Ulubione"
              >
                <i className="ph ph-heart" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ButtonLiveHoverDemo() {
  return (
    <div className="grid max-w-xl gap-3">
      <p className="m-0 text-sm text-neutral-600">
        Najedź kursorem - wypełnienie wjeżdża od dołu: czarne na jasnym tle,
        białe przy tone=onDark.
      </p>
      <div className={libBtnRowClassName}>
        <button
          type="button"
          className={libButtonPreviewClassName({ variant: "primary" })}
        >
          Primary
        </button>
        <button
          type="button"
          className={libButtonPreviewClassName({ variant: "secondary" })}
        >
          Secondary
        </button>
        <button
          type="button"
          className={libButtonPreviewClassName({ variant: "gold" })}
        >
          Gold
        </button>
      </div>
    </div>
  );
}

export function ButtonOnDarkDemo() {
  return (
    <div className="grid max-w-xl gap-3">
      <p className="m-0 text-sm text-neutral-600">
        tone=&quot;onDark&quot; - Primary (gold) i Secondary (solid white);
        hover = biały fill (primary) / czarny fill (secondary).
      </p>
      <div className={libBtnDarkSurfaceClassName}>
        <div className={libBtnRowClassName}>
          <button
            type="button"
            className={libButtonPreviewClassName({
              variant: "primary",
              tone: "onDark",
            })}
          >
            Napisz do doradcy
          </button>
          <button
            type="button"
            className={libButtonPreviewClassName({
              variant: "secondary",
              tone: "onDark",
            })}
          >
            Umów spotkanie
          </button>
        </div>
      </div>
    </div>
  );
}

export function ButtonAskRowDemo() {
  return (
    <div className="grid max-w-xl gap-3">
      <p className="m-0 text-sm text-neutral-600">
        Cena + ask w jednym panelu; CTA otwiera AskDrawer przez{" "}
        <code className="text-xs">onAskOpen</code>.
      </p>
      <ProductAskRow
        lead="Interesuje Cię ten produkt?"
        actionLabel="Zadaj pytanie"
        secondaryLabel="Obejrzyj w salonie"
        secondaryHref="/salony"
        onAskOpen={() => undefined}
      />
    </div>
  );
}
