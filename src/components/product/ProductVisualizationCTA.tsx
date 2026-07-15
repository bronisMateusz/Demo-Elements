import { Container } from "../ui/Container";
import { Button } from "../ui/Button";

type ProductVisualizationCTAProps = {
  title: string;
  href: string;
  label: string;
};

export function ProductVisualizationCTA({ title, href, label }: ProductVisualizationCTAProps) {
  return (
    <section aria-labelledby="viz-cta-title">
      <Container>
        <div className="border-t border-border py-12 text-center md:py-16">
          <h2 className="t-h3 mx-auto mb-8 max-w-2xl" id="viz-cta-title">
            {title}
          </h2>
          <Button href={href} variant="gold">
            {label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
