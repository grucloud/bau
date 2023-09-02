import header from "./components/headerUnauthenticated";
import footer from "./components/footer";

import { type Context } from "@grucloud/bau-ui/context";

export default function layoutDefault(context: Context) {
  const { bau, css } = context;
  const { div } = bau.tags;

  const Header = header(context);
  const Footer = footer(context);

  return function LayoutUnauthenticated({ componentState }: any) {
    return div(
      {
        class: css`
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: auto 1fr auto;
          grid-template-areas:
            "header"
            "main"
            "footer";
          min-height: 100vh;
          min-width: 100vw;
        `,
      },
      Header(),
      div(
        {
          class: css`
            grid-area: main;
            margin: 1rem;
            display: grid;
            justify-content: center;
          `,
        },
        () => componentState.val
      ),
      Footer()
    );
  };
}
