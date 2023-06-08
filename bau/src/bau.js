const O = Object;
const pOf = O.getPrototypeOf;
import morphdom from "nanomorph";
const isProtoOf = (obj, proto) => pOf(obj) === proto;
const objProto = pOf({});

const filterBindings = (state) =>
  (state.bindings = state.bindings.filter((b) => b.dom?.isConnected));

export default function Bau() {
  let _debounce;

  function debounceSchedule(callback) {
    if (_debounce) {
      window.cancelAnimationFrame(_debounce);
    }
    _debounce = window.requestAnimationFrame(callback);
  }

  const schedule = (set, callback, waitMs) => (state) => {
    set.size == 0 && debounceSchedule(callback);
    set.add(state);
  };

  const gcSet = new Set();
  const scheduleGc = schedule(gcSet, () => gcSet.forEach(filterBindings), 1e3);

  let updateDom = (state) => {
    //filterBindings(state);
    for (let binding of state.bindings) {
      if (!binding.dom?.isConnected) {
        continue;
      }
      let { deps, dom, render, renderItem } = binding;
      const depsValues = deps.map((d) => d._val);
      // Array handling
      if (renderItem) {
        for (let { method, args } of state.arrayOps) {
          methodToActionMapping({
            dom,
            args,
            depsValues,
            renderDomItem: (value) =>
              toDom(renderItem({ deps: depsValues })(value)),
          })[method]?.call();
        }
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
      //filterBindings(state);
      updateDom(state);
    }
    for (let state of changedStatesArray) {
      state.oldVal = state._val;
      state.arrayOps = [];
    }
  };

  const changedStatesSet = new Set();
  const scheduleDom = schedule(changedStatesSet, updateDoms);

  // array is mutated with the following functions. These functions tracked an array thanks to a Javascript Proxy.
  // TODO add sort
  const arrayOperationMutation = ["splice", "push", "pop", "shift", "unshift"];

  const handler = (state) => ({
    get(target, prop, receiver) {
      if (arrayOperationMutation.includes(prop)) {
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
    set(target, prop, val, receiver) {
      const result = Reflect.set(target, prop, val, receiver);
      state.arrayOps.push({
        method: "set",
        args: [prop, val],
      });
      //      scheduleDom(state);
      updateDom(state);

      return result;
    },
  });

  const createArrayProxy = (_state, initVal) =>
    new Proxy(initVal, handler(_state));

  const methodToActionMapping = ({ dom, args, depsValues, renderDomItem }) => ({
    assign: () => {
      // const div = document.createElement("div");
      // div.append(...args.map(renderDomItem));
      // morphdom(dom, div, { childrenOnly: true });
      // return dom;

      return dom.replaceChildren(...args.map(renderDomItem));
    },
    set: () => {
      morphdom(dom.children[args[0]], renderDomItem(args[1]));
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

  function isObject(val) {
    return val instanceof Object;
  }

  let tags = new Proxy(
    (name, ...args) => {
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
      get: (tag, name) => {
        return tag.bind(undefined, name);
      },
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
      scheduleGc(dep);
      dep.bindings.push(binding);
    }
    return binding.dom;
  };

  return { tags, state, bind };
}
