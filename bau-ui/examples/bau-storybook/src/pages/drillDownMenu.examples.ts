import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
import componentGrid from "./componentGrid";

import { Context } from "../context";

export default (context: Context) => {
  const { tr, bau, window, config } = context;
  const { section, h2, h3 } = bau.tags;

  const pathnameState = bau.state(
    window.location.pathname.replace(config.base, "")
  );

  const ComponentGrid = componentGrid(context);

  const tree: Tree = {
    data: { name: "Root Menu" },
    children: [
      {
        data: { name: "Menu 1", href: "#dd-menu1" },
        children: [
          {
            data: { name: "Sub Menu 1", href: "#dd-menusub2" },
            children: [
              { data: { name: "Sub Sub Menu 1", href: "#menusubsub1" } },
            ],
          },
          { data: { name: "Sub Menu 2", href: "#menusub1" } },
        ],
      },
      {
        data: { name: "Menu 2", href: "#dd-menu2" },
        children: [{ data: { name: "Sub Menu 21", href: "#menusub21" } }],
      },
      {
        data: { name: "Menu 3", href: "#menu3" },
      },
    ],
  };

  const DrillDownMenu = drillDownMenu(context, {
    base: config.base + "/components/drillDownMenu",
  });

  return () =>
    section(
      { id: "drillDownMenu" },
      h2(tr("Drill Down Menu")),
      DrillDownMenu({ tree, pathnameState }),
      h3("Drill Down Table"),
      ComponentGrid({
        Item: (props: any) =>
          DrillDownMenu({
            tree,
            ...props,
          }),
      })
    );
};
