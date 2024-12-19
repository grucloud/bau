import { type Context } from "@grucloud/bau-ui/context";

const HEADERS = ["Home", "New", "Popular", "Trending", "Categories"];

export default function (context: Context) {
  const { bau, css } = context;
  const { article, nav, ul, li, header, h1, a } = bau.tags;

  const className = css`
    display: grid;
    gap: 0.5rem;
    margin-inline: auto;
    padding: 1rem;
    max-width: 800px;
    > header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      h1 {
        font-size: 2rem;
        font-weight: 800;
      }
    }
  `;

  const Nav = () =>
    nav(
      {
        class: css`
          > ul {
            list-style: none;
            display: inline-flex;
            gap: 0.7rem;
            > li {
              font-size: 0.8rem;
              > a {
                text-decoration: none;
                color: var(--color-gray-500);
                &:hover {
                  color: var(--soft-orange);
                }
              }
            }
          }
        `,
      },
      ul(HEADERS.map((h) => li(a({ href: `${h}` }, h))))
    );

  return () => {
    return article({ class: className }, header(h1("W."), Nav()));
  };
}
