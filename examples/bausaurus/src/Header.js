//import drawer from "../../components/drawer";
import button from "@grucloud/bau-ui/button/button.js";

export default function (context) {
  const { tr, bau, css } = context;
  const { i, header, span, div, a, img } = bau.tags;
  const { svg, path } = bau.tagsNS("http://www.w3.org/2000/svg");

  const drawerOpenState = bau.state(true);

  //const Drawer = drawer(context);
  const Button = button(context);

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

  const NavBarLeft = () =>
    div(
      {
        class: css`
          grid-area: header;
          display: flex;
          align-items: center;
          & .title {
            font-weight: var(--font-weight-bold);
            font-size: 2rem;
          }
        `,
      },
      Button(
        {
          "aria-label": "drawer",
          onclick: () => (drawerOpenState.val = !drawerOpenState.val),
        },
        BurgerIcon()
      ),
      span({ class: "title" }, tr("Bausaurus"))
    );

  const NavBarRight = () =>
    a(
      {
        class: css`
          padding: 1rem;
        `,
        target: "_blank",
        href: "https://github.com/grucloud/bau",
      },
      img({
        alt: "GitHub",
        src: "./github-mark-white.svg",
        width: 30,
        height: 30,
      })
    );

  return function headerNav() {
    return header(
      {
        class: css`
          z-index: 2;
          position: sticky;
          top: 0;
          grid-area: header;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: var(--color-primary);
          color: var(--font-color-inverse);
        `,
      },
      NavBarLeft(),
      NavBarRight()
    );
  };
}
