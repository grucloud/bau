import { type Context } from "@grucloud/bau-ui/context";

import BN from "bignumber.js";

const locale = "en-GB";
const currency = "GBP";

const formatCurrency = (number: number) =>
  new Intl.NumberFormat(locale, { style: "currency", currency }).format(number);

export default function (context: Context) {
  const { bau, css } = context;
  const {
    h1,
    form,
    p,
    article,
    section,
    header,
    span,
    label,
    input,
    div,
    button,
    hr,
    img,
  } = bau.tags;

  const monthlyRepaymentState = bau.state("");
  const totalState = bau.state("");
  const className = css`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 400px));
    border-radius: 1rem;
    overflow: hidden;
    margin-inline: 0.5rem;
    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
    > section {
      padding: 1rem;
    }

    .calculator-form {
      background-color: var(--white);
      header {
        display: flex;
        justify-content: space-between;
        button {
          text-decoration: underline;
          background: none;
          color: var(--grey-500);
        }
      }
      form {
        button[type="submit"] {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          &::before {
            content: url("./assets/images/icon-calculator.svg");
          }
          border-radius: 2rem;
        }
      }
    }
    .result {
      color: var(--grey-100);
      background-color: var(--grey-900);
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      &.no-result {
        align-items: center;
        > img {
          width: 192px;
          height: 192px;
        }
      }

      p,
      span {
        color: var(--grey-500);
      }
      .payments {
        background-color: var(--grey-1000);
        display: flex;
        flex-direction: column;
        padding: 1rem;
        border-radius: 0.5rem;
        border-top: 3px solid var(--primary);
        hr {
          border: 1px solid var(--grey-900);
        }
        .monthly-payments-value {
          color: var(--primary);
          font-size: 2.6rem;
          font-weight: 700;
          line-height: 3.5rem;
        }
        .total-payments-value {
          font-size: 2rem;
          line-height: 2.5rem;
          color: var(--grey-100);
        }
      }
    }
  `;

  const clearAll = (event: any) => {
    event.target.closest("form").reset();
    monthlyRepaymentState.val = "";
    totalState.val;
  };

  const onsubmit = (event: any) => {
    event.preventDefault();
    const result = Object.fromEntries(new FormData(event.currentTarget));
    const { amount, term, rate, mortgateType } = result;
    if (mortgateType == "repayment") {
      const month = BN(term.toString()).times(12);

      const ratePerMonth = BN(1)
        .plus(BN(rate.toString()).dividedBy(100).dividedBy(12))
        .pow(month);

      const newMonthlyRepayment = BN(amount.toString())
        .times(BN(rate.toString()).dividedBy(100).dividedBy(12))
        .times(ratePerMonth)
        .dividedBy(ratePerMonth.minus(1));
      monthlyRepaymentState.val = formatCurrency(
        newMonthlyRepayment.toNumber()
      );
      totalState.val = formatCurrency(
        newMonthlyRepayment.times(12).times(term.toString()).toNumber()
      );
    } else if (mortgateType == "interestOnly") {
      const newMonthlyRepayment = BN(amount.toString()).times(
        BN(rate.toString()).dividedBy(100).dividedBy(12)
      );
      monthlyRepaymentState.val = formatCurrency(
        newMonthlyRepayment.toNumber()
      );
      totalState.val = formatCurrency(
        newMonthlyRepayment.times(term.toString()).times(12).toNumber()
      );
    }
  };

  return function MortgageRepaymentCalculator() {
    return article(
      { class: className },
      section(
        { class: "calculator-form" },
        form(
          { onsubmit },
          header(
            h1("Mortgage Calculator"),
            button({ type: "button", onclick: clearAll }, "Clear all")
          ),
          label(
            span("Mortgage Amount"),
            div(
              {
                class: "input-unit",
              },
              span("£"),
              input({
                autofocus: true,
                name: "amount",
                type: "number",
                required: true,
              })
            )
          ),
          div(
            {
              class: css`
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.5rem;
              `,
            },
            label(
              "Mortgage Terms",
              div(
                {
                  class: "input-unit",
                },

                input({
                  name: "term",
                  type: "number",
                  required: true,
                  min: 1,
                  //defaultValue: 25,
                }),
                span("years")
              )
            ),
            label(
              "Interest Rate",
              div(
                {
                  class: "input-unit",
                },
                input({
                  name: "rate",
                  type: "number",
                  required: true,
                  step: 0.1,
                  min: 0.1,
                  //defaultValue: 5,
                }),
                span("%")
              )
            )
          ),
          label(
            "Mortgage Type",
            div(
              {
                class: css`
                  > label {
                    display: flex;
                    gap: 0.5rem;
                  }
                `,
              },
              label(
                input({
                  type: "radio",
                  name: "mortgateType",
                  value: "repayment",
                  required: true,
                }),
                "Repayment"
              ),
              label(
                input({
                  type: "radio",
                  name: "mortgateType",
                  value: "interestOnly",
                }),
                "Interest Only"
              )
            )
          ),
          button({ type: "submit" }, "Calculate Repayment")
        )
      ),
      () =>
        monthlyRepaymentState.val == ""
          ? section(
              { class: "result no-result" },
              img({ src: "./assets/images/illustration-empty.svg" }),
              h1("Results shown here"),
              p(
                "Complete the form and click “calculate repayments” to see what your monthly repayments would be."
              )
            )
          : section(
              { class: "result ok" },
              h1("Your results"),
              p(
                "Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again."
              ),
              div(
                { class: "payments" },
                div(
                  { class: "monthly-payments" },
                  p("Your monthly repayments"),
                  p({ class: "monthly-payments-value" }, monthlyRepaymentState)
                ),
                hr,
                div(
                  { class: "total-payments" },
                  p("Total you'll repay over the term"),
                  span({ class: "total-payments-value" }, totalState)
                )
              )
            )
    );
  };
}
