const slotName = (str) =>
  str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());

function check(Component, props, children) {
  if (typeof Component !== "function") return false;
  const { html } = renderToStaticMarkup(Component, props, children);
  return typeof html === "string";
}

function renderToStaticMarkup(Component, props, slotted, metadata) {
  //console.log('renderToStaticMarkup', Component, 'props', props, 'slotted', slotted, metadata);

  const needsHydrate = metadata?.astroStaticSlot ? !!metadata.hydrate : true;
  const tagName = needsHydrate ? "astro-slot" : "astro-static-slot";

  const el = Component(props);
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    if (name == "default") {
      el.insertAdjacentHTML("beforeend", value);
    } else {
      el.insertAdjacentHTML(
        "beforeend",
        `<${tagName} name="${name}">${value}</${tagName}>`
      );
    }
  }
  return {
    html: el.outerHTML,
  };
}

export default {
  check,
  renderToStaticMarkup,
  supportsAstroStaticSlot: true,
};
