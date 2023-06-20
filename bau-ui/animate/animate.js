export default function (context, options = {}) {
  return function Animate({ Component, parent, animationHide, animationShow }) {
    const node = Component();
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
            if (removedNode === node) {
              const nodeCloned = node.cloneNode(true);
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
            }
          })
        );
    }).observe(parent, { childList: true, subtree: true });

    return node;
  };
}
