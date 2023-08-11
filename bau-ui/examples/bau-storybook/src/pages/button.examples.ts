import button from "@grucloud/bau-ui/button";
import componentGrid from "./componentGrid";

import { Context } from "../context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, p, h3 } = bau.tags;
  const ComponentGrid = componentGrid(context);

  const Button = button(context);
  return () =>
    section(
      {
        id: "button",
        class: css`
          & button {
            margin: 0.5rem;
          }
        `,
      },
      h3("Button Examples"),
      ComponentGrid({
        Item: (props: any) =>
          Button(
            {
              ...props,
            },
            `${props.variant} ${props.color}`
          ),
      }),
      h3("Full With"),
      p(
        Button(
          {
            color: "primary",

            class: css`
              width: 100%;
            `,
          },
          "witdh: 100%"
        )
      ),
      h3("Icon"),
      p(
        Button({ "aria-label": "Close" }, "\u2716"),
        Button({}, "\u27EA"),
        Button({}, "\u27E8"),
        Button({}, "\u27E9"),
        Button({}, "\u27EB")
      )
    );
};
