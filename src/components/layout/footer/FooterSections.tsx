import { Container } from "../../ui/Container";
import { Button } from "../../ui/Button";
import { footerColumns, footerSocialLinks } from "../../../data/nav";

export function FooterNewsletter() {
  return (
    <div className="border-b border-border py-12 md:py-16">
      <Container className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-md">
          <p className="mb-2 font-body text-eyebrow uppercase tracking-wide text-text-muted">
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
            className="h-12 flex-1 border border-border bg-bg px-4 font-body text-ui text-text outline-none transition-[border-color] focus:border-text-strong"
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
          <h3 className="mb-4 font-body text-eyebrow uppercase tracking-wide text-text-muted">
            {column.title}
          </h3>
          <ul className="flex list-none flex-col gap-3">
            {column.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-ui text-text-body no-underline transition-colors hover:text-text"
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
    <Container className="flex flex-col gap-6 border-t border-border py-8 md:flex-row md:items-center md:justify-between">
      <p className="text-small text-text-muted">
        © {new Date().getFullYear()} Elements. Wszelkie prawa zastrzeżone.
      </p>
      <ul className="flex list-none items-center gap-4">
        {footerSocialLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="inline-flex h-10 w-10 items-center justify-center text-text-body transition-colors hover:text-gold"
              aria-label={link.label}
            >
              <i className={link.iconClass} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </Container>
  );
}
