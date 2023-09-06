import button from "@grucloud/bau-ui/button";
import { type Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { tr, bau, css, config } = context;
  const { header, div, a, b, img } = bau.tags;

  const Button = button(context);

  const NavBarLeft = () =>
    div(
      {
        class: css`
          display: flex;
          align-items: center;
          gap: 0.5rem;
          & a {
            color: var(--color-inverse);
          }
        `,
      },
      img({ alt: "GruCloud", src: `${config.base}/gc.svg`, width: 28 }),
      a(
        {
          href: `${config.base}/`,
          class: css`
            text-decoration: none;
            font-size: x-large;
          `,
        },
        b(tr("GruCloud Platform"))
      )
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
      Button(
        {
          title: "GruCloud's Github",
          href: "login",
        },
        "Login"
      )
    );

  return function headerNav() {
    return header(
      {
        class: css`
          z-index: 2;
          position: sticky;
          top: 0;
          padding: 0 0.5rem;
          grid-area: header;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: var(--header-height);
          background-color: var(--background-color);
          border-bottom: 1px solid var(--color-emphasis-200);
        `,
      },
      NavBarLeft(),
      NavBarRight()
    );
  };
}
