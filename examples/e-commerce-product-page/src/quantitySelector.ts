import { type Context } from "@grucloud/bau-ui/context";
import { type State } from "@grucloud/bau";

export default function (
  context: Context,
  { quantityState }: { quantityState: State<number> }
) {
  const { bau, css } = context;
  const { div, button } = bau.tags;

  const increaseQuantity = () => {
    quantityState.val += 1;
  };

  const decrementQuantity = () => {
    if (quantityState.val <= 0) return;
    quantityState.val -= 1;
  };

  const className = css`
    display: inline-flex;
    justify-content: space-between;
    border-radius: 0.4rem;
    background-color: var(--color-gray-50);
    align-items: center;
    & img {
      display: block;
    }
    .quantity {
      font-weight: bold;
      min-width: 1rem;
      text-align: center;
      color: var(--font-color);
    }
    & button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      padding-inline: 2rem;
      padding-block: 1rem;
      font-size: large;
      color: transparent;
      transition: all 0.3s;
      text-shadow: 0 0 0 var(--color-primary);
      &:hover {
        text-shadow: 0 0 0 var(--color-primary-darker);
      }
    }
  `;

  return () => {
    return div(
      { class: className },
      button(
        {
          onclick: decrementQuantity,
          "aria-label": "decrement quantity",
        },
        "➖"
      ),
      div({ class: "quantity" }, quantityState),
      button(
        {
          onclick: increaseQuantity,
          "aria-label": "increment quantity",
        },
        "➕"
      )
    );
  };
}
