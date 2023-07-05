import Bau from "@grucloud/bau";
import BauCss from "@grucloud/bau-css";
import docApp from "./DocApp";
import landingPage from "./LandingPage";
import { docPath, navBarTreeFile } from "./constants.js";

const getAppId = () => document.getElementById("app");
const mountApp = (el) => getAppId()?.replaceChildren(el);

const context = {
  bau: Bau(),
  ...BauCss(),
  tr: (text) => text,
  window,
};

const fetchNavBarTree = async () => {
  const res = await fetch(navBarTreeFile);
  const navBarTree = await res.json();
  return navBarTree;
};

const importNavBarTree = async () => {
  const navBarTree = await import(/* @vite-ignore */ navBarTreeFile);
  return navBarTree;
};

const pathFromLocation = (location) => {
  let pathname = location.pathname;
  return pathname.endsWith("/") ? `${pathname}index` : pathname;
};

const createDocAppProp = async () => {
  const mainEls = document.getElementsByTagName("main");
  if (mainEls[0]) {
    // Prod
    const navBarTree = await fetchNavBarTree();
    const tocEl = document.querySelector("nav[data-toc]");
    return {
      contentHtml: mainEls[0].innerHTML,
      toc: tocEl.dataset.toc,
      navBarTree,
    };
  } else {
    // Dev
    const navBarTree = await importNavBarTree();
    const pathname = pathFromLocation(location);
    // content and toc per page
    const { default: content } = await import(
      /* @vite-ignore */ `${pathname}.md`
    );
    const { contentHtml, toc } = content();
    return { contentHtml, toc, navBarTree };
  }
};

const loadDocs = async () => {
  try {
    const DocApp = docApp(context);
    const { contentHtml, toc, navBarTree } = await createDocAppProp();
    mountApp(
      DocApp({
        contentHtml,
        toc: JSON.parse(toc),
        navBarTree,
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
