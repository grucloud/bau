const getType = (obj) => Object.prototype.toString.call(obj ?? 0).slice(8, -1);
const isObject = (val) => getType(val) == "Object";
const protoOf = Object.getPrototypeOf;
const h = (tag) => document.createElement(tag);
const ghost = () => h("span");
const isArrayOrObject = (obj) => ["Object", "Array"].includes(getType(obj));
const isState = (state) => state.__isState;
let toVal = (state) => (isState(state) ? state._val : state);
let toOldVal = (state) => (isState(state) ? state.oldVal : state);

export default function Bau() {
  let _debounce;
  const stateSet = new Set();

  let vals = (deps) => deps.map(toVal);

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

  let updateDom = (state) => {
    for (let binding of state.bindings) {
      let { deps, element, render, renderItem } = binding;
      const depsValues = vals(deps);
      if (renderItem && state.arrayOp) {
        methodToActionMapping({
          ...state.arrayOp,
          element,
          renderDomItem: (value) =>
            toDom(renderItem({ deps: depsValues, element })(value)),
        })[state.arrayOp.method]?.call();
        bindingCleanUp();
      } else {
        let newElement = render({
          element,
          oldValues: deps.map(toOldVal),
          renderItem: renderItem?.({ deps: depsValues, element }),
        })(...depsValues);
        if (newElement !== element) {
          element.replaceWith(
            (binding.element =
              newElement != undefined ? toDom(newElement) : ghost())
          );
        }
      }
    }
    state.arrayOp = null;
  };

  const proxyHandler = ({ state, data, parentProp = [] }) => ({
    get(target, prop, receiver) {
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
          state.arrayOp = {
            method: prop,
            args,
          };
          updateDom(state);
          return result;
        };
      }
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      const result = Reflect.set(target, prop, value, receiver);
      state.arrayOp = {
        method: "setItem",
        args: { prop, value },
        parentProp: [...parentProp, prop],
        data,
      };
      updateDom(state);
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
    arrayOp: null,
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
      return this._val;
    },
    set val(value) {
      let state = this;
      let currentValue = state._val;
      if (isArrayOrObject(value)) {
        state._val = createProxy(state, value);
        state.arrayOp = {
          method: "assign",
          args: value,
        };
        updateDom(state);
      } else {
        if (value !== currentValue) {
          state._val = value;
          updateDom(state);
        }
      }
      state.oldVal = currentValue;
    },
  });

  let toDom = (v) => (v.nodeType ? v : new Text(v));

  let add = (element, ...children) => {
    if (children.length == 0) return element;
    const childrenDom = [];
    for (let child of children.flat(Infinity))
      if (child != null) {
        childrenDom.push(
          isState(child)
            ? bind({ deps: [child], render: () => (v) => v })
            : toDom(child)
        );
      }
    element.append(...childrenDom);
    return element;
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

  const observerRemovedNode = (element, bauUnmounted) => {
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
  };

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
            bind({ deps: [v], render: () => (v) => (setter(v), element) });
          } else if (v.renderProp) {
            bind({
              deps: v["deps"],
              render:
                ({}) =>
                (...deps) => (
                  setter(v["renderProp"]({ element })(...deps)), element
                ),
            });
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

  let bind = ({ deps, render, renderItem }) => {
    const result = render({
      deps,
      renderItem: renderItem && renderItem({ deps }),
    })(...vals(deps));
    const element = toDom(result ?? ghost());
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
  return { tags: tagsNS(), tagsNS, state, bind };
}
