import header from "./header";
import footer from "./footer";
import navBarMenu from "./navBarMenu";

export const layoutDefault = (context) => {
  const { bau, css } = context;
  const { div } = bau.tags;

  const Header = header(context);
  const NavBarMenu = navBarMenu(context);

  const Footer = footer(context);
  // TODO use CSS var

  return function LayoutDefault({ component }) {
    return div(
      {
        class: css`
          display: grid;
          grid-template-columns: minmax(20%, 300px) auto;
          grid-template-areas:
            "header header"
            "sidebar main"
            "footer footer";
          min-height: 100vh;
          @media (max-width: 640px) {
            & nav {
              display: none;
            }
          }
        `,
      },
      Header(),
      NavBarMenu(),
      component(),
      Footer()
    );
  };
};
