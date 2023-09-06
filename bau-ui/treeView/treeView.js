import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import classNames from "@grucloud/bau-css/classNames.js";
import collapsible from "../collapsible";

const createStyles = ({ css, createGlobalStyles }) => {
  createGlobalStyles`
:root {
  --treeview-link-padding-horizontal: 0.75rem;
  --treeview-link-padding-vertical: 0.375rem;
}
`;

  const nav = css`
    font-weight: var(--font-weight-semibold);
    overflow-x: hidden;
    display: inline-flex;

    &.solid div:hover {
      filter: brightness(var(--brightness-hover-always));
    }

    & ul {
      display: block;
      list-style: none;
      margin: 0;
      padding-left: 0;
      overflow: hidden;
      background: inherit;

      & > li {
        padding-left: var(--treeview-link-padding-horizontal);
        border-radius: 0.25rem;
        background: inherit;

        & .header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: inherit;
          &:hover {
            filter: brightness(var(--brightness-hover));
          }
          & a,
          & span {
            display: flex;
            flex-grow: 1;
            text-decoration: none;
            color: inherit;
            padding: var(--treeview-link-padding-vertical)
              var(--treeview-link-padding-horizontal);
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
  };
};

export default function (context, options = {}) {
  const { bau, css, createGlobalStyles } = context;
  const { renderMenuItem } = options;
  const { ul, li, nav, div } = bau.tags;

  const styles = createStyles({ css, createGlobalStyles });

  const Collapsible = collapsible(context);

  const Tree =
    ({ depth = 1, maxDepth, color, variant, size }) =>
    (item) => {
      const { children, expanded } = item;
      const closeState = bau.state(!expanded);

      const Header = () =>
        div(
          {
            class: css`
              cursor: pointer;
              display: flex;
              width: 100%;
            `,
            onclick: (event) => {
              if (children) {
                closeState.val = !closeState.val;
              }
            },
          },
          renderMenuItem(item.data)
        );

      const Content = () =>
        ul(
          {
            class: classNames(color, size),
          },
          children.map(Tree({ depth: depth + 1, maxDepth }))
        );
      return li(
        Collapsible({
          Header,
          Content: children && depth < maxDepth && Content,
        })
      );
    };

  return function TreeView({
    tree,
    maxDepth = Infinity,
    size = options.size ?? "md",
    variant = options.variant ?? "outline",
    color = options.color ?? "neutral",
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
