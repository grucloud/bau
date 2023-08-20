import checkbox from "@grucloud/bau-ui/checkbox";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { label } = bau.tags;

  const Checkbox = checkbox(context);

  return (props: any) =>
    label(
      {
        class: css`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `,
      },
      `${props.color} ${props.variant} ${props.size ?? ""}`,
      Checkbox({
        id: `myCheckbox-gallery-${props.color}-${props.variant}-${props.size}`,
        name: `myCheckbox-gallery-${props.color}-${props.variant}`,
        ...props,
      })
    );
};
