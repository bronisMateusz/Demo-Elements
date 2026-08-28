import { Helmet } from "react-helmet-async";
import { wishlistPage } from "../data/wishlist";
import { PageShell } from "../components/layout/PageShell";
import { Breadcrumbs } from "../components/orientation/Breadcrumbs";
import { PageIntro } from "../components/marketing/PageIntro";
import { WishlistDirectory } from "../components/marketing/WishlistDirectory";
import { PageSectionStack } from "../components/structural/PageSectionStack";
import { pageHeaderClusterClassName } from "../lib/layoutTokens";

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
        <PageSectionStack flushTop>
          {/* One stack child: intro + directory share subnav-to-content rhythm. */}
          <div className={pageHeaderClusterClassName}>
            <PageIntro
              title={wishlistPage.title}
              description={wishlistPage.description}
            />
            {/* No transform wrapper: it breaks position:sticky on the subnav. */}
            <WishlistDirectory />
          </div>
        </PageSectionStack>
      </PageShell>
    </>
  );
}
