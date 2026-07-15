import { cn } from "../../lib/cn";
import { Eyebrow, type EyebrowVariant } from "../ui/Eyebrow";

type SectionHeaderProps = {
  eyebrow?: string;
  eyebrowVariant?: EyebrowVariant;
  title: string;
  lead?: string;
  className?: string;
  titleId?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  eyebrowVariant = "default",
  title,
  lead,
  className,
  titleId,
  align = "left",
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "mb-10 md:mb-12",
        align === "center" && "mx-auto max-w-2xl text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow variant={eyebrowVariant} className={align === "center" ? "justify-center" : undefined}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2 className="t-h2" id={titleId}>
        {title}
      </h2>
      {lead ? <p className="t-body-lg mt-4 max-w-2xl">{lead}</p> : null}
    </header>
  );
}
