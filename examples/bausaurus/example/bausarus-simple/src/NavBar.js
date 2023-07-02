import treeView from "@grucloud/bau-ui/treeView/treeView.js";

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

export default function (context) {
  const { bau, css } = context;
  const { nav, a, div, body, li, p, ul } = bau.tags;

  const renderMenuItem = ({ name, href }) =>
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

  return function NavBar() {
    return nav(
      {
        class: css`
          grid-area: navbar;
          padding: 1rem;
          border: 1px red dotted;
        `,
      },
      TreeView({ tree: menu })
    );
  };
}
