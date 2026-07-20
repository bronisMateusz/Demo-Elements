import { cn } from "../../../lib/cn";
import { assetUrl } from "../../../app/assets";
import { Container } from "../../ui/Container";
import { Button } from "../../ui/Button";
import {
  footerBrand,
  footerColumns,
  footerLegal,
  footerNewsletterCopy,
  footerSocialLinks,
} from "../../../data/nav";
import { FooterSmartbeesCredit } from "./FooterSmartbeesCredit";
import { FooterSpotlightRoot, FooterWordmark } from "./FooterWordmark";
import { inputClassName } from "../../ui/inputClassName";
import { Checkbox } from "../../motion/Checkbox";
import { useId, useState } from "react";

export function FooterNewsletter() {
  const consentId = useId();
  const [consent, setConsent] = useState(false);

  return (
    <div className="relative pb-0">
      <Container>
        <div className="relative min-h-footer-newsletter overflow-hidden rounded-xs shadow-2 md:min-h-footer-newsletter-md">
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

          <div className="relative flex min-h-full items-end justify-center p-8 md:p-10 lg:p-12">
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
                className="w-full max-w-md shrink-0 rounded-xs bg-neutral-0 p-4 shadow-2"
                onSubmit={(event) => event.preventDefault()}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-0">
                  <label className="sr-only" htmlFor="footer-email">
                    Adres e-mail
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    placeholder="Twój adres e-mail"
                    className={cn(
                      inputClassName,
                      "sm:flex-1 sm:rounded-r-none sm:border-r-0",
                    )}
                  />
                  <Button
                    as="button"
                    type="submit"
                    variant="primary"
                    className="w-full rounded-xs sm:w-auto sm:rounded-l-none"
                  >
                    Zapisz się
                  </Button>
                </div>

                <Checkbox
                  id={consentId}
                  name="consent"
                  required
                  checked={consent}
                  onCheckedChange={setConsent}
                  className="mt-3 text-xs leading-relaxed text-neutral-600"
                >
                  {footerNewsletterCopy.consent}{" "}
                  <a
                    href={footerNewsletterCopy.privacyHref}
                    className="text-neutral-900 underline underline-offset-2 hover:text-gold-500"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {footerNewsletterCopy.privacyLabel}
                  </a>
                  .
                </Checkbox>
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
                  className="mb-3 h-[clamp(32px,4vw,44px)] w-auto"
                  width={108}
                  height={106}
                  draggable={false}
                />
                <p className="mb-0 max-w-[18rem] text-sm leading-relaxed text-neutral-500 italic">
                  {footerBrand.descriptionParts.map((part, index) =>
                    typeof part === "string" ? (
                      <span key={index}>{part}</span>
                    ) : (
                      <strong key={index} className="font-semibold text-neutral-700">
                        {part.bold}
                      </strong>
                    ),
                  )}
                </p>
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
                          className="block w-full text-sm text-neutral-500 no-underline transition-colors hover:text-neutral-900"
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

function FooterSocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("m-0 flex list-none items-center justify-center gap-1 p-0", className)}>
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
  );
}

export function FooterLegal() {
  return (
    <Container
      className={cn(
        "grid grid-cols-1 items-center gap-4 border-t border-neutral-200 py-8",
        "sm:grid-cols-[1fr_auto_1fr]",
      )}
    >
      <p className="m-0 text-center text-sm text-neutral-500 sm:text-left">
        © {new Date().getFullYear()} {footerLegal.copyright}
      </p>
      <FooterSocialLinks />
      <div className="flex justify-center sm:justify-end">
        <FooterSmartbeesCredit />
      </div>
    </Container>
  );
}
