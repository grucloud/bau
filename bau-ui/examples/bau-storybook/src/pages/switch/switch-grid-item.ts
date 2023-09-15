import createSwitch from "@grucloud/bau-ui/switch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context, options: any) => {
  const { bau, css } = context;

  const { form, label } = bau.tags;

  const Switch = createSwitch(context, options);

  return (props: any) =>
    form(
      {
        class: css`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `,
      },
      label(
        "off ",
        Switch({
          ...props,
          id: `my-switch-example-off-${props.color}-${props.variant}`,
        })
      ),
      label(
        "on ",
        Switch({
          ...props,
          id: `my-switch-example-on-${props.color}-${props.variant}`,
          checked: true,
        })
      )
    );
};
