# Observing Array

This guide describes how to display reative array.

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
todosState.val.push({ label: "my-label" }, { label: "other-label" });
```

2. Remove the last item: `pop`

```js
todosState.val.pop();
```

3. Prepend an item at the begining: `unshift`

```js
todosState.val.unshift({ label: "my-label" });
todosState.val.unshift({ label: "my-label" }, { label: "other-label" });
```

4. Remove the first element: `shift`

```js
todosState.val.shift();
```

5. Splice the array: Remove one or more item from an index, and eventually add some items at the index

```js
// Remove the third element
todosState.val.splice(2, 1);
```

## Render List

### Render with ul and li

To display a list of items, use the javascript map on _myArray.val_

```js
const TestBindArrayUL = () => {
  const arrayState = bau.state<string[]>([]);
  const inputEl = input({ focus: true, placeholder: "Enter text" });
  const renderItem = (value: string, index?: number) =>
    li(`${index} ${value} `);

  const onclick = () => {
    arrayState.val.push(inputEl.value);
    inputEl.value = "";
  };

  return article(
    h1("Loop Array with ul li"),
    inputEl,
    button({ onclick }, "Add"),
    bau.loop(arrayState, ul(), renderItem)
  );
};

```

### Render with tbody, tr, and td

Here is an example of displaying an array with table, tbody, tr and td:

```js
const TestBindArrayTable = () => {
  const arrayState = bau.state<string[]>([]);

  const inputEl = input({ focus: true, placeholder: "Enter text" });
  const onclick = () => {
    arrayState.val.push(inputEl.value);
    inputEl.value = "";
  };

  const renderItem = (value: any, index?: number) => tr(td(index), td(value));

  return article(
    h1("Array with table, tbody, tr, and td"),
    inputEl,
    button({ onclick }, "Add"),
    table(bau.loop(arrayState, tbody(), renderItem))
  );
};
```

## Examples

Check out our examples to observe and display array of data:

- [todo list minimal](../examples/todo-minimal)
- [todoMVC](../examples/todoapp)
- [benchmark](../examples/benchmark)
