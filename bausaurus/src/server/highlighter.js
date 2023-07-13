import assert from "assert";
import hljs from "highlight.js/lib/core";
import js from "highlight.js/lib/languages/javascript";
import sh from "highlight.js/lib/languages/shell";
import html from "highlight.js/lib/languages/xml";

const defaultLanguagesMap = { js, sh, html };
const defaultLanguages = Object.keys(defaultLanguagesMap);

const htmlDecode = (window, input) => {
  const doc = new window.DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
};

const findLanguage = (el) => {
  const language = el.getAttribute("class")?.replace("language-", "");
  return defaultLanguages.includes(language) ? language : "sh";
};

export const highlighter =
  ({ dom, context }) =>
  async (contentHtml) => {
    assert(dom);
    const { window } = dom;

    const el = window.document.createElement("main");
    const registerLanguage = async ({ languages }) =>
      languages.forEach(async (language) => {
        hljs.registerLanguage(language, defaultLanguagesMap[language] ?? "sh");
      });

    await registerLanguage({ languages: defaultLanguages });

    el.innerHTML = contentHtml;
    el.querySelectorAll("pre > code").forEach((codeEl) => {
      const codeEscaped = htmlDecode(window, codeEl.innerHTML);
      // Use by the copy to clipboard button
      codeEl.setAttribute("data-code", codeEscaped);
      const language = findLanguage(codeEl);
      codeEl.innerHTML = hljs.highlight(codeEscaped, {
        language,
      }).value;
      codeEl.classList.add("hljs");
      // Needed for the button
      codeEl.style = "position: relative;";
    });

    return el.innerHTML;
  };
