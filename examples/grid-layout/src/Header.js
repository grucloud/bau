export default function (context) {
  const { bau, css } = context;
  const { h1, header } = bau.tags;

  const className = css`
    grid-area: header;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px dashed lightgray;
  `;

  return function Header() {
    return header({ class: className }, h1("Header"));
  };
}
