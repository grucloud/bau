export default function (context) {
  const { bau, css } = context;
  const { footer, span } = bau.tags;

  const className = css`
    grid-area: footer;
    display: flex;
    justify-content: center;
    padding: 1rem;
    border: 1px dashed lightgray;
  `;

  return function Footer() {
    return footer(
      { class: className },
      span(`Copyright © ${new Date().getFullYear()}`)
    );
  };
}
