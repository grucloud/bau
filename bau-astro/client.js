export default (element) => {
  return (Component, props, slotted, { client }) => {
    //console.log("client", Component, props, slotted, client);
    if (!element.hasAttribute("ssr")) return;

    const el = Component(props);
    element.replaceChildren(el);
  };
};
