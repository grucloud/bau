# Bau.js

A Javascript library to write reactive user interface for the web under 300 lines of code.

No JSX, no templating, no virtual DOM, just a simple way to write UI components using Javascript.

Bau is reactive, data mutation drives the various views binded to this data. When the data is modified, the mutation is intercepted via carefully crafted Javascript proxies, and the DOM is updated accordingly.

Data can be an array, an object or a primitive value such as boolean/integer/string.

## Bundle size

Let's compare the bundle sizes thanks to [bundlephobia](https://bundlephobia.com/):

![bundle size](./doc/ui-library-bundle-size.svg)

## Dependencies

Install the dependencies:

```sh
npm install @grucloud/bau
```

## Sample code

Next, in you main js file:

```js
// main.js
// Import the library
import Bau from "@grucloud/bau";

// Instantiate the library
const bau = Bau();

// Destructure any html tags used to describe the component
const { button, span } = bau.tags;

// Create a state containing an integer
const counter = bau.state(0);

// Create a component defined by a function that return a real DOM node.
function Counter() {
  return span(
    "❤️ ",
    counter,
    " ",
    button({ onclick: () => ++counter.val }, "👍"),
    button({ onclick: () => --counter.val }, "👎")
  );
}

// Your html file must contain an element with the id "app"
document.getElementById("app").replaceChildren(Counter());
```

## Examples

Have a look at the [examples](./examples) directory to find out how to use this library.

## CSS in JS

Need a CSS in JS solution ? Checkout [bau-css](./bau-css), a 35 lines CSS in JS library. 20 times leaner than the popular css in js solution.

## Components

A set of [UI components](./examples/bau-kit/src/components) has been created that helps to get you started, for instance Button, Input, Modal, Tabs etc...

## Multi Page app

Looking for a complete frontend solution, try [bau-kit](./examples/bau-kit), a themable multi page app, with a router than can handle dynamic nested route.
All of these features packed under 5KB, a 20X decreased compared to the combo React/Redux/React Router/Style Component.

## Contribution

Please report bugs and suggestions to https://github.com/grucloud/bau

## History

Bau is mostly inspired by [van.js](https://vanjs.org/), with the following difference:

- Van.js only support primitive value as state, Bau state management also supports array and object.
- The `bind` function input parameters are differents, in van.js, they spreads the state dependencies and the render function at the end, bau `bind` uses an object with keys: deps, render, renderItem and eventually more in the future.
- Bau supports undefined or null attribute, see [issue 39](https://github.com/vanjs-org/van/pull/39)
