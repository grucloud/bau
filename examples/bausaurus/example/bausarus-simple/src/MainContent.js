import hljs from "highlight.js/lib/core";
import js from "highlight.js/lib/languages/javascript";
import sh from "highlight.js/lib/languages/shell";

const defaultLanguagesMap = { js: js, sh: sh };
const defaultLanguages = Object.keys(defaultLanguagesMap);

// TODO await import("highlight.js/lib/languages/javascript") does not work
const registerLanguage = async ({ languages }) =>
  languages.forEach(async (language) => {
    hljs.registerLanguage(language, defaultLanguagesMap[language] ?? "sh");
  });

const createHighlightStyle = (
  createGlobalStyles
) => createGlobalStyles`pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}/*!
Theme: GitHub Dark
Description: Dark theme as seen on github.com
Author: github.com
Maintainer: @Hirse
Updated: 2021-05-15

Outdated base version: https://github.com/primer/github-syntax-dark
Current colors taken from GitHub's CSS
*/.hljs{color:#c9d1d9;background:#0d1117}.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#ff7b72}.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#d2a8ff}.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#79c0ff}.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#a5d6ff}.hljs-built_in,.hljs-symbol{color:#ffa657}.hljs-code,.hljs-comment,.hljs-formula{color:#8b949e}.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#7ee787}.hljs-subst{color:#c9d1d9}.hljs-section{color:#1f6feb;font-weight:700}.hljs-bullet{color:#f2cc60}.hljs-emphasis{color:#c9d1d9;font-style:italic}.hljs-strong{color:#c9d1d9;font-weight:700}.hljs-addition{color:#aff5b4;background-color:#033a16}.hljs-deletion{color:#ffdcd7;background-color:#67060c}`;

const htmlDecode = (window, input) => {
  const doc = new window.DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
};

const findLanguage = (el) => {
  const language = el.getAttribute("class")?.replace("language-", "");
  return defaultLanguages.includes(language) ? language : "sh";
};

export default async function ({ bau, css, createGlobalStyles, window }) {
  const { main } = bau.tags;

  await registerLanguage({ languages: defaultLanguages });

  createHighlightStyle(createGlobalStyles);

  return function MainContent({ contentHtml }) {
    const el = main({
      class: css`
        grid-area: main;
        margin: 1rem;
        overflow-y: scroll;
      `,
    });
    el.innerHTML = contentHtml;
    el.querySelectorAll("code").forEach((codeEl) => {
      // Already processed
      if (codeEl.classList.contains("hljs")) return;
      const language = findLanguage(codeEl);
      codeEl.innerHTML = hljs.highlight(htmlDecode(window, codeEl.innerHTML), {
        language,
      }).value;
      codeEl.classList.add("hljs");
    });

    return el;
  };
}
