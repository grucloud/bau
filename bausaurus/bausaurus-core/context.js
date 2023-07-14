import Bau from "@grucloud/bau/bau.js";
import BauCss from "@grucloud/bau-css/bau-css.js";

export default function createContext({ window, config }) {
  const { document } = window;
  const bau = Bau({ window });
  const bauCss = BauCss({ window });
  return { bau, ...bauCss, window, config, tr: (x) => x };
}
