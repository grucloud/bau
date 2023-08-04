# Bau Reactivity

The `bau.state` function create a reactive state thanks the Javascript Proxy feature.

The idea is to intercept data mutations and update the DOM accordingly.

> For Vue developers, `bau.state` is equivalent to [ref](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)

## Creation

```js
const myBoolState = bau.state(false);
const myNumberState = bau.state(1);
const myStringState = bau.state("foo");
const myArrayState = bau.state(["foo", "bar"]);
const myObjetState = bau.state({ name: "Freddy", rank: 2 });
```

## Read/Write

The value is read and written with the `val` key.

```js
const myStringState = bau.state("foo");
// Read
console.log(myStringState.val); // "foo"
// Write
myStringState.val = "bar";
// Read
console.log(myStringState.val); // "bar"
```

See the [dedicated documentation for arrays](./BauStateArray.md)

# Reactivity

## Reactive State

When a state with primitive value is inside a element, it is automatically reactive:

### Reactive Number

_counterState_ holds an integer and is placed inside a _div_.

```js
const TestReactiveStateNumber = () => {
  const counterState = bau.state(0);
  return article(
    h1("State Number"),
    button({ onclick: () => counterState.val++ }, "Increment"),
    div(counterState)
  );
};
```

### Reactive String

_messageState_ holds a string and is placed inside a _span_. When the _button_ is clicked, the _messageState_ value is mutated, the message in the _span_ is automatically updated.

```js
const TestReactiveStateString = () => {
  const messageState = bau.state("Ciao");
  return article(
    h1("State String"),
    button(
      { onclick: () => (messageState.val = `${messageState.val} Bello`) },
      "Add Bello"
    ),
    span(messageState)
  );
};
```

## Reactive Element

Functions can be placed inside the element tree, the state dependencies are collected automatically, later on, when one of these states it mutated, the function is executed and return a new element.

```js
const TestReactiveFunction = () => {
  const showState = bau.state(true);
  return article(
    h1("Reactive Function"),
    button(
      //
      { onclick: () => (showState.val = !showState.val) },
      () => (showState.val ? "HIDE" : "SHOW")
    ),
    () => showState.val && "Stuff to show"
  );
};
```

## Reactive Property

### style property

The style property can be reactive by assigning a function to the style property:

```js
const TestReactiveStyle = () => {
  const colorState = bau.state(false);

  return article(
    h1("Reative style"),
    div(
      {
        style: () => (colorState.val ? "color:red;" : ""),
      },
      button(
        { onclick: () => (colorState.val = !colorState.val) },
        "Click to change the style"
      ),
      p("My Text")
    )
  );
};
```

### class property

The class property can be reactive by assigning a function to the class property.
First define a class in your css file:

```css
// your css file
.active {
  color: green;
  border-bottom: 2px dashed green;
}
```

When the button is clicked, the class will toogle from empty to active.

```js
// Your js file
const TestReactiveClass = () => {
  const colorState = bau.state(false);

  return article(
    h1("Reative class"),
    div(
      {
        class: () => (colorState.val ? "active" : ""),
      },
      button(
        { onclick: () => (colorState.val = !colorState.val) },
        "Click to change the style"
      ),
      p("My Text")
    )
  );
};
```
