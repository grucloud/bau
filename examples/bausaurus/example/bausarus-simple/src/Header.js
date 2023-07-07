export default function (context) {
  const { tr, bau, css } = context;
  const { header, div, a, img } = bau.tags;

  const NavBarLeft = () =>
    div(
      {
        class: css`
          grid-area: header;
          display: flex;
          align-items: center;
          & .title {
            font-weight: var(--font-weight-bold);
          }
          & a {
            color: var(--font-color);
            text-decoration: none;
            padding: 1rem 0.5rem;
          }
          > img {
            padding: 0.5rem;
          }
        `,
      },
      img({
        alt: "GruCloud",
        src: "/grucloud.svg",
        width: 30,
        height: 30,
      }),
      a({ class: "title", href: "/" }, tr("Bausaurus")),
      a({ href: "/docs/" }, tr("Docs"))
    );

  const NavBarRight = () =>
    a(
      {
        class: css`
          padding-right: 1rem;
          color: var(--font-color-inverse);
        `,
        target: "_blank",
        href: "https://github.com/grucloud/bau",
        title: "GitHub",
      },
      img({
        alt: "GitHub",
        src: "/github.svg",
        width: 30,
        height: 30,
      })
    );

  return function Header() {
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
          box-shadow: var(--global-shadow-lw);
          background-color: var(--background-color);
        `,
      },
      NavBarLeft(),
      NavBarRight()
    );
  };
}
