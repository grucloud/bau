import treeView from "@grucloud/bau-ui/treeView/treeView.js";

export default function (context) {
  const { bau, css } = context;
  const { nav, a, div, body, li, p, ul } = bau.tags;

  const renderMenuItem = ({ name, href, frontmatter }) =>
    a(
      {
        href,
      },
      frontmatter?.title ?? name
    );

  const TreeView = treeView(context, { renderMenuItem });

  return function NavBar({ tree }) {
    return TreeView({
      tree,
      class: css`
        grid-area: navbar;
        padding: 1rem;
        border: 1px red dotted;
      `,
      //"data-navbar": JSON.stringify(tree),
    });
  };
}
