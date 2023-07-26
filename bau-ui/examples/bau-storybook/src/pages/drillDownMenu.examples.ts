import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";

import { Context } from "../context";

export default (context: Context) => {
  const { tr, bau } = context;
  const { section, a, h2 } = bau.tags;

  const tree: Tree = {
    data: { name: "Root Menu" },
    children: [
      {
        data: { name: "Menu 1", href: "#menu" },
        children: [
          {
            data: { name: "Sub Menu 1", href: "#menusub2" },
            children: [
              { data: { name: "Sub Sub Menu 1", href: "#menusubsub1" } },
            ],
          },
          { data: { name: "Sub Menu 2", href: "#menusub1" } },
        ],
      },
      {
        data: { name: "Menu 2", href: "#menu2" },
        children: [{ data: { name: "Sub Menu 21", href: "#menusub21" } }],
      },
      {
        data: { name: "Menu 3", href: "#menu2" },
      },
    ],
  };

  const renderMenuItem = ({ name, href }: any) =>
    a(
      {
        href,
        onclick: (event: any) => {
          //event.preventDefault();
        },
      },
      name
    );

  const DrillDownMenu = drillDownMenu(context, { renderMenuItem });

  return () =>
    section(
      { id: "drillDownMenu" },
      h2(tr("Drill Down Menu")),
      DrillDownMenu({ tree })
    );
};
