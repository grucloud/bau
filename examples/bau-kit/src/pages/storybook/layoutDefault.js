import { css } from "goober";

import header from "./header";
import { footer } from "./footer";

export const layoutDefault = (context) => {
  const { bau } = context;
  const { div } = bau.tags;
  const Header = header(context);
  const Footer = footer(context);

  return function LayoutDefault({ component }) {
    return div(
      {
        class: css`
          display: grid;
          grid-template-columns: 180px 1fr;
          grid-template-rows: 60px 1fr;

          > header {
            grid-row: 1;
            grid-column: 1 / 3;
            z-index: 2;
            position: sticky;
            top: 0;
          }

          @media (max-width: ${context.theme.breakpoints.values.sm}) {
            nav {
              visibility: hidden;
            }
            main {
              grid-column: 1 / 3;
            }
          }
        `,
      },
      Header(),
      component()
      //  Footer()
    );
  };
};
