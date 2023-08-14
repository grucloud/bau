import Bau from "@grucloud/bau";
import BauCss from "@grucloud/bau-css";

export function createContext(extra) {
  const bau = Bau();
  return {
    bau,
    ...BauCss(),
    tr: (text) => text,
    window,
    ...extra,
  };
}
