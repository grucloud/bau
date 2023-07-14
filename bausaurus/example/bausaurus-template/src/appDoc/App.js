import docApp from "@grucloud/bausaurus-theme-classic/DocApp.js";
import navBar from "@grucloud/bausaurus-theme-classic/NavBar.js";
import mainContent from "@grucloud/bausaurus-theme-classic/MainContent.js";
import toc from "@grucloud/bausaurus-theme-classic/Toc.js";
import breadcrumbsDoc from "@grucloud/bausaurus-theme-classic/BreadcrumbsDoc.js";
import createPaginationNav from "@grucloud/bausaurus-theme-classic/PaginationNav.js";
import pageNotFound from "@grucloud/bausaurus-theme-classic/NotFound.js";

import header from "../views/Header.js";
import footer from "../views/Footer.js";

export const App = (context) =>
  docApp(context, {
    header,
    navBar,
    breadcrumbsDoc,
    mainContent,
    toc,
    createPaginationNav,
    footer,
    pageNotFound,
  });
