import layout from "./Layout";
import createContext from "@grucloud/bausaurus-core/context";
import { mountApp } from "@grucloud/bausaurus-core/utils.js";

//TODO
const context = createContext({ window, config: { base: "/bau/bausaurus/" } });

const Layout = layout(context);
mountApp(Layout({}));
