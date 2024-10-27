import { type Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { bau, css } = context;
  const {
    h1,
    h2,
    h3,
    p,
    article,
    img,
    section,
    strong,
    ul,
    ol,
    li,
    table,
    tbody,
    th,
    tr,
    td,
  } = bau.tags;

  const className = css`
    max-width: 700px;
    padding: 1.5rem;
    margin: 5rem 0;
    @media (max-width: 600px) {
      margin: 0;
    }
    background-color: var(--White);
    border-radius: 0.5rem;

    .img-omelete {
      width: 100%;
      border-radius: 0.5rem;
    }
    h1,
    h2 {
      font-family: "Young Serif";
    }

    h1 {
      color: var(--Stone-900);
      font-weight: 400;
      font-size: 2.2em;
    }
    h2 {
      color: var(--Brown-800);
      font-weight: 400;
    }
    ul,
    ol {
      padding-left: 1rem;
      li {
        color: var(--WengeBrown);
        padding: 0.3rem;
        list-style-position: inside;
      }
    }
    section.preparation-time {
      background-color: var(--Rose-50);
      padding: 1.2rem;
      border-radius: 0.7rem;
      h3 {
        color: var(--Rose-800);
      }
    }
    ol {
      li::marker {
        font-weight: 700;
        color: var(--Brown-800);
      }
    }
    table {
      width: 100%;
      border-collapse: collapse;
      tbody {
        tr {
          border-bottom: 1px solid var(--Stone-150);
          th {
            padding: 1rem;
            font-weight: normal;
            text-align: start;
            color: var(--Stone-600);
          }
          td {
            font-weight: 700;
            color: var(--Rose-800);
          }
        }
      }
    }
  `;

  return function myComponent() {
    return article(
      { class: className },
      img({
        class: "img-omelete",
        src: "./assets/images/image-omelette.jpeg",
        alt: "omelette",
      }),
      h1("Simple Omelette Recipe"),
      p(
        "An easy and quick dish, perfect for any meal. This classic omelette combines beaten eggs cooked to perfection, optionally filled with your choice of cheese, vegetables, or meats."
      ),
      section(
        { class: "preparation-time" },
        h3("Preparation Time"),
        ul(
          li(strong("Total: "), "Approximately 10 minutes"),
          li(strong("Preparation: "), "5 minutes"),
          li(strong("Cooking: "), "5 minutes")
        )
      ),
      h2("Ingredients"),
      ul(
        li("2-3 large eggs"),
        li("Salt, to taste"),
        li("Pepper, to taste"),
        li("1 tablespoon of butter or oil"),
        li("Optional fillings: cheese, diced vegetables, cooked meats, herbs")
      ),
      h2("Instructions"),
      ol(
        li(
          strong("Beat the eggs: "),
          " In a bowl, beat the eggs with a pinch of salt and pepper until they are well mixed. You can add a tablespoon of water or milk for a fluffier texture."
        ),
        li(
          strong("Heat the pan: "),
          "Place a non-stick frying pan over medium heat and add butter or oil."
        ),
        li(
          strong("Add fillings (optional): "),
          "When the eggs begin to set at the edges but are still slightly runny in the middle, sprinkle your chosen fillings over one half of the omelette."
        ),
        li(
          strong("Fold and serve: "),
          "As the omelette continues to cook, carefully lift one edge and fold it over the fillings. Let it cook for another minute, then slide it onto a plate."
        ),
        li(
          strong("Enjoy: "),
          "Serve hot, with additional salt and pepper if needed."
        )
      ),
      h2("Nutrition"),
      p(
        "The table below shows nutritional values per serving without the additional fillings."
      ),
      table(
        tbody(
          tr(th("Calories"), td("277kcal")),
          tr(th("Carbs"), td("0g")),
          tr(th("Protien"), td("20g")),
          tr(th("Fat"), td("22g"))
        )
      )
    );
  };
}
