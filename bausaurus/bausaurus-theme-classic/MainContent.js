import buttonCopyText from "./ButtonCopyText.js";

const createHighlightStyle = (createGlobalStyles) => {
  createGlobalStyles`pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#2f1e2e;color:#a39e9b}.hljs-comment,.hljs-quote{color:#8d8687}.hljs-link,.hljs-meta,.hljs-name,.hljs-regexp,.hljs-selector-class,.hljs-selector-id,.hljs-tag,.hljs-template-variable,.hljs-variable{color:#ef6155}.hljs-built_in,.hljs-deletion,.hljs-literal,.hljs-number,.hljs-params,.hljs-type{color:#f99b15}.hljs-attribute,.hljs-section,.hljs-title{color:#fec418}.hljs-addition,.hljs-bullet,.hljs-string,.hljs-symbol{color:#48b685}.hljs-keyword,.hljs-selector-tag{color:#815ba4}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}`;
  createGlobalStyles`pre code.hljs{border-radius: var(--global-radius)}`;
};
export default function (context) {
  const { bau, css, createGlobalStyles } = context;
  const { main } = bau.tags;

  const ButtonCopyText = buttonCopyText(context);

  createHighlightStyle(createGlobalStyles);

  const updateContent = (el, { contentHtml }) => {
    el.innerHTML = contentHtml;
    el.querySelectorAll("pre > code").forEach((codeEl) => {
      codeEl.append(ButtonCopyText());
    });
  };

  return function MainContent({ contentHtml }) {
    const el = main({
      class: css`
        grid-area: main;
        overflow-y: scroll;
      `,
    });

    updateContent(el, { contentHtml });
    return el;
  };
}
