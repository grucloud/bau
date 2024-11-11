import { type Context } from "@grucloud/bau-ui/context";
import { header } from "./header";

export const layoutDefault = (context: Context) => {
  const { bau, css } = context;
  const { div } = bau.tags;
  const Header = header(context);

  return function LayoutDefault({ componentState }: { componentState: any }) {
    return div(
      {
        class: css`
          display: flex;
          min-width: 100vw;
          min-height: 100vh;
          flex-direction: column;
        `,
      },
      Header(),
      div({ style: "flex-grow: 1" }, () => componentState.val)
    );
  };
};
