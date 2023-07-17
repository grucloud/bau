import classNames from "@grucloud/bau-css/classNames.js";

const createStyles = ({ css, createGlobalStyles }) => {
  createGlobalStyles`
:root {
  --menu-color: var(--font-color-base);
  --menu-color-active: var(--color-primary);
  --menu-color-background-active: var(--hover-overlay);
  --menu-color-background-hover: var(--hover-overlay);
  --menu-link-padding-horizontal: 0.75rem;
  --menu-link-padding-vertical: 0.375rem;
}
`;

  const nav = css`
    font-weight: var(--font-weight-semibold);
    overflow-x: hidden;
    & ul {
      display: block;
      list-style: none;
      margin: 0;
      padding-left: 0;
      overflow: hidden;
      will-change: height;
      transition: height var(--transition-fast) ease-out;
      & li {
        padding-left: var(--menu-link-padding-horizontal);
        border-radius: 0.25rem;
        > div {
          width: 100%;
          display: flex;
          justify-content: space-between;
          transition: background-color var(--transition-fast) ease-in-out;
          &:hover {
            background: var(--color-emphasis-100);
          }
          &::after {
            transition: transform var(--transition-fast) linear;
            font-size: x-large;
            margin-right: 0.5rem;
          }
          > a,
          span {
            display: flex;
            flex-grow: 1;
            text-decoration: none;
            color: var(--menu-color);
            padding: var(--menu-link-padding-vertical)
              var(--menu-link-padding-horizontal);
          }
        }
      }
    }
  `;

  return {
    nav,
    expanded: css`
      > div {
        &::after {
          content: "\u203A";
          transform: rotate(90deg);
        }
      }
    `,
    collapsed: css`
      > div {
        &::after {
          content: "\u203A";
          transform: rotate(0deg);
        }
      }
    `,
  };
};

export default function (context, { renderMenuItem }) {
  const { bau, css, createGlobalStyles, window } = context;
  const { ul, li, nav, div } = bau.tags;

  const styles = createStyles({ css, createGlobalStyles });

  const collapseOrExpandSection = ({ element, closeState }) => {
    if (element.scrollHeight == 0) return;
    closeState.val ? collapseSection(element) : expandSection(element);
  };

  function collapseSection(element) {
    element.style.height = element.scrollHeight + "px";
    const animationEndHandler = () => {
      element.removeEventListener("transitionend", animationEndHandler);
    };
    element.addEventListener("transitionend", animationEndHandler);
    window.requestAnimationFrame(() => {
      element.style.height = "0px";
    });
  }

  function expandSection(element) {
    const animationEndHandler = () => {
      element.removeEventListener("transitionend", animationEndHandler);
      element.style.height = null;
    };
    element.addEventListener("transitionend", animationEndHandler);
    element.style.height = element.scrollHeight + "px";
  }

  const Tree =
    ({ depth = 1, maxDepth }) =>
    (item) => {
      const { children, expanded } = item;
      const closeState = bau.state(!expanded);
      return li(
        {
          class: () =>
            classNames(
              children
                ? closeState.val
                  ? styles.collapsed
                  : styles.expanded
                : ""
            ),
        },
        div(
          {
            class: css`
              cursor: pointer;
            `,
            onclick: (event) => {
              if (children) {
                closeState.val = !closeState.val;
              }
            },
          },
          renderMenuItem(item.data)
        ),
        children &&
          depth < maxDepth &&
          ul(
            {
              bauMounted: ({ element }) => {
                closeState.val
                  ? (element.style.height = "0px")
                  : (element.style.height = element.scrollHeight + "px");
              },
              "aria-expanded": ({ element }) => {
                collapseOrExpandSection({ element, closeState });
                return !closeState.val;
              },
            },
            children.map(Tree({ depth: depth + 1, maxDepth }))
          )
      );
    };

  return function TreeView({ tree, maxDepth = Infinity, ...otherProps }) {
    return nav(
      {
        class: classNames(styles.nav, otherProps.class),
      },
      tree.children && ul(tree.children.map(Tree({ maxDepth })))
    );
  };
}
