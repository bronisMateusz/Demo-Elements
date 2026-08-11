import { homeCategories } from "../../data/home";
import { cn } from "../../lib/cn";
import { Container } from "../ui/Container";
import { IconTile } from "../ui/IconTile";
import { Section } from "../structural/Section";
import { TextRevealLead } from "../motion/TextRevealLead";

export function HomeCategories() {
  return (
    <Section ariaLabelledby="home-categories-title">
      <Container size="content">
        <TextRevealLead
          id="home-categories-title"
          revealUnit="word"
          className="mb-8 max-w-2xl md:mb-10"
          typographyClassName="font-heading text-h2 leading-[1.1] tracking-tight font-medium"
          mutedClassName="text-neutral-900/20"
          fillClassName="text-neutral-900"
        >
          {homeCategories.title}
        </TextRevealLead>

        <ul
          className={cn(
            "m-0 grid list-none grid-cols-2 gap-2 p-0",
            "sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
          )}
        >
          {homeCategories.items.map((item) => (
            <li key={item.label}>
              <IconTile
                iconClass={item.iconClass}
                label={item.label}
                href={item.href}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
