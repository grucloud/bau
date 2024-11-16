import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import button from "../button/button.js";

export default function (context, options = {}) {
  const { bau, css, config } = context;
  const { ul, li, span } = bau.tags;
  const { separator = "\u3009" } = options;
  const Button = button(context);

  const className = css`
    list-style: none;
    display: flex;
    align-items: center;
    padding-left: 0;
    margin: 0;
    & li {
      display: flex;
      align-items: center;
      font-size: 0.9rem;
      &::after {
        content: "${separator}";
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
      {
        size = options.size ?? "md",
        variant = options.variant ?? "plain",
        color = options.color ?? "neutral",
        items,
        ...props
      },
      children,
    ] = toPropsAndChildren(args);
    return ul(
      {
        ...props,
        class: [className, options?.class, props?.class],
      },
      items.map(({ href, name }) =>
        li(
          (href != undefined ? Button : span)(
            {
              href: `${config.base}${href}`,
              color,
              variant,
              size,
              class: [color, variant, size],
            },
            name
          )
        )
      )
    );
  };
}
