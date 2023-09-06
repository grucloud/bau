//import animate from "@grucloud/bau-ui/animate";

import header from "./components/header";
import footer from "./components/footer";
import navBarMenu from "./components/navbarMenu";

import { type Context } from "@grucloud/bau-ui/context";

export const layoutDefault = (context: Context) => {
  const { bau, css } = context;
  const { div } = bau.tags;

  // const Animate = animate(context);
  const Header = header(context);
  const NavBarMenu = navBarMenu(context);
  const Footer = footer(context);

  // const fadeIn = keyframes`
  //   from {
  //     opacity: 1;
  //   }
  //   to {
  //     opacity: 0;
  //   }
  // `;

  //const animation = (reverse = "") => `${fadeIn} ease-in-out 0.5s ${reverse}`;

  return function LayoutDefault({ componentState }: any) {
    return div(
      {
        class: css`
          display: grid;
          grid-template-columns: auto 1fr;
          grid-template-rows: auto 1fr auto;
          grid-template-areas:
            "header header"
            "navbar main"
            "footer footer";
          min-height: 100vh;
          min-width: 100vw;
        `,
      },
      Header(),
      NavBarMenu(),
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
      // Animate(
      //   {
      //     class: css`
      //       grid-area: main;
      //       margin: 1rem;
      //       display: grid;
      //       justify-content: center;
      //     `,
      //     animationHide: () => animation(),
      //     animationShow: () => animation("reverse"),
      //   },
      //   () => componentState.val
      // ),
      Footer()
    );
  };
};
