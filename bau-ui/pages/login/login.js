export default function (context, options = {}) {
  const { bau, css } = context;
  const { div, form, span, pre, h3, h4 } = bau.tags;

  return function Login(props, ...children) {
    return div("Login");
  };
}
