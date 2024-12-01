import { State } from "@grucloud/bau";
import { type Context } from "@grucloud/bau-ui/context";
import BN from "bignumber.js";
import { formatCurrency } from "./utils";

export default function (
  context: Context,
  {
    plan,
    isPerYear,
    addons,
  }: { plan: State<Plan>; isPerYear: State<boolean>; addons: State<Addon[]> }
) {
  const { bau, css } = context;
  const {
    form,
    h1,
    p,
    img,
    button,
    footer,
    table,
    tbody,
    thead,
    th,
    tr,
    td,
    a,
    small,
    strong,
  } = bau.tags;

  const convertPrice = (price: string) => {
    return isPerYear.val
      ? `${formatCurrency(BN(price).times(10).toNumber())}/year`
      : `${formatCurrency(Number(price))}/mo`;
  };

  const totalPrice = bau.derive(() => {
    const totalAddOn = addons.val.reduce(
      (acc, { pricePerMonth }) => acc.plus(pricePerMonth),
      BN(0)
    );
    const price = BN(plan.val.pricePerMonth).plus(totalAddOn).toString();
    return convertPrice(price);
  });

  const className = css`
    padding: 2rem;
    > table {
      & a {
        color: var(--font-color-secondary);
        font-weight: 400;
        font-size: 0.85rem;
      }
      background-color: var(--background-color-body);
      border-collapse: collapse;
      & th,
      & td {
        padding-inline: 1rem;
        padding-block: 0.5rem;
      }
      & td {
        text-align: right;
      }
      & thead {
        border-bottom: 1px solid var(--color-emphasis-100);
        & td {
          font-weight: bold;
        }
      }
      & tbody {
        padding: 0.5rem;
        & th {
          color: var(--font-color-secondary);
          font-weight: 400;
          font-size: 0.9rem;
        }
        & td {
          font-size: 0.8rem;
        }
      }
    }
    .total {
      padding-inline: 1rem;
      padding-block: 0.5rem;
      display: flex;
      justify-content: space-between;
    }
  `;
  const confirm = () => {
    isDone.val = true;
  };

  const FinishingUp = ({ onPrevious, onChangePlan }: any) =>
    form(
      { class: className },
      h1("Finishing up"),
      p("Double-check everything looks OK before confirming."),
      table(
        () =>
          thead(
            th(
              p(
                plan.val.name,
                " (",
                () => (isPerYear.val ? "Yearly" : "Monthly"),
                ")"
              ),
              a({ href: "#?step=2", onclick: onChangePlan }, "change")
            ),
            td(convertPrice(plan.val.pricePerMonth))
          ),
        bau.loop(addons, tbody(), ({ name, pricePerMonth }) =>
          tr(th(name), td(convertPrice(pricePerMonth)))
        )
      ),
      p(
        { class: "total" },
        small("Total (", () => (isPerYear.val ? "per year" : "per month"), ")"),
        strong(totalPrice)
      ),

      footer(
        button({ type: "submit", onclick: confirm }, "Confirm"),
        button(
          { type: "button", class: "plain", onclick: onPrevious },
          "Go back"
        )
      )
    );

  const ThankYou = () =>
    form(
      {
        class: css`
          align-items: center;
          padding: 2rem;
        `,
      },
      img({ src: "./assets/images/icon-thank-you.svg", height: 50, width: 50 }),
      h1("Thank you!"),
      p(
        "Thanks for confirming your subscription!We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com."
      )
    );
  const isDone = bau.state(false);

  return ({ onPrevious, onChangePlan }: any) => {
    return () =>
      isDone.val ? ThankYou() : FinishingUp({ onPrevious, onChangePlan });
  };
}
