import createContext from "@grucloud/bausaurus-core/context.js";

export default function () {
  return createContext({ window, config: { base: "/bau/bausaurus/" } });
}
