import { type Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { bau, css } = context;
  const {
    form,
    button,
    h1,
    p,
    input,
    footer,
    div,
    label,
    span,
    strong,
    small,
  } = bau.tags;

  const className = css`
    border: 1px solid red;
    .radio-group {
      display: flex;
      justify-content: space-around;
      > label {
        border: 1px solid red;
        padding: 1rem;
      }
    }
  `;

  return ({ onsubmit }: any) => {
    return form(
      { class: className, onsubmit },
      h1("Select your plan"),
      p("You have the option of monthly or yearly billing."),
      div(
        { class: "radio-group" },
        label(
          input({ type: "radio", name: "plan", id: "arcade" }),
          p(strong("Arcade")),
          p(small("$9/month"))
        ),
        label(
          input({ type: "radio", name: "plan", id: "advanced" }),
          p(strong("Advanced")),
          p(small("$12/month"))
        ),
        label(
          input({ type: "radio", name: "plan", id: "pro" }),
          p(strong("Pro")),
          p(small("$15/month"))
        )
      ),
      footer(
        button({ type: "button" }, "Go back"),
        button({ type: "submit" }, "Next Step")
      )
    );
  };
}
