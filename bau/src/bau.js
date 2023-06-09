import morphdom from "nanomorph";

const arrayOperationMutation = ["splice", "push", "pop", "shift", "unshift"];

const O = Object;
const pOf = O.getPrototypeOf;

const isProtoOf = (obj, proto) => pOf(obj) === proto;
const objProto = pOf({});

const isObject = (val) => isProtoOf(val ?? 0, objProto);

function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

const filterBindings = (state) =>
  (state.bindings = state.bindings.filter((b) => b.dom?.isConnected));

export default function Bau() {
  let _debounce;
  const changedStatesSet = new Set();
  const stateSet = new Set();

  function debounceSchedule(callback) {
    _debounce && window.cancelAnimationFrame(_debounce);
    _debounce = window.requestAnimationFrame(callback);
  }

  const bindingCleanUp = () =>
    debounceSchedule(() => stateSet.forEach(filterBindings));

  const schedule = (set, callback) => (state) => {
    set.size == 0 && debounceSchedule(callback);
    set.add(state);
  };

  let updateDom = (state) => {
    for (let binding of state.bindings) {
      if (!binding.dom?.isConnected) {
        continue;
      }
      let { deps, dom, render, renderItem } = binding;
      const depsValues = deps.map((d) => d._val);
      // Array handling
      if (renderItem) {
        for (let op of state.arrayOps) {
          methodToActionMapping({
            ...op,
            dom,
            renderDomItem: (value) =>
              toDom(renderItem({ deps: depsValues })(value)),
          })[op.method]?.call();
        }
        bindingCleanUp();
      } else {
        // Primitive or object
        let newDom = render({ dom, oldValues: deps.map((d) => d.oldVal) })(
          ...depsValues
        );
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
    state.oldVal = state._val;
    state.arrayOps = [];
  };

  let updateDoms = () => {
    let changedStatesArray = [...changedStatesSet];
    changedStatesSet.clear();
    for (let state of changedStatesArray) {
      updateDom(state);
    }
  };

  const scheduleDom = schedule(changedStatesSet, updateDoms);

  const proxyHandler = ({ state, data, parentProp = [] }) => ({
    get(target, prop, receiver) {
      if (prop === "_isProxy") return true;
      if (
        ["object", "array"].includes(getType(target[prop])) &&
        !target[prop]._isProxy
      ) {
        target[prop] = new Proxy(
          target[prop],
          proxyHandler({
            state,
            data,
            parentProp: [...parentProp, prop],
          })
        );
      } else if (arrayOperationMutation.includes(prop)) {
        const origMethod = target[prop];
        return (...args) => {
          const result = origMethod.apply(target, args);
          state.arrayOps.push({
            method: prop,
            args,
            newArray: target,
          });
          updateDom(state);
          return result;
        };
      }
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      const result = Reflect.set(target, prop, value, receiver);
      state.arrayOps.push({
        method: "setItem",
        args: { prop, value },
        newTarget: target,
        parentProp: [...parentProp, prop],
        data,
      });

      scheduleDom(state);
      return result;
    },
  });

  const createArrayProxy = (state, data) =>
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
      const oldDom = dom.children[index];
      const newDom = renderDomItem(data[index]);
      morphdom(oldDom, newDom);
      /**
       * Implementation without morphdom, a bit slower
       * const child = dom.children[args[0]];
      if (child) {
        child.replaceWith(renderDomItem(args[1]));
      }
       */
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

  let stateProto = {
    get val() {
      return this._val;
    },
    set val(value) {
      let state = this;
      let currentValue = state._val;
      if (Array.isArray(value)) {
        state._val = createArrayProxy(state, value);
        state.arrayOps.push({
          method: "assign",
          args: value,
          newArray: value,
          oldArray: currentValue,
        });
        scheduleDom(state);
      } else {
        if (value !== currentValue) {
          if (state.oldVal === currentValue) {
            scheduleDom(state);
          } else if (value === state.oldVal) {
            changedStatesSet.delete(state);
          }
          state.listeners.forEach((listener) => listener(value, currentValue));
        }
        state._val = value;
      }
    },
    onnew(listener) {
      this.listeners.push(listener);
    },
  };

  let state = (initVal) => {
    const _state = {
      oldVal: initVal,
      bindings: [],
      listeners: [],
      arrayOps: [],
      __isState: true,
    };

    return {
      ..._state,
      __proto__: stateProto,
      _val: Array.isArray(initVal)
        ? createArrayProxy(_state, initVal)
        : initVal,
    };
  };

  let toDom = (v) => (v.nodeType ? v : new Text(v));

  let add = (dom, ...children) => (
    dom.append(
      ...children
        .flat(Infinity)
        .filter((c) => c != null)
        .map((child) =>
          child.__isState
            ? bind({ deps: [child], render: () => (v) => v })
            : toDom(child)
        )
    ),
    dom
  );

  let tags = new Proxy(
    function createTag(name, ...args) {
      let [props, ...children] = isObject(args[0]) ? args : [{}, ...args];
      let dom = document.createElement(name);
      for (let [k, v] of Object.entries(props)) {
        let setter = k.startsWith("on")
          ? (v) => (dom[k] = v)
          : (v) => dom.setAttribute(k, v);
        if (v == null) {
        } else if (isProtoOf(v, stateProto)) {
          bind({ deps: [v], render: () => (v) => (setter(v), dom) });
        } else if (isProtoOf(v, objProto)) {
          bind({
            deps: v["deps"],
            render:
              ({}) =>
              (...deps) => {
                const newPropValue = v["f"](...deps);
                if (newPropValue != dom.getAttribute(k)) {
                  setter(newPropValue);
                }
                return dom;
              },
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
    let result = render({ renderItem })(...deps.map((d) => d._val));
    if (result == undefined) return [];
    let binding = {
      deps,
      render,
      renderItem,
      dom: toDom(result),
    };

    for (let dep of deps) {
      stateSet.add(dep);
      dep.bindings.push(binding);
    }
    return binding.dom;
  };

  return { tags, state, bind };
}
