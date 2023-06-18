//import Bau from "@grucloud/bau";
import Bau from "../../../../bau/src/bau";

import BauCss from "@grucloud/bau-css";

import { createTheme } from "./theme";

export function createContext(extra = {}) {
  return {
    bau: Bau(),
    ...BauCss(),
    tr: (text) => text,
    theme: createTheme({}),
    ...extra,
  };
}
