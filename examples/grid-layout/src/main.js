import createContext from "./context";
import layout from "./Layout";

const context = createContext();

const Layout = layout(context);

document.getElementById("app")?.replaceChildren(Layout());
