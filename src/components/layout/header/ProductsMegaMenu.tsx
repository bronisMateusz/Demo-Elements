import { cn } from "../../../lib/cn";
import { productsMegaMenu, type MegaMenuGroup } from "../../../data/nav";

type ProductsMegaMenuProps = {
  open: boolean;
  id?: string;
};

function MegaCategoryLink({ group }: { group: MegaMenuGroup }) {
  return (
    <a
      href={group.href}
      className="group/cat mb-4 flex w-full items-center gap-2 font-heading text-xl leading-compact text-neutral-900 no-underline transition-colors duration-fast ease-out hover:text-gold-500"
    >
      {group.title}
      <i
        className="ph ph-arrow-right text-sm text-neutral-400 transition-colors duration-fast ease-out group-hover/cat:text-gold-500"
        aria-hidden="true"
      />
    </a>
  );
}

export function ProductsMegaMenu({ open, id = "products-mega-menu" }: ProductsMegaMenuProps) {
  return (
    <div
      id={id}
      role="region"
      aria-label="Produkty — menu rozwinięte"
      hidden={!open}
      className={cn(
        "absolute inset-x-0 top-full z-[110] border-t border-neutral-200 bg-neutral-0 shadow-2",
        !open && "pointer-events-none",
      )}
    >
      <div className="container grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:py-12">
        {productsMegaMenu.map((column, columnIndex) => (
          <div key={column.groups[0]?.title ?? columnIndex} className="min-w-0">
            {column.groups.map((group, groupIndex) => (
              <div
                key={group.href}
                className={cn(groupIndex > 0 && "mt-8")}
              >
                <MegaCategoryLink group={group} />
                <ul className="m-0 flex list-none flex-col gap-0 p-0">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="block w-full py-1.5 text-ui leading-compact text-neutral-700 no-underline transition-colors duration-fast ease-out hover:text-gold-500"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
