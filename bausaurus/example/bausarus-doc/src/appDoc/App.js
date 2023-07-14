import docApp from "@grucloud/bausaurus-theme-classic/DocApp.js";
import header from "../views/Header.js";
import footer from "../views/Footer.js";

export const App = (context) => docApp(context, { header, footer });
