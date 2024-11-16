import { toPropsAndChildren } from "@grucloud/bau/bau.js";

export default function (context, options = {}) {
  const { bau, css } = context;
  const { form } = bau.tags;

  const className = css`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    padding: 1rem;
    min-width: 350px;
    & > header {
      & h1 {
        font-size: 1.3rem;
      }
    }
    & section,
    article {
      display: inline-flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    &
      label:has(
        :is(
            input[type="text"],
            input[type="password"],
            input[type="email"],
            input[type="search"]
          )
      ),
    legend {
      display: inline-flex;
      flex-direction: column;
      gap: 0.3rem;
      font-weight: 500;
      font-size: smaller;
      color: var(--color-content-secondary);
    }
    & fieldset {
      border-radius: var(--global-radius);
    }
    & footer {
      display: flex;
      gap: 1rem;
    }
  `;

  return function Form(...args) {
    let [
      {
        size = options.size ?? "md",
        variant = options.variant ?? "plain",
        color = options.color ?? "neutral",
        content,
        ...props
      },
      children,
    ] = toPropsAndChildren(args);
    return form(
      {
        ...props,
        class: [
          "form",
          color,
          variant,
          size,
          className,
          options?.class,
          props?.class,
        ],
      },
      children
    );
  };
}
