import { cn } from "../../lib/cn";
import { Eyebrow, type EyebrowVariant } from "../ui/Eyebrow";
import { TextRevealLead } from "../motion/TextRevealLead";

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
      <TextRevealLead
        id={titleId}
        revealUnit="word"
        className={cn("max-w-none", align === "center" && "mx-auto")}
        typographyClassName="font-heading text-h2 leading-heading tracking-tight"
        mutedClassName="text-neutral-900/20"
        fillClassName="text-neutral-900"
      >
        {title}
      </TextRevealLead>
      {lead ? <p className="t-body-lg mt-4 max-w-2xl">{lead}</p> : null}
    </header>
  );
}
