import button from "@grucloud/bau-ui/button";
import buttonGroup from "@grucloud/bau-ui/buttonGroup";
import componentGrid from "./componentGrid";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { tr, bau } = context;
  const { section, h2, h3 } = bau.tags;
  const ComponentGrid = componentGrid(context);
  const Button = button(context);
  const ButtonGroup = buttonGroup(context);

  const groups = ["ONE", "TWO", "THREE"];

  return () =>
    section(
      {
        id: "button-group",
      },
      h2(tr("Button Group Examples")),
      h3("Outline"),
      ButtonGroup(
        { color: "primary", variant: "solid" },
        groups.map((group) =>
          Button({ color: "primary", variant: "solid" }, group)
        )
      ),
      h3("Button Group Table"),
      ComponentGrid({
        Item: (props: any) =>
          ButtonGroup(
            { ...props },
            groups.map((group) => Button(props, group))
          ),
      })
    );
};
