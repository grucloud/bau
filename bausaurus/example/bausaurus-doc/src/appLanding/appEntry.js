import layout from "./Layout";
import createContext from "../common/context.js";
import { mountApp } from "@grucloud/bausaurus-core/utils.js";

const context = createContext();

const Layout = layout(context);
mountApp(Layout({}));
