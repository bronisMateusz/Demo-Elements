import { Container } from "../../ui/Container";
import { Button } from "../../ui/Button";
import { footerColumns, footerSocialLinks } from "../../../data/nav";
import { FooterSmartbeesCredit } from "./FooterSmartbeesCredit";

export function FooterNewsletter() {
  return (
    <div className="border-b border-neutral-200 py-12 md:py-16">
      <Container className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-md">
          <p className="mb-2 font-body text-xs uppercase tracking-wide text-neutral-500">
            Newsletter
          </p>
          <h2 className="t-h3">Inspiracje prosto na Twój adres e-mail</h2>
          <p className="t-body mt-3">
            Otrzymuj selekcję aranżacji, nowości kolekcji i zaproszenia na wydarzenia Elements.
          </p>
        </div>
        <form
          className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="sr-only" htmlFor="footer-email">
            Adres e-mail
          </label>
          <input
            id="footer-email"
            type="email"
            placeholder="Twój adres e-mail"
            className="h-12 flex-1 border border-neutral-200 bg-neutral-0 px-4 font-body text-ui text-neutral-900 outline-none transition-[border-color] focus:border-neutral-800"
          />
          <Button as="button" type="submit" variant="primary">
            Zapisz się
          </Button>
        </form>
      </Container>
    </div>
  );
}

export function FooterMain() {
  return (
    <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 md:py-16">
      {footerColumns.map((column) => (
        <div key={column.title}>
          <h3 className="mb-4 font-body text-xs uppercase tracking-wide text-neutral-500">
            {column.title}
          </h3>
          <ul className="flex list-none flex-col gap-3">
            {column.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-ui text-neutral-600 no-underline transition-colors hover:text-neutral-900"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Container>
  );
}

export function FooterLegal() {
  return (
    <Container className="grid gap-6 border-t border-neutral-200 py-8 md:grid-cols-[1fr_auto] md:items-center">
      <p className="text-sm text-neutral-500">
        © {new Date().getFullYear()} Elements. Wszelkie prawa zastrzeżone.
      </p>
      <div className="flex flex-wrap items-center gap-5 md:gap-6">
        <FooterSmartbeesCredit />
        <ul className="flex list-none items-center gap-4">
          {footerSocialLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="inline-flex h-12 w-12 items-center justify-center text-neutral-600 transition-colors hover:text-gold-500"
                aria-label={link.label}
              >
                <i className={link.iconClass} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
