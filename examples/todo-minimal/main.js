import Bau from "@grucloud/bau";
const bau = Bau();
const { button, div, h1, td, tr, thead, th, table, tbody, input } = bau.tags;

// State creation
const todosState = bau.state([]);
const inputState = bau.state("");

// State operations
const inputOnInput = (event) => (inputState.val = event.target.value);

const onkeyup = (event) => event.key == "Enter" && addItem();

const inputEl = input({
  placeholder: "Enter todo",
  value: inputState,
  oninput: inputOnInput,
  onkeyup,
});

const addItem = () => {
  todosState.val.push({ label: inputState.val });
  inputState.val = "";
  inputEl.focus();
};

// Views
const TodoItem = ({ label }, index) => tr(td(index), td(label));

const TBody = () => bau.loop(todosState, tbody(), TodoItem);

const App = () =>
  div(
    h1("Todo list minimal example"),
    inputEl,
    button({ onclick: addItem }, "Add"),
    div("item(s): ", () => String(todosState.val.length)),
    table(thead(th("index"), th("Todo List")), TBody())
  );

document.getElementById("app").replaceChildren(App({}));
