import Bau from "@grucloud/bau";
import BauCss from "@grucloud/bau-css";

import globalStyle from "./globalStyle";

export function createContext(extra) {
  const bau = Bau();
  const bauCss = BauCss();
  globalStyle(bauCss);
  return {
    bau,
    ...bauCss,
    tr: (text) => text,
    window,
    ...extra,
  };
}
