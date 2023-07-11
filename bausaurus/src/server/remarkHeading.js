import slugify from "@sindresorhus/slugify";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";

export default function plugin() {
  return async (root) => {
    visit(root, "heading", (headingNode) => {
      const data = headingNode.data ?? (headingNode.data = {});
      const properties = data.hProperties ?? (data.hProperties = {});

      const headingTextNodes = headingNode.children.filter(
        ({ type }) => !["html", "jsx"].includes(type)
      );
      const heading = toString(
        headingTextNodes.length > 0 ? headingTextNodes : headingNode
      );
      const id = slugify(heading);

      data.id = id;
      properties.id = id;
    });
  };
}
