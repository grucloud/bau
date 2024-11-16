# Bau.js

A Javascript library to write reactive user interface for the web under 350 lines of code.

No JSX, no templating, no virtual DOM, no compiler, just a simple way to write UI components using Javascript.

Bau is reactive, data mutation drives the various views binded to this data. When the data is modified, the mutation is intercepted via carefully crafted Javascript proxies, and the DOM is updated accordingly.

In addition to this core library, a set of others has been released to provide a full ecosystem:

- [bau-css](./bau-css): a CSS in JS library in 33 lines of code.
- [bau-ui](https://grucloud.github.io/bau/bau-ui): a 50+ set of themable components such as Button, Input, Tabs, Tree View, Modal, etc...
- [bau-router](./bau-router): a router with nested route, asynchronous loading, layout. Under 0.6kB
- [bau-kit](./examples/bau-kit): a Multi Page App starter kit, all of these features packed under 5KB, a **20X** decreased compared to the combo React/Redux/React Router/Style Component.
- [bausaurus](https://grucloud.github.io/bau/bausaurus/): A Static Site Generator (SSG) from Markdown content.
- [bau-astro](./bau-astro): Bau integration for [Astro](https://astro.build/), allowing to leverage the SSR implementation provided by Astro.

## Bundle size

Let's compare the bundle sizes thanks to [bundlephobia](https://bundlephobia.com/):

![bundle size](./doc/ui-library-bundle-size.svg)

## Sample code

Bau aims to be easy to use and its API surface consits of few functions: `tags`, `state`, `loop`, `derive` and `batch`

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

## Dependencies

Install the dependencies:

```sh
npm install @grucloud/bau
```

## Examples

Have a look at the [examples](./examples) directory to find out how to use this library.

Check out the minimalistic [hello world example](https://codesandbox.io/s/bau-helloworld-twdxl5?file=/src/index.js) on CodeSanbox

## Guide

- [Component pattern](./doc/BauComponent.md)
- [Reactivity with bau.state](./doc/BauReactivity.md)
- [Event Handling](./doc/BauEventHandling.md)
- [Conditional Rendering](./doc/BauConditionalRendering.md)
- [Lifecycle Methods: bauCreated, bauMounted, bauUnmounted](./doc/BauLifecycle.md)
- [Create a state array and display views](./doc/BauStateArray.md)
- [State Derivation and Side Effects](./doc/BauDerive.md)
- [Hash based router](./doc/BauRouting.md)

## Benchmark

Bau has been benchmarked against other thanks to the project [js-framework-benchmark](https://github.com/krausest/js-framework-benchmark),
It scores very well on most use cases, see prelimanary results [here](https://github.com/krausest/js-framework-benchmark/pull/1271)

The Chrome Lighthouse perfomance tool reports an overall 100% score even for an app built with all Bau UI components.

![bau lighthouse](https://user-images.githubusercontent.com/4118089/248206941-b3a3bb7f-1502-498d-988f-635cf65bfdbc.png)

## Typescript

The Bau ecosystem exports Typescript definition files allowing to improve the Developer's eXperience. Enjoy the code completion with VS Code or your favorite IDE, which is obviously VS Code.

## Contribution

Please report bugs and suggestions to https://github.com/grucloud/bau

## History

Bau is mostly inspired by [van.js](https://vanjs.org/), with the following differences:

- Van.js only support primitive value as state, Bau state management also supports array and object.
- Bau supports lifecycle methods such as **bauCreated**, **bauMounted** and **bauUnmounted**
- Bau does not use a global variable, multiple instances of Bau could eventually be created.

```js
import Bau from "@grucloud/bau";
const bau = Bau();
const { div } = bau.tags;
```

- Bau reactive functions can return an array of elements, the equivalent of a React Fragment.
- Bau promotes only one paradigm: views derive from the state. Van could mix paradigms, imperative and state derived view. The imperative way is when your code directly maniplates the DOM, in the same way as vanilla js and jquery. This style of programming is error prone, therefore, preventing its use makes bau _hard to misuse_
- Bau supports undefined or null attribute, see [issue 39](https://github.com/vanjs-org/van/pull/39)
