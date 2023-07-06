import { hashMapFile } from "./constants.js";
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
      ? `/assets${pathname}.md.${hash}.js`
      : `/assets${pathname}.md.js`;
  } catch (error) {
    return `${pathname}.md`;
  }
};

export const loadContent = async ({ nextPage, context }) => {
  try {
    const jsFile = jsAssetFileFromHref(nextPage);
    const { contentHtml, toc, frontmatter } = await import(
      /* @vite-ignore */ jsFile
    );
    return { contentHtml, toc, frontmatter };
  } catch (error) {
    const PageNotFound = pageNotFound(context);
    return { contentHtml: PageNotFound().outerHTML, toc: "{}" };
  }
};

const onLocationChange = async ({
  window,
  mainEl,
  tocEl,
  Toc,
  nextPage,
  context,
}) => {
  const { contentHtml, toc, frontmatter } = await loadContent({
    nextPage,
    context,
  });
  frontmatter.title && (window.document.title = frontmatter.title);
  frontmatter.description &&
    (window.document.description = frontmatter.description);

  mainEl.innerHTML = contentHtml;
  tocEl.innerHTML = Toc({ toc }).innerHTML;
};

export const registerHistoryBack = ({ window, mainEl, tocEl, Toc }) => {
  window.addEventListener("popstate", () =>
    onLocationChange({ mainEl, tocEl, Toc, nextPage: location.pathname })
  );
};

export const onClickAnchor =
  ({ window, mainEl, tocEl, Toc }) =>
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
      onLocationChange({ window, mainEl, tocEl, Toc, nextPage });
    }
  };
