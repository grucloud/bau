import treeView from "@grucloud/bau-ui/treeView";

import { componentList } from "./componentListData";
import { pagesList } from "./pagesListData";

export default function (context) {
  const { tr, bau, css } = context;
  const { ul, li, nav, a, span } = bau.tags;

  const tree = {
    data: { name: "Root Menu" },
    children: [
      {
        data: { name: "Components" },
        expanded: true,
        children: componentList().map((data) => ({ data })),
      },
      {
        data: { name: "Pages", id: "/pages" },
        expanded: true,
        children: pagesList().map((data) => ({ data })),
      },
    ],
  };

  const renderMenuItem = ({ name, id }) =>
    (id ? a : span)(
      {
        href: `#${id}`,
        onclick: (event) => {},
      },
      name
    );

  const TreeView = treeView(context, { renderMenuItem });

  return function NavBarMenu({}) {
    return nav(
      {
        class: css`
          grid-area: sidebar;
          position: sticky;
          top: calc(var(--header-height) + 1rem);
          align-self: start;
          overflow-y: scroll;
          height: calc(100vh - var(--header-height) - 1rem);
        `,
      },
      TreeView({ tree })
    );
  };
}
