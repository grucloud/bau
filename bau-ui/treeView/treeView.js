import { toPropsAndChildren } from "@grucloud/bau/bau.js";
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
    display: inline-flex;

    &.solid div:hover {
      filter: brightness(var(--brightness));
    }

    & ul {
      display: block;
      list-style: none;
      margin: 0;
      padding-left: 0;
      overflow: hidden;
      will-change: height;
      transition: height var(--transition-fast) ease-out;
      background: inherit;

      & li {
        padding-left: var(--menu-link-padding-horizontal);
        border-radius: 0.25rem;
        background: inherit;

        > div {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background-color var(--transition-fast) ease-in-out;
          background: inherit;
          &:hover {
            filter: brightness(var(--brightness-hover));
          }
          &::after {
            transition: transform var(--transition-fast) linear;
            font-size: x-large;
            margin-right: 1rem;
          }
          > a,
          span {
            display: flex;
            flex-grow: 1;
            text-decoration: none;
            color: inherit;
            padding: var(--menu-link-padding-vertical)
              var(--menu-link-padding-horizontal);
          }
        }
      }
    }

    & > ul > li {
      padding-left: 0rem;
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
        }
      }
    `,
  };
};

export default function (context, options) {
  const { bau, css, createGlobalStyles, window } = context;
  const { renderMenuItem } = options;
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
    ({ depth = 1, maxDepth, color, variant, size }) =>
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
              class: classNames(color, size),
              bauMounted: ({ element }) => {
                closeState.val && (element.style.height = "0px");
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

  return function TreeView({
    tree,
    maxDepth = Infinity,
    size,
    variant = "plain",
    color = "neutral",
    ...otherProps
  }) {
    return nav(
      {
        class: classNames(
          styles.nav,
          size,
          variant,
          color,
          options?.class,
          otherProps.class
        ),
      },
      tree.children &&
        ul(tree.children.map(Tree({ maxDepth, color, variant, size })))
    );
  };
}
