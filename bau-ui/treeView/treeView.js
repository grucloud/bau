import classNames from "@grucloud/bau-css/classNames.js";

const collapseOrExpandSection = ({ element, closeState }) => {
  closeState.val ? collapseSection(element) : expandSection(element);
};

function collapseSection(element) {
  element.style.height = "0px";
}

function expandSection(element) {
  element.style.height = element.scrollHeight + "px";
}

const createStyles = ({ css, createGlobalStyles }) => {
  createGlobalStyles`
:root {
  --menu-color: var(--font-color-base);
  --menu-color-active: var(--color-primary);
  --menu-color-background-active: var(--hover-overlay);
  --menu-color-background-hover: var(--hover-overlay);
  --menu-link-padding-horizontal: 0.75rem;
  --menu-link-padding-vertical: 0.375rem;
  --menu-link-sublist-icon: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24"><path fill="rgba(0,0,0,0.5)" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path></svg>');
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
            background: var(--menu-link-sublist-icon) 50% / 2rem 2rem;
            width: 1.25rem;
            padding: 0.5rem;
          }
          > a {
            display: flex;
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
          content: "";
          transform: rotate(180deg);
        }
      }
    `,
    collapsed: css`
      > div {
        &::after {
          content: "";
          transform: rotate(90deg);
        }
      }
    `,
  };
};

export default function (context, { renderMenuItem }) {
  const { bau, css, createGlobalStyles } = context;
  const { ul, li, nav, div } = bau.tags;

  const styles = createStyles({ css, createGlobalStyles });

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
                event.preventDefault();
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
                collapseOrExpandSection({ element, closeState });
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
