import docApp from "./DocApp";
import landingPage from "./LandingPage";
import { docPath } from "./constants.js";
import createContext from "./context";
import { mountApp } from "./utils.js";
import { loadContent } from "./router";

const context = createContext({ window });

const importNavBarTree = async () => {
  const { navBarTree } = await import(/* @vite-ignore */ `./navBarTree.js`);
  return navBarTree;
};

const createDocAppProp = async ({ context }) => {
  const navBarTree = await importNavBarTree();

  const mainEls = document.getElementsByTagName("main");
  if (mainEls[0]) {
    // Prod
    const tocEl = document.querySelector("nav[data-toc]");
    const breadcrumbsEl = document.querySelector("ul[data-breadcrumbs]");
    const paginationNavEl = document.querySelector("nav[data-paginationnav]");

    return {
      contentHtml: mainEls[0].innerHTML,
      toc: JSON.parse(tocEl.dataset.toc),
      navBarTree,
      breadcrumbs: JSON.parse(breadcrumbsEl.dataset.breadcrumbs),
      paginationNav: JSON.parse(paginationNavEl.dataset.paginationnav),
    };
  } else {
    // Dev
    const content = await loadContent({
      nextPage: location.pathname,
      context,
    });

    return { ...content, navBarTree };
  }
};

const loadDocs = async () => {
  try {
    const DocApp = await docApp(context);
    const props = await createDocAppProp({
      context,
    });
    mountApp(DocApp(props));
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
