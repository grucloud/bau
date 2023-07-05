import assert from "assert";
import rubico from "rubico";
import rubicox from "rubico/x/index.js";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

import remarkHeading from "./remarkHeading.js";

const { pipe, tap } = rubico;
const { when, prepend } = rubicox;

export const md2Html = ({ contentMd = "", frontmatter }) =>
  pipe([
    tap((tree) => {
      assert(frontmatter);
    }),
    () => contentMd,
    when(() => frontmatter.title, prepend(`# ${frontmatter.title}`)),
    (content) =>
      unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkHeading)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(content),
    tap((params) => {
      assert(true);
    }),
  ])();
