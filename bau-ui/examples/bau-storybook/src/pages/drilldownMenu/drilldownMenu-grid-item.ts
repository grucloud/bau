import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context, options: object) => {
  const tree: Tree = {
    data: { name: "Root Menu", href: "#drilldown-gallery" },
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

  const DrillDownMenu = drillDownMenu(context, options);

  return (props: any) =>
    DrillDownMenu({
      id: `drilldown-gallery`,
      tree,
      ...props,
    });
};
