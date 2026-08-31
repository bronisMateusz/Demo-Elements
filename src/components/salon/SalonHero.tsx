import { requestSalonDrawer } from "../../hooks/useSelectedSalon";
import { salonOptions } from "../../data/nav";
import { salonPage } from "../../data/salon";
import { salonDirectionsHref } from "../../data/salons";
import {
  pageIntroHeroTopPaddingClassName,
  pageIntroTitleClassName,
} from "../../lib/layoutTokens";
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
        <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
          {/*
            Mobile: `contents` so title / image / contact stay order 1–3.
            Desktop: one left column so contact sits under the title (not
            below the image row height).
          */}
          <div
            className={cn(
              "contents",
              "lg:flex lg:flex-col lg:gap-8",
              pageIntroHeroTopPaddingClassName,
            )}
          >
            <h1
              id="salon-hero-title"
              className={cn(
                pageIntroTitleClassName,
                "order-1 min-w-0",
                pageIntroHeroTopPaddingClassName,
                "lg:pt-0",
              )}
            >
              {hero.titleLead} {hero.titleStrong}
            </h1>

            <SalonContactPanel
              className="order-3 min-w-0"
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

          <div className="relative order-2 min-w-0 w-full overflow-hidden rounded-xs bg-neutral-100 aspect-4/3">
            <img
              src={hero.image.src}
              alt={hero.image.alt}
              className="absolute inset-0 size-full max-w-none object-cover"
              style={{ objectPosition: productImageObjectPosition(hero.image) }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
