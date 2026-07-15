import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../components/routing/RootLayout";
import { LibraryLayout } from "../library/LibraryLayout";
import { LibraryCategoryPage, LibraryIndexPage } from "../routes/LibraryCategoryPage";
import { NotFoundPage } from "../routes/NotFoundPage";
import { ProductDetailPage } from "../routes/ProductDetailPage";

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
        { path: "/", element: <ProductDetailPage /> },
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
