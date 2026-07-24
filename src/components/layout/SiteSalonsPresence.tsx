import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { AnimatedNumber } from "../motion/AnimatedNumber";
import { PolandSalonsMap } from "./PolandSalonsMap";
import { cn } from "../../lib/cn";
import {
  footerSocialLinks,
  presenceSalonCities,
  presenceSalonsCopy,
  presenceStats,
} from "../../data/nav";
import { groupSalonCitiesByVoivodeship } from "../../data/polandVoivodeships";
import { requestSalonDrawer } from "../../hooks/useSelectedSalon";

/**
 * Dark pre-footer: stats strip, then salon finder with socials above the map.
 */
export function SiteSalonsPresence() {
  const voivGroups = useMemo(
    () => groupSalonCitiesByVoivodeship(presenceSalonCities),
    [],
  );

  return (
    <section
      id="salony"
      aria-labelledby="presence-salons-title"
      className="relative overflow-hidden bg-neutral-900 text-neutral-0"
    >
      <Container
        size="content"
        className="relative z-10 pt-[var(--spacing-section-sm)] pb-8 md:pt-[var(--spacing-section)] md:pb-10"
      >
        <ul
          className={cn(
            "m-0 grid list-none grid-cols-2 gap-x-6 gap-y-8 p-0",
            "md:grid-cols-4 md:gap-x-8 lg:gap-x-10",
          )}
        >
          {presenceStats.map((stat, index) => (
            <li
              key={stat.label}
              className={cn(
                "min-w-0",
                index > 0 && "md:border-l md:border-neutral-700 md:pl-6 lg:pl-8",
              )}
            >
              <p className="m-0 font-heading text-[clamp(2rem,3.5vw,2.75rem)] leading-none font-medium tracking-tight text-neutral-0">
                <AnimatedNumber value={stat.value} format={stat.format} />
              </p>
              <p className="mt-2.5 mb-0 max-w-[11rem] font-body text-sm leading-relaxed text-neutral-400">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </Container>

      <div className="relative z-10 border-t border-neutral-800" aria-hidden="true" />

      <Container
        size="content"
        className="relative z-10 pt-8 pb-[var(--spacing-section-sm)] md:pt-10 md:pb-[var(--spacing-section)]"
      >
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] xl:gap-16">
          <div className="min-w-0">
            <h2
              id="presence-salons-title"
              className="m-0 font-heading text-[clamp(1.75rem,3vw,2.25rem)] leading-heading font-medium text-neutral-0"
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
              {voivGroups.map((group) => (
                <li key={group.id} className="min-w-0">
                  <p className="m-0 mb-1.5 font-body text-[11px] font-medium tracking-wide uppercase text-neutral-500">
                    {group.name}
                  </p>
                  <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
                    {group.cities.map((city) => (
                      <li key={city.href}>
                        <Link
                          to={city.href}
                          className={cn(
                            "block py-0.5 font-body text-sm text-neutral-300 no-underline",
                            "transition-colors duration-base ease-out hover:text-gold-400",
                            "focus-visible:outline-2 focus-visible:outline-offset-[var(--spacing-focus-ring-offset)] focus-visible:outline-neutral-0",
                          )}
                        >
                          {city.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button
                as="button"
                type="button"
                variant="gold"
                className="w-fit rounded-xs"
                onClick={requestSalonDrawer}
              >
                {presenceSalonsCopy.allSalonsLabel}
                <span aria-hidden="true"> →</span>
              </Button>
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-4">
            <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1">
              <p className="m-0 font-body text-sm text-neutral-400">
                {presenceSalonsCopy.socialLabel}
              </p>
              <ul
                className="m-0 flex list-none items-center gap-0.5 p-0"
                aria-label={presenceSalonsCopy.socialLabel}
              >
                {footerSocialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={cn(
                        "inline-flex size-10 items-center justify-center text-neutral-400",
                        "transition-colors duration-fast ease-out hover:text-gold-400",
                        "focus-visible:outline-2 focus-visible:outline-offset-[var(--spacing-focus-ring-offset)] focus-visible:outline-neutral-0",
                      )}
                      aria-label={link.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i
                        className={cn(link.iconClass, "text-xl leading-none")}
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <PolandSalonsMap />
          </div>
        </div>
      </Container>
    </section>
  );
}
