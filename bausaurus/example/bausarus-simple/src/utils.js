export const inBrowser = () => typeof document !== "undefined";
export const isProd = () => __BAUSAURUS_SITE_DATA__.prod;

export const pathFromLocation = (pathname) => {
  let path = pathname.endsWith("/") ? `${pathname}index` : pathname;
  return path.replace(window.location.origin, "");
};

const getAppId = () => document.getElementById("app");
export const mountApp = (el) => getAppId()?.replaceChildren(el);
