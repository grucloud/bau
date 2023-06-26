import header from "./Header.js";
import navBar from "./NavBar.mjs";
import footer from "./Footer.mjs";
import toc from "./Toc.mjs";

import globalStyle from "@grucloud/bau-ui/globalStyle/globalStyle.js";

export default function (context) {
  const { bau, css, createGlobalStyles } = context;
  const { body, main } = bau.tags;
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
    el.innerHTML = contentHtml.value;
    return el;
  };

  return function ({ contentHtml, toc }) {
    return body(
      {
        class: css`
          display: grid;
          justify-content: space-between;
          grid-template-columns: minmax(15%, 300px) minmax(50%, 70%) minmax(
              20%,
              350px
            );
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
