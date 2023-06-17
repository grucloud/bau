# Observing Array

This guide describes how to observe an array with the `state` function, and create binding views reacting to the array mutation with the `bind` function.

## Creation

Example of creating a state observing an array:

```js
// Empty initial state
const todosState = bau.state([]);

// Use initial state
const initialState = [{ label: "a1" }, { label: "b1" }];
const todosState = bau.state(initialState);
```

## Mutation

They can use several operations to mutate the array, simply use the standard javascript array operations on `todosState.val`. The `val` property contains the array to mutate.

1. Append an item at the end: `push`

```js
todosState.val.push({ label: "my-label" });
```

2. Remove the last item: `pop`

```js
todosState.val.pop();
```

3. Prepend an item at the begining: `unshift`

```js
todosState.val.unshift({ label: "my-label" });
```

4. Remove the first element: `shift`

```js
todosState.val.shift({ label: "my-label" });
```

5. Splice the array: Remove one or more item from an index, and evetually add some items at the index

```js
// Remove the third element
todosState.val.splice(2, 1);
```

## Bind View

To display a list of items, the `bind` function accepts the `renderItem` function.

```js
const todosState = bau.state([]);

const TodoItem = ({ label }) => tr(td(label));

const TBody = () =>
  bau.bind({
    deps: [todosState],
    render:
      ({ renderItem }) =>
      (arr) =>
        tbody(arr.map(renderItem())),
    renderItem: () => TodoItem,
  });
```

## Examples

Check out our examples to observe and display array of data:

- [todo list minimal](../examples/todo-minimal)
- [todoMVC](../examples/todoapp)
- [benchmark](../examples/benchmark)
