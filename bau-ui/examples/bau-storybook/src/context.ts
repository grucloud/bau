import Bau from "@grucloud/bau";
import BauCss from "@grucloud/bau-css";

export type Context = {
  bau: ReturnType<typeof Bau>;
  tr: (text: string) => string;
  window: Window;
} & ReturnType<typeof BauCss>;

export function createContext(extra = {}): Context {
  return {
    bau: Bau(),
    ...BauCss(),
    tr: (text: string) => text,
    window,
    ...extra,
  };
}
