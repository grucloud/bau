import classNames from "@grucloud/bau-css/classNames.js";

export default function (context, options = {}) {
  const { bau } = context;
  const { div } = bau.tags;
  const noop = () => undefined;

  return function Animate(
    { animationHide = noop, animationShow = noop, ...props },
    child
  ) {
    return div(
      {
        class: classNames("animate", options?.class, props.class),
        bauChildMutated: ({ record, element }) => {
          // Removed Nodes
          [...record.removedNodes].forEach((childNode) => {
            if (!animationHide() || childNode.getAttribute("cloned")) return;
            const nodeCloned = childNode.cloneNode(true);
            nodeCloned.setAttribute("cloned", true);
            nodeCloned.style.top = 0;
            nodeCloned.style.left = 0;
            nodeCloned.style.width = childNode.getAttribute("width");
            nodeCloned.style.height = childNode.getAttribute("height");
            nodeCloned.style.position = "absolute";
            nodeCloned.style.animation = animationHide();
            record.target.appendChild(nodeCloned);
            nodeCloned.addEventListener("animationend", () =>
              nodeCloned.parentNode?.removeChild(nodeCloned)
            );
          });
          // Added Nodes
          [...record.addedNodes].forEach((childNode) => {
            if (childNode.getAttribute("cloned")) return;
            element.style.position = "relative";
            const rect = childNode.getBoundingClientRect();
            childNode.setAttribute("width", rect.width + "px");
            childNode.setAttribute("height", rect.height + "px");
            if (animationShow()) {
              childNode.style.animation = animationShow();
              const animationEndHandler = () => {
                childNode.removeEventListener(
                  "animationend",
                  animationEndHandler
                );
                childNode.style.animation = "";
              };
              childNode.addEventListener("animationend", animationEndHandler);
            }
          });
        },
        ...props,
      },
      child
    );
  };
}
