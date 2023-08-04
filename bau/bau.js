let getType = (obj) => Object.prototype.toString.call(obj ?? 0).slice(8, -1);
let isObject = (val) => getType(val) == "Object";
let isFunction = (obj) => getType(obj) == "Function";
let isArrayOrObject = (obj) => ["Object", "Array"].includes(getType(obj));
let protoOf = Object.getPrototypeOf;
let toVal = (state) => (isState(state) ? state.val : state);
let isState = (state) => state?.__isState;
let METHODS = ["splice", "push", "pop", "shift", "unshift", "sort", "reverse"];

export default function Bau(input) {
  let _window = input?.window ?? window;
  let { document } = _window;
  let _debounce;
  let stateSet = new Set();
  let _curDeps;

  let h = (tag) => document.createElement(tag);
  let runAndCaptureDeps = (render, deps, arg) => {
    let prevDeps = _curDeps;
    _curDeps = deps;
    let result = render(arg);
    _curDeps = prevDeps;
    return result;
  };

  let bindingCleanUp = () => {
    if (!_debounce) {
      _debounce = window.requestAnimationFrame(() => {
        stateSet.forEach((state) => {
          state.bindings = state.bindings.filter((b) => b.element?.isConnected);
          !state.bindings.length && !state.computed && stateSet.delete(state);
        });
        _debounce = undefined;
      });
    }
  };

  let updateDom = (state, method, result, args, data) => {
    for (let binding of state.bindings) {
      let { deps, element, renderInferred, render, renderItem } = binding;
      if (renderItem && method) {
        methodToActionMapping(
          element,
          args,
          (...args) => toDom(renderItem(...args)),
          result,
          data
        )[method]?.call();
      } else {
        let newElement = renderInferred
          ? renderInferred({
              element,
            })
          : render({ element, renderItem })(...deps.map(toVal));
        if (newElement !== element) {
          element.replaceWith((binding.element = toDom(newElement)));
        }
      }
    }
    updateDerive(state);
    bindingCleanUp();
  };

  let proxyHandler = (state, data, parentProp = []) => ({
    get(target, prop, receiver) {
      _curDeps?.add(state);
      if (prop === "_isProxy") return true;
      if (
        !target[prop]?._isProxy &&
        !isState(target[prop]) &&
        isArrayOrObject(target[prop])
      ) {
        target[prop] = new Proxy(
          target[prop],
          proxyHandler(state, data, [...parentProp, prop])
        );
      } else if (METHODS.includes(prop)) {
        let origMethod = target[prop];
        return (...args) => {
          let result = origMethod.apply(target, args);
          updateDom(state, prop, result, args);
          return result;
        };
      }
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      let result = Reflect.set(target, prop, value, receiver);
      updateDom(state, "setItem", result, { prop, value }, data);
      return result;
    },
  });

  let createProxy = (state, data) => new Proxy(data, proxyHandler(state, data));

  let methodToActionMapping = (element, args, renderDomItem, result, data) => {
    let replaceChildren = () =>
      element.replaceChildren(...result.map(renderDomItem));
    let removeChild = (key) =>
      element[key] && element.removeChild(element[key]);
    return {
      assign: replaceChildren,
      sort: replaceChildren,
      reverse: replaceChildren,
      setItem: () => {
        let index = args.prop;
        element.children[index]?.replaceWith(renderDomItem(data[index], index));
      },
      push: () =>
        element.append(
          ...args.map((item, index) =>
            renderDomItem(item, element.children.length + index)
          )
        ),
      unshift: () => element.prepend(...args.map(renderDomItem)),
      pop: () => removeChild("lastChild"),
      shift: () => removeChild("firstChild"),
      splice: () => {
        let [start, deleteCount, ...newItems] = args;
        const { length } = element.children;
        for (
          let i =
            start >= 0
              ? Math.min(start + deleteCount - 1, length - 1)
              : length - 1;
          i >= (start >= 0 ? start : length + start);
          i--
        ) {
          element.children[i].remove();
        }
        if (newItems.length) {
          let elementNewItems = newItems.forEach((item, index) =>
            renderDomItem(item, start + index)
          );
          element.children[start]
            ? element.children[start].after(...elementNewItems)
            : element.append(...elementNewItems);
        }
      },
    };
  };

  let createState = (initVal) => ({
    oldVal: initVal,
    bindings: [],
    listeners: [],
    __isState: true,
    get val() {
      let _state = this;
      _curDeps?.add(_state);
      return (
        _state.valProxy ??
        ((_state.valProxy = isArrayOrObject(initVal)
          ? createProxy(_state, initVal)
          : initVal),
        _state.valProxy)
      );
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
    },
  });

  let toDom = (v) => {
    if (v == null || v === false) {
      return h("span");
    } else if (v.nodeType) {
      return v;
    } else {
      return document.createTextNode(v);
    }
  };

  let deriveInternal = (computed, state) => {
    let deps = new Set();
    state.val = runAndCaptureDeps(computed, deps);
    return deps;
  };

  let derive = (computed) => {
    let state = createState();
    let deps = deriveInternal(computed, state);
    state.computed = true;
    for (let dep of deps) dep.listeners.push({ computed, deps, state });
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
        child != null &&
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
    proto &&
    (Object.getOwnPropertyDescriptor(proto, key) ??
      getPropDescriptor(protoOf(proto), key));

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
        let [props, ...children] =
          !isState(args[0]) && isObject(args[0]) ? args : [{}, ...args];
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
    let deps = new Set();
    let newElement = runAndCaptureDeps(renderInferred, deps, { element });
    return bindFinalize({ renderInferred }, deps, newElement);
  };

  let bind = ({ deps, element, render, renderItem: renderItemHL }) => {
    let renderItem = renderItemHL?.({ deps, element });
    let newElement = render({ element, renderItem })(...deps.map(toVal));
    let binding = { deps, render, renderItem };
    return bindFinalize(binding, deps, newElement);
  };

  let If = (...args) => {
    let endPoint = args.length;
    for (let [index, branch] of args)
      if (branch.when === undefined) {
        branch.when = () => true;
        endPoint = index + 1;
        break;
      }
    let branches = args
      .slice(0, endPoint)
      .map((item) => ({ when: derive(item.when), node: item.node }));
    return () => {
      for (let branch of args) if (branch.when.val) return branch.node();
    };
  };

  return { tags: tagsNS(), tagsNS, state: createState, bind, derive, stateSet, If };
}
