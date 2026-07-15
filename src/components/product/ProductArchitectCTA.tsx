import { Container } from "../ui/Container";
import { Button } from "../ui/Button";

type ProductArchitectCTAProps = {
  title: string;
  description: string;
  href: string;
  label: string;
};

export function ProductArchitectCTA({ title, description, href, label }: ProductArchitectCTAProps) {
  return (
    <section aria-labelledby="architect-cta-title">
      <Container>
        <div className="flex flex-col gap-6 border border-border bg-bg-muted p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <div className="max-w-xl">
            <h2 className="t-h3 mb-3" id="architect-cta-title">
              {title}
            </h2>
            <p className="t-body">{description}</p>
          </div>
          <Button href={href} variant="secondary">
            {label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
