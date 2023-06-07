const O = Object;
const pOf = O.getPrototypeOf;

const isProtoOf = (obj, proto) => pOf(obj) === proto;
const objProto = pOf({});

const filterBindings = (state) =>
  (state.bindings = state.bindings.filter((b) => b.dom?.isConnected));

export default function Bau() {
  let changedStatesSet = new Set();

  let updateDoms = () => {
    let changedStatesArray = [...changedStatesSet];
    changedStatesSet.clear();
    for (let state of changedStatesArray) {
      filterBindings(state);
      for (let binding of state.bindings) {
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
    }
    for (let state of changedStatesArray) {
      state.oldVal = state._val;
      state.arrayOps = [];
    }
  };

  const schedule = (state, waitMs) => {
    changedStatesSet.size == 0 && setTimeout(updateDoms, waitMs);
    changedStatesSet.add(state);
  };

  // array is mutated with the following functions. These functions tracked an array thanks to a Javascript Proxy.
  // TODO add sort
  const arrayOperationMutation = ["splice", "push", "pop", "shift", "unshift"];

  const createArrayProxy = (_state, initVal) =>
    new Proxy(initVal, {
      get(target, prop, receiver) {
        if (arrayOperationMutation.includes(prop)) {
          const origMethod = target[prop];
          return (...args) => {
            //const oldArray = structuredClone(target);
            const result = origMethod.apply(target, args);
            _state.arrayOps.push({
              method: prop,
              args,
              newArray: target,
              //oldArray,
            });
            schedule(_state);
            return result;
          };
        }
        return Reflect.get(target, prop, receiver);
      },
      set(target, prop, val, receiver) {
        const result = Reflect.set(target, prop, val, receiver);
        _state.arrayOps.push({
          method: "set",
          args: [prop, val],
        });
        schedule(_state);
        return result;
      },
    });

  const methodToActionMapping = ({ dom, args, depsValues, renderDomItem }) => ({
    assign: () => dom.replaceChildren(...args.map(renderDomItem)),
    set: () => {
      const child = dom.children[args[0]];
      if (child) {
        child.replaceWith(renderDomItem(args[1]));
      }
    },
    push: () => args.map((v) => dom.appendChild(renderDomItem(v))),
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
      if (newItems) {
        for (let i = start - 1; i < newItems.length - 1; i++) {
          const domItem = renderDomItem(newItems[i + 1 - start]);
          dom.children[i]
            ? dom.children[i].after(domItem)
            : dom.appendChild(domItem);
        }
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
        schedule(state);
      } else {
        if (value !== currentValue) {
          if (state.oldVal === currentValue) {
            schedule(state);
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
    children
      .flat(Infinity)
      .filter((c) => c != null)
      .forEach((child) =>
        dom.appendChild(
          isProtoOf(child, stateProto)
            ? bind({ deps: [child], render: () => (v) => v })
            : toDom(child)
        )
      ),
    dom
  );

  let tags = new Proxy(
    (name, ...args) => {
      let [props, ...children] = isProtoOf(args[0] ?? 0, objProto)
        ? args
        : [{}, ...args];
      let dom = document.createElement(name);
      for (let [k, v] of Object.entries(props)) {
        let setter =
          dom[k] !== undefined
            ? (v) => (dom[k] = v)
            : (v) => dom.setAttribute(k, v);
        if (v == null) {
        } else if (isProtoOf(v, stateProto)) {
          bind({ deps: [v], render: () => (v) => (setter(v), dom) });
        } else if (isProtoOf(v, objProto)) {
          bind({
            deps: v["deps"],
            render:
              () =>
              (...deps) => (setter(v["f"](...deps)), dom),
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
      setInterval(() => filterBindings(dep), 1e3);
      dep.bindings.push(binding);
    }
    return binding.dom;
  };

  return { tags, state, bind };
}
