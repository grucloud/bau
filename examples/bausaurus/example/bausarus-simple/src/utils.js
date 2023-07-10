export const inBrowser = () => typeof document !== "undefined";

export const pathFromLocation = (pathname) => {
  let path = pathname.endsWith("/") ? `${pathname}index` : pathname;
  return path.replace(window.location.origin, "");
};

const getAppId = () => document.getElementById("app");
export const mountApp = (el) => getAppId()?.replaceChildren(el);
