import { cn } from "../../../lib/cn";
import { assetUrl } from "../../../app/assets";
import { Container } from "../../ui/Container";
import { footerBrand, footerColumns, footerLegal } from "../../../data/nav";
import { FooterSmartbeesCredit } from "./FooterSmartbeesCredit";
import { FooterSpotlightRoot } from "./FooterWordmark";

export function FooterMain() {
  return (
    <FooterSpotlightRoot>
      {() => (
        <>
          <Container className="relative z-10 pt-8 pb-6 md:pt-10 md:pb-8">
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
                  className="mb-3 h-[clamp(2rem,4vw,2.75rem)] w-auto"
                  width={108}
                  height={106}
                  draggable={false}
                />
                <p className="mb-0 max-w-72 text-sm leading-relaxed text-neutral-500 italic">
                  {footerBrand.descriptionParts.map((part, index) =>
                    typeof part === "string" ? (
                      <span key={index}>{part}</span>
                    ) : (
                      <strong
                        key={index}
                        className="font-semibold text-neutral-700"
                      >
                        {part.bold}
                      </strong>
                    ),
                  )}
                </p>
              </div>

              {footerColumns.map((column, columnIndex) => (
                <div key={column.links[0]?.label ?? columnIndex}>
                  <ul className="m-0 flex list-none flex-col gap-0 p-0">
                    {column.links.map((link) => (
                      <li key={`${columnIndex}-${link.label}`}>
                        <a
                          href={link.href}
                          className="inline-flex min-h-11 w-fit items-center text-sm text-neutral-500 no-underline underline-offset-2 transition-colors hover:text-neutral-900 hover:underline"
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

export function FooterLegal() {
  return (
    <Container
      className={cn(
        "flex flex-col items-center justify-between gap-4 border-t border-neutral-200 py-8 md:flex-row",
      )}
    >
      <p className="m-0 text-center text-sm text-neutral-500 md:text-start">
        © {new Date().getFullYear()} {footerLegal.copyright}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:justify-end">
        <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-x-6 gap-y-2 p-0">
          {footerLegal.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="inline-flex min-h-11 items-center text-sm text-neutral-500 no-underline underline-offset-2 transition-colors hover:text-neutral-900 hover:underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <FooterSmartbeesCredit />
      </div>
    </Container>
  );
}
