import { type Context } from "@grucloud/bau-ui/context";
import { type State } from "@grucloud/bau";
import { formatCurrency } from "./utils";
import quantitySelector from "./quantitySelector";

export default function (
  context: Context,
  { cartState }: { cartState: State<CartItem[]> }
) {
  const { bau, css } = context;
  const { h1, h2, p, div, button, span, section } = bau.tags;
  const { svg, use } = bau.tagsNS("http://www.w3.org/2000/svg");

  const quantityState = bau.state(1);

  const QuantitySelector = quantitySelector(context, { quantityState });

  const addToCart = (item: any) => () => {
    const currentItem = cartState.val.find(({ name }) => name == item.name);
    if (currentItem) {
      currentItem.quantity += quantityState.val;
    } else {
      cartState.val.push({
        name: item.name,
        price: item.price,
        quantity: quantityState.val,
        thumbnail: item.imageInfo[0].thumbnail,
      });
    }
    quantityState.val = 0;
  };

  const className = css`
    margin: auto;
    padding-inline: 1rem;
    max-width: min(100vw, 500px);
    & h1 {
      letter-spacing: 0.1rem;
      text-transform: uppercase;
      font-size: small;
      color: var(--color-emphasis-600);
      line-height: 3rem;
    }
    & h2 {
      font-size: 2.7rem;
      line-height: 3rem;
    }
    > p {
      margin-block: 1rem;
      color: var(--font-color-secondary);
      font-size: 1em;
      line-height: 1.64em;
      letter-spacing: 0.1px;
    }
    .price-container {
      display: flex;
      flex-direction: column;

      @media (max-width: 600px) {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }

      .price-current {
        display: flex;
        gap: 1rem;
        align-items: center;
        .price {
          font-size: x-large;
          font-weight: bold;
          letter-spacing: 0.8px;
        }
        .discount {
          font-weight: bold;
          background-color: var(--color-content);
          color: var(--color-content-inverse);
          padding-inline: 0.7rem;
          border-radius: 0.4rem;
        }
      }
      .price-old {
        font-weight: bold;
        text-decoration: line-through;
        color: var(--color-emphasis-600);
      }
    }

    .cart-action {
      display: flex;
      flex-wrap: wrap;
      @media (max-width: 600px) {
        flex-direction: column;
        align-items: stretch;
      }
      gap: 1rem;
      & button.add-to-cart {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        font-size: inherit;
        font-weight: 500;
        padding-block: 0.5rem;
        min-width: 15rem;
        border-radius: 0.4rem;
        color: var(--font-color);
        background-color: var(--color-primary);
      }
    }
  `;

  return (productInfo: ProductInfo) => {
    const { brand, name, description, price, discount, priceOld } = productInfo;
    return section(
      { class: className },
      h1(brand),
      h2(name),
      p(description),
      div(
        { class: "price-container" },
        p(
          { class: "price-current" },
          span({ class: "price" }, formatCurrency(price)),
          span({ class: "discount" }, `${discount}%`)
        ),
        p({ class: "price-old" }, formatCurrency(priceOld))
      ),
      p(
        { class: "cart-action" },
        QuantitySelector(),
        button(
          { class: "add-to-cart", onclick: addToCart(productInfo) },
          svg(
            {
              width: 16,
              height: 16,
              viewBox: "0 0 22 22",
              fill: "currentColor",
            },
            use({
              href: `./assets/images/icon-cart.svg#cart`,
            })
          ),
          "Add to cart"
        )
      )
    );
  };
}
