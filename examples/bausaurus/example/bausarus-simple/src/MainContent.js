import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";

export default function ({ bau, css, createGlobalStyles, window }) {
  const { main } = bau.tags;

  function htmlDecode(input) {
    var doc = new window.DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

  createGlobalStyles`pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#fff;color:#000}.hljs-comment,.hljs-quote,.hljs-variable{color:green}.hljs-built_in,.hljs-keyword,.hljs-name,.hljs-selector-tag,.hljs-tag{color:#00f}.hljs-addition,.hljs-attribute,.hljs-literal,.hljs-section,.hljs-string,.hljs-template-tag,.hljs-template-variable,.hljs-title,.hljs-type{color:#a31515}.hljs-deletion,.hljs-meta,.hljs-selector-attr,.hljs-selector-pseudo{color:#2b91af}.hljs-doctag{color:grey}.hljs-attr{color:red}.hljs-bullet,.hljs-link,.hljs-symbol{color:#00b0e8}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}`;

  hljs.registerLanguage("javascript", javascript);

  return function MainContent({ contentHtml }) {
    const el = main({
      class: css`
        grid-area: main;
        margin: 1rem;
      `,
    });
    el.innerHTML = contentHtml;
    el.querySelectorAll("code").forEach((codeEl) => {
      codeEl.innerHTML = hljs.highlight(htmlDecode(codeEl.innerHTML), {
        language: "js",
      }).value;
    });

    return el;
  };
}
