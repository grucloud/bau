import { type Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { bau, css } = context;
  const { div } = bau.tags;

  const className = css``;

  return function InfraDetail() {
    return div(
      {
        class: className,
      },
      "InfraDetail"
    );
  };
}
