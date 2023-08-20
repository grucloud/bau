export default function ({ tr, bau, css }) {
  const { section, footer, span, a, ul, li, p, div, h1 } = bau.tags;

  const FooterLinks = ({ links, title }) =>
    section(
      {
        class: css`
          & ul {
            list-style: none;
            padding-left: 0;
          }
          & h1 {
            font-size: medium;
            color: var(--color-content-secondary);
          }
          & a {
            text-decoration: none;
            color: var(--color-content-secondary);
            &:hover {
              text-decoration: underline;
            }
          }
        `,
      },
      h1(title),
      ul(links.map(({ href, name }) => li(a({ href }, name))))
    );

  const linksBauUi = [
    { href: "GettingStarted", name: "Getting Started" },
    { href: "components", name: "Component Gallery" },
  ];
  const linksBau = [
    {
      href: "https://github.com/grucloud/bau/tree/main",
      name: "bau: a 2Kb alternative to React/Vue/Svelte",
    },
    {
      href: "https://github.com/grucloud/bau/tree/main/bau-css",
      name: "bau-css: a CSS in JS library in 33 lines.",
    },
    {
      href: "https://github.com/grucloud/bau/tree/main/bau-ui",
      name: "bau-ui: UI Component library.",
    },
    {
      href: "https://github.com/grucloud/bau/tree/main/bau-router",
      name: "bau-router: a router for SPA.",
    },
  ];

  return function Footer() {
    return footer(
      {
        class: css`
          grid-area: footer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          color: var(--color-content-secondary);
        `,
      },
      div(
        {
          class: css`
            display: flex;
            justify-content: center;
            align-items: flex-start;
            gap: 10rem;
          `,
        },
        FooterLinks({ title: "Bau UI", links: linksBauUi }),
        FooterLinks({ title: "Bau Ecosystem", links: linksBau })
      ),
      div(
        {
          class: css`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
          `,
        },
        span(`v${__VERSION__}`),
        span("MIT license")
      )
    );
  };
}
