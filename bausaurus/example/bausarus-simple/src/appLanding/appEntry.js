import layout from "./Layout";
import createContext from "../common/context";
import { mountApp } from "../common/utils.js";

const context = createContext({ window });

const Layout = layout(context);
mountApp(Layout({}));
