import landingPage from "./LandingPage";
import createContext from "../common/context";
import { mountApp } from "../common/utils.js";

const context = createContext({ window });

const LandingPage = landingPage(context);
mountApp(LandingPage({}));
