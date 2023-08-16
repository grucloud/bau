import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import classNames from "@grucloud/bau-css/classNames.js";
import button from "../button/button.js";

export default function (context, options) {
  const { bau, css } = context;
  const { ul, li, a, span } = bau.tags;

  const Button = button(context);

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

  return function Breadcrumbs(...args) {
    let [
      { color, variant = "outline", size = "md", items, ...props },
      ...children
    ] = toPropsAndChildren(args);
    return ul(
      {
        ...props,
        // color,
        // variant,
        // size,
        class: classNames(className, options?.class, props?.class),
      },
      items.map(({ href, name }) =>
        li(
          (href ? Button : span)(
            {
              href,
              color,
              variant,
              size,
              class: classNames(color, variant, size),
            },
            name
          )
        )
      )
    );
  };
}
