import layout from "./Layout";
import createContext from "@grucloud/bausaurus-core/context";
import { mountApp } from "@grucloud/bausaurus-core/utils.js";

const context = createContext({ window });

const Layout = layout(context);
mountApp(Layout({}));
