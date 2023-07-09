export default function (context) {
  const { bau, css } = context;
  const { div, a, span, nav } = bau.tags;

  const Link =
    ({ text }) =>
    ({ name, href }) =>
      a(
        { href },
        span({ class: "sublabel" }, text),
        div({ class: `label ${text}` }, name)
      );

  const className = css`
    grid-area: paginationnav;
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: grid;
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
        word-break: break-word;
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

  return function PaginationNav({ paginationNav = {} }) {
    const { next, previous } = paginationNav;
    return nav(
      {
        "data-paginationnav": JSON.stringify(paginationNav),
        "aria-label": "pages navigation",
        class: className,
      },
      previous && Link({ text: "Previous" })(previous),
      next && Link({ text: "Next" })(next)
    );
  };
}
