import { Context } from "@grucloud/bau-ui/context";
import createSwitch from "@grucloud/bau-ui/switch";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css } = context;
  const { footer, form, label, article } = bau.tags;

  const Switch = createSwitch(context, {
    variant: "outline",
    color: "primary",
  });
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  const className = css`
    & label {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      gap: 0.5rem;
    }
    & article {
      display: inline-flex;
      flex-direction: column;
    }
  `;

  return () => {
    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };

    return form(
      { onsubmit, class: className },
      article(
        label("My shinny switch", Switch({ name: "my-shinny-switch" })),
        label(
          "Switch with default",
          Switch({ name: "my-switch--default", defaultChecked: "on" })
        )
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
  };
};
