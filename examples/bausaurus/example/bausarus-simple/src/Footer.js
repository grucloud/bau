export default function ({ bau, css }) {
  const { footer } = bau.tags;

  return function () {
    return footer(
      {
        class: css`
          grid-area: footer;
          border: 1px dotted lightgray;
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
