export default function (context, options = {}) {
  const { bau, css } = context;
  const { div, span, pre, h3, h4 } = bau.tags;

  return function MyComponent(props, ...children) {
    return div("TODO");
  };
}
