import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import input from "@grucloud/bau-ui/input";
import form from "@grucloud/bau-ui/form";

export default (context: Context) => {
  const { bau } = context;
  const { article, footer, label } = bau.tags;
  const Input = input(context);

  const Form = form(context);
  const ButtonSubmit = button(context, { variant: "solid", color: "primary" });

  const onsubmit = (event: any) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    alert(JSON.stringify(payload));
  };

  return () =>
    Form(
      { onsubmit },
      article(
        label(
          "Basic input",
          Input({
            name: "my-input",
            placeholder: "Enter Text",
          })
        ),
        label(
          "Required input",
          Input({
            required: true,
            name: "my-required-input",
            placeholder: "Enter Text",
          })
        ),
        label(
          "Disabled input",
          Input({
            name: "my-input-disabled",
            placeholder: "Enter Text",
            disabled: true,
          })
        )
      ),
      footer(ButtonSubmit({ type: "submit" }, "Submit"))
    );
};
