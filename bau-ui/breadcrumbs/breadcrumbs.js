import classNames from "@grucloud/bau-css/classNames.js";

export default function (context) {
  const { bau, css } = context;
  const { ul, li, a, span } = bau.tags;

  const className = css`
    list-style: none;
    display: flex;
    align-items: center;
    padding-left: 0;
    margin-bottom: 0;
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
        "aria-label": "Breadcrumbs",
        ...otherProps,
        class: classNames(className, otherProps.class),
      },
      items.map(({ href, name }) => li((href ? a : span)({ href }, name)))
    );
  };
}
