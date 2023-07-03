import Bau from "@grucloud/bau";
import BauCss from "@grucloud/bau-css";
import docApp from "./DocApp";
import landingPage from "./LandingPage";

console.log("start pathname", location.pathname);

// TODO
const docPath = "/docs";
const getAppId = () => document.getElementById("app");
const mountApp = (el) => getAppId()?.replaceChildren(el);

const context = {
  bau: Bau(),
  ...BauCss(),
  tr: (text) => text,
};

const createDocAppProp = async () => {
  const mainEls = document.getElementsByTagName("main");
  if (mainEls[0]) {
    // Prod
    const tocEl = document.querySelector("nav[data-toc]");
    const navBarTreeEl = document.querySelector("nav[data-navbar]");
    return {
      contentHtml: mainEls[0].innerHTML,
      toc: tocEl.dataset.toc,
      navBarTree: JSON.parse(navBarTreeEl.dataset.navbar),
    };
  } else {
    // Dev
    const pathname = location.pathname;
    // content and toc per page
    const { default: content } = await import(
      /* @vite-ignore */ `${pathname}.md`
    );
    const { contentHtml, toc } = content();

    // Nav Bar Tree
    const navBarTreeFile = `/navBarTree.json`;
    const { default: navBarTree } = await import(
      /* @vite-ignore */ navBarTreeFile
    );
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
