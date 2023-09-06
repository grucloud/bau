import { i as inBrowser, a as isProd, p as pathFromLocation, g as globalStyle, d as classNames, t as toPropsAndChildren, b as button, h as header, f as footer, c as createContext, m as mountApp } from "./utils-04af3368.js";
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
    grid-template-columns: minmax(15%, 250px) minmax(50%, 70%) minmax(20%, 30%);
    grid-template-rows: auto auto 1fr auto auto;
    grid-template-areas:
      "header header header"
      "navbar breadcrumbs toc"
      "navbar main toc"
      "navbar paginationnav toc"
      "footer footer toc";
    min-height: 100vh;
  `;
  return function DocApp({
    navBarTree: navBarTree2 = {},
    contentHtml,
    breadcrumbs: breadcrumbs2,
    paginationNav = {}
  }) {
    const contentHtmlState = bau.state(contentHtml);
    const mainElState = bau.derive(
      () => MainContent({ contentHtml: contentHtmlState.val })
    );
    const tocElState = bau.derive(() => Toc({ contentEl: mainElState.val }));
    const navBarEl = NavBar({
      tree: navBarTree2,
      pathnameState
    });
    const breadcrumbsState = bau.state(breadcrumbs2);
    const breadcrumbsElState = bau.derive(
      () => BreadcrumbsDoc({ breadcrumbs: breadcrumbsState.val })
    );
    const paginationNavState = bau.state(paginationNav);
    const paginationNavElState = bau.derive(
      () => PaginationNav({ data: paginationNavState.val })
    );
    const onLocationChange = async ({ nextPage }) => {
      pathnameState.val = window.location.pathname;
      const { contentHtml: contentHtml2, frontmatter, breadcrumbs: breadcrumbs3, paginationNav: paginationNav2 } = await loadContent({
        nextPage,
        context: context2,
        pageNotFound: pageNotFound2
      });
      if (frontmatter) {
        frontmatter.title && (window.document.title = frontmatter.title);
        frontmatter.description && (window.document.description = frontmatter.description);
      }
      contentHtmlState.val = contentHtml2;
      breadcrumbsState.val = breadcrumbs3;
      paginationNavState.val = paginationNav2;
    };
    createRouter(context2, { onLocationChange });
    return div(
      {
        class: className
      },
      Header(),
      navBarTree2 && navBarEl,
      () => breadcrumbsElState.val,
      () => tocElState.val,
      () => mainElState.val,
      () => paginationNavElState.val,
      Footer()
    );
  };
}
const createDocAppProp = async ({ context: context2 }) => {
  if (isProd()) {
    const mainEl = document.getElementById("main-content");
    const breadcrumbsEl = document.querySelector("ul[data-breadcrumbs]");
    const paginationNavEl = document.querySelector("nav[data-paginationnav]");
    return {
      contentHtml: mainEl.innerHTML,
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
  const { bau } = context2;
  const { div } = bau.tags;
  const noop = () => void 0;
  return function Animate({ animationHide = noop, animationShow = noop, ...props }, child) {
    return div(
      {
        class: classNames("animate", options == null ? void 0 : options.class, props.class),
        bauChildMutated: ({ record, element }) => {
          [...record.removedNodes].forEach((childNode) => {
            if (!animationHide() || childNode.getAttribute("cloned"))
              return;
            const nodeCloned = childNode.cloneNode(true);
            nodeCloned.setAttribute("cloned", true);
            nodeCloned.style.top = 0;
            nodeCloned.style.left = 0;
            nodeCloned.style.width = childNode.getAttribute("width");
            nodeCloned.style.height = childNode.getAttribute("height");
            nodeCloned.style.position = "absolute";
            nodeCloned.style.animation = animationHide();
            record.target.appendChild(nodeCloned);
            nodeCloned.addEventListener(
              "animationend",
              () => {
                var _a;
                return (_a = nodeCloned.parentNode) == null ? void 0 : _a.removeChild(nodeCloned);
              }
            );
          });
          [...record.addedNodes].forEach((childNode) => {
            if (childNode.getAttribute("cloned"))
              return;
            element.style.position = "relative";
            const rect = childNode.getBoundingClientRect();
            childNode.setAttribute("width", rect.width + "px");
            childNode.setAttribute("height", rect.height + "px");
            if (animationShow()) {
              childNode.style.animation = animationShow();
              const animationEndHandler = () => {
                childNode.removeEventListener(
                  "animationend",
                  animationEndHandler
                );
                childNode.style.animation = "";
              };
              childNode.addEventListener("animationend", animationEndHandler);
            }
          });
        },
        ...props
      },
      child
    );
  };
}
function list(context2, options) {
  const { bau, css } = context2;
  const { ul } = bau.tags;
  const className = css`
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0 0;
    &.solid {
      & li:hover {
        filter: brightness(var(--brightness-hover-always));
      }
      & li.active {
        filter: brightness(var(--brightness-active-always));
      }
    }
    & > li {
      padding: 0.4rem;
      cursor: pointer;
      background-color: inherit;
      transition: all var(--transition-slow) ease-out;
      display: flex;
      &:hover {
        filter: brightness(var(--brightness-hover));
      }
      &.active {
        filter: brightness(var(--brightness-active));
      }
    }
  `;
  return function List(...args) {
    let [
      { color = "neutral", variant = "plain", size, ...props },
      ...children
    ] = toPropsAndChildren(args);
    return ul(
      {
        ...props,
        class: classNames(
          "list",
          className,
          color,
          variant,
          size,
          options == null ? void 0 : options.class,
          props == null ? void 0 : props.class
        )
      },
      ...children
    );
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
const createStyles = ({ keyframes }) => {
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
    hideToRight: keyframes`
   from {
     transform: translateX(0%);
     opacity: 1;
   }
   to {
     transform: translateX(100%);
     opacity: 0;
   }
   `
  };
};
function drillDownMenu(context2, options = {}) {
  const { bau, css, window, config } = context2;
  const { base = "", hashBased = false } = options;
  const baseUrl = `${config.base}${base}`;
  const backHref = (currentTree) => {
    var _a;
    return ((_a = currentTree.parentTree.data) == null ? void 0 : _a.href) ?? currentTree.parentTree.children[0].data.href;
  };
  const renderHeaderDefault = ({ variant, color, size, currentTree, data }) => header2(
    Button(
      {
        variant,
        color,
        size,
        href: `${baseUrl}${backHref(currentTree)}`,
        class: css`
            flex-grow: 0;
          `,
        "data-buttonback": true
      },
      "←"
    ),
    Button(
      {
        variant,
        color,
        size,
        href: `${baseUrl}${data.href}`,
        class: css`
            flex-grow: 1;
          `,
        "data-ischild": true
      },
      data.name
    )
  );
  const renderMenuItemDefault = ({
    size,
    subTree: {
      data: { name, href },
      children = []
    }
  }) => Button(
    {
      size,
      href: `${baseUrl}${href}`,
      "data-ischild": !children.length
    },
    name
  );
  const isActiveDefault = ({ pathname, subTree }) => {
    var _a;
    return pathname === ((_a = subTree == null ? void 0 : subTree.data) == null ? void 0 : _a.href);
  };
  const {
    renderHeader = renderHeaderDefault,
    renderMenuItem = renderMenuItemDefault,
    isActive = isActiveDefault
  } = options;
  const { li, nav, div, header: header2, a } = bau.tags;
  const Animate = animate(context2);
  const List = list(context2);
  const Button = button(context2, {
    class: css`
      &.button {
        justify-content: flex-start;
      }
    `
  });
  const { hideToLeft, hideToRight } = createStyles(context2);
  const className = css`
    font-weight: var(--font-weight-semibold);
    overflow: hidden;
    position: relative;
    & header {
      display: flex;
      align-items: center;
      font-weight: var(--font-weight-bold);
      & a {
        padding: 0.6rem;
        border-radius: 0;
        font-weight: 600;
      }
    }
    & a,
    & ul {
      border-width: 0 !important;
      box-shadow: none !important;
    }
    & ul {
      overflow: hidden;
      & .has-children {
        &::after {
          content: "\u203A";
          padding: 0 0.5rem 0 0.5rem;
        }
      }
      & li {
        padding: 0;
        & a {
          width: 100%;
        }
      }
    }
  `;
  const Menu = ({ variant, color, size, currentTree, pathnameState }) => {
    const { children, parentTree, data } = currentTree;
    return div(
      { class: classNames("drillDownMenu", variant, color, size) },
      parentTree && renderHeader({ variant, color, size, data, currentTree }),
      children && List(
        { class: classNames(variant, color, size) },
        children.map(
          (subTree) => li(
            {
              class: () => classNames(
                subTree.children && "has-children",
                isActive({ pathname: pathnameState.val, subTree }) && "active"
              )
            },
            renderMenuItem({ variant, color, size, subTree })
          )
        )
      )
    );
  };
  const findInitialTree = ({ tree, pathname }) => {
    let currentTree = treeAddParent({})(structuredClone(tree));
    let subTree = findSubTree(pathname)(currentTree);
    if (!subTree) {
      console.error("drilldown no sub tree", pathname);
      subTree = currentTree;
    }
    return subTree;
  };
  return function DrillDownMenu(props) {
    const {
      variant = "plain",
      color = "neutral",
      size = "md",
      tree,
      ...otherProps
    } = props;
    const pathnameState = bau.state(
      window.location.pathname.replace(baseUrl, "")
    );
    const treeState = bau.derive(
      () => findInitialTree({
        tree,
        pathname: pathnameState.val
      })
    );
    window.document.addEventListener("click", (event) => {
      const { target } = event;
      const href = target.getAttribute("href");
      if (target.tagName === "A" && href && !href.startsWith("http")) {
        let path = href.replace(baseUrl, "");
        if (!hashBased) {
          path = path.replace(target.hash, "");
        }
        pathnameState.val = path;
      }
    });
    let direction = 1;
    const onclick = (event) => {
      const { dataset } = event.target;
      if (dataset.buttonback == "true") {
        direction = -1;
      } else if (dataset.ischild == "false") {
        direction = 1;
      } else if (dataset.ischild == "true") {
        direction = 0;
      }
    };
    const animationHide = (direction2) => {
      switch (direction2) {
        case 1:
          return `${hideToLeft} ${animationDuration}`;
        case -1:
          return `${hideToRight} ${animationDuration}`;
        default:
          return "";
      }
    };
    const animationShow = (direction2) => {
      switch (direction2) {
        case 1:
          return `${hideToRight} ${animationDuration} reverse`;
        case -1:
          return `${hideToLeft} ${animationDuration} reverse`;
        default:
          return "";
      }
    };
    return nav(
      {
        class: classNames(className, options == null ? void 0 : options.class, otherProps.class),
        onclick
      },
      Animate(
        {
          animationHide: () => animationHide(direction),
          animationShow: () => animationShow(direction)
        },
        () => Menu({
          variant,
          color,
          size,
          currentTree: treeState.val,
          pathnameState
        })
      )
    );
  };
}
function navBar(context2) {
  const { bau, css } = context2;
  const { div } = bau.tags;
  const DrillDownMenu = drillDownMenu(context2);
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
        size: "sm",
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
  const { article } = bau.tags;
  const ButtonCopyText = buttonCopyText(context2);
  createHighlightStyle(createGlobalStyles);
  const updateContent = (el, { contentHtml }) => {
    el.innerHTML = contentHtml;
    el.querySelectorAll("pre > code").forEach((codeEl) => {
      codeEl.append(ButtonCopyText());
    });
  };
  return function MainContent({ contentHtml }) {
    const el = article({
      id: "main-content",
      class: css`
        grid-area: main;
        overflow-y: scroll;
      `
    });
    updateContent(el, { contentHtml });
    return el;
  };
}
function tableOfContent(context2, options = {}) {
  const { bau, css, window } = context2;
  const { nav, ul, li, a } = bau.tags;
  const { headerSelector = "h2,h3" } = options;
  const activeHeadingId = bau.state("no");
  const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => callback(...args), wait);
    };
  };
  const className = css`
    grid-area: toc;
    position: sticky;
    right: 0;
    z-index: 1;
    top: calc(var(--header-height));
    height: fit-content;
    max-height: calc(100vh - var(--header-height));
    background-color: var(--background-color);
    border-left: 1px solid var(--color-emphasis-200);
    & ul {
      padding-left: 0rem;
      & ul {
        padding-left: 1rem;
      }
    }
    & li {
      display: block;
      &::before {
        content: "";
        border: 1px solid transparent;
        margin-right: 1rem;
        display: inline;
        height: 100%;
        vertical-align: middle;
      }
      &.active::before {
        transition: all 0.4s ease-in-out;
        border-color: var(--link-color);
      }
    }
    & a {
      font-size: 0.8rem;
      text-decoration: none;
      color: var(--color-content-secondary);
      &:hover {
        text-decoration: underline;
      }
      &.active {
        color: var(--link-color);
      }
    }
  `;
  const TocItem = ({ value, id, children = [] }) => {
    const link = a({
      class: () => activeHeadingId.val == id ? "active" : "",
      href: `#${id}`
    });
    link.innerHTML = value;
    return li(
      { class: () => activeHeadingId.val == id ? "active" : "" },
      link,
      children.length > 0 && ul(children.map(TocItem))
    );
  };
  const headerLevel = (el) => el.tagName.charAt(1);
  const createToc = ({ contentEl }) => {
    const headings = contentEl.querySelectorAll(headerSelector);
    let levelCurrent = 2;
    let newNode = {};
    let nodeCurrent = { children: [] };
    let parentNode = nodeCurrent;
    const tree = parentNode;
    let parents = [parentNode];
    [...headings].forEach((heading) => {
      const level = headerLevel(heading);
      heading.setAttribute("id", heading.textContent);
      if (heading.innerHTML.includes("<button")) {
        return;
      }
      newNode = {
        value: heading.innerHTML,
        id: heading.id ?? heading.textContent,
        children: []
      };
      if (levelCurrent == level) {
        nodeCurrent = newNode;
        parentNode.children.push(nodeCurrent);
      } else if (levelCurrent < level) {
        parents.push(parentNode);
        parentNode = nodeCurrent;
        nodeCurrent.children.push(newNode);
        nodeCurrent = newNode;
      } else if (levelCurrent > level) {
        parentNode = parents[level - 1];
        parents = parents.slice(0, level - 1);
        parentNode.children.push(newNode);
        nodeCurrent = newNode;
      }
      levelCurrent = level;
    });
    return tree;
  };
  return function TableOfContent(...args) {
    let [{ color, variant, size = "md", contentEl, ...props }] = toPropsAndChildren(args);
    const toc2 = createToc({ contentEl });
    const handleScroll = debounce(() => {
      const headings = contentEl.querySelectorAll(headerSelector);
      const activeHeading = [...headings].find((heading) => {
        const { top, height } = heading.getBoundingClientRect();
        if (top + height > 60) {
          return true;
        }
      });
      if (activeHeading) {
        activeHeadingId.val = activeHeading == null ? void 0 : activeHeading.id;
      }
    }, 100);
    return nav(
      {
        ...props,
        class: classNames(
          "tableOfContent",
          size,
          variant,
          color,
          className,
          options == null ? void 0 : options.class,
          props == null ? void 0 : props.class
        ),
        bauMounted: () => {
          window.addEventListener("scroll", handleScroll);
        },
        bauUnmounted: () => {
          window.removeEventListener("scroll", handleScroll);
        }
      },
      toc2.children && ul(toc2.children.map(TocItem))
    );
  };
}
function toc(context2) {
  const TableOfContent = tableOfContent(context2);
  return function Toc({ contentEl }) {
    return TableOfContent({ contentEl });
  };
}
function breadcrumbs(context2, options) {
  const { bau, css } = context2;
  const { ul, li, span } = bau.tags;
  const Button = button(context2);
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
    let [
      { color = "neutral", variant = "plain", size = "md", items, ...props },
      ...children
    ] = toPropsAndChildren(args);
    return ul(
      {
        ...props,
        class: classNames(className, options == null ? void 0 : options.class, props == null ? void 0 : props.class)
      },
      items.map(
        ({ href, name }) => li(
          (href ? Button : span)(
            {
              href,
              color,
              variant,
              size,
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
        ...breadcrumbs2
      ]
    };
    return Breadcrumbs(breadcrumbsProps);
  };
}
function createPaginationNav(context2, options) {
  const { bau, css, config } = context2;
  const { div, a, span, nav } = bau.tags;
  const className = css`
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: grid;
    grid-area: paginationnav;
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
  const Link = ({ text }) => ({ name, label, href }) => a(
    { href: `${config.base}${href}` },
    span({ class: "sublabel" }, text),
    div({ class: `label ${text}` }, label ?? name)
  );
  return function PaginationNavigation(...args) {
    let [{ color, variant = "plain", size = "md", data = {}, ...props }] = toPropsAndChildren(args);
    const { next, previous } = data;
    return nav(
      {
        "data-paginationnav": JSON.stringify(data),
        "aria-label": "pages navigation",
        ...props,
        class: classNames(
          "paginationNavigation",
          size,
          className,
          options == null ? void 0 : options.class,
          props == null ? void 0 : props.class
        )
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
const navBarTree = { "children": [{ "data": { "name": "Introduction", "href": "docs/index" }, "index": true }, { "data": { "name": "Installation", "href": "docs/Installation" } }, { "data": { "name": "Commands", "href": "docs/Commands" } }, { "data": { "name": "Configuration", "href": "docs/Configuration" } }, { "data": { "name": "Markdown", "href": "docs/Markdown" } }] };
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
