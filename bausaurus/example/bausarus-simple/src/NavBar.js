import treeView from "@grucloud/bau-ui/treeView/treeView.js";
import { inBrowser } from "./utils.js";

export default function (context) {
  const { bau, css } = context;
  const { a, span } = bau.tags;

  const renderMenuItem = ({ name, label, href }) =>
    (href ? a : span)(
      {
        href,
      },
      label ?? name
    );

  const TreeView = treeView(context, { renderMenuItem });

  return function NavBar({ tree }) {
    return TreeView({
      tree,
      class: css`
        grid-area: navbar;
        padding: 1rem;
        position: sticky;
        top: calc(var(--header-height) + 1rem);
        align-self: start;
      `,
      // TODO limit to 2 when render on server
      maxDepth: inBrowser() ? Infinity : 2,
    });
  };
}
