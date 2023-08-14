import { pagesList } from "./pagesListData";

import loginExamples from "./pages/login.examples";

export default function (context) {
  const { tr, bau, css } = context;
  const { div, article, h1 } = bau.tags;

  return function PagesList() {
    return div(
      {
        class: css`
          grid-area: main;
          display: flex;
        `,
      },
      article(
        {
          class: css`
            grid-area: main;
            padding: 10px;
            margin-top: 20px;
            > section {
              padding: 10px;
              margin: 10px;
              box-shadow: var(--shadow-s);
            }
          `,
        },
        h1(tr("Pages Examples")),
        loginExamples(context)()
      )
    );
  };
}
