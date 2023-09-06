const ColorPaletteDefault = [
  ["neutral", { h: "0", s: "0%", l: "50%" }],
  ["primary", { h: "230", s: "70%", l: "30%" }],
  ["secondary", { h: "338", s: "70%", l: "50%" }],
  ["success", { h: "120", s: "70%", l: "25%" }],
  ["info", { h: "194", s: "70%", l: "30%" }],
  ["warning", { h: "43", s: "70%", l: "25%" }],
  ["danger", { h: "358", s: "70%", l: "30%" }]
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
const darkVar = (color) => `var(--color-${color})`;
const lightestVar = (color) => `var(--color-${color}-lightest)`;
const variantToCss = () => ColorPaletteDefault.map(
  ([color]) => `
.outline.${color} {
  border: 2px solid ${darkVar(color)};
  color: var(--font-color-base)
}
.soft.${color} {
  background-color: ${lightestVar(color)};
}
.solid.${color} {
  background-color: ${darkVar(color)};
}
`
).join("\n");
const darkColors = () => ColorPaletteDefault.map(([color]) => [
  `--color-${color}-s: var(--color-${color}-dark-s);`
]).join("\n");
const indexToColor = (index) => {
  return 100 - index * 10;
};
const buildGrays = () => new Array(10).fill("").map(
  (v, index) => `--color-gray-${index * 100}: hsl(0, 0%, ${indexToColor(index)}%);`
).join("\n");
const buildEmphasis = ({ dark }) => new Array(10).fill("").map(
  (v, index) => `--color-emphasis-${index * 100}: var(--color-gray-${dark ? 1e3 - index * 100 : index * 100});`
).join("\n");
const buildColor = ([color, { h, s, l }]) => [
  `--color-${color}-h: ${h};`,
  `--color-${color}-l: ${l};`,
  `--color-${color}-base-s: ${s};`,
  `--color-${color}-s: var(--color-${color}-base-s);`,
  `--color-${color}-dark-s: calc(${s} - 25%);`,
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
      ${variantToCss()}
      --color-content: hsl(0, 0%, 10%);
      --color-content-inverse: hsl(0, 0%, 95%);
      --color-content-secondary: hsl(0, 0%, 30%);
      --background-color: var(--color-white);
      --global-border-width: 1px;
      --global-radius: 0.4rem;
      --font-color-base: var(--color-content);
      --font-color-disabled: var(--color-emphasis-600);
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
      --shadow-s: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
      --shadow-m: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      --shadow-lg: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
        0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
      --font-size-base: 100%;
      --line-height-base: 1.65;
      --link-color: var(--color-primary);
      --brightness-hover-always: 120%;
      --brightness-active-always: 130%;
      --brightness-hover: 80%;
      --brightness-hover-reverse: 140%;
      --brightness-active: 90%;
      .plain {
        background-color: var(--background-color);
      }
      .outline {
        background-color: var(--background-color);
      }
      .solid {
        color: var(--font-color-inverse);
      }
      .sm {
        font-size: 0.8rem;
      }
      .md {
        font-size: 1rem;
      }
      .lg {
        font-size: 1.2rem;
      }
    }
    :root {
      font-family: var(--font-family);
      color-scheme: var(--color-scheme);
      color: var(--color-content);
      font: var(--font-size-base) / var(--line-height-base) var(--font-family);
      background-color: var(--background-color);
    }
    html[data-theme="dark"] {
      ${darkColors()}
      --color-scheme: dark;
      --background-color: #121212;
      --hover-overlay: rgba(255, 255, 255, 0.05);
      --color-content: #e3e3e3;
      --color-content-secondary: rgba(255, 255, 255, 0.7);
      --brightness-hover-always: 130%;
      --brightness-active-always: 120%;
      --brightness-active: 180%;
      --brightness-hover: 150%;
      --brightness-hover-reverse: 70% ${buildEmphasis({ dark: true })};
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
          box-shadow: var(--shadow-s);
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
let getType = (obj) => Object.prototype.toString.call(obj ?? 0).slice(8, -1);
let isObject = (val) => getType(val) == "Object";
let isFunction = (obj) => getType(obj) == "Function";
let isArrayOrObject = (obj) => ["Object", "Array"].includes(getType(obj));
let protoOf = Object.getPrototypeOf;
let toVal = (state) => isState(state) ? state.val : state;
let isState = (state) => state == null ? void 0 : state.__isState;
let METHODS = ["splice", "push", "pop", "shift", "unshift", "sort", "reverse"];
let renderChildren = (arr, renderItem) => {
  const children = new Array(arr.length);
  for (let i = 0; i < arr.length; i++)
    children[i] = renderItem(arr[i], i);
  return children;
};
const toPropsAndChildren = (args) => !isState(args[0]) && isObject(args[0]) ? args : [{}, ...args];
function Bau(input) {
  let _window = (input == null ? void 0 : input.window) ?? window;
  let { document: document2 } = _window;
  let _debounce;
  let stateSet = /* @__PURE__ */ new Set();
  let _stateSetInBatch = /* @__PURE__ */ new Set();
  let _inBatch = false;
  let _curDeps;
  let h = (tag) => document2.createElement(tag);
  let runAndCaptureDeps = (render, deps, arg) => {
    let prevDeps = _curDeps;
    _curDeps = deps;
    let result = render(arg);
    _curDeps = prevDeps;
    return result;
  };
  let bindingCleanUp = () => {
    if (!_debounce) {
      _debounce = _window.requestAnimationFrame(() => {
        stateSet.forEach((state) => {
          state.bindings = state.bindings.filter((b) => {
            var _a;
            return (_a = b.element) == null ? void 0 : _a.isConnected;
          });
          !state.bindings.length && !state.computed && stateSet.delete(state);
        });
        _debounce = void 0;
      });
    }
  };
  let updateDom = (state, method, result, args, data, parentProp) => {
    var _a;
    if (_inBatch) {
      _stateSetInBatch.add(state);
      return;
    }
    for (let binding of state.bindings) {
      let { deps, element, renderInferred, render, renderItem } = binding;
      if (renderItem && method) {
        (_a = methodToActionMapping(
          element,
          args,
          (...args2) => toDom(renderItem(...args2)),
          result,
          data,
          parentProp
        )[method]) == null ? void 0 : _a.call();
      } else {
        let newElement = renderInferred ? renderInferred({
          element
        }) : render({ element, renderItem })(...deps.map(toVal));
        if (newElement !== element) {
          element.replaceWith(binding.element = toDom(newElement));
        }
      }
    }
    updateDerive(state);
    bindingCleanUp();
  };
  let proxyHandler = (state, data, parentProp = []) => ({
    get(target, prop, receiver) {
      var _a;
      _curDeps == null ? void 0 : _curDeps.add(state);
      if (prop === "_isProxy")
        return true;
      if (!((_a = target[prop]) == null ? void 0 : _a._isProxy) && !isState(target[prop]) && isArrayOrObject(target[prop])) {
        target[prop] = new Proxy(
          target[prop],
          proxyHandler(state, data, [...parentProp, prop])
        );
      } else if (METHODS.includes(prop)) {
        let origMethod = target[prop];
        return (...args) => {
          let result = origMethod.apply(target, args);
          updateDom(state, prop, result, args, data, parentProp);
          return result;
        };
      }
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      let result = Reflect.set(target, prop, value, receiver);
      updateDom(state, "setItem", result, { prop, value }, data, [
        ...parentProp,
        prop
      ]);
      return result;
    }
  });
  let createProxy = (state, data) => new Proxy(data, proxyHandler(state, data));
  let methodToActionMapping = (element, args, renderDomItem, result, data, parentProp) => {
    let replaceChildren = () => element.replaceChildren(...renderChildren(result, renderDomItem));
    let removeChild = (key) => element[key] && element.removeChild(element[key]);
    return {
      assign: replaceChildren,
      sort: replaceChildren,
      reverse: replaceChildren,
      setItem: () => {
        var _a;
        let index = parentProp[0];
        (_a = element.children[index]) == null ? void 0 : _a.replaceWith(renderDomItem(data[index], index));
      },
      push: () => element.append(
        ...renderChildren(
          args,
          (item, index) => renderDomItem(item, data.length + index)
        )
      ),
      unshift: () => element.prepend(...renderChildren(args, renderDomItem)),
      pop: () => removeChild("lastChild"),
      shift: () => removeChild("firstChild"),
      splice: () => {
        let [start, deleteCount, ...newItems] = args;
        const { length } = element.children;
        for (let i = start >= 0 ? Math.min(start + deleteCount - 1, length - 1) : length - 1; i >= (start >= 0 ? start : length + start); i--) {
          element.children[i].remove();
        }
        if (newItems.length) {
          let elementNewItems = newItems.forEach(
            (item, index) => renderDomItem(item, start + index)
          );
          element.children[start] ? element.children[start].after(...elementNewItems) : element.append(...elementNewItems);
        }
      }
    };
  };
  let createState = (initVal) => ({
    oldVal: initVal,
    bindings: [],
    listeners: [],
    __isState: true,
    get val() {
      let _state = this;
      _curDeps == null ? void 0 : _curDeps.add(_state);
      return _state.valProxy ?? (_state.valProxy = isArrayOrObject(initVal) ? createProxy(_state, initVal) : initVal, _state.valProxy);
    },
    set val(value) {
      let state = this;
      let currentValue = state.val;
      if (isArrayOrObject(value)) {
        state.valProxy = createProxy(state, value);
        updateDom(state, "assign", value);
      } else {
        if (value !== currentValue) {
          state.valProxy = value;
          updateDom(state);
        }
      }
      state.oldVal = currentValue;
    }
  });
  let toDom = (v) => {
    if (v == null || v === false) {
      return h("span");
    } else if (v.nodeType) {
      return v;
    } else {
      return document2.createTextNode(v);
    }
  };
  let deriveInternal = (computed, state) => {
    let deps = /* @__PURE__ */ new Set();
    state.val = runAndCaptureDeps(computed, deps);
    return deps;
  };
  let derive = (computed) => {
    let state = createState();
    let deps = deriveInternal(computed, state);
    state.computed = true;
    for (let dep of deps)
      dep.listeners.push({ computed, deps, state });
    return state;
  };
  let updateDerive = (state) => {
    for (let listener of [...state.listeners]) {
      deriveInternal(listener.computed, listener.state);
    }
  };
  let add = (element, ...children) => {
    if (children.length) {
      let childrenDom = [];
      for (let child of children.flat(Infinity))
        child != null && childrenDom.push(
          isState(child) ? bind({ deps: [child], render: () => (v) => v }) : isFunction(child) ? bindInferred({ renderInferred: child }) : toDom(child)
        );
      element.append(...childrenDom);
    }
  };
  let isSettablePropCache = {};
  let getPropDescriptor = (proto, key) => proto && (Object.getOwnPropertyDescriptor(proto, key) ?? getPropDescriptor(protoOf(proto), key));
  let isSettableProp = (tag, key, proto) => {
    var _a;
    return isSettablePropCache[tag + "," + key] ?? (isSettablePropCache[tag + "," + key] = ((_a = getPropDescriptor(proto, key)) == null ? void 0 : _a.set) ?? 0);
  };
  let observerRemovedNode = (element, bauUnmounted) => new _window.MutationObserver((mutationList, observer) => {
    mutationList.filter((record) => record.removedNodes).forEach(
      (record) => [...record.removedNodes].find(
        (removedNode) => removedNode === element && (bauUnmounted({ element }), observer.disconnect(), true)
      )
    );
  }).observe(element.parentNode, { childList: true });
  let observerChildNode = (element, bauChildMutated) => new _window.MutationObserver(
    (mutationList, observer) => mutationList.forEach((record) => bauChildMutated({ record, element }))
  ).observe(element, { childList: true });
  let tagsNS = (namespace) => new Proxy(
    function createTag(name, ...args) {
      var _a;
      let [props, ...children] = toPropsAndChildren(args);
      let element = namespace ? document2.createElementNS(namespace, name) : h(name);
      for (let [k, v] of Object.entries(props)) {
        if (k.startsWith("bau"))
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
      props.bauChildMutated && observerChildNode(element, props.bauChildMutated);
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
    binding.element = toDom(newElement);
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
    let newElement = runAndCaptureDeps(renderInferred, deps, { element });
    return bindFinalize({ renderInferred }, deps, newElement);
  };
  let bind = ({ deps, element, render, renderItem }) => bindFinalize(
    { deps, render, renderItem },
    deps,
    render({ element, renderItem })(...deps.map(toVal))
  );
  let loop = (stateArray, container, renderItem) => bind({
    deps: [stateArray],
    render: ({ renderItem: renderItem2 }) => (arr) => (container.append(...renderChildren(arr, renderItem2)), container),
    renderItem
  });
  let batch = (batchFn) => {
    _inBatch = true;
    batchFn();
    _inBatch = false;
    _stateSetInBatch.forEach(updateDom);
    _stateSetInBatch.clear();
  };
  return {
    tags: tagsNS(),
    tagsNS,
    state: createState,
    bind,
    loop,
    derive,
    stateSet,
    batch
  };
}
function classNames(...cn) {
  return cn.filter((className) => className).join(" ");
}
function button(context, options = {}) {
  const { bau, css } = context;
  const className = css`
    color: inherit;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-width: 2rem;
    min-height: 2rem;
    border: none;
    border-radius: var(--global-radius);
    font-weight: var(--font-weight-semibold);
    text-align: center;
    text-decoration: none;
    overflow: hidden;
    box-sizing: border-box;
    user-select: none;
    transition: all var(--transition-slow);
    cursor: pointer;
    &.outline,
    &.solid {
      box-shadow: var(--shadow-m);
    }
    &.outline:hover,
    &.solid:hover {
      box-shadow: var(--shadow-lg);
    }
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
    &:hover.solid {
      filter: brightness(var(--brightness-hover-always));
    }
    &.button:disabled {
      filter: grayscale(1) brightness(var(--brightness-hover));
      cursor: not-allowed;
      pointer-events: none;
    }
    &.sm {
      padding: 0.3rem;
    }
    &.md {
      padding: 0.2rem 0.8rem;
    }
    &.lg {
      padding: 0.2rem 2rem;
    }
    & i {
      font-style: normal;
    }
  `;
  return function Button(...args) {
    let [{ color, variant, size = "md", href, ...props }, ...children] = toPropsAndChildren(args);
    const tagButton = href ? bau.tags.a : bau.tags.button;
    return tagButton(
      {
        ...!href && { type: "button" },
        ...props,
        class: classNames(
          "button",
          options.class,
          options.variant,
          options.size,
          options.color,
          variant,
          size,
          color,
          className,
          props.class
        ),
        href
      },
      children
    );
  };
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
function createContext$1({ window: window2, config }) {
  const bau = Bau({ window: window2 });
  const bauCss = BauCss({ window: window2 });
  return { bau, ...bauCss, window: window2, config, tr: (x) => x };
}
function createContext() {
  return createContext$1({ window, config: { base: "/bau/bausaurus/" } });
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
  isProd as a,
  button as b,
  createContext as c,
  classNames as d,
  footer as f,
  globalStyle as g,
  header as h,
  inBrowser as i,
  mountApp as m,
  pathFromLocation as p,
  toPropsAndChildren as t
};
