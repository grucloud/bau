import assert from "assert";
import rubico from "rubico";
import rubicox from "rubico/x/index.js";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const { pipe, tap } = rubico;
const { when, prepend } = rubicox;

// export default function retextSentenceSpacing() {
//   return (tree) => {
//     visit(tree, "custom", function (node, index, parent) {
//       parent.children.splice(index, 1);
//       return [SKIP, index];
//     });
//   };
// }

export const md2Html = ({ contentMd, data }) =>
  pipe([
    () => contentMd,
    when(() => data.title, prepend(`# ${data.title}`)),
    (content) =>
      unified()
        .use(remarkParse)
        .use(remarkGfm)
        //.use(retextSentenceSpacing)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(content),
    tap((tree) => {
      //console.log(tree);
    }),
  ])();
