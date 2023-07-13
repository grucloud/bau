import assert from "assert";
import rubico from "rubico";
import rubicox from "rubico/x/index.js";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { fromHtml } from "hast-util-from-html";

import rehypeStringify from "rehype-stringify";
import { toHast } from "mdast-util-to-hast";

import remarkHeading from "./remarkHeading.js";
import { highlighter } from "./highlighter.js";

const { pipe, tap, get } = rubico;
const { when, prepend } = rubicox;

const pluginInspec = () => {
  return async (root) => {
    const handlers = {
      html(h, node) {
        return fromHtml(node.value, { fragment: true });
      },
    };
    return toHast(root, { handlers, allowDangerousHTML: true });
  };
};

export const md2Html =
  ({ dom, context }) =>
  ({ contentMd = "", frontmatter }) =>
    pipe([
      tap((tree) => {
        assert(frontmatter);
      }),
      () => contentMd,
      when(() => frontmatter.title, prepend(`# ${frontmatter.title}\n`)),
      (content) =>
        unified()
          .use(remarkParse)
          .use(remarkGfm)
          .use(remarkHeading)
          .use(pluginInspec)
          .use(rehypeStringify, { allowDangerousHTML: true })
          .process(content),
      tap((params) => {
        assert(true);
      }),
      get("value"),
      highlighter({ dom, context }),
      tap((params) => {
        assert(true);
      }),
    ])();
