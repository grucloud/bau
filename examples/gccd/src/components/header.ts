import { type Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import avatar from "@grucloud/bau-ui/avatar";
import breadcrumbsNav from "./breadcrumbsNav";

export default function (context: Context) {
  const { tr, bau, css, config, stores } = context;
  const { i, header, div, a, b } = bau.tags;
  const { svg, path } = bau.tagsNS("http://www.w3.org/2000/svg");
  // const drawerOpenState = states.drawerOpen;
  const { meQuery } = stores.auth;
  const BreadcrumbsNav = breadcrumbsNav(context);

  const Avatar = avatar(context, {
    class: css`
      > img {
        border-radius: 50%;
      }
    `,
  });

  const Button = button(context, {
    class: css`
      background: transparent;
    `,
  });

  const BurgerIcon = () => {
    return i(
      svg(
        {
          id: "burger-icon",
          version: "1.1",
          viewBox: "0 0 32 32",
          width: "40px",
          height: "40px",
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
        b(tr("GruCloud"))
      )
    );

  const NavBarRight = () =>
    div(
      {
        class: css`
          display: flex;
          padding: 1rem;
          align-items: center;
          font-size: small;
          font-weight: 500;
          color: var(--color-content-secondary);
        `,
      },
      () =>
        meQuery.data.val?.picture
          ? Avatar({
              src: meQuery.data.val.picture.url,
              alt: meQuery.data.val.email,
            })
          : meQuery.data.val?.email
    );

  return function headerNav() {
    meQuery.run();
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
          border-bottom: 1px solid var(--color-emphasis-100);
        `,
      },
      NavBarLeft(),
      BreadcrumbsNav(),
      NavBarRight()
    );
  };
}
