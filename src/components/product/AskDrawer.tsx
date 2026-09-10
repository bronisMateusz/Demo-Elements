import { useCallback, useId, useState, type FormEvent } from "react";
import { cn } from "../../lib/cn";
import { contentDividerTopClassName } from "../../lib/layoutTokens";
import {
  askDrawerCopy,
  architectAskFormCopy,
  buildAskFooterNote,
  buildAskMessage,
  formatAskSku,
} from "../../data/ask";
import { salonCardCopy } from "../../data/nav";
import { salonTelHref } from "../../data/salons";
import {
  requestSalonDrawer,
  useSelectedSalon,
} from "../../hooks/useSelectedSalon";
import { productImageObjectPosition } from "../../lib/productImageStyle";
import type { ProductImage } from "../../types/product";
import { Button } from "../ui/Button";
import { DrawerHeader, DrawerShell } from "../layout/DrawerShell";
import { DrawerSalonSummary } from "../layout/DrawerSalonSummary";
import { Checkbox } from "../motion/Checkbox";
import { SalonHoursList } from "../salon/SalonHoursList";
import {
  salonContactEyebrowClassName,
  salonContactLinkOffsetClassName,
} from "../salon/salonContactLinkClassName";
import { inputClassName } from "../ui/inputClassName";

type AskDrawerProps = {
  open: boolean;
  onClose: () => void;
  productTitle: string;
  productBrand: string;
  productSku: string;
  productImage: ProductImage;
  /** Override default product-ask chrome (e.g. architect cooperation). */
  title?: string;
  description?: string;
  /** Product + salon summary cards above the form - on for PDP, off for advisor. */
  showContextSummaries?: boolean;
  /** Postal code + message (+ routing footer) - on for PDP, off for advisor. */
  showRoutingFields?: boolean;
  /** Architect salon select, role confirm, marketing consents (makieta #azForm). */
  showArchitectFields?: boolean;
};

const labelClassName = "mb-1.5 block text-sm font-medium text-neutral-900";

const selectClassName = cn(
  inputClassName,
  "appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pe-10",
  "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20stroke%3D%22%23525252%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m4%206%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')]",
);

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
  title = askDrawerCopy.title,
  description = askDrawerCopy.description,
  showContextSummaries = true,
  showRoutingFields = true,
  showArchitectFields = false,
}: AskDrawerProps) {
  const { salon } = useSelectedSalon();
  const nameId = useId();
  const lastNameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const postalId = useId();
  const messageId = useId();
  const consentId = useId();
  const partnerSalonId = useId();
  const roleConfirmId = useId();
  const marketingEmailId = useId();
  const marketingPhoneId = useId();
  const displaySku = formatAskSku(productSku);
  const [message, setMessage] = useState(() =>
    buildAskMessage(productTitle, productSku),
  );
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);
  const [partnerSalon, setPartnerSalon] = useState("");
  const [roleConfirm, setRoleConfirm] = useState(false);
  const [marketingEmail, setMarketingEmail] = useState(false);
  const [marketingPhone, setMarketingPhone] = useState(false);

  const handleClose = useCallback(() => {
    setSubmitted(false);
    setConsent(false);
    setPartnerSalon("");
    setRoleConfirm(false);
    setMarketingEmail(false);
    setMarketingPhone(false);
    setMessage(buildAskMessage(productTitle, productSku));
    onClose();
  }, [onClose, productTitle, productSku]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const submitLabel = showArchitectFields
    ? architectAskFormCopy.submitLabel
    : askDrawerCopy.submitLabel;

  return (
    <DrawerShell
      open={open}
      onClose={handleClose}
      label={title}
      closeLabel="Zamknij formularz pytania"
    >
      <DrawerHeader
        title={title}
        description={description}
        closeLabel={askDrawerCopy.closeLabel}
        onClose={handleClose}
      />

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-[clamp(0.75rem,2.222vw,2.5rem)] py-4 md:py-8">
        {submitted ? (
          <div className="rounded-xs border border-neutral-300 bg-neutral-50 px-5 py-6">
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
          <>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              {showContextSummaries ? (
                <>
                  <div className="flex gap-3 rounded-xs border border-neutral-300 bg-neutral-50 p-3">
                    <div className="size-14 shrink-0 overflow-hidden bg-neutral-0">
                      <img
                        src={productImage.src}
                        alt=""
                        className="size-full object-cover"
                        style={{
                          objectPosition:
                            productImageObjectPosition(productImage),
                        }}
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

                  <DrawerSalonSummary
                    salon={salon}
                    onChangeSalon={requestSalonDrawer}
                    emptyHint={askDrawerCopy.salonEmptyHint}
                  />
                </>
              ) : null}

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
                <label className={labelClassName} htmlFor={lastNameId}>
                  {askDrawerCopy.lastNameLabel}
                  <RequiredMark />
                </label>
                <input
                  id={lastNameId}
                  name="lastName"
                  type="text"
                  required
                  aria-required="true"
                  autoComplete="family-name"
                  placeholder={askDrawerCopy.lastNamePlaceholder}
                  className={inputClassName}
                />
              </div>

              <div>
                <label className={labelClassName} htmlFor={phoneId}>
                  {askDrawerCopy.phoneLabel}
                  <RequiredMark />
                </label>
                <input
                  id={phoneId}
                  name="phone"
                  type="tel"
                  required
                  aria-required="true"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder={askDrawerCopy.phonePlaceholder}
                  className={inputClassName}
                />
              </div>

              <div>
                <label className={labelClassName} htmlFor={emailId}>
                  {askDrawerCopy.emailLabel}
                  <RequiredMark />
                </label>
                <input
                  id={emailId}
                  name="email"
                  type="email"
                  required
                  aria-required="true"
                  autoComplete="email"
                  placeholder={askDrawerCopy.emailPlaceholder}
                  className={inputClassName}
                />
              </div>

              {showRoutingFields ? (
                <>
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
                      className={cn(
                        inputClassName,
                        "h-auto min-h-28 resize-y py-3 leading-relaxed",
                      )}
                    />
                  </div>
                </>
              ) : null}

              {showArchitectFields ? (
                <>
                  <div>
                    <label className={labelClassName} htmlFor={partnerSalonId}>
                      {architectAskFormCopy.salonLabel}
                    </label>
                    <select
                      id={partnerSalonId}
                      name="partnerSalon"
                      value={partnerSalon}
                      onChange={(event) => setPartnerSalon(event.target.value)}
                      className={selectClassName}
                    >
                      <option value="">
                        {architectAskFormCopy.salonUnknown}
                      </option>
                      {architectAskFormCopy.salonCities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Checkbox
                    id={roleConfirmId}
                    name="roleConfirm"
                    required
                    checked={roleConfirm}
                    onCheckedChange={setRoleConfirm}
                    className="text-sm leading-relaxed text-neutral-900"
                  >
                    {architectAskFormCopy.roleConfirm}
                    <RequiredMark />
                  </Checkbox>

                  <div className={cn("pt-5", contentDividerTopClassName)}>
                    <p className="m-0 font-body text-xs font-medium tracking-[0.12em] text-neutral-500 uppercase">
                      {architectAskFormCopy.marketingEyebrow}
                    </p>
                    <p className="mt-3 mb-4 text-sm leading-relaxed text-neutral-600">
                      {architectAskFormCopy.marketingIntro}
                    </p>
                    <div className="flex flex-col gap-4">
                      <Checkbox
                        id={marketingEmailId}
                        name="marketingEmail"
                        checked={marketingEmail}
                        onCheckedChange={setMarketingEmail}
                        className="text-sm leading-relaxed text-neutral-600"
                      >
                        {architectAskFormCopy.marketingEmail}
                      </Checkbox>
                      <Checkbox
                        id={marketingPhoneId}
                        name="marketingPhone"
                        checked={marketingPhone}
                        onCheckedChange={setMarketingPhone}
                        className="text-sm leading-relaxed text-neutral-600"
                      >
                        {architectAskFormCopy.marketingPhone}
                      </Checkbox>
                    </div>
                  </div>
                </>
              ) : (
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
              )}

              <Button
                as="button"
                type="submit"
                variant="primary"
                size="lg"
                full
              >
                {submitLabel}
              </Button>

              {showArchitectFields ? (
                <p className="m-0 text-start text-xs leading-relaxed text-neutral-500">
                  {architectAskFormCopy.adminNoteBeforeEmail}
                  <a
                    href={`mailto:${architectAskFormCopy.adminEmail}`}
                    className="text-neutral-700 underline underline-offset-2 hover:text-gold-500"
                  >
                    {architectAskFormCopy.adminEmail}
                  </a>
                  {architectAskFormCopy.adminNoteAfterEmail}
                  <a
                    href={architectAskFormCopy.adminPrivacyHref}
                    className="text-neutral-700 underline underline-offset-2 hover:text-gold-500"
                  >
                    {architectAskFormCopy.adminPrivacyLabel}
                  </a>
                  {architectAskFormCopy.adminNoteEnd}
                </p>
              ) : null}

              {showRoutingFields ? (
                <p className="m-0 text-start text-xs leading-relaxed text-neutral-500">
                  {buildAskFooterNote(salon?.name)}
                </p>
              ) : null}
            </form>

            {salon && !showArchitectFields ? (
              <div className={cn("mt-6 pt-6 pb-2", contentDividerTopClassName)}>
                <p className="m-0 font-body text-sm font-medium tracking-[0.12em] text-neutral-900 uppercase">
                  {askDrawerCopy.altContactTitle}
                </p>

                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
                  <div>
                    <p className={salonContactEyebrowClassName}>
                      {askDrawerCopy.altCallTitle}
                    </p>
                    <a
                      href={salonTelHref(salon.phone)}
                      className={salonContactLinkOffsetClassName}
                    >
                      <i
                        className="ph ph-phone text-base leading-none"
                        aria-hidden="true"
                      />
                      <span>{salon.phone}</span>
                    </a>
                    <SalonHoursList
                      hours={salonCardCopy.defaultHours}
                      className="mt-1.5 text-sm text-neutral-500"
                    />
                  </div>

                  <div>
                    <p className={salonContactEyebrowClassName}>
                      {askDrawerCopy.altVisitTitle}
                    </p>
                    <a
                      href={salon.href}
                      className={salonContactLinkOffsetClassName}
                    >
                      <i
                        className="ph ph-map-pin text-base leading-none"
                        aria-hidden="true"
                      />
                      <span>{salon.name}</span>
                    </a>
                    <p className="mt-1.5 mb-0 text-sm leading-relaxed text-neutral-600">
                      {salon.address}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </DrawerShell>
  );
}
