import globalStyle from "@grucloud/bau-ui/globalStyle/globalStyle.js";
import header from "./Header.js";
import navBar from "./NavBar.js";
import footer from "./Footer.js";
import toc from "./Toc.js";

import { hashMapFile } from "./constants.js";
import { inBrowser } from "./utils.js";

let __BAUSAURUS_HASH_MAP__;

const fetchHashMap = async () => {
  try {
    const res = await fetch(hashMapFile);
    const hashMap = await res.json();
    __BAUSAURUS_HASH_MAP__ = hashMap;
    return hashMap;
  } catch (error) {
    //console.log("fetchHashMap", error);
  }
};

inBrowser() && fetchHashMap();

const jsAssetFileFromHref = (href) => {
  try {
    const hash = __BAUSAURUS_HASH_MAP__[href];
    return hash ? `/assets${href}.md.${hash}.js` : `/assets${href}.md.js`;
  } catch (error) {
    return `${href}.md`;
  }
};

const onLocationChange = async ({ mainEl, tocEl, Toc, nextPage }) => {
  const jsFile = jsAssetFileFromHref(nextPage);
  const { default: content } = await import(/* @vite-ignore */ jsFile);
  const { contentHtml, toc } = content();
  mainEl.innerHTML = contentHtml;
  tocEl.innerHTML = Toc({ toc: JSON.parse(toc) }).innerHTML;
};

const registerHistoryBack = ({ mainEl, tocEl, Toc }) => {
  window.addEventListener("popstate", (event) =>
    onLocationChange({ mainEl, tocEl, Toc, nextPage: location.pathname })
  );
};

const onClickAnchor =
  ({ mainEl, tocEl, Toc }) =>
  async (event) => {
    const { target } = event;
    const href = target.getAttribute("href");

    if (
      target.tagName === "A" &&
      href &&
      !href.startsWith("http") &&
      !href.startsWith("#")
    ) {
      const nextPage = href.replace(".md", "");

      history.pushState({}, null, nextPage);
      event.preventDefault();
      onLocationChange({ mainEl, tocEl, Toc, nextPage });
    }
  };

export default function (context) {
  const { bau, css, createGlobalStyles } = context;
  const { div, main } = bau.tags;

  globalStyle(context);

  createGlobalStyles`
img  {
  width: 100%;
}`;

  const Header = header(context);
  const NavBar = navBar(context);
  const Footer = footer(context);
  const Toc = toc(context);

  const Main = ({ contentHtml }) => {
    const el = main({
      class: css`
        grid-area: main;
        margin: 1rem;
      `,
    });
    el.innerHTML = contentHtml;
    return el;
  };

  return function DocApp({ navBarTree, contentHtml, toc }) {
    const mainEl = Main({ contentHtml });
    const tocEl = Toc({ toc });

    registerHistoryBack({ mainEl, tocEl, Toc });

    return div(
      {
        class: css`
          display: grid;
          grid-template-columns: minmax(15%, 300px) minmax(50%, 70%) minmax(
              15%,
              20%
            );
          grid-template-rows: auto 1fr auto;
          grid-template-areas:
            "header header header"
            "navbar main toc"
            "footer footer footer";
          min-height: 100vh;
        `,
        onclick: onClickAnchor({ mainEl, tocEl, Toc }),
      },
      Header(),
      NavBar({ tree: navBarTree }),
      mainEl,
      tocEl,
      Footer()
    );
  };
}
