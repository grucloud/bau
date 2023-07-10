import { hashMapFile, docPath } from "./constants.js";
import { inBrowser, pathFromLocation } from "./utils.js";
import pageNotFound from "./NotFound.js";

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
      ? `/assets${pathname}.md-${hash}.js`
      : `/assets${pathname}.md.js`;
  } catch (error) {
    return `${pathname}.md`;
  }
};

export const loadContent = async ({ nextPage, context }) => {
  try {
    const jsFile = jsAssetFileFromHref(nextPage);
    return import(/* @vite-ignore */ jsFile);
  } catch (error) {
    const PageNotFound = pageNotFound(context);
    return { contentHtml: PageNotFound().outerHTML, toc: "{}" };
  }
};

// "/docs/Introduction"  "./aws/AwsGettingStarted.md" => "/docs/aws/AwsGettingStarted.md"
const buildFromRelativePath = ({ location, href }) => {
  const relativeBaseUrl = location.pathname.split("/").slice(0, -1).join("/");
  return `${relativeBaseUrl}/${href.slice(2)}`;
};

export const createRouter = (context, { onLocationChange }) => {
  const { window } = context;

  window.addEventListener("popstate", () =>
    onLocationChange({
      nextPage: window.location.pathname,
    })
  );

  window.addEventListener("click", (event) => {
    const { target } = event;
    let href = target.getAttribute("href");
    if (href?.startsWith("./")) {
      href = buildFromRelativePath({ location, href });
    }
    if (
      target.tagName === "A" &&
      href &&
      href.startsWith(docPath) &&
      !href.startsWith("http") &&
      !href.startsWith("#")
    ) {
      let nextPage = href.replace(".md", "");
      context.window.history.pushState({}, null, nextPage);
      event.preventDefault();
      onLocationChange({
        nextPage,
      });
    }
  });
};
