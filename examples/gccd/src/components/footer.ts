import { type Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { bau, css, config } = context;
  const { footer, span, a, ul, li, div, img } = bau.tags;

  const FooterLinks = ({ links }: any) =>
    ul(
      {
        class: css`
          list-style: none;
          padding-left: 0;
          margin: 0;
          & > li {
            display: inline-block;
            padding: 0.2rem;
            & img {
              filter: opacity(60%);
              &:hover {
                filter: none;
              }
            }
          }
        `,
      },
      links.map(({ href, name, src }: any) =>
        li(
          a(
            { href },
            img({ alt: name, height: "16", src: `${config.base}/${src}` })
          )
        )
      )
    );

  const links = [
    {
      href: "mailto:hello@grucloud.com",
      name: "Contact Us",
      src: "mail-line.svg",
    },
    {
      href: "https://github.com/grucloud/grucloud/issues",
      name: "Report an issue",
      src: "bug-line.svg",
    },
    {
      href: "https://twitter.com/grucloud_iac",
      name: "Twitter",
      src: "twitter-x-line.svg",
    },
  ];

  return function Footer() {
    return footer(
      {
        class: css`
          grid-area: footer;
          padding: 0.3rem;
          border-top: 1px solid var(--color-emphasis-100);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: var(--color-content-secondary);
          & a {
            text-decoration: none;
            color: var(--color-content-secondary);
            &:hover {
              text-decoration: underline;
            }
          }
        `,
      },
      div(
        {
          class: css`
            display: flex;
            align-items: flex-start;
            gap: 1rem;
          `,
        },
        FooterLinks({ links: links })
      ),
      div(
        {
          class: css`
            gap: 1rem;
          `,
        },
        span(`Copyright © ${new Date().getFullYear()} `),
        a({ href: "https://grucloud.com" }, "GruCloud")
      )
    );
  };
}
