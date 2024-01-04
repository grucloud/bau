import { createContext } from "@grucloud/bau-ui/context";
import newYearCountDown from "./newYearCountDown";

const context = createContext();

const NewYearCountDown = newYearCountDown(context);
document.getElementsByTagName("body")[0].replaceWith(NewYearCountDown());
