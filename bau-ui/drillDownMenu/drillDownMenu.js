import classNames from "@grucloud/bau-css/classNames.js";
import animate from "../animate/animate.js";

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

export default function (context, { renderMenuItem }) {
  const { bau, css } = context;
  const { ul, li, nav, div, header } = bau.tags;
  const Animate = animate(context);

  const { hideToLeft, hideToRight, showFromRight, showFromLeft } =
    createStyles(context);

  const className = css`
    font-weight: var(--font-weight-semibold);
    overflow: hidden;
    position: relative;
    & a,
    span {
      flex-grow: 1;
      text-decoration: none;
      color: var(--drill-down-menu-color);
    }
    & header {
      display: flex;
      align-items: center;
      cursor: pointer;
      border-bottom: 1px solid var(--color-emphasis-100);
      padding: var(--drill-down-menu-padding);
      transition: background-color var(--transition-slow) ease-in-out;
      &:hover {
        background: var(--color-emphasis-50);
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
      & li {
        padding: var(--drill-down-menu-padding);
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: transparent;
        transition: background-color var(--transition-slow) ease-in-out;
        &:hover {
          background-color: var(--color-emphasis-50);
        }
      }
    }
  `;

  const Menu = ({ onclickItem, onclickBack, currentTree }) => {
    const { children, parentTree, data } = currentTree;
    return div(
      parentTree &&
        header(
          {
            onclick: onclickBack({ currentTree }),
          },
          renderMenuItem(data)
        ),
      children &&
        ul(
          children.map((subTree) =>
            li(
              subTree.children && {
                class: "has-children",
                onclick: onclickItem({
                  currentTree: { ...subTree, parentTree: currentTree },
                }),
              },
              renderMenuItem(subTree.data)
            )
          )
        )
    );
  };

  return function DrillDownMenu({ tree, initialPathname, ...otherProps }) {
    let currentTree = treeAddParent({})(tree);
    let subTree = findSubTree(initialPathname)(currentTree);
    if (!subTree) {
      subTree = currentTree;
    }
    const replaceChildren = (navEl, currentTree, right) =>
      navEl.replaceChildren(
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
            currentTree,
            onclickItem,
            onclickBack,
          })
        )
      );

    const navEl = nav({
      class: classNames(className, otherProps.class),
    });

    const onclickItem =
      ({ currentTree }) =>
      (_event) =>
        replaceChildren(navEl, currentTree, true);

    const onclickBack =
      ({ currentTree }) =>
      (_event) =>
        replaceChildren(navEl, currentTree.parentTree, false);

    navEl.append(
      Menu({
        currentTree,
        onclickItem,
        onclickBack,
      })
    );

    return navEl;
  };
}
