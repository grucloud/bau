import docApp from "./DocApp";
import landingPage from "./LandingPage";
import { docPath, navBarTreeFile } from "./constants.js";
import createContext from "./context";
import { mountApp } from "./utils.js";
import { loadContent } from "./router";

const context = createContext({ window });

const fetchNavBarTree = async () => {
  const res = await fetch(navBarTreeFile);
  const navBarTree = await res.json();
  return navBarTree;
};

const importNavBarTree = async () => {
  const navBarTree = await import(/* @vite-ignore */ navBarTreeFile);
  return navBarTree;
};

const createDocAppProp = async ({ context }) => {
  const mainEls = document.getElementsByTagName("main");
  if (mainEls[0]) {
    // Prod
    const navBarTree = await fetchNavBarTree();
    const tocEl = document.querySelector("nav[data-toc]");
    const breadcrumbsEl = document.querySelector("ul[data-breadcrumbs]");

    return {
      contentHtml: mainEls[0].innerHTML,
      toc: JSON.parse(tocEl.dataset.toc),
      navBarTree,
      breadcrumbs: JSON.parse(breadcrumbsEl.dataset.breadcrumbs),
    };
  } else {
    // Dev
    const navBarTree = await importNavBarTree();
    const { contentHtml, toc, breadcrumbs } = await loadContent({
      nextPage: location.pathname,
      context,
    });

    return { contentHtml, toc, navBarTree, breadcrumbs };
  }
};

const loadDocs = async () => {
  try {
    const DocApp = await docApp(context);
    const { contentHtml, toc, navBarTree, breadcrumbs } =
      await createDocAppProp({
        context,
      });
    mountApp(
      DocApp({
        contentHtml,
        toc,
        navBarTree,
        breadcrumbs,
      })
    );
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
