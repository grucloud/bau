import { type Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { bau, css } = context;
  const { section, h1 } = bau.tags;

  const className = css`
    border: 1px solid red;
  `;

  return () => {
    return section({ class: className }, h1("SSummary"));
  };
}
