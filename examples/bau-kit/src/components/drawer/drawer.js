import { classNames } from "../../utils/classNames";

export default function (context) {
  const { theme, bau, css } = context;
  const { palette, shape, shadows } = theme;
  const { div } = bau.tags;

  const style = css`
    position: fixed;
    top: 80px;
    left: 0px;
    z-index: 2;
    .overlay {
      position: absolute;
      z-index: -1;
      opacity: 0;
      background-color: ${palette.background.default};
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      transition: opacity 0.3s ease-out;
    }
    .overlay-open {
      z-index: 1;
      opacity: 0.5;
    }
    .content {
      transform: translate(-100%, 0px);
      z-index: 2;
      position: absolute;
      box-shadow: ${shadows[2]};
      background-color: ${palette.background.default};
      top: 0;
      left: 0;
      transition: transform 0.3s ease-out;
    }
    .content-open {
      transform: translate(0%, 0px);
      z-index: 2;
      position: absolute;
      box-shadow: ${shadows[2]};
      background-color: ${palette.background.default};
      top: 0;
      left: 0;
      transition: transform 0.3s ease-out;
    }
  `;

  return function Drawer({ openState }, ...children) {
    return div(
      { class: style },
      div({
        class: {
          deps: [openState],
          renderProp: (open) => classNames("overlay", open && "overlay-open"),
        },
      }),
      div(
        {
          class: {
            deps: [openState],
            renderProp: (open) => classNames("content", open && "content-open"),
          },
        },
        ...children
      )
    );
  };
}
