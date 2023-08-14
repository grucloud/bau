import header from "./header";
import footer from "./footer";
import navBarMenu from "./navBarMenu";

export const layoutDefault = (context) => {
  const { bau, css } = context;
  const { div } = bau.tags;

  const Header = header(context);
  const NavBarMenu = navBarMenu(context);
  const Footer = footer(context);

  return function LayoutDefault({ componentState }) {
    return div(
      {
        class: css`
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-columns: minmax(15%, 200px) minmax(50%, 85%);
          grid-template-areas:
            "header header"
            "sidebar main"
            "footer footer";
          min-height: 100vh;
          min-width: 100vw;
          @media (max-width: 640px) {
            & nav {
              display: none;
            }
          }
        `,
      },
      Header(),
      NavBarMenu(),
      () => {
        return componentState.val && componentState.val({});
      },
      Footer()
    );
  };
};
