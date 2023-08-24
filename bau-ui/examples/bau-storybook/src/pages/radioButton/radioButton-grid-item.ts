import radioButton from "@grucloud/bau-ui/radioButton";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { label, form } = bau.tags;
  const RadioButton = radioButton(context);

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
        RadioButton({
          ...props,
          id: `my-myRadioButton-example-off-${props.color}-${props.variant}`,
        })
      ),
      label(
        "on ",
        RadioButton({
          ...props,
          id: `my-myRadioButton-example-on-${props.color}-${props.variant}`,
          checked: true,
        })
      )
    );
};
