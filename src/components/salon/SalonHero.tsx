import { requestSalonDrawer } from "../../hooks/useSelectedSalon";
import { salonCardCopy } from "../../data/nav";
import { salonPage } from "../../data/salon";
import { cn } from "../../lib/cn";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";

const contactCardClassName = cn(
  "group/contact relative overflow-hidden rounded-xs border border-neutral-800/10 bg-neutral-900",
  "px-6 py-7 sm:px-8 sm:py-8",
);

function ContactCardBackdrop() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 bg-radial-[at_0%_0%] from-gold-500/22 to-transparent to-58%"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 inset-e-0 w-1/3 bg-radial-[at_100%_50%] from-gold-50/7 to-transparent to-70%"
        aria-hidden="true"
      />
    </>
  );
}

export function SalonHero() {
  const { hero } = salonPage;
  const primaryPhone = hero.phoneGroups[0]?.phones[0];

  return (
    <section
      id="o-salonie-top"
      aria-labelledby="salon-hero-title"
      className="pt-6 pb-8 md:pt-8 md:pb-10 lg:pt-10"
    >
      <Container size="content">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-12">
          <h1
            id="salon-hero-title"
            className="order-1 m-0 font-heading text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] font-medium tracking-tight text-neutral-900 lg:col-start-1 lg:row-start-1"
          >
            {hero.titleLead} {hero.titleStrong}
          </h1>

          <div className="relative order-2 min-h-72 overflow-hidden rounded-xs bg-neutral-100 max-lg:aspect-4/3 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:min-h-full">
            <img
              src={hero.image.src}
              alt={hero.image.alt}
              className="absolute inset-0 size-full object-cover"
              style={{ objectPosition: productImageObjectPosition(hero.image) }}
            />
          </div>

          <aside
            className={cn(
              contactCardClassName,
              "order-3 min-w-0 lg:col-start-1 lg:row-start-2",
            )}
            aria-label="Kontakt z salonem"
          >
            <ContactCardBackdrop />
            <div className="relative flex flex-col">
              <div className="border-b border-neutral-0/10 pb-4">
                <p className="m-0 font-body text-xs tracking-[0.08em] text-neutral-400 uppercase">
                  {salonCardCopy.hoursToggle}
                </p>
                <div className="mt-3.5 grid grid-cols-1 gap-4 text-sm leading-relaxed text-neutral-400 sm:grid-cols-2">
                  <div>
                    <p className="m-0 mb-1.5 font-medium text-neutral-0">
                      {salonCardCopy.addressColumnLabel}
                    </p>
                    <p className="m-0">{hero.address}</p>
                  </div>
                  <div>
                    <p className="m-0 mb-1.5 font-medium text-neutral-0">
                      {salonCardCopy.hoursColumnLabel}
                    </p>
                    {hero.hours.map((line) => (
                      <p key={line} className="m-0">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {hero.phoneGroups.map((group) => (
                <div
                  key={group.label}
                  className="border-b border-neutral-0/10 py-4"
                >
                  <p className="m-0 font-body text-xs tracking-[0.08em] text-neutral-400 uppercase">
                    {group.label}
                  </p>
                  <ul className="mt-3 m-0 grid list-none grid-cols-1 gap-x-6 gap-y-2.5 p-0 sm:grid-cols-2">
                    {group.phones.map((phone) => (
                      <li key={phone.href}>
                        <a
                          href={phone.href}
                          className={cn(
                            "inline-flex items-center gap-2 font-body text-sm font-medium text-neutral-0 no-underline tabular-nums",
                            "transition-colors duration-fast ease-out hover:text-gold-400",
                            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-0",
                          )}
                        >
                          <i
                            className="ph ph-phone text-base leading-none"
                            aria-hidden="true"
                          />
                          <span>{phone.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="pt-4">
                <p className="m-0 font-body text-xs tracking-[0.08em] text-neutral-400 uppercase">
                  E-mail
                </p>
                <a
                  href={hero.emailHref}
                  className={cn(
                    "mt-3 inline-flex items-center gap-2 font-body text-sm font-medium text-gold-400 no-underline",
                    "transition-colors duration-fast ease-out hover:text-gold-100",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-0",
                  )}
                >
                  <i
                    className="ph ph-envelope-simple text-base leading-none"
                    aria-hidden="true"
                  />
                  <span>{hero.email}</span>
                </a>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-neutral-0/10 pt-5">
                <Button
                  as="button"
                  type="button"
                  variant="primary"
                  tone="onDark"
                  size="md"
                  onClick={requestSalonDrawer}
                >
                  {hero.bookLabel}
                </Button>
                {primaryPhone ? (
                  <a
                    href={primaryPhone.href}
                    className={cn(
                      "inline-flex items-center gap-2 font-body text-sm font-medium text-neutral-0 no-underline",
                      "transition-colors duration-fast ease-out hover:text-gold-400",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-0",
                    )}
                  >
                    <i
                      className="ph ph-phone text-base leading-none"
                      aria-hidden="true"
                    />
                    <span>{primaryPhone.label}</span>
                  </a>
                ) : null}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
