import { cn } from "../../lib/cn";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { Section } from "../structural/Section";

type CtaBandAction =
  | { kind: "button"; label: string; onClick: () => void }
  | { kind: "link"; label: string; href: string };

type CtaBandProps = {
  id?: string;
  title: string;
  titleId?: string;
  description: string;
  primary: CtaBandAction;
  secondary?: CtaBandAction;
  className?: string;
};

function renderAction(action: CtaBandAction, variant: "primary" | "secondary") {
  if (action.kind === "link") {
    return (
      <Button as="link" href={action.href} variant={variant} size="lg">
        {action.label}
      </Button>
    );
  }
  return (
    <Button
      as="button"
      type="button"
      onClick={action.onClick}
      variant={variant}
      size="lg"
    >
      {action.label}
    </Button>
  );
}

export function CtaBand({
  id,
  title,
  titleId = "cta-band-title",
  description,
  primary,
  secondary,
  className,
}: CtaBandProps) {
  return (
    <Section id={id} ariaLabelledby={titleId} tone="warm" className={className}>
      <Container size="content">
        <div
          className={cn(
            "rounded-xs border border-neutral-800/10 bg-neutral-0 px-6 py-8 md:px-10 md:py-10",
          )}
        >
          <h2
            id={titleId}
            className="m-0 max-w-3xl font-heading text-h3 leading-[1.1] font-medium tracking-tight text-neutral-900"
          >
            {title}
          </h2>
          <p className="mt-3 mb-0 max-w-2xl font-body text-sm leading-relaxed text-neutral-600 md:text-ui">
            {description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {renderAction(primary, "primary")}
            {secondary ? renderAction(secondary, "secondary") : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
