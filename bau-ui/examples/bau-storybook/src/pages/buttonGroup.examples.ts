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

  return () =>
    section(
      {
        id: "button-group",
      },
      h2(tr("Button Group Examples")),
      h3("Outline"),
      ButtonGroup(
        {},
        Button({}, "ONE"),
        Button({}, "TWO"),
        Button({}, "THREE")
      ),
      h3("Button Group Table"),
      ComponentGrid({
        Item: (props: any) =>
          ButtonGroup(
            { ...props },
            Button({}, "ONE"),
            Button({}, "TWO"),
            Button({}, "THREE")
          ),
      })
    );
};
