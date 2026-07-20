import { useCallback, useId, useState, type FormEvent } from "react";
import { cn } from "../../lib/cn";
import { askDrawerCopy, buildAskMessage, formatAskSku } from "../../data/ask";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import type { ProductImage } from "../../types/product";
import { Button } from "../ui/Button";
import { DrawerHeader, DrawerShell } from "../layout/DrawerShell";
import { Checkbox } from "../motion/Checkbox";
import { inputClassName } from "../ui/inputClassName";

type AskDrawerProps = {
  open: boolean;
  onClose: () => void;
  productTitle: string;
  productBrand: string;
  productSku: string;
  productImage: ProductImage;
};

const labelClassName = "mb-1.5 block text-sm font-medium text-neutral-900";

function RequiredMark() {
  return (
    <span className="text-neutral-500" aria-hidden="true">
      {" "}
      *
    </span>
  );
}

export function AskDrawer({
  open,
  onClose,
  productTitle,
  productBrand,
  productSku,
  productImage,
}: AskDrawerProps) {
  const nameId = useId();
  const contactId = useId();
  const postalId = useId();
  const messageId = useId();
  const consentId = useId();
  const displaySku = formatAskSku(productSku);
  const [message, setMessage] = useState(() =>
    buildAskMessage(productTitle, productSku),
  );
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);

  const handleClose = useCallback(() => {
    setSubmitted(false);
    setConsent(false);
    setMessage(buildAskMessage(productTitle, productSku));
    onClose();
  }, [onClose, productTitle, productSku]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <DrawerShell
      open={open}
      onClose={handleClose}
      label={askDrawerCopy.title}
      closeLabel="Zamknij formularz pytania"
    >
      <DrawerHeader
        title={askDrawerCopy.title}
        description={askDrawerCopy.description}
        closeLabel={askDrawerCopy.closeLabel}
        onClose={handleClose}
      />

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-gutter py-8">
        {submitted ? (
          <div className="rounded-xs border border-neutral-200 bg-neutral-50 px-5 py-6">
            <p className="m-0 font-heading text-xl text-neutral-900">
              {askDrawerCopy.successTitle}
            </p>
            <p className="mt-2 mb-0 text-sm leading-relaxed text-neutral-600">
              {askDrawerCopy.successMessage}
            </p>
            <Button
              as="button"
              type="button"
              variant="primary"
              className="mt-6"
              onClick={handleClose}
            >
              {askDrawerCopy.closeLabel}
            </Button>
          </div>
        ) : (
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex gap-3 rounded-xs border border-neutral-200 bg-neutral-50 p-3">
              <div className="size-14 shrink-0 overflow-hidden bg-neutral-100">
                <img
                  src={productImage.src}
                  alt=""
                  className="h-full w-full object-cover"
                  style={{ objectPosition: productImageObjectPosition(productImage) }}
                  width={56}
                  height={56}
                  draggable={false}
                />
              </div>
              <div className="min-w-0">
                <p className="m-0 font-body text-ui font-medium leading-snug text-neutral-900">
                  {productTitle}
                </p>
                <p className="mt-1 mb-0 text-sm text-neutral-500">
                  {productBrand} · {displaySku}
                </p>
              </div>
            </div>

            <div>
              <label className={labelClassName} htmlFor={nameId}>
                {askDrawerCopy.nameLabel}
                <RequiredMark />
              </label>
              <input
                id={nameId}
                name="name"
                type="text"
                required
                aria-required="true"
                autoComplete="given-name"
                placeholder={askDrawerCopy.namePlaceholder}
                className={inputClassName}
              />
            </div>

            <div>
              <label className={labelClassName} htmlFor={contactId}>
                {askDrawerCopy.contactLabel}
                <RequiredMark />
              </label>
              <input
                id={contactId}
                name="contact"
                type="text"
                required
                aria-required="true"
                autoComplete="email"
                placeholder={askDrawerCopy.contactPlaceholder}
                className={inputClassName}
              />
            </div>

            <div>
              <label className={labelClassName} htmlFor={postalId}>
                {askDrawerCopy.postalLabel}
                <RequiredMark />
                <span className="font-normal text-neutral-500">
                  {" "}
                  · {askDrawerCopy.postalHint}
                </span>
              </label>
              <input
                id={postalId}
                name="postal"
                type="text"
                required
                aria-required="true"
                autoComplete="postal-code"
                inputMode="numeric"
                placeholder={askDrawerCopy.postalPlaceholder}
                className={inputClassName}
              />
            </div>

            <div>
              <label className={labelClassName} htmlFor={messageId}>
                {askDrawerCopy.messageLabel}
                <RequiredMark />
              </label>
              <textarea
                id={messageId}
                name="message"
                required
                aria-required="true"
                rows={4}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className={cn(inputClassName, "h-auto min-h-28 resize-y py-3 leading-relaxed")}
              />
            </div>

            <Checkbox
              id={consentId}
              name="consent"
              required
              checked={consent}
              onCheckedChange={setConsent}
              className="text-sm leading-relaxed text-neutral-600"
            >
              {askDrawerCopy.consent}{" "}
              <a
                href={askDrawerCopy.privacyHref}
                className="text-neutral-800 underline underline-offset-2 hover:text-gold-500"
                onClick={(event) => event.stopPropagation()}
              >
                {askDrawerCopy.privacyLabel}
              </a>
              .{" "}
              <a
                href={askDrawerCopy.marketingHref}
                className="text-neutral-800 underline underline-offset-2 hover:text-gold-500"
                onClick={(event) => event.stopPropagation()}
              >
                {askDrawerCopy.marketingLabel} ›
              </a>
            </Checkbox>

            <Button as="button" type="submit" variant="primary" size="lg" full>
              {askDrawerCopy.submitLabel}
            </Button>

            <p className="m-0 text-center text-xs leading-relaxed text-neutral-500">
              {askDrawerCopy.footerNote}
            </p>
          </form>
        )}
      </div>
    </DrawerShell>
  );
}
