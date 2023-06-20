export const footer = ({ tr, bau, css }) => {
  const { footer, span, a, ul, li, p } = bau.tags;

  return function Footer() {
    return footer(
      {
        class: css`
          display: flex;
          justify-content: center;
          span {
            margin: 1rem;
          }
        `,
      },
      span(`version FE: ${__VERSION__}`)
    );
  };
};
