import header from "./Header.js";
import navBar from "./NavBar.js";
import footer from "./Footer.js";
import toc from "./Toc.js";

import globalStyle from "@grucloud/bau-ui/globalStyle/globalStyle.js";

export default function (context) {
  const { bau, css, createGlobalStyles } = context;
  const { div, main } = bau.tags;
  globalStyle(context);

  createGlobalStyles`
img  {
  width: 100%;
}`;

  const Header = header(context);
  const NavBar = navBar(context);
  const Footer = footer(context);
  const Toc = toc(context);

  const Main = ({ contentHtml }) => {
    const el = main({
      class: css`
        grid-area: main;
        margin: 1rem;
      `,
    });
    el.innerHTML = contentHtml;
    return el;
  };

  return function DocApp({ contentHtml, toc }) {
    return div(
      {
        class: css`
          display: grid;
          grid-template-columns: minmax(15%, 300px) minmax(50%, 70%) minmax(
              15%,
              20%
            );
          grid-template-rows: auto 1fr auto;
          grid-template-areas:
            "header header header"
            "navbar main toc"
            "footer footer footer";
        `,
      },
      Header(),
      NavBar(),
      Main({ contentHtml }),
      Toc({ toc }),
      Footer()
    );
  };
}
