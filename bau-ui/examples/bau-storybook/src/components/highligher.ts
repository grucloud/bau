import { Context } from "@grucloud/bau-ui/context";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import shell from "highlight.js/lib/languages/shell";

export default (context: Context) => {
  const { bau, css } = context;
  const { pre, code } = bau.tags;

  hljs.registerLanguage("javascript", javascript);
  hljs.registerLanguage("sh", shell);

  return function HighlighContainer({ text, language = "js" }: any) {
    const codeEl = code({ class: `hljs language-${language}` });
    codeEl.innerHTML = hljs.highlight(text, {
      language,
    }).value;

    return pre(
      {
        class: css`
          display: inline-block;
        `,
      },
      codeEl
    );
  };
};
