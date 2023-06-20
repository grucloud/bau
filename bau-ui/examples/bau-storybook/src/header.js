//import drawer from "../../components/drawer";
import button from "@grucloud/bau-ui/button";
import navBarMenu from "./navBarMenu";

export default function (context) {
  const { tr, bau, css } = context;
  const { i, header, h1, div, a } = bau.tags;
  const { svg, path } = bau.tagsNS("http://www.w3.org/2000/svg");

  const drawerOpenState = bau.state(true);

  //const Drawer = drawer(context);
  const Button = button(context);
  const NavBarMenu = navBarMenu(context);

  const BurgerIcon = () => {
    return i(
      {
        class: css`
          color: var(--font-color-inverse);
        `,
      },
      svg(
        {
          id: "burger-icon",
          version: "1.1",
          viewBox: "0 0 32 32",
          width: "40px",
          height: "50px",
        },
        path({
          fill: "currentColor",
          d: "M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z",
        })
      )
    );
  };

  const AppBar = () =>
    div(
      {
        class: css`
          display: flex;
          justify-content: flex-start;
          align-items: center;
          background-color: var(--color-primary);
          color: var(--font-color-inverse);
        `,
      },
      Button(
        {
          "aria-label": "drawer",
          onclick: () => (drawerOpenState.val = !drawerOpenState.val),
        },
        BurgerIcon()
      ),
      h1(tr("Bau Components Story Book"))
    );

  return function headerNav() {
    return header(AppBar(), NavBarMenu());
  };
}
