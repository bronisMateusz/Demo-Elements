export type NavItem = {
  label: string;
  href: string;
};

export const mainNavItems: NavItem[] = [
  { label: "Kolekcje", href: "#kolekcje" },
  { label: "Produkty", href: "#produkty" },
  { label: "Inspiracje", href: "#inspiracje" },
  { label: "O nas", href: "#o-nas" },
  { label: "Kontakt", href: "#kontakt" },
];

export const footerColumns = [
  {
    title: "Sklep",
    links: [
      { label: "Kolekcje", href: "#" },
      { label: "Produkty", href: "#" },
      { label: "Nowości", href: "#" },
      { label: "Salony", href: "#" },
    ],
  },
  {
    title: "Inspiracje",
    links: [
      { label: "Lookbook", href: "#" },
      { label: "Aranżacje", href: "#" },
      { label: "Strefa architekta", href: "#" },
      { label: "Wizualizacje 3D", href: "#" },
    ],
  },
  {
    title: "Pomoc",
    links: [
      { label: "Kontakt", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Dostawa i montaż", href: "#" },
      { label: "Gwarancja", href: "#" },
    ],
  },
  {
    title: "Elements",
    links: [
      { label: "O marce", href: "#" },
      { label: "Kariera", href: "#" },
      { label: "Polityka prywatności", href: "#" },
      { label: "Regulamin", href: "#" },
    ],
  },
] as const;

export const footerSocialLinks = [
  { label: "Instagram", href: "https://instagram.com", iconClass: "ph ph-instagram-logo" },
  { label: "Pinterest", href: "https://pinterest.com", iconClass: "ph ph-pinterest-logo" },
  { label: "LinkedIn", href: "https://linkedin.com", iconClass: "ph ph-linkedin-logo" },
] as const;
