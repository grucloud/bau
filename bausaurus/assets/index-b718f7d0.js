import { b as button, g as globalStyle, h as header, f as footer, c as createContext, m as mountApp } from "./utils-2e94108d.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function hero(context2) {
  const { bau, css, config } = context2;
  const { div, h1, h2, p } = bau.tags;
  const Button = button(context2);
  const className = css`
    box-shadow: var(--shadow-s);
    margin: 1rem;
    padding: 1rem;
    & h1 {
      font-size: 56px;
      color: var(--color-primary);
    }
    & h2 {
      font-size: 48px;
    }
    & p {
      font-size: 24px;
      color: var(--color-emphasis-900);
    }
  `;
  return function Hero({ name, text, tagLine }) {
    return div(
      {
        class: className
      },
      h1(name),
      h2(text),
      p(tagLine),
      Button(
        { href: `${config.base}docs/`, color: "primary", variant: "solid" },
        "Visit Documentation"
      )
    );
  };
}
function features(context2) {
  const { bau, css } = context2;
  const { div, h4, p } = bau.tags;
  const className = css`
    margin: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    & .feature {
      background-color: var(--color-emphasis-50);
      border-radius: 0.5rem;
      margin: 1rem;
      padding: 1rem;
      flex-grow: 1;
      & p {
        color: var(--font-color-secondary);
      }
    }
  `;
  const Feature = ({ title, Content }) => div({ className: "feature" }, h4(title), p(Content()));
  return function Features({ featuresContent }) {
    return div(
      {
        class: className
      },
      featuresContent.map(Feature)
    );
  };
}
function landingPage(context2) {
  const { bau, css } = context2;
  const { div, span, a } = bau.tags;
  const Hero = hero(context2);
  const Features = features(context2);
  const className = css`
    grid-area: main;
  `;
  const featuresContent = [
    {
      title: "SSG",
      Content: () => "Static Site Generation: build a static website from markdown content."
    },
    {
      title: "Flexible",
      Content: () => "Customize everything: header, footer, navigation tree etc..."
    },
    {
      title: "Bau",
      Content: () => span(
        "Built with ",
        a({ href: "https://github.com/grucloud/bau" }, "Bau"),
        ", a lean library to build web interface."
      )
    }
  ];
  return function Main({}) {
    return div(
      {
        class: className
      },
      Hero({
        name: "Bausaurus",
        text: "Static Site Generation",
        tagLine: "Build a static web site from your markdown documentation"
      }),
      Features({ featuresContent })
    );
  };
}
function layout(context2) {
  const { bau, css, createGlobalStyles } = context2;
  const { div } = bau.tags;
  globalStyle(context2);
  createGlobalStyles`
img  {
  max-width: 100%;
}`;
  const className = css`
    display: grid;
    justify-content: space-between;
    grid-template-columns: minmax(15%, 300px) minmax(50%, 70%) minmax(
        20%,
        350px
      );
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      "header header header"
      "main main main"
      "footer footer footer";
    min-height: 100vh;
  `;
  const Header = header(context2);
  const Footer = footer(context2);
  const LandingPage = landingPage(context2);
  return function Layout2({}) {
    return div(
      {
        class: className
      },
      Header(),
      LandingPage({}),
      Footer()
    );
  };
}
const context = createContext();
const Layout = layout(context);
mountApp(Layout({}));
