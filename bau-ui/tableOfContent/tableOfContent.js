import { toPropsAndChildren } from "@grucloud/bau/bau.js";

export default function (context, options = {}) {
  const { bau, css, window } = context;
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
      class: () => (activeHeadingId.val == id ? "active" : ""),
      href: `#${id}`,
    });
    link.innerHTML = value;
    return li(
      { class: () => (activeHeadingId.val == id ? "active" : "") },
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
      //TODO
      if (heading.innerHTML.includes("<button")) {
        return;
      }
      newNode = {
        value: heading.innerHTML,
        id: heading.id ?? heading.textContent,
        children: [],
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
    let [
      {
        size = options.size ?? "md",
        variant = options.variant ?? "plain",
        color = options.color ?? "neutral",
        contentEl,
        ...props
      },
    ] = toPropsAndChildren(args);

    const toc = createToc({ contentEl });

    const handleScroll = debounce(() => {
      const headings = contentEl.querySelectorAll(headerSelector);
      const activeHeading = [...headings].find((heading) => {
        const { top, height } = heading.getBoundingClientRect();
        //TODO
        if (top + height > 60) {
          return true;
        }
      });
      if (activeHeading) {
        activeHeadingId.val = activeHeading?.id;
      }
    }, 100);

    return nav(
      {
        ...props,
        class: [
          "tableOfContent",
          size,
          variant,
          color,
          className,
          options?.class,
          props?.class,
        ],
        bauMounted: (/*{ element }*/) => {
          window.addEventListener("scroll", handleScroll);
        },
        bauUnmounted: (/*{ element }*/) => {
          window.removeEventListener("scroll", handleScroll);
        },
      },
      toc.children && ul(toc.children.map(TocItem))
    );
  };
}
