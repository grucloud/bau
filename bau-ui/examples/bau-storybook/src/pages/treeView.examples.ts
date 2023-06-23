import treeView from "@grucloud/bau-ui/treeView";

import { Context } from "../context";

export default (context: Context) => {
  const { tr, bau } = context;
  const { section, div, a, h2 } = bau.tags;

  const menu = {
    name: "Root Menu",
    children: [
      {
        name: "Menu 1",
        href: "#menu",

        children: [
          { name: "Sub Menu 1", href: "#menusub2" },
          { name: "Sub Menu 2", href: "#menusub1" },
        ],
      },
      {
        name: "Menu 2",
        href: "#menu2",
        children: [{ name: "Sub Menu 21", href: "#menusub21" }],
      },
    ],
  };

  const renderMenuItem = ({ name, href }: any) =>
    div(
      a(
        {
          href,
          onclick: () => {},
        },
        name
      )
    );

  const TreeView = treeView(context, { renderMenuItem });

  return () =>
    section({ id: "treeview" }, h2(tr("TreeView")), TreeView({ tree: menu }));
};
