import docApp from "./DocApp";
import landingPage from "./LandingPage";
import { docPath } from "./constants.js";
import createContext from "./context";
import { mountApp, isProd } from "./utils.js";
import { loadContent } from "./router";
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

const loadLandingPage = async () => {
  const LandingPage = landingPage(context);
  mountApp(LandingPage({}));
};

if (location.pathname.startsWith(docPath)) {
  loadDocs();
} else {
  loadLandingPage();
}