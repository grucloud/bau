export default function ({ bau, css }) {
  const { footer, ul, li } = bau.tags;

  return function () {
    return footer(
      {
        class: css`
          grid-area: footer;
          border: 1px dotted red;
          min-height: 4rem;
          display: flex;
          justify-content: center;
          align-items: center;
        `,
      },
      `Copyright © ${new Date().getFullYear()} World Company`
    );
  };
}
