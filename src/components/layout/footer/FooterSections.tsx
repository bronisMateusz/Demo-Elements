import { cn } from "../../../lib/cn";
import { assetUrl } from "../../../app/assets";
import { Container } from "../../ui/Container";
import { Button } from "../../ui/Button";
import {
  footerBrand,
  footerColumns,
  footerLegal,
  footerSocialLinks,
} from "../../../data/nav";
import { FooterSmartbeesCredit } from "./FooterSmartbeesCredit";
import { FooterSpotlightRoot, FooterWordmark } from "./FooterWordmark";
import { inputClassName } from "../../ui/inputClassName";

export function FooterNewsletter() {
  return (
    <div className="relative pb-0">
      <Container>
        <div className="relative min-h-[280px] overflow-hidden rounded-2xl shadow-2 md:min-h-[320px]">
          <img
            src={assetUrl("products/montebianco/03-room.jpg")}
            alt=""
            className="absolute inset-0 size-full object-cover"
            width={1600}
            height={900}
            draggable={false}
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-neutral-900/75 via-neutral-900/45 to-neutral-900/25"
            aria-hidden="true"
          />

          <div className="relative flex h-full min-h-[280px] items-end justify-center p-8 md:min-h-[320px] md:p-10 lg:p-12">
            <div className="flex w-full max-w-5xl flex-col justify-between gap-8 lg:flex-row lg:items-end lg:gap-10">
              <div className="max-w-lg">
                <p className="mb-3 inline-flex items-center gap-2 font-body text-xs font-medium uppercase tracking-wide text-neutral-0/70">
                  <img
                    src={assetUrl("sygnet.svg")}
                    alt=""
                    className="size-3.5 shrink-0 brightness-0 invert opacity-70"
                    width={14}
                    height={14}
                    draggable={false}
                  />
                  Newsletter
                </p>
                <h2 className="m-0 font-heading text-[clamp(1.75rem,3vw,2.5rem)] leading-heading font-normal text-neutral-0">
                  Inspiracje prosto na Twój adres e-mail
                </h2>
                <p className="mt-3 mb-0 max-w-md text-sm leading-relaxed text-neutral-0/80 md:text-ui">
                  Otrzymuj selekcję aranżacji, nowości kolekcji i zaproszenia na wydarzenia Elements.
                </p>
              </div>

              <form
                className={cn(
                  "w-full max-w-md shrink-0 rounded-xl border border-neutral-0/35",
                  "bg-neutral-0/20 p-2.5 shadow-2 backdrop-blur-md",
                  "sm:flex sm:items-center",
                )}
                onSubmit={(event) => event.preventDefault()}
              >
                <label className="sr-only" htmlFor="footer-email">
                  Adres e-mail
                </label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Twój adres e-mail"
                  className={cn(inputClassName, "mb-2 sm:mb-0 sm:flex-1 sm:rounded-r-none")}
                />
                <Button
                  as="button"
                  type="submit"
                  variant="primary"
                  className="w-full sm:w-auto sm:rounded-l-none"
                >
                  Zapisz się
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}


export function FooterMain() {
  return (
    <FooterSpotlightRoot>
      {(pointer) => (
        <>
          <Container className="relative z-10 pt-16 pb-6 md:pt-20 md:pb-8">
            <div
              className={cn(
                "grid grid-cols-2 gap-x-8 gap-y-10",
                "sm:grid-cols-3",
                "lg:grid-cols-[minmax(12rem,1.4fr)_repeat(4,minmax(0,1fr))] lg:gap-x-10",
              )}
            >
              <div className="col-span-2 sm:col-span-3 lg:col-span-1">
                <img
                  src={assetUrl("logo-elements.svg")}
                  alt={footerBrand.title}
                  className="mb-3 h-[clamp(28px,3.5vw,36px)] w-auto"
                  width={160}
                  height={36}
                  draggable={false}
                />
                <p className="mb-0 max-w-[18rem] text-sm leading-relaxed text-neutral-500">
                  {footerBrand.description}
                </p>
                <ul className="mt-6 flex list-none items-center gap-1 p-0">
                  {footerSocialLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className={cn(
                          "inline-flex size-10 items-center justify-center text-neutral-500",
                          "transition-colors duration-fast ease-out hover:text-gold-500",
                          "focus-visible:outline-2 focus-visible:outline-offset-[var(--spacing-focus-ring-offset)] focus-visible:outline-neutral-800",
                        )}
                        aria-label={link.label}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className={cn(link.iconClass, "text-xl leading-none")} aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {footerColumns.map((column) => (
                <div key={column.title}>
                  <h3 className="mb-4 font-body text-sm font-semibold text-neutral-900">
                    {column.title}
                  </h3>
                  <ul className="m-0 flex list-none flex-col gap-2 p-0">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-sm text-neutral-500 no-underline transition-colors hover:text-neutral-900"
                        >
                          {link.label}
                          {"trailing" in link && link.trailing ? (
                            <span aria-hidden="true"> {link.trailing}</span>
                          ) : null}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>

          <FooterWordmark text={footerBrand.title} pointer={pointer} />
        </>
      )}
    </FooterSpotlightRoot>
  );
}

export function FooterLegal() {
  return (
    <Container className="flex flex-col gap-4 border-t border-neutral-200 py-8 sm:flex-row sm:items-center sm:justify-between">
      <p className="m-0 text-sm text-neutral-500">
        © {new Date().getFullYear()} {footerLegal.copyright}
      </p>
      <FooterSmartbeesCredit />
    </Container>
  );
}
