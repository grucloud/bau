import Bau from "@grucloud/bau";
import BauCss from "@grucloud/bau-css";

import globalStyle from "./globalStyle";

export function createContext(extra) {
  const bau = Bau();
  const bauCss = BauCss({ target: window.document.getElementById("bau-css") });
  globalStyle(bauCss);
  return {
    bau,
    ...bauCss,
    tr: (text) => text,
    window,
    ...extra,
  };
}
