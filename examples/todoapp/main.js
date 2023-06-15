import "./style.css";
import Bau from "@grucloud/bau";

import app from "./src/app";

const bau = Bau();

const appDom = document.getElementsByClassName("todoapp")[0];
appDom.replaceChildren(app({ bau })());
