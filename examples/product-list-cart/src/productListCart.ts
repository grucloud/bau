import { type Context } from "@grucloud/bau-ui/context";
import BN from "bignumber.js";

import data from "./data.json";

const locale = "en-US";
const currency = "USD";

const formatCurrency = (number: number) =>
  new Intl.NumberFormat(locale, { style: "currency", currency }).format(number);

export default function (context: Context) {
  const { bau, css } = context;
  const {
    h1,
    h2,
    div,
    p,
    ul,
    li,
    article,
    section,
    span,
    picture,
    button,
    img,
    source,
    strong,
    dialog,
    form,
  } = bau.tags;

  const className = css`
    display: grid;
    grid-template-columns: auto auto;
    margin: 3rem;
    @media (max-width: 430px) {
      margin: 0.5rem;
      grid-template-columns: 1fr;
      grid-template-rows: auto auto;
    }
  `;

  type CartItem = {
    name: string;
    price: number;
    quantity: number;
    thumbnail: string;
  };

  const cartState = bau.state<CartItem[]>([
    // {
    //   name: "Waffle with Berries",
    //   price: 5.5,
    //   quantity: 2,
    //   thumbnail: "./assets/images/image-waffle-thumbnail.jpg",
    // },
    // {
    //   name: "Vanilla Bean Crème Brûlée",
    //   price: 7,
    //   quantity: 2,
    //   thumbnail: "./assets/images/image-creme-brulee-thumbnail.jpg",
    // },
  ]);

  const totalPriceState = bau.derive(() =>
    formatCurrency(
      cartState.val
        .reduce(
          // acc + price * quantity,
          (acc, { price, quantity }) => acc.plus(BN(price).times(BN(quantity))),
          BN(0)
        )
        .toNumber()
    )
  );

  const totalQuantityState = bau.derive(() =>
    cartState.val.reduce((acc, { quantity }) => acc + quantity, 0)
  );

  const addToCart = (item: any) => () => {
    const currentItem = cartState.val.find(({ name }) => name == item.name);
    if (currentItem) {
      currentItem.quantity++;
    } else {
      cartState.val.push({
        name: item.name,
        price: item.price,
        quantity: 1,
        thumbnail: item.image.thumbnail,
      });
    }
  };

  const removeFromCart = (item: any) => () => {
    const currentItemIndex = cartState.val.findIndex(
      ({ name }) => name == item.name
    );
    if (currentItemIndex >= 0) {
      cartState.val.splice(currentItemIndex, 1);
    }
  };

  const decrementQuantity = (item: any) => () => {
    const currentItemIndex = cartState.val.findIndex(
      ({ name }) => name == item.name
    );
    if (currentItemIndex >= 0) {
      const currentItem = cartState.val[currentItemIndex];
      if (currentItem.quantity <= 1) {
        cartState.val.splice(currentItemIndex, 1);
      } else {
        currentItem.quantity--;
      }
    }
  };

  const DialogConfirm = () =>
    dialog(
      {
        id: "confirm-dialog",
        //open: true,
        class: css`
          p {
            font-size: 0.7rem;
            font-weight: 400;
            color: var(--rose-400);
          }
          button {
            margin-top: 1rem;
          }
          ul {
            padding: 1rem;
            background-color: var(--rose-100);
            > li {
              list-style: none;
              display: flex;
              justify-content: space-between;
              gap: 1rem;
              margin: 0.2rem 0;

              > img {
                width: 48px;
                height: 48px;
              }
              > .content {
                flex-grow: 1;
                .name {
                  font-size: 0.8rem;
                  font-weight: 600;
                }
                .quantity {
                  color: var(--red);
                  font-size: 0.9rem;
                  font-weight: 600;
                }
                .price {
                  color: var(--rose-500);
                  font-size: 0.9rem;
                  font-weight: 300;
                }
                .price-total {
                  font-weight: 700;
                }
              }
            }
          }
        `,
      },
      form(
        img({ src: "./assets/images/icon-order-confirmed.svg", alt: "" }),
        h1("Order Confirmed"),
        p("We hope you enjoy your food!"),
        bau.loop(cartState, ul(), (item) =>
          li(
            img({ src: item.thumbnail }),
            div(
              { class: "content" },
              div({ class: "name" }, item.name),
              span({ class: "quantity" }, item.quantity, "x"),
              span({ class: "price" }, formatCurrency(item.price))
            ),
            div(
              { class: "price-total" },
              formatCurrency(BN(item.price).times(item.quantity).toNumber())
            )
          )
        ),
        button({ type: "submit", onclick: newOrder }, "Submit New Order")
      )
    );

  const newOrder = () => {
    const dialogEl = document.getElementById(
      "confirm-dialog"
    ) as HTMLDialogElement;
    cartState.val = [];
    dialogEl.close();
  };

  const confirmOrder = () => {
    const dialogEl = document.getElementById(
      "confirm-dialog"
    ) as HTMLDialogElement;
    dialogEl.showModal();
  };

  const Item = (item: any) => {
    const { name, category, price, image } = item;
    const cartByItem = bau.derive(() =>
      cartState.val.find(({ name }) => name == item.name)
    );

    const hasQuantity = bau.derive(() => !!cartByItem.val);

    return div(
      { class: "item" },
      picture(
        source({
          srcset: image.mobile,
          media: "(max-width:476px)",
        }),
        img({
          class: () => ["item-img", hasQuantity.val && "active"],
          src: image.desktop,
          alt: "thumbnail",
        }),
        ItemAction({ item, hasQuantity, cartByItem })
      ),
      div({ class: "category" }, category),
      h2({ class: "name" }, name),
      div({ class: "price" }, price)
    );
  };

  const ItemAction = ({ item, hasQuantity, cartByItem }: any) => {
    const quantity = bau.derive(() => cartByItem?.val?.quantity);

    return div(
      {
        class: css`
          display: flex;
          justify-content: center;
          margin-bottom: 0.5rem;
          margin-top: -2rem;

          .quantity-selector {
            background-color: var(--red);
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
            min-width: 8rem;
            padding: 0.5rem 1rem;
            border-radius: 1rem;
            .quantity {
              font-weight: 600;
            }
            > button {
              background-color: inherit;
              border: none;
              display: flex;
              img {
                width: 1.25rem;
                height: 1.25rem;
                padding: 0.3rem;
                border-radius: 50%;
                border: 1px solid white;
              }
            }
          }
          .add-to-cart {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            border: none;
            border: 1px solid var(--rose-500);
            text-align: center;
            font-size: 0.875rem;
            font-weight: 600;
            background-color: white;
            border-radius: 2rem;
            padding: 0.5rem 1rem;
            transition: all 0.3s;
            &:hover {
              color: var(--red);
              border-color: var(--red);
            }
            &::before {
              content: url("./assets/images/icon-add-to-cart.svg");
            }
          }
        `,
      },
      () =>
        hasQuantity.val
          ? div(
              { class: "quantity-selector" },
              button(
                {
                  onclick: decrementQuantity(item),
                  "aria-label": "decrement quantity",
                },
                img({
                  src: "./assets/images/icon-decrement-quantity.svg",
                  alt: "remove-from-cart",
                })
              ),
              div({ class: "quantity" }, quantity),
              button(
                {
                  onclick: addToCart(item),
                  "aria-label": "increment quantity",
                },
                img({
                  src: "./assets/images/icon-increment-quantity.svg",
                  alt: "add-cart",
                })
              )
            )
          : button(
              {
                class: "add-to-cart",
                onclick: addToCart(item),
                "aria-label": "add to cart",
              },
              "Add to Cart"
            )
    );
  };

  const ProdutList = () =>
    section(
      {
        class: css`
          h1 {
            font-size: 2.8rem;
          }
          .item-container {
            display: flex;
            flex-wrap: wrap;
            gap: 0rem;
            justify-content: center;
            .item {
              .item-img {
                width: 251px;
                height: 240px;
                border-radius: 1rem;
                &.active {
                  border: 2px solid var(--red);
                }
              }

              padding: 1rem;
              line-height: 1.6rem;

              .name {
                font-size: 1.25rem;
                font-weight: 700;
                color: var(--rose-900);
              }
              .category {
                font-size: 0.9rem;
                font-weight: 300;
                color: var(--rose-500);
              }
              .price {
                font-size: 1rem;
                font-weight: 600;
                color: var(--red);
              }
            }
          }
        `,
      },
      h1("Dessert"),
      div(
        {
          class: "item-container",
        },
        data.map(Item)
      )
    );

  const Cart = () =>
    section(
      {
        class: css`
          padding: 1rem;
          align-self: start;
          position: sticky;
          top: 0;
          background-color: white;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          h1 {
            color: var(--red);
          }
          .cart-empty {
            display: flex;
            flex-direction: column;
            align-items: center;
            p {
              font-size: 0.8rem;
              color: var(--rose-500);
              text-align: center;
            }
          }
          .cart-inner {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            ul {
              li {
                display: flex;
                align-items: center;
                list-style: none;
                justify-content: space-between;
                .name {
                  font-size: 0.8rem;
                  font-weight: 600;
                }
                .quantity {
                  color: var(--red);
                }
                .price {
                  color: var(--rose-500);
                }
                .price-total {
                  color: var(--rose-500);
                  font-weight: 600;
                }
                button {
                  border: none;
                  display: flex;
                  padding: 0.5rem;
                  border-radius: 100%;
                  border: 1px solid var(--rose-300);
                  transition: all 0.3s;
                  background-color: white;
                  &:hover {
                    border-color: var(--rose-900);
                  }
                }
              }
            }
          }

          .order-total-container {
            display: flex;
            justify-content: space-between;
            font-weight: 400;
            align-items: center;
            border-top: 1px solid var(--rose-100);
            .order-total-key {
              color: var(--rose-900);
              font-weight: 400;
              font-size: 0.8rem;
            }
            .order-value {
              font-size: 1.2rem;
              color: var(--rose-900);
              font-weight: 700;
            }
          }
          p.carbon-neutral {
            background-color: var(--rose-100);
            padding: 0.7rem;
            font-size: 0.7rem;
            font-weight: 400;
            display: flex;
            align-items: center;
            gap: 0.3rem;
            &::before {
              content: url("./assets/images/icon-carbon-neutral.svg");
            }
          }
        `,
      },
      h1("Your Cart (", totalQuantityState, ")"),
      () =>
        cartState.val.length == 0 &&
        div(
          { class: "cart-empty" },
          img({
            src: "./assets/images/illustration-empty-cart.svg",
            alt: "",
            "aria-hidden": true,
          }),
          p("Your added items will appear here")
        ),
      div(
        {
          class: () => (cartState.val.length == 0 ? "hide" : "cart-inner"),
        },
        bau.loop(cartState, ul({}), (item) =>
          li(
            div(
              div({ class: "name" }, item.name),
              div(
                span({ class: "quantity" }, item.quantity, "x"),
                span({ class: "price" }, formatCurrency(item.price)),
                span(
                  { class: "price-total" },
                  "  =",
                  formatCurrency(BN(item.price).times(item.quantity).toNumber())
                )
              )
            ),
            button(
              { role: "delete", onclick: removeFromCart(item) },
              img({
                src: "./assets/images/icon-remove-item.svg",
                alt: "delete",
              })
            )
          )
        ),
        div(
          { class: "order-total-container" },
          span({ class: "order-total-key" }, "Order Total"),
          span({ class: "order-value" }, totalPriceState)
        ),
        p(
          { class: "carbon-neutral" },
          span("This is a ", strong(" carbon-neutral "), " delivery")
        ),
        button({ type: "submit", onclick: confirmOrder }, "Confirm Order")
      )
    );

  return () => {
    return article({ class: className }, ProdutList(), Cart(), DialogConfirm());
  };
}
