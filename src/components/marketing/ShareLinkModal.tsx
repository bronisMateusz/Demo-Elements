import { useEffect, useId, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { wishlistPage } from "../../data/wishlist";
import { CenterMorphModal } from "../motion/CenterMorphModal";
import { TextCascade } from "../motion/TextCascade";
import { Button } from "../ui/Button";
import { btnAnimatedPreviewClassName } from "../ui/btnAnimatedClassName";
import { inputClassName } from "../ui/inputClassName";

const COPIED_RESET_MS = 2000;

type ShareLinkModalProps = {
  open: boolean;
  onClose: () => void;
};

export function ShareLinkModal({ open, onClose }: ShareLinkModalProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const copiedResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [copied, setCopied] = useState(false);
  const share = wishlistPage.summary.share;

  const clearCopiedReset = () => {
    if (copiedResetRef.current) {
      clearTimeout(copiedResetRef.current);
      copiedResetRef.current = null;
    }
  };

  useEffect(() => () => clearCopiedReset(), []);

  const handleClose = () => {
    clearCopiedReset();
    setCopied(false);
    onClose();
  };

  const copyLink = async () => {
    const value = share.url;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      clearCopiedReset();
      copiedResetRef.current = setTimeout(() => {
        setCopied(false);
        copiedResetRef.current = null;
      }, COPIED_RESET_MS);
    } catch {
      inputRef.current?.select();
    }
  };

  return (
    <CenterMorphModal
      open={open}
      onClose={handleClose}
      title={share.title}
      description={share.lead}
      closeLabel={share.closeLabel}
    >
      <div className="mt-6 flex">
        <label className="sr-only" htmlFor={inputId}>
          {share.title}
        </label>
        <input
          ref={inputRef}
          id={inputId}
          readOnly
          value={share.url}
          className={cn(inputClassName, "min-w-0 rounded-e-none")}
          onFocus={(event) => event.currentTarget.select()}
        />
        <Button
          as="button"
          type="button"
          variant="primary"
          className={cn(
            "shrink-0 rounded-s-none",
            copied &&
              cn("border-neutral-800", btnAnimatedPreviewClassName(true)),
          )}
          ariaLabel={copied ? share.copiedLabel : share.copyLabel}
          onClick={() => {
            void copyLink();
          }}
        >
          <span className="inline-grid justify-items-center">
            <span
              className="invisible col-start-1 row-start-1 inline-flex items-center gap-2"
              aria-hidden="true"
            >
              <i className="ph ph-copy" />
              {share.copyLabel}
            </span>
            <span
              className="invisible col-start-1 row-start-1 inline-flex items-center gap-2"
              aria-hidden="true"
            >
              <i className="ph ph-check" />
              {share.copiedLabel}
            </span>
            <span className="col-start-1 row-start-1 inline-flex items-center gap-2">
              <i
                className={copied ? "ph ph-check" : "ph ph-copy"}
                aria-hidden="true"
              />
              <TextCascade
                text={copied ? share.copiedLabel : share.copyLabel}
              />
            </span>
          </span>
        </Button>
      </div>
      <p className="sr-only" aria-live="polite">
        {copied ? share.copiedLabel : ""}
      </p>
      <p className="mt-4 mb-0 font-body text-sm leading-relaxed text-neutral-600">
        {share.note}
      </p>
    </CenterMorphModal>
  );
}
