import { type Context } from "@grucloud/bau-ui/context";

const LINKS = [
  { text: "Collection", href: "collection" },
  { text: "Men", href: "men" },
  { text: "Women", href: "women" },
  { text: "About", href: "about" },
  { text: "Contact", href: "contact" },
];

export const navLink = (context: Context) => {
  const { bau, css } = context;
  const { a, ul, li, nav } = bau.tags;
  const className = css`
    & ul {
      display: flex;
      list-style: none;
      > li {
        & a {
          text-decoration: none;
        }
      }
    }
  `;
  return (props: any) =>
    nav(
      { class: className, ...props },
      ul(LINKS.map(({ text, href }) => li(a({ href }, text))))
    );
};
