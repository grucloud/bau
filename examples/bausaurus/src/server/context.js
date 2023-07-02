import Bau from "@grucloud/bau/bau.js";
import BauCss from "@grucloud/bau-css/bau-css.js";

export default function createContex({ document }) {
  const bau = Bau({ document });
  const bauCss = BauCss({ document });
  return { bau, ...bauCss, tr: (x) => x };
}
