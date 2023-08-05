export default function (context) {
  const { bau, css } = context;
  const { div } = bau.tags;

  const className = css`
    grid-area: main;
  `;

  return function Home() {
    return div({ class: className }, "Home");
  };
}
