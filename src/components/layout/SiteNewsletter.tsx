import { cn } from "../../lib/cn";
import { sectionMarginYClassName } from "../../lib/layoutTokens";
import { assetUrl } from "../../app/assets";
import { Button } from "../ui/Button";
import { footerNewsletterCopy } from "../../data/nav";
import { inputClassName } from "../ui/inputClassName";
import { Checkbox } from "../motion/Checkbox";
import { useScrollExpandInset } from "../../hooks/useScrollExpandInset";
import { motion } from "motion/react";
import { useId, useState } from "react";

type SiteNewsletterProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Asset path under `assets/` or full URL from `assetUrl()`. */
  imageSrc?: string;
  imageAlt?: string;
  /** When true, vertical rhythm comes from PageSectionStack (no outer my). */
  embedded?: boolean;
  className?: string;
};

const DEFAULT_TITLE = "Inspiracje prosto na Twój adres e-mail";
const DEFAULT_DESCRIPTION =
  "Otrzymuj selekcję aranżacji, nowości kolekcji i zaproszenia na wydarzenia Elements.";
const DEFAULT_IMAGE = assetUrl("home/about-salon.png");
const DEFAULT_IMAGE_ALT = "Salon Elements - ekspozycja łazienki";

/**
 * Newsletter band above the footer. Default: symmetric section margin (my).
 * Pass `embedded` when rendered inside PageSectionStack (e.g. architect zone).
 */
export function SiteNewsletter({
  eyebrow = "Newsletter",
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  imageSrc = DEFAULT_IMAGE,
  imageAlt = DEFAULT_IMAGE_ALT,
  embedded = false,
  className,
}: SiteNewsletterProps = {}) {
  const consentId = useId();
  const emailId = useId();
  const [consent, setConsent] = useState(false);
  const { targetRef, sideInset } = useScrollExpandInset();

  return (
    <section
      aria-label="Newsletter"
      className={cn(
        "relative z-10",
        !embedded && sectionMarginYClassName,
        className,
      )}
    >
      <div ref={targetRef} className="relative pb-0">
        <motion.div
          className="relative min-h-70 overflow-hidden rounded-xs shadow-2 md:min-h-80"
          style={{ marginLeft: sideInset, marginRight: sideInset }}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="absolute inset-0 size-full object-cover"
            width={1600}
            height={900}
            draggable={false}
          />
          <div
            className="absolute inset-0 bg-linear-to-r from-neutral-900/75 via-neutral-900/45 to-neutral-900/25"
            aria-hidden="true"
          />

          <div className="relative flex min-h-70 items-center justify-center p-4 md:min-h-80 md:p-10 lg:p-12">
            <div className="flex w-full flex-col justify-between gap-6 md:gap-8 lg:max-w-5xl lg:flex-row lg:items-center lg:gap-10">
              <div className="min-w-0 lg:max-w-lg">
                <p className="mb-3 inline-flex items-center gap-2 font-body text-xs font-medium tracking-[0.12em] text-neutral-0/70 uppercase">
                  <img
                    src={assetUrl("sygnet.svg")}
                    alt=""
                    className="size-3.5 shrink-0 opacity-70 brightness-0 invert"
                    width={14}
                    height={14}
                    draggable={false}
                  />
                  {eyebrow}
                </p>
                <h2 className="m-0 font-heading text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] font-normal text-neutral-0">
                  {title}
                </h2>
                <p className="mt-3 mb-0 text-sm leading-relaxed text-neutral-0/80 md:text-ui lg:max-w-md">
                  {description}
                </p>
              </div>

              <form
                className="w-full shrink-0 rounded-xs bg-neutral-0 p-4 shadow-2 lg:max-w-md"
                onSubmit={(event) => event.preventDefault()}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-0">
                  <label className="sr-only" htmlFor={emailId}>
                    Adres e-mail
                  </label>
                  <input
                    id={emailId}
                    type="email"
                    required
                    placeholder="Twój adres e-mail"
                    className={cn(
                      inputClassName,
                      "sm:flex-1 sm:rounded-e-none sm:border-e-0",
                    )}
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
