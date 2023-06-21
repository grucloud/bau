import Bau from "@grucloud/bau";
const bau = Bau();
const { button, div, h1, td, tr, thead, th, table, tbody, input } = bau.tags;

// State creation
const todosState = bau.state([]);
const inputState = bau.state("");

// State operations
const inputOnInput = (event) => (inputState.val = event.target.value);
const addItem = () => {
  todosState.val.push({ label: inputState.val });
  inputState.val = "";
};

// Views
const TodoItem = ({ label }) => tr(td(label));

const TBody = () =>
  bau.bind({
    deps: [todosState],
    render:
      ({ renderItem }) =>
      (arr) =>
        tbody(arr.map(renderItem)),
    renderItem: () => TodoItem,
  });

const App = () =>
  div(
    h1("Todo list minimal example"),
    input({
      value: inputState,
      oninput: inputOnInput,
    }),
    button(
      {
        onclick: addItem,
      },
      "Add"
    ),
    table(thead(th("Todo List"))),
    TBody()
  );

document.getElementById("app").replaceChildren(App({}));
