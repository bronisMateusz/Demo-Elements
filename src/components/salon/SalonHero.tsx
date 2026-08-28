import { requestSalonDrawer } from "../../hooks/useSelectedSalon";
import { salonOptions } from "../../data/nav";
import { salonPage } from "../../data/salon";
import { salonDirectionsHref } from "../../data/salons";
import { pageIntroHeroTopPaddingClassName } from "../../lib/layoutTokens";
import { cn } from "../../lib/cn";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { SalonContactPanel } from "./SalonContactPanel";

export function SalonHero() {
  const { hero } = salonPage;
  const bydgoszczSalon = salonOptions.find((salon) => salon.id === "bydgoszcz");
  const directionsHref = bydgoszczSalon
    ? salonDirectionsHref(bydgoszczSalon)
    : undefined;

  return (
    <section id="o-salonie-top" aria-labelledby="salon-hero-title">
      <Container size="content">
        <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-12">
          <h1
            id="salon-hero-title"
            className={cn(
              "order-1 m-0 min-w-0 font-heading text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] font-medium tracking-tight text-neutral-900 lg:col-start-1 lg:row-start-1",
              pageIntroHeroTopPaddingClassName,
            )}
          >
            {hero.titleLead} {hero.titleStrong}
          </h1>

          <div className="relative order-2 min-w-0 w-full overflow-hidden rounded-xs bg-neutral-100 aspect-4/3 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:aspect-auto lg:min-h-full">
            <img
              src={hero.image.src}
              alt={hero.image.alt}
              className="absolute inset-0 size-full max-w-none object-cover"
              style={{ objectPosition: productImageObjectPosition(hero.image) }}
            />
          </div>

          <SalonContactPanel
            className="order-3 min-w-0 lg:col-start-1 lg:row-start-2"
            address={hero.address}
            hours={hero.hours}
            phoneGroups={hero.phoneGroups}
            email={hero.email}
            emailHref={hero.emailHref}
            actions={
              <>
                <Button
                  as="button"
                  type="button"
                  variant="primary"
                  size="md"
                  full
                  className="sm:w-auto"
                  onClick={requestSalonDrawer}
                >
                  {hero.bookLabel}
                </Button>
                {directionsHref ? (
                  <Button
                    href={directionsHref}
                    variant="secondary"
                    size="md"
                    full
                    className="sm:w-auto"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {hero.directionsLabel}
                  </Button>
                ) : null}
              </>
            }
          />
        </div>
      </Container>
    </section>
  );
}
