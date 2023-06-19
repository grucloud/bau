// See https://open-ui.org/components/selectmenu/
export default function (context, options = {}) {
  const { bau, css } = context;
  const { div, selectmenu, option, h3, h4 } = bau.tags;

  return function Selectmenu(props, ...children) {
    return selectmenu(option("Option 1"), option("Option 2"));
  };
}
