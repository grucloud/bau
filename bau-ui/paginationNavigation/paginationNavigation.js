import classNames from "@grucloud/bau-css/classNames.js";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";

export default function (context, options = {}) {
  const { bau, css, config } = context;
  const { div, a, span, nav } = bau.tags;

  const className = css`
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: grid;
    grid-area: paginationnav;
    gap: var(--spacing-horizontal);
    grid-template-columns: repeat(2, 1fr);
    & > a {
      padding: 0.5rem 1rem;
      text-decoration: none;
      border: 1px solid var(--color-emphasis-300);
      border-radius: var(--global-radius);
      transition: border-color var(--transition-slow);
      &:hover {
        border-color: var(--color-primary);
      }
      .sublabel {
        color: var(--color-content-secondary);
        font-size: 0.8rem;
        font-weight: var(--font-weight-semibold);
        margin-bottom: 0.25rem;
      }
      .label {
        color: var(--link-color);
        font-size: 1rem;
        font-weight: var(--font-weight-bold);
      }
      .Previous {
        &::before {
          content: "« ";
        }
      }
      .Next {
        &::after {
          content: " »";
        }
      }
    }
  `;

  const Link =
    ({ text }) =>
    ({ name, label, href }) =>
      a(
        { href: `${config.base}${href}` },
        span({ class: "sublabel" }, text),
        div({ class: `label ${text}` }, label ?? name)
      );

  return function PaginationNavigation(...args) {
    let [
      {
        size = options.size ?? "md",
        variant = options.variant ?? "plain",
        color = options.color ?? "neutral",
        data = {},
        ...props
      },
    ] = toPropsAndChildren(args);
    const { next, previous } = data;
    return nav(
      {
        "data-paginationnav": JSON.stringify(data),
        "aria-label": "pages navigation",
        ...props,
        class: classNames(
          "paginationNavigation",
          size,
          className,
          options?.class,
          props?.class
        ),
      },
      previous?.href && Link({ text: "Previous" })(previous),
      next?.href && Link({ text: "Next" })(next)
    );
  };
}
