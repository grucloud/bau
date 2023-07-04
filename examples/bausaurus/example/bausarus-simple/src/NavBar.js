import treeView from "@grucloud/bau-ui/treeView/treeView.js";
import { inBrowser } from "./utils.js";

export default function (context) {
  const { bau, css } = context;
  const { a } = bau.tags;

  const renderMenuItem = ({ name, href }) =>
    a(
      {
        href,
      },
      name
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
      // TODO limit to 2 when render on server
      maxDepth: inBrowser() ? Infinity : 2,
    });
  };
}
