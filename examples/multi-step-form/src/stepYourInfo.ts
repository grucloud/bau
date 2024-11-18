import { type Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { bau, css } = context;
  const { form, h1, input, label, button } = bau.tags;

  const className = css`
    border: 1px solid red;
    display: flex;
    flex-direction: column;
  `;

  return ({ onsubmit }) => {
    return form(
      { class: className, onsubmit },
      h1("Your Info"),
      label(
        "Name",
        input({ name: "name", placeholder: "e.g Stephen King", required: true })
      ),
      label(
        "Email Address",
        input({ type: "email", placeholder: "e.g stephenking@lorem.com" })
      ),
      label(
        "Phone Number",
        input({ name: "phone", placeholder: "e.g. 1234567890" })
      ),
      button({ type: "submit" }, "Next")
    );
  };
}
