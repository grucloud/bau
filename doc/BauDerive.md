# Bau Derive

The `bau.derive` function creates a new state that derives its value from one or more states, when these states are updated, the derived state's value is updated. `bau.derive` can also used to handle _side effects_.

```js
const myState = bau.state("");
const derivation = () => {
  // This function is executed when myState is mutated, ex: myState.val = "My next text"
  return myState.val.length < 2;
};

const myDerivedState = bau.derive(derivation);

console.log(myDerivedState.val); // false
myState.val = "my text";
console.log(myDerivedState.val); // true
```

> For Vue developers, `bau.derive` is equivalent to [computed](https://vuejs.org/guide/essentials/computed.html)

The _derivation_ function and the derived state _myDerivedState_ have some restrictions:

1. Do not mutate _myDerivedState_: (This is directly restricted in TypeScript)

```js
myDerivedState.val = false; // DON'T DO
```

2. Do not mutate _myState_ in the derivation function, that will trigger an infinite loop

## Use cases

### Enable/Disable a button

The button is enabled or disabled based on some condition of the input state, in this case, the button is disabled when the input length is less than 2.

```js
const TestDerived = () => {
  const inputState = bau.state("");
  const buttonDisabledState = bau.derive(() => {
    return inputState.val.length < 2;
  });

  return section(
    "Test Derived",
    input({
      placeholder: "Enter username",
      value: inputState,
      oninput: ({ target }) => (inputState.val = target.value),
    }),
    button(
      {
        disabled: buttonDisabledState,
        onclick: () => {
          /* do stuff*/
        },
      },
      "Login"
    )
  );
};
```

### Derive value or array from an array

In the [todoapp](https://github.com/grucloud/bau/tree/main/examples/todoapp) example, we need to derive the number of completed tasks from the todos array, we also derive a array of todos in the showing state.

```js
const nowShowingState = bau.state("all");
const todosState = bau.state([]);

// Return a number of the completed todos
const completedCountState = bau.derive(
  () => todosState.val.filter(({ completed }) => completed).length
);

// Return a filtered array of todos
const todosShowingState = bau.derive(() =>
  todosState.val.filter(showTodos(nowShowingState.val))
);
```

### Side effects

`bau.derive` can also be used to produce side effects when some states are mutated. In this case, ignore the `bau.derive` return value.

```js
const inputState = bau.state("");
bau.derive(() => {
  console.log("inputState: ", inputState.val);
});
```

> For React developers, `bau.derive` is similar to [useEffect](https://react.dev/reference/react/useEffect). However, there is no need to provide the dependencies, `bau.derive` collects the dependencies automatically when the derivation function is called for the first time.
