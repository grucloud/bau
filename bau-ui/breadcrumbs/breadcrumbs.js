import classNames from "@grucloud/bau-css/classNames.js";

export default function (context) {
  const { bau, css } = context;
  const { ul, li, a, span } = bau.tags;

  const className = css`
    list-style: none;
    display: flex;
    align-items: center;
    & li {
      display: flex;
      align-items: center;
      font-size: 0.9rem;
      &::after {
        content: "\u3009";
        padding: 0.5rem;
      }
      &:last-child {
        &::after {
          content: "";
        }
      }
      > a,
      span {
        display: flex;
        text-decoration: none;
        border-radius: var(--global-radius);
        padding: 0.5rem;
        &:hover {
          background-color: var(--color-emphasis-100);
        }
      }
    }
  `;
  return function Breadcrumbs({ items, ...otherProps }) {
    return ul(
      {
        class: classNames(className, otherProps.class),
        "aria-label": "Breadcrumbs",
      },
      items.map(({ href, title }) => li((href ? a : span)({ href }, title)))
    );
  };
}
