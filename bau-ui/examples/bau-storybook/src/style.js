import globalStyle from "@grucloud/bau-ui/globalStyle/globalStyle.js";

export const createStyles = (context) => {
  const { createGlobalStyles } = context;

  const colorPalette = [
    ["neutral", { h: "0", s: "0%", l: "20%" }],
    ["primary", { h: "230", s: "48%", l: "20%" }],
    ["secondary", { h: "338", s: "100%", l: "20%" }],
    ["success", { h: "120", s: "100%", l: "20%" }],
    ["info", { h: "194", s: "80%", l: "20%" }],
    ["warning", { h: "43", s: "100%", l: "20%" }],
    ["danger", { h: "358", s: "95%", l: "20%" }],
  ];

  globalStyle(context, { colorPalette });

  createGlobalStyles`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
      overflow-x: hidden;
    }

    pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#2f1e2e;color:#a39e9b}.hljs-comment,.hljs-quote{color:#8d8687}.hljs-link,.hljs-meta,.hljs-name,.hljs-regexp,.hljs-selector-class,.hljs-selector-id,.hljs-tag,.hljs-template-variable,.hljs-variable{color:#ef6155}.hljs-built_in,.hljs-deletion,.hljs-literal,.hljs-number,.hljs-params,.hljs-type{color:#f99b15}.hljs-attribute,.hljs-section,.hljs-title{color:#fec418}.hljs-addition,.hljs-bullet,.hljs-string,.hljs-symbol{color:#48b685}.hljs-keyword,.hljs-selector-tag{color:#815ba4}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}

    pre code.hljs{border-radius: var(--global-radius)}
  `;
};
