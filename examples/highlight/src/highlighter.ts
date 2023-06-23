import "./style.css";

import hljs from "highlight.js/lib/core";

import javascript from "highlight.js/lib/languages/javascript";

import { Context } from "./context";

export type HighligherProp = {
  //text: string;
  href: string;
};

export default ({ bau }: Context) => {
  hljs.registerLanguage("javascript", javascript);

  const { pre, div } = bau.tags;

  // State creation
  const dataState = bau.state("");
  const loadingState = bau.state(false);
  const errorState = bau.state({});

  async function fetchText(request: string) {
    try {
      loadingState.val = true;
      const response = await fetch(request, {});
      if (response.ok) {
        const text = await response.text();
        dataState.val = text;
      } else {
        errorState.val = response;
      }
    } catch (error) {
      errorState.val = { status: "Exception", statusText: error };
    } finally {
      loadingState.val = false;
    }
  }

  return function Highligher({ href }: HighligherProp) {
    fetchText(href);
    return bau.bind({
      deps: [dataState, loadingState, errorState],
      render: () => (data, loading, error) => {
        if (error.status) {
          return div(
            "Error Loading ",
            href,
            div("Status: ", error.status),
            error.statusText && div(`Status text: `, error.statusText)
          );
        } else if (loading) {
          return "Loading...";
        } else {
          return pre({
            bauCreated: ({ element }) => {
              const highlightedText = hljs.highlight(data, {
                language: "js",
              }).value;

              element.innerHTML = highlightedText;
            },
          });
        }
      },
    });
  };
};
