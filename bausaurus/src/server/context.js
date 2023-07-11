import Bau from "@grucloud/bau/bau.js";
import BauCss from "@grucloud/bau-css/bau-css.js";

export default function createContex({ window }) {
  const bau = Bau({ window });
  const bauCss = BauCss({ window });
  return { bau, ...bauCss, window, tr: (x) => x };
}
