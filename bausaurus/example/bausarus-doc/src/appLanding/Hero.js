import button from "@grucloud/bau-ui/button/button";

export default function (context) {
  const { bau, css, config } = context;
  const { div, h1, h2, p } = bau.tags;
  const Button = button(context);

  const className = css`
    box-shadow: var(--global-shadow-lw);
    margin: 1rem;
    padding: 1rem;
    & h1 {
      font-size: 56px;
      color: var(--color-primary);
    }
    & h2 {
      font-size: 48px;
    }
    & p {
      font-size: 24px;
      color: var(--color-emphasis-900);
    }
  `;

  return function Hero({ name, text, tagLine }) {
    return div(
      {
        class: className,
      },
      h1(name),
      h2(text),
      p(tagLine),
      Button(
        { href: `${config.base}docs/`, primary: true, raised: true },
        "Visit Documentation"
      )
    );
  };
}
