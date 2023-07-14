import createContext from "@grucloud/bausaurus-core/context";
import { mountApp } from "@grucloud/bausaurus-core/utils.js";
import { createDocAppProp } from "@grucloud/bausaurus-theme-classic/DocApp.js";
import { App } from "./App.js";
import { navBarTree } from "./navBarTree.js";

const context = createContext({ window, config: { base: "/bau/bausaurus/" } });

const loadDocs = async () => {
  try {
    const DocApp = await App(context);
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
