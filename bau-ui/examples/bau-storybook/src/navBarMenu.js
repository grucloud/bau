import treeView from "@grucloud/bau-ui/treeView";

export default function (context) {
  const { tr, bau, css } = context;
  const { div, ul, li, nav, a, span } = bau.tags;

  const renderMenuItem = ({ name, id }) =>
    (id ? a : span)(
      {
        href: `#${id}`,
      },
      name
    );

  const TreeView = treeView(context, { renderMenuItem });

  return function NavBarMenu({ componentList, name }) {
    const tree = {
      data: { name: "Root Menu" },
      children: [
        {
          data: { name },
          expanded: true,
          children: componentList.map((data) => ({ data })),
        },
      ],
    };

    return div(
      {
        class: css`
          grid-area: sidebar;
          flex-shrink: 0;
          position: sticky;
          top: calc(var(--header-height));
          align-self: start;
          overflow-y: scroll;
          height: calc(100vh - var(--header-height) - 1rem);
        `,
      },
      TreeView({ tree })
    );
  };
}
