import { Context } from "@grucloud/bau-ui/context";
import textareaAutosize from "@grucloud/bau-ui/textareaAutosize";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css } = context;
  const { form, label, span, footer, p } = bau.tags;

  const TextareaAutosize = textareaAutosize(context);
  const Button = button(context);

  const messageState = bau.state("");

  const onsubmit = (event: any) => {
    event.preventDefault();
    alert(messageState.val);
  };

  const className = css`
    display: flex;
    .textarea-autosize {
      min-width: 370px;
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
            rows: 2,
            value: messageState,
            onchange: (event: any) => (messageState.val = event.target.value),
          })
        )
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
  };
};
