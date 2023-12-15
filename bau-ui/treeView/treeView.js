import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import classNames from "@grucloud/bau-css/classNames.js";
import collapsible from "../collapsible";

const treeAddParent =
  ({ parent, grandParent }) =>
  (tree) => {
    const { children = [], ...othersTreeProps } = tree;
    const result = { ...othersTreeProps };
    result.children = children?.map(
      treeAddParent({ parent: tree, grandParent: parent })
    );
    if (parent) {
      parent.parent = grandParent;
    }
    result.parent = parent;
    return result;
  };

const createStyles = ({ css, createGlobalStyles }) => {
  createGlobalStyles`
:root {
  --treeview-link-padding-horizontal: 2rem;
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
            text-align: left;
            color: inherit;
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
    ({ depth = 1, maxDepth, parent, color, variant, size }) =>
    (item) => {
      const { children, expanded } = item;
      const closeState = bau.state(!expanded);

      const Header = () =>
        div(
          {
            class: css`
              cursor: ${children ? "pointer" : "auto"};
              display: inline-flex;
              justify-content: flex-start;
              align-items: center;
              width: 100%;
            `,
            onclick: (event) => {
              if (children) {
                closeState.val = !closeState.val;
              }
            },
          },
          renderMenuItem({ item, parent, depth })
        );

      const Content = () =>
        ul(
          {
            class: classNames(color, size),
          },
          children.map(Tree({ depth: depth + 1, maxDepth, parent: item }))
        );
      return li(
        Collapsible({
          expanded,
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
      ul(
        Tree({ maxDepth, color, variant, size })(treeAddParent({})({ ...tree }))
      )
    );
  };
}
