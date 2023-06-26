const toHash = (str) => {
  let i = 0,
    out = 11;
  while (i < str.length) out = (101 * out + str.charCodeAt(i++)) >>> 0;
  return "bau" + out;
};

const addStyle = (document, target, className, cssText) => {
  const style = document.createElement("style");
  style.id = className;
  style.append(cssText);
  if (target) {
    target.append(style);
  } else {
    console.error("no target");
  }
};

const compile = (strings, args) =>
  strings.reduce((acc, value, i) => acc + value + (args[i] ?? ""), "");

export default function BauCss({
  document = window.document,
  target = document.head,
} = {}) {
  const doIt =
    (styleMake) =>
    (strings, ...args) => {
      const compiled = compile(strings, args);
      const name = toHash(compiled);
      !document.getElementById(name) &&
        addStyle(document, target, name, styleMake(name, compiled));
      return name;
    };
  return {
    css: doIt((className, compiled) => `.${className} { ${compiled} }`),
    keyframes: doIt((name, compiled) => `@keyframes ${name} { ${compiled} }`),
    createGlobalStyles: doIt((name, compiled) => compiled),
  };
}
