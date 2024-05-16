import { createContext } from "@grucloud/bau-ui/context";
import exchangeRate from "./exchangeRate";

const context = createContext();

const ExchangeRate = exchangeRate(context);
document.getElementsByTagName("body")[0].replaceWith(ExchangeRate());
