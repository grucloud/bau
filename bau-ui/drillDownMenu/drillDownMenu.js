import classNames from "@grucloud/bau-css/classNames.js";
import animate from "../animate";

const animationDuration = "1s";

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
  }
  to {
    transform: translateX(-100%);
  }
  `,
    showFromLeft: keyframes`
   from {
     transform: translateX(-100%);
   }
   to {
     transform: translateX(0%);
   }
  `,
    hideToRight: keyframes`
   from {
     transform: translateX(0%);
   }
   to {
     transform: translateX(100%);
   }
   `,
    showFromRight: keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
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
    width: fit-content;
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

  return function DrillDownMenu({ tree, ...otherProps }) {
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
      (_event) => {
        replaceChildren(navEl, currentTree, true);
      };

    const onclickBack =
      ({ currentTree }) =>
      (_event) => {
        replaceChildren(navEl, currentTree.parentTree, false);
      };

    navEl.append(
      Menu({
        currentTree: tree,
        onclickItem,
        onclickBack,
      })
    );
    return navEl;
  };
}
