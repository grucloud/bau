import header from "./Header.js";
import footer from "./Footer.js";

import globalStyle from "@grucloud/bau-ui/globalStyle/globalStyle.js";

export default function (context) {
  const { bau, css, createGlobalStyles } = context;
  const { div, main } = bau.tags;
  globalStyle(context);

  createGlobalStyles`
img  {
  max-width: 100%;
}`;

  const Header = header(context);
  const Footer = footer(context);

  const Main = ({}) => div("Main");

  return function LandingPage({}) {
    return div(
      {
        class: css`
          display: grid;
          justify-content: space-between;
          grid-template-columns: minmax(15%, 300px) minmax(50%, 70%) minmax(
              20%,
              350px
            );
          grid-template-rows: auto 1fr auto;
          grid-template-areas:
            "header header header"
            "navbar main toc"
            "footer footer footer";
          min-height: 100vh;
        `,
      },
      Header(),
      Main({}),
      Footer()
    );
  };
}
