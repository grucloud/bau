import { hashMapFile, docPath } from "./constants.js";
import { inBrowser, pathFromLocation, isProd } from "./utils.js";

let __BAUSAURUS_HASH_MAP__;

const jsAssetFileFromHref = ({ context, nextPage }) => {
  const pathname = pathFromLocation(nextPage);

  try {
    const hash = __BAUSAURUS_HASH_MAP__[pathname];
    return hash
      ? `${context.config.base}assets${pathname}.md-${hash}.js`
      : `/assets${pathname}.md.js`;
  } catch (error) {
    return `${pathname}.md`;
  }
};

export const loadContent = async ({ nextPage, context, pageNotFound }) => {
  try {
    const jsFile = jsAssetFileFromHref({ context, nextPage });
    return import(/* @vite-ignore */ jsFile);
  } catch (error) {
    const PageNotFound = pageNotFound(context);
    return { contentHtml: PageNotFound().outerHTML, toc: "{}" };
  }
};

export const createRouter = (context, { onLocationChange }) => {
  const { window, config } = context;

  const fetchHashMap = async () => {
    try {
      const res = await fetch(`${config.base}docs/hashmap.json`);
      const hashMap = await res.json();
      __BAUSAURUS_HASH_MAP__ = hashMap;
      return hashMap;
    } catch (error) {
      //console.log("fetchHashMap", error);
    }
  };

  inBrowser() && isProd() && fetchHashMap();

  window.addEventListener("popstate", () =>
    onLocationChange({
      nextPage: window.location.pathname,
    })
  );

  window.addEventListener("click", (event) => {
    const { target } = event;
    let href = target.getAttribute("href");
    if (
      target.tagName === "A" &&
      target.href.includes(docPath) &&
      href &&
      !href.startsWith("http") &&
      !href.startsWith("#")
    ) {
      // target.href contains the resolved path
      let nextPage = target.href.replace(".md", "");
      context.window.history.pushState({}, null, nextPage);
      window.scrollTo({
        top: 0,
        left: 0,
        //behavior: "smooth",
      });
      event.preventDefault();
      onLocationChange({
        nextPage,
      });
    }
  });
};
