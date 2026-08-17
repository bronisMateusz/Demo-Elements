import { Helmet } from "react-helmet-async";
import { wishlistPage } from "../data/wishlist";
import { PageShell } from "../components/layout/PageShell";
import { Breadcrumbs } from "../components/orientation/Breadcrumbs";
import { PageIntro } from "../components/marketing/PageIntro";
import { WishlistDirectory } from "../components/marketing/WishlistDirectory";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { cn } from "../lib/cn";

function RevealSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, className: revealClassName } = useRevealOnScroll();
  return (
    <div ref={ref} className={cn(revealClassName, className)}>
      {children}
    </div>
  );
}

export function FavoritesPage() {
  return (
    <>
      <Helmet>
        <title>{wishlistPage.title} - Elements</title>
        <meta name="description" content={wishlistPage.metaDescription} />
      </Helmet>

      <PageShell
        breadcrumbs={
          <Breadcrumbs
            items={[...wishlistPage.breadcrumbs]}
            variant="top"
            className="py-3 md:py-4"
          />
        }
      >
        <PageIntro
          title={wishlistPage.title}
          className="pt-6 pb-0 md:pt-8 lg:pt-10"
        />

        <RevealSection className="pb-[clamp(2.5rem,6vw,4rem)]">
          <WishlistDirectory className="mt-2" />
        </RevealSection>
      </PageShell>
    </>
  );
}
