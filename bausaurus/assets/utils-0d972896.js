const ColorPaletteDefault = [
  ["primary", { h: "230", s: "48%", l: "47%" }],
  ["secondary", { h: "338", s: "100%", l: "48%" }],
  ["success", { h: "120", s: "100%", l: "32%" }],
  ["info", { h: "194", s: "80%", l: "62%" }],
  ["warning", { h: "43", s: "100%", l: "50%" }],
  ["danger", { h: "358", s: "95%", l: "60%" }]
];
const SHADES_LIGHT = [
  ["light", "1.15"],
  ["lighter", "1.3"],
  ["lightest", "1.5"]
];
const SHADES_DARK = [
  ["dark", "0.9"],
  ["darker", "0.7"],
  ["darkest", "0.5"]
];
const buildGrays = () => new Array(20).fill("").map(
  (v, index) => `--color-gray-${index * 50}: hsl(0, 0%, ${100 - 5 * index}%);`
).join("\n");
const buildEmphasis = ({ dark }) => new Array(20).fill("").map(
  (v, index) => `--color-emphasis-${index * 50}: var(--color-gray-${dark ? 1e3 - index * 50 : index * 50});`
).join("\n");
const buildColor = ([color, { h, s, l }]) => [
  `--color-${color}-h: ${h};`,
  `--color-${color}-s: ${s};`,
  `--color-${color}-l: ${l};`,
  `--color-${color}-hsl: var(--color-${color}-h), var(--color-${color}-s), var(--color-${color}-l);`,
  `--color-${color}: hsl(var(--color-${color}-hsl));`,
  ...SHADES_LIGHT.map(
    ([shade, value]) => `--color-${color}-${shade}: hsl(var(--color-${color}-h), var(--color-${color}-s), calc(var(--color-${color}-l) * ${value}));`
  ),
  ...SHADES_DARK.map(
    ([shade, value]) => `--color-${color}-${shade}: hsl(var(--color-${color}-h), var(--color-${color}-s), calc(var(--color-${color}-l) * ${value}));`
  ),
  `--color-${color}-contrast-background: hsl(var(--color-${color}-h), var(--color-${color}-s), calc(var(--color-${color}-l) / var(--contrast-background-value)));`,
  `--color-${color}-contrast-foreground: hsl(var(--color-${color}-h), var(--color-${color}-s), calc(var(--color-${color}-l) * var(--contrast-foreground-value)));`
].join("\n");
function globalStyle({ createGlobalStyles }, { colorPalette = ColorPaletteDefault } = {}) {
  createGlobalStyles`
:root {
  --color-scheme: light;
  --contrast-background-value: 90%;
  --contrast-foreground-value: 70%;
  --contrast-background-dark-value: 70%;
  --contrast-foreground-dark-value: 90%;
  --color-white: #fff;
  --color-black: #000;
  ${colorPalette.map(([color, hsl]) => buildColor([color, hsl])).join("\n")}
  ${buildGrays()}
  ${buildEmphasis({})}
  --color-content: hsl(0, 0%, 10%);
  --color-content-inverse: hsl(0, 0%, 90%);
  --color-content-secondary: hsl(0, 0%, 30%);
  --background-color: var(--color-white);
  --background-surface-color: var(--color-content-inverse);
  --global-border-width: 1px;
  --global-radius: 0.4rem;
  --font-color-base: var(--color-content);
  --font-color-disabled: var(--color-emphasis-700);
  --font-color-inverse: var(--color-content-inverse);
  --font-color-secondary: var(--color-content-secondary);
  --font-family: system-ui, -apple-system, Helvetica, Arial, sans-serif;
  --font-family-monospace: Consolas, monospace;
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-semibold: 500;
  --font-weight-bold: 700;
  --global-spacing: 1rem;
  --spacing-vertical: var(--global-spacing);
  --spacing-horizontal: var(--global-spacing);
  --transition-fast: 200ms;
  --transition-slow: 400ms;
  --global-shadow-lw: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  --global-shadow-md: 0 5px 40px rgba(0, 0, 0, 0.2);
  --global-shadow-tl: 0 12px 28px 0 rgba(0, 0, 0, 0.2),
    0 2px 4px 0 rgba(0, 0, 0, 0.1);
  --font-size-base: 100%;
  --line-height-base: 1.65;
  --link-color: var(--color-primary)
}
:root {
  font-family: var(--font-family);
  color-scheme: var(--color-scheme);
  color: var(--color-content);
  font: var(--font-size-base) / var(--line-height-base) var(--font-family)
}
body {
  margin: 0;
}
`;
}
function header(context) {
  const { tr, bau, css, config } = context;
  const { header: header2, div, a, img } = bau.tags;
  const NavBarLeft = () => div(
    {
      class: css`
          grid-area: header;
          display: flex;
          align-items: center;
          & .title {
            font-weight: var(--font-weight-bold);
          }
          & a {
            color: var(--font-color);
            text-decoration: none;
            padding: 1rem 0.5rem;
          }
          > img {
            padding: 0.5rem;
          }
        `
    },
    img({
      alt: "GruCloud",
      src: `${config.base}grucloud.svg`,
      width: 30,
      height: 30
    }),
    a({ class: "title", href: config.base }, tr("Bausaurus")),
    a({ href: `${config.base}docs/` }, tr("Docs"))
  );
  const NavBarRight = () => a(
    {
      target: "_blank",
      href: "https://github.com/grucloud/bau",
      title: "GitHub"
    },
    img({
      class: css`
          vertical-align: middle;
          padding-right: 1rem;
        `,
      alt: "GitHub",
      src: `${config.base}/github.svg`,
      width: 30,
      height: 30
    })
  );
  return function Header() {
    return header2(
      {
        class: css`
          z-index: 2;
          position: sticky;
          top: 0;
          grid-area: header;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: var(--global-shadow-lw);
          background-color: var(--background-color);
        `
      },
      NavBarLeft(),
      NavBarRight()
    );
  };
}
function footer({ bau, css }) {
  const { footer: footer2, span } = bau.tags;
  const className = css`
    grid-area: footer;
    min-height: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--font-color-secondary);
  `;
  return function Footer() {
    return footer2(
      {
        class: className
      },
      span("Released under the MIT License."),
      span(`Copyright © ${(/* @__PURE__ */ new Date()).getFullYear()}`)
    );
  };
}
function classNames(...cn) {
  return cn.filter((className) => className).join(" ");
}
function button(context) {
  const { bau, css } = context;
  const styles = {
    root: css`
      color: var(--font-color-base);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 0 0.5rem;
      min-width: 2rem;
      min-height: 2rem;
      outline: none;
      border: none;
      border-radius: var(--global-radius);
      background: transparent;
      font-size: 1rem;
      font-weight: var(--font-weight-semibold);
      text-align: center;
      text-decoration: none;
      text-transform: uppercase;
      overflow: hidden;
      box-sizing: border-box;
      user-select: none;
      transition: background-color var(--transition-fast);
      &::before {
        background-color: rgba(0, 0, 0, 0.2);
        position: absolute;
        top: calc(50% - 100%);
        left: calc(50% - 100%);
        width: 200%;
        height: 200%;
        transition: opacity var(--transition-fast) linear;
        border-radius: 50%;
        opacity: 0;
        pointer-events: none;
        content: "";
      }
      &:active {
        &::before {
          opacity: 1;
        }
      }
      &:hover {
        &::before {
          opacity: 0.5;
        }
      }
    `,
    button: css`
      cursor: pointer;
    `,
    a: css``,
    flat: css`
      border-width: 0;
    `,
    flatPrimary: css`
      color: var(--color-primary);
    `,
    flatAccent: css`
      color: var(--color-secondary-darkest);
    `,
    raised: css`
      box-shadow: var(--global-shadow-lw);
      &:active {
        box-shadow: var(--global-shadow-md);
      }
    `,
    raisedPrimary: css`
      background-color: var(--color-primary-darkest);
      color: var(--color-content-inverse);
    `,
    raisedAccent: css`
      background-color: var(--color-secondary-darkest);
      color: var(--color-content-inverse);
    `,
    disabled: css`
      color: rgba(0, 0, 0, 0.26);
      cursor: default;
      pointer-events: none;
      box-shadow: none;
    `,
    raisedDisabled: css`
      background-color: rgba(0, 0, 0, 0.12);
    `,
    fullWidth: css`
      text-align: center;
      width: 100%;
    `,
    ripple: css`
      position: relative;
      overflow: hidden;
      transform: translate3d(0, 0, 0);
      &::after {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
        background-image: radial-gradient(circle, #000 10%, transparent 10%);
        background-repeat: no-repeat;
        background-position: 50%;
        transform: scale(10, 10);
        opacity: 0;
        transition: transform var(--transition-slow), opacity 1s;
      }
      &:active::after {
        transform: scale(0, 0);
        opacity: 0.2;
        transition: 0s;
      }
    `
  };
  return function Button(props, ...children) {
    const {
      primary,
      accent,
      raised,
      disabled,
      ripple,
      href,
      icon,
      ...otherProps
    } = props;
    const tagButton = href ? bau.tags.a : bau.tags.button;
    return tagButton(
      {
        ...otherProps,
        class: classNames(
          styles.root,
          href ? styles.a : styles.button,
          raised ? styles.raised : styles.flat,
          !raised && primary && styles.flatPrimary,
          !raised && accent && styles.flatAccent,
          raised && primary && styles.raisedPrimary,
          raised && accent && styles.raisedAccent,
          ripple && styles.rippledisabled && styles.disabled,
          disabled && raised && styles.raisedDisabled,
          props.class
        ),
        href,
        ...!href && { type: "button" }
      },
      children
    );
  };
}
let getType = (obj) => Object.prototype.toString.call(obj ?? 0).slice(8, -1);
let isObject = (val) => getType(val) == "Object";
let protoOf = Object.getPrototypeOf;
let isArrayOrObject = (obj) => ["Object", "Array"].includes(getType(obj));
let isFunction = (obj) => getType(obj) == "Function";
let toVal = (state) => isState(state) ? state._val : state;
let isState = (state) => state.__isState;
function Bau(input) {
  let _window = (input == null ? void 0 : input.window) ?? window;
  let { document: document2 } = _window;
  let stateSet = /* @__PURE__ */ new Set();
  let _curDeps;
  let h = (tag) => document2.createElement(tag);
  let ghost = () => h("span");
  let runAndCaptureDeps = (render, deps, arg) => {
    let prevDeps = _curDeps;
    _curDeps = deps;
    let result = render(arg);
    _curDeps = prevDeps;
    return result;
  };
  let updateDom = (state2, method, args, parentProp, data) => {
    var _a;
    for (let binding of state2.bindings) {
      let { deps, element, renderInferred, render, renderItem } = binding;
      if (renderItem && method) {
        (_a = methodToActionMapping(
          element,
          parentProp,
          args,
          (value) => toDom(renderItem(value)),
          data
        )[method]) == null ? void 0 : _a.call();
      } else {
        let newElement = renderInferred ? renderInferred({
          element
        }) : render({ element, renderItem })(...deps.map(toVal));
        if (newElement !== element) {
          element.replaceWith(
            binding.element = newElement != void 0 ? toDom(newElement) : ghost()
          );
        }
      }
    }
  };
  let proxyHandler = (state2, data, parentProp = []) => ({
    get(target, prop, receiver) {
      var _a;
      _curDeps == null ? void 0 : _curDeps.add(state2);
      if (prop === "_isProxy")
        return true;
      if (!((_a = target[prop]) == null ? void 0 : _a._isProxy) && isArrayOrObject(target[prop])) {
        target[prop] = new Proxy(
          target[prop],
          proxyHandler(state2, data, [...parentProp, prop])
        );
      } else if (["splice", "push", "pop", "shift", "unshift"].includes(prop)) {
        let origMethod = target[prop];
        return (...args) => {
          let result = origMethod.apply(target, args);
          updateDom(state2, prop, args);
          return result;
        };
      }
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      let result = Reflect.set(target, prop, value, receiver);
      updateDom(state2, "setItem", { prop, value }, [...parentProp, prop], data);
      return result;
    }
  });
  let createProxy = (state2, data) => new Proxy(data, proxyHandler(state2, data));
  let methodToActionMapping = (element, parentProp, args, renderDomItem, data) => ({
    assign: () => element.replaceChildren(...args.map(renderDomItem)),
    setItem: () => {
      let index = parentProp[0];
      let child = element.children[index];
      if (child) {
        child.replaceWith(renderDomItem(data[index]));
      }
    },
    push: () => element.append(...args.map(renderDomItem)),
    pop: () => element.lastChild && element.removeChild(element.lastChild),
    shift: () => element.firstChild && element.removeChild(element.firstChild),
    unshift: () => {
      let item = renderDomItem(args[0]);
      element.firstChild ? element.firstChild.before(item) : element.appendChild(item);
    },
    splice: () => {
      let [start, deleteCount, ...newItems] = args;
      for (let i = Math.min(start + deleteCount - 1, element.children.length - 1); i >= start; i--) {
        element.children[i].remove();
      }
      if (newItems.length) {
        let elementNewItems = newItems.forEach(renderDomItem);
        element.children[start] ? element.children[start].after(elementNewItems) : element.append(...elementNewItems);
      }
    }
  });
  let state = (initVal) => ({
    oldVal: initVal,
    bindings: [],
    __isState: true,
    get _val() {
      let _state = this;
      return _state.valProxy ?? (_state.valProxy = isArrayOrObject(initVal) ? createProxy(_state, initVal) : initVal, _state.valProxy);
    },
    set _val(value) {
      this.valProxy = value;
    },
    get val() {
      _curDeps == null ? void 0 : _curDeps.add(this);
      return this._val;
    },
    set val(value) {
      let state2 = this;
      let currentValue = state2._val;
      if (isArrayOrObject(value)) {
        state2._val = createProxy(state2, value);
        updateDom(state2, "assign", value);
      } else {
        if (value !== currentValue) {
          state2._val = value;
          updateDom(state2);
        }
      }
      state2.oldVal = currentValue;
    }
  });
  let toDom = (v) => v.nodeType ? v : document2.createTextNode(v);
  let add = (element, ...children) => {
    if (children.length) {
      let childrenDom = [];
      for (let child of children.flat(Infinity))
        child && childrenDom.push(
          isState(child) ? bind({ deps: [child], render: () => (v) => v }) : isFunction(child) ? bindInferred({ renderInferred: child }) : toDom(child)
        );
      element.append(...childrenDom);
    }
  };
  let isSettablePropCache = {};
  let getPropDescriptor = (proto, key) => proto ? Object.getOwnPropertyDescriptor(proto, key) ?? getPropDescriptor(protoOf(proto), key) : void 0;
  let isSettableProp = (tag, key, proto) => {
    var _a;
    return isSettablePropCache[tag + "," + key] ?? (isSettablePropCache[tag + "," + key] = ((_a = getPropDescriptor(proto, key)) == null ? void 0 : _a.set) ?? 0);
  };
  let observerRemovedNode = (element, bauUnmounted) => new MutationObserver((mutationList, observer) => {
    mutationList.filter((record) => record.removedNodes).forEach(
      (record) => [...record.removedNodes].find(
        (removedNode) => removedNode === element && (bauUnmounted({ element }), observer.disconnect(), true)
      )
    );
  }).observe(element.parentNode, { childList: true });
  let tagsNS = (namespace) => new Proxy(
    function createTag(name, ...args) {
      var _a;
      let [props, ...children] = isObject(args[0]) ? args : [{}, ...args];
      let element = namespace ? document2.createElementNS(namespace, name) : h(name);
      for (let [k, v] of Object.entries(props)) {
        if (["bauCreated", "bauMounted", "bauUnmounted"].includes(k))
          continue;
        let setter = isSettableProp(name, k, protoOf(element)) ? (v2) => element[k] = v2 : (v2) => element.setAttribute(k, v2);
        if (v == null)
          ;
        else if (isState(v)) {
          bind({ deps: [v], render: () => () => (setter(v.val), element) });
        } else if (isFunction(v) && (!k.startsWith("on") || v.isDerived)) {
          bindInferred({
            renderInferred: () => (setter(v({ element })), element)
          });
        } else if (v.renderProp) {
          bind({
            deps: v["deps"],
            render: () => () => (setter(v["renderProp"]({ element })(...v["deps"].map(toVal))), element)
          });
        } else {
          setter(v);
        }
      }
      add(element, ...children);
      (_a = props.bauCreated) == null ? void 0 : _a.call(props, { element });
      props.bauMounted && _window.requestAnimationFrame(() => props.bauMounted({ element }));
      props.bauUnmounted && _window.requestAnimationFrame(
        () => observerRemovedNode(element, props.bauUnmounted)
      );
      return element;
    },
    {
      get: (tag, name) => tag.bind(void 0, name)
    }
  );
  let bindFinalize = (binding, deps, newElement) => {
    binding.element = toDom(newElement ? newElement : ghost());
    for (let dep of deps) {
      if (isState(dep)) {
        stateSet.add(dep);
        dep.bindings.push(binding);
      }
    }
    return binding.element;
  };
  let bindInferred = ({ renderInferred, element }) => {
    let deps = /* @__PURE__ */ new Set();
    let newElement = runAndCaptureDeps(renderInferred, deps, {
      element
    });
    let binding = {
      renderInferred
    };
    return bindFinalize(binding, deps, newElement);
  };
  let bind = ({ deps, element, render, renderItem: renderItemHL }) => {
    let renderItem = renderItemHL == null ? void 0 : renderItemHL({ deps, element });
    let newElement = render({
      element,
      renderItem
    })(...deps.map(toVal));
    let binding = {
      deps,
      render,
      renderItem
    };
    return bindFinalize(binding, deps, newElement);
  };
  return { tags: tagsNS(), tagsNS, state, bind, stateSet };
}
const toHash = (str) => {
  let i = 0, out = 11;
  while (i < str.length)
    out = 101 * out + str.charCodeAt(i++) >>> 0;
  return "bau" + out;
};
const addStyle = (document2, target, className, cssText) => {
  const style = document2.createElement("style");
  style.id = className;
  style.append(cssText);
  (target ?? document2.head).append(style);
};
const compile = (strings, args) => strings.reduce((acc, value, i) => acc + value + (args[i] ?? ""), "");
function BauCss(input) {
  let { document: document2 } = (input == null ? void 0 : input.window) ?? window;
  const doIt = (styleMake) => (strings, ...args) => {
    const compiled = compile(strings, args);
    const name = toHash(compiled);
    !document2.getElementById(name) && addStyle(document2, input == null ? void 0 : input.target, name, styleMake(name, compiled));
    return name;
  };
  return {
    css: doIt((className, compiled) => `.${className} { ${compiled} }`),
    keyframes: doIt((name, compiled) => `@keyframes ${name} { ${compiled} }`),
    createGlobalStyles: doIt((name, compiled) => compiled)
  };
}
function createContext({ window: window2, config }) {
  const { document: document2 } = window2;
  const bau = Bau({ document: document2 });
  const bauCss = BauCss({ document: document2 });
  return { bau, ...bauCss, window: window2, config, tr: (x) => x };
}
const inBrowser = () => typeof document !== "undefined";
const isProd = () => __BAUSAURUS_SITE_DATA__.prod;
const pathFromLocation = (pathname) => {
  let path = pathname.endsWith("/") ? `${pathname}index` : pathname;
  return path.replace(window.location.origin, "");
};
const getAppId = () => document.getElementById("app");
const mountApp = (el) => {
  var _a;
  return (_a = getAppId()) == null ? void 0 : _a.replaceChildren(el);
};
export {
  classNames as a,
  button as b,
  createContext as c,
  isProd as d,
  footer as f,
  globalStyle as g,
  header as h,
  inBrowser as i,
  mountApp as m,
  pathFromLocation as p
};
