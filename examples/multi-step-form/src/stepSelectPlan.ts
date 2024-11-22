import { type Context } from "@grucloud/bau-ui/context";
import PLANS from "./data/plans.json";

export default function (context: Context) {
  const { bau, css } = context;
  const { form, button, h1, p, input, footer, div, label, strong, small, img } =
    bau.tags;

  const className = css``;
  const payPerYearState = bau.state(false);
  const onChangePerYear = (event: any) => {
    payPerYearState.val = event.target.checked;
  };

  const RadioGroupPlan = () =>
    div(
      {
        class: css`
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(3, 1fr);
          @media (max-width: 800px) {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(3, 1fr);
          }
          > label {
            flex-basis: 1;
            padding: 1rem;
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            input {
              width: 0px;
            }
            img {
              //margin-bottom: 1rem;
            }
            p {
              line-height: 1.2rem;
            }
            small {
              color: var(--font-color-secondary);
            }
          }
        `,
      },
      PLANS.map(({ name, image, pricePerMonth }) =>
        label(
          input({
            type: "radio",
            name: "plan",
            value: name,
            required: true,
          }),
          img({ src: image, alt: "" }),
          () =>
            div(
              p(strong(name)),
              p(
                small(
                  payPerYearState.val
                    ? `$${Number(pricePerMonth) * 10}/year`
                    : `$${pricePerMonth}/mo`
                )
              ),
              p(small(payPerYearState.val && "2 months free"))
            )
        )
      )
    );

  const MonthYearSwitch = () =>
    label(
      {
        class: css`
          font-weight: 400;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--background-color-body);
          transition: all 0.3s;
          padding: 1rem;
          font-weight: bold;
          font-size: 0.9rem;
          &::before {
            content: "Monthly";
            color: var(--color-emphasis-900);
          }
          &::after {
            content: "Yearly";
            color: var(--color-emphasis-500);
          }
          &:has(input:checked) {
            &::before {
              color: var(--color-emphasis-500);
            }
            &::after {
              color: var(--color-emphasis-900);
            }
          }
          & input {
            margin-inline: 0.7rem;
          }
        `,
      },
      input({
        type: "checkbox",
        name: "yearly",
        role: "switch",
        onchange: onChangePerYear,
      })
    );

  return ({ onsubmit, onPrevious }: any) => {
    return form(
      { class: className, onsubmit },
      h1("Select your plan"),
      p("You have the option of monthly or yearly billing."),
      RadioGroupPlan(),
      MonthYearSwitch(),
      footer(
        button({ type: "submit" }, "Next Step"),
        button(
          { type: "button", class: "plain", onclick: onPrevious },
          "Go back"
        )
      )
    );
  };
}
