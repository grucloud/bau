import Bau from "@grucloud/bau";
import BauCss from "@grucloud/bau-css";

const { css, keyframes } = BauCss();
import { createTheme } from "./theme";

export function createContext(extra = {}) {
  return {
    bau: Bau(),
    css,
    keyframes,
    tr: (text) => text,
    theme: createTheme({}),
    ...extra,
  };
}
