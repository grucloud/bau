const getType = (obj) => Object.prototype.toString.call(obj ?? 0).slice(8, -1);
const isObject = (val) => getType(val) == "Object";
const protoOf = Object.getPrototypeOf;
const isArrayOrObject = (obj) => ["Object", "Array"].includes(getType(obj));
const isFunction = (obj) => getType(obj) == "Function";

const isState = (state) => state.__isState;

export default function Bau({ document = window.document } = {}) {
  let _debounce;
  const stateSet = new Set();
  let _curDeps;

  const h = (tag) => document.createElement(tag);
  const ghost = () => h("span");

  let runAndCaptureDeps = (render, deps, arg) => {
    let prevDeps = _curDeps;
    _curDeps = deps;
    let result = render(arg);
    _curDeps = prevDeps;
    return result;
  };

  function debounceSchedule(callback) {
    if (!_debounce) {
      _debounce = window.requestAnimationFrame(() => {
        callback();
        _debounce = undefined;
      });
    }
  }

  const bindingCleanUp = () =>
    debounceSchedule(() =>
      stateSet.forEach(
        (state) =>
          (state.bindings = state.bindings.filter((b) => {
            if (!b.element?.isConnected) {
              debugger;
            }
            return b.element?.isConnected;
          }))
      )
    );

  let updateDom = (state, arrayOp) => {
    for (let binding of state.bindings) {
      let { element, render, renderItem } = binding;
      if (renderItem && arrayOp) {
        methodToActionMapping({
          ...arrayOp,
          element,
          renderDomItem: (value) => toDom(renderItem(value)),
        })[arrayOp.method]?.call();
      } else {
        let newElement = render({
          element,
          renderItem,
        });
        if (newElement !== element) {
          element.replaceWith(
            (binding.element =
              newElement != undefined ? toDom(newElement) : ghost())
          );
        }
      }
      bindingCleanUp();
    }
  };

  const proxyHandler = ({ state, data, parentProp = [] }) => ({
    get(target, prop, receiver) {
      _curDeps?.add(state);
      if (prop === "_isProxy") return true;
      if (!target[prop]?._isProxy && isArrayOrObject(target[prop])) {
        target[prop] = new Proxy(
          target[prop],
          proxyHandler({
            state,
            data,
            parentProp: [...parentProp, prop],
          })
        );
      } else if (["splice", "push", "pop", "shift", "unshift"].includes(prop)) {
        const origMethod = target[prop];
        return (...args) => {
          const result = origMethod.apply(target, args);
          updateDom(state, {
            method: prop,
            args,
          });
          return result;
        };
      }

      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      const result = Reflect.set(target, prop, value, receiver);
      updateDom(state, {
        method: "setItem",
        args: { prop, value },
        parentProp: [...parentProp, prop],
        data,
      });
      return result;
    },
  });

  const createProxy = (state, data) =>
    new Proxy(data, proxyHandler({ state, data }));

  const methodToActionMapping = ({
    element,
    parentProp,
    args,
    depsValues,
    renderDomItem,
    data,
  }) => ({
    assign: () => element.replaceChildren(...args.map(renderDomItem)),
    setItem: () => {
      const index = parentProp[0];
      const child = element.children[index];
      if (child) {
        child.replaceWith(renderDomItem(data[index]));
      }
    },
    push: () => element.append(...args.map(renderDomItem)),
    pop: () => element.lastChild && element.removeChild(element.lastChild),
    shift: () => element.firstChild && element.removeChild(element.firstChild),
    unshift: () => {
      const item = renderDomItem(args[0], depsValues);
      element.firstChild
        ? element.firstChild.before(item)
        : element.appendChild(item);
    },
    splice: () => {
      const [start, deleteCount, ...newItems] = args;
      for (
        let i = Math.min(start + deleteCount - 1, element.children.length - 1);
        i >= start;
        i--
      ) {
        element.children[i].remove();
      }
      if (newItems.length > 0) {
        const elementNewItems = newItems.forEach(renderDomItem);
        element.children[start]
          ? element.children[start].after(elementNewItems)
          : element.append(...elementNewItems);
      }
    },
  });

  let state = (initVal) => ({
    oldVal: initVal,
    bindings: [],
    __isState: true,
    get _val() {
      const _state = this;
      return (
        _state.valProxy ??
        ((_state.valProxy = isArrayOrObject(initVal)
          ? createProxy(_state, initVal)
          : initVal),
        _state.valProxy)
      );
    },
    set _val(value) {
      this.valProxy = value;
    },
    get val() {
      _curDeps?.add(this);
      return this._val;
    },
    set val(value) {
      let state = this;
      let currentValue = state._val;
      if (isArrayOrObject(value)) {
        state._val = createProxy(state, value);
        updateDom(state, {
          method: "assign",
          args: value,
        });
      } else {
        if (value !== currentValue) {
          state._val = value;
          updateDom(state);
        }
      }
      state.oldVal = currentValue;
    },
  });

  let toDom = (v) => (v.nodeType ? v : document.createTextNode(v));

  let add = (element, ...children) => {
    if (children.length) {
      const childrenDom = [];
      for (let child of children.flat(Infinity))
        child &&
          childrenDom.push(
            isState(child)
              ? bind({ render: () => child.val })
              : isFunction(child)
              ? bind({ render: child })
              : toDom(child)
          );

      element.append(...childrenDom);
    }
  };

  const isSettablePropCache = {};

  const getPropDescriptor = (proto, key) =>
    proto
      ? Object.getOwnPropertyDescriptor(proto, key) ??
        getPropDescriptor(protoOf(proto), key)
      : undefined;

  const isSettableProp = (tag, key, proto) =>
    isSettablePropCache[tag + "," + key] ??
    (isSettablePropCache[tag + "," + key] =
      getPropDescriptor(proto, key)?.set ?? 0);

  const observerRemovedNode = (element, bauUnmounted) =>
    new MutationObserver((mutationList, observer) => {
      mutationList
        .filter((record) => record.removedNodes)
        .forEach((record) =>
          [...record.removedNodes].find(
            (removedNode) =>
              removedNode === element &&
              (bauUnmounted({ element }), observer.disconnect(), true)
          )
        );
    }).observe(element.parentNode, { childList: true });

  const tagsNS = (namespace) =>
    new Proxy(
      function createTag(name, ...args) {
        let [props, ...children] = isObject(args[0]) ? args : [{}, ...args];
        let element = namespace
          ? document.createElementNS(namespace, name)
          : h(name);
        for (let [k, v] of Object.entries(props)) {
          if (["bauCreated", "bauMounted", "bauUnmounted"].includes(k))
            continue;
          let setter = isSettableProp(name, k, protoOf(element))
            ? (v) => (element[k] = v)
            : (v) => element.setAttribute(k, v);
          if (v == null) {
          } else if (isState(v)) {
            bind({ render: () => (setter(v.val), element) });
          } else if (isFunction(v) && (!k.startsWith("on") || v.isDerived)) {
            bind({ render: () => (setter(v({ element })), element) });
          } else {
            setter(v);
          }
        }
        add(element, ...children);
        props.bauCreated?.({ element });
        props.bauMounted &&
          window.requestAnimationFrame(() => props.bauMounted({ element }));
        props.bauUnmounted &&
          window.requestAnimationFrame(() =>
            observerRemovedNode(element, props.bauUnmounted)
          );
        return element;
      },
      {
        get: (tag, name) => tag.bind(undefined, name),
      }
    );

  let bind = ({
    deps: depsOveride,
    render,
    element: currentElement,
    renderItem,
  }) => {
    let depsInfered = new Set();
    let renderArgs = { element: currentElement, renderItem };
    let newElement = /* @__PURE__ */ depsOveride
      ? render(renderArgs)
      : runAndCaptureDeps(render, depsInfered, renderArgs);
    const deps = depsOveride ?? depsInfered;
    const element = toDom(newElement ? newElement : ghost());
    const binding = {
      deps,
      render,
      renderItem,
      element,
    };
    for (let dep of deps) {
      if (isState(dep)) {
        stateSet.add(dep);
        dep.bindings.push(binding);
      }
    }
    return element;
  };
  return { tags: tagsNS(), tagsNS, state, bind, stateSet };
}
