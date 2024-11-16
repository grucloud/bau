import { type Context } from "@grucloud/bau-ui/context";
import { type State } from "@grucloud/bau";

import { header } from "./header";
import cart from "./cart";

export const layoutDefault = (
  context: Context,
  { cartState }: { cartState: State<CartItem[]> }
) => {
  const { bau, css } = context;
  const { div } = bau.tags;
  const Header = header(context, { cartState });
  const Cart = cart(context, { cartState });

  return function LayoutDefault({ componentState }: { componentState: any }) {
    return div(
      {
        class: css`
          display: grid;
          margin: auto;
          max-width: 1000px;
          min-height: 100vh;
        `,
      },
      Header(),
      Cart(),
      div({ style: "flex-grow: 1" }, () => componentState.val)
    );
  };
};
