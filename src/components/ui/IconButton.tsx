import { iconButtonClassName, type IconButtonVariant } from "./iconButtonClassName";

type IconButtonProps = {
  label: string;
  iconClass: string;
  variant?: IconButtonVariant;
  active?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function IconButton({
  label,
  iconClass,
  variant = "default",
  active = false,
  className,
  onClick,
  type = "button",
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={iconButtonClassName({ variant, active, className })}
      aria-label={label}
      onClick={onClick}
    >
      <i className={iconClass} aria-hidden="true" />
    </button>
  );
}

export function IconLink({
  href,
  label,
  iconClass,
  variant = "default",
  className,
}: {
  href: string;
  label: string;
  iconClass: string;
  variant?: IconButtonVariant;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={iconButtonClassName({ variant, className })}
      aria-label={label}
    >
      <i className={iconClass} aria-hidden="true" />
    </a>
  );
}
