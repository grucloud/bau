export default function ({ bau, css }) {
  const { footer, ul, li } = bau.tags;

  return function () {
    return footer(
      {
        class: css`
          grid-area: footer;
          border: 1px solid red;
        `,
      },
      "My footer"
    );
  };
}
