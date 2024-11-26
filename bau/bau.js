let getType = (obj) => Object.prototype.toString.call(obj ?? 0).slice(8, -1);
let isObject = (val) => getType(val) == "Object";
let isFunction = (obj) => getType(obj) == "Function";
let isArrayOrObject = (obj) => ["Object", "Array"].includes(getType(obj));
let protoOf = Object.getPrototypeOf;
let toVal = (state) => (isState(state) ? state.val : state);
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
  let _stateSetInBatch = new Set();
  let _inBatch = false;
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

  let updateDom = (state, method, result, args, data, parentProp) => {
    if (_inBatch) {
      _stateSetInBatch.add([state, method, result, args, data, parentProp]);
      return;
    }
    for (let binding of state.bindings) {
      let { deps, element, renderInferred, render, renderItem, isAttribute } =
        binding;
      if (renderItem && method) {
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
    }

    _window.requestAnimationFrame(() => updateDerive(state));
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
        prop,
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

  let createState = (initVal, { onUpdate } = {}) => ({
    rawVal: initVal,
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
      let oldVal = state.rawVal;
      onUpdate?.(oldVal, value);
      state.rawVal = value;
      if (isArrayOrObject(value)) {
        state.valProxy = createProxy(state, value);
        updateDom(state, "assign", value);
      } else if (value !== oldVal) {
        state.valProxy = value;
        updateDom(state);
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

  let observerRemovedNode = (element, bauUnmounted) =>
    new _window.MutationObserver((mutationList, observer) => {
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
          } else if (k.startsWith("bau")) {
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

  let bindFinalize = (binding, deps, newElement, isAttribute) => {
    binding.element = toDom(newElement);
    binding.isAttribute = isAttribute;
    for (let dep of deps) {
      if (isState(dep)) {
        stateSet.add(dep);
        dep.bindings.push(binding);
      }
    }
    return binding.element;
  };

  let bindInferred = (renderInferred, isAttribute) => {
    let deps = new Set();
    let newElement = runAndCaptureDeps(renderInferred, deps, {});
    return bindFinalize({ renderInferred }, deps, newElement, isAttribute);
  };

  let bind = ({ deps, element, render, renderItem }, isAttribute) =>
    bindFinalize(
      { deps, render, renderItem },
      deps,
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

  let batch = async (batchFn) => {
    _inBatch = true;
    let res = await batchFn();
    _inBatch = false;
    _stateSetInBatch.forEach((args) => updateDom(...args));
    _stateSetInBatch.clear();
    return res;
  };

  return {
    tags: tagsNS(),
    tagsNS,
    state: createState,
    bind,
    loop,
    derive,
    stateSet,
    batch,
  };
}
