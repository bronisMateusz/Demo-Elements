import { type ReactNode } from "react";
import { buttonClassName, type ButtonSize, type ButtonVariant } from "./buttonClassName";

export type { ButtonSize, ButtonVariant };

interface LinkButtonProps {
  as?: "link";
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
  target?: "_blank" | "_self";
  rel?: string;
  className?: string;
  ariaLabel?: string;
}

interface ActionButtonProps {
  as: "button";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

export type ButtonProps = LinkButtonProps | ActionButtonProps;

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const full = props.full ?? false;
  const classes = buttonClassName({ variant, size, full, className: props.className });

  if (props.as === "button") {
    return (
      <button
        type={props.type ?? "button"}
        className={classes}
        onClick={props.onClick}
        aria-label={props.ariaLabel}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    );
  }

  return (
    <a
      className={classes}
      href={props.href}
      target={props.target}
      rel={props.rel}
      aria-label={props.ariaLabel}
    >
      {props.children}
    </a>
  );
}
