import { useCallback, useId, useState, type FormEvent } from "react";
import { cn } from "../../lib/cn";
import { contentDividerTopClassName } from "../../lib/layoutTokens";
import {
  advisorAskDrawerCopy,
  askDrawerCopy,
  architectAskFormCopy,
  buildArrangementAskMessage,
  buildAskFooterNote,
  buildAskMessage,
  formatAskSku,
  type AdvisorAskTopicId,
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
import { SalonPickerStacked } from "../layout/SalonPickerPanel";
import { SalonLocationChips } from "../marketing/SalonLocationChips";
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
  /** Product + salon summary cards above the form - on for PDP. */
  showContextSummaries?: boolean;
  /** Postal code + message (+ routing footer) - on for PDP. */
  showRoutingFields?: boolean;
  /** Architect salon select, role confirm, marketing consents (makieta #azForm). */
  showArchitectFields?: boolean;
  /**
   * Drupal #askDrawer body: context card + salon list first, then form
   * after the user picks a salon.
   */
  embedSalonPicker?: boolean;
  /**
   * When true, salon/form are steps 2–3 (step 1 = InspirationProductsDrawer).
   * Enables back from salon to products via `onBackToProducts`.
   */
  fromProductsStep?: boolean;
  onBackToProducts?: () => void;
  /**
   * Render panel body only (parent owns DrawerShell) - seamless step switch
   * from InspirationProductsDrawer.
   */
  embedded?: boolean;
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

function ContextProductCard({
  productTitle,
  productBrand,
  displaySku,
  productImage,
}: {
  productTitle: string;
  productBrand: string;
  displaySku: string;
  productImage: ProductImage;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xs border border-neutral-300 bg-neutral-50 p-3">
      <div className="size-16 shrink-0 overflow-hidden bg-neutral-0">
        <img
          src={productImage.src}
          alt=""
          className="size-full object-cover"
          style={{
            objectPosition: productImageObjectPosition(productImage),
          }}
          width={64}
          height={64}
          draggable={false}
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center self-stretch">
        <p className="m-0 font-body text-ui font-medium leading-snug text-neutral-900">
          {productTitle}
        </p>
        <p className="mt-1 mb-0 text-sm text-neutral-500">
          {[productBrand, displaySku].filter(Boolean).join(" · ")}
        </p>
      </div>
    </div>
  );
}

export function AskDrawer(props: AskDrawerProps) {
  // Remount on open so salon-first step resets without setState-in-effect.
  // Embedded mode remounts when parent swaps step content in.
  return (
    <AskDrawerInner
      key={props.embedded ? "embedded" : props.open ? "open" : "closed"}
      {...props}
    />
  );
}

function AskDrawerInner({
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
  embedSalonPicker = false,
  fromProductsStep = false,
  onBackToProducts,
  embedded = false,
}: AskDrawerProps) {
  const { salon, select } = useSelectedSalon();
  const nameId = useId();
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
    embedSalonPicker
      ? buildArrangementAskMessage(productTitle)
      : buildAskMessage(productTitle, productSku),
  );
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);
  const [partnerSalon, setPartnerSalon] = useState("");
  const [roleConfirm, setRoleConfirm] = useState(false);
  const [marketingEmail, setMarketingEmail] = useState(false);
  const [marketingPhone, setMarketingPhone] = useState(false);
  const [step, setStep] = useState<"salon" | "form">(() =>
    embedSalonPicker && salon ? "form" : "salon",
  );
  const [sawSalonStep, setSawSalonStep] = useState(
    () => !(embedSalonPicker && salon),
  );
  const [topics, setTopics] = useState<AdvisorAskTopicId | null>("arrangement");
  const topicGroupId = useId();

  const handleClose = useCallback(() => {
    setSubmitted(false);
    setConsent(false);
    setPartnerSalon("");
    setRoleConfirm(false);
    setMarketingEmail(false);
    setMarketingPhone(false);
    setTopics("arrangement");
    setStep(embedSalonPicker && salon ? "form" : "salon");
    setSawSalonStep(!(embedSalonPicker && salon));
    setMessage(
      embedSalonPicker
        ? buildArrangementAskMessage(productTitle)
        : buildAskMessage(productTitle, productSku),
    );
    onClose();
  }, [embedSalonPicker, onClose, productTitle, productSku, salon]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const goToSalonStep = () => {
    setSawSalonStep(true);
    setStep("salon");
  };

  const handleSalonSelect = (id: string) => {
    select(id);
    setSawSalonStep(true);
    setStep("form");
  };

  const submitLabel = showArchitectFields
    ? architectAskFormCopy.submitLabel
    : embedSalonPicker
      ? advisorAskDrawerCopy.submitLabel
      : askDrawerCopy.submitLabel;

  const showSalonStep = embedSalonPicker && step === "salon" && !submitted;
  const showFormStep = !showSalonStep;

  const stepEyebrow = embedSalonPicker
    ? showSalonStep
      ? fromProductsStep
        ? advisorAskDrawerCopy.salonStepEyebrow
        : advisorAskDrawerCopy.salonStepOf2Eyebrow
      : advisorAskDrawerCopy.step2Eyebrow
    : undefined;

  const headerOnBack =
    embedSalonPicker && !submitted
      ? showFormStep
        ? sawSalonStep
          ? goToSalonStep
          : onBackToProducts
        : showSalonStep && onBackToProducts
          ? onBackToProducts
          : undefined
      : undefined;

  const headerBackLabel =
    showFormStep && sawSalonStep
      ? advisorAskDrawerCopy.backToSalonLabel
      : advisorAskDrawerCopy.backToProductsLabel;

  const body = (
    <>
      <DrawerHeader
        title={title}
        description={description}
        closeLabel={askDrawerCopy.closeLabel}
        onClose={handleClose}
        eyebrow={stepEyebrow}
        onBack={headerOnBack}
        backLabel={headerBackLabel}
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
        ) : null}

        {showSalonStep ? (
          <div className="flex flex-col gap-5">
            <ContextProductCard
              productTitle={productTitle}
              productBrand={productBrand}
              displaySku={displaySku}
              productImage={productImage}
            />
            <SalonPickerStacked
              lead={advisorAskDrawerCopy.salonPickerLead}
              onSelect={handleSalonSelect}
            />
          </div>
        ) : null}

        {showFormStep && !submitted ? (
          <>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              {showContextSummaries || embedSalonPicker ? (
                <>
                  <ContextProductCard
                    productTitle={productTitle}
                    productBrand={productBrand}
                    displaySku={displaySku}
                    productImage={productImage}
                  />

                  <DrawerSalonSummary
                    salon={salon}
                    onChangeSalon={
                      embedSalonPicker ? goToSalonStep : requestSalonDrawer
                    }
                    emptyHint={askDrawerCopy.salonEmptyHint}
                    changeLabel={
                      embedSalonPicker
                        ? advisorAskDrawerCopy.changeSalonLabel
                        : undefined
                    }
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
                  autoComplete="name"
                  placeholder={askDrawerCopy.namePlaceholder}
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
                  placeholder={
                    embedSalonPicker
                      ? advisorAskDrawerCopy.emailPlaceholder
                      : askDrawerCopy.emailPlaceholder
                  }
                  className={inputClassName}
                />
              </div>

              {embedSalonPicker ? (
                <>
                  <fieldset className="m-0 min-w-0 border-0 p-0">
                    <legend
                      id={topicGroupId}
                      className={cn(labelClassName, "float-none w-full px-0")}
                    >
                      {advisorAskDrawerCopy.topicLabel}
                    </legend>
                    <SalonLocationChips
                      chips={advisorAskDrawerCopy.topics}
                      activeId={topics ?? ""}
                      onSelect={(id) =>
                        setTopics((current) =>
                          current === id ? null : (id as AdvisorAskTopicId),
                        )
                      }
                      ariaLabel={advisorAskDrawerCopy.topicLabel}
                      mobileAs="chips"
                    />
                    <input type="hidden" name="topic" value={topics ?? ""} />
                  </fieldset>

                  <div>
                    <label className={labelClassName} htmlFor={messageId}>
                      {advisorAskDrawerCopy.messageLabel}
                    </label>
                    <textarea
                      id={messageId}
                      name="message"
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
                  {!showContextSummaries && !embedSalonPicker ? (
                    <div>
                      <label
                        className={labelClassName}
                        htmlFor={partnerSalonId}
                      >
                        {architectAskFormCopy.salonLabel}
                      </label>
                      <select
                        id={partnerSalonId}
                        name="partnerSalon"
                        value={partnerSalon}
                        onChange={(event) =>
                          setPartnerSalon(event.target.value)
                        }
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
                  ) : null}

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
                  {embedSalonPicker
                    ? advisorAskDrawerCopy.consent
                    : askDrawerCopy.consent}{" "}
                  <a
                    href={
                      embedSalonPicker
                        ? advisorAskDrawerCopy.privacyHref
                        : askDrawerCopy.privacyHref
                    }
                    className="text-neutral-800 underline underline-offset-2 hover:text-gold-500"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {embedSalonPicker
                      ? advisorAskDrawerCopy.privacyLabel
                      : askDrawerCopy.privacyLabel}
                  </a>
                  {embedSalonPicker ? (
                    "."
                  ) : (
                    <>
                      .{" "}
                      <a
                        href={askDrawerCopy.marketingHref}
                        className="text-neutral-800 underline underline-offset-2 hover:text-gold-500"
                        onClick={(event) => event.stopPropagation()}
                      >
                        {askDrawerCopy.marketingLabel} ›
                      </a>
                    </>
                  )}
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

            {salon && !showArchitectFields && !embedSalonPicker ? (
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
        ) : null}
      </div>
    </>
  );

  if (embedded) {
    return body;
  }

  return (
    <DrawerShell
      open={open}
      onClose={handleClose}
      label={title}
      closeLabel="Zamknij formularz pytania"
    >
      {body}
    </DrawerShell>
  );
}
