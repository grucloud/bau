let getType = (obj) => Object.prototype.toString.call(obj ?? 0).slice(8, -1);
let isObject = (val) => getType(val) == "Object";
let protoOf = Object.getPrototypeOf;
let isArrayOrObject = (obj) => ["Object", "Array"].includes(getType(obj));
let isFunction = (obj) => getType(obj) == "Function";
let toVal = (state) => (isState(state) ? state._val : state);
let isState = (state) => state.__isState;

export default function Bau(input) {
  let _window = input?.window ?? window;
  let { document } = _window;
  let _debounce;
  let stateSet = new Set();
  let _curDeps;

  let h = (tag) => document.createElement(tag);
  let ghost = () => h("span");

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
          (state.bindings = state.bindings.filter(
            (b) => b.element?.isConnected
          ))
      )
    );

  let updateDom = (state, method, args, parentProp, data) => {
    for (let binding of state.bindings) {
      let { deps, element, renderInferred, render, renderItem } = binding;
      if (renderItem && method) {
        methodToActionMapping(
          element,
          parentProp,
          args,
          (value) => toDom(renderItem(value)),
          data
        )[method]?.call();
      } else {
        let newElement = renderInferred
          ? renderInferred({
              element,
            })
          : render({ element, renderItem })(...deps.map(toVal));
        if (newElement !== element) {
          element.replaceWith(
            (binding.element =
              newElement != undefined ? toDom(newElement) : ghost())
          );
        }
      }
    }
    bindingCleanUp();
  };

  let proxyHandler = (state, data, parentProp = []) => ({
    get(target, prop, receiver) {
      _curDeps?.add(state);
      if (prop === "_isProxy") return true;
      if (!target[prop]?._isProxy && isArrayOrObject(target[prop])) {
        target[prop] = new Proxy(
          target[prop],
          proxyHandler(state, data, [...parentProp, prop])
        );
      } else if (["splice", "push", "pop", "shift", "unshift"].includes(prop)) {
        let origMethod = target[prop];
        return (...args) => {
          let result = origMethod.apply(target, args);
          updateDom(state, prop, args);
          return result;
        };
      }

      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      let result = Reflect.set(target, prop, value, receiver);
      updateDom(state, "setItem", { prop, value }, [...parentProp, prop], data);
      return result;
    },
  });

  let createProxy = (state, data) => new Proxy(data, proxyHandler(state, data));

  let methodToActionMapping = (
    element,
    parentProp,
    args,
    renderDomItem,
    data
  ) => ({
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
      element.firstChild
        ? element.firstChild.before(item)
        : element.appendChild(item);
    },
    splice: () => {
      let [start, deleteCount, ...newItems] = args;
      for (
        let i = Math.min(start + deleteCount - 1, element.children.length - 1);
        i >= start;
        i--
      ) {
        element.children[i].remove();
      }
      if (newItems.length) {
        let elementNewItems = newItems.forEach(renderDomItem);
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
      let _state = this;
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
        updateDom(state, "assign", value);
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
      let childrenDom = [];
      for (let child of children.flat(Infinity))
        child &&
          childrenDom.push(
            isState(child)
              ? bind({ deps: [child], render: () => (v) => v })
              : isFunction(child)
              ? bindInferred({ renderInferred: child })
              : toDom(child)
          );
      element.append(...childrenDom);
    }
  };

  let isSettablePropCache = {};

  let getPropDescriptor = (proto, key) =>
    proto
      ? Object.getOwnPropertyDescriptor(proto, key) ??
        getPropDescriptor(protoOf(proto), key)
      : undefined;

  let isSettableProp = (tag, key, proto) =>
    isSettablePropCache[tag + "," + key] ??
    (isSettablePropCache[tag + "," + key] =
      getPropDescriptor(proto, key)?.set ?? 0);

  let observerRemovedNode = (element, bauUnmounted) =>
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

  let tagsNS = (namespace) =>
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
            bind({ deps: [v], render: () => () => (setter(v.val), element) });
          } else if (isFunction(v) && (!k.startsWith("on") || v.isDerived)) {
            bindInferred({
              renderInferred: () => (setter(v({ element })), element),
            });
          } else if (v.renderProp) {
            bind({
              deps: v["deps"],
              render: () => () => (
                setter(v["renderProp"]({ element })(...v["deps"].map(toVal))),
                element
              ),
            });
          } else {
            setter(v);
          }
        }
        add(element, ...children);
        props.bauCreated?.({ element });
        props.bauMounted &&
          _window.requestAnimationFrame(() => props.bauMounted({ element }));
        props.bauUnmounted &&
          _window.requestAnimationFrame(() =>
            observerRemovedNode(element, props.bauUnmounted)
          );
        return element;
      },
      {
        get: (tag, name) => tag.bind(undefined, name),
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
    let deps = new Set();
    let newElement = runAndCaptureDeps(renderInferred, deps, {
      element,
    });
    let binding = {
      renderInferred,
    };
    return bindFinalize(binding, deps, newElement);
  };

  let bind = ({ deps, element, render, renderItem: renderItemHL }) => {
    let renderItem = renderItemHL?.({ deps, element });
    let newElement = render({
      element,
      renderItem,
    })(...deps.map(toVal));
    let binding = {
      deps,
      render,
      renderItem,
    };
    return bindFinalize(binding, deps, newElement);
  };

  return { tags: tagsNS(), tagsNS, state, bind, stateSet };
}
