export default function ({ tr, bau, css }) {
  const { footer, span, a, ul, li, p } = bau.tags;

  return function Footer() {
    return footer(
      {
        class: css`
          grid-area: footer;
          display: flex;
          justify-content: center;
          margin: 1rem;
          span {
          }
        `,
      },
      span(`version: ${__VERSION__}`)
    );
  };
}
