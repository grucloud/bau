//import Bau from "@grucloud/bau";
import Bau from "../../../../bau/src/bau";

import { createTheme } from "./theme";

export function createContext(extra = {}) {
  return {
    bau: Bau(),
    tr: (text) => text,
    theme: createTheme({}),
    ...extra,
  };
}
