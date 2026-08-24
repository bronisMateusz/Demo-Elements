import { useState } from "react";
import { homeInspiration } from "../../data/home";
import { cn } from "../../lib/cn";
import { formatSlideIndex } from "../../lib/formatSlideIndex";
import {
  InspirationGallery,
  type InspirationGalleryControls,
} from "../inspiration/InspirationGallery";
import { Section } from "../structural/Section";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { iconButtonClassName } from "../ui/iconButtonClassName";

export function HomeInspiration() {
  const [controls, setControls] = useState<InspirationGalleryControls | null>(
    null,
  );
  const count = homeInspiration.arrangements.length;
  const showNav = count > 1;

  return (
    <Section ariaLabelledby="inspiration-gallery-title">
      <InspirationGallery
        arrangements={homeInspiration.arrangements}
        eyebrow={homeInspiration.eyebrow}
        title={homeInspiration.title}
        navPlacement="none"
        endCap={{
          label: "Kliknij poniżej",
          title: "Pełna galeria aranżacji",
          description:
            "Zobacz wszystkie inspiracje i dobierz produkty do swojej łazienki.",
        }}
        onControlsChange={setControls}
      />
      <Container
        size="content"
        className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:mt-10"
      >
        {showNav ? (
          <div className="flex items-center gap-3">
            <button
              type="button"
              className={iconButtonClassName({
                variant: "elevated",
                className: cn(
                  "shadow-subtle",
                  controls?.atStart && "pointer-events-none opacity-35",
                ),
              })}
              aria-label="Poprzednia aranżacja"
              disabled={Boolean(controls?.atStart)}
              onClick={() => controls?.slidePrev()}
            >
              <i className="ph ph-caret-left" aria-hidden="true" />
            </button>

            <p
              className="m-0 min-w-14 text-center font-body text-sm tabular-nums tracking-[0.12em] text-neutral-600"
              aria-live="polite"
            >
              {formatSlideIndex(
                controls?.activeIndex ?? 0,
                controls?.count ?? count,
              )}
            </p>

            <button
              type="button"
              className={iconButtonClassName({
                variant: "elevated",
                className: cn(
                  "shadow-subtle",
                  controls?.atEnd && "pointer-events-none opacity-35",
                ),
              })}
              aria-label="Następna aranżacja"
              disabled={Boolean(controls?.atEnd)}
              onClick={() => controls?.slideNext()}
            >
              <i className="ph ph-caret-right" aria-hidden="true" />
            </button>
          </div>
        ) : null}

        <Button
          href={homeInspiration.seeMoreHref}
          variant="secondary"
          className="w-fit"
        >
          {homeInspiration.seeMoreLabel}
          <i className="ph ph-arrow-right" aria-hidden="true" />
        </Button>
      </Container>
    </Section>
  );
}
