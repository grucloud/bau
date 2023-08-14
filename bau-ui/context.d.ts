import Bau from "@grucloud/bau";
import BauCss from "@grucloud/bau-css";

export type Context = {
  bau: ReturnType<typeof Bau>;
  tr: (text: string) => string;
  window: Window;
  config?: any;
  states?: any;
} & ReturnType<typeof BauCss>;

export function createContext(input?: any): Context;
