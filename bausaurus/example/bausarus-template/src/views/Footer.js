export default function ({ bau, css }) {
  const { footer, span } = bau.tags;

  const className = css`
    grid-area: footer;
    min-height: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--font-color-secondary);
  `;

  return function Footer() {
    return footer(
      {
        class: className,
      },
      span(`Copyright © ${new Date().getFullYear()}`)
    );
  };
}
