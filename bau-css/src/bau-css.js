const toHash = (str) => {
  let i = 0,
    out = 11;
  while (i < str.length) out = (101 * out + str.charCodeAt(i++)) >>> 0;
  return "bau" + out;
};

const addStyle = (target, className, cssText) => {
  const style = document.createElement("style");
  style.id = className;
  style.appendChild(new Text(cssText));
  target.appendChild(style);
};

const compile = (strings, args) =>
  strings.reduce((acc, value, i) => acc + value + (args[i] ?? ""), "");

export default function BauCss({ target = document.head } = {}) {
  const process =
    (styleMake) =>
    (strings, ...args) => {
      const compiled = compile(strings, args);
      const name = toHash(compiled);
      !document.getElementById(name) &&
        addStyle(target, name, styleMake(name, compiled));
      return name;
    };

  return {
    css: process((className, compiled) => `.${className} { ${compiled} }`),
    keyframes: process(
      (keyframesName, compiled) => `@keyframes ${keyframesName} { ${compiled} }`
    ),
  };
}
