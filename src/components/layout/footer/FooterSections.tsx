import { cn } from "../../../lib/cn";
import { assetUrl } from "../../../app/assets";
import { Container } from "../../ui/Container";
import {
  footerBrand,
  footerColumns,
  footerLegal,
  footerSocialLinks,
} from "../../../data/nav";
import { FooterSmartbeesCredit } from "./FooterSmartbeesCredit";
import { FooterSpotlightRoot } from "./FooterWordmark";

export function FooterMain() {
  return (
    <FooterSpotlightRoot>
      {() => (
        <>
          <Container className="relative z-10 pt-16 pb-6 md:pt-20 md:pb-8">
            <div
              className={cn(
                "grid grid-cols-2 gap-x-8 gap-y-10",
                "sm:grid-cols-3",
                "lg:grid-cols-[minmax(12rem,1.4fr)_repeat(3,minmax(0,1fr))] lg:gap-x-10",
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
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>

          {/* Temporarily hidden — giant ELEMENTS wordmark / spotlight
          <FooterWordmark text={footerBrand.title} pointer={pointer} />
          */}
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
