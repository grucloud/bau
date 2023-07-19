import navBarMenu from "./navBarMenu";
import { pagesList } from "./pagesListData";

import loginExamples from "./pages/login.examples";

export default function (context) {
  const { tr, bau, css } = context;
  const { div, article, h1 } = bau.tags;
  const NavBarMenu = navBarMenu(context);

  return function PagesList() {
    return div(
      {
        class: css`
          grid-area: main;
          display: flex;
        `,
      },
      NavBarMenu({ componentList: pagesList(), name: "Pages" }),
      article(
        {
          class: css`
            grid-area: main;
            padding: 10px;
            margin-top: 20px;
            > section {
              padding: 10px;
              margin: 10px;
              box-shadow: var(--global-shadow-lw);
            }
          `,
        },
        h1(tr("Pages Examples")),
        loginExamples(context)()
      )
    );
  };
}
