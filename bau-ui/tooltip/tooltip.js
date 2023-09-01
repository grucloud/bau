import classNames from "@grucloud/bau-css/classNames.js";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";

export default function (context, options) {
  const { bau, css, window } = context;
  const { div } = bau.tags;

  const className = css`
    position: relative;
    display: inline-block;
    & .container {
      & .content {
        box-shadow: var(--shadow-m);
        border-radius: var(--global-radius);
        padding: 0.3rem;
      }
      white-space: nowrap;
      position: absolute;
      z-index: 10;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease-in-out;
    }
    & .visible.container {
      visibility: visible;
      opacity: 1;
    }
    & .top.container {
      bottom: 100%;
      padding-bottom: 0.3rem;
    }
    & .bottom.container {
      top: 100%;
      padding-top: 0.3rem;
    }
    & .right.container {
      left: 100%;
      padding-left: 0.3rem;
    }
    & .left.container {
      right: 100%;
      padding-right: 0.3rem;
    }
    & .top.start.container {
      left: 0%;
    }
    & .top.centered.container {
      left: 50%;
      transform: translateX(-50%);
    }
    & .top.end.container {
      left: 100%;
      transform: translateX(-100%);
    }
    & .bottom.start.container {
      left: 0%;
    }
    & .bottom.centered.container {
      left: 50%;
      transform: translateX(-50%);
    }
    & .bottom.end.container {
      left: 100%;
      transform: translateX(-100%);
    }
    & .right.start.container {
      top: 0%;
    }
    & .right.centered.container {
      top: 50%;
      transform: translateY(-50%);
    }
    & .right.end.container {
      top: 100%;
      transform: translateY(-100%);
    }
    & .left.start.container {
      top: 0%;
    }
    & .left.centered.container {
      top: 50%;
      transform: translateY(-50%);
    }
    & .left.end.container {
      top: 100%;
      transform: translateY(-100%);
    }
  `;

  return function Tooltip(...args) {
    let [
      {
        titleEl,
        side = "bottom-start",
        color = "neutral",
        variant = "outline",
        size = "md",
        ...props
      },
      ...children
    ] = toPropsAndChildren(args);

    const tooltipContentEl = div(
      {
        class: classNames("container", ...side.split("-")),
      },
      div(
        { class: classNames("content", color, variant, size), role: "tooltip" },
        titleEl
      )
    );

    const toMovedClass = (add) => `move-to-${add}`;

    const addClassMoved = (cond, add, remove) => {
      if (cond()) {
        const movedClass = toMovedClass(add);
        tooltipContentEl.classList.add(movedClass);
        tooltipContentEl.classList.add(add);
        tooltipContentEl.classList.remove(remove);
      }
    };

    const removeClassMoved = (add, remove) => {
      const movedClass = toMovedClass(add);
      if (tooltipContentEl.classList.contains(movedClass)) {
        tooltipContentEl.classList.remove(movedClass);
        tooltipContentEl.classList.add(remove);
        tooltipContentEl.classList.remove(add);
      }
    };

    const mouseover = (event) => {
      const tooltipRect = tooltipContentEl.getBoundingClientRect();
      // TODO event.target["aria-describedby"]
      addClassMoved(() => tooltipRect.x < 0, "right", "left");
      addClassMoved(
        () => tooltipRect.x + tooltipRect.width > window.innerWidth,
        "left",
        "right"
      );
      addClassMoved(() => tooltipRect.y < 0, "bottom", "top"),
        addClassMoved(
          () => tooltipRect.bottom > window.innerHeight,
          "top",
          "bottom"
        );
      tooltipContentEl.classList.add("visible");
    };

    const mouseout = (event) => {
      tooltipContentEl.classList.remove("visible");
      removeClassMoved("right", "left");
      removeClassMoved("left", "right");
      removeClassMoved("bottom", "top");
      removeClassMoved("top", "bottom");
    };

    const rootEl = div(
      {
        ...props,
        class: classNames("tooltip", className, options?.class, props?.class),
        bauMounted: ({ element }) => {
          element.addEventListener("mouseover", mouseover);
          element.addEventListener("mouseout", mouseout);
        },
        bauUnmounted: ({ element }) => {
          element.removeEventListener("mouseover", mouseover);
          element.removeEventListener("mouseout", mouseout);
        },
      },

      ...children,
      tooltipContentEl
    );

    return rootEl;
  };
}
