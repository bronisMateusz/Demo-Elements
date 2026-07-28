import { cn } from "../../lib/cn";
import { assetUrl } from "../../app/assets";
import { Button } from "../ui/Button";
import { footerNewsletterCopy } from "../../data/nav";
import { inputClassName } from "../ui/inputClassName";
import { Checkbox } from "../motion/Checkbox";
import { useScrollExpandInset } from "../../hooks/useScrollExpandInset";
import { motion } from "motion/react";
import { useId, useState } from "react";

/** Standalone newsletter band - extracted from the footer shell. */
export function SiteNewsletter() {
  const consentId = useId();
  const [consent, setConsent] = useState(false);
  const { targetRef, sideInset } = useScrollExpandInset();

  return (
    <section aria-label="Newsletter" className="relative z-10">
      <div ref={targetRef} className="relative pb-0">
        <motion.div
          className="relative min-h-70 overflow-hidden rounded-xs shadow-2 md:min-h-80"
          style={{ marginLeft: sideInset, marginRight: sideInset }}
        >
          <img
            src={assetUrl("products/montebianco/03-room.jpg")}
            alt=""
            className="absolute inset-0 size-full object-cover"
            width={1600}
            height={900}
            draggable={false}
          />
          <div
            className="absolute inset-0 bg-linear-to-r from-neutral-900/75 via-neutral-900/45 to-neutral-900/25"
            aria-hidden="true"
          />

          <div className="relative flex min-h-70 items-center justify-center p-8 md:min-h-80 md:p-10 lg:p-12">
            <div className="flex w-full max-w-5xl flex-col justify-between gap-8 lg:flex-row lg:items-center lg:gap-10">
              <div className="max-w-lg">
                <p className="mb-3 inline-flex items-center gap-2 font-body text-xs font-medium uppercase tracking-[0.12em] text-neutral-0/70">
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
                <h2 className="m-0 font-heading text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] font-normal text-neutral-0">
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
                  <label className="sr-only" htmlFor="site-newsletter-email">
                    Adres e-mail
                  </label>
                  <input
                    id="site-newsletter-email"
                    type="email"
                    required
                    placeholder="Twój adres e-mail"
                    className={cn(inputClassName, "sm:flex-1 sm:rounded-e-none sm:border-e-0")}
                  />
                  <Button
                    as="button"
                    type="submit"
                    variant="primary"
                    className="w-full rounded-xs sm:w-auto sm:rounded-s-none"
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
        </motion.div>
      </div>
    </section>
  );
}
