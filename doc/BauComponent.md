# Component Pattern

Bau components are just functions that returns a real DOM element. Bau uses the dependency injection pattern to create components, this pattern allows to avoid global variables and global functions.

For CSS support, we'll use the [bau-css](https://github.com/grucloud/bau/tree/main/bau-css), a CSS-in-JS solution under 33 lines of code.

Let's start with a simple example and proceed step by step.

```js
// main.js
import Bau from "@grucloud/bau";
import BauCss from "@grucloud/bau-css";

const bau = Bau();
const { css } = BauCss();

const { div } = bau.tags;

const className = css`
  background: red;
`;

const MyMainComponent = ({ city }) => div({ class: className }, city);

const element = MyMainComponent({ city: "Fortaleza" }); // element is a native HTMLDivElement

document.getElementById("app")?.replaceChildren(element);
```

Let's extract the creation of Bau and BauCss into a function called `createContext`.

In addition, we'll add a function called `t`, which stands for translate. Right now, this function is just the identity function, in case your website needs to be translated, change the `t` function to your implementation.

Moreover, we define a _config_ object that holds static information.

```js
// context.js
import Bau from "@grucloud/bau";
import BauCss from "@grucloud/bau-css";

export default function createContext() {
  return {
    bau: Bau(),
    ...BauCss(), // css, keyframes, and createGlobalStyles
    t: (text) => text, //  translation
    config: { title: "My Super Duper App" }, // config object
  };
}
```

Now, let's import and use the _createContext_

```js
// main.js
import createContext from "./context";

const context = createContext();
const { bau, css } = context;
const { div } = bau.tags;

const className = css`
  background: red;
`;

const MyMainComponent = ({ city }) => div({ class: className }, city);

document
  .getElementById("app")
  ?.replaceChildren(MyMainComponent({ city: "Fortaleza" }));
```

At this stage, let's extract _MyMainComponent_ into its own file. The trick is to use the dependency injection pattern. The compoment is wrapped into a function where context is the input parameter.

```js
// MyMainComponent.js
export default function (context) {
  const { bau, css, t } = context;
  const { div, label } = bau.tags;

  const className = css`
    background: red;
  `;

  return function MyMainComponent({ city }) {
    return div({ class: className }, label(t("City:")), city);
  };
}
```

Let's import the _myMainComponent_ function and create the _MyMainComponent_ component:

```js
// main.js
import createContext from "./context";
// By convention, the component factory starts with a lower case.
import myMainComponent from "./MyMainComponent";

const context = createContext();

const MyMainComponent = myMainComponent(context);

document
  .getElementById("app")
  ?.replaceChildren(MyMainComponent({ city: "Fortaleza" }));
```

At this stage, let's define a header component:

```js
// Header.js
export default function (context) {
  const { bau, css } = context;
  const { h1, header } = bau.tags;

  const className = css`
    border: 1px dashed lightgray;
  `;

  return function Header({ title }) {
    return header({ class: className }, h1(title));
  };
}
```

Let's import, instantiate, and insert the header component into the tree:

```js
// MyMainComponent.js
import header from "./Header";

export default function (context) {
  const { bau, css, t, config } = context;
  const { div, label } = bau.tags;

  const Header = header(context);

  const className = css`
    background: red;
  `;

  return function MyMainComponent({ city }) {
    return div(
      Header({ title: config.title }),
      div({ class: className }, label(t("City:")), city)
    );
  };
}
```

Every component can be implemented with this pattern. For those who comes from the React world, this is an alternative to [createContext](https://react.dev/reference/react/createContext) and [useContext](https://react.dev/reference/react/useContext)

To add reactivity to these components, please refer to [Bau Reactivity](./BauReactivity.md) documentation.
