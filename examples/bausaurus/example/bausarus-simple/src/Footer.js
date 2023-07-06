export default function ({ bau, css }) {
  const { footer } = bau.tags;

  const className = css`
    grid-area: footer;
    border: 1px dotted lightgray;
    min-height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  return function Footer() {
    return footer(
      {
        class: className,
      },
      `Copyright © ${new Date().getFullYear()} World Company`
    );
  };
}
