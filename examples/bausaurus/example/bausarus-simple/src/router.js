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
      ? `/assets${pathname}.md.${hash}.js`
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

const onLocationChange = async ({
  context,
  mainEl,
  tocEl,
  breadcrumbsEl,
  MainContent,
  Toc,
  BreadcrumbsDoc,
  nextPage,
}) => {
  const { window } = context;
  const { contentHtml, toc, frontmatter, breadcrumbs } = await loadContent({
    nextPage,
    context,
  });
  if (frontmatter) {
    frontmatter.title && (window.document.title = frontmatter.title);
    frontmatter.description &&
      (window.document.description = frontmatter.description);
  }
  mainEl.innerHTML = MainContent({ contentHtml }).innerHTML;
  tocEl.innerHTML = Toc({ toc }).innerHTML;
  breadcrumbsEl.innerHTML = BreadcrumbsDoc({ breadcrumbs }).innerHTML;
};

export const registerHistoryBack = ({
  context,
  mainEl,
  tocEl,
  breadcrumbsEl,
  Toc,
  MainContent,
  BreadcrumbsDoc,
}) => {
  const { window } = context;

  window.addEventListener("popstate", () =>
    onLocationChange({
      context,
      mainEl,
      tocEl,
      breadcrumbsEl,
      MainContent,
      Toc,
      BreadcrumbsDoc,
      nextPage: window.location.pathname,
    })
  );
};

export const onClickAnchor =
  ({
    context,
    mainEl,
    tocEl,
    breadcrumbsEl,
    MainContent,
    Toc,
    BreadcrumbsDoc,
  }) =>
  async (event) => {
    const { target } = event;
    const href = target.getAttribute("href");
    if (
      target.tagName === "A" &&
      href &&
      href.startsWith(docPath) &&
      !href.startsWith("http") &&
      !href.startsWith("#")
    ) {
      const nextPage = href.replace(".md", "");
      context.window.history.pushState({}, null, nextPage);
      event.preventDefault();
      onLocationChange({
        context,
        mainEl,
        tocEl,
        breadcrumbsEl,
        Toc,
        MainContent,
        BreadcrumbsDoc,
        nextPage,
      });
    }
  };
