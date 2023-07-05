import { hashMapFile } from "./constants.js";
import { inBrowser, pathFromLocation } from "./utils.js";

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
  const pathname = pathFromLocation(href);

  try {
    const hash = __BAUSAURUS_HASH_MAP__[pathname];
    return hash
      ? `/assets${pathname}.md.${hash}.js`
      : `/assets${pathname}.md.js`;
  } catch (error) {
    return `${pathname}.md`;
  }
};

const onLocationChange = async ({ mainEl, tocEl, Toc, nextPage }) => {
  const jsFile = jsAssetFileFromHref(nextPage);
  const { default: content } = await import(/* @vite-ignore */ jsFile);
  const { contentHtml, toc } = content();
  mainEl.innerHTML = contentHtml;
  tocEl.innerHTML = Toc({ toc: JSON.parse(toc) }).innerHTML;
};

export const registerHistoryBack = ({ window, mainEl, tocEl, Toc }) => {
  window.addEventListener("popstate", () =>
    onLocationChange({ mainEl, tocEl, Toc, nextPage: location.pathname })
  );
};

export const onClickAnchor =
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
