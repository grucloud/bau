import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";
import tableOfContent from "@grucloud/bau-ui/tableOfContent";

import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import componentGrid from "./componentGrid";
import componentSizes from "./componentSizes";

export default (context: Context) => {
  const { bau, css } = context;
  const { div, article, section, h1, p, h2, h3, pre, code } = bau.tags;

  hljs.registerLanguage("javascript", javascript);

  const TableOfContent = tableOfContent(context);

  const Paper = paper(context, {
    class: css`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `,
  });

  const ComponentGrid = componentGrid(context);
  const ComponentSizes = componentSizes(context);

  const HighlighContainer = ({ text }: any) =>
    pre(
      {
        class: css`
          display: inline-block;
        `,
      },
      code({
        class: "hljs language-js",
        bauCreated: ({ element }: any) => {
          element.innerHTML = hljs.highlight(text, {
            language: "js",
          }).value;
        },
      })
    );

  return function PageExample(spec: any) {
    const contentEl = article(
      {
        class: css`
          grid-area: content;
          overflow-x: scroll;
        `,
      },
      h1(spec.title),
      p(spec.description),
      spec.gridItem &&
        !spec.variantColorTableDisable && [
          h2("Variant/Color"),
          Paper(
            ComponentGrid({
              Item: spec.gridItem(context),
            })
          ),
        ],
      spec.gridItem &&
        !spec.variantSizeDisable && [
          h2("Size"),
          p(
            "Component with size: ",
            code("sm"),
            ", ",
            code("md"),
            ", and ",
            code("lg")
          ),
          Paper(
            ComponentSizes({
              item: spec.gridItem,
            })
          ),
        ],
      h2("Usage"),
      h3("Import"),
      HighlighContainer({ text: spec.importStatement }),
      h2("Examples"),
      spec.examples.map((example: any) =>
        section(
          h3(example.title),
          p(example.description),
          Paper(example.createComponent(context)({})),
          HighlighContainer({ text: example.code })
        )
      )
    );

    return div(
      {
        class: css`
          display: grid;
          gap: 1rem;
          grid-template-columns: 1fr auto;
          grid-template-areas: "content toc";
          @media (max-width: 640px) {
            grid-template-columns: 1fr;
            grid-template-areas: "content";
            & nav {
              display: none;
            }
          }
        `,
      },
      contentEl,
      TableOfContent({ contentEl })
    );
  };
};
