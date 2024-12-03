import { type Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { bau, css } = context;
  const { header } = bau.tags;
  const className = css`
    height: 156px;
    background: url("./assets/images/bg-header-desktop.svg");
    background-color: var(--color-primary);
  `;

  return function () {
    return header({ class: className });
  };
}
