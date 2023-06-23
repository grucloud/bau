# Bau Lifecycle Method

Bau provides several lifecycle methods to act upon a DOM element creation and destruction:

- `bauCreated`: Called after the element been created, but before being inserted to the tree. One use case is to overide the _innerHTML_ property of the element, required be some third party libraries such as [highlight.js](https://highlightjs.org/).
- `bauMounted`: Called after the element has been added to the tree. At this time, the position and dimensions are known.
- `bauUnmounted`: Called when the element is beeing deleted. It is opportunity to clean up things, and also to eventually clone the element for animation purposes.

```js
const MyComponent = ({ someData }) =>
  div(
    {
      bauCreated: ({ element }) => {
        element.innerHTML =
          "<div>My stuff from a 3rd party library spitting html string.</div>";
      },
      bauMounted: (/*{ element }*/) => {
        window.addEventListener("scroll", handleScroll);
      },
      bauUnmounted: (/*{ element }*/) => {
        window.removeEventListener("scroll", handleScroll);
      },
    },
    h1("Bau lifecycle methods"),
    p("bauMounted and bauUnmounted")
  );
```

## Scrolling Event example

The following code example listens to the _scroll_ event and store the _scrollY_ property.

The _bauMounted_ and _bauUnmounted_ are invoked when the underlying DOM element has been mounted and unmounted to and from the DOM tree.

```js
import Bau from "@grucloud/bau";
const bau = Bau();
const { div, h1, ul, li } = bau.tags;

const scrollState = bau.state(0);

const handleScroll = (/*event*/) => (scrollState.val = window.scrollY);

const ScrollNumber = () =>
  bau.bind({
    deps: [scrollState],
    render: () => (scroll) =>
      div({ class: "scroll-number" }, "scrollY: ", scroll),
  });

const App = () =>
  div(
    h1("Bau Lifecycle methods"),
    div(
      {
        bauMounted: (/*{ element }*/) => {
          window.addEventListener("scroll", handleScroll);
        },
        bauUnmounted: (/*{ element }*/) => {
          window.removeEventListener("scroll", handleScroll);
        },
      },
      ScrollNumber(),
      ul(new Array(1000).fill("").map((_, index) => li("index ", index)))
    )
  );

document.getElementById("app").replaceChildren(App());
```

Check out the [complete scolling example source code](../examples/lifecycle)
