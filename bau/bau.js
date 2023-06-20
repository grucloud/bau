const getType = (obj) => Object.prototype.toString.call(obj ?? 0).slice(8, -1);
const isObject = (val) => getType(val) == "Object";
const protoOf = Object.getPrototypeOf;

const isArrayOrObject = (obj) => ["Object", "Array"].includes(getType(obj));

export default function Bau() {
  let _debounce;
  const stateSet = new Set();

  const isState = (state) => state.__isState;

  let toVal = (state) => (isState(state) ? state._val : state);
  let toOldVal = (state) => (isState(state) ? state.oldVal : state);

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
          (state.bindings = state.bindings.filter((b) => b.dom?.isConnected))
      )
    );

  let updateDom = (state) => {
    for (let binding of state.bindings) {
      let { deps, dom, render, renderItem } = binding;
      const depsValues = vals(deps);
      // Array handling
      if (renderItem && state.arrayOp) {
        methodToActionMapping({
          ...state.arrayOp,
          dom,
          renderDomItem: (value) =>
            toDom(renderItem({ deps: depsValues })(value)),
        })[state.arrayOp.method]?.call();
        bindingCleanUp();
      } else {
        // Primitive or object
        let newDom = render({
          dom,
          oldValues: deps.map(toOldVal),
          renderItem,
        })(...depsValues);
        if (newDom !== dom) {
          if (newDom != undefined) {
            dom.replaceWith((binding.dom = toDom(newDom)));
          } else {
            dom.remove();
            binding.dom = undefined;
          }
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
        newTarget: target,
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
    dom,
    parentProp,
    args,
    depsValues,
    renderDomItem,
    data,
  }) => ({
    assign: () => dom.replaceChildren(...args.map(renderDomItem)),
    setItem: () => {
      const index = parentProp[0];
      const child = dom.children[index];
      const dataEl = data[index];
      if (child) {
        child.replaceWith(renderDomItem(dataEl));
      }
    },
    push: () => dom.append(...args.map(renderDomItem)),
    pop: () => dom.lastChild && dom.removeChild(dom.lastChild),
    shift: () => dom.firstChild && dom.removeChild(dom.firstChild),
    unshift: () => {
      const item = renderDomItem(args[0], depsValues);
      dom.firstChild ? dom.firstChild.before(item) : dom.appendChild(item);
    },
    splice: () => {
      const [start, deleteCount, ...newItems] = args;
      for (
        let i = Math.min(start + deleteCount - 1, dom.children.length - 1);
        i >= start;
        i--
      ) {
        dom.children[i].remove();
      }
      if (newItems.length > 0) {
        const domNewItems = newItems.forEach(renderDomItem);
        dom.children[start]
          ? dom.children[start].after(domNewItems)
          : dom.append(...domNewItems);
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

  let add = (dom, ...children) => {
    if (children.length == 0) return dom;
    const childrenDom = [];
    for (let child of children.flat(Infinity))
      if (child != null) {
        childrenDom.push(
          isState(child)
            ? bind({ deps: [child], render: () => (v) => v })
            : toDom(child)
        );
      }
    dom.append(...childrenDom);
    return dom;
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

  const tagsNS = (namespace) =>
    new Proxy(
      function createTag(name, ...args) {
        let [props, ...children] = isObject(args[0]) ? args : [{}, ...args];
        let dom = namespace
          ? document.createElementNS(namespace, name)
          : document.createElement(name);
        for (let [k, v] of Object.entries(props)) {
          let setter = isSettableProp(name, k, protoOf(dom))
            ? (v) => (dom[k] = v)
            : (v) => dom.setAttribute(k, v);
          if (v == null) {
          } else if (isState(v)) {
            bind({ deps: [v], render: () => (v) => (setter(v), dom) });
          } else if (v.renderProp) {
            bind({
              deps: v["deps"],
              render:
                ({}) =>
                (...deps) => (setter(v["renderProp"]({ dom })(...deps)), dom),
            });
          } else {
            setter(v);
          }
        }
        return add(dom, ...children);
      },
      {
        get: (tag, name) => tag.bind(undefined, name),
      }
    );

  let bind = ({ deps, render, renderItem }) => {
    const result = render({ renderItem })(...vals(deps));
    if (result != null) {
      const dom = toDom(result);
      const binding = {
        deps,
        render,
        renderItem,
        dom,
      };

      for (let dep of deps) {
        if (isState(dep)) {
          stateSet.add(dep);
          dep.bindings.push(binding);
        }
      }
      return dom;
    }
  };

  return { tags: tagsNS(), tagsNS, state, bind };
}
