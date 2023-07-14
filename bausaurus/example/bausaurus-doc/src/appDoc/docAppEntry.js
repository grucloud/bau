import { mountApp } from "@grucloud/bausaurus-core/utils.js";
import { createDocAppProp } from "@grucloud/bausaurus-theme-classic/DocApp.js";
import createContext from "../common/context.js";
import { App } from "./App.js";
import { navBarTree } from "./navBarTree.js";

const context = createContext();

const loadDocs = async () => {
  try {
    const DocApp = App(context);
    const props = await createDocAppProp({
      context,
    });
    mountApp(DocApp({ ...props, navBarTree }));
  } catch (error) {
    console.error("Error: ", error);
    console.error("pathname", location.pathname);
    // TODO display an error on screen
  }
};

loadDocs();
