export const inBrowser = () => typeof document !== "undefined";

export const pathFromLocation = (pathname) => {
  return pathname.endsWith("/") ? `${pathname}index` : pathname;
};

const getAppId = () => document.getElementById("app");
export const mountApp = (el) => getAppId()?.replaceChildren(el);
