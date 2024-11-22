import { type Context } from "@grucloud/bau-ui/context";
import { formatCurrency } from "./utils";
import ADDONS from "./data/addons.json";

export default function (context: Context) {
  const { bau, css } = context;
  const {
    form,
    h1,
    button,
    footer,
    p,
    div,
    label,
    input,
    strong,
    small,
    span,
  } = bau.tags;

  const className = css``;

  const AddOnCheckboxes = () =>
    div(
      {
        class: css`
          display: grid;
          gap: 1rem;
          & label {
            border: 1px solid var(--color-emphasis-200);
            border-radius: 0.5rem;
            padding-inline: 1rem;
            padding-block: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            cursor: pointer;
            & .info {
              flex-grow: 1;
            }
            & .price {
              font-weight: bold;
              font-size: 0.8rem;
              color: var(--Purplish);
            }
          }
        `,
      },
      ADDONS.map(({ name, description, pricePerMonth }) =>
        label(
          input({
            type: "checkbox",
            role: "checkbox",
            name: "addons",
            value: name,
          }),
          span({ class: "info" }, p(strong(name)), small(description)),
          div(
            { class: "price" },
            "+",
            formatCurrency(Number(pricePerMonth)),
            "/mo"
          )
        )
      )
    );
  return ({ onsubmit, onPrevious }: any) => {
    return form(
      { class: className, onsubmit },
      h1("Pick add-ons"),
      p("Add-ons help enhance your gaming experience."),
      AddOnCheckboxes(),
      footer(
        button({ type: "submit" }, "Next"),
        button(
          { type: "button", class: "plain", onclick: onPrevious },
          "Go back"
        )
      )
    );
  };
}
