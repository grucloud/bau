import { Context } from "@grucloud/bau-ui/context";
import createSwitch from "@grucloud/bau-ui/switch";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css } = context;
  const { footer, form, label } = bau.tags;

  const Switch = createSwitch(context, { variant: "outline" });
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  const onsubmit = (event: any) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    alert(JSON.stringify(payload));
  };

  return () =>
    form(
      { onsubmit },
      label(
        {
          class: css`
            display: flex;
            align-items: center;
            gap: 0.5rem;
          `,
        },
        "My shinny switch",
        Switch({ name: "my-shinny-switch" })
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
};
