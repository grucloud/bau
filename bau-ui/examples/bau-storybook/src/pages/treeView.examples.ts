import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
import componentGrid from "./componentGrid";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { tr, bau } = context;
  const { section, a, h2, h3 } = bau.tags;

  const ComponentGrid = componentGrid(context);

  const menu: Tree = {
    data: { name: "Root Menu" },
    children: [
      {
        data: { name: "Menu 1", href: "#menu" },
        expanded: true,
        children: [
          { data: { name: "Sub Menu 1", href: "#menusub2" } },
          { data: { name: "Sub Menu 2", href: "#menusub1" } },
        ],
      },
      {
        data: { name: "Menu 2", href: "#menu2" },
        children: [{ data: { name: "Sub Menu 21", href: "#menusub21" } }],
      },
    ],
  };

  const renderMenuItem = ({ name, href }: any) =>
    a(
      {
        href,
        onclick: (event: any) => {
          event.preventDefault();
        },
      },
      name
    );

  const TreeView = treeView(context, { renderMenuItem });

  return () =>
    section(
      { id: "treeview" },
      h2(tr("Tree View")),
      h3(tr("Tree View Default")),
      TreeView({ tree: menu }),
      h3(tr("Tree View Table")),
      ComponentGrid({
        Item: (props: any) => TreeView({ ...props, tree: menu }),
      })
    );
};
