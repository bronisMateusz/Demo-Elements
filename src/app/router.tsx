import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../components/routing/RootLayout";
import { LibraryLayout } from "../library/LibraryLayout";
import {
  LibraryCategoryPage,
  LibraryIndexPage,
} from "../routes/LibraryCategoryPage";
import { CategoryPage } from "../routes/CategoryPage";
import { HomePage } from "../routes/HomePage";
import { ListingPage } from "../routes/ListingPage";
import { NotFoundPage } from "../routes/NotFoundPage";
import { ProducerPage } from "../routes/ProducerPage";
import { ProducersPage } from "../routes/ProducersPage";
import { ProductDetailPage } from "../routes/ProductDetailPage";
import { SalonPage } from "../routes/SalonPage";
import { SalonsPage } from "../routes/SalonsPage";
import { SalonsPageB } from "../routes/SalonsPageB";
import { SubcategoryPage } from "../routes/SubcategoryPage";

function getRouterBasename() {
  if (import.meta.env.DEV) {
    const devPrefix = "/Demo-Elements";
    return window.location.pathname.startsWith(`${devPrefix}/`) ||
      window.location.pathname === devPrefix
      ? devPrefix
      : "/";
  }
  const base = import.meta.env.BASE_URL || "/";
  return base.endsWith("/") && base.length > 1 ? base.slice(0, -1) : base;
}

export const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/produkt", element: <ProductDetailPage /> },
        { path: "/salon", element: <SalonPage /> },
        { path: "/salony", element: <SalonsPage /> },
        { path: "/salony-b", element: <SalonsPageB /> },
        { path: "/salony/:slug", element: <SalonPage /> },
        { path: "/producenci", element: <ProducersPage /> },
        { path: "/producent", element: <ProducerPage /> },
        { path: "/kategoria", element: <CategoryPage /> },
        { path: "/podkategoria", element: <SubcategoryPage /> },
        { path: "/listing", element: <ListingPage /> },
        {
          path: "/biblioteka",
          element: <LibraryLayout />,
          children: [
            { index: true, element: <LibraryIndexPage /> },
            { path: ":categorySlug", element: <LibraryCategoryPage /> },
          ],
        },
        { path: "/404", element: <NotFoundPage /> },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ],
  { basename: getRouterBasename() },
);
