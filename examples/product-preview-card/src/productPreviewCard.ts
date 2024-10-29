import { type Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { bau, css } = context;
  const { h1, div, p, article, section, img, picture, source, span, button } =
    bau.tags;

  const className = css`
    display: grid;
    margin: 1rem;
    grid-template-columns: 350px 350px;
    grid-template-rows: 1fr;
    @media (max-width: 475px) {
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
    }
    picture {
      img {
        display: block;
        width: 100%;
        border-radius: 1rem 0 0 1rem;
        @media (max-width: 475px) {
          border-radius: 1rem;
        }
      }
    }

    .content {
      background-color: white;
      border-radius: 0 1rem 1rem 0;
      padding: 1rem;
      gap: 0.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .category {
        letter-spacing: 0.3rem;
        text-transform: uppercase;
        font-weight: 500;
        color: var(--paragraph-color);
        font-size: 1rem;
      }
      h1 {
        font-family: "Fraunces", sans-serif;
        font-size: 2rem;
      }
      p {
        color: var(--paragraph-color);
      }
      .price-container {
        display: inline-flex;
        align-items: center;
        gap: 1rem;
        .price {
          font-family: "Fraunces", sans-serif;
          color: var(--btn-and-current-price-color);
          font-size: 2rem;
        }
        .price-old {
          font-size: 1rem;
          color: var(--paragraph-color);
          text-decoration: line-through;
        }
      }

      button {
        width: 100%;
        border-radius: 1rem;
        background-color: var(--btn-and-current-price-color);
        color: white;
        border: none;
        font-weight: 700;
        padding: 0.8rem;
        display: inline-flex;
        gap: 0.4rem;
        justify-content: center;
        cursor: pointer;
        transition: background-color 0.5s;
        &::before {
          content: url("./assets/images/icon-cart.svg");
        }
        &:hover {
          background-color: var(--hover-color);
        }
      }
    }
  `;

  return function myComponent() {
    return article(
      { class: className },
      picture(
        source({
          srcset: "./assets/images/image-product-desktop.jpg",
          media: "(min-width:476px)",
        }),
        img({ src: "./assets/images/image-product-mobile.jpg", alt: "Mobile" })
      ),
      // img({ src: "./assets/images/image-product-desktop.jpg", alt: "Mobile" }),
      section(
        { class: "content" },
        div({ class: "category" }, "Perfume"),
        h1("Gabrielle Essence Eau De Parfum"),
        p(
          "A floral, solar and voluptuous interpretation composed by Olivier Polge, Perfumer-Creator for the House of CHANEL."
        ),
        div(
          { class: "price-container" },
          span({ class: "price" }, "$149.99"),
          span({ class: "price-old" }, "$169.99")
        ),
        button("Add to Cart")
      )
    );
  };
}
