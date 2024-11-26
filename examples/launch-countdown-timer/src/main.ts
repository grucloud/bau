import { createContext } from "@grucloud/bau-ui/context";
import launchCountDown from "./launchCountDown";

const context = createContext();

const LaunchCountDown = launchCountDown(context);
document.getElementsByTagName("body")[0].replaceWith(LaunchCountDown());
