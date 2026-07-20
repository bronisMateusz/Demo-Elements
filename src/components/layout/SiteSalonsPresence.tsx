import { useMemo, useState } from "react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { AnimatedNumber } from "../motion/AnimatedNumber";
import { PolandSalonsMap } from "./PolandSalonsMap";
import { cn } from "../../lib/cn";
import {
  presenceSalonCities,
  presenceSalonsCopy,
  presenceStats,
} from "../../data/nav";
import { groupSalonCitiesByVoivodeship } from "../../data/polandVoivodeships";
import { requestSalonDrawer } from "../../hooks/useSelectedSalon";

/**
 * Dark pre-footer: full-bleed stats rail + content-width salon finder.
 */
export function SiteSalonsPresence() {
  const [hoveredVoivId, setHoveredVoivId] = useState<string | null>(null);
  const voivGroups = useMemo(
    () => groupSalonCitiesByVoivodeship(presenceSalonCities),
    [],
  );

  return (
    <section
      id="salony"
      aria-labelledby="presence-salons-title"
      className="bg-neutral-900 text-neutral-0"
    >
      <Container className="pt-[var(--spacing-section-sm)] md:pt-[var(--spacing-section)]">
        <ul
          className={cn(
            "m-0 grid list-none grid-cols-2 gap-8 p-0",
            "md:grid-cols-4 md:gap-6 lg:gap-10",
          )}
        >
          {presenceStats.map((stat, index) => (
            <li
              key={stat.label}
              className={cn(
                "min-w-0",
                index > 0 && "md:border-l md:border-neutral-700 md:pl-6 lg:pl-10",
              )}
            >
              <p className="m-0 font-heading text-[clamp(2.25rem,4vw,3.25rem)] leading-none tracking-tight text-neutral-0">
                <AnimatedNumber value={stat.value} format={stat.format} />
              </p>
              <p className="mt-3 mb-0 max-w-[12rem] font-body text-sm leading-relaxed text-neutral-400">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </Container>

      <div className="mt-12 border-t border-neutral-800 md:mt-16" aria-hidden="true" />

      <Container
        size="content"
        className="pt-12 pb-[var(--spacing-section-sm)] md:pt-16 md:pb-[var(--spacing-section)]"
      >
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] xl:gap-16">
          <div className="min-w-0">
            <h2
              id="presence-salons-title"
              className="m-0 font-heading text-[clamp(1.75rem,3vw,2.25rem)] leading-heading font-normal text-neutral-0"
            >
              {presenceSalonsCopy.title}
            </h2>
            <p className="mt-3 mb-0 max-w-md text-sm leading-relaxed text-neutral-400 md:text-ui">
              {presenceSalonsCopy.description}
            </p>

            <ul
              className={cn(
                "mt-8 mb-0 grid list-none grid-cols-1 gap-x-6 gap-y-6 p-0",
                "sm:grid-cols-2 lg:grid-cols-3",
              )}
            >
              {voivGroups.map((group) => {
                const isActive = hoveredVoivId === group.id;

                return (
                  <li
                    key={group.id}
                    className="min-w-0"
                    onMouseEnter={() => setHoveredVoivId(group.id)}
                    onMouseLeave={() => setHoveredVoivId(null)}
                  >
                    <p
                      className={cn(
                        "m-0 mb-1.5 font-body text-[11px] font-medium tracking-wide uppercase",
                        "transition-colors duration-base ease-out",
                        isActive ? "text-gold-400" : "text-neutral-500",
                      )}
                    >
                      {group.name}
                    </p>
                    <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
                      {group.cities.map((city) => (
                        <li key={city.href}>
                          <a
                            href={city.href}
                            className={cn(
                              "block py-0.5 font-body text-sm no-underline",
                              "transition-colors duration-base ease-out",
                              "focus-visible:outline-2 focus-visible:outline-offset-[var(--spacing-focus-ring-offset)] focus-visible:outline-neutral-0",
                              isActive
                                ? "text-gold-400"
                                : "text-neutral-300 hover:text-gold-400",
                            )}
                            onFocus={() => setHoveredVoivId(group.id)}
                            onBlur={() => setHoveredVoivId(null)}
                            onClick={(event) => {
                              event.preventDefault();
                              requestSalonDrawer();
                            }}
                          >
                            {city.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8">
              <Button
                as="button"
                type="button"
                variant="gold"
                className="rounded-xs"
                onClick={requestSalonDrawer}
              >
                {presenceSalonsCopy.allSalonsLabel}
                <span aria-hidden="true"> →</span>
              </Button>
            </div>
          </div>

          <PolandSalonsMap
            hoveredVoivId={hoveredVoivId}
            onHoveredVoivIdChange={setHoveredVoivId}
          />
        </div>
      </Container>
    </section>
  );
}
