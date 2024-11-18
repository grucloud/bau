import { type Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { bau, css } = context;
  const { form, h1, button } = bau.tags;

  const className = css`
    border: 1px solid red;
  `;

  return ({ onsubmit }) => {
    return form(
      { class: className, onsubmit },
      h1("Add-Ons"),
      button({ type: "submit" }, "Next")
    );
  };
}
