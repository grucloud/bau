# BauCss

A CSS in JS library in less than [35 lines of code](./src/bau-css.js).

_BauCss_ exports 2 functions: `css` and `keyframes`.

This API is the same as other popular css-in-js libraries such as [styled-components](https://styled-components.com/), [emotion](https://emotion.sh/) and [goober](https://goober.js.org/).

_BauCss_ is framework agnostic and integrates with Bau, React, Preact, SolidJs etc ...

## Bundle size

Let's compare the bundle sizes thanks to [bundlephobia](https://bundlephobia.com/):

![bau-css gzip size](https://img.shields.io/bundlephobia/minzip/@grucloud/bau-css.svg?label=@grucloud/bau-css%20gzip%20size)

![@goober gzip size](https://img.shields.io/bundlephobia/minzip/goober.svg?label=@goober%20gzip%20size)

![@emotion/react gzip size](https://img.shields.io/bundlephobia/minzip/@emotion/react.svg?label=@emotion/react%20gzip%20size)

![styles-components gzip size](https://img.shields.io/bundlephobia/minzip/styled-components.svg?label=styled-components%20gzip%20size)

The difference is between 3 times and 26 times leaner.

## Workflow

Install the dependencies:

```sh
npm install @grucloud/bau-css
```

Import `@grucloud/bau-css` and instantiate the library:

```js
import BauCss from "@grucloud/bau-css";

const { css, keyframes } = BauCss();
```

The following [example](./main.js) demonstrates how to use the _css_ and _keyframes_ functions with the [Bau reactive library](https://github.com/grucloud/bau).

```js
import Bau from "../bau/src/bau";
import BauCss from "./src/bau-css";

const bauCss = BauCss();
const { css, keyframes } = bauCss;

const bau = Bau({});
const { p, h1, div } = bau.tags;

const color = "red";

const rotate = keyframes`
0% {transform: rotate(0deg);}
100% {transform: rotate(360deg);}
`;

const App = () =>
  div(
    {
      class: css`
        border: ${color} dotted 1px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        & h1 {
          &:hover {
            animation: ${rotate} 4s infinite;
          }
        }
      `,
    },
    h1("Hello BauCss"),
    p("Hover over the title to start the animation")
  );

document.getElementById("app").replaceChildren(App({}));
```

Notice that the new [nested css feature](https://www.w3.org/TR/css-nesting-1/) is being leveraged in this library. Not only it makes the bundle size more than 20 times smaller, it is also significantly faster at runtime.
Under the hood, other CSS in JS libraries performs the following steps:

- 1 Build the css string through the template literal, a.k.a the css content inside a backtick.
- 2 Parses the given css to produce an abstract syntax tree (AST), often with regular expression which are notoriously slow and riddled with bugs.
- 3 Transforms the AST from nested css syntax into the old css way.
- 4 Stringified the css object model.
- 5 Infer a class name/keyframes by hashing the stringified css.
- 6 Add a style dom element in the DOM.

_BauCss_ skips steps 2, 3 and 4 as no longer needed because modern browers natively support nested CSS.

## Contribution

Bugs and suggestion can be discusses on its [GitHub project page](https://github.com/grucloud/bau/tree/main/bau-css).
