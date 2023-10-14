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
    const result = { ...othersTreeProps };
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

export default function (context, options = {}) {
  const { bau, css, window, config } = context;
  const { base = "", hashBased = false } = options;
  const baseUrl = `${config.base}${base}`;
  const backHref = (currentTree) =>
    currentTree.parentTree.data?.href ??
    currentTree.parentTree.children[0].data.href;

  const renderHeaderDefault = ({ variant, color, size, currentTree, data }) =>
    header(
      Button(
        {
          variant,
          color,
          size,
          href: `${baseUrl}${backHref(currentTree)}`,
          class: css`
            flex-grow: 0;
          `,
          "data-buttonback": true,
        },
        "\u2190"
      ),
      Button(
        {
          variant,
          color,
          size,
          href: `${baseUrl}${data.href}`,
          class: css`
            flex-grow: 1;
          `,
          "data-ischild": true,
        },
        data.name
      )
    );

  const renderMenuItemDefault = ({
    size,
    subTree: {
      data: { name, href },
      children = [],
    },
  }) =>
    Button(
      {
        size,
        href: `${baseUrl}${href}`,
        "data-ischild": !children.length,
      },
      name
    );

  const isActiveDefault = ({ pathname, subTree }) =>
    pathname === subTree?.data?.href;

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
      & a {
        padding: 0.6rem;
        border-radius: 0;
        font-weight: 600;
      }
    }
    & a,
    & ul {
      border-width: 0 !important;
      box-shadow: none !important;
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
  const renderListDefault = ({
    children,
    pathnameState,
    variant,
    color,
    size,
  }) =>
    List(
      { class: cn(variant, color, size) },
      children.map((subTree) =>
        li(
          {
            class: () =>
              cn(
                subTree.children && "has-children",
                isActive({ pathname: pathnameState.val, subTree }) && "active"
              ),
          },
          renderMenuItem({ variant, color, size, subTree })
        )
      )
    );

  const Menu = ({ variant, color, size, currentTree, pathnameState }) => {
    const { children, parentTree, data, renderList } = currentTree;
    if (renderList) {
    }
    return div(
      { class: cn("drillDownMenu", variant, color, size) },
      parentTree && renderHeader({ variant, color, size, data, currentTree }),
      children && renderList
        ? renderList({
            renderListDefault,
            children,
            pathnameState,
            variant,
            color,
            size,
          })
        : renderListDefault({ children, pathnameState, variant, color, size })
    );
  };

  const findInitialTree = ({ tree, pathname }) => {
    let currentTree = treeAddParent({})({ ...tree });
    let subTree = findSubTree(pathname)(currentTree);
    if (!subTree) {
      // console.error("drilldown no sub tree", pathname);
      subTree = currentTree;
    }
    return subTree;
  };

  const pathnameState = bau.state(
    window.location.pathname.replace(baseUrl, "")
  );

  window.document.addEventListener("click", (event) => {
    const { target } = event;
    const href = target.getAttribute("href");
    if (
      target.tagName === "A" &&
      href &&
      !href.startsWith("http") &&
      !href.startsWith("#")
    ) {
      let path = href.replace(baseUrl, "");
      if (!hashBased) {
        path = path.replace(target.hash, "");
      }
      pathnameState.val = path;
    }
  });

  return function DrillDownMenu(props) {
    const {
      size = options.size ?? "md",
      variant = options.variant ?? "plain",
      color = options.color ?? "neutral",
      tree,
      ...otherProps
    } = props;
    let _currentTree;
    let currentTreeState = bau.derive(() => {
      _currentTree = findInitialTree({
        tree,
        pathname: pathnameState.val,
      });
      return _currentTree;
    });

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
        class: cn(
          className,
          variant,
          color,
          size,
          options?.class,
          otherProps.class
        ),
        onclick,
      },
      Animate(
        {
          animationHide: () => animationHide(direction),
          animationShow: () => animationShow(direction),
        },
        bau.bind({
          deps: [currentTreeState],
          render: () => () =>
            Menu({
              variant,
              color,
              size,
              currentTree: _currentTree,
              pathnameState,
            }),
        })
      )
    );
  };
}
