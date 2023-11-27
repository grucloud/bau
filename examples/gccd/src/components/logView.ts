import { type Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { bau, css } = context;
  const { div } = bau.tags;

  const className = css`
    background-color: var(--color-gray-100);
    font-size: 0.8rem;
    padding: 0.5rem;
    height: 100%;
  `;

  return function LogView() {
    return div({
      class: className,
    });
  };
}
