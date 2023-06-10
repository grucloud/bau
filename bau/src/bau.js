const getType = (obj) => Object.prototype.toString.call(obj ?? 0).slice(8, -1);
const isObject = (val) => getType(val) == "Object";

const filterBindings = (state) =>
  (state.bindings = state.bindings.filter((b) => b.dom?.isConnected));

export default function Bau() {
  let _debounce;
  const changedStatesSet = new Set();
  const stateSet = new Set();

  function debounceSchedule(callback) {
    if (!_debounce) {
      _debounce = window.requestAnimationFrame(() => {
        callback();
        _debounce = undefined;
      });
    }
  }

  const bindingCleanUp = () =>
    debounceSchedule(() => stateSet.forEach(filterBindings));

  const schedule = (set, callback) => (state) => {
    set.size == 0 && debounceSchedule(callback);
    set.add(state);
  };

  let updateDom = (state) => {
    for (let binding of state.bindings) {
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
        !target[prop]._isProxy &&
        ["Array", "Object"].includes(getType(target[prop]))
      ) {
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
          state.arrayOps.push({
            method: prop,
            args,
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
      updateDom(state);
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
        });
        updateDom(state);
      } else {
        if (value !== currentValue) {
          if (state.oldVal === currentValue) {
            scheduleDom(state);
          } else if (value === state.oldVal) {
            changedStatesSet.delete(state);
          }
        }
        state._val = value;
      }
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

  let add = (dom, ...children) => {
    const childDom = [];
    for (let child of children.flat(Infinity))
      if (child != null) {
        childDom.push(
          child.__isState
            ? bind({ deps: [child], render: () => (v) => v })
            : toDom(child)
        );
      }
    dom.append(...childDom);
    return dom;
  };

  let tagsNS = (namespace) =>
    new Proxy(
      function createTag(name, ...args) {
        let [props, ...children] = isObject(args[0]) ? args : [{}, ...args];
        let dom = namespace
          ? document.createElementNS(namespace, name)
          : document.createElement(name);
        for (let [k, v] of Object.entries(props)) {
          let setter =
            k.indexOf("on") == 0
              ? (v) => (dom[k] = v)
              : (v) => dom.setAttribute(k, v);
          if (v == null) {
          } else if (v.__isState) {
            bind({ deps: [v], render: () => (v) => (setter(v), dom) });
          } else if (isObject(v)) {
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
    const result = render({ renderItem })(...deps.map((d) => d._val));
    if (result == undefined) return [];
    const dom = toDom(result);
    const binding = {
      deps,
      render,
      renderItem,
      dom,
    };

    for (let dep of deps) {
      stateSet.add(dep);
      dep.bindings.push(binding);
    }
    return dom;
  };

  return { tags: tagsNS(), tagsNS, state, bind };
}
