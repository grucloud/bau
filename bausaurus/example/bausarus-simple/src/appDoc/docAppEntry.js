import docApp from "./DocApp";
import createContext from "../common/context";
import { mountApp, isProd } from "../common/utils.js";
import { loadContent } from "../common/router";
import { navBarTree } from "./navBarTree.js";

const context = createContext({ window });

const createDocAppProp = async ({ context }) => {
  if (isProd()) {
    // Prod
    const mainEls = document.getElementsByTagName("main");
    const tocEl = document.querySelector("nav[data-toc]");
    const breadcrumbsEl = document.querySelector("ul[data-breadcrumbs]");
    const paginationNavEl = document.querySelector("nav[data-paginationnav]");
    return {
      contentHtml: mainEls[0].innerHTML,
      toc: JSON.parse(tocEl.dataset.toc),
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

const loadDocs = async () => {
  try {
    const DocApp = await docApp(context);
    const props = await createDocAppProp({
      context,
    });
    mountApp(DocApp({ ...props, navBarTree }));
  } catch (error) {
    console.error("Error: ", error);
    console.error("pathname", location.pathname);
    // TODO display an error on screen
  }
};

loadDocs();
