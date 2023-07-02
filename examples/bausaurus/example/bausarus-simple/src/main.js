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
    const tocEl = document.querySelector("nav[data-toc]");
    //const toc = JSON.parse(tocEl.dataset.toc);
    return {
      contentHtml: mainEls[0].innerHTML,
      toc: tocEl.dataset.toc,
    };
  } else {
    const pathname = location.pathname;
    const { default: content } = await import(
      /* @vite-ignore */ `${pathname}.md`
    );
    return content();
  }
};
const loadDocs = async () => {
  try {
    const DocApp = docApp(context);
    const { contentHtml, toc } = await createDocAppProp();
    mountApp(DocApp({ contentHtml, toc: JSON.parse(toc) }));
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
