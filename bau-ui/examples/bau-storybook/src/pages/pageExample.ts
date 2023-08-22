import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import componentGrid from "./componentGrid";
import componentSizes from "./componentSizes";

export default (context: Context) => {
  const { bau, css } = context;
  const { article, section, h1, p, h2, h3, pre, code } = bau.tags;

  hljs.registerLanguage("javascript", javascript);

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
    return article(
      {
        class: css``,
      },
      h1(spec.title),
      p(spec.description),
      spec.gridItem && [
        h2("Variant/Color"),
        !spec.variantColorTableDisable &&
          spec.gridItem &&
          Paper(
            ComponentGrid({
              Item: spec.gridItem(context),
            })
          ),
        h2("Size"),
        p(
          "Component with size: ",
          code("sm"),
          ", ",
          code("md"),
          ", and ",
          code("lg")
        ),
        spec.gridItem &&
          Paper(
            ComponentSizes({
              Item: spec.gridItem(context),
            })
          ),
      ],
      h2("Usage"),
      h3("Import"),
      HighlighContainer({ text: spec.importStatement }),
      h2("Examples"),
      spec.examples.map((example: any) =>
        section(
          h1(example.title),
          p(example.description),
          Paper(example.createComponent(context)()),
          HighlighContainer({ text: example.code })
        )
      )
    );
  };
};
