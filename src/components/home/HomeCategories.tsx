import { homeCategories } from "../../data/home";
import { cn } from "../../lib/cn";
import { Container } from "../ui/Container";
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
              <a
                href={item.href}
                className={cn(
                  "group/cat flex h-full flex-col items-start gap-3 rounded-xs bg-gold-50 px-4 py-5 no-underline sm:px-5 sm:py-6",
                  "transition-[background-color,color] duration-base ease-out",
                  "hover:bg-gold-100",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
                )}
              >
                <i
                  className={cn(
                    item.iconClass,
                    "text-3xl leading-none text-neutral-900",
                  )}
                  aria-hidden="true"
                />
                <span className="font-body text-sm font-medium text-neutral-900 md:text-ui">
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
