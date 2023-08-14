import Bau from "@grucloud/bau";
import BauCss from "@grucloud/bau-css";

export type Context = {
  bau: ReturnType<typeof Bau>;
  tr: (text: string) => string;
  window: Window;
  config?: any;
  states?: any;
} & ReturnType<typeof BauCss>;

export function createContext({ config }: any): Context {
  const bau = Bau();
  return {
    bau,
    ...BauCss(),
    tr: (text: string) => text,
    window,
    states: {
      pathname: bau.state(window.location.pathname.replace(config.base, "")),
    },
    config,
  };
}
