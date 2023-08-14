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
  --drill-down-menu-bg-active: var(--color-emphasis-100);
  --drill-down-menu-bg-hover: var(--color-emphasis-50);
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
            min-width: 3rem;
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
    a(
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
  const Button = button(context);
  const { hideToLeft, hideToRight, showFromRight, showFromLeft } =
    createStyles(context);

  const className = css`
    font-weight: var(--font-weight-semibold);
    overflow: hidden;
    position: relative;
    & header {
      display: flex;
      align-items: center;
      font-weight: var(--font-weight-bold);
      border-bottom: 1px solid var(--color-emphasis-100);
      transition: background-color var(--transition-slow) ease-in-out;
      & a {
        padding: 0.5rem;
        border-radius: 0;
      }
      &:hover {
        background: var(--drill-down-menu-bg-hover);
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
        & a,
        span {
          text-decoration: none;
          width: 100%;
          color: inherit;
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
    console.log("Menu", currentTree, pathnameState.val);
    return div(
      { class: cn("drillDownMenu", variant, color, size) },
      parentTree && renderHeader({ data, currentTree, onclickBack }),
      children &&
        ul(
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

  const findInitialTree = ({ tree, pathnameStateInitial }) => {
    let currentTree = treeAddParent({})(tree);
    let subTree = findSubTree(pathnameStateInitial)(currentTree);
    if (!subTree) {
      // console.log("drilldown no sub tree", pathnameState.val);
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

    const pathnameStateInitial = pathnameState.val;

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
      div(
        Menu({
          variant,
          color,
          size,
          currentTree: findInitialTree({ tree, pathnameStateInitial }),
          onclickItem,
          onclickBack,
          pathnameState,
        })
      )
    );

    return navEl;
  };
}
