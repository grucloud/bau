import Bau from "@grucloud/bau/bau.js";
import BauCss from "@grucloud/bau-css/bau-css.js";

export default function createContex({ window }) {
  const { document } = window;
  const bau = Bau({ document });
  const bauCss = BauCss({ document });
  return { bau, ...bauCss, window, tr: (x) => x };
}
