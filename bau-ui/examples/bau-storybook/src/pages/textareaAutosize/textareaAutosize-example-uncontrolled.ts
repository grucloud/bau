import { Context } from "@grucloud/bau-ui/context";
import textareaAutosize from "@grucloud/bau-ui/textareaAutosize";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css } = context;
  const { form, label, span, footer, p } = bau.tags;

  const TextareaAutosize = textareaAutosize(context);
  const Button = button(context);

  const onsubmit = (event: any) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.target));
    alert(payload.message);
  };

  const className = css`
    display: flex;
    .textarea-autosize {
      width: 100%;
    }
  `;

  return () => {
    return form(
      { onsubmit, class: className },
      label(
        span("Your Message:"),
        p(
          TextareaAutosize({
            name: "message",
            placeholder: "Enter your message",
            rows: 3,
          })
        )
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
  };
};
