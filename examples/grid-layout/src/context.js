import Bau from "@grucloud/bau";
import BauCss from "@grucloud/bau-css";

export default function createContext() {
  return {
    bau: Bau(),
    ...BauCss(),
  };
}
