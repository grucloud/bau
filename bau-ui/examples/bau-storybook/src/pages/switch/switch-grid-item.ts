import createSwitch from "@grucloud/bau-ui/switch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;

  const { form, label } = bau.tags;

  const Switch = createSwitch(context);

  return (props: any) =>
    form(
      label(
        {
          class: css`
            display: flex;
            align-items: center;
            gap: 0.5rem;
          `,
        },
        `${props.color} ${props.variant} ${props.size}`,
        Switch({
          ...props,
          id: `my-switch-${props.color}-${props.variant}-${props.size}`,
        })
      )
    );
};
