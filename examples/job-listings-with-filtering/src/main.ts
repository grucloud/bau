import { createContext, type Context } from "@grucloud/bau-ui/context";
import jobListing from "./jobListing";
import header from "./header";
import "./style.css";

const context = createContext();

const app = (context: Context) => {
  const { bau } = context;
  const { main, div } = bau.tags;
  const Header = header(context);
  const JobListing = jobListing(context);

  return function () {
    return div(Header(), main(JobListing()));
  };
};

const App = app(context);
document.getElementById("app")?.replaceChildren(App());
