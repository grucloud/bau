import "./style.css";
import hljs from "highlight.js/lib/core";

import javascript from "highlight.js/lib/languages/javascript";

import { Context } from "./context";

export type HighligherProp = {
  href: string;
};

export type ErrorFetch = {
  status?: number;
  statusText?: string;
};

export default ({ bau }: Context) => {
  hljs.registerLanguage("javascript", javascript);

  const { pre, div } = bau.tags;

  // State creation
  const dataState = bau.state("");
  const loadingState = bau.state(false);
  const errorState = bau.state<ErrorFetch>({});

  async function fetchText(request: string) {
    try {
      loadingState.val = true;
      const response = await fetch(request, {});
      if (response.ok) {
        const text = await response.text();
        dataState.val = text;
      } else {
        errorState.val = {
          status: response.status,
          statusText: response.statusText,
        };
      }
    } catch (error: any) {
      errorState.val = { status: 500, statusText: error.toString() };
    } finally {
      loadingState.val = false;
    }
  }

  return function Highligher({ href }: HighligherProp) {
    fetchText(href);
    return () => {
      if (errorState.val.status) {
        return div(
          "Error Loading ",
          href,
          div("Status: ", errorState.val.status),
          errorState.val.statusText &&
            div(`Status text: `, errorState.val.statusText)
        );
      } else if (loadingState.val) {
        return "Loading...";
      } else {
        const highlightedText = hljs.highlight(dataState.val, {
          language: "js",
        }).value;
        const content = pre({});

        content.innerHTML = highlightedText;
        return content;
      }
    };
  };
};
