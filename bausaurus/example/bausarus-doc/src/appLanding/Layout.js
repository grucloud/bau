import globalStyle from "@grucloud/bau-ui/globalStyle/globalStyle.js";

import header from "../views/Header.js";
import footer from "../views/Footer.js";
import landingPage from "./LandingPage.js";

export default function (context) {
  const { bau, css, createGlobalStyles } = context;
  const { div } = bau.tags;
  globalStyle(context);

  createGlobalStyles`
img  {
  max-width: 100%;
}`;

  const className = css`
    display: grid;
    justify-content: space-between;
    grid-template-columns: minmax(15%, 300px) minmax(50%, 70%) minmax(
        20%,
        350px
      );
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      "header header header"
      "main main main"
      "footer footer footer";
    min-height: 100vh;
  `;

  const Header = header(context);
  const Footer = footer(context);

  const LandingPage = landingPage(context);

  return function Layout({}) {
    return div(
      {
        class: className,
      },
      Header(),
      LandingPage({}),
      Footer()
    );
  };
}
