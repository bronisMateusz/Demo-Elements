import { useState } from "react";
import { TextCascade } from "../../components/motion/TextCascade";
import { TextRevealLead } from "../../components/motion/TextRevealLead";
import { Checkbox } from "../../components/motion/Checkbox";
import { Badge } from "../../components/ui/Badge";
import { IconButton, IconLink } from "../../components/ui/IconButton";
import type { BadgeVariant } from "../../components/ui/badgeClassName";

const BADGE_VARIANTS: BadgeVariant[] = [
  "default",
  "gold",
  "brand",
  "outline",
  "promo",
  "neutral",
];

export function BadgeSystemDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-sm text-neutral-600">Warianty · md</p>
        <div className="flex flex-wrap gap-2">
          {BADGE_VARIANTS.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-sm text-neutral-600">Rozmiary · gold</p>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="gold" size="sm">
            sm
          </Badge>
          <Badge variant="gold" size="md">
            md
          </Badge>
        </div>
      </div>
    </div>
  );
}

export function IconButtonLiveDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <IconButton label="Szukaj" iconClass="ph ph-magnifying-glass" />
        <IconButton
          label="Obramowany"
          iconClass="ph ph-heart"
          variant="bordered"
        />
        <IconButton
          label="Elevated"
          iconClass="ph ph-bookmark-simple"
          variant="elevated"
        />
        <IconButton
          label="Aktywny"
          iconClass="ph-fill ph-bookmark-simple"
          active
        />
        <IconLink
          href="#schowek"
          label="Schowek"
          iconClass="ph ph-bookmark-simple"
        />
      </div>
      <div className="flex flex-wrap items-center gap-3 rounded-xs bg-neutral-900 p-4">
        <IconButton
          label="Na ciemnym"
          iconClass="ph ph-magnifying-glass"
          variant="on-dark"
        />
        <IconButton
          label="Lista"
          iconClass="ph ph-list"
          variant="on-dark"
        />
      </div>
    </div>
  );
}

export function CheckboxDemo() {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(true);

  return (
    <div className="flex max-w-md flex-col gap-4">
      <Checkbox checked={checked} onCheckedChange={setChecked}>
        Wyrażam zgodę na kontakt w sprawie zapytania
      </Checkbox>
      <Checkbox
        checked={!indeterminate && checked}
        indeterminate={indeterminate}
        onCheckedChange={(value) => {
          setIndeterminate(false);
          setChecked(value);
        }}
      >
        Stan indeterminate (kliknij, by ustawić)
      </Checkbox>
      <Checkbox checked disabled onCheckedChange={() => undefined}>
        Wyłączony (zaznaczony)
      </Checkbox>
    </div>
  );
}

export function TextCascadeDemo() {
  const words = ["Nowości", "Bestsellery", "Promocje", "Outlet"];
  const [index, setIndex] = useState(0);

  return (
    <div className="flex flex-col items-start gap-4">
      <p className="m-0 font-heading text-2xl font-medium text-neutral-900">
        Zobacz{" "}
        <TextCascade
          text={words[index] ?? words[0]}
          className="inline-block text-gold-500"
        />
      </p>
      <button
        type="button"
        className="font-body text-sm text-neutral-600 underline underline-offset-2 hover:text-gold-500"
        onClick={() => setIndex((prev) => (prev + 1) % words.length)}
      >
        Zmień tekst
      </button>
    </div>
  );
}

export function TextRevealLeadDemo() {
  return (
    <TextRevealLead
      id="lib-text-reveal-demo"
      revealUnit="word"
      className="max-w-xl text-balance"
      typographyClassName="font-heading text-h2 leading-[1.1] tracking-tight font-medium"
      mutedClassName="text-neutral-900/20"
      fillClassName="text-neutral-900"
    >
      Projektujesz zawodowo? Zainspiruj się Elements.
    </TextRevealLead>
  );
}
