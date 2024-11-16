import { type Context } from "@grucloud/bau-ui/context";
import { type State } from "@grucloud/bau";
import BN from "bignumber.js";
import { formatCurrency } from "./utils";

export default function (
  context: Context,
  { cartState }: { cartState: State<CartItem[]> }
) {
  const { bau, css } = context;
  const { div, dialog, ul, li, span, button, img, header, footer, h1, form } =
    bau.tags;

  const isEmpty = bau.derive(() => cartState.val.length == 0);

  const removeFromCart = (item: any) => () => {
    const currentItemIndex = cartState.val.findIndex(
      ({ name }) => name == item.name
    );
    if (currentItemIndex >= 0) {
      cartState.val.splice(currentItemIndex, 1);
    }
  };

  const className = css`
    margin: auto;
    z-index: 10;
    box-shadow: var(--shadow-m);
    border: none;
    border-radius: 0.5rem;

    & > form {
      min-height: 200px;
      min-width: 250px;

      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      & > header {
        border-bottom: 1px solid var(--color-emphasis-200);
        h1 {
          font-size: 1rem;
          line-height: 3rem;
        }
      }
      .cart-empty {
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--font-color-secondary);
        font-weight: bold;
        font-size: 0.9rem;
      }
      .inner-cart {
        display: grid;
        gap: 1rem;
      }
      & ul {
        > li {
          display: flex;
          align-items: center;
          list-style: none;
          justify-content: space-between;
          gap: 1rem;
          .name {
            font-size: 1rem;
            font-weight: 00;
          }
          .quantity {
          }
          .price {
          }
          .price-total {
            font-weight: 600;
          }
          & button {
            border: none;
            display: flex;
            padding-inline: 1rem;
          }
        }
      }
    }
  `;

  const confirmOrder = () => {
    const dialogEl = document.getElementById(
      "dialog-cart"
    ) as HTMLDialogElement;
    dialogEl.close();
  };

  return () => {
    return dialog(
      {
        // open: true,
        id: "dialog-cart",
        class: className,
        onclick: ({ target, currentTarget }: any) => {
          if (target == currentTarget) {
            target.close();
          }
        },
      },
      form(header(h1("Cart")), () =>
        isEmpty.val
          ? div({ class: "cart-empty" }, "Your cart is empty")
          : div(
              { class: "inner-cart" },
              bau.loop(cartState, ul(), (item) =>
                li(
                  img({ src: item.thumbnail, width: 48, height: 48, alt: "" }),
                  div(
                    div({ class: "name" }, item.name),
                    div(
                      span({ class: "quantity" }, item.quantity, "x"),
                      span({ class: "price" }, formatCurrency(item.price)),
                      span(
                        { class: "price-total" },
                        "  =",
                        formatCurrency(
                          BN(item.price).times(item.quantity).toNumber()
                        )
                      )
                    )
                  ),
                  button(
                    { role: "delete", onclick: removeFromCart(item) },
                    img({
                      src: "./assets/images/icon-delete.svg",
                      alt: "",
                    })
                  )
                )
              ),
              footer(
                button(
                  {
                    class: ["primary", "solid"],
                    type: "submit",
                    onclick: confirmOrder,
                  },
                  "Confirm Order"
                )
              )
            )
      )
    );
  };
}
