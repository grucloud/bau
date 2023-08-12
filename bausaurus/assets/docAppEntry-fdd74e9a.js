import { i as inBrowser, a as isProd, p as pathFromLocation, g as globalStyle, d as classNames, b as button, t as toPropsAndChildren, h as header, f as footer, c as createContext, m as mountApp } from "./utils-d5bb0e75.js";
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/bau/bausaurus/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  const links = document.getElementsByTagName("link");
  return Promise.all(deps.map((dep) => {
    dep = assetsURL(dep);
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    const isBaseRelative = !!importerUrl;
    if (isBaseRelative) {
      for (let i = links.length - 1; i >= 0; i--) {
        const link2 = links[i];
        if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
          return;
        }
      }
    } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
      });
    }
  })).then(() => baseModule());
};
const docPath = "/docs/";
let __BAUSAURUS_HASH_MAP__;
const jsAssetFileFromHref = ({ context: context2, nextPage }) => {
  const pathname = pathFromLocation(nextPage);
  try {
    const hash = __BAUSAURUS_HASH_MAP__[pathname];
    return hash ? `${context2.config.base}assets${pathname}.md-${hash}.js` : `/assets${pathname}.md.js`;
  } catch (error) {
    return `${pathname}.md`;
  }
};
const loadContent = async ({ nextPage, context: context2, pageNotFound: pageNotFound2 }) => {
  try {
    const jsFile = jsAssetFileFromHref({ context: context2, nextPage });
    return __vitePreload(() => import(
      /* @vite-ignore */
      jsFile
    ), true ? [] : void 0);
  } catch (error) {
    const PageNotFound = pageNotFound2(context2);
    return { contentHtml: PageNotFound().outerHTML, toc: "{}" };
  }
};
const createRouter = (context2, { onLocationChange }) => {
  const { window, config } = context2;
  const fetchHashMap = async () => {
    try {
      const res = await fetch(`${config.base}docs/hashmap.json`);
      const hashMap = await res.json();
      __BAUSAURUS_HASH_MAP__ = hashMap;
      return hashMap;
    } catch (error) {
    }
  };
  inBrowser() && isProd() && fetchHashMap();
  window.addEventListener(
    "popstate",
    () => onLocationChange({
      nextPage: window.location.pathname
    })
  );
  window.addEventListener("click", (event) => {
    const { target } = event;
    let href = target.getAttribute("href");
    if (target.tagName === "A" && target.href.includes(docPath) && href && !href.startsWith("http") && !href.startsWith("#")) {
      let nextPage = target.href.replace(".md", "");
      context2.window.history.pushState({}, null, nextPage);
      window.scrollTo({
        top: 0,
        left: 0
        //behavior: "smooth",
      });
      event.preventDefault();
      onLocationChange({
        nextPage
      });
    }
  });
};
const createStyles$1 = (context2) => {
  const { createGlobalStyles } = context2;
  globalStyle(context2);
  createGlobalStyles`
    :root {
      --header-height: 3rem;

      --table-cell-padding: 0.75rem;
      --table-background: transparent;
      --table-stripe-background: rgba(0, 0, 0, 0.03);
      --table-border-width: 1px;
      --table-border-color: var(--color-emphasis-300);
      --table-head-background: inherit;
      --table-head-color: inherit;
      --table-head-font-weight: var(--font-weight-bold);
      --table-cell-color: inherit;
    }

    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
    }
    blockquote {
      margin: 1rem 0;
      border-left: 0.2rem solid var(--color-primary-lighter);
      padding: 0.25rem 0 0.25rem 1rem;
      font-size: 1rem;
      color: var(--color-emphasis-900);
      & > p {
        margin: 0;
      }
    }
    img {
      max-width: 100%;
    }
    code:hover > button {
      background: var(--background-color);
      visibility: visible;
    }
    table {
      border-collapse: collapse;
      display: block;
      margin-bottom: var(--spacing-vertical);

      & thead tr {
        border-bottom: 2px solid var(--table-border-color);
      }

      & thead, tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }

      & tr {
        background-color: var(--table-background);
        border-top: var(--table-border-width) solid var(--table-border-color);
      }

      & td, th {
        border: var(--table-border-width) solid var(--table-border-color);
        padding: var(--table-cell-padding);
      }

      & th {
        background-color: var(--table-head-background);
        color: var(--table-head-color);
        font-weight: var(--table-head-font-weight);
      }

      & td {
        color: var(--table-cell-color);
      }
    }
  `;
};
function docApp(context2, {
  header: header2,
  navBar: navBar2,
  breadcrumbsDoc: breadcrumbsDoc2,
  mainContent: mainContent2,
  toc: toc2,
  createPaginationNav: createPaginationNav2,
  footer: footer2,
  pageNotFound: pageNotFound2
}) {
  const { bau, css, window } = context2;
  const { div } = bau.tags;
  const pathnameState = bau.state(window.location.pathname);
  createStyles$1(context2);
  const Header = header2(context2);
  const NavBar = navBar2(context2);
  const BreadcrumbsDoc = breadcrumbsDoc2(context2);
  const MainContent = mainContent2(context2);
  const PaginationNav = createPaginationNav2(context2);
  const Toc = toc2(context2);
  const Footer = footer2(context2);
  const className = css`
    display: grid;
    grid-template-columns: minmax(15%, 300px) minmax(50%, 70%) minmax(15%, 20%);
    grid-template-rows: auto auto 1fr auto auto;
    grid-template-areas:
      "header header header"
      "navbar breadcrumbs toc"
      "navbar main toc"
      "navbar paginationnav toc"
      "footer footer footer";
    min-height: 100vh;
  `;
  return function DocApp({
    navBarTree: navBarTree2 = {},
    contentHtml,
    breadcrumbs: breadcrumbs2,
    toc: toc3,
    paginationNav = {}
  }) {
    const mainEl = MainContent({ contentHtml });
    const navBarEl = NavBar({
      tree: navBarTree2,
      pathnameState
    });
    const tocEl = Toc({ toc: toc3 });
    const breadcrumbsEl = BreadcrumbsDoc({ breadcrumbs: breadcrumbs2 });
    const paginationNavEl = PaginationNav({ paginationNav });
    const onLocationChange = async ({ nextPage }) => {
      pathnameState.val = window.location.pathname;
      const { contentHtml: contentHtml2, toc: toc4, frontmatter, breadcrumbs: breadcrumbs3, paginationNav: paginationNav2 } = await loadContent({
        nextPage,
        context: context2,
        pageNotFound: pageNotFound2
      });
      if (frontmatter) {
        frontmatter.title && (window.document.title = frontmatter.title);
        frontmatter.description && (window.document.description = frontmatter.description);
      }
      mainEl.innerHTML = MainContent({ contentHtml: contentHtml2 }).innerHTML;
      tocEl.innerHTML = Toc({ toc: toc4 }).innerHTML;
      breadcrumbsEl.innerHTML = BreadcrumbsDoc({ breadcrumbs: breadcrumbs3 }).innerHTML;
      paginationNavEl.innerHTML = PaginationNav({ paginationNav: paginationNav2 }).innerHTML;
    };
    createRouter(context2, { onLocationChange });
    return div(
      {
        class: className
      },
      Header(),
      navBarTree2 && navBarEl,
      breadcrumbs2 && breadcrumbsEl,
      mainEl,
      toc3 && tocEl,
      paginationNav && paginationNavEl,
      Footer()
    );
  };
}
const createDocAppProp = async ({ context: context2 }) => {
  if (isProd()) {
    const mainEls = document.getElementsByTagName("main");
    const tocEl = document.querySelector("nav[data-toc]");
    const breadcrumbsEl = document.querySelector("ul[data-breadcrumbs]");
    const paginationNavEl = document.querySelector("nav[data-paginationnav]");
    return {
      contentHtml: mainEls[0].innerHTML,
      toc: JSON.parse(tocEl.dataset.toc),
      breadcrumbs: JSON.parse(breadcrumbsEl.dataset.breadcrumbs),
      paginationNav: JSON.parse(paginationNavEl.dataset.paginationnav)
    };
  } else {
    return loadContent({
      nextPage: location.pathname,
      context: context2
    });
  }
};
function animate(context2, options = {}) {
  return function Animate({ parent, animationHide, animationShow }, node) {
    node.style.animation = animationShow;
    const animationEndHandler = () => {
      node.removeEventListener("animationend", animationEndHandler);
      node.style.animation = "";
    };
    node.addEventListener("animationend", animationEndHandler);
    new MutationObserver((mutationList, observer) => {
      mutationList.filter((record) => record.removedNodes).forEach(
        (record) => [...record.removedNodes].find((removedNode) => {
          parent.style.position = "relative";
          const nodeCloned = removedNode.cloneNode(true);
          nodeCloned.style.top = 0;
          nodeCloned.style.left = 0;
          nodeCloned.style.position = "absolute";
          nodeCloned.style.animation = animationHide;
          if (record.previousSibling) {
            record.previousSibling.after(nodeCloned);
          } else if (record.nextSibling) {
            record.nextSibling.before(nodeCloned);
          } else if (record.target) {
            record.target.appendChild(nodeCloned);
          } else
            ;
          nodeCloned.addEventListener(
            "animationend",
            () => nodeCloned.parentNode.removeChild(nodeCloned)
          );
          observer.disconnect();
          return true;
        })
      );
    }).observe(parent, { childList: true, subtree: true });
    return node;
  };
}
const animationDuration = "0.3s";
const treeAddParent = ({ parent, grandParent }) => (tree) => {
  const { children, ...othersTreeProps } = tree;
  const result = structuredClone(othersTreeProps);
  result.children = children == null ? void 0 : children.map(
    treeAddParent({ parent: tree, grandParent: parent })
  );
  if (parent) {
    parent.parentTree = grandParent;
  }
  result.parentTree = parent;
  return result;
};
const findSubTree = (initialPathname) => (tree) => {
  var _a;
  if (!initialPathname) {
    return tree;
  }
  if (((_a = tree == null ? void 0 : tree.data) == null ? void 0 : _a.href) == initialPathname) {
    return tree.children ? tree : tree.parentTree;
  }
  if (!tree.children) {
    return;
  }
  for (let index = 0; index < tree.children.length; index++) {
    const result = findSubTree(initialPathname)(tree.children[index]);
    if (result) {
      return result;
    }
  }
};
const isActive = ({ window, subTree }) => {
  var _a;
  return window.location.pathname === ((_a = subTree == null ? void 0 : subTree.data) == null ? void 0 : _a.href);
};
const createStyles = ({ createGlobalStyles, keyframes }) => {
  createGlobalStyles`
:root {
  --drill-down-menu-color: var(--font-color-base);
  --drill-down-menu-padding: 0.4rem;
  --drill-down-menu-bg-active: var(--color-emphasis-200);
  --drill-down-menu-bg-hover: var(--color-emphasis-200);
}
`;
  return {
    hideToLeft: keyframes`
  from {
    transform: translateX(0%);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
  `,
    showFromLeft: keyframes`
   from {
     transform: translateX(-100%);
     opacity: 0;
   }
   to {
     transform: translateX(0%);
     opacity: 1;
   }
  `,
    hideToRight: keyframes`
   from {
     transform: translateX(0%);
     opacity: 1;
   }
   to {
     transform: translateX(100%);
     opacity: 0;
   }
   `,
    showFromRight: keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;

  }
  to {
    transform: translateX(0%);
    opacity: 1;
  }
 `
  };
};
function drillDownMenu(context2, options) {
  const { bau, css, window } = context2;
  const { renderHeader, renderMenuItem } = options;
  const { ul, li, nav, div, header: header2, a } = bau.tags;
  const Animate = animate();
  const { hideToLeft, hideToRight, showFromRight, showFromLeft } = createStyles(context2);
  const className = css`
    font-weight: var(--font-weight-semibold);
    overflow: hidden;
    position: relative;
    & a,
    span {
      flex-grow: 1;
      text-decoration: none;
      //color: var(--drill-down-menu-color);
      color: inherit;
    }
    & header {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-weight: var(--font-weight-bold);
      border-bottom: 1px solid var(--color-emphasis-100);
      padding: var(--drill-down-menu-padding);
      transition: background-color var(--transition-slow) ease-in-out;
      &:hover {
        background: var(--drill-down-menu-bg-hover);
      }
      &::before {
        content: "\u2190";
        margin-right: 0.5rem;
      }
    }
    & ul {
      display: block;
      list-style: none;
      margin: 0;
      padding-left: 0;
      overflow: hidden;
      & .has-children {
        &::after {
          content: "\u203A";
          padding: 0 0.5rem 0 0.5rem;
        }
      }
      & .is-active {
        background-color: var(--drill-down-menu-bg-active);
      }
      & li {
        padding: var(--drill-down-menu-padding);
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: transparent;
        transition: background-color var(--transition-slow) ease-in-out;
        &:hover {
          background-color: var(--drill-down-menu-bg-hover);
          cursor: pointer;
        }
      }
    }
  `;
  const Menu = ({
    variant,
    color,
    size,
    onclickItem,
    onclickBack,
    currentTree
  }) => {
    const { children, parentTree, data } = currentTree;
    return div(
      { class: classNames("drillDownMenu", variant, color, size) },
      parentTree && header2(
        {
          onclick: onclickBack({ currentTree })
        },
        renderHeader({ data, currentTree })
        //a({ href: currentTree.parentTree.children[0].data.href }, data.name)
      ),
      children && ul(
        children.map(
          (subTree) => li(
            {
              class: classNames(
                subTree.children && "has-children",
                isActive({ window, subTree }) && "is-active"
              ),
              onclick: subTree.children && onclickItem({ currentTree: subTree })
            },
            renderMenuItem(subTree.data)
          )
        )
      )
    );
  };
  return function DrillDownMenu(props) {
    const {
      variant = "plain",
      color = "neutral",
      size,
      tree,
      pathnameState = bau.state(window.location.pathname),
      ...otherProps
    } = props;
    const onclickItem = ({ currentTree }) => (event) => replaceChildren(event, navEl, currentTree, true);
    const onclickBack = ({ currentTree }) => (event) => replaceChildren(event, navEl, currentTree.parentTree, false);
    const replaceChildren = (event, navEl2, currentTree, right) => {
      navEl2.firstChild.replaceChildren(
        Animate(
          {
            parent: navEl2,
            animationHide: `${right ? hideToLeft : hideToRight} ${animationDuration}`,
            animationShow: `${right ? showFromRight : showFromLeft} ${animationDuration}`
          },
          Menu({
            variant,
            color,
            size,
            currentTree,
            onclickItem,
            onclickBack
          })
        )
      );
    };
    const navEl = nav(
      {
        class: classNames(className, options == null ? void 0 : options.class, otherProps.class)
      },
      () => {
        console.log("drilldown", pathnameState.val);
        let currentTree = treeAddParent({})(tree);
        let subTree = findSubTree(pathnameState.val)(currentTree);
        if (!subTree) {
          console.log("drilldown no sub tree", pathnameState.val);
          subTree = currentTree;
        }
        return div(
          Menu({
            variant,
            color,
            size,
            currentTree: subTree,
            onclickItem,
            onclickBack
          })
        );
      }
    );
    return navEl;
  };
}
function navBar(context2) {
  const { bau, css, window } = context2;
  const { a, span, div } = bau.tags;
  const renderHeader = ({ currentTree, data }) => a({ href: currentTree.parentTree.children[0].data.href }, data.name);
  const renderMenuItem = ({ name, label, href }) => (href ? a : span)(
    {
      href
    },
    label ?? name
  );
  const DrillDownMenu = drillDownMenu(context2, {
    renderMenuItem,
    renderHeader
  });
  return function NavBar({ tree, pathnameState }) {
    return div(
      {
        class: css`
          grid-area: navbar;
          padding-right: 0.5rem;
          position: sticky;
          top: calc(var(--header-height));
          align-self: start;
          background-color: var(--background-color);
          max-height: calc(100vh - var(--header-height));
          overflow-y: scroll;
        `
      },
      DrillDownMenu({
        tree,
        pathnameState
      })
    );
  };
}
const copyTextToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};
function buttonCopyText(context2) {
  const { bau, css, tr } = context2;
  const Button = button(context2);
  const className = css`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    visibility: hidden;
  `;
  return function ButtonCopyText() {
    return Button(
      {
        class: className,
        onclick: async (event) => {
          const code = event.target.parentElement.dataset.code;
          await copyTextToClipboard(code);
        }
      },
      tr("COPY")
    );
  };
}
const createHighlightStyle = (createGlobalStyles) => {
  createGlobalStyles`pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#2f1e2e;color:#a39e9b}.hljs-comment,.hljs-quote{color:#8d8687}.hljs-link,.hljs-meta,.hljs-name,.hljs-regexp,.hljs-selector-class,.hljs-selector-id,.hljs-tag,.hljs-template-variable,.hljs-variable{color:#ef6155}.hljs-built_in,.hljs-deletion,.hljs-literal,.hljs-number,.hljs-params,.hljs-type{color:#f99b15}.hljs-attribute,.hljs-section,.hljs-title{color:#fec418}.hljs-addition,.hljs-bullet,.hljs-string,.hljs-symbol{color:#48b685}.hljs-keyword,.hljs-selector-tag{color:#815ba4}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}`;
  createGlobalStyles`pre code.hljs{border-radius: var(--global-radius)}`;
};
function mainContent(context2) {
  const { bau, css, createGlobalStyles } = context2;
  const { main } = bau.tags;
  const ButtonCopyText = buttonCopyText(context2);
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
      `
    });
    updateContent(el, { contentHtml });
    return el;
  };
}
function toc({ bau, css }) {
  const { ul, li, a, nav } = bau.tags;
  const className = css`
    grid-area: toc;
    position: sticky;
    top: calc(var(--header-height) + 1rem);
    align-self: start;
    border-left: 1px solid var(--color-emphasis-200);
    font-size: 0.8rem;
    margin-right: 1rem;
    list-style: none;
    & ul {
      padding-left: 1rem;
      list-style: none;
    }
    & li {
      margin: 0.5rem;
    }
    & a {
      text-decoration: none;
      color: var(--color-content-secondary);
      &:hover {
        color: var(--color-primary-darkest);
        text-decoration: underline;
      }
    }
  `;
  const TocItem = ({ value, id, children = [] }) => {
    const link = a({ href: `#${id}` });
    link.innerHTML = value;
    return li(link, children.length > 0 && ul(children.map(TocItem)));
  };
  return function Toc({ toc: toc2 }) {
    return nav(
      {
        "data-toc": JSON.stringify(toc2),
        class: className
      },
      (toc2 == null ? void 0 : toc2.children) && ul(toc2.children.map(TocItem))
    );
  };
}
function breadcrumbs(context2, options) {
  const { bau, css } = context2;
  const { ul, li, a, span } = bau.tags;
  const className = css`
    list-style: none;
    display: flex;
    align-items: center;
    padding-left: 0;
    margin-bottom: 0;
    & li {
      display: flex;
      align-items: center;
      font-size: 0.9rem;
      &::after {
        content: "\u3009";
        padding: 0.5rem;
      }
      &:last-child {
        &::after {
          content: "";
        }
      }
      > a,
      span {
        display: flex;
        text-decoration: none;
        border-radius: var(--global-radius);
        padding: 0.5rem;
        &:hover {
          background-color: var(--color-emphasis-100);
        }
      }
    }
  `;
  return function Breadcrumbs(...args) {
    let [{ color, variant = "outline", size, items, ...props }, ...children] = toPropsAndChildren(args);
    return ul(
      {
        ...props,
        class: classNames(
          className,
          // color,
          // variant,
          // size,
          options == null ? void 0 : options.class,
          props == null ? void 0 : props.class
        )
      },
      items.map(
        ({ href, name }) => li(
          (href ? a : span)(
            {
              href,
              class: classNames(color, variant, size)
            },
            name
          )
        )
      )
    );
  };
}
function breadcrumbsDoc(context2) {
  const { bau, css } = context2;
  const Breadcrumbs = breadcrumbs(context2);
  return function BreadcrumbsDoc({ breadcrumbs: breadcrumbs2 }) {
    const breadcrumbsProps = {
      "data-breadcrumbs": JSON.stringify(breadcrumbs2),
      class: css`
        grid-area: breadcrumbs;
      `,
      items: [
        {
          href: "/",
          name: "⌂"
        },
        ,
        ...breadcrumbs2
      ]
    };
    return Breadcrumbs(breadcrumbsProps);
  };
}
function createPaginationNav(context2) {
  const { bau, css } = context2;
  const { div, a, span, nav } = bau.tags;
  const Link = ({ text }) => ({ name, label, href }) => a(
    { href },
    span({ class: "sublabel" }, text),
    div({ class: `label ${text}` }, label ?? name)
  );
  const className = css`
    grid-area: paginationnav;
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: grid;
    gap: var(--spacing-horizontal);
    grid-template-columns: repeat(2, 1fr);
    & > a {
      padding: 0.5rem 1rem;
      text-decoration: none;
      border: 1px solid var(--color-emphasis-300);
      border-radius: var(--global-radius);
      transition: border-color var(--transition-slow);
      &:hover {
        border-color: var(--color-primary);
      }
      .sublabel {
        color: var(--color-content-secondary);
        font-size: 0.8rem;
        font-weight: var(--font-weight-semibold);
        margin-bottom: 0.25rem;
      }
      .label {
        color: var(--link-color);
        font-size: 1rem;
        font-weight: var(--font-weight-bold);
        word-break: break-word;
      }
      .Previous {
        &::before {
          content: "« ";
        }
      }
      .Next {
        &::after {
          content: " »";
        }
      }
    }
  `;
  return function PaginationNav({ paginationNav = {} }) {
    const { next, previous } = paginationNav;
    return nav(
      {
        "data-paginationnav": JSON.stringify(paginationNav),
        "aria-label": "pages navigation",
        class: className
      },
      (previous == null ? void 0 : previous.href) && Link({ text: "Previous" })(previous),
      (next == null ? void 0 : next.href) && Link({ text: "Next" })(next)
    );
  };
}
function pageNotFound({ bau, css, tr }) {
  const { h1, h2, div, p, a, em } = bau.tags;
  const className = css`
    grid-area: notfound;
    border: 1px dotted var(--color-emphasis-200);
    padding: 1rem;
    display: flex;
    flex-direction: column;
  `;
  return function NotFound() {
    return div(
      {
        class: className
      },
      h1(tr("Page Not Found")),
      h2(tr("We could not find what you were looking for.")),
      p("The following location cannot be found: ", em(location.href)),
      p(
        tr(
          "Please contact the owner of the site that linked you to the original URL and let them know their link is broken."
        )
      ),
      p(tr("Take me "), a({ href: location.origin }, tr("Home")))
    );
  };
}
const App = (context2) => docApp(context2, {
  header,
  navBar,
  breadcrumbsDoc,
  mainContent,
  toc,
  createPaginationNav,
  footer,
  pageNotFound
});
const navBarTree = { "children": [{ "data": { "name": "Introduction", "href": "/bau/bausaurus/docs/index" }, "index": true }, { "data": { "name": "Installation", "href": "/bau/bausaurus/docs/Installation" } }, { "data": { "name": "Commands", "href": "/bau/bausaurus/docs/Commands" } }, { "data": { "name": "Configuration", "href": "/bau/bausaurus/docs/Configuration" } }, { "data": { "name": "Markdown", "href": "/bau/bausaurus/docs/Markdown" } }] };
const context = createContext();
const loadDocs = async () => {
  try {
    const DocApp = App(context);
    const props = await createDocAppProp({
      context
    });
    mountApp(DocApp({ ...props, navBarTree }));
  } catch (error) {
    console.error("Error: ", error);
    console.error("pathname", location.pathname);
  }
};
loadDocs();
