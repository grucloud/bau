import { type Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { bau, css } = context;
  const { div } = bau.tags;

  const className = css`
    font-size: 0.8rem;
    padding: 0.5rem;
    height: 100%;
    background-color: var(--color-gray-100);
    overflow-y: scroll;
    & pre {
      background-color: var(--color-gray-100);
      padding: 0.1rem 0;
      margin: 0 0;
    }
  `;

  return function LogView() {
    return div({
      class: className,
    });
  };
}
