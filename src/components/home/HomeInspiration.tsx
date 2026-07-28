import { homeInspiration } from "../../data/home";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { ProductInspiration } from "../product/ProductInspiration";

export function HomeInspiration() {
  return (
    <div className="pb-[clamp(2rem,5vw,3rem)] md:pb-[clamp(2.5rem,6vw,4rem)]">
      <ProductInspiration
        arrangements={homeInspiration.arrangements}
        eyebrow={homeInspiration.eyebrow}
        title={homeInspiration.title}
      />
      <Container size="content" className="mt-8 flex justify-center md:mt-10">
        <Button href={homeInspiration.seeMoreHref} variant="secondary" className="w-fit">
          {homeInspiration.seeMoreLabel}
          <i className="ph ph-arrow-right" aria-hidden="true" />
        </Button>
      </Container>
    </div>
  );
}
