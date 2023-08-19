import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import cn from "@grucloud/bau-css/classNames.js";
import animate from "../animate/animate.js";
import button from "../button/button.js";
import list from "../list/list.js";

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

const createStyles = ({ keyframes }) => {
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
  };
};

export default function (context, options) {
  const { bau, css, window } = context;
  const { base = "" } = options;

  const renderHeaderDefault = ({ currentTree, data }) =>
    header(
      Button(
        {
          variant: "plain",
          href: `${base}${currentTree.parentTree.children[0].data.href}`,
          class: css`
            flex-grow: 0;
          `,
          "data-buttonback": true,
        },
        "\u2190"
      ),
      Button(
        {
          variant: "plain",
          href: `${base}${data.href}`,
          class: css`
            flex-grow: 1;
          `,
          "data-ischild": true,
        },
        data.name
      )
    );

  const renderMenuItemDefault = ({ data: { name, href }, children = [] }) =>
    Button(
      {
        href: `${base}${href}`,
        "data-ischild": !children.length,
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

  const { li, nav, div, header, a } = bau.tags;
  const Animate = animate(context);
  const List = list(context);

  const Button = button(context, {
    class: css`
      &.button {
        justify-content: flex-start;
      }
    `,
  });
  const { hideToLeft, hideToRight } = createStyles(context);

  const className = css`
    font-weight: var(--font-weight-semibold);
    overflow: hidden;
    position: relative;

    & header {
      display: flex;
      align-items: center;
      font-weight: var(--font-weight-bold);
      border-bottom: 1px solid var(--color-emphasis-200);
      & a {
        padding: 0.6rem;
        border-radius: 0;
      }
    }
    & ul {
      overflow: hidden;
      & .has-children {
        &::after {
          content: "\u203A";
          padding: 0 0.5rem 0 0.5rem;
        }
      }
      & li {
        padding: 0;
        & a {
          width: 100%;
        }
      }
    }
  `;

  const Menu = ({ variant, color, size, currentTree, pathnameState }) => {
    const { children, parentTree, data } = currentTree;
    //console.log("Menu", currentTree, pathnameState.val);
    return div(
      { class: cn("drillDownMenu", variant, color, size) },
      parentTree && renderHeader({ data, currentTree }),
      children &&
        List(
          { class: cn(variant, color, size) },
          children.map((subTree) =>
            li(
              {
                class: () =>
                  cn(
                    subTree.children && "has-children",
                    isActive({ pathname: pathnameState.val, subTree }) &&
                      "active"
                  ),
              },
              renderMenuItem(subTree)
            )
          )
        )
    );
  };

  const findInitialTree = ({ tree, pathname }) => {
    let currentTree = treeAddParent({})(structuredClone(tree));
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
      size = "md",
      tree,
      pathnameState = bau.state(window.location.pathname),
      ...otherProps
    } = props;

    let direction = 1;

    const onclick = (event) => {
      const { dataset } = event.target;
      if (dataset.buttonback == "true") {
        direction = -1;
      } else if (dataset.ischild == "false") {
        direction = 1;
      } else if (dataset.ischild == "true") {
        direction = 0;
      }
    };

    const treeState = bau.derive(() =>
      findInitialTree({
        tree,
        pathname: pathnameState.val,
      })
    );

    const animationHide = (direction) => {
      switch (direction) {
        case 1:
          return `${hideToLeft} ${animationDuration}`;
        case -1:
          return `${hideToRight} ${animationDuration}`;
        default:
          return "";
      }
    };

    const animationShow = (direction) => {
      switch (direction) {
        case 1:
          return `${hideToRight} ${animationDuration} reverse`;
        case -1:
          return `${hideToLeft} ${animationDuration} reverse`;
        default:
          return "";
      }
    };

    return nav(
      {
        class: cn(className, options?.class, otherProps.class),
        onclick,
      },
      Animate(
        {
          animationHide: () => animationHide(direction),
          animationShow: () => animationShow(direction),
        },
        () =>
          Menu({
            variant,
            color,
            size,
            currentTree: treeState.val,
            pathnameState,
          })
      )
    );
  };
}
