import { isProd } from "@grucloud/bausaurus-core/utils.js";
import { createRouter, loadContent } from "@grucloud/bausaurus-core/router.js";
import { createStyles } from "@grucloud/bausaurus-core/style.js";

export default function (
  context,
  {
    header,
    navBar,
    breadcrumbsDoc,
    mainContent,
    toc,
    createPaginationNav,
    footer,
    pageNotFound,
  }
) {
  const { bau, css, window } = context;
  const { div } = bau.tags;

  const pathnameState = bau.state(window.location.pathname);

  createStyles(context);

  const Header = header(context);
  const NavBar = navBar(context);
  const BreadcrumbsDoc = breadcrumbsDoc(context);
  const MainContent = mainContent(context);
  const PaginationNav = createPaginationNav(context);
  const Toc = toc(context);

  const Footer = footer(context);

  const className = css`
    display: grid;
    grid-template-columns: minmax(15%, 250px) minmax(50%, 70%) minmax(20%, 30%);
    grid-template-rows: auto auto 1fr auto auto;
    grid-template-areas:
      "header header header"
      "navbar breadcrumbs toc"
      "navbar main toc"
      "navbar paginationnav toc"
      "footer footer toc";
    min-height: 100vh;
  `;

  return function DocApp({
    navBarTree = {},
    contentHtml,
    breadcrumbs,
    paginationNav = {},
  }) {
    const contentHtmlState = bau.state(contentHtml);
    const mainElState = bau.derive(() =>
      MainContent({ contentHtml: contentHtmlState.val })
    );

    const tocElState = bau.derive(() => Toc({ contentEl: mainElState.val }));

    const navBarEl = NavBar({
      tree: navBarTree,
      pathnameState,
    });

    const breadcrumbsState = bau.state(breadcrumbs);
    const breadcrumbsElState = bau.derive(() =>
      BreadcrumbsDoc({ breadcrumbs: breadcrumbsState.val })
    );

    const paginationNavState = bau.state(paginationNav);
    const paginationNavElState = bau.derive(() =>
      PaginationNav({ data: paginationNavState.val })
    );

    const onLocationChange = async ({ nextPage }) => {
      pathnameState.val = window.location.pathname;
      const { contentHtml, frontmatter, breadcrumbs, paginationNav } =
        await loadContent({
          nextPage,
          context,
          pageNotFound,
        });
      if (frontmatter) {
        frontmatter.title && (window.document.title = frontmatter.title);
        frontmatter.description &&
          (window.document.description = frontmatter.description);
      }
      contentHtmlState.val = contentHtml;
      breadcrumbsState.val = breadcrumbs;
      paginationNavState.val = paginationNav;
    };

    createRouter(context, { onLocationChange });
    return div(
      {
        class: className,
      },
      Header(),
      navBarTree && navBarEl,
      () => breadcrumbsElState.val,
      () => tocElState.val,
      () => mainElState.val,
      () => paginationNavElState.val,
      Footer()
    );
  };
}

export const createDocAppProp = async ({ context }) => {
  if (isProd()) {
    // Prod
    const mainEls = document.getElementsByTagName("main");
    const breadcrumbsEl = document.querySelector("ul[data-breadcrumbs]");
    const paginationNavEl = document.querySelector("nav[data-paginationnav]");
    return {
      contentHtml: mainEls[0].innerHTML,
      breadcrumbs: JSON.parse(breadcrumbsEl.dataset.breadcrumbs),
      paginationNav: JSON.parse(paginationNavEl.dataset.paginationnav),
    };
  } else {
    // Dev
    return loadContent({
      nextPage: location.pathname,
      context,
    });
  }
};
