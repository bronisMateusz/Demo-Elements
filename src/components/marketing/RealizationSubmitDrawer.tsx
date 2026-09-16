import {
  useCallback,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { realizationSubmitCopy } from "../../data/realizationSubmit";
import { cn } from "../../lib/cn";
import { pGutterClassName } from "../../lib/layoutTokens";
import { DrawerHeader, DrawerShell } from "../layout/DrawerShell";
import { Checkbox } from "../motion/Checkbox";
import { Button } from "../ui/Button";
import { inputClassName } from "../ui/inputClassName";

type RealizationSubmitDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const labelClassName = "mb-1.5 block text-sm font-medium text-neutral-900";
const hintClassName = "mt-1.5 mb-0 text-sm text-neutral-500";
const ACCEPT =
  "image/jpeg,image/png,image/webp,application/pdf,.jpg,.jpeg,.png,.webp,.pdf";
const MAX_FILES = 10;

function RequiredMark() {
  return (
    <span className="text-neutral-500" aria-hidden="true">
      {" "}
      *
    </span>
  );
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fileIconClass(file: File) {
  if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
    return "ph-file-pdf";
  }
  return "ph-image";
}

/** Drawer form to submit an architect realization for Inspiracje. */
export function RealizationSubmitDrawer({
  open,
  onClose,
}: RealizationSubmitDrawerProps) {
  const studioId = useId();
  const emailId = useId();
  const phoneId = useId();
  const projectTitleId = useId();
  const descriptionId = useId();
  const filesId = useId();
  const consentId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const resetForm = useCallback(() => {
    setSubmitted(false);
    setConsent(false);
    setFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [onClose, resetForm]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (files.length === 0) return;
    setSubmitted(true);
  };

  const handleFilesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const incoming = Array.from(event.target.files ?? []);
    setFiles((prev) => {
      const merged = [...prev];
      for (const file of incoming) {
        if (merged.length >= MAX_FILES) break;
        const duplicate = merged.some(
          (item) =>
            item.name === file.name &&
            item.size === file.size &&
            item.lastModified === file.lastModified,
        );
        if (!duplicate) merged.push(file);
      }
      return merged;
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const filesSummary =
    files.length === 0
      ? realizationSubmitCopy.filesEmptyLabel
      : realizationSubmitCopy.filesCountLabel.replace(
          "{count}",
          String(files.length),
        );

  return (
    <DrawerShell
      open={open}
      onClose={handleClose}
      label={realizationSubmitCopy.title}
      closeLabel={realizationSubmitCopy.closeLabel}
    >
      <DrawerHeader
        title={realizationSubmitCopy.title}
        closeLabel={realizationSubmitCopy.closeLabel}
        onClose={handleClose}
      />

      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col overflow-y-auto",
          pGutterClassName,
        )}
      >
        {submitted ? (
          <div className="rounded-xs border border-neutral-300 bg-neutral-50 px-5 py-6">
            <p className="m-0 font-heading text-xl text-neutral-900">
              {realizationSubmitCopy.successTitle}
            </p>
            <p className="mt-2 mb-0 text-sm leading-relaxed text-neutral-600">
              {realizationSubmitCopy.successMessage}
            </p>
            <Button
              as="button"
              type="button"
              variant="primary"
              className="mt-6"
              onClick={handleClose}
            >
              {realizationSubmitCopy.closeSuccessLabel}
            </Button>
          </div>
        ) : (
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <p className="m-0 text-sm leading-relaxed text-neutral-600">
              {realizationSubmitCopy.description}
            </p>

            <div>
              <label className={labelClassName} htmlFor={studioId}>
                {realizationSubmitCopy.studioLabel}
                <RequiredMark />
              </label>
              <input
                id={studioId}
                name="studio"
                type="text"
                required
                aria-required="true"
                autoComplete="organization"
                placeholder={realizationSubmitCopy.studioPlaceholder}
                className={inputClassName}
              />
            </div>

            <div className="grid gap-5">
              <div>
                <label className={labelClassName} htmlFor={emailId}>
                  {realizationSubmitCopy.emailLabel}
                  <RequiredMark />
                </label>
                <input
                  id={emailId}
                  name="email"
                  type="email"
                  required
                  aria-required="true"
                  autoComplete="email"
                  placeholder={realizationSubmitCopy.emailPlaceholder}
                  className={inputClassName}
                />
              </div>
              <div>
                <label className={labelClassName} htmlFor={phoneId}>
                  {realizationSubmitCopy.phoneLabel}
                  <RequiredMark />
                </label>
                <input
                  id={phoneId}
                  name="phone"
                  type="tel"
                  required
                  aria-required="true"
                  autoComplete="tel"
                  placeholder={realizationSubmitCopy.phonePlaceholder}
                  className={inputClassName}
                />
              </div>
            </div>

            <div>
              <label className={labelClassName} htmlFor={projectTitleId}>
                {realizationSubmitCopy.projectTitleLabel}
                <RequiredMark />
              </label>
              <input
                id={projectTitleId}
                name="projectTitle"
                type="text"
                required
                aria-required="true"
                placeholder={realizationSubmitCopy.projectTitlePlaceholder}
                className={inputClassName}
              />
            </div>

            <div>
              <label className={labelClassName} htmlFor={descriptionId}>
                {realizationSubmitCopy.descriptionLabel}
                <RequiredMark />
              </label>
              <textarea
                id={descriptionId}
                name="description"
                required
                aria-required="true"
                rows={5}
                placeholder={realizationSubmitCopy.descriptionPlaceholder}
                className={cn(inputClassName, "h-auto min-h-32 py-3")}
              />
            </div>

            <div>
              <label className={labelClassName} htmlFor={filesId}>
                {realizationSubmitCopy.filesLabel}
                <RequiredMark />
              </label>
              <input
                ref={fileInputRef}
                id={filesId}
                name="files"
                type="file"
                accept={ACCEPT}
                multiple
                required={files.length === 0}
                aria-required="true"
                className="sr-only"
                onChange={handleFilesChange}
              />
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3 rounded-xs border border-dashed border-neutral-300 bg-neutral-0 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="m-0 text-sm font-medium text-neutral-900">
                      {filesSummary}
                    </p>
                    <p className={hintClassName}>
                      {realizationSubmitCopy.filesHint}
                    </p>
                  </div>
                  <Button
                    as="button"
                    type="button"
                    variant="secondary"
                    className="shrink-0"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <i className="ph ph-upload-simple" aria-hidden="true" />
                    {realizationSubmitCopy.filesChooseLabel}
                  </Button>
                </div>

                {files.length > 0 ? (
                  <ul
                    className="m-0 flex list-none flex-col gap-2 ps-0"
                    aria-label={realizationSubmitCopy.filesListLabel}
                  >
                    {files.map((file, index) => (
                      <li
                        key={`${file.name}-${file.size}-${file.lastModified}`}
                        className="flex min-w-0 items-center gap-3 rounded-xs border border-neutral-300 bg-neutral-50 px-3 py-2.5"
                      >
                        <span
                          className="flex size-9 shrink-0 items-center justify-center rounded-xs bg-neutral-0 text-neutral-700"
                          aria-hidden="true"
                        >
                          <i
                            className={cn("ph text-lg", fileIconClass(file))}
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium text-neutral-900">
                            {file.name}
                          </span>
                          <span className="block text-xs text-neutral-500 tabular-nums">
                            {formatFileSize(file.size)}
                          </span>
                        </span>
                        <button
                          type="button"
                          className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-xs text-neutral-500 transition-colors duration-fast ease-out hover:bg-neutral-0 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800"
                          aria-label={`${realizationSubmitCopy.filesRemoveLabel}: ${file.name}`}
                          onClick={() => removeFile(index)}
                        >
                          <i className="ph ph-x text-base" aria-hidden="true" />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>

            <Checkbox
              id={consentId}
              name="consent"
              required
              checked={consent}
              onCheckedChange={setConsent}
              className="text-sm leading-relaxed text-neutral-600"
            >
              {realizationSubmitCopy.consent}{" "}
              <a
                href={realizationSubmitCopy.privacyHref}
                className="text-neutral-900 underline underline-offset-2"
              >
                {realizationSubmitCopy.privacyLabel}
              </a>
              .
            </Checkbox>

            <Button
              as="button"
              type="submit"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              disabled={!consent || files.length === 0}
            >
              {realizationSubmitCopy.submitLabel}
            </Button>
          </form>
        )}
      </div>
    </DrawerShell>
  );
}
