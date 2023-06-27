export default function ({ bau, css }) {
  const { nav, a, body, li, p, ul } = bau.tags;

  return function () {
    return nav(
      {
        class: css`
          grid-area: navbar;
          padding: 1rem;
        `,
      },
      "Mynav"
    );
  };
}
