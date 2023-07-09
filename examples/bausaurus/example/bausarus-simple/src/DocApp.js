import header from "./Header.js";
import navBar from "./NavBar.js";
import mainContent from "./MainContent.js";
import toc from "./Toc.js";
import footer from "./Footer.js";
import breadcrumbsDoc from "./BreadcrumbsDoc.js";
import createPaginationNav from "./PaginationNav.js";

import { createRouter, loadContent } from "./router.js";
import { createStyles } from "./style.js";

export default async function (context) {
  const { bau, css, window } = context;
  const { div } = bau.tags;

  createStyles(context);

  const Header = header(context);
  const NavBar = navBar(context);
  const BreadcrumbsDoc = breadcrumbsDoc(context);
  const MainContent = await mainContent(context);
  const PaginationNav = createPaginationNav(context);
  const Toc = toc(context);

  const Footer = footer(context);

  const className = css`
    display: grid;
    grid-template-columns: minmax(15%, 300px) minmax(50%, 70%) minmax(15%, 20%);
    grid-template-rows: auto auto 1fr auto auto;
    grid-template-areas:
      "header header header"
      "navbar breadcrumbs toc"
      "navbar main toc"
      "navbar paginationnav toc"
      "footer footer footer";
    min-height: 100vh;
  `;

  return function DocApp({
    navBarTree,
    contentHtml,
    breadcrumbs,
    toc,
    paginationNav,
  }) {
    const mainEl = MainContent({ contentHtml });
    const tocEl = Toc({ toc });
    const breadcrumbsEl = BreadcrumbsDoc({ breadcrumbs });
    const paginationNavEl = PaginationNav({ paginationNav });

    const onLocationChange = async ({ nextPage }) => {
      const { contentHtml, toc, frontmatter, breadcrumbs, paginationNav } =
        await loadContent({
          nextPage,
          context,
        });
      if (frontmatter) {
        frontmatter.title && (window.document.title = frontmatter.title);
        frontmatter.description &&
          (window.document.description = frontmatter.description);
      }
      mainEl.innerHTML = MainContent({ contentHtml }).innerHTML;
      tocEl.innerHTML = Toc({ toc }).innerHTML;
      breadcrumbsEl.innerHTML = BreadcrumbsDoc({ breadcrumbs }).innerHTML;
      paginationNavEl.innerHTML = PaginationNav({ paginationNav }).innerHTML;
    };

    createRouter(context, { onLocationChange });

    return div(
      {
        class: className,
      },
      Header(),
      navBarTree && NavBar({ tree: navBarTree }),
      breadcrumbs && breadcrumbsEl,
      mainEl,
      toc && tocEl,
      paginationNav && paginationNavEl,
      Footer()
    );
  };
}
