//import drawer from "../../components/drawer";
import button from "@grucloud/bau-ui/button";
import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";

export default function (context) {
  const { tr, bau, css, config, states } = context;
  const { i, header, h1, div, a, img, b, ul, li } = bau.tags;
  const { svg, path } = bau.tagsNS("http://www.w3.org/2000/svg");
  const drawerOpenState = states.drawerOpen;

  const Button = button(context, {
    class: css`
      background: transparent;
    `,
  });

  const ThemeSwitch = createThemeSwitch(context);

  const BurgerIcon = () => {
    return i(
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
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `,
      },
      Button(
        {
          "aria-label": "drawer",
          variant: "none",
          color: "none",
          onclick: () => (drawerOpenState.val = !drawerOpenState.val),
        },
        BurgerIcon()
      ),
      a(
        {
          href: `${config.base}/`,
          class: css`
            text-decoration: none;
            font-size: x-large;
          `,
        },
        b(tr("Bau UI"))
      )
      // ul(
      //   [
      //     { label: "Components", href: `${config.base}/components` },
      //     { label: "Pages", href: `${config.base}/pages` },
      //   ].map(({ href, label }) =>
      //     li(
      //       {
      //         class: css`
      //           display: inline;
      //           list-style: none;
      //           text-decoration: none;
      //           padding: 0.5rem;
      //         `,
      //       },
      //       a(
      //         {
      //           href,
      //           class: css`
      //             text-decoration: none;
      //           `,
      //         },
      //         label
      //       )
      //     )
      //   )
      // )
    );

  const NavBarRight = () =>
    div(
      {
        class: css`
          display: flex;
          padding: 1rem;
          align-items: center;
        `,
      },
      ThemeSwitch(),
      Button(
        {
          class: css``,
          target: "_blank",
          href: "https://github.com/grucloud/bau",
          title: "Bau's Github",
        },
        img({
          class: css`
            border-radius: 50%;
            background: black;
          `,
          alt: "GitHub",
          src: `${config.base}/github-mark-white.svg`,
          width: 30,
          height: 30,
        })
      )
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
          height: var(--header-height);
          background-color: var(--background-color);
        `,
      },
      NavBarLeft(),
      NavBarRight()
    );
  };
}
