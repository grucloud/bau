import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import cn from "@grucloud/bau-css/classNames.js";
import animate from "../animate/animate.js";
import button from "../button/button.js";

const animationDuration = "0.3s";

const treeAddParent =
  ({ parent, grandParent }) =>
  (tree) => {
    const { children, ...othersTreeProps } = tree;
    const result = structuredClone(othersTreeProps);
    result.children = children?.map(
      treeAddParent({ parent: tree, grandParent: parent })
    );
    if (parent) {
      parent.parentTree = grandParent;
    }
    result.parentTree = parent;
    return result;
  };

const findSubTree = (initialPathname) => (tree) => {
  if (!initialPathname) {
    return tree;
  }
  if (tree?.data?.href == initialPathname) {
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
 `,
  };
};

export default function (context, options) {
  const { bau, css, window } = context;
  const { base = "" } = options;
  const renderHeaderDefault = ({ currentTree, data, onclickBack }) =>
    header(
      Button(
        {
          href: `${base}${currentTree.parentTree.children[0].data.href}`,
          onclick: onclickBack({ currentTree }),
          class: css`
            flex-grow: 0;
          `,
        },
        "\u2190"
      ),
      Button(
        {
          href: `${base}${data.href}`,
          class: css`
            flex-grow: 1;
            justify-content: flex-start;
          `,
        },
        data.name
      )
    );

  const renderMenuItemDefault = ({ name, href }) =>
    Button(
      {
        href: `${base}${href}`,
      },
      name
    );

  const isActiveDefault = ({ subTree }) =>
    window.location.pathname.replace(base, "") === subTree?.data?.href;

  const {
    renderHeader = renderHeaderDefault,
    renderMenuItem = renderMenuItemDefault,
    isActive = isActiveDefault,
  } = options;

  const { ul, li, nav, div, header, a } = bau.tags;
  const Animate = animate(context);
  const Button = button(context, {
    class: css`
      flex-grow: 1;
      justify-content: flex-start;
    `,
  });
  const { hideToLeft, hideToRight, showFromRight, showFromLeft } =
    createStyles(context);

  const className = css`
    font-weight: var(--font-weight-semibold);
    overflow: hidden;
    position: relative;
    & a {
      padding: 0.5rem;
      border-radius: 0;
    }
    & header {
      display: flex;
      align-items: center;
      font-weight: var(--font-weight-bold);
      border-bottom: 1px solid var(--color-emphasis-100);
      transition: background-color var(--transition-slow) ease-in-out;
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
        filter: brightness(var(--brightness-active));
      }

      & li {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: inherit;
        transition: all var(--transition-fast) ease-in-out;
        &:hover {
          filter: brightness(var(--brightness-hover));
        }
        & a,
        span {
          text-decoration: none;
          width: 100%;
          color: inherit;
          padding: var(--drill-down-menu-padding);
        }
      }
      &.solid {
        & li:hover {
          filter: brightness(var(--brightness-hover-always));
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
    currentTree,
    pathnameState,
  }) => {
    const { children, parentTree, data } = currentTree;
    //console.log("Menu", currentTree, pathnameState.val);
    return div(
      { class: cn("drillDownMenu", variant, color, size) },
      parentTree && renderHeader({ data, currentTree, onclickBack }),
      children &&
        ul(
          { class: cn(variant, color, size) },
          children.map((subTree) =>
            li(
              {
                class: () =>
                  cn(
                    subTree.children && "has-children",
                    isActive({ pathname: pathnameState.val, subTree }) &&
                      "is-active"
                  ),
                onclick:
                  subTree.children && onclickItem({ currentTree: subTree }),
              },
              renderMenuItem(subTree.data)
            )
          )
        )
    );
  };

  const findInitialTree = ({ tree, pathname }) => {
    let currentTree = treeAddParent({})(tree);
    let subTree = findSubTree(pathname)(currentTree);
    if (!subTree) {
      console.log("drilldown no sub tree", pathname);
      subTree = currentTree;
    }
    return subTree;
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
    //console.log("DrillDownMenu");
    const onclickItem =
      ({ currentTree }) =>
      (event) =>
        replaceChildren(event, navEl, currentTree, true);

    const onclickBack =
      ({ currentTree }) =>
      (event) =>
        replaceChildren(event, navEl, currentTree.parentTree, false);

    const replaceChildren = (event, navEl, currentTree, right) => {
      // If the navEl is replaced, the bau binding is lost.
      navEl.firstChild.replaceChildren(
        Animate(
          {
            parent: navEl,
            animationHide: `${
              right ? hideToLeft : hideToRight
            } ${animationDuration}`,
            animationShow: `${
              right ? showFromRight : showFromLeft
            } ${animationDuration}`,
          },
          Menu({
            variant,
            color,
            size,
            currentTree,
            onclickItem,
            onclickBack,
            pathnameState,
          })
        )
      );
    };

    const navEl = nav(
      {
        class: cn(className, options?.class, otherProps.class),
      },
      () => {
        return Menu({
          variant,
          color,
          size,
          currentTree: findInitialTree({
            tree,
            pathname: pathnameState.val,
          }),
          onclickItem,
          onclickBack,
          pathnameState,
        });
      }
    );

    return navEl;
  };
}
