# Event Handling

Event handling allows to define event handler when a button is clicked, an input changes its value, a keyboard key goes up, etc ...

The event handlers name are the native DOM event handler: `onclick`, `oninput`, `onkeyup`, `onchange` and so on.

## Button

## onclick inline

The `onclick` is called when the button is clicked. In the following example, the _onclick_ function is defined inline:

```js
const TestButtonClickInline = () => {
  return section(
    h1("Button onclick inline"),
    button(
      {
        onclick: (_event: Event) => {
          alert("Clicked");
        },
      },
      "Click me"
    )
  );
};
```

## onclick method

The _onclick_ function can be extracted to its own function:

```js
const TestButtonClickMethod = () => {
  const buttonOnclick = (_event: Event) => {
    alert("Clicked");
  };

  return section(
    h1("Button onclick method"),
    button(
      {
        onclick: buttonOnclick,
      },
      "Click me"
    )
  );
};
```

## onclick method curried

In this example, the say method takes a message and returns a function compatible with _onclick_ handler

```js
const TestButtonClickMethodCurried = () => {
  const say = (message: string) => (_event: Event) => {
    alert(`Clicked ${message}`);
  };

  return section(
    h1("Button onclick method curried"),
    button(
      {
        onclick: say("Hello"),
      },
      "Say hello"
    ),
    button(
      {
        onclick: say("Bye"),
      },
      "Say bye"
    )
  );
};
```

## Input

### Input oninput with bau.state

This example uses a bau state to store the input text value. The button have access to the input value though `inputState.val`

```js
const TestInputOninput = () => {
  const inputState = bau.state("");

  return article(
    h1("Input oninput with bau.state"),
    input({
      placeholder: "Enter username",
      value: inputState,
      oninput: ({ target }) => (inputState.val = target.value),
    }),
    button(
      {
        onclick: () => {
          alert(inputState.val);
        },
      },
      "Login"
    )
  );
};
```

### Input oninput without bau.state

In this case, the _inputEl_ is created outside the tree. In the button _onclick_ handler, the value of the input is obtained from _inputEl.value_

```js
const TestInputOninputElement = () => {
  const inputEl = input({
    placeholder: "Enter username",
    onkeyup: ({ key }: { key: string }) => {
      if (key == "Enter") {
        alert(inputEl.value);
      }
    },
  });

  return article(
    h1("Input onkeyup without bau.state"),
    inputEl,
    button(
      {
        onclick: () => {
          alert(inputEl.value);
        },
      },
      "Login"
    )
  );
};
```

### Input type checkbox

This example uses a bau state to store the input checkbox boolean value.

```js
const TestInputCheckboxOninput = () => {
  const checkedState = bau.state(false);

  return article(
    h1("Input checkbox oninput with bau.state"),
    input({
      type: "checkbox",
      checked: checkedState,
      oninput: ({ target }) => (checkedState.val = target.checked),
    }),
    div("Is checked: ", () => (checkedState.val ? "Checked" : "Not Checked"))
  );
};
```

### Input type radio

This example uses a bau state to store the input radio value.

```js
const TestInputRadio = () => {
  const checkedState = bau.state("");
  const oninput = ({ target }: { target: HTMLInputElement }) =>
    (checkedState.val = target.id);

  return article(
    h1("Input radio"),
    input({
      type: "radio",
      id: "one",
      name: "radio",
      checked: true,
      value: checkedState,
      oninput,
    }),
    label({ for: "one" }, "One"),
    input({
      type: "radio",
      id: "two",
      name: "radio",
      value: checkedState,
      oninput,
    }),
    label({ for: "two" }, "Two"),
    div("Choice: ", checkedState)
  );
};
```

## Select

### Select with bau.state

The select element uses the `onchange` handler to signal a change:

```js
const TestSelect = () => {
  const selectState = bau.state("volvo");

  const onchange = ({ target }: { target: HTMLSelectElement }) =>
    (selectState.val = target.value);

  return article(
    h1("Select"),
    label({ for: "cars" }, "Choose a car: "),
    select(
      { name: "cars", id: "cars", onchange, value: selectState },
      option({ value: "audi" }, "Audi"),
      option({ value: "volvo", selected: true }, "Volvo"),
      option({ value: "saab" }, "Saab")
    ),
    div("Selected ", selectState)
  );
};
```
