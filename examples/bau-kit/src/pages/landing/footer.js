import { css } from "goober";

export const footer = ({ tr, bau }) => {
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
      span(`version: ${__VERSION__}`)
    );
  };
};
