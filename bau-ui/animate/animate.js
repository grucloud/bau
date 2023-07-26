export default function (context, options = {}) {
  return function Animate({ parent, animationHide, animationShow }, node) {
    // Show
    node.style.animation = animationShow;
    const animationEndHandler = () => {
      node.removeEventListener("animationend", animationEndHandler);
      node.style.animation = "";
    };
    node.addEventListener("animationend", animationEndHandler);

    // Hide
    new MutationObserver((mutationList, observer) => {
      mutationList
        .filter((record) => record.removedNodes)
        .forEach((record) =>
          [...record.removedNodes].find((removedNode) => {
            parent.style.position = "relative";
            const nodeCloned = removedNode.cloneNode(true);
            nodeCloned.style.top = 0;
            nodeCloned.style.left = 0;
            nodeCloned.style.position = "absolute";
            nodeCloned.style.animation = animationHide;
            if (record.previousSibling) {
              record.previousSibling.after(nodeCloned);
            } else if (record.nextSibling) {
              record.nextSibling.before(nodeCloned);
            } else if (record.target) {
              record.target.appendChild(nodeCloned);
            } else {
            }

            nodeCloned.addEventListener("animationend", () =>
              nodeCloned.parentNode.removeChild(nodeCloned)
            );
            observer.disconnect();
            return true;
          })
        );
    }).observe(parent, { childList: true, subtree: true });

    return node;
  };
}
