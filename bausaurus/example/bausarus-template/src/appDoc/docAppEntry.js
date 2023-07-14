import docApp, {
  createDocAppProp,
} from "@grucloud/bausaurus-theme-classic/DocApp.js";
import createContext from "@grucloud/bausaurus-core/context";
import { mountApp } from "@grucloud/bausaurus-core/utils.js";
import { navBarTree } from "./navBarTree.js";
import header from "../views/Header.js";
import footer from "../views/Footer.js";

const context = createContext({ window });

const loadDocs = async () => {
  try {
    const DocApp = await docApp(context, { header, footer });
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
