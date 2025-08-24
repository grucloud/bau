let getType = (obj) => Object.prototype.toString.call(obj ?? 0).slice(8, -1);
let isObject = (val) => getType(val) == "Object";
let isFunction = (obj) => getType(obj) == "Function";
let isArrayOrObject = (obj) => ["Object", "Array"].includes(getType(obj));
let protoOf = Object.getPrototypeOf;
let toVal = (state) => (isState(state) ? state.rawVal : state);
let toArray = (el) => (Array.isArray(el) ? el : [el]);
let isState = (state) => state?.__isState;
let METHODS = ["splice", "push", "pop", "shift", "unshift", "sort", "reverse"];

export const toPropsAndChildren = (args) =>
  !isState(args[0]) && isObject(args[0])
    ? [args[0], args.slice(1)]
    : [{}, args];

export default function Bau(input) {
  let _window = input?.window ?? window;
  let { document } = _window;
  let _debounce;
  let stateSet = new Set();
  let _stateOps = [];
  let _curDeps;
  let h = (tag) => document.createElement(tag);
  let runAndCaptureDeps = (render, deps, arg) => {
    let prevDeps = _curDeps;
    _curDeps = deps;

    try {
      return render(arg);
    } catch (e) {
      console.error(e);
      return arg;
    } finally {
      _curDeps = prevDeps;
    }
  };

  let bindingCleanUp = () => {
    if (!_debounce) {
      _debounce = _window.requestAnimationFrame(() => {
        stateSet.forEach((state) => {
          state.bindings = state.bindings.filter(
            ({ element }) =>
              (Array.isArray(element) ? element[0] : element)?.isConnected
          );
          !state.bindings.length && !state.computed && stateSet.delete(state);
        });
        _debounce = undefined;
      });
    }
  };
  let updateDom = (state, op) => {
    !_stateOps.length && _window.requestAnimationFrame(processDom);
    _stateOps.push([state, op]);
  };

  const processDom = () => {
    let iStart = 0;
    let iEnd = _stateOps.length;
    do {
      for (let listener of new Set(
        _stateOps.slice(iStart, iEnd).flatMap(([state]) => state.listeners)
      ))
        deriveInternal(listener.computed, listener.state);
      iStart = iEnd;
      iEnd = _stateOps.length;
    } while (iStart < iEnd);
    for (let binding of new Set(
      _stateOps.flatMap(([state, op]) =>
        state.bindings.map((b) => ((b.op = op), b))
      )
    ))
      updateBinding(binding);
    _stateOps = [];
    bindingCleanUp();
  };

  let updateBinding = (binding) => {
    const {
      deps,
      element,
      renderInferred,
      render,
      renderItem,
      isAttribute,
      op = [],
    } = binding;
    const [method, result, args, data, parentProp = []] = op;
    if (method && renderItem) {
      !parentProp.length &&
        methodToActionMapping(
          element,
          args,
          (...args) => toDom(renderItem(...args)),
          result,
          data,
          parentProp
        )[method]?.call();
    } else {
      let newElement = renderInferred
        ? renderInferred({
            element,
          })
        : render({ element, renderItem })(...deps.map(toVal));
      if (newElement !== element && !isAttribute) {
        let newEls = toArray((binding.element = toDom(newElement)));
        let oldEls = toArray(element);
        let i = 0;
        for (; i < oldEls.length && i < newEls.length; i++) {
          oldEls[i].replaceWith(toDom(newEls[i]));
        }
        let newI = i;
        while (newEls.length > newI) {
          newEls[newI - 1].after(newEls[newI]);
          newI++;
        }
        while (oldEls.length > i) {
          oldEls[i].remove();
          i++;
        }
      }
    }
  };

  let proxyHandler = (state, data, parentProp = []) => ({
    get(target, prop, receiver) {
      _curDeps?.g?.add(state);
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
          updateDom(state, [prop, result, args, data, parentProp]);
          return result;
        };
      }
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      let result = Reflect.set(target, prop, value, receiver);
      updateDom(state, [
        "setItem",
        result,
        { prop, value },
        data,
        [...parentProp, prop],
      ]);
      return result;
    },
  });

  let createProxy = (state, data) => new Proxy(data, proxyHandler(state, data));

  let methodToActionMapping = (
    element,
    args,
    renderDomItem,
    result,
    data,
    parentProp
  ) => {
    let replaceChildren = () => {
      if (result.length == 0) {
        element.textContent = "";
      } else {
        for (var i = 0; i < result.length && i < element.children.length; i++) {
          const oldEl = element.children[i];
          oldEl?.bauUpdate
            ? oldEl.bauUpdate(oldEl, result[i])
            : oldEl.replaceWith(renderDomItem(result[i], i));
        }

        let old = element.children[i];
        if (old) {
          while (old) {
            const next = old.nextSibling;
            old.remove();
            old = next;
          }
        } else {
          for (; i < result.length; i++) {
            element.appendChild(renderDomItem(result[i], i));
          }
        }
      }
    };
    let removeChild = (key) =>
      element[key] && element.removeChild(element[key]);
    return {
      assign: replaceChildren,
      sort: replaceChildren,
      reverse: replaceChildren,
      setItem: () => {
        let index = parentProp[0];
        let oldEl = element.children[index];
        let value = data[index];
        if (oldEl) {
          oldEl?.bauUpdate
            ? oldEl.bauUpdate(oldEl, value)
            : oldEl.replaceWith(renderDomItem(value, index));
        }
      },
      push: () => {
        for (let i = 0; i < args.length; i++)
          element.appendChild(renderDomItem(args[i], data.length + i));
      },
      unshift: () => {
        for (let i = args.length - 1; i >= 0; i--)
          element.prepend(renderDomItem(args[i]));
      },
      pop: () => removeChild("lastChild"),
      shift: () => removeChild("firstChild"),
      splice: () => {
        const { length } = element.children;
        let [start, deleteCount = length, ...newItems] = args;
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
          let elementNewItems = newItems.map((item, index) =>
            renderDomItem(item, start + index)
          );
          element.children[start]
            ? element.children[start].before(...elementNewItems)
            : element.append(...elementNewItems);
        }
      },
    };
  };

  let createState = (initVal, { onUpdate, name } = {}) => ({
    name,
    rawVal: initVal,
    bindings: [],
    listeners: [],
    __isState: true,
    get val() {
      let _state = this;
      _curDeps?.g?.add(_state);
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
      let oldVal = state.rawVal;
      _curDeps?.s?.add(state);
      onUpdate?.(oldVal, value);
      state.rawVal = value;
      if (isArrayOrObject(value)) {
        state.valProxy = createProxy(state, value);
        updateDom(state, ["assign", value]);
      } else if (value !== oldVal) {
        state.valProxy = value;
        state.bindings.length + state.listeners.length && updateDom(state);
      }
    },
  });

  let toDom = (v) => {
    if (v == null || v === false) {
      let spanEl = h("span");
      spanEl.style.display = "none";
      return spanEl;
    } else if (v.nodeType) {
      return v;
    } else if (Array.isArray(v)) {
      return v.map(toDom);
    } else {
      return document.createTextNode(v);
    }
  };

  let deriveInternal = (computed, state) => {
    let deps = { g: new Set(), s: new Set() };
    state.val = runAndCaptureDeps(computed, deps);

    let listener = { computed, state };
    for (let dep of new Set(
      [...deps.g].filter(
        (dep) =>
          !deps.s.has(dep) &&
          dep.listeners.every((listener) => !deps.g.has(listener.state))
      )
    ))
      dep.listeners.push(listener);
  };

  let derive = (computed, options) => {
    let state = createState(undefined, options);
    deriveInternal(computed, state);
    state.computed = true;
    return state;
  };

  let add = (element, children = []) => {
    for (let child of children) {
      if (Array.isArray(child)) {
        add(element, child);
      } else if (child != null) {
        let newChild = isState(child)
          ? bind({ deps: [child], render: () => (v) => v })
          : isFunction(child)
          ? bindInferred(child)
          : toDom(child);
        Array.isArray(newChild)
          ? element.append(...newChild)
          : element.appendChild(newChild);
      }
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

  let isParent = (p, e) => e && (e === p || isParent(p, e.parentNode));

  let observerRemovedNode = (element, bauUnmounted = () => {}) => {
    new _window.MutationObserver((mutationList, observer) => {
      mutationList
        .filter((record) => record.removedNodes)
        .forEach((record) =>
          [...record.removedNodes].find(
            (removedNode) =>
              isParent(removedNode, element) &&
              (bauUnmounted({ element }), observer.disconnect(), true)
          )
        );
    }).observe(element.ownerDocument, { childList: true, subtree: true });
  };

  let observerChildNode = (element, bauChildMutated) =>
    new _window.MutationObserver((mutationList, observer) =>
      mutationList.forEach((record) => bauChildMutated({ record, element }))
    ).observe(element, { childList: true });

  let tagsNS = (namespace) =>
    new Proxy(
      function createTag(name, ...args) {
        let [props, children] = toPropsAndChildren(args);
        let element = namespace
          ? document.createElementNS(namespace, name)
          : h(name);
        for (let [k, v] of Object.entries(props)) {
          if (k == "bauUpdate") {
            element[k] = v;
          } else if (
            [
              "bauCreated",
              "bauMounted",
              "bauUnmounted",
              "bauChildMutated",
            ].includes(k)
          ) {
          } else {
            let setter = isSettableProp(name, k, protoOf(element))
              ? (v) => v !== undefined && (element[k] = v)
              : (v) =>
                  element.setAttribute(
                    k,
                    Array.isArray(v) ? v.filter((c) => c).join(" ") : v
                  );
            if (v == null) {
            } else if (isState(v)) {
              bind(
                { deps: [v], render: () => () => (setter(v.val), element) },
                true
              );
            } else if (isFunction(v) && (!k.startsWith("on") || v.isDerived)) {
              bindInferred(() => (setter(v({ element })), element), true);
            } else if (v.renderProp) {
              bind(
                {
                  deps: v["deps"],
                  render: () => () => (
                    setter(
                      v["renderProp"]({ element })(...v["deps"].map(toVal))
                    ),
                    element
                  ),
                },
                true
              );
            } else {
              setter(v);
            }
          }
        }
        props.bauChildMutated &&
          observerChildNode(element, props.bauChildMutated);
        add(element, children);
        element.autofocus &&
          element.focus &&
          _window.requestAnimationFrame(() => element.focus());
        props.bauCreated?.({ element });
        (props.bauMounted || props.bauUnmounted) &&
          _window.requestAnimationFrame(
            () =>
              element.isConnected &&
              (observerRemovedNode(element, props.bauUnmounted),
              props.bauMounted?.({ element }))
          );
        return element;
      },
      {
        get: (tag, name) => tag.bind(undefined, name),
      }
    );

  let bindFinalize = (binding, deps, newElement, isAttribute) => {
    binding.element = toDom(newElement);
    binding.isAttribute = isAttribute;
    for (let dep of deps.g) {
      if (isState(dep)) {
        stateSet.add(dep);
        dep.bindings.push(binding);
      }
    }
    return binding.element;
  };

  let bindInferred = (renderInferred, isAttribute) => {
    let deps = { g: new Set(), s: new Set() };
    let newElement = runAndCaptureDeps(renderInferred, deps, {});
    return bindFinalize({ renderInferred }, deps, newElement, isAttribute);
  };

  let bind = ({ deps, element, render, renderItem }, isAttribute) =>
    bindFinalize(
      { deps, render, renderItem },
      { g: new Set(deps), s: new Set() },
      render({ element, renderItem })(...deps.map(toVal)),
      isAttribute
    );

  let loop = (stateArray, container, renderItem) =>
    bind({
      deps: [stateArray],
      render:
        ({ renderItem }) =>
        (arr) => {
          for (let i = 0; i < arr.length; i++)
            container.appendChild(renderItem(arr[i], i));
          return container;
        },
      renderItem,
    });

  return {
    tags: tagsNS(),
    tagsNS,
    state: createState,
    bind,
    loop,
    derive,
    stateSet,
  };
}
