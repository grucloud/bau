# Bau.js

A Javascript library to write user interface for the web under 1.5KB.

No JSX, no templating, just a simple way to write UI components using Javascript.

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
import Ban from "@grucloud/bau";

// Instantiate the library
const ban = Ban();

// Destructure any html tags used to describe the component
const { div, h1, p } = ban.tags;

// Create a component defined by a function
const Main = () => div(h1("Hello Bau"), p("My first example")));

// Your html file must contain an element with the id "app"
const app = document.getElementById("app");

// Create the component and insert it into the element "app"
app.replaceChildren(Main({}));
```

## Examples

Have a look at the [examples](./examples) directory to find out how to use this library.

## Contribution

Please report bugs and suggestions to https://github.com/grucloud/bau
