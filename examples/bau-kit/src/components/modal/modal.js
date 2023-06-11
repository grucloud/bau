import { css } from "goober";

export default function (context, options = {}) {
  const { theme, bau, tr } = context;
  const { palette, shape, shadows } = theme;
  const { dialog } = bau.tags;

  const style = css`
    box-shadow: ${shadows[2]};
    background-color: ${palette.background.default};
    top: 0;
    left: 0;
    max-height: 90vh;
    max-width: 95vw;
    transition: transform 0.3s ease-out;
    border-radius: 10px;
    min-width: 400px;
    padding: 0px;
    border: 0px;
    header {
      padding: 1rem;
      font-size: 1.8rem;
      font-weight: 800;
      text-align: center;
      background-color: ${palette.primary.main};
      color: ${palette.primary.contrastText};
    }
    footer {
      display: flex;
      justify-content: flex-end;
      margin: 0px;
      box-shadow: ${shadows[2]};
      > * {
        margin: 12px;
      }
    }
    > main {
      margin: 12px;
      flex-grow: 1;
      overflow: scroll;
    }
  `;

  return function Modal({ open }, ...children) {
    return dialog({ class: style }, ...children);
  };
}
