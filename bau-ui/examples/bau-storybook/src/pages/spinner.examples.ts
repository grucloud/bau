import spinner from "@grucloud/bau-ui/spinner";
import componentGrid from "./componentGrid";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { tr, bau } = context;
  const { section, h2, h3 } = bau.tags;

  const ComponentGrid = componentGrid(context);

  const Spinner = spinner(context);
  return () =>
    section(
      { id: "spinner" },
      h2(tr("Spinner Examples")),
      h3(tr("Spinner Table")),
      ComponentGrid({
        Item: (props: any) => Spinner(props),
      })
    );
};
