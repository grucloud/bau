import createSwitch from "@grucloud/bau-ui/switch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;

  const { section, form, label } = bau.tags;

  const Switch = createSwitch(context);

  return section(
    form(
      label(
        {
          class: css`
            display: flex;
            align-items: center;
            gap: 0.5rem;
          `,
        },
        "My shinny switch",
        Switch({ id: "my-shinny-switch" })
      )
    )
  );
};
