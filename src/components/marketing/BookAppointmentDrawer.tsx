import { useCallback, useId, useState, type FormEvent } from "react";
import { advisorAskDrawerCopy } from "../../data/ask";
import { bookAppointmentCopy } from "../../data/bookAppointment";
import {
  requestSalonDrawer,
  useSelectedSalon,
} from "../../hooks/useSelectedSalon";
import { cn } from "../../lib/cn";
import { DrawerHeader, DrawerShell } from "../layout/DrawerShell";
import { DrawerSalonSummary } from "../layout/DrawerSalonSummary";
import { SalonPickerStacked } from "../layout/SalonPickerPanel";
import { Checkbox } from "../motion/Checkbox";
import { Button } from "../ui/Button";
import { inputClassName } from "../ui/inputClassName";
import { SalonLocationChips } from "./SalonLocationChips";

type BookAppointmentDrawerProps = {
  open: boolean;
  onClose: () => void;
  /**
   * Drupal eh-drawer body: salon list first when needed, then the booking form.
   */
  embedSalonPicker?: boolean;
  /** Parent owns DrawerShell - seamless handoff from InspirationProductsDrawer. */
  embedded?: boolean;
  /** Salon/form are step 2 after InspirationProductsDrawer. */
  fromProductsStep?: boolean;
  onBackToProducts?: () => void;
};

const labelClassName = "mb-1.5 block text-sm font-medium text-neutral-900";
const fieldHintClassName = "mt-1.5 mb-0 text-sm text-neutral-500";

function RequiredMark() {
  return (
    <span className="text-neutral-500" aria-hidden="true">
      {" "}
      *
    </span>
  );
}

/** Salon visit booking form - content aligned with the production eh-drawer. */
export function BookAppointmentDrawer(props: BookAppointmentDrawerProps) {
  return (
    <BookAppointmentDrawerInner
      key={props.embedded ? "embedded" : props.open ? "open" : "closed"}
      {...props}
    />
  );
}

function BookAppointmentDrawerInner({
  open,
  onClose,
  embedSalonPicker = false,
  embedded = false,
  fromProductsStep = false,
  onBackToProducts,
}: BookAppointmentDrawerProps) {
  const { salon, select } = useSelectedSalon();
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const slotId = useId();
  const messageId = useId();
  const consentId = useId();

  const [reasonId, setReasonId] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState<"salon" | "form">(() =>
    embedSalonPicker && salon ? "form" : embedSalonPicker ? "salon" : "form",
  );
  const [sawSalonStep, setSawSalonStep] = useState(
    () => !(embedSalonPicker && salon),
  );

  const handleClose = useCallback(() => {
    setSubmitted(false);
    setConsent(false);
    setReasonId(null);
    setStep(
      embedSalonPicker && salon ? "form" : embedSalonPicker ? "salon" : "form",
    );
    setSawSalonStep(!(embedSalonPicker && salon));
    onClose();
  }, [embedSalonPicker, onClose, salon]);

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

  const showSalonStep = embedSalonPicker && step === "salon" && !submitted;
  const showFormStep = !showSalonStep;

  const stepEyebrow = fromProductsStep
    ? showSalonStep
      ? advisorAskDrawerCopy.step2SalonEyebrow
      : advisorAskDrawerCopy.step2Eyebrow
    : embedSalonPicker && showSalonStep
      ? advisorAskDrawerCopy.salonStepOf2Eyebrow
      : undefined;

  const headerOnBack =
    !submitted && fromProductsStep
      ? showFormStep
        ? sawSalonStep
          ? goToSalonStep
          : onBackToProducts
        : showSalonStep
          ? onBackToProducts
          : undefined
      : embedSalonPicker && showFormStep && sawSalonStep && !submitted
        ? goToSalonStep
        : undefined;

  const headerBackLabel =
    showFormStep && sawSalonStep
      ? advisorAskDrawerCopy.backToSalonLabel
      : advisorAskDrawerCopy.backToProductsLabel;

  const changeSalon = embedSalonPicker ? goToSalonStep : requestSalonDrawer;

  const body = (
    <>
      <DrawerHeader
        title={bookAppointmentCopy.title}
        closeLabel={bookAppointmentCopy.closeLabel}
        onClose={handleClose}
        eyebrow={stepEyebrow}
        onBack={headerOnBack}
        backLabel={headerBackLabel}
      />

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-[clamp(0.75rem,2.222vw,2.5rem)] py-4 md:py-8">
        {submitted ? (
          <div className="rounded-xs border border-neutral-300 bg-neutral-50 px-5 py-6">
            <p className="m-0 font-heading text-xl text-neutral-900">
              {bookAppointmentCopy.successTitle}
            </p>
            <p className="mt-2 mb-0 text-sm leading-relaxed text-neutral-600">
              {bookAppointmentCopy.successMessage}
            </p>
            <Button
              as="button"
              type="button"
              variant="primary"
              className="mt-6"
              onClick={handleClose}
            >
              {bookAppointmentCopy.closeSuccessLabel}
            </Button>
          </div>
        ) : null}

        {showSalonStep ? (
          <SalonPickerStacked
            lead={bookAppointmentCopy.salonPickerLead}
            onSelect={handleSalonSelect}
          />
        ) : null}

        {showFormStep && !submitted ? (
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <DrawerSalonSummary
              salon={salon}
              onChangeSalon={changeSalon}
              emptyHint={bookAppointmentCopy.salonFallbackHint}
              emptyLabel={bookAppointmentCopy.noSalonLabel}
              changeLabel={bookAppointmentCopy.changeSalonLabel}
            />

            <div>
              <label className={labelClassName} htmlFor={nameId}>
                {bookAppointmentCopy.nameLabel}
                <RequiredMark />
              </label>
              <input
                id={nameId}
                name="name"
                type="text"
                required
                aria-required="true"
                autoComplete="name"
                placeholder={bookAppointmentCopy.namePlaceholder}
                className={inputClassName}
              />
            </div>

            <div>
              <label className={labelClassName} htmlFor={emailId}>
                {bookAppointmentCopy.emailLabel}
                <RequiredMark />
              </label>
              <input
                id={emailId}
                name="email"
                type="email"
                required
                aria-required="true"
                autoComplete="email"
                placeholder={bookAppointmentCopy.emailPlaceholder}
                className={inputClassName}
              />
            </div>

            <div>
              <label className={labelClassName} htmlFor={phoneId}>
                {bookAppointmentCopy.phoneLabel}
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
                placeholder={bookAppointmentCopy.phonePlaceholder}
                className={inputClassName}
                aria-describedby={`${phoneId}-hint`}
              />
              <p id={`${phoneId}-hint`} className={fieldHintClassName}>
                {bookAppointmentCopy.phoneHint}
              </p>
            </div>

            <div>
              <label className={labelClassName} htmlFor={slotId}>
                {bookAppointmentCopy.slotLabel}
              </label>
              <input
                id={slotId}
                name="slot"
                type="text"
                autoComplete="off"
                placeholder={bookAppointmentCopy.slotPlaceholder}
                className={inputClassName}
              />
            </div>

            <fieldset className="m-0 min-w-0 border-0 p-0">
              <legend className={cn(labelClassName, "float-none w-full px-0")}>
                {bookAppointmentCopy.reasonLabel}
              </legend>
              <SalonLocationChips
                chips={bookAppointmentCopy.reasonOptions}
                activeId={reasonId ?? ""}
                onSelect={(id) =>
                  setReasonId((current) => (current === id ? null : id))
                }
                ariaLabel={bookAppointmentCopy.reasonLabel}
                mobileAs="chips"
              />
              <input type="hidden" name="reason" value={reasonId ?? ""} />
            </fieldset>

            <div>
              <label className={labelClassName} htmlFor={messageId}>
                {bookAppointmentCopy.messageLabel}
              </label>
              <textarea
                id={messageId}
                name="message"
                rows={4}
                placeholder={bookAppointmentCopy.messagePlaceholder}
                className={cn(inputClassName, "min-h-28 resize-y py-3")}
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
              {bookAppointmentCopy.consent}{" "}
              <a
                href={bookAppointmentCopy.privacyHref}
                className="text-neutral-800 underline underline-offset-2 hover:text-gold-500"
                onClick={(event) => event.stopPropagation()}
              >
                {bookAppointmentCopy.privacyLabel}
              </a>
              .
            </Checkbox>

            <Button
              as="button"
              type="submit"
              variant="primary"
              size="lg"
              full
              disabled={!consent || !salon}
            >
              {bookAppointmentCopy.submitLabel}
            </Button>
          </form>
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
      label={bookAppointmentCopy.title}
      closeLabel={bookAppointmentCopy.closeLabel}
    >
      {body}
    </DrawerShell>
  );
}
