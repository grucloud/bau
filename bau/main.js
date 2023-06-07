import "./style.css";
import Bau from "./src/bau";

const bau = Bau({});

const { a, button, div, ul, li, input, span } = bau.tags;

const arr = ["wash laundry", "do stuff"];

const App = () => {
  const inputState = bau.state("");
  const proxyArray = bau.state(arr);

  return div(
    "Test Observable Array",
    div(
      button(
        {
          onclick: () => {
            proxyArray.val.push(inputState.val);
          },
        },
        "Push one"
      ),
      button(
        {
          onclick: () => {
            proxyArray.val.push("one", "two");
          },
        },
        "Push 2 "
      ),
      button(
        {
          onclick: () => {
            proxyArray.val.pop();
          },
        },
        "Pop"
      ),
      button(
        {
          onclick: () => {
            proxyArray.val.shift();
          },
        },
        "Shift"
      ),
      button(
        {
          onclick: () => {
            proxyArray.val.unshift(inputState.val);
          },
        },
        "Unshift"
      ),
      button(
        {
          onclick: () => {
            proxyArray.val.splice(1, 2, "foo");
          },
        },
        "Splice 1 2 foo"
      ),
      button(
        {
          onclick: () => {
            proxyArray.val[0] = "bar";
          },
        },
        "arr[0] = 'bar'"
      ),
      button(
        {
          onclick: () => {
            proxyArray.val = ["bar"];
          },
        },
        "arr = ['bar']"
      ),
      div(
        input({
          id: "my-id",
          text: "text",
          value: inputState,
          oninput: (event) => (inputState.val = event.target.value),
        })
      ),
      bau.bind({
        deps: [proxyArray],
        render: () => (arr) => {
          return div("Items Count ", arr.length);
        },
      }),
      bau.bind({
        deps: [proxyArray],
        render:
          ({ renderItem }) =>
          (arr) => {
            return ul(arr.map(renderItem()));
          },
        renderItem: () => (value) => {
          return li(value);
        },
      })
    )
  );
};

const app = document.getElementById("app");
app.replaceChildren(App({}));
