import createSwitch from "@grucloud/bau-ui/switch";
import componentGrid from "./componentGrid";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { tr, bau, css } = context;
  const { section, form, label, div, h2 } = bau.tags;

  const ComponentGrid = componentGrid(context);
  const Switch = createSwitch(context);

  return () =>
    section(
      { id: "switch" },
      h2(tr("Switch Examples")),
      form(
        div(
          {
            class: css`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `,
          },
          label({ for: "my-shinny-switch" }, "My shinny switch"),
          Switch({ id: "my-shinny-switch" })
        )
      ),
      h2(tr("Switch Table")),
      ComponentGrid({
        Item: (props: any) =>
          div(
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
          ),
      })
    );
};
