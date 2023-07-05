export default function (context) {
  const { tr, bau, css } = context;
  const { header, div, a } = bau.tags;

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
            font-size: 1.3rem;
            color: var(--font-color-inverse);
            text-decoration: none;
            padding: 1rem 0.5rem;
          }
        `,
      },
      // TODO use baseUrl
      a({ class: "title", href: "/" }, tr("Bausaurus")),
      a({ href: "/docs/" }, tr("Doc"))
    );

  const NavBarRight = () =>
    a(
      {
        class: css`
          padding: 1rem;
          color: var(--font-color-inverse);
        `,
        target: "_blank",
        href: "https://github.com/grucloud/bau",
      },
      "GitHub"
      //TODO image
      // img({
      //   alt: "GitHub",
      //   src: "./github-mark-white.svg",
      //   width: 30,
      //   height: 30,
      // })
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
          background-color: var(--color-primary);
          color: var(--font-color-inverse);
        `,
      },
      NavBarLeft(),
      NavBarRight()
    );
  };
}
