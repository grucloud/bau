import { toPropsAndChildren } from "@grucloud/bau/bau.js";

export default function (context, options = {}) {
  const { bau, css, window } = context;
  const { section, article, div } = bau.tags;
  const { document } = window;
  const { direction = "horizontal" } = options;
  const className = css`
    & .resizablePanel {
      box-sizing: border-box;
    }
    & .handle {
      position: relative;
      width: 1px;
      cursor: col-resize;
      display: flex;
      justify-content: center;
      align-items: center;
      &::after {
        content: "";
        position: absolute;
        background-color: var(--color-emphasis-100);
      }
    }
    & .horizontal {
      width: 1rem;
      cursor: col-resize;
      &::after {
        height: 100%;
        width: 1px;
      }
    }
    & .vertical {
      height: 1rem;
      width: 100%;
      cursor: row-resize;
      &::after {
        height: 1px;
        width: 100%;
      }
    }
  `;

  function PanelGroup(...args) {
    let [props, ...children] = toPropsAndChildren(args);

    return section(
      {
        ...props,
        class: ["resizablePanelGroup", props?.class, options?.class, className],
      },
      children
    );
  }

  function Panel(...args) {
    let [props, ...children] = toPropsAndChildren(args);

    return article(
      {
        ...props,
        class: ["resizablePanel", props?.class],
      },
      children
    );
  }

  function Handle(...args) {
    let [props, ...children] = toPropsAndChildren(args);

    // The current position of mouse
    let _x = 0;
    let _y = 0;
    let _panelGroup;
    let _nextPanel;
    let _nextPanelRect;
    let _previousPanel;
    let _previousPanelRect;

    const isHorizontal = () => direction === "horizontal";

    const mouseMoveHandler = (event) =>
      isHorizontal()
        ? mouseMoveHandlerHorizontal(event)
        : mouseMoveHandlerVertical(event);

    const mouseMoveHandlerHorizontal = (event) => {
      const dx = event.clientX - _x;
      if (_previousPanelRect) {
        _previousPanel.style.width = `${_previousPanelRect.width + dx}px`;
      }
      if (_nextPanelRect) {
        _nextPanel.style.width = `${_nextPanelRect.width - dx}px`;
      }
    };

    const mouseMoveHandlerVertical = (event) => {
      const dy = event.clientY - _y;
      if (_previousPanelRect) {
        _previousPanel.style.height = `${_previousPanelRect.height + dy}px`;
      }
      if (_nextPanelRect) {
        _nextPanel.style.height = `${_nextPanelRect.height - dy}px`;
      }
    };

    const mouseUpHandler = () => {
      _nextPanel = null;
      _previousPanel = null;
      _nextPanelRect = null;
      _previousPanelRect = null;
      _panelGroup.style.cursor = null;
      _panelGroup.style["user-select"] = "auto";
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };

    const mouseDownHandler = (event) => {
      // Get the current mouse position
      _x = event.clientX;
      _y = event.clientY;

      const { target } = event;
      const handleEl = target.closest(".handle");
      _panelGroup = target.closest(".resizablePanelGroup");
      _panelGroup.style.cursor = isHorizontal() ? "col-resize" : "row-resize";
      _panelGroup.style["user-select"] = "none";

      _nextPanel = handleEl.nextSibling;
      _previousPanel = handleEl.previousSibling;

      if (_previousPanel) {
        _previousPanelRect = _previousPanel.getBoundingClientRect();
      }
      if (_nextPanel) {
        _nextPanelRect = _nextPanel.getBoundingClientRect();
      }
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    };

    return div(
      {
        ...props,
        class: ["handle", direction],
        role: "separator",
        bauMounted: ({ element }) => {
          element.addEventListener("mousedown", mouseDownHandler);
        },
        bauUnmounted: ({ element }) => {
          element.removeEventListener("mousedown", mouseDownHandler);
        },
      },
      children
    );
  }

  return {
    PanelGroup,
    Panel,
    Handle,
  };
}
