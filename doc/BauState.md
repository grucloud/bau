# Bau state

The `bau.state` function create a reactive state thanks the Javascript Proxy feature.

The idea is to intercept data mutations and update the DOM accordignly.

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
