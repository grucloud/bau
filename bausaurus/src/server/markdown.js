import assert from "assert";
import rubico from "rubico";

import matter from "gray-matter";
import { md2Toc } from "./md2Toc.js";
import { md2Html } from "./md2Html.js";

const { pipe, tap, assign } = rubico;

export const processMarkdownContent =
  ({ dom, context }) =>
  ({ filename, code }) =>
    pipe([
      tap(() => {
        assert(dom);
        assert(context);
        assert(code);
        assert(filename);
      }),
      () => code,
      matter,
      ({ content, data }) => ({
        filename,
        contentMd: content,
        frontmatter: data,
      }),
      assign({
        contentHtml: md2Html({ dom, context }),
        toc: md2Toc,
      }),
      tap((params) => {
        assert(true);
      }),
    ])();
