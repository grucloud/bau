import { type Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { bau, css } = context;
  const { form, h1, input, label, button, p, footer } = bau.tags;

  const className = css`
    display: flex;
    flex-direction: column;
    & p {
      font-size: 0.9rem;
    }
  `;

  return ({ onsubmit }: any) => {
    return form(
      { class: className, onsubmit },
      h1("Personal Info"),
      p("Please provide your name, email address, and phone number."),
      label(
        "Name",
        input({
          type: "text",
          name: "name",
          placeholder: "e.g Stephen King",
          required: true,
        })
      ),
      label(
        "Email Address",
        input({
          type: "email",
          required: true,
          placeholder: "e.g stephenking@lorem.com",
        })
      ),
      label(
        "Phone Number",
        input({
          type: "text",
          required: true,
          name: "phone",
          pattern: String.raw`\d*`,
          minLength: 6,
          placeholder: "e.g. 1234567890",
        })
      ),
      footer(button({ type: "submit" }, "Next"))
    );
  };
}
