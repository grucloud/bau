import Bau from "@grucloud/bau";
import BauCss from "@grucloud/bau-css";

export function createContext(extra = {}) {
  return {
    bau: Bau(),
    ...BauCss(),
    tr: (text) => text,
    ...extra,
  };
}
