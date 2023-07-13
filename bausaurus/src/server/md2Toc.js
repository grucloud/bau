import assert from "assert";
import rubico from "rubico";
import rubicox from "rubico/x/index.js";

import { visit } from "unist-util-visit";
import { unified } from "unified";
import remarkParse from "remark-parse";
import slugify from "@sindresorhus/slugify";
import { toString } from "mdast-util-to-string";

const { pipe, map, get, switchCase, eq } = rubico;
const { callProp, prepend, append } = rubicox;

const wrapWithTag = (tagName) =>
  pipe([prepend(`<${tagName}>`), append(`</${tagName}>`)]);

const toHtml = pipe([
  get("children"),
  map(
    switchCase([
      eq(get("type"), "inlineCode"),
      pipe([get("value"), wrapWithTag("code")]),
      get("value"),
    ])
  ),
  callProp("join", " "),
]);

export const md2Toc = ({ contentMd }) =>
  pipe([
    () => unified().use(remarkParse).parse(contentMd),
    (tree) => {
      let headings = [];
      visit(tree, "heading", (child) => {
        const value = toHtml(child);
        // depth:1 headings are titles and not included in the TOC
        if (!value || child.depth < 2) {
          return;
        }

        headings.push({
          value,
          id: slugify(toString(child)),
          level: child.depth,
        });
      });
      return headings;
    },
    (headings) => {
      let levelCurrent = 2;
      let newNode = {};
      let nodeCurrent = { children: [] };
      let parentNode = nodeCurrent;
      const tree = parentNode;
      let parents = [parentNode];
      headings.forEach((heading) => {
        newNode = { ...heading, children: [] };
        if (levelCurrent == heading.level) {
          nodeCurrent = newNode;
          parentNode.children.push(nodeCurrent);
        } else if (levelCurrent < heading.level) {
          parents.push(parentNode);
          parentNode = nodeCurrent;
          nodeCurrent.children.push(newNode);
          nodeCurrent = newNode;
        } else if (levelCurrent > heading.level) {
          parentNode = parents[heading.level - 1];
          parents = parents.slice(0, heading.level - 1);
          parentNode.children.push(newNode);
          nodeCurrent = newNode;
        }
        levelCurrent = heading.level;
      });

      return tree;
    },
  ])();
